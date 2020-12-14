import fs from 'fs/promises'
import path from 'path'
import { program } from 'commander'
import { buildModule } from './buildModule.js'
import { Resolver } from './resolver.js'

program
  .version('0.0.0')

program
  .command('run <file>')
  .description('run a program given a valid module path')
  .option('--import-map <file>', 'path to the import map to use')
  .action(async (filePath, cmd) => {
    const config = {
      filePath,
      imports: {},
    }

    /** @param {string} file */
    const setImports = async (file) => {
      const importMapText = await fs.readFile(file, 'utf-8')
      config.imports = JSON.parse(importMapText)
    }

    if (cmd.importMap) {
      setImports(cmd.importMap)
    } else {
      if ((await fs.stat('./import-map.json')).isFile()) {
        setImports('./import-map.json')
      }
    }

    const fileText = await fs.readFile(filePath, 'utf-8')

    const resolver = new Resolver(
      'local',
      path.dirname(filePath),
      config.imports
    )
    const module = await buildModule(fileText, resolver)
    await module.evaluate()
  })

program.parse(process.argv)
