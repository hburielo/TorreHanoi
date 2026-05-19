import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getDFSVisitSequence, DFS_DEMO_TREE } from '../algorithms/dfs.js'

const TOTAL_SLIDES = 5

// Sequence calculada uma vez no nível de módulo (referência estável)
const DFS_SEQUENCE = getDFSVisitSequence(DFS_DEMO_TREE)

// ─── Slide 1: O que é Busca ───────────────────────────────────────────
function SlideSearch() {
  return (
    <div className="slide-content">
      <h2 className="slide-title">O que é um Algoritmo de Busca?</h2>
      <p className="slide-text">
        Um algoritmo de busca é um método sistemático para <strong>explorar possibilidades</strong>{' '}
        e encontrar uma solução dentro de um espaço de estados.
      </p>

      <div className="concept-grid">
        <ConceptCard icon="🗺️" title="Exploração" text="Percorre possibilidades de forma ordenada" color="#4361ee" />
        <ConceptCard icon="🎯" title="Objetivo" text="Busca um estado que satisfaça as condições" color="#06d6a0" />
        <ConceptCard icon="🔀" title="Decisão" text="Escolhe qual caminho seguir a cada passo" color="#f72585" />
        <ConceptCard icon="↩️" title="Backtrack" text="Volta atrás quando um caminho falha" color="#ffd166" />
      </div>

      <div className="slide-highlight">
        <span className="highlight-icon">💡</span>
        <span>
          A Torre de Hanói pode ser resolvida por uma busca guiada pela recursão — que é
          essencialmente <strong>Busca em Profundidade (DFS)</strong>.
        </span>
      </div>
    </div>
  )
}

