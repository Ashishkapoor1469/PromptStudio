# 🚀 MASTER BUILD PROMPT — PromptStudio AI Productivity Platform
# Version 2.0 — With App Integrations + Auto-Prompt Generation

> Paste this entire prompt into any AI (Claude, GPT-4, Cursor, Gemini, etc.)
> It will build you the full platform from scratch. Zero stubs. Zero placeholders.

---

## YOUR IDENTITY

You are a **Principal Full-Stack Engineer + AI Systems Architect** with 15+ years building
developer tools at companies like JetBrains, Vercel, GitHub, and Anthropic.

You build production-grade, battle-tested software. Every decision has a reason.
Every tradeoff is explained. You do not write tutorial code. You ship.

---

## WHAT YOU ARE BUILDING

**PromptStudio** — an AI productivity platform that does 3 things:

1. **Acts as a prompt library and launcher** — store, manage, and fire expert-level prompts
   at any AI model to get top-engineer-level output every time
2. **Integrates deeply with the apps developers already use** — VS Code, Cursor, Antigravity,
   Coursera, Notion, GitHub, Slack, Linear, and more — so prompts are available everywhere,
   not just in a web tab
3. **Automatically generates and learns prompts** from your conversations — watches what you
   do, extracts reusable prompt patterns, and builds your personal prompt library for you

The result: any AI model the user talks to behaves like a **50x more productive
senior engineer**, no matter which app they are in.

---

## PART 1 — CORE PLATFORM (Web App)

### 1.1 Prompt Library
Every prompt has:
```typescript
interface Prompt {
  id: string
  title: string
  description: string
  template: string              // body with {{VARIABLES}}
  variables: Variable[]         // auto-detected from template
  modifiers: Modifier[]         // power-up tags
  category: PromptCategory
  tags: string[]
  chainable: boolean
  boost_level: number           // 1–10 productivity multiplier
  source: 'manual' | 'auto_generated' | 'imported' | 'community'
  origin_app: string | null     // 'vscode' | 'cursor' | 'antigravity' etc.
  author_id: string
  team_id: string | null
  is_public: boolean
  version: number
  parent_id: string | null
  usage_count: number
  avg_rating: number
  created_at: Date
  updated_at: Date
}
```

Categories:
- Architecture, Code Quality, Code Review, Testing, Debugging
- Performance, Security, Documentation, DevOps, Refactoring
- Learning & Research, Product, Data Engineering, AI/ML

### 1.2 Prompt Chaining (Workflow Builder)
- Visual drag-and-drop chain builder
- Output of Prompt N becomes `{{PREVIOUS_OUTPUT}}` in Prompt N+1
- Pre-built workflows:
  - "Full Feature Build": Architecture → Implementation → Tests → Review → Docs
  - "10x Debug": Reproduce → Root Cause → Fix → Regression Test → Post-Mortem
  - "Security Audit": Threat Model → Code Audit → Exploit Simulation → Fix → Verify
  - "Onboard Codebase": Understand → Map → Document → Identify Debt → Suggest Improvements
  - "Learning Path": Explain Concept → Give Examples → Quiz Me → Fill Gaps → Project Idea

### 1.3 Modifier System
One-click power-ups that append to any prompt:

```
"Think step by step and show your reasoning"
"Identify the biggest risk first"
"Assume this needs to handle 10x current scale"
"Critique your own output before giving it to me"
"List every edge case you can think of"
"Write tests immediately after the code"
"Explain every tradeoff you are making"
"What are you assuming that I haven't told you?"
"Give me the version a Google L7 engineer would write"
"Flag anything that could cause a production incident"
"Suggest what a code reviewer would reject about this"
"What would break this in 6 months?"
```

### 1.4 AI Prompt Enhancer
- User pastes any weak prompt
- Platform returns an upgraded version with: role, output format, constraints,
  edge cases, chain-of-thought instruction, and modifiers injected
- Shows a diff (original vs enhanced)
- One-click save to library

### 1.5 Fire to AI
- Connect OpenAI, Anthropic, Google Gemini, Mistral, local Ollama
- API keys stored client-side only (localStorage), never sent to server
- Stream responses in real time
- Token usage + cost shown per request
- Rate and save every output

### 1.6 Analytics Dashboard
- Prompts used per day, tokens spent, cost, top prompts
- Prompt performance: avg AI output quality rating
- App breakdown: which integrations are generating the most prompts
- Auto-generated vs manual prompt ratio

