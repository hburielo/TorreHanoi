import { motion } from 'framer-motion'

const SPEED_OPTIONS = [
  { label: '0.5×', value: 0.5 },
  { label: '1×',   value: 1 },
  { label: '2×',   value: 2 },
  { label: '4×',   value: 4 },
]

export default function Controls({
  numDisks, setNumDisks,
  isPlaying, isFinished,
  currentStep, totalMoves,
  speed, setSpeed,
  onPlay, onPause, onReset, onNext, onPrev,
}) {
  const progress = totalMoves > 0 ? ((currentStep + 1) / totalMoves) * 100 : 0

  return (
    <div className="controls-panel">
      {/* Barra de progresso */}
      <div className="progress-bar-wrap">
        <div className="progress-bar-track">
          <motion.div
            className="progress-bar-fill"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
        <span className="progress-label">
          {currentStep < 0 ? 'Início' : isFinished ? 'Concluído! ✓' : `Passo ${currentStep + 1} / ${totalMoves}`}
        </span>
      </div>

      {/* Botões de reprodução */}
      <div className="playback-btns">
        <button className="btn btn-ghost" onClick={onReset} title="Reiniciar">
          ⏮
        </button>
        <button className="btn btn-ghost" onClick={onPrev} disabled={currentStep < 0} title="Anterior">
          ◀
        </button>

        {isPlaying ? (
          <motion.button
            className="btn btn-primary"
            onClick={onPause}
            whileTap={{ scale: 0.93 }}
          >
            ⏸ Pausar
          </motion.button>
        ) : (
          <motion.button
            className="btn btn-primary"
            onClick={onPlay}
            whileTap={{ scale: 0.93 }}
            disabled={isFinished && currentStep >= 0}
          >
            {currentStep < 0 ? '▶ Iniciar' : isFinished ? '✓ Fim' : '▶ Continuar'}
          </motion.button>
        )}

        <button className="btn btn-ghost" onClick={onNext} disabled={isFinished} title="Próximo">
          ▶
        </button>
      </div>

      {/* Configurações: discos + velocidade */}
      <div className="config-row">
        <div className="config-group">
          <label className="config-label">Discos</label>
          <div className="disk-btns">
            {[2, 3, 4, 5, 6, 7].map(n => (
              <button
                key={n}
                className={`btn btn-sm ${numDisks === n ? 'btn-accent' : 'btn-ghost'}`}
                onClick={() => setNumDisks(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="config-group">
          <label className="config-label">Velocidade</label>
          <div className="speed-btns">
            {SPEED_OPTIONS.map(opt => (
              <button
                key={opt.value}
                className={`btn btn-sm ${speed === opt.value ? 'btn-accent' : 'btn-ghost'}`}
                onClick={() => setSpeed(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
