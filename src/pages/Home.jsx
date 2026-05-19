import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TutorialModal from '../components/TutorialModal.jsx'

export default function Home({ onStart }) {
  const [showTutorial, setShowTutorial] = useState(false)

  const handleTutorialClose = () => {
    setShowTutorial(false)
    onStart()
  }

  return (
    <div className="home">
      {/* Fundo animado */}
      <div className="home-bg">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-disk"
            style={{
              width: 40 + i * 18,
              height: 40 + i * 18,
              left: `${(i * 8.5) % 95}%`,
              top: `${(i * 13 + 5) % 85}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.04, 0.1, 0.04],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 + i * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="home-content">
        {/* Logo / título */}
        <motion.div
          className="home-hero"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="home-icon">🗼</div>
          <h1 className="home-title">Torre de Hanói</h1>
          <p className="home-subtitle">
            Visualização interativa de <strong>recursão</strong>,{' '}
            <strong>DFS</strong> e <strong>estruturas de dados</strong>
          </p>
        </motion.div>

        {/* Cards de funcionalidades */}
        <motion.div
          className="home-features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.04, y: -4 }}
            >
              <span className="feature-icon">{f.icon}</span>
              <span className="feature-title">{f.title}</span>
              <span className="feature-desc">{f.desc}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Botões de ação */}
        <motion.div
          className="home-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            className="btn btn-primary btn-hero"
            onClick={() => setShowTutorial(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            📚 Ver Tutorial e Iniciar
          </motion.button>
          <motion.button
            className="btn btn-ghost btn-hero"
            onClick={onStart}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            ▶ Pular Tutorial
          </motion.button>
        </motion.div>

        {/* Fórmula */}
        <motion.div
          className="home-formula"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <span>T(n) = 2ⁿ − 1</span>
          <span className="formula-sep">|</span>
          <span>Complexidade: O(2ⁿ)</span>
        </motion.div>
      </div>

      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && <TutorialModal onClose={handleTutorialClose} />}
      </AnimatePresence>
    </div>
  )
}

const FEATURES = [
  { icon: '🌳', title: 'Árvore Recursiva', desc: 'Visualize cada chamada e seu retorno em tempo real' },
  { icon: '📚', title: 'Pilha de Chamadas', desc: 'Acompanhe o empilhamento e desempilhamento de frames' },
  { icon: '🔍', title: 'Busca DFS', desc: 'Entenda como o DFS resolve o problema recursivamente' },
  { icon: '⚡', title: 'Passo a passo', desc: 'Controle a velocidade e avance manualmente' },
  { icon: '📊', title: 'Complexidade', desc: 'Veja o crescimento exponencial 2ⁿ na prática' },
  { icon: '🎓', title: 'Didático', desc: 'Tutorial explicativo antes de começar a simulação' },
]
