'use client';

import { Prompt, Chain, Execution, Modifier, PromptCategory, AnalyticsData, DEFAULT_MODIFIERS } from '@/types';
import { SEED_PROMPTS, SEED_CHAINS } from '@/data/seed-prompts';

// ---- LocalStorage helpers ----
function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(`promptstudio_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`promptstudio_${key}`, JSON.stringify(data));
}

// ---- Store class ----
class PromptStore {
  private prompts: Prompt[] = [];
  private chains: Chain[] = [];
  private executions: Execution[] = [];
  private apiKeys: Record<string, string> = {};
  private listeners: Set<() => void> = new Set();
  private initialized = false;

  init() {
    if (this.initialized) return;
    this.prompts = loadFromStorage('prompts', SEED_PROMPTS);
    let promptsAdded = false;
    const existingPromptIds = new Set(this.prompts.map(p => p.id));
    SEED_PROMPTS.forEach(sp => {
      if (!existingPromptIds.has(sp.id)) {
        this.prompts.push(sp);
        promptsAdded = true;
      }
    });
    if (promptsAdded) saveToStorage('prompts', this.prompts);

    this.chains = loadFromStorage('chains', SEED_CHAINS);
    let chainsAdded = false;
    const existingChainIds = new Set(this.chains.map(c => c.id));
    SEED_CHAINS.forEach(sc => {
      if (!existingChainIds.has(sc.id)) {
        this.chains.push(sc);
        chainsAdded = true;
      }
    });
    if (chainsAdded) saveToStorage('chains', this.chains);

    this.executions = loadFromStorage('executions', []);
    this.apiKeys = loadFromStorage('apiKeys', {});
    this.initialized = true;
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  // ---- Prompts ----
  getPrompts(filters?: { category?: PromptCategory; search?: string; source?: string }): Prompt[] {
    this.init();
    let result = [...this.prompts];
    if (filters?.category) result = result.filter(p => p.category === filters.category);
    if (filters?.source) result = result.filter(p => p.source === filters.source);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return result.sort((a, b) => b.usage_count - a.usage_count);
  }

  getPromptById(id: string): Prompt | undefined {
    this.init();
    return this.prompts.find(p => p.id === id);
  }

  addPrompt(prompt: Omit<Prompt, 'id' | 'created_at' | 'updated_at' | 'usage_count' | 'avg_rating' | 'version'>): Prompt {
    this.init();
    const newPrompt: Prompt = {
      ...prompt,
      id: `p_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      version: 1,
      usage_count: 0,
      avg_rating: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.prompts.unshift(newPrompt);
    saveToStorage('prompts', this.prompts);
    this.notify();
    return newPrompt;
  }

  updatePrompt(id: string, updates: Partial<Prompt>): void {
    this.init();
    const idx = this.prompts.findIndex(p => p.id === id);
    if (idx === -1) return;
    this.prompts[idx] = { ...this.prompts[idx], ...updates, updated_at: new Date().toISOString() };
    saveToStorage('prompts', this.prompts);
    this.notify();
  }

  deletePrompt(id: string): void {
    this.init();
    this.prompts = this.prompts.filter(p => p.id !== id);
    saveToStorage('prompts', this.prompts);
    this.notify();
  }

  // ---- Chains ----
  getChains(): Chain[] {
    this.init();
    return [...this.chains];
  }

  getChainById(id: string): Chain | undefined {
    this.init();
    return this.chains.find(c => c.id === id);
  }

  // ---- Executions ----
  addExecution(exec: Omit<Execution, 'id' | 'created_at'>): Execution {
    this.init();
    const newExec: Execution = {
      ...exec,
      id: `e_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.executions.unshift(newExec);
    // Update prompt usage
    const prompt = this.prompts.find(p => p.id === exec.prompt_id);
    if (prompt) {
      prompt.usage_count += 1;
      saveToStorage('prompts', this.prompts);
    }
    saveToStorage('executions', this.executions);
    this.notify();
    return newExec;
  }

  getExecutions(promptId?: string): Execution[] {
    this.init();
    if (promptId) return this.executions.filter(e => e.prompt_id === promptId);
    return [...this.executions];
  }

  // ---- API Keys ----
  setApiKey(provider: string, key: string): void {
    this.apiKeys[provider] = key;
    saveToStorage('apiKeys', this.apiKeys);
    this.notify();
  }

  getApiKey(provider: string): string | undefined {
    this.init();
    return this.apiKeys[provider];
  }

  getApiKeys(): Record<string, string> {
    this.init();
    return { ...this.apiKeys };
  }

  // ---- Analytics ----
  getAnalytics(): AnalyticsData {
    this.init();
    const now = new Date();
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (29 - i));
      return d.toISOString().split('T')[0];
    });

    const execsByDay = new Map<string, Execution[]>();
    this.executions.forEach(e => {
      const day = e.created_at.split('T')[0];
      if (!execsByDay.has(day)) execsByDay.set(day, []);
      execsByDay.get(day)!.push(e);
    });

    const promptUsage = new Map<string, { count: number; totalRating: number; ratings: number }>();
    this.executions.forEach(e => {
      if (!promptUsage.has(e.prompt_id)) promptUsage.set(e.prompt_id, { count: 0, totalRating: 0, ratings: 0 });
      const u = promptUsage.get(e.prompt_id)!;
      u.count++;
      if (e.rating) { u.totalRating += e.rating; u.ratings++; }
    });

    return {
      prompts_per_day: last30Days.map(date => ({
        date,
        count: (execsByDay.get(date) || []).length,
      })),
      tokens_spent: last30Days.map(date => {
        const dayExecs = execsByDay.get(date) || [];
        return {
          date,
          input: dayExecs.reduce((sum, e) => sum + e.tokens_input, 0),
          output: dayExecs.reduce((sum, e) => sum + e.tokens_output, 0),
        };
      }),
      cost_per_day: last30Days.map(date => ({
        date,
        cost: (execsByDay.get(date) || []).reduce((sum, e) => sum + e.cost_usd, 0),
      })),
      top_prompts: Array.from(promptUsage.entries())
        .map(([pid, u]) => ({
          prompt_id: pid,
          title: this.prompts.find(p => p.id === pid)?.title || 'Unknown',
          usage: u.count,
          avg_rating: u.ratings ? u.totalRating / u.ratings : 0,
        }))
        .sort((a, b) => b.usage - a.usage)
        .slice(0, 10),
      app_breakdown: this.getAppBreakdown(),
      auto_vs_manual: {
        auto: this.prompts.filter(p => p.source === 'auto_generated').length,
        manual: this.prompts.filter(p => p.source === 'manual').length,
      },
      total_prompts: this.prompts.length,
      total_executions: this.executions.length,
      total_cost: this.executions.reduce((sum, e) => sum + e.cost_usd, 0),
    };
  }

  private getAppBreakdown(): { app: string; count: number }[] {
    const counts = new Map<string, number>();
    this.executions.forEach(e => {
      const app = e.origin_app || 'web';
      counts.set(app, (counts.get(app) || 0) + 1);
    });
    return Array.from(counts.entries()).map(([app, count]) => ({ app, count }));
  }

  // ---- Variable Extraction ----
  extractVariables(template: string): { name: string; label: string; type: 'text'; required: boolean }[] {
    const regex = /\{\{(\w+)\}\}/g;
    const vars = new Set<string>();
    let match;
    while ((match = regex.exec(template)) !== null) {
      vars.add(match[1]);
    }
    return Array.from(vars).map(name => ({
      name,
      label: name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
      type: 'text' as const,
      required: true,
    }));
  }

  // ---- Template Filling ----
  fillTemplate(template: string, values: Record<string, string>, modifiers: Modifier[] = []): string {
    let filled = template;
    Object.entries(values).forEach(([key, value]) => {
      filled = filled.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
    });
    const activeModifiers = modifiers.filter(m => m.is_active);
    if (activeModifiers.length > 0) {
      filled += '\n\nAdditional instructions:\n' +
        activeModifiers.map(m => `- ${m.text}`).join('\n');
    }
    return filled;
  }
}

export const store = new PromptStore();
