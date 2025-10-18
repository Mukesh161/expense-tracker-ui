import React, { useState } from 'react'

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8)
}

export default function AddExpense({ onAdd }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [category, setCategory] = useState('Misc')

  function submit(e) {
    e.preventDefault()
    if (!title.trim() || !amount) return
    onAdd({ id: uid(), title: title.trim(), amount: Number(amount), date, category })
    setTitle('')
    setAmount('')
    setDate(new Date().toISOString().slice(0,10))
    setCategory('Misc')
  }

  return (
    <div className="panel">
      <h3>Add Expense</h3>
      <form className="form" onSubmit={submit}>
        <label>
          Title
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Amount
          <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} />
        </label>
        <label>
          Date
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <label>
          Category
          <input value={category} onChange={e => setCategory(e.target.value)} />
        </label>
        <div className="form-actions">
          <button type="submit" className="primary">Add</button>
        </div>
      </form>
    </div>
  )
}