---

## PART 2 — APP INTEGRATIONS (CRITICAL FEATURE)

This is what makes PromptStudio 50x better than any other tool.
Prompts must be available inside the apps developers already use.
Users should NEVER have to leave their current tool to access PromptStudio.

---

### Integration 1 — VS Code Extension

**Build a full VS Code extension** (`promptstudio-vscode`).

#### Commands (accessible via Cmd+Shift+P):
- `PromptStudio: Open Prompt Library` — sidebar panel with full library
- `PromptStudio: Fire Prompt on Selection` — select code → pick prompt → get AI response inline
- `PromptStudio: Auto-Enhance Selection` — select code → AI rewrites it using best prompt
- `PromptStudio: Save Conversation as Prompt` — save current AI chat as reusable prompt
- `PromptStudio: Run Workflow` — run a full chain on the current file

#### Sidebar Panel:
- Full prompt library browsable in VS Code sidebar
- Search, filter, fire — all without leaving the editor
- Output appears in a split panel (not a popup)

#### Auto-Prompt from VS Code:
- Watch GitHub Copilot / VS Code AI chat conversations
- When user asks AI a question and gets a good answer, show a toast:
  **"Save this as a reusable prompt? [Save] [Dismiss]"**
- Auto-extract the pattern (remove specific variables, replace with `{{VAR}}`)
- Save to PromptStudio library with tag `source:vscode`

#### Context injection:
- Automatically inject current file language, framework detected, and surrounding
  code context into every prompt fired from VS Code
- User never has to say "I'm using TypeScript with Next.js" — the extension does it

#### Extension manifest (`package.json`) fields:
```json
{
  "name": "promptstudio-vscode",
  "displayName": "PromptStudio — 50x AI Productivity",
  "description": "Expert prompt library + auto-prompt generation inside VS Code",
  "categories": ["AI", "Productivity", "Other"],
  "activationEvents": ["onStartupFinished"],
  "contributes": {
    "commands": [...],
    "viewsContainers": { "activitybar": [...] },
    "views": { "promptstudio": [...] },
    "keybindings": [
      { "command": "promptstudio.openLibrary", "key": "ctrl+shift+p" },
      { "command": "promptstudio.fireOnSelection", "key": "ctrl+alt+p" }
    ]
  }
}
```

---

### Integration 2 — Cursor IDE Integration

Cursor has a `.cursorrules` file and a custom AI instructions system.
Build these two things:

#### A) `.cursorrules` Auto-Generator
- User connects their PromptStudio account
- Platform generates a `.cursorrules` file tailored to:
  - Their role (backend, frontend, fullstack, etc.)
  - Their stack (detected from `package.json` / `requirements.txt`)
  - Their top-rated prompts from their library
- The `.cursorrules` file embeds their best prompts as Cursor's persistent instructions
- Updates automatically when user adds new high-rated prompts

Generated `.cursorrules` format:
```
# Auto-generated by PromptStudio — DO NOT EDIT MANUALLY
# Regenerate at: https://promptstudio.dev/integrations/cursor

## Your Role
You are a senior {{ROLE}} engineer working on a {{STACK}} codebase.
Always apply these principles: [pulled from user's Architecture prompts]

## Code Quality
[pulled from user's Code Quality prompts]

## When Writing Tests
[pulled from user's Testing prompts]

## When Debugging
[pulled from user's Debugging prompts]

## Red Flags — Never Do These
[universal list of bad patterns]

## Current Project Context
Project: {{PROJECT_NAME}}
Stack: {{DETECTED_STACK}}
Scale: {{SCALE}}
```

#### B) Cursor Conversation Monitor (Browser Extension)
- Watches Cursor's AI chat panel
- Detects when user gets a high-quality answer
- Offers to save it as a prompt to PromptStudio
- Injects suggested prompts from PromptStudio into the Cursor chat input

---

### Integration 3 — Antigravity Integration

Build a plugin for Antigravity (AI coding agent):

#### Prompt Injection at Agent Start
- When user starts an Antigravity agent session, PromptStudio injects a
  "system context block" at the top of the session:
  - User's role and stack
  - Top 5 prompts from their library as agent instructions
  - Active modifier stack
  - Current workflow step (if running a chain)

