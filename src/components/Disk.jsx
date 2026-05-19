import { motion } from 'framer-motion'

// Cores por índice de disco (do menor ao maior)
const DISK_COLORS = [
  { bg: 'linear-gradient(135deg, #f72585, #b5179e)', shadow: '#f72585' },
  { bg: 'linear-gradient(135deg, #7209b7, #560bad)', shadow: '#7209b7' },
  { bg: 'linear-gradient(135deg, #3a0ca3, #4361ee)', shadow: '#4361ee' },
  { bg: 'linear-gradient(135deg, #4cc9f0, #4895ef)', shadow: '#4cc9f0' },
  { bg: 'linear-gradient(135deg, #06d6a0, #118ab2)', shadow: '#06d6a0' },
  { bg: 'linear-gradient(135deg, #ffd166, #ef476f)', shadow: '#ffd166' },
  { bg: 'linear-gradient(135deg, #e9c46a, #f4a261)', shadow: '#e9c46a' },
]

export default function Disk({ size, numDisks, isActive }) {
  const color = DISK_COLORS[(size - 1) % DISK_COLORS.length]

  // Largura proporcional ao tamanho do disco
  const widthPct = 28 + ((size / numDisks) * 62)
  const height = 34

  return (
    <motion.div
      layoutId={`disk-${size}`}
      layout
      className="disk"
      style={{
        width: `${widthPct}%`,
        height,
        background: color.bg,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.9)',
        fontSize: 13,
        fontFamily: 'JetBrains Mono, monospace',
        fontWeight: 700,
        userSelect: 'none',
        flexShrink: 0,
        position: 'relative',
        zIndex: size,
      }}
      animate={{
        boxShadow: isActive
          ? `0 0 18px 4px ${color.shadow}cc, 0 0 6px ${color.shadow}`
          : `0 2px 8px rgba(0,0,0,0.4)`,
        scale: isActive ? 1.05 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
    >
      {size}
    </motion.div>
  )
}
