/**
 * Árvore simples usada no tutorial para demonstrar DFS visualmente.
 * Cada nó tem id, label e filhos.
 */
export const DFS_DEMO_TREE = {
  id: 'A',
  label: 'A',
  x: 0,
  children: [
    {
      id: 'B',
      label: 'B',
      children: [
        {
          id: 'C',
          label: 'C',
          children: [
            {
              id: 'D',
              label: 'D ★',
              children: [],
            },
          ],
        },
        {
          id: 'E',
          label: 'E',
          children: [],
        },
      ],
    },
    {
      id: 'F',
      label: 'F',
      children: [
        {
          id: 'G',
          label: 'G',
          children: [],
        },
      ],
    },
  ],
}

/**
 * Retorna a ordem de visitação DFS (pré-ordem) da árvore.
 * Inclui eventos de "backtrack" para animar o retorno.
 */
export function getDFSOrder(tree) {
  const order = []

  function dfs(node, depth) {
    order.push({ id: node.id, label: node.label, event: 'visit', depth })
    for (const child of node.children) {
      dfs(child, depth + 1)
    }
    order.push({ id: node.id, label: node.label, event: 'return', depth })
  }

  dfs(tree, 0)
  return order
}

/**
 * IDs na ordem de visita DFS (sem duplicatas de retorno) — para uso rápido.
 */
export function getDFSVisitSequence(tree) {
  const seq = []
  function dfs(node) {
    seq.push(node.id)
    for (const child of node.children) dfs(child)
  }
  dfs(tree)
  return seq
}
