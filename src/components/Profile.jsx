import React, { useState } from 'react'

export default function Profile({ onClose }) {
  const [profile, setProfile] = useState({
    name: 'John Smith',
    email: 'john@example.com',
    avatar: 'JS'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Save profile changes
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Profile</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          <div className="profile-header">
            <div className="profile-avatar large">{profile.avatar}</div>
          </div>
          <form className="profile-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input 
                value={profile.name} 
                onChange={e => setProfile(p => ({...p, name: e.target.value}))}
              />
            </label>
            <label>
              Email
              <input 
                type="email" 
                value={profile.email}
                onChange={e => setProfile(p => ({...p, email: e.target.value}))}
              />
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