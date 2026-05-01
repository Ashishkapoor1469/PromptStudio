'use client';
import React, { useState } from 'react';
import { Prompt, CATEGORY_META, DEFAULT_MODIFIERS, Modifier } from '@/types';
import { store } from '@/lib/store';
import Editor from '@monaco-editor/react';

interface PromptDetailProps {
  prompt: Prompt;
  onClose: () => void;
  onFire: (filled: string, prompt: Prompt) => void;
}

export default function PromptDetail({ prompt, onClose, onFire }: PromptDetailProps) {
  const cat = CATEGORY_META[prompt.category];
  const [varValues, setVarValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    prompt.variables.forEach(v => { initial[v.name] = v.default_value || ''; });
    return initial;
  });
  const [modifiers, setModifiers] = useState<Modifier[]>(DEFAULT_MODIFIERS);

  const toggleModifier = (id: string) => {
    setModifiers(prev => prev.map(m => m.id === id ? { ...m, is_active: !m.is_active } : m));
  };

  const filledTemplate = store.fillTemplate(prompt.template, varValues, modifiers);

  const handleFire = () => {
    onFire(filledTemplate, prompt);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, varName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setVarValues(prev => ({ ...prev, [varName]: text }));
    };
    reader.readAsText(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(filledTemplate);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: '800px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="tag" style={{
              background: `${cat.color}18`, color: cat.color,
              borderColor: `${cat.color}30`, marginBottom: '6px', display: 'inline-flex',
            }}>
              {cat.icon} {cat.label}
            </span>
            <h2 style={{ marginTop: '4px' }}>{prompt.title}</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {prompt.description}
            </p>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Variables */}
          {prompt.variables.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                Variables
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {prompt.variables.map(v => (
                  <div key={v.name} className="input-group">
                    <label>
                      {v.label} {v.required && <span style={{ color: '#f43f5e' }}>*</span>}
                    </label>
                    {v.type === 'select' ? (
                      <select
                        className="select"
                        value={varValues[v.name] || ''}
                        onChange={e => setVarValues(prev => ({ ...prev, [v.name]: e.target.value }))}
                      >
                        <option value="">Select...</option>
                        {v.options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : v.type === 'code' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                          <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
                            <button className="btn btn-sm btn-secondary">
                              📁 Upload File
                            </button>
                            <input 
                              type="file" 
                              onChange={(e) => handleFileUpload(e, v.name)} 
                              style={{ position: 'absolute', top: 0, left: 0, opacity: 0, height: '100%', cursor: 'pointer' }}
                            />
                          </div>
                        </div>
                        <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden', minHeight: '300px' }}>
                          <Editor
                            height="300px"
                            defaultLanguage="javascript"
                            theme="vs-dark"
                            value={varValues[v.name] || ''}
                            onChange={(val) => setVarValues(prev => ({ ...prev, [v.name]: val || '' }))}
                            options={{
                              minimap: { enabled: false },
                              fontSize: 13,
                              wordWrap: 'on',
                              scrollBeyondLastLine: false,
                              padding: { top: 10, bottom: 10 }
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <input
                        className="input"
                        type="text"
                        value={varValues[v.name] || ''}
                        onChange={e => setVarValues(prev => ({ ...prev, [v.name]: e.target.value }))}
                        placeholder={v.description || `Enter ${v.label}...`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modifiers */}
          <div>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
              Power-Up Modifiers
            </h3>
            <div className="modifier-grid">
              {modifiers.map(m => (
                <button
                  key={m.id}
                  className={`modifier-chip ${m.is_active ? 'active' : ''}`}
                  onClick={() => toggleModifier(m.id)}
                  title={m.text}
                >
                  <span>{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
              Preview
            </h3>
            <div className="response-area" style={{ maxHeight: '250px', overflow: 'auto', fontSize: '0.8rem' }}>
              {filledTemplate}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleCopy}>📋 Copy</button>
          <button className="btn btn-primary" onClick={handleFire}>🚀 Fire to AI</button>
        </div>
      </div>
    </div>
  );
}
