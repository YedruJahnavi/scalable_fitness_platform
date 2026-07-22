import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const VALUES = [42, 68, 55, 88, 35, 100, 63];
const PERIODS = ['D', 'W', 'M'];

export function ActivityChart({ itemVariants }) {
  const [period, setPeriod] = useState('W');
  const max = Math.max(...VALUES);

  return (
    <motion.section
      variants={itemVariants}
      className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative z-10">
        <div>
          <h2 className="text-xl font-space font-bold text-slate-900">Activity Load</h2>
          <p className="text-sm text-slate-500 font-medium mt-0.5">Physical exertion over 7 days</p>
        </div>

        {/* Period tabs */}
        <div className="flex bg-slate-100 border border-slate-200 rounded-xl p-1 gap-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'w-9 h-9 rounded-lg text-sm font-semibold transition-all',
                period === p
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Bar chart */}
      <div className="h-52 flex items-end justify-between gap-2 sm:gap-3 relative z-10 px-1">
        {DAYS.map((day, i) => {
          const pct = (VALUES[i] / max) * 100;
          const isPeak = VALUES[i] === max;
          return (
            <div key={day} className="flex-1 flex flex-col items-center gap-3 group/bar h-full justify-end">
              {/* Tooltip */}
              <div className="opacity-0 group-hover/bar:opacity-100 transition-all translate-y-1 group-hover/bar:translate-y-0 pointer-events-none">
                <div className="bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-lg whitespace-nowrap">
                  {VALUES[i]}%
                </div>
              </div>

              {/* Bar */}
              <div className="w-full flex flex-col justify-end" style={{ height: '80%' }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${pct}%` }}
                  transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'w-full rounded-xl relative overflow-hidden transition-all',
                    isPeak
                      ? 'bg-blue-600'
                      : 'bg-blue-100 group-hover/bar:bg-blue-200'
                  )}
                />
              </div>

              <span className={cn(
                "text-[10px] font-medium transition-colors",
                isPeak ? "text-blue-600 font-bold" : "text-slate-400 group-hover/bar:text-slate-600"
              )}>
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
