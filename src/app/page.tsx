'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar, { PageView, NAV_ITEMS } from '@/components/Sidebar';
import PromptCard from '@/components/PromptCard';
import PromptDetail from '@/components/PromptDetail';
import CreatePrompt from '@/components/CreatePrompt';
import AIEnhancer from '@/components/AIEnhancer';
import Workflows from '@/components/Workflows';
import FireToAI from '@/components/FireToAI';
import Analytics from '@/components/Analytics';
import Settings from '@/components/Settings';
import { Prompt, PromptCategory, CATEGORY_META } from '@/types';
import { store } from '@/lib/store';

export default function Home() {
  const [currentView, setCurrentView] = useState<PageView>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | ''>('');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [firePromptText, setFirePromptText] = useState('');
  const [firePromptData, setFirePromptData] = useState<Prompt | undefined>();
  const [, setTick] = useState(0);

  // Force re-render on store changes
  useEffect(() => {
    store.init();
    const unsub = store.subscribe(() => setTick(t => t + 1));
    return () => { unsub(); };
  }, []);

  const prompts = store.getPrompts({
    category: selectedCategory || undefined,
    search: searchQuery || undefined,
  });

  const handleFire = useCallback((filled: string, prompt: Prompt) => {
    setFirePromptText(filled);
    setFirePromptData(prompt);
    setSelectedPrompt(null);
    setCurrentView('fire');
  }, []);

  const handleFireFromCard = useCallback((prompt: Prompt) => {
    setSelectedPrompt(prompt);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        promptCount={prompts.length}
      />

      <main className="main-content">
        {/* Library View */}
        {currentView === 'library' && (
          <div className="animate-fade-in">
            <div className="page-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                <div>
                  <h1>📚 Prompt Library</h1>
                  <p>{prompts.length} expert prompts ready to fire</p>
                </div>
                <div className="search-wrapper" style={{ width: '320px' }}>
                  <span className="search-icon">🔍</span>
                  <input
                    className="search-input"
                    placeholder="Search prompts..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Category tabs */}
              <div style={{ display: 'flex', gap: '6px', marginTop: 'var(--space-md)', flexWrap: 'wrap' }}>
                <button
                  className={`tab ${selectedCategory === '' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('')}
                >
                  All
                </button>
                {Object.entries(CATEGORY_META).map(([key, meta]) => (
                  <button
                    key={key}
                    className={`tab ${selectedCategory === key ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(key as PromptCategory)}
                  >
                    {meta.icon} {meta.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="page-body">
              <div className="card-grid">
                {prompts.map(prompt => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onSelect={setSelectedPrompt}
                    onFire={handleFireFromCard}
                  />
                ))}
              </div>

              {prompts.length === 0 && (
                <div style={{ textAlign: 'center', padding: 'var(--space-3xl)', color: 'var(--text-tertiary)' }}>
                  <p style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🔍</p>
                  <p style={{ fontSize: '1.1rem' }}>No prompts found</p>
                  <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Try a different search or category</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Create View */}
        {currentView === 'create' && (
          <CreatePrompt onCreated={() => setCurrentView('library')} />
        )}

        {/* Enhancer View */}
        {currentView === 'enhancer' && <AIEnhancer />}

        {/* Workflows View */}
        {currentView === 'chains' && <Workflows />}

        {/* Fire View */}
        {currentView === 'fire' && (
          <FireToAI initialPrompt={firePromptText} initialPromptData={firePromptData} />
        )}

        {/* Analytics View */}
        {currentView === 'analytics' && <Analytics />}

        {/* Settings View */}
        {currentView === 'settings' && <Settings />}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="bottom-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.view}
            className={`bottom-nav-item ${currentView === item.view ? 'active' : ''}`}
            onClick={() => setCurrentView(item.view)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span style={{ display: currentView === item.view ? 'block' : 'none' }}>
              {item.label.split(' ')[0]}
            </span>
          </button>
        ))}
      </nav>

      {/* Prompt Detail Modal */}
      {selectedPrompt && (
        <PromptDetail
          prompt={selectedPrompt}
          onClose={() => setSelectedPrompt(null)}
          onFire={handleFire}
        />
      )}
    </div>
  );
}
