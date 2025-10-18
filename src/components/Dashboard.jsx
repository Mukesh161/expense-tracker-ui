import React from 'react'

export default function Dashboard({ expenses }) {
  const total = expenses.reduce((s, e) => s + Number(e.amount), 0)
  const last = expenses[0]
  const byMonth = expenses.reduce((acc, e) => {
    const d = new Date(e.date)
    const key = `${d.getFullYear()}-${('0' + (d.getMonth()+1)).slice(-2)}`
    acc[key] = (acc[key] || 0) + Number(e.amount)
    return acc
  }, {})

  return (
    <div className="panel">
      <h3>Dashboard</h3>
      <div className="stats">
        <div className="stat">
          <div className="label">Total</div>
          <div className="value">${total.toFixed(2)}</div>
        </div>
        <div className="stat">
          <div className="label">Expenses</div>
          <div className="value">{expenses.length}</div>
        </div>
        <div className="stat">
          <div className="label">Last Added</div>
          <div className="value">{last ? `${last.title} - $${Number(last.amount).toFixed(2)}` : '—'}</div>
        </div>
      </div>

      <section className="history">
        <h4>Monthly totals</h4>
        <ul>
          {Object.entries(byMonth).sort((a,b)=>b[0].localeCompare(a[0])).map(([k,v]) => (
            <li key={k}>{k}: ${v.toFixed(2)}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
