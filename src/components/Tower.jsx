import { motion } from 'framer-motion'
import Disk from './Disk.jsx'

const TOWER_LABELS = {
  A: { name: 'Origem', color: '#4cc9f0' },
  B: { name: 'Auxiliar', color: '#f72585' },
  C: { name: 'Destino', color: '#06d6a0' },
}

export default function Tower({
  name, disks, numDisks,
  isSource, isDest, currentMove,
  onClick, isSelected, isValidDrop, isInvalidDrop, interactive,
}) {
  const label = TOWER_LABELS[name]
  const isActive = isSource || isDest

  const activeDiskSize = currentMove
    ? (isSource ? currentMove.disk : isDest ? currentMove.disk : null)
    : null

  let interactiveClass = ''
  if (interactive) {
    if (isSelected)    interactiveClass = ' tower--selected'
    else if (isValidDrop)  interactiveClass = ' tower--valid-drop'
    else if (isInvalidDrop) interactiveClass = ' tower--invalid'
    else interactiveClass = ' tower--interactive'
  }

  return (
    <div
      className={`tower-wrapper${interactiveClass}`}
      onClick={interactive ? onClick : undefined}
    >
      {/* Label topo */}
      <motion.div
        className="tower-label"
        animate={{ color: isActive ? label.color : 'rgba(255,255,255,0.4)' }}
        transition={{ duration: 0.3 }}
      >
        <span className="tower-letter">{name}</span>
        <span className="tower-name">{label.name}</span>
      </motion.div>

      {/* Container visual */}
      <div className="tower-visual">
        {/* Poste */}
        <motion.div
          className="tower-pole"
          animate={{ background: isActive ? label.color : 'rgba(255,255,255,0.15)' }}
          transition={{ duration: 0.3 }}
        />

        {/* Discos empilhados (topo da pilha = topo visual) */}
        <div className="disks-stack">
          {[...disks].reverse().map(diskSize => (
            <Disk
              key={diskSize}
              size={diskSize}
              numDisks={numDisks}
              isActive={activeDiskSize === diskSize}
            />
          ))}
        </div>

        {/* Base */}
        <motion.div
          className="tower-base"
          animate={{ background: isActive ? label.color : 'rgba(255,255,255,0.15)' }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Contador de discos */}
      <div className="tower-count">
        {disks.length} disco{disks.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
