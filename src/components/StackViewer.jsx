import { motion, AnimatePresence } from 'framer-motion'
import { useRecursionTree } from '../hooks/useRecursionTree.js'

export default function StackViewer({ calls, moves, currentStep }) {
  const { activeCallIds, currentCallId } = useRecursionTree(calls, currentStep, moves)

  // Pilha ativa = chamadas no caminho atual, ordenadas por profundidade (topo = mais profunda)
  const stack = calls
    .filter(c => activeCallIds.has(c.id))
    .sort((a, b) => b.depth - a.depth)

  return (
    <div className="panel stack-panel">
      <div className="panel-header">
        <span className="panel-icon">📚</span>
        <span className="panel-title">Pilha de Chamadas</span>
        <span className="panel-badge">{stack.length} frame{stack.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="stack-container">
        {currentStep < 0 ? (
          <p className="stack-empty">A pilha aparece aqui durante a execução.</p>
        ) : (
          <>
            {/* Topo da pilha */}
            <div className="stack-top-label">← TOPO</div>

            <AnimatePresence>
              {stack.map((frame, idx) => {
                const isCurrent = frame.id === currentCallId
                return (
                  <motion.div
                    key={frame.id}
                    className={`stack-frame ${isCurrent ? 'stack-frame--current' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: idx * 0.04, type: 'spring', stiffness: 280, damping: 24 }}
                  >
                    <div className="frame-depth">#{frame.depth}</div>
                    <div className="frame-body">
                      <div className="frame-sig">
                        <span className="frame-fn">hanoi</span>
                        <span className="frame-paren">(</span>
                        <span className="frame-n">{frame.n}</span>
                        <span className="frame-sep">, </span>
                        <span className="frame-tower from">{frame.from}</span>
                        <span className="frame-sep">, </span>
                        <span className="frame-tower to">{frame.to}</span>
                        <span className="frame-sep">, </span>
                        <span className="frame-tower aux">{frame.aux}</span>
                        <span className="frame-paren">)</span>
                      </div>
                      {isCurrent && (
                        <div className="frame-status">▶ executando</div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {/* Fundo da pilha */}
            {stack.length > 0 && <div className="stack-bottom-label">← FUNDO</div>}
          </>
        )}
      </div>

      {/* Indicador de profundidade */}
      {stack.length > 0 && (
        <div className="stack-depth-info">
          <span>Profundidade atual:</span>
          <motion.span
            key={stack.length}
            className="stack-depth-num"
            initial={{ scale: 1.4, color: '#f72585' }}
            animate={{ scale: 1, color: '#4cc9f0' }}
            transition={{ duration: 0.4 }}
          >
            {stack.length}
          </motion.span>
        </div>
      )}
    </div>
  )
}
