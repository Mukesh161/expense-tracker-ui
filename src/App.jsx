import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import AddExpense from './components/AddExpense'
import ExpenseList from './components/ExpenseList'
import Analytics from './components/Analytics'
import NavBar from './components/NavBar'
import { ThemeProvider } from './contexts/ThemeContext'

const FEATURES = ['Dashboard', 'Add Expense', 'Expenses', 'Analytics']

export default function App() {
  const [feature, setFeature] = useState(FEATURES[0])
  const [expenses, setExpenses] = useState(() => {
    try {
      const raw = localStorage.getItem('expenses')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  function addExpense(exp) {
    setExpenses(prev => [exp, ...prev])
  }

  function removeExpense(id) {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  return (
    <ThemeProvider>
      <div className="app">
        <NavBar />
        <div className="main-container">
          <Sidebar features={FEATURES} active={feature} onSelect={setFeature} />
          <main className="content">
            {feature === 'Dashboard' && <Dashboard expenses={expenses} />}
            {feature === 'Add Expense' && <AddExpense onAdd={addExpense} />}
            {feature === 'Expenses' && <ExpenseList expenses={expenses} onRemove={removeExpense} />}
            {feature === 'Analytics' && <Analytics />}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
