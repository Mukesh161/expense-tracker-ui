import React from 'react'

function PieChart({ data, size=240 }){
  const total = data.reduce((s,d)=>s+d.value,0)
  let angle = -Math.PI/2
  const cx = size/2, cy = size/2, r = size/2 - 20

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="chart-svg">
      {data.map((d,i)=>{
        const frac = d.value/total
        const delta = frac * Math.PI * 2
        const x1 = cx + r * Math.cos(angle)
        const y1 = cy + r * Math.sin(angle)
        angle += delta
        const x2 = cx + r * Math.cos(angle)
        const y2 = cy + r * Math.sin(angle)
        const large = delta > Math.PI ? 1 : 0
        const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`
        return <path key={d.key} d={path} fill={d.color} stroke="var(--border)" strokeWidth="2" />
      })}
      <text x={cx} y={cy} textAnchor="middle" fill="var(--text)" fontSize="14">
        Total: ${total.toFixed(2)}
      </text>
    </svg>
  )
}

function BarChart({ data, width=400, height=200 }){
  const max = Math.max(...data.map(d=>d.value), 1)
  const bw = Math.floor(width / data.length)
  const chartHeight = height - 40 // Reserve space for labels
  
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="chart-svg">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.2"/>
        </filter>
      </defs>
      {/* Y-axis gridlines and labels */}
      {[0, 0.25, 0.5, 0.75, 1].map(tick => {
        const y = chartHeight - (tick * chartHeight) + 20
        return (
          <g key={tick}>
            <line 
              x1="0" 
              y1={y} 
              x2={width} 
              y2={y} 
              stroke="var(--border)" 
              strokeWidth="0.5" 
              strokeDasharray="4 4"
            />
            <text 
              x="10" 
              y={y-4} 
              fontSize="10" 
              fill="var(--muted)"
            >
              ${(max * tick).toFixed(0)}
            </text>
          </g>
        )
      })}
      
      {data.map((d,i)=>{
        const h = (d.value / max) * (chartHeight - 40)
        const x = i * bw + 20
        const y = chartHeight - h + 20
        return (
          <g key={d.key}>
            <rect 
              x={x} 
              y={y} 
              width={bw-24} 
              height={h} 
              fill={d.color}
              filter="url(#shadow)"
              rx="4"
            />
            {/* Date label */}
            <text 
              x={x + (bw-24)/2} 
              y={height-10} 
              fontSize="10" 
              textAnchor="middle"
              fill="var(--text)"
              transform={`rotate(-45, ${x + (bw-24)/2}, ${height-10})`}
            >
              {d.key}
            </text>
            {/* Value label */}
            <text 
              x={x + (bw-24)/2} 
              y={y - 6} 
              fontSize="11" 
              textAnchor="middle"
              fill="var(--text)"
              fontWeight="500"
            >
              ${d.value.toFixed(0)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

const COLORS = ['#ef4444','#f97316','#f59e0b','#10b981','#3b82f6','#6366f1','#8b5cf6','#ec4899']

export default function Analytics({ expenses }){
  // group by category
  const byCat = expenses.reduce((acc,e)=>{
    const c = e.category || 'Uncategorized'
    acc[c] = (acc[c] || 0) + Number(e.amount)
    return acc
  }, {})
  const pieData = Object.entries(byCat).map(([k,v],i)=>({ key:k, value:v, color:COLORS[i % COLORS.length] }))

  // monthly totals for bar chart
  const byMonth = expenses.reduce((acc,e)=>{
    const d = new Date(e.date)
    const key = `${d.getFullYear()}-${('0'+(d.getMonth()+1)).slice(-2)}`
    acc[key] = (acc[key] || 0) + Number(e.amount)
    return acc
  }, {})
  const barData = Object.entries(byMonth).sort().map(([k,v],i)=>({ key:k, value:v, color:COLORS[i % COLORS.length] }))

  return (
    <div className="panel analytics-panel">
      <h3>Analytics</h3>
      <div className="charts">
        <div className="chart">
          <h4>Spending by Category</h4>
          {pieData.length ? (
            <>
              <PieChart data={pieData} />
              <div className="legend">
                {pieData.map(d => (
                  <div className="legend-item" key={d.key}>
                    <span className="sw" style={{background:d.color}}></span>
                    <span className="legend-key">{d.key}</span>
                    <span className="legend-value">${d.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="no-data">No data available</p>
          )}
        </div>
        <div className="chart">
          <h4>Monthly Spending</h4>
          {barData.length ? <BarChart data={barData} /> : <p className="no-data">No data available</p>}
        </div>
      </div>
    </div>
  )
}
