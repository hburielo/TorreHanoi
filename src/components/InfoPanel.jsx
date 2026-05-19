import { motion, AnimatePresence } from 'framer-motion'
import { getComplexityInfo } from '../algorithms/complexity.js'
import { useRecursionTree } from '../hooks/useRecursionTree.js'

export default function InfoPanel({ numDisks, currentStep, currentMove, totalMoves, calls, moves }) {
  const info = getComplexityInfo(numDisks)
  const { activeCallIds } = useRecursionTree(calls, currentStep, moves)
  const depth = activeCallIds.size

  return (
    <div className="panel info-panel">
      <div className="panel-header">
        <span className="panel-icon">📖</span>
        <span className="panel-title">Painel Didático</span>
      </div>

      {/* O que está acontecendo agora */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="info-current"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {currentStep < 0 ? (
            <>
              <p className="info-step-label">Estado inicial</p>
              <p className="info-step-desc">
                Todos os {numDisks} discos estão na torre A. O algoritmo vai movê-los para C
                respeitando a regra: <em>disco maior nunca sobre o menor</em>.
              </p>
            </>
          ) : currentMove ? (
            <>
              <p className="info-step-label">Passo {currentStep + 1}</p>
              <p className="info-step-desc">{currentMove.description}</p>
              <div className="info-call-box">
                <span className="mono">{currentMove.label}</span>
                <span className="info-depth-badge">profundidade {depth}</span>
              </div>
            </>
          ) : (
            <p className="info-step-label">Concluído!</p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* DFS */}
      <div className="info-section">
        <h4 className="info-section-title">Como a Busca em Profundidade (DFS) age aqui</h4>
        <p className="info-section-body">
          A cada chamada recursiva, o algoritmo <strong>desce mais fundo</strong> na árvore
          de estados antes de voltar (backtrack). Isso é exatamente DFS: explorar um caminho
          até o fim antes de tentar outro.
        </p>
      </div>

      {/* Recursão */}
      <div className="info-section">
        <h4 className="info-section-title">Recursão em ação</h4>
        <p className="info-section-body">
          Cada chamada <span className="mono">hanoi(n)</span> resolve o problema
          em termos de <span className="mono">hanoi(n−1)</span>. Quando{' '}
          <span className="mono">n = 1</span> (caso base), a função simplesmente move o disco.
        </p>
        <div className="info-recurrence">
          <span>T(n) = 2 · T(n−1) + 1</span>
          <span className="info-arrow">→</span>
          <span>T(n) = 2ⁿ − 1</span>
        </div>
      </div>

      {/* Complexidade */}
      <div className="info-stats">
        <StatCard label="Movimentos mínimos" value={info.totalMoves} accent="#4cc9f0" />
        <StatCard label="Total de chamadas" value={info.totalCalls} accent="#f72585" />
        <StatCard label="Profund. máxima" value={info.maxDepth} accent="#06d6a0" />
        <StatCard label="Progresso" value={`${currentStep < 0 ? 0 : currentStep + 1} / ${totalMoves}`} accent="#ffd166" />
      </div>

      <div className="info-complexity">
        <span className="complexity-badge time">Tempo: O(2ⁿ)</span>
        <span className="complexity-badge space">Espaço: O(n)</span>
      </div>
    </div>
  )
}

function StatCard({ label, value, accent }) {
  return (
    <div className="stat-card" style={{ borderColor: accent + '55' }}>
      <div className="stat-value" style={{ color: accent }}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