#### Agent Action Monitoring
- Monitor Antigravity agent actions (file edits, terminal commands, API calls)
- After each significant agent action, PromptStudio evaluates:
  - Did the agent follow best practices?
  - Was a better prompt available that would have given better output?
  - Auto-suggest: "Use the 'Security Audit' prompt before the agent writes auth code"

#### Auto-Prompt Generation from Agent Sessions
- At the end of every Antigravity session, PromptStudio analyzes the full
  conversation log
- Extracts 2–5 reusable prompt patterns
- Shows them to the user: "We found 3 prompts worth saving from this session"
- One-click to add to library

---

### Integration 4 — Coursera / Learning Platforms Integration

Build a browser extension that activates on:
- `coursera.org`, `udemy.com`, `edx.org`, `pluralsight.com`, `frontendmasters.com`

#### What it does:
When user is watching a course or reading course material:

1. **"Explain This Better" button** — appears next to any concept
   - Fires a learning prompt: "Explain {{CONCEPT}} like I am a senior engineer
     who already knows {{RELATED_CONCEPT}}. Give a real-world production example."

2. **"Build a Project From This" button**
   - Fires: "I just learned {{TOPIC}} from a course. Design a mini production-grade
     project that exercises this concept. Include: requirements, architecture,
     implementation steps, and tests."

3. **"Quiz Me" button**
   - Fires: "Quiz me on {{TOPIC}} at a senior engineer level. Ask 5 questions,
     wait for my answer, then give detailed feedback."

4. **Auto-generate Learning Prompts**
   - At the end of a course section, auto-generate a prompt that summarizes
     what was learned and saves it as a "knowledge prompt" in PromptStudio
   - These become part of the user's personal knowledge base

---

### Integration 5 — GitHub Integration

OAuth app that connects to GitHub repos.

#### Features:
- **PR Review Automation**: when a PR is opened, auto-fire the "Brutal Code Review"
  prompt on the diff and post the result as a PR comment
- **Issue → Prompt**: convert GitHub issues into structured prompts
  ("Implement feature: {{ISSUE_TITLE}}" with full context)
- **Commit Message Enhancer**: paste a vague commit → get a conventional commit message
- **Auto-generate README**: fire "Documentation Generator" prompt on any repo

---

### Integration 6 — Slack / Discord Bot

Deploy a bot that responds to:
- `/prompt [search query]` — returns matching prompts from team library
- `/fire [prompt name] [variable=value]` — fires a prompt and posts result
- `/chain [workflow name]` — runs a full workflow and posts all outputs
- `/save-prompt` — save the last AI conversation in the channel as a prompt

---

### Integration 7 — Browser Extension (Universal)

A Chrome/Firefox extension that works on ANY website.

#### Features:
- **Floating PromptStudio button** on every page (can be hidden)
- **Right-click menu**: select any text → "Fire PromptStudio prompt on this"
- **Works on**: ChatGPT, Claude.ai, Gemini, Perplexity, GitHub, Linear, Notion
- **On AI chat sites** (ChatGPT, Claude):
  - Injects a PromptStudio sidebar with the full library
  - One-click to insert any prompt into the chat input
  - Auto-detects when a good answer is produced and offers to save as prompt
  - Shows suggested follow-up prompts based on conversation context

#### Auto-Prompt Generation (Universal):
This is the core auto-generation engine:

```
TRIGGER: User sends a message to any AI (ChatGPT, Claude, Gemini, etc.)
         and the AI responds with a high-quality answer

PROCESS:
1. Capture the user's original message (the question/instruction)
2. Capture the AI's response
3. Score the response quality (length, code blocks, structure, specificity)
4. If quality score > threshold:
   a. Extract the prompt pattern from the user's message
   b. Replace specific values with {{VARIABLES}}
   c. Generate a title and description
   d. Detect the category
   e. Show a non-intrusive toast notification:
      "Good prompt detected! Save to PromptStudio? [Save] [Edit] [Dismiss]"
5. If user clicks Save: add to library instantly
6. If user clicks Edit: open a mini editor to refine before saving
```

---

## PART 3 — AUTO-PROMPT GENERATION ENGINE

This is the intelligence layer of PromptStudio.
It learns from every AI conversation and builds the user's prompt library automatically.

### 3.1 Conversation Analyzer

