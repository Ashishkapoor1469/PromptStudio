'use client';
import React, { useState, useEffect } from 'react';
import { Chain, AI_MODELS } from '@/types';
import { store } from '@/lib/store';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface WorkflowRunnerProps {
  chain: Chain;
  onClose: () => void;
}

const DEMO_TEMPLATES = [
  { id: 'code_review', name: 'Code Review (Buggy JS)', text: '// E-commerce cart calculation\nfunction calculateTotal(cart) {\n  let total = 0;\n  for(let i=0; i < cart.length; i++) {\n    total += cart[i].price * cart[i].quantity;\n  }\n  return total;\n}' },
  { id: 'architecture', name: 'Architecture (Scaling Request)', text: 'We are currently running a monolithic Node.js backend with MongoDB.\n\nWe expect traffic to grow by 10x over the next 3 months due to a new marketing campaign.\n\nHow should we redesign our system to handle the load?' },
  { id: 'documentation', name: 'Documentation (API Endpoint)', text: '// Please generate documentation for this endpoint:\nrouter.post("/checkout", authenticate, async (req, res) => {\n  const { items, paymentToken } = req.body;\n  const order = await processPayment(paymentToken, items);\n  await db.orders.insert(order);\n  res.json({ success: true, orderId: order.id });\n});' }
];

function getMockResponse(promptTitle: string) {
  const lower = promptTitle.toLowerCase();
  if (lower.includes('review') || lower.includes('l7')) {
    return `### Code Review: ${promptTitle}\n\n**Critical Issues:**\n- There is a severe memory leak in the effect hook.\n- Missing input validation on user parameters.\n\n**Suggestions:**\n\`\`\`typescript\nfunction optimized() {\n  // Fixed code here\n}\n\`\`\`\n\n_Review passed with warnings._`;
  }
  if (lower.includes('test')) {
    return `### Test Suite Generation\n\nI have generated the tests using Jest and React Testing Library:\n\n\`\`\`typescript\ndescribe('Component', () => {\n  it('renders correctly', () => {\n    expect(true).toBe(true);\n  });\n});\n\`\`\`\n\n*All 45 tests passing.*`;
  }
  if (lower.includes('doc') || lower.includes('post-mortem') || lower.includes('maker')) {
    return `# Document Generated: ${promptTitle}\n\n## Overview\nThis document outlines the architecture and recent changes.\n\n## Architecture\n- Client: Next.js\n- API: Vercel AI SDK\n- Database: PostgreSQL\n\n*Saved to /docs/architecture.md*`;
  }
  if (lower.includes('design') || lower.includes('architecture') || lower.includes('engineer')) {
    return `## System Architecture Proposal\n\n**1. High-Level Design**\nWe will use a microservices architecture with a GraphQL API gateway.\n\n**2. Database Schema**\n\`\`\`sql\nCREATE TABLE users (id UUID PRIMARY KEY);\n\`\`\`\n\n**3. Scalability**\nReady for 10x traffic using auto-scaling groups.`;
  }
  return `### Simulated output for ${promptTitle}\n\nProcessing variables and executing chain...\n\n* Task completed successfully.\n* Formatting applied.\n\n> Output will be passed to the next step in the workflow pipeline.`;
}

