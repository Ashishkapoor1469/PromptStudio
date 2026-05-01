'use client';
import React, { useState } from 'react';
import { Chain } from '@/types';
import { store } from '@/lib/store';

interface WorkflowCustomizerProps {
  chain: Chain;
  onClose: () => void;
}

export default function WorkflowCustomizer({ chain, onClose }: WorkflowCustomizerProps) {
  const steps = chain.steps.map(s => store.getPromptById(s.prompt_id)).filter(Boolean);
  
  return (
    <div className="animate-fade-in" style={{ padding: 'var(--space-xl)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2xl)' }}>
        <div>
          <h1>🔧 Customize Workflow</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Editing: <strong style={{ color: 'var(--text-primary)' }}>{chain.title}</strong>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => {
            alert('Customized workflow saved! (Demo)');
            onClose();
          }}>Save Changes</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 'var(--space-2xl)' }}>
        {/* Left column: Steps builder */}
        <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
          <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.1rem' }}>Workflow Steps</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ 
                display: 'flex', gap: '16px', background: 'var(--bg-primary)', 
                padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)', cursor: 'grab'
              }}>
                <div style={{ cursor: 'grab', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center' }}>
                  ⋮⋮
                </div>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: 'var(--gradient-brand)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700, color: '#000', flexShrink: 0,
                  marginTop: '4px'
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>{step?.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{step?.description}</div>
                  
                  <div style={{ marginTop: '12px', background: 'var(--bg-tertiary)', padding: '12px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '8px', fontWeight: 700 }}>Variable Mappings</div>
                    {step?.variables.map(v => (
                      <div key={v.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '0.8rem' }}>
                        <span style={{ width: '120px', fontFamily: 'monospace' }}>{v.name}</span>
                        <span style={{ color: 'var(--text-tertiary)' }}>←</span>
                        <select className="select" style={{ padding: '4px 8px', fontSize: '0.8rem', flex: 1 }}>
                          <option>Input at runtime</option>
                          {i > 0 && <option>Output from Step {i}</option>}
                          <option>Global Context</option>
                        </select>
                      </div>
                    ))}
                    {(!step?.variables || step.variables.length === 0) && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>No variables required.</div>
                    )}
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm" style={{ height: 'fit-content' }}>🗑️</button>
              </div>
            ))}
            
            <button className="btn btn-secondary" style={{ borderStyle: 'dashed', padding: '16px', justifyContent: 'center' }}>
              + Add Step from Library
            </button>
          </div>
        </div>

        {/* Right column: Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          <div className="input-group">
            <label>Workflow Name</label>
            <input className="input" defaultValue={chain.title} />
          </div>
          <div className="input-group">
            <label>Description</label>
            <textarea className="textarea" defaultValue={chain.description || ''} style={{ minHeight: '80px' }} />
          </div>
          <div className="input-group">
            <label>Default Model</label>
            <select className="select">
              <option>Claude 3.5 Sonnet</option>
              <option>GPT-4o</option>
              <option>Llama 3.1 405B</option>
            </select>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '4px', display: 'block' }}>
              Individual steps can override this model.
            </span>
          </div>
          <div style={{ padding: 'var(--space-lg)', background: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <h4 style={{ color: '#f59e0b', margin: '0 0 8px 0', fontSize: '0.9rem' }}>💡 Pro Tip</h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Pass the output of one prompt as a variable into the next prompt using the variable mappings on each step.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
