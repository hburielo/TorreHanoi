import { motion } from 'framer-motion'
import { getComplexityTable } from '../algorithms/complexity.js'

export default function SearchExplanation({ numDisks }) {
  const table = getComplexityTable(8)

  return (
    <div className="panel search-panel">
      <div className="panel-header">
        <span className="panel-icon">🔍</span>
        <span className="panel-title">Busca em Profundidade (DFS)</span>
      </div>

      <div className="search-section">
        <h4 className="search-subtitle">Por que DFS resolve a Torre de Hanói?</h4>
        <p className="search-body">
          O algoritmo recursivo da Torre de Hanói é uma implementação natural de DFS:
          ele <strong>explora um sub-problema até o caso base</strong> antes de avançar
          para o próximo. A pilha de recursão é literalmente a pilha do DFS.
        </p>
      </div>

      <div className="search-section">
        <h4 className="search-subtitle">Espaço de estados</h4>
        <p className="search-body">
          Cada configuração das torres é um <em>estado</em>. O algoritmo navega nesse
          espaço sem repetir estados, seguindo sempre o caminho ótimo.
        </p>
        <div className="state-example">
          <StateBox label="Estado inicial" towers={['ABCDE', '', '']} />
          <span className="state-arrow">→</span>
          <StateBox label="Intermediário" towers={['BCDE', 'A', '']} />
          <span className="state-arrow">→</span>
          <StateBox label="Objetivo" towers={['', '', 'ABCDE']} />
        </div>
      </div>

      {/* Tabela de complexidade */}
      <div className="search-section">
        <h4 className="search-subtitle">Crescimento exponencial 2ⁿ − 1</h4>
        <div className="complexity-table">
          <div className="ct-header">
            <span>n</span>
            <span>Movimentos</span>
            <span>Chamadas</span>
          </div>
          {table.map(row => (
            <motion.div
              key={row.n}
              className={`ct-row ${row.n === numDisks ? 'ct-row--highlight' : ''}`}
              animate={{ scale: row.n === numDisks ? 1.03 : 1 }}
            >
              <span>{row.n}</span>
              <span className="ct-moves">{row.moves.toLocaleString()}</span>
              <span className="ct-calls">{row.calls.toLocaleString()}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StateBox({ label, towers }) {
  return (
    <div className="state-box">
      <div className="state-label">{label}</div>
      <div className="state-towers">
        {towers.map((t, i) => (
          <div key={i} className="state-tower">
            <span className="state-tower-name">{['A', 'B', 'C'][i]}</span>
            <span className="state-tower-disks">{t || '∅'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
