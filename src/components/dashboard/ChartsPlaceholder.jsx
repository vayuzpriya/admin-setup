import React, { useState } from 'react';
import Card, { CardHeader, CardBody } from '../common/Card';
import Badge from '../common/Badge';

export default function ChartsPlaceholder() {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Line/Area Chart Mock Data
  const lineChartData = [
    { label: 'Jan', value: 3400, active: 3100 },
    { label: 'Feb', value: 4100, active: 3500 },
    { label: 'Mar', value: 3900, active: 3800 },
    { label: 'Apr', value: 5200, active: 4300 },
    { label: 'May', value: 6800, active: 5100 },
    { label: 'Jun', value: 6400, active: 5900 },
    { label: 'Jul', value: 8100, active: 6800 },
  ];

  // Bar Chart Mock Data
  const barChartData = [
    { label: 'Mon', count: 45 },
    { label: 'Tue', count: 72 },
    { label: 'Wed', count: 95 },
    { label: 'Thu', count: 68 },
    { label: 'Fri', count: 82 },
    { label: 'Sat', count: 34 },
    { label: 'Sun', count: 21 },
  ];

  // Generates SVG coordinates for Area/Line Chart
  const svgWidth = 500;
  const svgHeight = 200;
  const padding = 20;

  const points = lineChartData.map((d, index) => {
    const x = padding + (index / (lineChartData.length - 1)) * (svgWidth - padding * 2);
    // scale between 2000 and 9000
    const y = svgHeight - padding - ((d.value - 2000) / 7000) * (svgHeight - padding * 2);
    return { x, y, label: d.label, val: d.value };
  });

  const secondaryPoints = lineChartData.map((d, index) => {
    const x = padding + (index / (lineChartData.length - 1)) * (svgWidth - padding * 2);
    const y = svgHeight - padding - ((d.active - 2000) / 7000) * (svgHeight - padding * 2);
    return { x, y, label: d.label, val: d.active };
  });

  const linePath = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
  const areaPath = `${linePath} L ${points[points.length - 1].x},${svgHeight - padding} L ${points[0].x},${svgHeight - padding} Z`;

  const secondaryLinePath = `M ${secondaryPoints.map(p => `${p.x},${p.y}`).join(' L ')}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Line / Area Chart - Takes 2 cols */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              Revenue Growth Over Time
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Interactive review of monthly platform gross volumes
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] inline-block" />
              SaaS Sales
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-medium)] inline-block" />
              Direct Sales
            </span>
            <Badge variant="brand" dot>Live</Badge>
          </div>
        </CardHeader>
        <CardBody className="p-6">
          <div className="relative w-full h-[220px]">
            {/* SVG Chart */}
            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              preserveAspectRatio="none"
            >
              {/* Horizontal Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => {
                const y = padding + (i / 4) * (svgHeight - padding * 2);
                return (
                  <line
                    key={i}
                    x1={padding}
                    y1={y}
                    x2={svgWidth - padding}
                    y2={y}
                    stroke="currentColor"
                    className="text-[var(--border-color)]"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                  />
                );
              })}

              {/* Area path with brand gradient */}
              <path
                d={areaPath}
                fill="url(#area-gradient)"
                className="opacity-10"
              />

              {/* Primary Line */}
              <path
                d={linePath}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Secondary Line */}
              <path
                d={secondaryLinePath}
                fill="none"
                stroke="currentColor"
                className="text-[var(--border-medium)]"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Dots for Primary Line */}
              {points.map((p, i) => (
                <g key={i}>
                  {/* Outer glowing halo on hover */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoveredPoint === i ? "8" : "0"}
                    fill="var(--color-primary-alt)"
                    className="opacity-20 transition-all duration-200"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="var(--color-primary)"
                    stroke="var(--white)"
                    strokeWidth="1.5"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                </g>
              ))}

              {/* Gradients */}
              <defs>
                <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Hover Tooltip box */}
            {hoveredPoint !== null && (
              <div
                className="absolute z-10 px-3 py-1.5 bg-[var(--bg-inverse)] text-white rounded-lg text-xs font-semibold shadow-md pointer-events-none transition-all duration-150 animate-fade-in"
                style={{
                  left: `${(hoveredPoint / (lineChartData.length - 1)) * 82 + 8}%`,
                  top: `${(points[hoveredPoint].y / svgHeight) * 70}%`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <div>{lineChartData[hoveredPoint].label}: ${lineChartData[hoveredPoint].value.toLocaleString()}</div>
                <div className="text-[10px] opacity-75 font-normal">Active: ${lineChartData[hoveredPoint].active.toLocaleString()}</div>
              </div>
            )}
          </div>

          {/* X Axis Labels */}
          <div className="flex justify-between items-center px-4 mt-2 text-[10px] font-semibold text-[var(--text-label)] uppercase tracking-wider">
            {lineChartData.map((d, index) => (
              <span key={index}>{d.label}</span>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Bar Chart - Takes 1 col */}
      <Card>
        <CardHeader>
          <h3 className="text-base font-semibold text-[var(--text-primary)]">
            Weekly Activity
          </h3>
          <p className="text-xs text-[var(--text-label)]">
            Aggregated operations per day
          </p>
        </CardHeader>
        <CardBody className="p-6 flex flex-col justify-between h-[260px]">
          {/* Chart Columns container */}
          <div className="flex items-end justify-between h-40 gap-2 px-1 relative">
            {barChartData.map((d, index) => {
              // max operations value is 100 for scaling
              const barHeight = `${(d.count / 100) * 100}%`;
              const isHovered = hoveredBar === index;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center flex-1 group cursor-pointer"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="w-full relative h-40 flex items-end">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        isHovered
                          ? 'bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-purple)] shadow-md shadow-[var(--color-orange-shadow)]'
                          : 'bg-[var(--border-medium)] hover:bg-[var(--text-muted)]'
                      }`}
                      style={{ height: barHeight }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-[var(--text-label)] mt-2">
                    {d.label}
                  </span>
                </div>
              );
            })}

            {/* Hover Tooltip Box */}
            {hoveredBar !== null && (
              <div
                className="absolute z-10 px-2.5 py-1 bg-[var(--bg-inverse)] text-white rounded-lg text-[11px] font-semibold shadow-md pointer-events-none transition-all duration-150 animate-fade-in-up"
                style={{
                  left: `${(hoveredBar / (barChartData.length - 1)) * 75 + 12.5}%`,
                  bottom: '105%',
                  transform: 'translateX(-50%)',
                }}
              >
                {barChartData[hoveredBar].count} Actions
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
