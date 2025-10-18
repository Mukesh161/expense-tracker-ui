import React, { useState } from 'react'
import Profile from './Profile'
import Settings from './Settings'
import FAQs from './FAQs'
import Help from './Help'

export default function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeModal, setActiveModal] = useState(null)
  
  const handleSignOut = () => {
    // Add sign out logic here
    alert('Sign out functionality will be implemented with authentication')
  }

  const closeModal = () => {
    setActiveModal(null)
    setShowDropdown(false)
  }
  
  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">Expense Tracker</div>
        <div className="nav-items">
          <button 
            className="nav-item" 
            onClick={() => setActiveModal('faqs')}
          >
            FAQs
          </button>
          <button 
            className="nav-item" 
            onClick={() => setActiveModal('help')}
          >
            Help
          </button>
          <div className="profile-menu">
            <button 
              className="nav-item profile-trigger"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="profile-avatar">JS</div>
            </button>
            {showDropdown && (
              <div className="profile-dropdown">
                <button 
                  className="dropdown-item"
                  onClick={() => setActiveModal('profile')}
                >
                  Profile
                </button>
                <button 
                  className="dropdown-item"
                  onClick={() => setActiveModal('settings')}
                >
                  Settings
                </button>
                <hr className="dropdown-divider" />
                <button 
                  className="dropdown-item"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {activeModal === 'profile' && <Profile onClose={closeModal} />}
      {activeModal === 'settings' && <Settings onClose={closeModal} />}
      {activeModal === 'faqs' && <FAQs onClose={closeModal} />}
      {activeModal === 'help' && <Help onClose={closeModal} />}
    </>
  )
}