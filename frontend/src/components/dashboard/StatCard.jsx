import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export function StatCard({ stat }) {
  const Icon = stat.icon;
  // Derive a CSS color string from the Tailwind class (fallback to blue-600)
  const colorHex = stat.color.match(/#[0-9A-Fa-f]+/)?.[0] ?? '#2563EB';

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-6 flex flex-col gap-4 cursor-pointer group"
      style={{ '--stat-color': colorHex }}
    >
      {/* Top row: icon + trend */}
      <div className="flex items-center justify-between relative z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${colorHex}18` }}
        >
          <Icon className="w-5 h-5" style={{ color: colorHex }} />
        </div>

        <div
          className={cn(
            'flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full',
            stat.isPositive
              ? 'text-emerald-700 bg-emerald-50'
              : 'text-red-700 bg-red-50'
          )}
        >
          {stat.isPositive
            ? <TrendingUp size={11} />
            : <TrendingDown size={11} />
          }
          {stat.trend}
        </div>
      </div>

      {/* Metric value */}
      <div className="relative z-10">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-space font-bold text-slate-900 tracking-tight">
            {stat.value}
          </span>
          <span className="text-sm font-medium" style={{ color: colorHex }}>
            {stat.unit}
          </span>
        </div>
        <p className="text-sm text-slate-500 font-medium mt-0.5">{stat.label}</p>
      </div>

      {/* Bottom accent bar */}
      <div className="relative z-10 mt-auto h-[3px] w-full rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: stat.isPositive ? '72%' : '45%' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="h-full rounded-full"
          style={{ backgroundColor: colorHex }}
        />
      </div>
    </motion.div>
  );
}
