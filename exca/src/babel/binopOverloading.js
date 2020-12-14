export const operator_overloaded = Symbol.for('operator_overloading:checked')

/**
 * @param {import("@babel/core")} babel
 * @returns {import("@babel/core").PluginItem}
 */
export default function ({ types: t }) {
  return {
    visitor: {
      // BlockStatement: {
      //   enter(path) {
      //     console.log(path.directi)
      //   }
      // },
      BinaryExpression(path) {
        let parent = path.findParent(
          (path) =>
            (path.isBlockStatement() || path.isProgram()) &&
            path.node.directives.find((d) =>
              d.value.value.startsWith('exca overloads')
            ) != null
        )

        let directive = parent?.node?.directives.find((d) =>
          d.value.value.startsWith('exca overloads')
        )?.value?.value

        if (directive == null || directive === 'exca overloads disable') return
        if (directive != null && directive !== 'exca overloads enable') {
          throw new Error(
            `Invalid exca directive for operator overloads: ${directive}`
          )
        }

        if (path.node[operator_overloaded]) return
        path.node[operator_overloaded] = true

        const { left, right, operator: op } = path.node

        const symbolForOp = t.callExpression(
          t.memberExpression(t.identifier('Symbol'), t.identifier('for')),
          [t.stringLiteral(op)]
        )

        const leftAccess = t.memberExpression(left, symbolForOp, true)

        path.replaceWith(
          t.conditionalExpression(
            leftAccess,
            t.callExpression(leftAccess, [right]),
            path.node
          )
        )
      },
    },
  }
}
