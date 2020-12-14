import URI from 'uri-js'
import path from 'path'
import { pathToFileURL } from 'url'
import * as importMap from 'deno-importmap'

/**
 * @enum {string}
 */
const ResolveType = {
  local: 'local',
  remote: 'remote',
}

/**
 * @typedef Resolved
 * @property {ResolveType} type
 * @property {string} modulePath
 */

export class Resolver {
  /**
   *
   * @param {ResolveType} type how to resolve imports
   * @param {string} baseURL
   * @param {Record<string, string>} imports
   */
  constructor(type, baseURL, imports = {}) {
    this.type = type
    this.baseURL = baseURL
    this.rootURL = baseURL
    this.imports = imports
  }

  /**
   *
   * @param {ResolveType} type
   * @param {string} rootURL
   */
  fromRoot(type, rootURL) {
    let resolver = new Resolver(type, this.baseURL, this.imports)
    resolver.rootURL = rootURL
    return resolver
  }

  /**
   *
   * @param {string} specifier
   */
  resolveFilePath(specifier) {
    let uri = URI.parse(specifier)
    if (uri.path == null) {
      throw new Error(`Error resolving file path: ${specifier}`)
    }
    return {
      type: 'local',
      modulePath: path.resolve(this.rootURL, uri.path),
    }
  }

  /**
   *
   * @param {string} specifier
   */
  resolveHttpPath(specifier) {
    return {
      type: 'remote',
      modulePath: URI.resolve(this.rootURL, specifier),
    }
  }

  /**
   *
   * @param {string} specifier
   */
  resolveRelative(specifier) {
    if (this.type === 'remote') {
      return {
        type: this.type,
        modulePath: this.resolveHttpPath(specifier).modulePath,
      }
    } else if (this.type === 'local') {
      return {
        type: this.type,
        modulePath: path.resolve(this.rootURL, specifier),
      }
    } else {
      throw new Error(`Invalid resolver type: ${this.type}`)
    }
  }

  /**
   *
   * @param {string} specifier
   * @returns {Resolved}
   */
  resolveImport(specifier) {
    let resolved = importMap.resolve(
      specifier,
      this.imports,
      this.type === 'local' ? pathToFileURL(specifier) : new URL(this.rootURL)
    )

    if (resolved != null) {
      return this.resolve(resolved)
    } else {
      throw new Error(`Unable to find an import map match for '${specifier}'`)
    }
  }

  /**
   *
   * @param {string} specifier
   */
  resolve(specifier) {
    const uri = URI.parse(specifier)
    switch (uri.scheme) {
      case 'http':
      case 'https':
        return this.resolveHttpPath(specifier)
      case 'file':
        return this.resolveFilePath(specifier)
      default: {
        if (specifier.startsWith('.')) {
          return this.resolveRelative(specifier)
        } else {
          return this.resolveImport(specifier)
        }
      }
    }
  }

  /**
   *
   * @param {string} specifier
   * @param {Resolved} resolved
   */
  async loadText(specifier, resolved = this.resolve(specifier)) {
    // console.log({ specifier, resolved, self: this })
    switch (resolved.type) {
      case 'local':
        return import('fs/promises').then((fs) =>
          fs.readFile(resolved.modulePath, 'utf-8')
        )
      case 'remote':
        return import('node-fetch')
          .then((fetch) => fetch.default(resolved.modulePath))
          .then((res) => {
            if (res.ok) {
              return res.text()
            } else {
              throw new Error(
                `Error while fetching module '${specifier}': ${res.status}: ${res.statusText}`
              )
            }
          })
      default:
        throw new Error(`Invalid resolver type: ${this.type}`)
    }
  }
}
