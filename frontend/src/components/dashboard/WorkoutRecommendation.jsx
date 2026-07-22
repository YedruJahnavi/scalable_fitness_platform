import { motion } from 'framer-motion';
import { Zap, Clock, Flame, ChevronRight } from 'lucide-react';

const RECOMMENDATIONS = [
  {
    label: 'HIIT Intervals',
    duration: '25 min',
    kcal: '320',
    intensity: 'High',
    color: '#EF4444', // red-500
    bg: 'bg-red-50',
    border: 'border-red-100',
  },
  {
    label: 'Mobility Flow',
    duration: '15 min',
    kcal: '90',
    intensity: 'Low',
    color: '#10B981', // emerald-500
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    label: 'Strength Circuit',
    duration: '40 min',
    kcal: '480',
    intensity: 'Medium',
    color: '#3B82F6', // blue-500
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
];

export function WorkoutRecommendation({ itemVariants }) {
  return (
    <motion.section
      variants={itemVariants}
      className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 flex flex-col gap-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-space font-bold text-slate-900">Recommended</h2>
          <p className="text-sm text-slate-500 font-medium mt-0.5">Based on your readiness</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center">
          <Zap className="w-4 h-4 text-blue-600" />
        </div>
      </div>

      {/* Recommendation list */}
      <div className="flex flex-col gap-3">
        {RECOMMENDATIONS.map((rec, i) => (
          <motion.button
            key={i}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.15 }}
            className={`w-full text-left ${rec.bg} border ${rec.border} rounded-2xl p-4 flex items-center gap-4 group cursor-pointer shadow-sm`}
          >
            {/* Color dot */}
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: rec.color }}
            />

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{rec.label}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Clock size={10} />
                  {rec.duration}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Flame size={10} />
                  {rec.kcal} kcal
                </span>
              </div>
            </div>

            {/* Intensity badge + arrow */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-100 shadow-sm"
                style={{ color: rec.color }}
              >
                {rec.intensity}
              </span>
              <ChevronRight
                size={14}
                className="text-slate-300 group-hover:text-slate-600 transition-colors"
              />
            </div>
          </motion.button>
        ))}
      </div>

      {/* CTA */}
      <button className="w-full mt-auto py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 shadow-sm transition-all">
        View All Workouts →
      </button>
    </motion.section>
  );
}