```typescript
interface ConversationAnalyzer {
  // Input: raw conversation from any source
  analyze(conversation: Conversation): PromptCandidate[]
}

interface PromptCandidate {
  extracted_template: string      // with {{VARIABLES}} substituted
  detected_variables: Variable[]
  suggested_title: string
  suggested_category: PromptCategory
  suggested_tags: string[]
  quality_score: number           // 0–100
  reusability_score: number       // how likely to be useful again
  origin: ConversationOrigin      // which app it came from
  raw_user_message: string        // original before extraction
  raw_ai_response: string
}
```

### 3.2 Quality Scoring Algorithm

Score an AI response on:

| Signal | Weight | How to detect |
|--------|--------|---------------|
| Response length > 200 words | 15% | Character count |
| Contains code blocks | 20% | Markdown ``` detection |
| Structured with headers | 15% | ## detection |
| Contains numbered steps | 15% | Ordered list detection |
| Specific, not vague | 20% | Low ratio of filler words |
| User sent follow-up questions | 15% | Conversation length |

Total score 0–100. Save prompt if score > 65.

### 3.3 Variable Extraction

When extracting a prompt template from a user message:

```
Input:  "Review this Python FastAPI code for security issues in the auth module"
Output: "Review this {{LANGUAGE}} {{FRAMEWORK}} code for {{CONCERN}} issues in the {{MODULE}} module"

Input:  "Write a system design for a real-time chat app that needs to handle 1M users"
Output: "Write a system design for {{APP_DESCRIPTION}} that needs to handle {{SCALE}} users"

