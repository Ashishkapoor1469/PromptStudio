'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Prompt, AI_MODELS, AIModelConfig } from '@/types';
import { store } from '@/lib/store';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface FireToAIProps {
  initialPrompt?: string;
  initialPromptData?: Prompt;
}

export default function FireToAI({ initialPrompt, initialPromptData }: FireToAIProps) {
  const [promptText, setPromptText] = useState(initialPrompt || '');
  const [contextText, setContextText] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [isFetchingGithub, setIsFetchingGithub] = useState(false);
  const [ollamaModels, setOllamaModels] = useState<AIModelConfig[]>([]);
  const [selectedModel, setSelectedModel] = useState<AIModelConfig>(AI_MODELS[0]);
  const [response, setResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/ollama')
      .then(r => r.json())
      .then(d => {
        if (d.models) {
          const models: AIModelConfig[] = d.models.map((m: any) => ({
            id: `ollama-${m.name}`,
            name: `Ollama: ${m.name}`,
            provider: 'ollama',
            model_id: m.name,
            max_tokens: 8192,
            cost_per_1k_input: 0,
            cost_per_1k_output: 0,
            supports_streaming: true,
          }));
          setOllamaModels(models);
        }
      }).catch(e => console.error('Ollama not found:', e));
  }, []);

  const allModels = [...AI_MODELS, ...ollamaModels];
  const [tokenInfo, setTokenInfo] = useState<{ input: number; output: number; cost: number } | null>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  const apiKeys = store.getApiKeys();
  const hasKey = selectedModel.provider === 'ollama' || !!apiKeys[selectedModel.provider];

  const fetchGithubFile = async () => {
    if (!githubUrl.trim()) return;
    setIsFetchingGithub(true);
    try {
      let rawUrl = githubUrl.trim();
      if (rawUrl.includes('github.com') && rawUrl.includes('/blob/')) {
        rawUrl = rawUrl.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
      }
      const res = await fetch(rawUrl);
      if (!res.ok) throw new Error('Failed to fetch from GitHub');
      const text = await res.text();
      const fileName = rawUrl.split('/').pop() || 'github-file';
      setContextText(prev => prev + (prev ? '\n\n' : '') + `--- File: ${fileName} ---\n${text}`);
      setGithubUrl('');
    } catch (err: any) {
      alert(err.message);
    }
    setIsFetchingGithub(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        setContextText(prev => prev + (prev ? '\n\n' : '') + `--- File: ${file.name} ---\n${text}`);
      };
      reader.readAsText(file);
    });
  };

  const firePrompt = async () => {
    if (!promptText.trim()) return;
    const apiKey = apiKeys[selectedModel.provider];
    if (!hasKey) {
      setResponse('❌ No API key configured for ' + selectedModel.provider + '.\n\nGo to Settings → Add your API key for ' + selectedModel.provider);
      return;
    }

    setIsStreaming(true);
    setResponse('');
    setRating(null);
    setTokenInfo(null);

    const finalPrompt = contextText.trim() ? `${promptText}\n\n=== Context ===\n${contextText}` : promptText;

    try {
      let fullResponse = '';
      const inputTokens = Math.ceil(finalPrompt.length / 4);

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

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullResponse += decoder.decode(value, { stream: true });
          setResponse(fullResponse);
        }
      }

      if (!fullResponse.trim()) {
        throw new Error("The model closed the stream without returning any text. Check the terminal for detailed errors (e.g., 403 Forbidden for subscription models).");
      }

      // Calculate tokens
      const outputTokens = Math.ceil(fullResponse.length / 4);
      const cost = (inputTokens / 1000) * selectedModel.cost_per_1k_input +
                   (outputTokens / 1000) * selectedModel.cost_per_1k_output;
      setTokenInfo({ input: inputTokens, output: outputTokens, cost });

      // Save execution
      if (initialPromptData) {
        store.addExecution({
          prompt_id: initialPromptData.id,
          chain_id: null,
          filled_template: promptText,
          model: selectedModel.id,
          response: fullResponse,
          tokens_input: inputTokens,
          tokens_output: outputTokens,
          cost_usd: cost,
          rating: null,
          origin_app: 'web',
          user_id: 'local',
        });
      }
    } catch (err) {
      setResponse(`❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}\n\nPlease check your API key and model access and try again.`);
    }

    setIsStreaming(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>🚀 Fire to AI</h1>
        <p>Send prompts to any AI model and stream responses in real time</p>
      </div>

      <div className="page-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
        {/* Model selector */}
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Provider</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {Array.from(new Set(allModels.map(m => m.provider))).map(provider => (
              <button
                key={provider}
                onClick={() => {
                  const firstModel = allModels.find(m => m.provider === provider);
                  if (firstModel) setSelectedModel(firstModel);
                }}
                className={`btn btn-sm ${selectedModel.provider === provider ? 'btn-primary' : 'btn-secondary'}`}
                style={{ textTransform: 'capitalize' }}
              >
                {provider}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div className="input-group" style={{ flex: 1, minWidth: '200px' }}>
              <label>AI Model</label>
              <select className="select" value={selectedModel.id}
                onChange={e => {
                  if (e.target.value === 'custom') {
                    setSelectedModel({
                      id: 'custom',
                      name: 'Custom',
                      provider: selectedModel.provider,
                      model_id: '',
                      max_tokens: 8192,
                      cost_per_1k_input: 0,
                      cost_per_1k_output: 0,
                      supports_streaming: true
                    });
                  } else {
                    setSelectedModel(allModels.find(m => m.id === e.target.value)!);
                  }
                }}>
                {allModels.filter(m => m.provider === selectedModel.provider).map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} {m.cost_per_1k_input > 0 ? `— $${m.cost_per_1k_input}/1K in` : '(Local/Free)'}
                  </option>
                ))}
                <option value="custom">✍️ Custom Model...</option>
              </select>
              {selectedModel.id === 'custom' && (
                <input 
                  className="input"
                  style={{ marginTop: '8px' }}
                  placeholder="Enter exact model ID (e.g. google/gemma-7b)"
                  value={selectedModel.model_id}
                  onChange={e => setSelectedModel({ ...selectedModel, model_id: e.target.value })}
                />
              )}
            </div>
            {!hasKey && (
              <span style={{ fontSize: '0.78rem', color: '#f59e0b', padding: '10px 0' }}>
                ⚠️ No API key for {selectedModel.provider}. Add it in Settings.
              </span>
            )}
          </div>
        </div>


        {/* Prompt input */}
        <div className="input-group">
          <label>Prompt</label>
          <textarea
            className="textarea"
            value={promptText}
            onChange={e => setPromptText(e.target.value)}
            placeholder="Enter your prompt here or use a prompt from the library..."
            style={{ minHeight: '120px' }}
          />
        </div>

        {/* Context / File Upload */}
        <div className="input-group">
          <label>Context / Files (Optional)</label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              className="input" 
              placeholder="Paste GitHub raw URL or blob URL..." 
              value={githubUrl}
              onChange={e => setGithubUrl(e.target.value)}
              style={{ flex: 1, minWidth: '250px' }}
            />
            <button className="btn btn-secondary" onClick={fetchGithubFile} disabled={isFetchingGithub || !githubUrl}>
              {isFetchingGithub ? '⏳ Fetching...' : '📥 Fetch from GitHub'}
            </button>
            <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
              <button className="btn btn-secondary">
                📁 Upload File(s)
              </button>
              <input 
                type="file" 
                multiple 
                onChange={handleFileUpload} 
                style={{ position: 'absolute', top: 0, left: 0, opacity: 0, height: '100%', cursor: 'pointer' }}
              />
            </div>
          </div>
          <textarea
            className="textarea"
            value={contextText}
            onChange={e => setContextText(e.target.value)}
            placeholder="Loaded files and context will appear here. You can also paste code directly..."
            style={{ minHeight: '100px', fontSize: '0.8rem', fontFamily: 'monospace' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          <button className="btn btn-primary" onClick={firePrompt}
            disabled={isStreaming || !promptText.trim()}>
            {isStreaming ? '⏳ Streaming...' : '🚀 Fire Prompt'}
          </button>
          <button className="btn btn-secondary" onClick={() => navigator.clipboard.writeText(promptText)}>
            📋 Copy Prompt
          </button>
        </div>

        {/* Response */}
        {(response || isStreaming) && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>
                Response {isStreaming && <span style={{ color: 'var(--brand-primary)' }}>● Streaming...</span>}
              </h3>
              {!isStreaming && response && (
                <button 
                  className="btn btn-sm btn-ghost" 
                  onClick={() => navigator.clipboard.writeText(response)}
                  style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                >
                  📋 Copy Response
                </button>
              )}
            </div>
            <div className="response-area markdown-body" ref={responseRef}>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  code({node, inline, className, children, ...props}: any) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus as any}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {response}
              </ReactMarkdown>
              {isStreaming && <span className="cursor-blink" />}
            </div>
          </div>
        )}

        {/* Token info */}
        {tokenInfo && (
          <div className="token-info">
            <div className="token-info-item">
              <span>📥</span> <strong>{tokenInfo.input.toLocaleString()}</strong> input tokens
            </div>
            <div className="token-info-item">
              <span>📤</span> <strong>{tokenInfo.output.toLocaleString()}</strong> output tokens
            </div>
            <div className="token-info-item">
              <span>💰</span> <strong>${tokenInfo.cost.toFixed(4)}</strong> cost
            </div>
          </div>
        )}

        {/* Rating */}
        {response && !isStreaming && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Rate this output:</span>
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                className="btn btn-ghost btn-sm"
                onClick={() => setRating(star)}
                style={{
                  fontSize: '1.2rem',
                  opacity: rating && star <= rating ? 1 : 0.3,
                  transform: rating && star <= rating ? 'scale(1.2)' : 'scale(1)',
                }}
              >
                ⭐
              </button>
            ))}
            {rating && <span style={{ fontSize: '0.78rem', color: 'var(--brand-accent)' }}>Rated {rating}/5</span>}
          </div>
        )}
      </div>
    </div>
  );
}
