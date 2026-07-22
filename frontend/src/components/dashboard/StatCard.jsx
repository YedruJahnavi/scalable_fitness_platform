import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './StatCard.css';

export function StatCard({ stat }) {
  const Icon = stat.icon;
  const colorHex = stat.color.match(/#[0-9A-Fa-f]+/)?.[0] ?? '#CCFF00';

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="stat-card"
      style={{ '--stat-color': colorHex }}
    >
      <div className="stat-top-row">
        <div className="stat-icon-wrap">
          <Icon size={20} style={{ color: colorHex }} />
        </div>

        <div className={`stat-trend ${stat.isPositive ? 'positive' : 'negative'}`}>
          {stat.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {stat.trend}
        </div>
      </div>

      <div className="stat-value-wrap">
        <div className="stat-value-row">
          <span className="stat-value">{stat.value}</span>
          <span className="stat-unit">{stat.unit}</span>
        </div>
        <p className="stat-label">{stat.label}</p>
      </div>

      <div className="stat-bar-container">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: stat.isPositive ? '72%' : '45%' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="stat-bar-fill"
        />
      </div>
    </motion.div>
  );
}
