import { useMemo } from 'react'

/**
 * Deriva, a partir da lista plana de calls e do passo atual:
 *   - callTree : nó raiz da árvore recursiva (com filhos aninhados)
 *   - activeCallIds : IDs das chamadas no caminho ativo (root → chamada atual)
 *   - currentCallId : ID da chamada que está executando agora
 *   - completedCallIds : IDs de chamadas já finalizadas
 */
export function useRecursionTree(calls, currentStep, moves) {
  // Mapa id → call para lookups O(1)
  const callMap = useMemo(() => {
    const map = {}
    calls.forEach(c => (map[c.id] = c))
    return map
  }, [calls])

  // Raiz aninhada (estrutura de árvore para renderização)
  const callTree = useMemo(() => {
    if (!calls.length) return null

    const nodes = {}
    calls.forEach(c => (nodes[c.id] = { ...c, childNodes: [] }))

    let root = null
    calls.forEach(c => {
      if (c.parentId === null) {
        root = nodes[c.id]
      } else {
        nodes[c.parentId].childNodes.push(nodes[c.id])
      }
    })

    return root
  }, [calls])

  const currentCallId = useMemo(() => {
    if (currentStep < 0 || !moves.length) return null
    return moves[currentStep]?.callId ?? null
  }, [currentStep, moves])

  // Caminho ativo: do nó corrente até a raiz
  const activeCallIds = useMemo(() => {
    const active = new Set()
    if (currentCallId === null) return active

    let id = currentCallId
    while (id !== undefined && id !== null) {
      active.add(id)
      id = callMap[id]?.parentId
    }
    return active
  }, [currentCallId, callMap])

  // Chamadas já concluídas (endStep < currentStep)
  const completedCallIds = useMemo(() => {
    const done = new Set()
    calls.forEach(c => {
      if (c.endStep !== null && c.endStep < currentStep) done.add(c.id)
    })
    return done
  }, [calls, currentStep])

  return { callTree, activeCallIds, completedCallIds, currentCallId }
}
