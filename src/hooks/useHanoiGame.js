import { useState, useEffect, useCallback } from 'react'

function initTowers(n) {
  const t = { A: [], B: [], C: [] }
  for (let i = n; i >= 1; i--) t.A.push(i)
  return t
}

export function useHanoiGame(numDisks) {
  const [towers, setTowers] = useState(() => initTowers(numDisks))
  const [selected, setSelected] = useState(null)
  const [moves, setMoves] = useState(0)
  const [isWon, setIsWon] = useState(false)
  const [invalidTower, setInvalidTower] = useState(null)

  useEffect(() => {
    setTowers(initTowers(numDisks))
    setSelected(null)
    setMoves(0)
    setIsWon(false)
    setInvalidTower(null)
  }, [numDisks])

  useEffect(() => {
    if (towers.C.length === numDisks) {
      setIsWon(true)
      setSelected(null)
    }
  }, [towers, numDisks])

  const reset = useCallback(() => {
    setTowers(initTowers(numDisks))
    setSelected(null)
    setMoves(0)
    setIsWon(false)
    setInvalidTower(null)
  }, [numDisks])

  const clickTower = useCallback((name) => {
    if (isWon) return

    if (selected === null) {
      if (towers[name].length > 0) setSelected(name)
      return
    }

    if (selected === name) {
      setSelected(null)
      return
    }

    const movingDisk = towers[selected][towers[selected].length - 1]
    const toStack = towers[name]
    const topDest = toStack.length > 0 ? toStack[toStack.length - 1] : Infinity

    if (movingDisk < topDest) {
      setTowers(prev => ({
        ...prev,
        [selected]: prev[selected].slice(0, -1),
        [name]: [...prev[name], movingDisk],
      }))
      setMoves(m => m + 1)
      setSelected(null)
    } else {
      setInvalidTower(name)
      setSelected(null)
      setTimeout(() => setInvalidTower(null), 500)
    }
  }, [isWon, selected, towers])

  const validDrops = selected
    ? ['A', 'B', 'C'].filter(t => {
        if (t === selected) return false
        const disk = towers[selected][towers[selected].length - 1]
        const top = towers[t].length > 0 ? towers[t][towers[t].length - 1] : Infinity
        return disk < top
      })
    : []

  const minMoves = (1 << numDisks) - 1

  return { towers, selected, validDrops, invalidTower, moves, minMoves, isWon, clickTower, reset }
}
