import { motion, AnimatePresence } from 'framer-motion'
import { useRecursionTree } from '../hooks/useRecursionTree.js'

/** Nó individual da árvore */
function TreeNode({ node, activeCallIds, completedCallIds, currentCallId, numDisks }) {
  const isActive = activeCallIds.has(node.id)
  const isCurrent = node.id === currentCallId
  const isDone = completedCallIds.has(node.id)

  const stateClass = isCurrent
    ? 'tree-node--current'
    : isActive
    ? 'tree-node--active'
    : isDone
    ? 'tree-node--done'
    : 'tree-node--idle'

  return (
    <div className="tree-node-row">
      {/* O nó */}
      <motion.div
        className={`tree-node ${stateClass}`}
        animate={{
          scale: isCurrent ? 1.08 : isActive ? 1.02 : 1,
          opacity: isDone ? 0.45 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <span className="tree-node-fn">hanoi</span>
        <span className="tree-node-args">
          ({node.n}, {node.from}→{node.to})
        </span>
        {isCurrent && <span className="tree-node-cursor">◄</span>}
      </motion.div>

      {/* Filhos indentados */}
      {node.childNodes.length > 0 && (
        <div className="tree-children">
          {node.childNodes.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              activeCallIds={activeCallIds}
              completedCallIds={completedCallIds}
              currentCallId={currentCallId}
              numDisks={numDisks}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function RecursiveTree({ calls, moves, currentStep, numDisks }) {
  const { callTree, activeCallIds, completedCallIds, currentCallId } =
    useRecursionTree(calls, currentStep, moves)

  const showFull = numDisks <= 4

  return (
    <div className="panel recursive-tree-panel">
      <div className="panel-header">
        <span className="panel-icon">🌳</span>
        <span className="panel-title">Árvore Recursiva</span>
        {numDisks > 4 && (
          <span className="panel-badge">parcial</span>
        )}
      </div>

      <div className="tree-legend">
        <span className="legend-item legend-current">● ativa agora</span>
        <span className="legend-item legend-active">● no caminho</span>
        <span className="legend-item legend-done">● concluída</span>
      </div>

      <div className="tree-scroll">
        {callTree ? (
          showFull ? (
            <TreeNode
              node={callTree}
              activeCallIds={activeCallIds}
              completedCallIds={completedCallIds}
              currentCallId={currentCallId}
              numDisks={numDisks}
            />
          ) : (
            // Para n > 4: mostra apenas o caminho ativo (profundidade atual)
            <ActivePathView
              calls={calls}
              activeCallIds={activeCallIds}
              currentCallId={currentCallId}
              completedCallIds={completedCallIds}
            />
          )
        ) : (
          <p className="tree-empty">Inicie a simulação para ver a árvore.</p>
        )}
      </div>
    </div>
  )
}

/** Visualização simplificada para n > 4: mostra o caminho raiz→atual */
function ActivePathView({ calls, activeCallIds, currentCallId, completedCallIds }) {
  const pathCalls = calls.filter(c => activeCallIds.has(c.id))
    .sort((a, b) => a.depth - b.depth)

  return (
    <div className="active-path">
      <p className="active-path-hint">
        Árvore grande — exibindo apenas o caminho ativo:
      </p>
      {pathCalls.map((c, i) => (
        <motion.div
          key={c.id}
          className={`tree-node ${c.id === currentCallId ? 'tree-node--current' : 'tree-node--active'}`}
          style={{ marginLeft: i * 16 }}
          animate={{ scale: c.id === currentCallId ? 1.06 : 1 }}
        >
          <span className="tree-node-fn">hanoi</span>
          <span className="tree-node-args">({c.n}, {c.from}→{c.to})</span>
          {c.id === currentCallId && <span className="tree-node-cursor">◄</span>}
        </motion.div>
      ))}

      {/* Total de nós na árvore completa */}
      <p className="active-path-total">
        Árvore completa: {calls.length} nós | concluídos: {completedCallIds.size}
      </p>
    </div>
  )
}
