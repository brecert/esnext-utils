import { Resolver } from './resolver.js'
import { transformCode } from './transformCode.js'
import { SourceTextModule } from 'vm'
import path from 'path'

/**
 * 
 * @param {string} source 
 * @param {Resolver} resolver 
 * @param {*} [referencingModule] 
 */
export async function buildModule(source, resolver, referencingModule) {
  let transformedCode = transformCode(source)

  let module = new SourceTextModule(transformedCode, {
    context: referencingModule?.context,
  })

  /**
   *
   * @param {string} specifier
   * @param {*} referencingModule
   */
  async function linker(specifier, referencingModule) {
    let resolved
    let text

    try {
      resolved = resolver.resolve(specifier)
      text = await resolver.loadText(specifier, resolved)
    } catch (err) {
      throw new Error(`Unable to resolve dependency:\n${err}`)
    }

    let transformed = transformCode(text)

    let built = await buildModule(
      transformed,
      resolver.fromRoot(resolved.type, path.dirname(resolved.modulePath)),
      referencingModule
    )

    return built
  }

  await module.link(linker)

  return module
}
