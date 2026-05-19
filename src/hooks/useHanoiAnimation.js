import { useState, useEffect, useCallback, useRef } from 'react'
import { generateHanoi, getTowerState } from '../algorithms/hanoi'

export function useHanoiAnimation(numDisks = 3) {
  const [currentStep, setCurrentStep] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)          // multiplicador: 0.5 / 1 / 2 / 4
  const [data, setData] = useState(null)         // { moves, calls }
  const [towers, setTowers] = useState({ A: [], B: [], C: [] })
  const intervalRef = useRef(null)

  // Re-gera movimentos quando numDisks muda
  useEffect(() => {
    const generated = generateHanoi(numDisks)
    setData(generated)
    setCurrentStep(-1)
    setIsPlaying(false)
    clearInterval(intervalRef.current)

    const init = { A: [], B: [], C: [] }
    for (let i = numDisks; i >= 1; i--) init.A.push(i)
    setTowers(init)
  }, [numDisks])

  // Atualiza torres sempre que o passo muda
  useEffect(() => {
    if (!data) return
    setTowers(getTowerState(numDisks, data.moves, currentStep))
  }, [currentStep, data, numDisks])

  // Auto-play
  useEffect(() => {
    clearInterval(intervalRef.current)
    if (!isPlaying || !data) return

    const total = data.moves.length - 1
    if (currentStep >= total) {
      setIsPlaying(false)
      return
    }

    const delay = Math.round(900 / speed)
    intervalRef.current = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= total) {
          setIsPlaying(false)
          clearInterval(intervalRef.current)
          return prev
        }
        return prev + 1
      })
    }, delay)

    return () => clearInterval(intervalRef.current)
  }, [isPlaying, speed, data]) // intencionalmente sem currentStep para não reiniciar o timer

  const play = useCallback(() => {
    if (!data) return
    if (currentStep >= data.moves.length - 1) setCurrentStep(-1)
    setIsPlaying(true)
  }, [data, currentStep])

  const pause = useCallback(() => {
    setIsPlaying(false)
    clearInterval(intervalRef.current)
  }, [])

  const reset = useCallback(() => {
    setIsPlaying(false)
    clearInterval(intervalRef.current)
    setCurrentStep(-1)
  }, [])

  const nextStep = useCallback(() => {
    if (!data) return
    setCurrentStep(prev => Math.min(prev + 1, data.moves.length - 1))
  }, [data])

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, -1))
  }, [])

  const totalMoves = data?.moves.length ?? 0
  const currentMove = data?.moves[currentStep] ?? null
  const isFinished = currentStep >= totalMoves - 1 && currentStep >= 0

  return {
    towers,
    currentStep,
    currentMove,
    totalMoves,
    isPlaying,
    isFinished,
    speed,
    setSpeed,
    play,
    pause,
    reset,
    nextStep,
    prevStep,
    moves: data?.moves ?? [],
    calls: data?.calls ?? [],
  }
}
