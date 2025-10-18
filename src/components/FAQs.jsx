import React from 'react'

export default function FAQs({ onClose }) {
  const faqs = [
    {
      q: "How do I add an expense?",
      a: "Click on 'Add Expense' in the sidebar, fill in the expense details (title, amount, date, and category), then click the Add button."
    },
    {
      q: "Can I edit or delete an expense?",
      a: "You can delete an expense by clicking the Remove button next to it in the Expenses list. Editing functionality will be added in a future update."
    },
    {
      q: "What are categories used for?",
      a: "Categories help you organize your expenses and view spending patterns in the Analytics section through charts and breakdowns."
    },
    {
      q: "Is my data saved?",
      a: "Yes, all your expense data is saved locally in your browser's storage. However, it's recommended to backup important data."
    }
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Frequently Asked Questions</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}