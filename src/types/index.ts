// ============================================================
// PromptStudio — Core Type Definitions
// ============================================================

// ---- Enums ----

export type PromptCategory =
  | 'architecture'
  | 'code_quality'
  | 'code_review'
  | 'testing'
  | 'debugging'
  | 'performance'
  | 'security'
  | 'documentation'
  | 'devops'
  | 'refactoring'
  | 'learning'
  | 'product'
  | 'data_engineering'
  | 'ai_ml'
  | 'api_design'
  | 'database'
  | 'communication'
  | 'infrastructure';

export type PromptSource = 'manual' | 'auto_generated' | 'imported' | 'community';
export type CaptureStatus = 'pending' | 'reviewed' | 'saved' | 'dismissed';
export type Plan = 'free' | 'pro' | 'team' | 'enterprise';
export type UserRole = 'developer' | 'devops' | 'data_engineer' | 'ai_ml_engineer' | 'manager';
export type TeamRole = 'owner' | 'admin' | 'member';

// ---- Variable System ----

export interface Variable {
  name: string;
  label: string;
  type: 'text' | 'code' | 'select' | 'number';
  default_value?: string;
  options?: string[]; // for select type
  description?: string;
  required: boolean;
}

// ---- Modifier System ----

export interface Modifier {
  id: string;
  label: string;
  text: string;
  icon: string;
  category: 'reasoning' | 'quality' | 'scale' | 'review' | 'safety';
  is_active: boolean;
}

// ---- Prompt ----

export interface Prompt {
  id: string;
  title: string;
  description: string;
  template: string;
  variables: Variable[];
  modifiers: Modifier[];
  category: PromptCategory;
  tags: string[];
  chainable: boolean;
  boost_level: number;
  source: PromptSource;
  origin_app: string | null;
  author_id: string;
  team_id: string | null;
  is_public: boolean;
  version: number;
  parent_id: string | null;
  usage_count: number;
  avg_rating: number;
  created_at: string;
  updated_at: string;
}

// ---- Chain / Workflow ----

export interface ChainStep {
  prompt_id: string;
  order: number;
  variable_mappings: Record<string, string>; // variable_name -> source
}

export interface Chain {
  id: string;
  title: string;
  description: string;
  steps: ChainStep[];
  author_id: string;
  team_id: string | null;
  is_public: boolean;
  created_at: string;
}

// ---- Execution ----

export interface Execution {
  id: string;
  prompt_id: string;
  chain_id: string | null;
  filled_template: string;
  model: string;
  response: string;
  tokens_input: number;
  tokens_output: number;
  cost_usd: number;
  rating: number | null;
  origin_app: string | null;
  user_id: string;
  created_at: string;
}

// ---- User ----

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: UserRole;
  plan: Plan;
  preferences: UserPreferences;
  created_at: string;
}

export interface UserPreferences {
  default_model: string;
  theme: 'dark' | 'light' | 'system';
  auto_prompt_enabled: boolean;
  quality_threshold: number;
  notifications_enabled: boolean;
}

// ---- Team ----

export interface Team {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  member_count: number;
  created_at: string;
}

export interface TeamMember {
  team_id: string;
  user_id: string;
  role: TeamRole;
  user?: User;
  joined_at: string;
}

// ---- Conversation Capture (Auto-Prompt Engine) ----

export interface ConversationCapture {
  id: string;
  user_id: string;
  origin_app: string;
  raw_user_msg: string;
  raw_ai_response: string;
  quality_score: number;
  reusability_score: number;
  extracted_prompt: PromptCandidate | null;
  status: CaptureStatus;
  created_at: string;
}

export interface PromptCandidate {
  extracted_template: string;
  detected_variables: Variable[];
  suggested_title: string;
  suggested_category: PromptCategory;
  suggested_tags: string[];
  quality_score: number;
  reusability_score: number;
  origin: string;
  raw_user_message: string;
  raw_ai_response: string;
}

// ---- Analytics ----

export interface AnalyticsData {
  prompts_per_day: { date: string; count: number }[];
  tokens_spent: { date: string; input: number; output: number }[];
  cost_per_day: { date: string; cost: number }[];
  top_prompts: { prompt_id: string; title: string; usage: number; avg_rating: number }[];
  app_breakdown: { app: string; count: number }[];
  auto_vs_manual: { auto: number; manual: number };
  total_prompts: number;
  total_executions: number;
  total_cost: number;
}

// ---- AI Model Config ----

export interface AIModelConfig {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'google' | 'mistral' | 'ollama' | 'nvidia';
  model_id: string;
  max_tokens: number;
  cost_per_1k_input: number;
  cost_per_1k_output: number;
  supports_streaming: boolean;
}

// ---- Category metadata ----