Input:  "Help me debug this React useEffect that causes infinite re-renders"
Output: "Help me debug this {{FRAMEWORK}} {{HOOK}} that causes {{SYMPTOM}}"
```

Rules:
- Replace proper nouns (language names, framework names, feature names) with vars
- Keep generic engineering terms as-is
- Suggest sensible variable names (not just `VAR_1`)
- Detect the type of each variable (language, framework, scale, feature, error, etc.)

### 3.4 Prompt Deduplication

Before saving a new auto-generated prompt:
- Compute semantic similarity against existing library
- If similarity > 80%: show "This is similar to [existing prompt]. Update it instead?"
- If similarity 50–80%: show "Related to [existing prompt]. Save as variant?"
- If similarity < 50%: save as new

### 3.5 Weekly Prompt Digest

Every week, send user an email/notification:
- "We auto-generated 12 prompts from your conversations this week"
- Top 3 most reusable ones shown with preview
- "Review and save" CTA
- Prompts waiting for review shown in dashboard

---

## PART 4 — TECH STACK

### Frontend
- Next.js 14 (App Router), TypeScript strict
- Tailwind CSS + shadcn/ui
- Zustand (client state), React Query (server state)
- Monaco Editor (prompt editing)
- @dnd-kit (chain builder drag and drop)
- Framer Motion (animations)

### Backend
- Next.js API routes (serverless)
- PostgreSQL via Prisma ORM
- NextAuth.js (email + GitHub + Google OAuth)
- Vercel AI SDK (multi-model support)
- pg_trgm (full-text search)
- BullMQ + Redis (background jobs for conversation analysis)

### Browser Extension
- Manifest V3 (Chrome + Firefox)
- TypeScript + Vite build
- Content scripts for DOM injection
- Background service worker for conversation monitoring
- WebSocket connection to PromptStudio API for real-time sync

### VS Code Extension
- VS Code Extension API
- TypeScript
- Webview API for sidebar panel
- Language detection via VS Code APIs

### Infrastructure
- Vercel (hosting)
- Supabase (PostgreSQL + realtime)
- Vercel KV (Redis for caching + job queues)
- Sentry (error tracking)
- Resend (email)

---

## PART 5 — DATABASE SCHEMA

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  avatar_url    String?
  role          UserRole  @default(DEVELOPER)
  plan          Plan      @default(FREE)
  api_keys      Json?     // encrypted, per-model keys
  preferences   Json?
  prompts       Prompt[]
  executions    Execution[]
  created_at    DateTime  @default(now())
}

model Prompt {
  id              String        @id @default(cuid())
  title           String
  description     String
  template        String        @db.Text
  variables       Json
  modifiers       Json
  category        Category
  tags            String[]
  boost_level     Int           @default(5)
  source          PromptSource  @default(MANUAL)
  origin_app      String?
  author          User          @relation(fields: [author_id], references: [id])
  author_id       String
  team            Team?         @relation(fields: [team_id], references: [id])
  team_id         String?
  is_public       Boolean       @default(false)
  version         Int           @default(1)
  parent          Prompt?       @relation("PromptForks", fields: [parent_id], references: [id])
  parent_id       String?
  forks           Prompt[]      @relation("PromptForks")
  versions        PromptVersion[]
  executions      Execution[]
  ratings         Rating[]
  comments        Comment[]
  usage_count     Int           @default(0)
  avg_rating      Float         @default(0)
  created_at      DateTime      @default(now())
  updated_at      DateTime      @updatedAt
}

model Chain {
  id          String      @id @default(cuid())
  title       String
  description String?
  steps       Json        // [{ prompt_id, order, variable_mappings }]
  author_id   String
  team_id     String?
  is_public   Boolean     @default(false)
  created_at  DateTime    @default(now())
}

model Execution {
  id               String    @id @default(cuid())
  prompt           Prompt    @relation(fields: [prompt_id], references: [id])
  prompt_id        String
  chain_id         String?
  filled_template  String    @db.Text
  model            String
  response         String    @db.Text
  tokens_input     Int
  tokens_output    Int
  cost_usd         Float
  rating           Int?
  origin_app       String?
  user             User      @relation(fields: [user_id], references: [id])
  user_id          String
  created_at       DateTime  @default(now())
}

model ConversationCapture {
  id               String    @id @default(cuid())
  user_id          String
  origin_app       String    // 'vscode' | 'cursor' | 'chatgpt' | 'claude' | etc.
  raw_user_msg     String    @db.Text
  raw_ai_response  String    @db.Text
  quality_score    Float
  reusability_score Float
  extracted_prompt Json?     // PromptCandidate if analyzed
  status           CaptureStatus @default(PENDING)
  created_at       DateTime  @default(now())
}

model Team {
  id          String        @id @default(cuid())
  name        String
  slug        String        @unique
  owner_id    String
  members     TeamMember[]
  prompts     Prompt[]
  created_at  DateTime      @default(now())
}

model TeamMember {
  team        Team      @relation(fields: [team_id], references: [id])
  team_id     String
  user_id     String
  role        TeamRole  @default(MEMBER)
  joined_at   DateTime  @default(now())
  @@id([team_id, user_id])
}

enum Category {
  ARCHITECTURE CODE_QUALITY CODE_REVIEW TESTING DEBUGGING
  PERFORMANCE SECURITY DOCUMENTATION DEVOPS REFACTORING
  LEARNING PRODUCT DATA_ENGINEERING AI_ML
}

enum PromptSource { MANUAL AUTO_GENERATED IMPORTED COMMUNITY }
enum CaptureStatus { PENDING REVIEWED SAVED DISMISSED }
enum TeamRole { OWNER ADMIN MEMBER }
enum Plan { FREE PRO TEAM ENTERPRISE }
enum UserRole { DEVELOPER DEVOPS DATA_ENGINEER AI_ML_ENGINEER MANAGER }
```

---

## PART 6 — DELIVERABLES (IN ORDER)

Deliver everything below. No stubs. No "implement later" comments.

1. Full project file tree
2. Complete Prisma schema
3. All TypeScript types and interfaces
4. All API routes (Next.js) — fully implemented
5. Frontend: all pages and components — fully implemented
6. VS Code extension — complete, publishable
7. Browser extension (Chrome) — complete, installable
8. Cursor `.cursorrules` auto-generator — complete
9. Auto-prompt generation engine — complete
10. Seed script (15+ pre-built prompts, 3 workflows)
11. `.env.example` with every variable documented
12. `README.md` — setup, architecture, integration guide
13. Deployment guide (Vercel + Supabase + extension publishing)

---

## PART 7 — START INSTRUCTIONS

Begin immediately in this order:

1. Confirm scope understanding (2 sentences max)
2. Output the full Prisma schema
3. Output all TypeScript interfaces
4. Build the API layer (all routes)
5. Build the frontend (all pages)
6. Build the VS Code extension
7. Build the browser extension
8. Build the auto-prompt engine
9. Output seed data
10. Output README + deployment guide

Do not ask unnecessary questions. Make reasonable assumptions and state them inline.
Do not summarize — build.