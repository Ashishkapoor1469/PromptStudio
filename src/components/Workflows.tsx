'use client';
import React from 'react';
import { store } from '@/lib/store';

export default function Workflows() {
  const chains = store.getChains();

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>🔗 Prompt Workflows</h1>
        <p>Chain multiple prompts together — output of one feeds into the next</p>
      </div>

      <div className="page-body">
        <div className="card-grid">
          {chains.map(chain => {
            const steps = chain.steps.map(s => store.getPromptById(s.prompt_id)).filter(Boolean);
            return (
              <div key={chain.id} className="card" onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
              }}>
                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{chain.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {chain.description}
                  </p>
                </div>

                {/* Steps visualization */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {steps.map((step, i) => (
                    <React.Fragment key={i}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 'var(--space-sm)',
                        padding: '10px 14px',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                      }}>
                        <span style={{
                          width: '24px', height: '24px', borderRadius: '50%',
                          background: 'var(--gradient-brand)', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.72rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                        }}>
                          {i + 1}
                        </span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{step?.title}</span>
                      </div>
                      {i < steps.length - 1 && (
                        <div style={{
                          display: 'flex', justifyContent: 'center',
                          color: 'var(--text-tertiary)', fontSize: '0.9rem',
                        }}>
                          ↓
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div style={{ marginTop: 'var(--space-md)', display: 'flex', gap: 'var(--space-sm)' }}>
                  <button className="btn btn-primary btn-sm">▶ Run Workflow</button>
                  <button className="btn btn-secondary btn-sm">🔧 Customize</button>
                </div>
              </div>
            );
          })}
        </div>

        {chains.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-3xl)', color: 'var(--text-tertiary)' }}>
            <p style={{ fontSize: '2rem', marginBottom: 'var(--space-md)' }}>🔗</p>
            <p>No workflows yet. Create your first prompt chain!</p>
          </div>
        )}
      </div>
    </div>
  );
}
