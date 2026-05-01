'use client';
import React, { useState } from 'react';

export default function AIEnhancer() {
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);

  const enhancePrompt = async () => {
    if (!originalPrompt.trim()) return;
    setIsEnhancing(true);

    // Client-side enhancement engine
    await new Promise(r => setTimeout(r, 1200));

    const parts = originalPrompt.trim();
    const words = parts.split(/\s+/);

    // Detect likely variables
    const langKeywords = ['python', 'javascript', 'typescript', 'go', 'rust', 'java', 'c#', 'ruby', 'php', 'swift', 'kotlin'];
    const frameworkKeywords = ['react', 'next.js', 'vue', 'angular', 'django', 'flask', 'fastapi', 'express', 'nestjs', 'spring'];

    let enhanced = '';
    let detectedLang = words.find(w => langKeywords.includes(w.toLowerCase()));
    let detectedFramework = words.find(w => frameworkKeywords.includes(w.toLowerCase()));

    // Build role
    const isCodeRelated = words.some(w => ['code', 'function', 'class', 'api', 'bug', 'error', 'fix', 'debug', 'review', 'test', 'write', 'implement', 'build', 'create', 'design'].includes(w.toLowerCase()));
    const isDesign = words.some(w => ['design', 'architecture', 'system', 'schema', 'database'].includes(w.toLowerCase()));

    let role = 'a senior software engineer';
    if (isDesign) role = 'a principal systems architect at a FAANG company';
    else if (isCodeRelated) role = 'a Staff Engineer with 15+ years of production experience';

    enhanced += `You are ${role}.\n\n`;
    enhanced += `## Task\n`;

    // Replace specifics with variables
    let taskBody = originalPrompt;
    if (detectedLang) {
      taskBody = taskBody.replace(new RegExp(detectedLang, 'gi'), '{{LANGUAGE}}');
    }
    if (detectedFramework) {
      taskBody = taskBody.replace(new RegExp(detectedFramework, 'gi'), '{{FRAMEWORK}}');
    }

    enhanced += taskBody + '\n\n';
    enhanced += `## Output Requirements\n`;
    enhanced += `- Structure your response with clear headers and sections\n`;
    enhanced += `- Include code examples with proper syntax highlighting\n`;
    enhanced += `- Explain your reasoning and tradeoffs\n`;
    enhanced += `- Consider edge cases and error scenarios\n`;
    enhanced += `- Provide production-ready solutions, not tutorial-level code\n\n`;

    enhanced += `## Quality Criteria\n`;
    enhanced += `- Every recommendation must be justified with a \"why\"\n`;
    enhanced += `- Flag any assumptions you are making\n`;
    enhanced += `- Consider security, performance, and maintainability\n`;
    enhanced += `- Critique your own output before presenting it\n`;

    if (detectedLang || detectedFramework) {
      enhanced += `\n## Context\n`;
      if (detectedLang) enhanced += `- Language: {{LANGUAGE}}\n`;
      if (detectedFramework) enhanced += `- Framework: {{FRAMEWORK}}\n`;
    }

    setEnhancedPrompt(enhanced);
    setIsEnhancing(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>⚡ AI Prompt Enhancer</h1>
        <p>Paste any weak prompt → get an expert-level version that produces 10x better output</p>
      </div>

      <div className="page-body">
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="input-group">
            <label>Your Original Prompt</label>
            <textarea
              className="textarea"
              value={originalPrompt}
              onChange={e => setOriginalPrompt(e.target.value)}
              placeholder="Paste your basic prompt here... e.g., 'Review this Python code for bugs'"
              style={{ minHeight: '120px', fontFamily: 'inherit' }}
            />
          </div>
          <button
            className="btn btn-primary mt-md"
            onClick={enhancePrompt}
            disabled={isEnhancing || !originalPrompt.trim()}
          >
            {isEnhancing ? '🔄 Enhancing...' : '⚡ Enhance Prompt'}
          </button>
        </div>

        {(originalPrompt || enhancedPrompt) && (
          <div className="diff-view">
            <div className="diff-panel">
              <div className="diff-panel-header original">Original</div>
              <div className="diff-panel-body">{originalPrompt || 'Your original prompt will appear here...'}</div>
            </div>
            <div className="diff-panel">
              <div className="diff-panel-header enhanced">Enhanced</div>
              <div className="diff-panel-body">
                {enhancedPrompt || 'Enhanced version will appear here...'}
              </div>
            </div>
          </div>
        )}

        {enhancedPrompt && (
          <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-lg)' }}>
            <button className="btn btn-secondary" onClick={() => navigator.clipboard.writeText(enhancedPrompt)}>
              📋 Copy Enhanced
            </button>
            <button className="btn btn-primary" onClick={() => {
              // Could navigate to Fire page
              navigator.clipboard.writeText(enhancedPrompt);
            }}>
              💾 Save to Library
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