// ─── Slide 2: DFS ─────────────────────────────────────────────────────
function SlideDFS() {
  const [visited, setVisited] = useState(new Set())
  const [current, setCurrent] = useState(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step >= DFS_SEQUENCE.length) return
    const t = setTimeout(() => {
      const id = DFS_SEQUENCE[step]
      setCurrent(id)
      setVisited(prev => new Set([...prev, id]))
      setStep(s => s + 1)
    }, 700)
    return () => clearTimeout(t)
  }, [step])

  // Reinicia ao entrar no slide
  useEffect(() => {
    const t = setTimeout(() => {
      setVisited(new Set())
      setCurrent(null)
      setStep(0)
    }, 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="slide-content">
      <h2 className="slide-title">Busca em Profundidade — DFS</h2>
      <p className="slide-text">
        O DFS explora um caminho <strong>até o fim</strong> antes de voltar e tentar outro.
        Observe a animação:
      </p>

      <DFSTree node={DFS_DEMO_TREE} visited={visited} current={current} />

      <div className="dfs-legend">
        <span className="dfs-leg visited">● Visitado</span>
        <span className="dfs-leg current">● Atual</span>
        <span className="dfs-leg unvisited">● Não visitado</span>
      </div>

      <div className="dfs-code-box">
        <span className="code-kw">function</span>{' '}
        <span className="code-fn">dfs</span>(nó){' {'}<br />
        {'  '}<span className="code-cmt">// visita o nó</span><br />
        {'  '}visitar(nó)<br />
        {'  '}<span className="code-kw">for</span> (filho <span className="code-kw">of</span> nó.filhos){'  {'}<br />
        {'    '}<span className="code-fn">dfs</span>(filho){' // recursão!'}<br />
        {'  }'}<br />
        {'}'}
      </div>
    </div>
  )
}

function DFSTree({ node, visited, current, depth = 0 }) {
  const isVisited = visited.has(node.id)
  const isCurrent = current === node.id

  return (
    <div className="dfs-tree-node-wrap" style={{ marginLeft: depth * 20 }}>
      <div className="dfs-tree-row">
        {depth > 0 && <span className="dfs-connector">└── </span>}
        <motion.div
          className={`dfs-node ${isVisited ? 'dfs-node--visited' : ''} ${isCurrent ? 'dfs-node--current' : ''}`}
          animate={{
            scale: isCurrent ? 1.2 : isVisited ? 1.05 : 1,
            backgroundColor: isCurrent
              ? '#f72585'
              : isVisited
              ? '#4361ee'
              : 'rgba(255,255,255,0.08)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {node.label}
        </motion.div>
      </div>
      {node.children.map(child => (
        <DFSTree key={child.id} node={child} visited={visited} current={current} depth={depth + 1} />
      ))}
    </div>
  )
}

// ─── Slide 3: Recursão ────────────────────────────────────────────────
function SlideRecursion() {
  const [stackDepth, setStackDepth] = useState(0)
  const maxDepth = 4

  const stackFrames = [
    { fn: 'hanoi(4, A→C)', color: '#4cc9f0' },
    { fn: 'hanoi(3, A→B)', color: '#7209b7' },
    { fn: 'hanoi(2, A→C)', color: '#f72585' },
    { fn: 'hanoi(1, A→B)', color: '#06d6a0', isBase: true },
  ]

  useEffect(() => {
    let d = 0
    let going = true
    const interval = setInterval(() => {
      setStackDepth(going ? d + 1 : d - 1)
      if (going) {
        d++
        if (d >= maxDepth) going = false
      } else {
        d--
        if (d <= 0) going = true
      }
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="slide-content">
      <h2 className="slide-title">Como funciona a Recursão?</h2>
      <p className="slide-text">
        Uma função é <strong>recursiva</strong> quando chama a si mesma com um problema
        menor, até atingir o <strong>caso base</strong> — a solução trivial.
      </p>

      <div className="recursion-layout">
        {/* Pilha animada */}
        <div className="recursion-stack">
          <div className="rec-stack-label">Pilha de chamadas</div>
          <div className="rec-stack-frames">
            <AnimatePresence>
              {stackFrames.slice(0, stackDepth).map((frame, i) => (
                <motion.div
                  key={frame.fn}
                  className={`rec-frame ${frame.isBase ? 'rec-frame--base' : ''}`}
                  style={{ borderColor: frame.color, color: frame.color }}
                  initial={{ opacity: 0, y: -15, scaleX: 0.8 }}
                  animate={{ opacity: 1, y: 0, scaleX: 1 }}
                  exit={{ opacity: 0, y: 15, scaleX: 0.8 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                >
                  {frame.fn}
                  {frame.isBase && <span className="base-tag">caso base</span>}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Explicação */}
        <div className="recursion-explain">
          <div className="rec-rule">
            <span className="rec-rule-num">1</span>
            <span>
              <strong>Caso base:</strong> hanoi(1) → move o disco diretamente
            </span>
          </div>
          <div className="rec-rule">
            <span className="rec-rule-num">2</span>
            <span>
              <strong>Passo recursivo:</strong> resolve n−1 discos,
              move o maior, resolve n−1 novamente
            </span>
          </div>
          <div className="rec-rule">
            <span className="rec-rule-num">3</span>
            <span>
              <strong>Retorno:</strong> ao resolver o caso base, os resultados
              "sobem" pela pilha
            </span>
          </div>
        </div>
      </div>

      <div className="rec-formula">
        <span className="rec-formula-text">T(n) = 2·T(n−1) + 1</span>
        <span className="rec-formula-arrow">solução fechada →</span>
        <span className="rec-formula-result">T(n) = 2ⁿ − 1</span>
      </div>
    </div>
  )
}

// ─── Slide 4: Torre de Hanói ─────────────────────────────────────────
function SlideHanoi() {
  return (
    <div className="slide-content">
      <h2 className="slide-title">Torre de Hanói</h2>
      <p className="slide-text">
        O quebra-cabeça tem 3 torres e n discos. O objetivo é mover{' '}
        <strong>todos os discos de A para C</strong> seguindo as regras:
      </p>

      <div className="hanoi-rules">
        <RuleCard
          num="1"
          title="Um disco por vez"
          desc="Você pode mover apenas um disco em cada passo."
          icon="☝️"
          color="#4cc9f0"
        />
        <RuleCard
          num="2"
          title="Apenas o topo"
          desc="Só é permitido mover o disco no topo de uma torre."
          icon="⬆️"
          color="#f72585"
        />
        <RuleCard
          num="3"
          title="Maior não sobre menor"
          desc="Nenhum disco pode ser colocado sobre um menor."
          icon="🚫"
          color="#06d6a0"
        />
      </div>

      {/* Mini torres estáticas */}
      <div className="mini-towers">
        <MiniTower label="A (Origem)" disks={[3, 2, 1]} />
        <div className="mini-arrow">→</div>
        <MiniTower label="B (Auxiliar)" disks={[]} />
        <div className="mini-arrow">→</div>
        <MiniTower label="C (Destino)" disks={[3, 2, 1]} isGoal />
      </div>

      <div className="slide-highlight">
        <span className="highlight-icon">🧠</span>
        <span>
          O algoritmo resolve para <strong>n discos</strong> em exatamente{' '}
          <strong>2ⁿ − 1 movimentos</strong> — o mínimo possível!
        </span>
      </div>
    </div>
  )
}

function MiniTower({ label, disks, isGoal }) {
  const colors = ['#4cc9f0', '#f72585', '#06d6a0']
  return (
    <div className="mini-tower">
      <div className="mini-tower-label">{label}</div>
      <div className="mini-tower-body">
        <div className="mini-pole" style={{ background: isGoal ? '#06d6a0' : 'rgba(255,255,255,0.2)' }} />
        <div className="mini-disks">
          {[...disks].reverse().map((d, i) => (
            <div
              key={d}
              className="mini-disk"
              style={{
                width: `${45 + d * 18}%`,
                background: colors[(d - 1) % 3],
                opacity: isGoal ? 1 : 0.85,
              }}
            >
              {d}
            </div>
          ))}
        </div>
        <div className="mini-base" />
      </div>
    </div>
  )
}

// ─── Slide 5: Pronto! ─────────────────────────────────────────────────
function SlideReady({ onStart }) {
  return (
    <div className="slide-content slide-ready">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        className="ready-icon"
      >
        🗼
      </motion.div>
      <h2 className="slide-title">Pronto para começar!</h2>
      <p className="slide-text">
        Na simulação você verá em tempo real:
      </p>
      <div className="ready-features">
        {[
          { icon: '🌳', text: 'Árvore de chamadas recursivas' },
          { icon: '📚', text: 'Pilha de execução animada' },
          { icon: '🎯', text: 'Movimento dos discos passo a passo' },
          { icon: '📖', text: 'Explicação didática de cada passo' },
          { icon: '📋', text: 'Histórico completo de movimentos' },
          { icon: '📊', text: 'Análise de complexidade' },
        ].map((f, i) => (
          <motion.div
            key={i}
            className="ready-feature"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <span>{f.icon}</span>
            <span>{f.text}</span>
          </motion.div>
        ))}
      </div>
      <motion.button
        className="btn btn-start-big"
        onClick={onStart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        🚀 Iniciar Simulação
      </motion.button>
    </div>
  )
}

// ─── Sub-componentes auxiliares ───────────────────────────────────────
function ConceptCard({ icon, title, text, color }) {
  return (
    <div className="concept-card" style={{ borderColor: color + '55' }}>
      <div className="concept-icon">{icon}</div>
      <div className="concept-title" style={{ color }}>{title}</div>
      <div className="concept-text">{text}</div>
    </div>
  )
}

function RuleCard({ num, title, desc, icon, color }) {
  return (
    <div className="rule-card" style={{ borderColor: color + '66' }}>
      <div className="rule-num" style={{ background: color }}>
        {num}
      </div>
      <div className="rule-icon">{icon}</div>
      <div className="rule-title" style={{ color }}>{title}</div>
      <div className="rule-desc">{desc}</div>
    </div>
  )
}

// ─── Modal principal ──────────────────────────────────────────────────
const SLIDES = [
  { title: 'Algoritmos de Busca', component: SlideSearch },
  { title: 'DFS', component: SlideDFS },
  { title: 'Recursão', component: SlideRecursion },
  { title: 'Torre de Hanói', component: SlideHanoi },
  { title: 'Começar!', component: null },
]

export default function TutorialModal({ onClose }) {
  const [slide, setSlide] = useState(0)
  const [direction, setDirection] = useState(1)

  const goNext = () => {
    if (slide >= TOTAL_SLIDES - 1) return
    setDirection(1)
    setSlide(s => s + 1)
  }

  const goPrev = () => {
    if (slide <= 0) return
    setDirection(-1)
    setSlide(s => s - 1)
  }

  const variants = {
    enter: d => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: d => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  }

  const CurrentSlide = slide < 4 ? SLIDES[slide].component : null

  return (
    <div className="tutorial-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div
        className="tutorial-modal"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        {/* Cabeçalho */}
        <div className="tutorial-header">
          <div className="tutorial-steps">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                className={`tutorial-step-dot ${i === slide ? 'active' : i < slide ? 'done' : ''}`}
                onClick={() => { setDirection(i > slide ? 1 : -1); setSlide(i) }}
                title={s.title}
              />
            ))}
          </div>

          {/* Barra de progresso */}
          <div className="tutorial-progress-bar">
            <motion.div
              className="tutorial-progress-fill"
              animate={{ width: `${((slide + 1) / TOTAL_SLIDES) * 100}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>

          <button className="tutorial-close" onClick={onClose} title="Fechar tutorial">
            ✕
          </button>
        </div>

        {/* Título do slide */}
        <div className="tutorial-slide-label">
          {slide + 1} / {TOTAL_SLIDES} — {SLIDES[slide].title}
        </div>

        {/* Corpo animado */}
        <div className="tutorial-body">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={slide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              style={{ width: '100%' }}
            >
              {slide === 4 ? (
                <SlideReady onStart={onClose} />
              ) : (
                <CurrentSlide />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Rodapé com navegação */}
        {slide < 4 && (
          <div className="tutorial-footer">
            <button
              className="btn btn-ghost"
              onClick={goPrev}
              disabled={slide === 0}
            >
              ← Anterior
            </button>

            <button className="btn btn-skip" onClick={onClose}>
              Pular tutorial
            </button>

            <button className="btn btn-primary" onClick={goNext}>
              {slide === 3 ? '🚀 Começar!' : 'Próximo →'}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
