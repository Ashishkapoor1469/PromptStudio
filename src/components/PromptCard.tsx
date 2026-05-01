'use client';
import React from 'react';
import { Prompt, CATEGORY_META } from '@/types';

interface PromptCardProps {
  prompt: Prompt;
  onSelect: (prompt: Prompt) => void;
  onFire: (prompt: Prompt) => void;
}

function highlightVars(template: string): React.ReactNode[] {
  const parts = template.split(/(\{\{[^}]+\}\})/g);
  return parts.map((part, i) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      return <span key={i} className="var-highlight">{part}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function PromptCard({ prompt, onSelect, onFire }: PromptCardProps) {
  const cat = CATEGORY_META[prompt.category];

  return (
    <div
      className="card"
      style={{ cursor: 'pointer' }}
      onClick={() => onSelect(prompt)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
        e.currentTarget.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
      }}
    >
      <div className="prompt-card-header">
        <div>
          <span className="tag" style={{
            background: `${cat.color}18`,
            color: cat.color,
            borderColor: `${cat.color}30`,
            marginBottom: '8px',
            display: 'inline-flex',
          }}>
            {cat.icon} {cat.label}
          </span>
          <h3 className="prompt-card-title" style={{ marginTop: '6px' }}>{prompt.title}</h3>
        </div>
        <div className="boost-bar" title={`Boost level: ${prompt.boost_level}/10`}>
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className={`boost-dot ${i < prompt.boost_level ? 'active' : ''}`} />
          ))}
        </div>
      </div>

      <p className="prompt-card-desc">{prompt.description}</p>

      <div className="prompt-card-template">
        {highlightVars(prompt.template.slice(0, 200))}
      </div>

      <div className="prompt-card-footer">
        <div className="prompt-card-tags">
          {prompt.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <span className="prompt-card-meta">
            <span>🔥 {prompt.usage_count.toLocaleString()}</span>
            <span>⭐ {prompt.avg_rating.toFixed(1)}</span>
          </span>
          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => { e.stopPropagation(); onFire(prompt); }}
          >
            🚀 Fire
          </button>
        </div>
      </div>
    </div>
  );
}
