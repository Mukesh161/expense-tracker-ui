import React from 'react'

export default function ExpenseList({ expenses, onRemove }) {
  return (
    <div className="panel">
      <h3>Expenses</h3>
      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <ul className="expense-list">
          {expenses.map(e => (
            <li key={e.id} className="expense-item">
              <div className="meta">
                <div className="title">{e.title}</div>
                <div className="date">{new Date(e.date).toLocaleDateString()} • {e.category || 'Misc'}</div>
              </div>
              <div className="amount">${Number(e.amount).toFixed(2)}</div>
              <button className="remove" onClick={() => onRemove(e.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
