import React from 'react'

export default function Help({ onClose }) {
  const sections = [
    {
      title: "Getting Started",
      content: "Welcome to Expense Tracker! This tool helps you track and analyze your expenses. Start by adding your first expense using the 'Add Expense' option in the sidebar."
    },
    {
      title: "Dashboard",
      content: "The dashboard shows your total expenses, recent activity, and monthly summaries. Use this to get a quick overview of your spending."
    },
    {
      title: "Analytics",
      content: "The Analytics section provides visual insights into your spending patterns through charts. View expenses by category and monthly trends."
    },
    {
      title: "Need More Help?",
      content: "Contact support at support@expensetracker.com for additional assistance or to report issues."
    }
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Help Center</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          <div className="help-sections">
            {sections.map((section, i) => (
              <div key={i} className="help-section">
                <h4>{section.title}</h4>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}