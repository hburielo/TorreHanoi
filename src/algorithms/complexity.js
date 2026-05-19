/**
 * Fórmula fechada: T(n) = 2ⁿ − 1
 * Complexidade de tempo: O(2ⁿ)
 * Complexidade de espaço (pilha de recursão): O(n)
 */
export function getMinMoves(n) {
  return Math.pow(2, n) - 1
}

/** Total de chamadas recursivas para n discos: 2^(n+1) − 1 */
export function getTotalCalls(n) {
  return Math.pow(2, n + 1) - 1
}

/** Profundidade máxima da pilha de recursão: n chamadas empilhadas simultaneamente */
export function getMaxDepth(n) {
  return n
}

/** Tabela com dados de complexidade para n = 1..maxN */
export function getComplexityTable(maxN = 10) {
  return Array.from({ length: maxN }, (_, i) => {
    const n = i + 1
    return {
      n,
      moves: getMinMoves(n),
      calls: getTotalCalls(n),
      depth: getMaxDepth(n),
    }
  })
}

export function getComplexityInfo(n) {
  return {
    n,
    timeComplexity: 'O(2ⁿ)',
    spaceComplexity: 'O(n)',
    totalMoves: getMinMoves(n),
    totalCalls: getTotalCalls(n),
    maxDepth: getMaxDepth(n),
  }
}
