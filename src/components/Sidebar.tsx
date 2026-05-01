'use client';
import React from 'react';

export type PageView = 'library' | 'enhancer' | 'chains' | 'fire' | 'analytics' | 'settings' | 'create';

interface SidebarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  promptCount: number;
}

export const NAV_ITEMS: { view: PageView; icon: string; label: string }[] = [
  { view: 'library', icon: '📚', label: 'Prompt Library' },
  { view: 'create', icon: '✏️', label: 'Create Prompt' },
  { view: 'enhancer', icon: '⚡', label: 'AI Enhancer' },
  { view: 'chains', icon: '🔗', label: 'Workflows' },
  { view: 'fire', icon: '🚀', label: 'Fire to AI' },
  { view: 'analytics', icon: '📊', label: 'Analytics' },
  { view: 'settings', icon: '⚙️', label: 'Settings' },
];

export default function Sidebar({ currentView, onNavigate, promptCount }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.png" alt="PromptStudio Logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          <span>PromptStudio</span>
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
          50x AI Productivity
        </p>
      </div>

      <nav className="sidebar-nav">
        <span className="nav-section-label">Core</span>
        {NAV_ITEMS.slice(0, 5).map(item => (
          <button
            key={item.view}
            className={`nav-item ${currentView === item.view ? 'active' : ''}`}
            onClick={() => onNavigate(item.view)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.view === 'library' && promptCount > 0 && (
              <span className="nav-badge">{promptCount}</span>
            )}
          </button>
        ))}

        <span className="nav-section-label">Insights</span>
        {NAV_ITEMS.slice(5, 6).map(item => (
          <button
            key={item.view}
            className={`nav-item ${currentView === item.view ? 'active' : ''}`}
            onClick={() => onNavigate(item.view)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        <span className="nav-section-label">System</span>
        {NAV_ITEMS.slice(6).map(item => (
          <button
            key={item.view}
            className={`nav-item ${currentView === item.view ? 'active' : ''}`}
            onClick={() => onNavigate(item.view)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div style={{
        padding: 'var(--space-md)',
        borderTop: '1px solid var(--border-subtle)',
        fontSize: '0.72rem',
        color: 'var(--text-tertiary)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#10b981', display: 'inline-block',
            boxShadow: '0 0 6px rgba(16,185,129,0.5)',
          }} />
          Client-Side Mode
        </div>
        API keys stored locally only
      </div>
    </aside>
  );
}