export default function WorkflowRunner({ chain, onClose }: WorkflowRunnerProps) {
  const steps = React.useMemo(() => {
    return chain.steps.map(s => store.getPromptById(s.prompt_id)).filter(Boolean);
  }, [chain]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [outputs, setOutputs] = useState<string[]>(Array(steps.length).fill(''));
  const [isFinished, setIsFinished] = useState(false);
  const [workflowStarted, setWorkflowStarted] = useState(false);
  const [userInput, setUserInput] = useState('');
  
  // Demo Template State
  const [selectedDemoTemplate, setSelectedDemoTemplate] = useState(DEMO_TEMPLATES[0].id);

  // AI Mode State
  const [aiMode, setAiMode] = useState<'demo' | 'real'>('demo');
  
  const allApiKeys = store.getApiKeys();
  const availableModels = AI_MODELS.filter(m => m.provider === 'ollama' || !!allApiKeys[m.provider]);
  
  const [selectedModelId, setSelectedModelId] = useState(availableModels.length > 0 ? availableModels[0].id : AI_MODELS[0].id);
  const [customModelIdValue, setCustomModelIdValue] = useState('');
  const [customProvider, setCustomProvider] = useState<'openai'|'anthropic'|'google'|'mistral'|'ollama'|'nvidia'>('openai');

  const selectedModel = selectedModelId === 'custom' 
    ? { provider: customProvider, model_id: customModelIdValue, name: 'Custom' }
    : AI_MODELS.find(m => m.id === selectedModelId) || AI_MODELS[0];
    
  const apiKey = store.getApiKey(selectedModel.provider);
  const hasKey = selectedModel.provider === 'ollama' || !!apiKey;
  
  useEffect(() => {
    if (!workflowStarted) return;
    if (currentStepIndex >= steps.length) {
      setIsFinished(true);
      return;
    }

    const currentPrompt = steps[currentStepIndex];
    if (!currentPrompt) return;

    if (aiMode === 'demo') {
      let text = getMockResponse(currentPrompt.title);
      let currentIndex = 0;
      const interval = setInterval(() => {
        currentIndex += 4; // typing speed
        if (currentIndex > text.length) {
          clearInterval(interval);
          setTimeout(() => setCurrentStepIndex(prev => prev + 1), 1000);
        } else {
          setOutputs(prev => {
            const newOutputs = [...prev];
            newOutputs[currentStepIndex] = text.substring(0, currentIndex);
            return newOutputs;
          });
        }
      }, 10);
      return () => clearInterval(interval);
    } else {
      // REAL AI MODE
      let isCancelled = false;

      const runRealAI = async () => {
        if (!hasKey) {
          setOutputs(prev => {
            const newOutputs = [...prev];
            newOutputs[currentStepIndex] = `❌ Error: No API key for ${selectedModel.provider}. Add it in Settings or switch to Demo mode.`;
            return newOutputs;
          });
          setIsFinished(true);
          return;
        }

        try {
          // Pass previous output as context for the chain, and user input for the very first step
          const previousContext = currentStepIndex > 0 ? `\n\n=== CONTEXT FROM PREVIOUS STEP ===\n${outputs[currentStepIndex - 1]}` : '';
          const initialInputContext = (currentStepIndex === 0 && userInput.trim()) ? `=== INITIAL USER INPUT ===\n${userInput}\n\n` : '';
          const finalPrompt = initialInputContext + currentPrompt.template + previousContext;

          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              provider: selectedModel.provider,
              model: selectedModel.model_id,
              prompt: finalPrompt,
              apiKey: apiKey || 'ollama',
            }),
          });

          if (!res.ok) throw new Error(await res.text());
          const reader = res.body?.getReader();
          const decoder = new TextDecoder();
          let fullResponse = '';

          if (reader) {
            while (!isCancelled) {
              const { done, value } = await reader.read();
              if (done) break;
              fullResponse += decoder.decode(value, { stream: true });
              setOutputs(prev => {
                const newOutputs = [...prev];
                newOutputs[currentStepIndex] = fullResponse;
                return newOutputs;
              });
            }
          }
          if (!isCancelled) {
            setCurrentStepIndex(prev => prev + 1);
          }
        } catch (err: any) {
          if (!isCancelled) {
            setOutputs(prev => {
              const newOutputs = [...prev];
              newOutputs[currentStepIndex] = `❌ Error: ${err.message}`;
              return newOutputs;
            });
            setIsFinished(true);
          }
        }
      };

      runRealAI();
      return () => { isCancelled = true; };
    }
  }, [currentStepIndex, steps, aiMode, selectedModel.provider, selectedModel.model_id, hasKey, apiKey, workflowStarted, userInput]);

  const resetWorkflow = () => {
    setCurrentStepIndex(0);
    setOutputs(Array(steps.length).fill(''));
    setIsFinished(false);
    setWorkflowStarted(false);
  };

  return (
    <div className="animate-fade-in" style={{ padding: 'var(--space-md)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-lg)', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className={isFinished || !workflowStarted ? '' : 'spin-animation'}>⚙️</span> 
            Running: {chain.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {!workflowStarted ? 'Waiting for input...' : isFinished ? 'Workflow completed successfully!' : `Executing step ${currentStepIndex + 1} of ${steps.length}...`}
          </p>
        </div>
        
        {/* Controls */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'var(--bg-tertiary)', padding: '8px 12px', borderRadius: 'var(--radius-md)', flexWrap: 'wrap', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Mode:</label>
            <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
              <button 
                onClick={() => { setAiMode('demo'); resetWorkflow(); }}
                style={{ padding: '6px 12px', fontSize: '0.8rem', background: aiMode === 'demo' ? 'var(--brand-primary)' : 'transparent', color: aiMode === 'demo' ? '#000' : 'var(--text-secondary)', fontWeight: aiMode === 'demo' ? 600 : 400, border: 'none', cursor: 'pointer' }}
              >
                Demo (Mock)
              </button>
              <button 
                onClick={() => { setAiMode('real'); resetWorkflow(); }}
                style={{ padding: '6px 12px', fontSize: '0.8rem', background: aiMode === 'real' ? '#10b981' : 'transparent', color: aiMode === 'real' ? '#000' : 'var(--text-secondary)', fontWeight: aiMode === 'real' ? 600 : 400, border: 'none', cursor: 'pointer' }}
              >
                Real AI
              </button>
            </div>
          </div>

          {aiMode === 'real' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {availableModels.length > 0 ? (
                <>
                  <select className="select" style={{ padding: '4px 8px', fontSize: '0.8rem' }} value={selectedModelId} onChange={e => { setSelectedModelId(e.target.value); resetWorkflow(); }}>
                    {availableModels.map(m => (
                      <option key={m.id} value={m.id}>{m.name} ({m.provider})</option>
                    ))}
                    <option value="custom">✍️ Custom Model...</option>
                  </select>
                  {selectedModelId === 'custom' && (
                    <>
                      <select className="select" style={{ padding: '4px 8px', fontSize: '0.8rem' }} value={customProvider} onChange={e => setCustomProvider(e.target.value as any)}>
                        <option value="openai">OpenAI</option>
                        <option value="anthropic">Anthropic</option>
                        <option value="google">Google</option>
                        <option value="nvidia">NVIDIA</option>
                        <option value="mistral">Mistral</option>
                        <option value="ollama">Ollama</option>
                      </select>
                      <input 
                        className="input" 
                        style={{ padding: '4px 8px', fontSize: '0.8rem', width: '130px' }} 
                        placeholder="Model ID..." 
                        value={customModelIdValue} 
                        onChange={e => setCustomModelIdValue(e.target.value)} 
                      />
                    </>
                  )}
                </>
              ) : (
                <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>⚠️ No APIs Configured</span>
              )}
            </div>
          )}

          <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ marginLeft: 'auto' }}>Close</button>
        </div>
      </div>

      <div className="workflow-layout-left">
        {/* Left column: Steps pipeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {steps.map((step, i) => {
            const isActive = workflowStarted && i === currentStepIndex;
            const isDone = workflowStarted && i < currentStepIndex;
            
            return (
              <React.Fragment key={i}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '16px',
                  background: isActive ? 'rgba(245, 158, 11, 0.1)' : isDone ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-tertiary)',
                  border: `1px solid ${isActive ? 'var(--brand-primary)' : isDone ? '#10b981' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-md)',
                  opacity: (isActive || isDone || !workflowStarted) ? 1 : 0.5,
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: isActive ? 'var(--brand-primary)' : isDone ? '#10b981' : 'var(--bg-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8rem', fontWeight: 700, color: (isActive || isDone) ? '#000' : 'var(--text-tertiary)'
                  }}>
                    {isDone ? '✓' : i + 1}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: (isActive || isDone || !workflowStarted) ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {step?.title}
                    </div>
                    {isActive && <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', marginTop: '4px' }}>{aiMode === 'real' ? 'Calling API...' : 'Generating...'}</div>}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: '2px', height: '24px', background: isDone ? '#10b981' : 'var(--border-subtle)', margin: '0 auto' }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right column: Output console */}
        <div style={{ 
          background: '#0d1117', 
          border: '1px solid var(--border-subtle)', 
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          minHeight: '300px', maxHeight: '70vh'
        }}>
          <div style={{ padding: '12px 16px', background: '#161b22', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
            <span style={{ marginLeft: '12px', fontSize: '0.8rem', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>Workflow Execution Terminal</span>
          </div>
          <div style={{ padding: 'var(--space-lg)', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            {!workflowStarted ? (
              <div className="animate-fade-in" style={{ padding: '24px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ marginBottom: '8px', fontSize: '1.2rem' }}>Ready to Run</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.9rem' }}>
                  {aiMode === 'demo' 
                    ? 'Demo Mode is active. Select a scenario to see how the workflow responds.'
                    : 'Provide the initial input or source code for this workflow. The AI will use this as the starting context for Step 1.'}
                </p>
                {aiMode === 'demo' && (
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--text-secondary)' }}>Select Demo Scenario:</label>
                    <select 
                      className="select" 
                      value={selectedDemoTemplate}
                      onChange={(e) => setSelectedDemoTemplate(e.target.value)}
                      style={{ width: '100%', marginBottom: '8px' }}
                    >
                      {DEMO_TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </div>
                )}
                <textarea 
                  className="textarea" 
                  style={{ 
                    width: '100%', minHeight: '180px', marginBottom: '24px', 
                    fontFamily: 'monospace', fontSize: '0.9rem',
                    opacity: aiMode === 'demo' ? 0.7 : 1,
                    cursor: aiMode === 'demo' ? 'not-allowed' : 'text'
                  }}
                  value={aiMode === 'demo' ? DEMO_TEMPLATES.find(t => t.id === selectedDemoTemplate)?.text : userInput}
                  onChange={e => { if (aiMode !== 'demo') setUserInput(e.target.value); }}
                  placeholder="// Paste code, requirements, or raw input here..."
                  readOnly={aiMode === 'demo'}
                />
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '12px', fontSize: '1rem', background: aiMode === 'real' ? '#10b981' : 'var(--brand-primary)', color: '#000' }}
                  onClick={() => setWorkflowStarted(true)}
                >
                  ▶ {aiMode === 'demo' ? 'Start Demo Simulation' : `Start Execution Pipeline (${selectedModel.name})`}
                </button>
              </div>
            ) : (
              outputs.map((output, i) => {
                if (!output && i > currentStepIndex) return null;
                return (
                  <div key={i} className="animate-fade-in" style={{ 
                    padding: '16px', 
                    background: 'rgba(255,255,255,0.03)', 
                    borderLeft: `2px solid ${aiMode === 'real' ? '#10b981' : 'var(--brand-primary)'}`,
                    borderRadius: '0 8px 8px 0'
                  }}>
                    <div style={{ fontSize: '0.75rem', color: aiMode === 'real' ? '#10b981' : 'var(--brand-primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Output: Step {i + 1} {aiMode === 'real' && `(${selectedModel.name})`}
                    </div>
                    <div className="markdown-body" style={{ fontSize: '0.9rem' }}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{output || '*Waiting...*'}</ReactMarkdown>
                      {i === currentStepIndex && !isFinished && <span className="cursor-blink" />}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spin-animation { display: inline-block; animation: spin 4s linear infinite; }
      `}} />
    </div>
  );
}
