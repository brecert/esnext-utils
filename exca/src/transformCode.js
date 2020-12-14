import babel from '@babel/standalone'
import 'core-js'
import 'regenerator-runtime'

const plugins = babel.availablePlugins

/**
 * transform exca code to emca code
 * @param {string} code the code to transform from exca 
 */
export const transformCode = (code) =>
  babel.transform(code, {
    plugins: [
      plugins['proposal-async-generator-functions'],
      plugins['proposal-class-properties'],
      plugins['proposal-class-static-block'],
      [
        plugins['proposal-decorators'],
        {
          decoratorsBeforeExport: true,
        },
      ],
      plugins['proposal-do-expressions'],
      // plugins["proposal-dynamic-import"],
      plugins['proposal-export-default-from'],
      plugins['proposal-export-namespace-from'],
      plugins['proposal-function-bind'],
      plugins['proposal-function-sent'],
      plugins['proposal-json-strings'],
      plugins['proposal-logical-assignment-operators'],
      plugins['proposal-nullish-coalescing-operator'],
      plugins['proposal-numeric-separator'],
      plugins['proposal-object-rest-spread'],
      plugins['proposal-optional-catch-binding'],
      plugins['proposal-optional-chaining'],
      [
        plugins['proposal-pipeline-operator'],
        {
          proposal: 'minimal',
        },
      ],
      plugins['proposal-private-methods'],
      plugins['proposal-private-property-in-object'],
      plugins['proposal-throw-expressions'],
      plugins['proposal-unicode-property-regex'],
    ],
  }).code
