import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

export default function Settings({ onClose }) {
  const { isDark, toggleTheme } = useTheme()

  const handleSubmit = (e) => {
    e.preventDefault()
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Settings</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          <form className="settings-form" onSubmit={handleSubmit}>
            <label>
              Currency
              <select defaultValue="USD">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </label>
            <label>
              Dark Mode
              <input 
                type="checkbox" 
                checked={isDark}
                onChange={toggleTheme}
              />
            </label>
            <label>
              Email Notifications
              <input type="checkbox" defaultChecked />
            </label>
            <div className="form-actions">
              <button type="submit" className="primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}