export const CATEGORY_META: Record<PromptCategory, { label: string; icon: string; color: string }> = {
  architecture: { label: 'Architecture', icon: '🏗️', color: '#6366f1' },
  code_quality: { label: 'Code Quality', icon: '✨', color: '#8b5cf6' },
  code_review: { label: 'Code Review', icon: '🔍', color: '#a78bfa' },
  testing: { label: 'Testing', icon: '🧪', color: '#06b6d4' },
  debugging: { label: 'Debugging', icon: '🐛', color: '#f43f5e' },
  performance: { label: 'Performance', icon: '⚡', color: '#f59e0b' },
  security: { label: 'Security', icon: '🔒', color: '#ef4444' },
  documentation: { label: 'Documentation', icon: '📝', color: '#10b981' },
  devops: { label: 'DevOps', icon: '🚀', color: '#3b82f6' },
  refactoring: { label: 'Refactoring', icon: '♻️', color: '#14b8a6' },
  learning: { label: 'Learning & Research', icon: '📚', color: '#8b5cf6' },
  product: { label: 'Product', icon: '📦', color: '#f97316' },
  data_engineering: { label: 'Data Engineering', icon: '🗄️', color: '#0ea5e9' },
  ai_ml: { label: 'AI / ML', icon: '🤖', color: '#d946ef' },
  api_design: { label: 'API Design', icon: '🔌', color: '#8b5cf6' },
  database: { label: 'Database', icon: '💾', color: '#3b82f6' },
  communication: { label: 'Communication', icon: '💬', color: '#10b981' },
  infrastructure: { label: 'Infrastructure', icon: '☁️', color: '#f59e0b' },
};

// ---- Default Modifiers ----

export const DEFAULT_MODIFIERS: Modifier[] = [
  { id: 'step-by-step', label: 'Think Step by Step', text: 'Think step by step and show your reasoning.', icon: '🧠', category: 'reasoning', is_active: false },
  { id: 'biggest-risk', label: 'Biggest Risk First', text: 'Identify the biggest risk first.', icon: '⚠️', category: 'safety', is_active: false },
  { id: 'scale-10x', label: '10x Scale', text: 'Assume this needs to handle 10x current scale.', icon: '📈', category: 'scale', is_active: false },
  { id: 'self-critique', label: 'Self Critique', text: 'Critique your own output before giving it to me.', icon: '🪞', category: 'quality', is_active: false },
  { id: 'edge-cases', label: 'Edge Cases', text: 'List every edge case you can think of.', icon: '🔎', category: 'quality', is_active: false },
  { id: 'tests-first', label: 'Tests After Code', text: 'Write tests immediately after the code.', icon: '🧪', category: 'quality', is_active: false },
  { id: 'tradeoffs', label: 'Explain Tradeoffs', text: 'Explain every tradeoff you are making.', icon: '⚖️', category: 'reasoning', is_active: false },
  { id: 'assumptions', label: 'State Assumptions', text: 'What are you assuming that I haven\'t told you?', icon: '❓', category: 'reasoning', is_active: false },
  { id: 'l7-engineer', label: 'L7 Engineer Level', text: 'Give me the version a Google L7 engineer would write.', icon: '👑', category: 'quality', is_active: false },
  { id: 'prod-incident', label: 'Production Risks', text: 'Flag anything that could cause a production incident.', icon: '🚨', category: 'safety', is_active: false },
  { id: 'code-review', label: 'Reviewer POV', text: 'Suggest what a code reviewer would reject about this.', icon: '👀', category: 'review', is_active: false },
  { id: 'future-proof', label: 'Future Proof', text: 'What would break this in 6 months?', icon: '🔮', category: 'safety', is_active: false },
];

// ---- AI Models ----

export const AI_MODELS: AIModelConfig[] = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai', model_id: 'gpt-4o', max_tokens: 128000, cost_per_1k_input: 0.005, cost_per_1k_output: 0.015, supports_streaming: true },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'openai', model_id: 'gpt-4o-mini', max_tokens: 128000, cost_per_1k_input: 0.00015, cost_per_1k_output: 0.0006, supports_streaming: true },
  { id: 'claude-4-sonnet', name: 'Claude 4 Sonnet', provider: 'anthropic', model_id: 'claude-sonnet-4-20250514', max_tokens: 200000, cost_per_1k_input: 0.003, cost_per_1k_output: 0.015, supports_streaming: true },
  { id: 'claude-4-opus', name: 'Claude 4 Opus', provider: 'anthropic', model_id: 'claude-opus-4-20250514', max_tokens: 200000, cost_per_1k_input: 0.015, cost_per_1k_output: 0.075, supports_streaming: true },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'google', model_id: 'gemini-2.5-pro', max_tokens: 1000000, cost_per_1k_input: 0.00125, cost_per_1k_output: 0.01, supports_streaming: true },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'google', model_id: 'gemini-2.5-flash', max_tokens: 1000000, cost_per_1k_input: 0.00015, cost_per_1k_output: 0.0006, supports_streaming: true },
  { id: 'mistral-large', name: 'Mistral Large', provider: 'mistral', model_id: 'mistral-large-latest', max_tokens: 128000, cost_per_1k_input: 0.002, cost_per_1k_output: 0.006, supports_streaming: true },
  { id: 'nvidia-llama-3-1', name: 'NVIDIA Llama 3.1', provider: 'nvidia', model_id: 'meta/llama-3.1-405b-instruct', max_tokens: 128000, cost_per_1k_input: 0.002, cost_per_1k_output: 0.006, supports_streaming: true },
];
