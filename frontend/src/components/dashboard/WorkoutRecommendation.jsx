import { motion } from 'framer-motion';
import { Zap, Clock, Flame, ChevronRight } from 'lucide-react';
import './WorkoutRecommendation.css';

const RECOMMENDATIONS = [
  {
    label: 'HIIT Intervals',
    duration: '25 min',
    kcal: '320',
    intensity: 'High',
    color: '#FF6B35', // orange
  },
  {
    label: 'Mobility Flow',
    duration: '15 min',
    kcal: '90',
    intensity: 'Low',
    color: '#34D399', // green
  },
  {
    label: 'Strength Circuit',
    duration: '40 min',
    kcal: '480',
    intensity: 'Medium',
    color: '#7C3AED', // purple
  },
];

export function WorkoutRecommendation({ itemVariants }) {
  return (
    <motion.section
      variants={itemVariants}
      className="workout-recommendation"
    >
      <div className="recommendation-header">
        <div>
          <h2 className="recommendation-title">Recommended</h2>
          <p className="recommendation-subtitle">Based on your readiness</p>
        </div>
        <div className="recommendation-icon-wrap">
          <Zap size={16} />
        </div>
      </div>

      <div className="recommendation-list">
        {RECOMMENDATIONS.map((rec, i) => (
          <motion.button
            key={i}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.15 }}
            className="recommendation-item"
          >
            <div
              className="item-dot"
              style={{ backgroundColor: rec.color, color: rec.color }}
            />

            <div className="item-details">
              <p className="item-title">{rec.label}</p>
              <div className="item-meta">
                <span className="item-meta-info">
                  <Clock size={12} />
                  {rec.duration}
                </span>
                <span className="item-meta-info">
                  <Flame size={12} />
                  {rec.kcal} kcal
                </span>
              </div>
            </div>

            <div className="item-badge-wrap">
              <span
                className="item-badge"
                style={{ color: rec.color }}
              >
                {rec.intensity}
              </span>
              <ChevronRight
                size={16}
                className="item-chevron"
              />
            </div>
          </motion.button>
        ))}
      </div>

      <button className="recommendation-cta">
        View All Workouts →
      </button>
    </motion.section>
  );
}
