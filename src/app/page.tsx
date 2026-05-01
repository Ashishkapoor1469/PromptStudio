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
  const [mounted, setMounted] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Force re-render on store changes
  useEffect(() => {
    setMounted(true);
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

  if (!mounted) {
    return null; // Prevents hydration mismatch since data comes from localStorage
  }

  const bottomNavPrimary = NAV_ITEMS.filter(i => ['library', 'enhancer', 'fire'].includes(i.view));
  const bottomNavSecondary = NAV_ITEMS.filter(i => !['library', 'enhancer', 'fire'].includes(i.view));

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
                <div className="search-wrapper" style={{ width: '100%', maxWidth: '320px' }}>
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
              <div className="category-filters-wrapper" style={{ display: 'flex', gap: '6px', marginTop: 'var(--space-md)', flexWrap: 'wrap' }}>
                <button
                  className={`tab ${selectedCategory === '' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('')}
                >
                  All
                </button>
                {Object.entries(CATEGORY_META).map(([key, meta]) => (
                  <button
                    key={key}
                    className={`tab filter-tab-item ${selectedCategory === key ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(key as PromptCategory)}
                  >
                     {meta.icon} {meta.label}
                  </button>
                ))}
                <button
                  className="tab filter-more-btn"
                  onClick={() => setIsFilterModalOpen(true)}
                >
                  ⚙️ More Filters
                </button>
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

      {/* Mobile Filter Modal */}
      {isFilterModalOpen && (
        <div className="modal-overlay animate-fade-in" onClick={() => setIsFilterModalOpen(false)}>
          <div className="modal animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>⚙️ Filters</h2>
              <button className="btn" onClick={() => setIsFilterModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button
                className={`tab ${selectedCategory === '' ? 'active' : ''}`}
                onClick={() => { setSelectedCategory(''); setIsFilterModalOpen(false); }}
              >
                All
              </button>
              {Object.entries(CATEGORY_META).map(([key, meta]) => (
                <button
                  key={key}
                  className={`tab ${selectedCategory === key ? 'active' : ''}`}
                  onClick={() => { setSelectedCategory(key as PromptCategory); setIsFilterModalOpen(false); }}
                >
                   {meta.icon} {meta.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
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

      <nav className="bottom-nav">
        {bottomNavPrimary.map(item => (
          <button
            key={item.view}
            className={`bottom-nav-item ${currentView === item.view ? 'active' : ''}`}
            onClick={() => { setCurrentView(item.view); setShowMoreMenu(false); }}
            style={{ flex: 1 }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span style={{ 
              fontSize: '10px', 
              marginTop: '2px',
              opacity: currentView === item.view ? 1 : 0.7,
              fontWeight: currentView === item.view ? 600 : 400
            }}>
              {item.label.split(' ')[0]}
            </span>
          </button>
        ))}
        
        {/* More Button */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', flex: 1 }}>
          {showMoreMenu && (
            <div className="animate-fade-in" style={{
              position: 'absolute', bottom: '100%', right: '0', marginBottom: '16px',
              background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)', padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px',
              minWidth: '180px', boxShadow: '0 -8px 24px rgba(0,0,0,0.4)', zIndex: 60,
            }}>
              {bottomNavSecondary.map(item => (
                <button
                  key={item.view}
                  onClick={() => { setCurrentView(item.view); setShowMoreMenu(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                    background: currentView === item.view ? 'rgba(255, 179, 0, 0.12)' : 'transparent',
                    border: currentView === item.view ? '1px solid rgba(255, 179, 0, 0.4)' : '1px solid transparent', 
                    color: currentView === item.view ? 'var(--brand-primary)' : 'var(--text-primary)',
                    borderRadius: '8px', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem',
                    fontWeight: currentView === item.view ? 600 : 500,
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          )}
          <button
            className={`bottom-nav-item ${showMoreMenu || bottomNavSecondary.some(i => i.view === currentView) ? 'active' : ''}`}
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            style={{ width: '100%' }}
          >
            <span className="nav-icon">⋮</span>
            <span style={{ 
              fontSize: '10px', 
              marginTop: '2px',
              opacity: (showMoreMenu || bottomNavSecondary.some(i => i.view === currentView)) ? 1 : 0.7,
              fontWeight: (showMoreMenu || bottomNavSecondary.some(i => i.view === currentView)) ? 600 : 400
            }}>
              More
            </span>
          </button>
        </div>
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
