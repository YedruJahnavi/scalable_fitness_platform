import { useState } from 'react';
import { motion } from 'framer-motion';
import './ActivityChart.css';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const VALUES = [42, 68, 55, 88, 35, 100, 63];
const PERIODS = ['D', 'W', 'M'];

export function ActivityChart({ itemVariants }) {
  const [period, setPeriod] = useState('W');
  const max = Math.max(...VALUES);

  return (
    <motion.section
      variants={itemVariants}
      className="activity-chart"
    >
      <div className="chart-header">
        <div>
          <h2 className="chart-title">Activity Load</h2>
          <p className="chart-subtitle">Physical exertion over 7 days</p>
        </div>

        <div className="chart-tabs">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`chart-tab ${period === p ? 'active' : ''}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-body">
        {DAYS.map((day, i) => {
          const pct = (VALUES[i] / max) * 100;
          const isPeak = VALUES[i] === max;
          return (
            <div key={day} className={`chart-col ${isPeak ? 'peak' : ''}`}>
              <div className="chart-tooltip">
                <div className="tooltip-inner">
                  {VALUES[i]}%
                </div>
              </div>

              <div className="chart-bar-wrap">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${pct}%` }}
                  transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="chart-bar"
                />
              </div>

              <span className="chart-label">
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
