'use client';
import React, { useState } from 'react';
import { PromptCategory, CATEGORY_META } from '@/types';
import { store } from '@/lib/store';

interface CreatePromptProps {
  onCreated: () => void;
}

export default function CreatePrompt({ onCreated }: CreatePromptProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [template, setTemplate] = useState('');
  const [category, setCategory] = useState<PromptCategory>('architecture');
  const [tagsInput, setTagsInput] = useState('');
  const [boostLevel, setBoostLevel] = useState(5);

  const detectedVars = store.extractVariables(template);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !template) return;

    store.addPrompt({
      title,
      description,
      template,
      variables: detectedVars,
      modifiers: [],
      category,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      chainable: true,
      boost_level: boostLevel,
      source: 'manual',
      origin_app: null,
      author_id: 'local',
      team_id: null,
      is_public: false,
      parent_id: null,
    });

    setTitle(''); setDescription(''); setTemplate('');
    setTagsInput(''); setBoostLevel(5);
    onCreated();
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>✏️ Create Prompt</h1>
        <p>Build a new expert-level prompt for your library</p>
      </div>

      <div className="page-body">
        <form onSubmit={handleSubmit} style={{ maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div className="input-group">
            <label>Prompt Title *</label>
            <input className="input" value={title} onChange={e => setTitle(e.target.value)}
              placeholder="e.g., Brutal Code Review" required />
          </div>

          <div className="input-group">
            <label>Description</label>
            <input className="input" value={description} onChange={e => setDescription(e.target.value)}
              placeholder="What does this prompt do?" />
          </div>

          <div className="input-group">
            <label>Category</label>
            <select className="select" value={category} onChange={e => setCategory(e.target.value as PromptCategory)}>
              {Object.entries(CATEGORY_META).map(([key, meta]) => (
                <option key={key} value={key}>{meta.icon} {meta.label}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Template *</label>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', margin: '0' }}>
              Use {'{{VARIABLE_NAME}}'} syntax for dynamic variables
            </p>
            <textarea className="textarea" value={template} onChange={e => setTemplate(e.target.value)}
              placeholder={'You are a {{ROLE}} expert. Analyze this {{LANGUAGE}} code:\n```\n{{CODE}}\n```\n\nProvide detailed feedback on...'}
              style={{ minHeight: '200px' }} required />
          </div>

          {detectedVars.length > 0 && (
            <div className="card" style={{ background: 'var(--bg-tertiary)' }}>
              <h4 style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                🔍 Detected Variables ({detectedVars.length})
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {detectedVars.map(v => (
                  <span key={v.name} className="tag" style={{
                    background: 'rgba(6,182,212,0.12)',
                    color: 'var(--brand-accent)',
                    borderColor: 'rgba(6,182,212,0.25)',
                  }}>
                    {'{{'}{v.name}{'}}'}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="input-group">
            <label>Tags (comma-separated)</label>
            <input className="input" value={tagsInput} onChange={e => setTagsInput(e.target.value)}
              placeholder="e.g., code-review, quality, production" />
          </div>

          <div className="input-group">
            <label>Boost Level: {boostLevel}/10</label>
            <input type="range" min="1" max="10" value={boostLevel}
              onChange={e => setBoostLevel(Number(e.target.value))}
              style={{ accentColor: 'var(--brand-primary)' }} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            💾 Save Prompt
          </button>
        </form>
      </div>
    </div>
  );
}
