import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card, { CardBody } from '../common/Card';

export default function StatsCard({
  title,
  value,
  change,
  changeType = 'positive', // 'positive' | 'negative' | 'neutral'
  label = 'vs last month',
  icon: Icon,
  sparklineData = [], // array of numbers for sparkline line
}) {
  const isPositive = changeType === 'positive';
  const isNegative = changeType === 'negative';

  // SVG path generation for sparkline
  const generateSparklinePath = (data) => {
    if (!data || data.length < 2) return '';
    const width = 100;
    const height = 30;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min === 0 ? 1 : max - min;

    const points = data.map((val, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * height + 2; // pad 2px top/bottom
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    return `M ${points.join(' L ')}`;
  };

  const sparklinePath = generateSparklinePath(sparklineData);

  return (
    <Card hoverEffect className="overflow-hidden">
      <CardBody className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider">
              {title}
            </span>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {value}
              </span>
              {change && (
                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isPositive
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                      : isNegative
                      ? 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                      : 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {isPositive && <ArrowUpRight className="w-3.5 h-3.5" />}
                  {isNegative && <ArrowDownRight className="w-3.5 h-3.5" />}
                  {change}
                </span>
              )}
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500 block">
              {label}
            </span>
          </div>

          {/* Right Section: Icon or Sparkline */}
          <div className="flex flex-col items-end justify-between h-full space-y-4">
            {Icon && (
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
                <Icon className="w-5 h-5" />
              </div>
            )}

            {/* Sparkline chart SVG */}
            {sparklineData.length > 1 && (
              <div className="w-24 h-8 mt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 32">
                  <path
                    d={sparklinePath}
                    fill="none"
                    stroke={isPositive ? '#10b981' : isNegative ? '#ef4444' : '#8b5cf6'}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Subtle gradient fill below sparkline */}
                  <path
                    d={`${sparklinePath} L 100,32 L 0,32 Z`}
                    fill={`url(#gradient-${title.replace(/\s+/g, '-').toLowerCase()})`}
                    className="opacity-10"
                  />
                  <defs>
                    <linearGradient
                      id={`gradient-${title.replace(/\s+/g, '-').toLowerCase()}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={isPositive ? '#10b981' : isNegative ? '#ef4444' : '#8b5cf6'}
                      />
                      <stop
                        offset="100%"
                        stopColor={isPositive ? '#10b981' : isNegative ? '#ef4444' : '#8b5cf6'}
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
