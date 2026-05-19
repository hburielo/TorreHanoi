import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TOWER_COLORS = { A: '#4cc9f0', B: '#f72585', C: '#06d6a0' }

export default function MoveHistory({ moves, currentStep }) {
  const listRef = useRef(null)

  // Rola para o passo atual
  useEffect(() => {
    if (!listRef.current || currentStep < 0) return
    const el = listRef.current.querySelector(`[data-step="${currentStep}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [currentStep])

  const history = moves.slice(0, currentStep + 1)

  return (
    <div className="panel history-panel">
      <div className="panel-header">
        <span className="panel-icon">📋</span>
        <span className="panel-title">Histórico de Movimentos</span>
        <span className="panel-badge">{history.length}/{moves.length}</span>
      </div>

      <div className="history-list" ref={listRef}>
        {moves.length === 0 ? (
          <p className="history-empty">Os movimentos aparecerão aqui.</p>
        ) : (
          moves.map((move, idx) => {
            const isPast = idx < currentStep
            const isCurrent = idx === currentStep
            const isFuture = idx > currentStep

            return (
              <motion.div
                key={idx}
                data-step={idx}
                className={`history-item ${isCurrent ? 'history-item--current' : ''} ${isFuture ? 'history-item--future' : ''}`}
                animate={{
                  opacity: isFuture ? 0.3 : 1,
                  scale: isCurrent ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="history-index">{idx + 1}</span>
                <span
                  className="history-disk"
                  style={{ background: getDiskColor(move.disk) }}
                >
                  {move.disk}
                </span>
                <span className="history-from" style={{ color: TOWER_COLORS[move.from] }}>
                  {move.from}
                </span>
                <span className="history-arrow">→</span>
                <span className="history-to" style={{ color: TOWER_COLORS[move.to] }}>
                  {move.to}
                </span>
                {isCurrent && <span className="history-cursor">◄</span>}
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
}

function getDiskColor(size) {
  const colors = ['#f72585', '#7209b7', '#4361ee', '#4cc9f0', '#06d6a0', '#ffd166', '#f4a261']
  return colors[(size - 1) % colors.length]
}
