/**
 * Gera todos os movimentos e a árvore de chamadas recursivas da Torre de Hanói.
 *
 * T(n) = 2·T(n−1) + 1   →   solução: 2ⁿ − 1 movimentos
 */
export function generateHanoi(n, from = 'A', to = 'C', aux = 'B') {
  const moves = []
  const calls = []
  let callIdCounter = 0
  let stepCounter = 0

  function hanoi(n, from, to, aux, parentId = null, depth = 0) {
    const id = callIdCounter++
    const call = {
      id,
      n,
      from,
      to,
      aux,
      depth,
      parentId,
      children: [],
      moveIndex: null,   // índice do movimento direto desta chamada
      startStep: stepCounter,
      endStep: null,
    }
    calls.push(call)

    // registra filhos na chamada pai
    if (parentId !== null) {
      calls[parentId].children.push(id)
    }

    if (n === 1) {
      // CASO BASE: move o único disco
      call.moveIndex = stepCounter
      moves.push({
        disk: 1,
        from,
        to,
        step: stepCounter++,
        callId: id,
        depth,
        label: `hanoi(1, ${from}→${to})`,
        description: `Caso base: mover disco 1 de ${from} para ${to}`,
      })
    } else {
      // PASSO RECURSIVO 1: move n-1 discos de "from" para "aux"
      hanoi(n - 1, from, aux, to, id, depth + 1)

      // Move o disco n (o maior desta sub-chamada)
      call.moveIndex = stepCounter
      moves.push({
        disk: n,
        from,
        to,
        step: stepCounter++,
        callId: id,
        depth,
        label: `hanoi(${n}, ${from}→${to})`,
        description: `Mover disco ${n} de ${from} para ${to} — agora o maior está livre`,
      })

      // PASSO RECURSIVO 2: move n-1 discos de "aux" para "to"
      hanoi(n - 1, aux, to, from, id, depth + 1)
    }

    call.endStep = stepCounter - 1
    return call
  }

  hanoi(n, from, to, aux)
  return { moves, calls }
}

/**
 * Calcula o estado das torres após aplicar todos os movimentos até o passo dado.
 * Retorna { A: number[], B: number[], C: number[] } onde o último elemento é o topo.
 */
export function getTowerState(n, moves, step) {
  const towers = { A: [], B: [], C: [] }

  for (let i = n; i >= 1; i--) {
    towers.A.push(i)
  }

  for (let i = 0; i <= step && i < moves.length; i++) {
    const disk = towers[moves[i].from].pop()
    towers[moves[i].to].push(disk)
  }

  return towers
}
