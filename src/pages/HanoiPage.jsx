import { useState } from 'react'
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion'
import { useHanoiAnimation } from '../hooks/useHanoiAnimation.js'
import { useHanoiGame } from '../hooks/useHanoiGame.js'
import Tower from '../components/Tower.jsx'
import Controls from '../components/Controls.jsx'
import RecursiveTree from '../components/RecursiveTree.jsx'
import StackViewer from '../components/StackViewer.jsx'
import InfoPanel from '../components/InfoPanel.jsx'
import MoveHistory from '../components/MoveHistory.jsx'
import SearchExplanation from '../components/SearchExplanation.jsx'

export default function HanoiPage({ onBack }) {
  const [numDisks, setNumDisks] = useState(3)
  const [activeTab, setActiveTab] = useState('info')
  const [mode, setMode] = useState('play') // 'auto' | 'play'

  const {
    towers: autoTowers,
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
    moves,
    calls,
  } = useHanoiAnimation(numDisks)

  const {
    towers: gameTowers,
    selected,
    validDrops,
    invalidTower,
    moves: gameMoves,
    minMoves,
    isWon,
    clickTower,
    reset: gameReset,
  } = useHanoiGame(numDisks)

  const handleSetNumDisks = (n) => {
    setNumDisks(n)
  }

  const selectedDisk = selected ? gameTowers[selected][gameTowers[selected].length - 1] : null

  return (
    <div className="hanoi-page">
      {/* Header */}
      <header className="hanoi-header">
        <button className="btn btn-ghost btn-back" onClick={onBack}>
          ← Voltar
        </button>
        <div className="header-center">
          <span className="header-icon">🗼</span>
          <span className="header-title">Torre de Hanói</span>
          <div className="mode-toggle">
            <button
              className={`mode-btn ${mode === 'play' ? 'mode-btn--active' : ''}`}
              onClick={() => setMode('play')}
            >
              🎮 Jogar
            </button>
            <button
              className={`mode-btn ${mode === 'auto' ? 'mode-btn--active' : ''}`}
              onClick={() => setMode('auto')}
            >
              📊 Automático
            </button>
          </div>
        </div>
        <div className="header-stats">
          <span className="hstat">
            <span className="hstat-label">Discos</span>
            <span className="hstat-value">{numDisks}</span>
          </span>
          <span className="hstat">
            <span className="hstat-label">Mínimo</span>
            <span className="hstat-value">{mode === 'play' ? minMoves : totalMoves}</span>
          </span>
        </div>
      </header>

      {mode === 'play' ? (
        /* ════════════════ MODO JOGO ════════════════ */
        <div className="game-layout">
          {/* Banner de vitória */}
          <AnimatePresence>
            {isWon && (
              <motion.div
                className="game-win-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="game-win-banner"
                  initial={{ scale: 0.6, y: 40, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.1 }}
                >
                  <div className="win-icon">🎉</div>
                  <h2 className="win-title">Você completou!</h2>
                  <p className="win-desc">
                    {gameMoves === minMoves
                      ? `Perfeito! ${gameMoves} movimentos — o mínimo possível!`
                      : `${gameMoves} movimentos (mínimo: ${minMoves})`}
                  </p>
                  <div className="win-actions">
                    <motion.button
                      className="btn btn-primary"
                      onClick={gameReset}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      🔄 Jogar Novamente
                    </motion.button>
                    <motion.button
                      className="btn btn-ghost"
                      onClick={() => setMode('auto')}
                      whileHover={{ scale: 1.03 }}
                    >
                      📊 Ver Simulação
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Barra de status do jogo */}
          <div className="game-status-bar">
            <div className="game-stat">
              <span className="game-stat-label">Movimentos</span>
              <span className="game-stat-value">{gameMoves}</span>
            </div>
            <div className="game-stat">
              <span className="game-stat-label">Mínimo</span>
              <span className="game-stat-value game-stat-value--dim">{minMoves}</span>
            </div>
            {gameMoves > 0 && (
              <div className="game-stat">
                <span className="game-stat-label">Eficiência</span>
                <span className={`game-stat-value ${gameMoves === minMoves ? 'game-stat-value--win' : ''}`}>
                  {Math.round((minMoves / gameMoves) * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Instrução contextual */}
          <div className="game-hint">
            {isWon ? (
              <span className="hint-won">Parabéns! Torre C completa!</span>
            ) : selected ? (
              <span className="hint-selected">
                Disco <strong>{selectedDisk}</strong> selecionado — clique no destino{' '}
                {validDrops.length === 0 ? '(sem destinos válidos)' : ''}
              </span>
            ) : (
              <span>Clique numa torre para selecionar o disco do topo</span>
            )}
          </div>

          {/* Torres interativas */}
          <div className="game-towers-section">
            <LayoutGroup>
              <div className="towers-container">
                {(['A', 'B', 'C']).map(name => (
                  <Tower
                    key={name}
                    name={name}
                    disks={gameTowers[name]}
                    numDisks={numDisks}
                    onClick={() => clickTower(name)}
                    isSelected={selected === name}
                    isValidDrop={validDrops.includes(name)}
                    isInvalidDrop={invalidTower === name}
                    interactive
                  />
                ))}
              </div>
            </LayoutGroup>
          </div>

          {/* Controles do jogo */}
          <div className="game-controls">
            <motion.button
              className="btn btn-ghost"
              onClick={gameReset}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              ⏮ Reiniciar
            </motion.button>

            <div className="config-group">
              <label className="config-label">Discos</label>
              <div className="disk-btns">
                {[2, 3, 4, 5, 6, 7].map(n => (
                  <button
                    key={n}
                    className={`btn btn-sm ${numDisks === n ? 'btn-accent' : 'btn-ghost'}`}
                    onClick={() => handleSetNumDisks(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Regras rápidas */}
          <div className="game-rules">
            <span className="game-rule">☝️ Um disco por vez</span>
            <span className="game-rule">⬆️ Só o disco do topo</span>
            <span className="game-rule">🚫 Maior não sobre menor</span>
          </div>
        </div>
      ) : (
        /* ════════════════ MODO AUTOMÁTICO ════════════════ */
        <div className="hanoi-layout">
          {/* ── Coluna esquerda: Árvore recursiva (desktop) ── */}
          <aside className="sidebar sidebar-left">
            <RecursiveTree
              calls={calls}
              moves={moves}
              currentStep={currentStep}
              numDisks={numDisks}
            />
          </aside>

          {/* ── Centro: Torres + Controles ── */}
          <main className="hanoi-center">
            {/* Torres */}
            <div className="towers-section">
              <LayoutGroup>
                <div className="towers-container">
                  {(['A', 'B', 'C']).map(name => (
                    <Tower
                      key={name}
                      name={name}
                      disks={autoTowers[name]}
                      numDisks={numDisks}
                      isSource={currentMove?.from === name}
                      isDest={currentMove?.to === name}
                      currentMove={currentMove}
                    />
                  ))}
                </div>
              </LayoutGroup>

              {/* Indicador de movimento atual */}
              <motion.div
                className="move-indicator"
                animate={{ opacity: currentMove ? 1 : 0 }}
              >
                {currentMove && (
                  <>
                    <span className="move-ind-disk">Disco {currentMove.disk}</span>
                    <span className="move-ind-from">{currentMove.from}</span>
                    <span className="move-ind-arrow">→</span>
                    <span className="move-ind-to">{currentMove.to}</span>
                  </>
                )}
                {isFinished && (
                  <motion.span
                    className="move-ind-done"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 15 }}
                  >
                    ✓ Concluído em {totalMoves} movimentos!
                  </motion.span>
                )}
              </motion.div>
            </div>

            {/* Controles */}
            <Controls
              numDisks={numDisks}
              setNumDisks={handleSetNumDisks}
              isPlaying={isPlaying}
              isFinished={isFinished}
              currentStep={currentStep}
              totalMoves={totalMoves}
              speed={speed}
              setSpeed={setSpeed}
              onPlay={play}
              onPause={pause}
              onReset={reset}
              onNext={nextStep}
              onPrev={prevStep}
            />

            {/* Tabs para painel inferior (mobile-first) */}
            <div className="mobile-tabs">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'tab-btn--active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Painel de tab ativa (sempre visível em mobile) */}
            <div className="mobile-panel">
              {activeTab === 'info' && (
                <InfoPanel
                  numDisks={numDisks}
                  currentStep={currentStep}
                  currentMove={currentMove}
                  totalMoves={totalMoves}
                  calls={calls}
                  moves={moves}
                />
              )}
              {activeTab === 'tree' && (
                <RecursiveTree
                  calls={calls}
                  moves={moves}
                  currentStep={currentStep}
                  numDisks={numDisks}
                />
              )}
              {activeTab === 'stack' && (
                <StackViewer calls={calls} moves={moves} currentStep={currentStep} />
              )}
              {activeTab === 'history' && (
                <MoveHistory moves={moves} currentStep={currentStep} />
              )}
              {activeTab === 'dfs' && (
                <SearchExplanation numDisks={numDisks} />
              )}
            </div>
          </main>

          {/* ── Coluna direita: Stack + Info + History (desktop) ── */}
          <aside className="sidebar sidebar-right">
            <StackViewer calls={calls} moves={moves} currentStep={currentStep} />
            <InfoPanel
              numDisks={numDisks}
              currentStep={currentStep}
              currentMove={currentMove}
              totalMoves={totalMoves}
              calls={calls}
              moves={moves}
            />
            <MoveHistory moves={moves} currentStep={currentStep} />
            <SearchExplanation numDisks={numDisks} />
          </aside>
        </div>
      )}
    </div>
  )
}

const TABS = [
  { id: 'info',    icon: '📖', label: 'Didático' },
  { id: 'tree',    icon: '🌳', label: 'Árvore'   },
  { id: 'stack',   icon: '📚', label: 'Pilha'    },
  { id: 'history', icon: '📋', label: 'Histórico'},
  { id: 'dfs',     icon: '🔍', label: 'DFS'      },
]
