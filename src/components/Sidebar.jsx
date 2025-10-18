import React from 'react'

export default function Sidebar({ features, active, onSelect }) {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {features.map(f => (
            <li key={f}>
              <button
                className={f === active ? 'active' : ''}
                onClick={() => onSelect(f)}
              >
                {f}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
