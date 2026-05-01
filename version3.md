# ⚡ MASTER BUILD PROMPT — PromptStudio Ultimate
# Version 3.0 — The World's Most Powerful AI Productivity Platform
# 100x Engineer Mode | Full Autonomy | Self-Learning | Enterprise-Grade

> Paste this entire prompt into any AI — Claude, GPT-4, Cursor, Gemini, Codex.
> It will build the complete platform. No stubs. No skeletons. No placeholders.
> Every file complete. Every function implemented. Ship-ready on day one.

---

## ═══════════════════════════════════════════
## YOUR IDENTITY & OPERATING MODE
## ═══════════════════════════════════════════

You are a **Principal Full-Stack Engineer + AI Systems Architect + Developer Tools Expert**
with 20+ years building tools used by millions of developers at companies including:
JetBrains, GitHub, Vercel, Anthropic, Google DeepMind, Stripe, and Linear.

You have:
- Designed and shipped VS Code extensions with 10M+ installs
- Built AI-native developer tools from scratch to Series B
- Architected platforms processing 1B+ AI API calls per month
- Led teams that shipped zero-downtime systems at global scale

**Operating rules — never break these:**
- Zero stubs. Zero `// TODO`. Zero `// implement later`. Every line is real, working code.
- Every function has error handling. Every API route validates input with Zod.
- Every component has loading, error, and empty states.
- TypeScript strict mode. Zero `any`. Zero type assertions without a comment explaining why.
- Every decision comes with a tradeoff explanation.
- If something is genuinely complex and needs a second pass, say so explicitly —
  but still give a working first version.

---

## ═══════════════════════════════════════════
## WHAT YOU ARE BUILDING — THE FULL VISION
## ═══════════════════════════════════════════

**PromptStudio Ultimate** is the world's most advanced AI productivity platform.

It does 7 things no other tool does:

1. **Prompt Command Center** — a military-grade prompt library that turns any AI
   into a 100x senior engineer, available in every app the user already uses

2. **Deep App Integration** — lives inside VS Code, Cursor, Antigravity, JetBrains,
   Windsurf, Zed, Coursera, GitHub, Notion, Linear, Slack, Discord, Figma, and any
   website via a universal browser extension

3. **AI Brain That Learns You** — watches your conversations, learns your patterns,
   auto-generates prompts, ranks them by usefulness, and builds your personal
   prompt knowledge base — completely automatically

4. **Prompt Compiler** — takes a vague idea or task description and compiles it
   into a perfectly structured, variable-filled, modifier-stacked, chain-ready
   prompt automatically using AI

5. **Multi-Model Orchestration** — run the same prompt on GPT-4o, Claude, Gemini,
   Mistral simultaneously, compare outputs side by side, and auto-pick the best one

6. **Team Prompt Intelligence** — team-wide prompt library with governance,
   versioning, approval workflows, usage analytics, and ROI tracking

7. **Autonomous Agent Mode** — fire a workflow and let the platform autonomously
   run a full multi-step prompt chain, make decisions between steps, and deliver
   a finished output — no human in the loop required

---

## ═══════════════════════════════════════════
## PART 1 — CORE PLATFORM FEATURES
## ═══════════════════════════════════════════

### 1.1 — Prompt Library (Next Level)

Every prompt has a rich data model:

```typescript
interface Prompt {
  // Identity
  id: string
  slug: string                        // URL-friendly, human-readable ID
  title: string
  description: string
  template: string                    // body with {{VARIABLES}}

  // Intelligence
  variables: Variable[]               // auto-detected + typed
  modifiers: Modifier[]               // power-up tags
  chain_config: ChainConfig | null    // how this prompt chains with others
  context_injections: ContextRule[]   // auto-inject context from current app

  // Classification
  category: PromptCategory
  subcategory: string
  tags: string[]
  boost_level: number                 // 1–10 estimated productivity multiplier
  difficulty: 'junior' | 'mid' | 'senior' | 'staff' | 'principal'
  output_type: 'code' | 'analysis' | 'plan' | 'review' | 'docs' | 'mixed'

  // Source & Origin
  source: 'manual' | 'auto_generated' | 'compiled' | 'imported' | 'community' | 'ai_suggested'
  origin_app: string | null
  origin_conversation_id: string | null

  // Ownership & Sharing
  author_id: string
  team_id: string | null
  org_id: string | null
  visibility: 'private' | 'team' | 'org' | 'public'
  is_verified: boolean                // verified by PromptStudio team

  // Quality & Performance
  version: number
  parent_id: string | null            // fork source
  usage_count: number
  avg_rating: number
  avg_output_quality: number          // AI-scored quality of responses
  avg_tokens_to_complete: number      // cost efficiency metric
  success_rate: number                // % of times user rated output 4+

  // Metadata
  model_recommendations: string[]     // ['claude-3-5-sonnet', 'gpt-4o']
  estimated_cost_usd: number          // per execution estimate
  created_at: Date
  updated_at: Date
}

interface Variable {
  name: string                        // e.g. "PROJECT_NAME"
  type: 'text' | 'code' | 'url' | 'number' | 'select' | 'multiline' | 'file'
  description: string
  default_value: string | null
  options: string[] | null            // for 'select' type
  required: boolean
  auto_fill_from: string | null       // e.g. 'vscode.currentFile.language'
}

interface Modifier {
  id: string
  label: string
  text: string                        // appended to prompt
  category: 'reasoning' | 'output' | 'quality' | 'scale' | 'security' | 'learning'
  boost_addition: number              // how much this modifier improves output
}

interface ContextRule {
  trigger: string                     // 'vscode.currentFile' | 'github.currentRepo' | etc.
  inject_as: string                   // which {{VARIABLE}} it fills
  transform: string | null            // optional transformation function name
}
```

### 1.2 — Prompt Categories (Full List)

```
ENGINEERING:
  Architecture & System Design
  Code Quality & Clean Code
  Code Review & Critique
  Testing & QA
  Debugging & Root Cause Analysis
  Performance Optimization
  Security & Threat Modeling
  Refactoring & Tech Debt
  API Design
  Database Design
  DevOps & CI/CD
  Infrastructure as Code

PRODUCT & DESIGN:
  Product Requirements & PRDs
  User Story Generation
  Feature Specification
  Competitive Analysis
  UX Review
  Figma → Code Translation

DATA & AI:
  Data Engineering
  ML Model Design
  Prompt Engineering (meta)
  Data Pipeline Architecture
  Analytics & BI

LEARNING & RESEARCH:
  Concept Explanation
  Deep Dive Research
  Tutorial Generation
  Quiz & Knowledge Test
  Paper Summarization
  Technology Comparison

COMMUNICATION:
  Technical Writing
  Documentation
  Meeting Summarization
  Incident Post-Mortem
  RFC (Request for Comments) Writing
  Stakeholder Update
```

### 1.3 — Master Modifier Library (50+ Modifiers)

Pre-built modifiers organized by category:

```
REASONING MODIFIERS:
  "Think step by step and show your full reasoning before concluding"
  "Before answering, list all the information you wish you had"
  "Identify your top 3 assumptions and state them explicitly"
  "Consider this from the perspective of a skeptical senior engineer"
  "Play devil's advocate against your own solution before finalizing"
  "What are the second and third order consequences of this approach?"

OUTPUT QUALITY MODIFIERS:
  "Give me the version a Google Staff Engineer would be proud to ship"
  "Critique your own output before giving it to me"
  "Rate your own response 1–10 and explain what would make it a 10"
  "Review your output against SOLID principles before submitting"
  "Would this pass a code review at Stripe? If not, fix it first."
  "Format your response so a junior engineer can follow it exactly"

SCALE MODIFIERS:
  "Assume this needs to handle 100x current expected load"
  "Design for global scale from day one, not as an afterthought"
  "What breaks first when traffic spikes 10x? Fix that first."
  "How would Netflix or Cloudflare solve this differently?"

SECURITY MODIFIERS:
  "Threat model this before writing any code"
  "Assume a malicious user will try every input you handle"
  "Apply OWASP Top 10 as a checklist before finishing"
  "What secrets, credentials, or PII could leak here?"

TESTING MODIFIERS:
  "Write tests immediately after the code, before moving on"
  "List every edge case, then cover them all in tests"
  "What input would make this code fail? Test for that."
  "Write a property-based test, not just example-based tests"

LEARNING MODIFIERS:
  "Explain every non-obvious decision as if teaching a junior engineer"
  "What should I read to understand this topic deeply?"
  "Give me an analogy that makes this intuitive"
  "What are the top 3 misconceptions developers have about this?"

RISK MODIFIERS:
  "Flag every decision that could cause a production incident"
  "What would a post-mortem say if this failed in 6 months?"
  "What is the single point of failure here?"
  "What would break this after the next junior developer touches it?"

EFFICIENCY MODIFIERS:
  "What are you assuming that I haven't told you? Ask before proceeding."
  "What is the 80/20 solution here — minimum effort, maximum impact?"
  "What can I delete from this without losing value?"
  "What is the simplest possible version that works in production?"
```

### 1.4 — Prompt Compiler (NEW — FLAGSHIP FEATURE)

The Prompt Compiler takes any vague user input and transforms it into
a perfectly engineered prompt automatically.

```
USER INPUT (vague):
  "help me with my auth system"

COMPILER OUTPUT (engineered prompt):
  You are a principal security engineer specializing in authentication systems.

  Review and improve the authentication system for: {{PROJECT_NAME}}
  Current stack: {{STACK}}
  Current auth method: {{AUTH_METHOD}} (e.g., JWT, sessions, OAuth)
  Pain points or concerns: {{PAIN_POINTS}}

  Deliver:
  1. Security audit of current approach (OWASP checklist)
  2. Architecture recommendation with tradeoffs explained
  3. Implementation of the recommended approach (complete code)
  4. Migration strategy from current to recommended
  5. Tests for auth flows (happy path + attack vectors)
  6. Rate limiting and brute force protection strategy

  Constraints:
  - Production-ready code only
  - Explain every security decision
  - Flag any credentials or secrets handling
  - Assume a motivated attacker will probe every endpoint

  [MODIFIERS APPLIED]: Security Threat Model + Critique Own Output + 10x Scale
```

Compiler steps:
1. Detect intent from vague input (NLP classification)
2. Match to best prompt template from library
3. Identify missing variables and ask for them (or auto-fill from context)
4. Select optimal modifiers for the detected task type
5. Suggest the best AI model for this task type
6. Output the compiled prompt with a quality score

### 1.5 — Multi-Model Orchestration (NEW)

Run one prompt on multiple AI models simultaneously:

```
FIRE MODE OPTIONS:
  Single   — fire at one model
  Compare  — fire at 2–4 models simultaneously, view outputs side by side
  Compete  — fire at N models, AI judge picks the best output automatically
  Ensemble — fire at N models, merge the best parts of each output into one

SUPPORTED MODELS:
  OpenAI:    gpt-4o, gpt-4o-mini, o1, o1-mini, o3
  Anthropic: claude-opus-4, claude-sonnet-4, claude-haiku-4
  Google:    gemini-2.5-pro, gemini-2.5-flash
  Mistral:   mistral-large, mistral-medium, codestral
  Meta:      llama-3.3-70b (via Groq or Together)
  Local:     ollama (any local model)
  Custom:    any OpenAI-compatible API endpoint
```

Compare view shows:
- Response from each model
- Token count + estimated cost per model
- AI-scored quality rating per response (1–10)
- Speed (time to first token, total time)
- "Use this one" button to save the best to library

### 1.6 — Autonomous Agent Mode (NEW)

Fire a full workflow chain and let the platform run it autonomously:

```
AGENT WORKFLOW EXAMPLE: "Build me a secure REST API for user management"

Step 1 → Architecture Prompt     → AI designs the system
Step 2 → [DECISION NODE]         → Agent reads Step 1 output,
                                   decides which implementation path to take
Step 3 → Implementation Prompt   → AI writes the code (using Step 1 as context)
Step 4 → Security Review Prompt  → AI reviews the Step 3 code for vulnerabilities
Step 5 → [CONDITION NODE]        → If security issues found → go to Step 5a
                                   If clean → go to Step 6
Step 5a→ Fix Security Prompt     → AI fixes the issues found in Step 4
Step 6 → Test Generation Prompt  → AI writes tests for the Step 3/5a code
Step 7 → Documentation Prompt    → AI writes README and API docs
Step 8 → Final Review Prompt     → AI does one final pass and summarizes

RESULT: Complete, tested, documented, secure API — zero human input required
```

Agent features:
- Visual flowchart of the workflow with real-time progress
- Decision nodes where agent picks the path based on previous output
- Condition nodes with if/else branching
- Loop nodes (retry until quality score > threshold)
- Pause points where human review is required before continuing
- Full execution log with each step's prompt, output, time, and cost
- Resume interrupted workflows from any checkpoint
- Export final assembled output as a single document

### 1.7 — Personal AI Knowledge Base (NEW)

As the user works, PromptStudio builds a **personal knowledge graph**:

```
KNOWLEDGE GRAPH NODES:
  - Technologies they use (detected from code, conversations)
  - Patterns they frequently apply
  - Problems they frequently solve
  - Their coding style preferences
  - Their team's conventions and standards
  - Their project contexts

WHAT IT ENABLES:
  - Auto-fill variables with high accuracy ("You always use TypeScript + Prisma")
  - Suggest the right prompt before user even asks
  - Context injection: "I see you're working on an auth module — here are your
    top 3 security prompts"
  - Personalized prompt recommendations based on current task
  - "You solved this same type of problem 3 months ago — here's that prompt"
```

### 1.8 — Prompt Marketplace (NEW)

Community-driven marketplace for prompt packs:

```
PROMPT PACKS (pre-built collections):
  "Google Interview Prep Pack"          — 20 prompts for coding interviews
  "Stripe-Level Code Quality Pack"      — 15 prompts for payment/fintech code
  "Netflix System Design Pack"          — 12 prompts for distributed systems
  "Zero-Bug Debugging Pack"             — 10 prompts for systematic debugging
  "10x Documentation Pack"             — 8 prompts for world-class docs
  "Security Hardening Pack"             — 15 prompts for security review
  "Data Engineering Pack"               — 12 prompts for pipelines and DBs
  "AI/ML Engineering Pack"              — 14 prompts for ML systems
  "Startup MVP Pack"                    — 10 prompts for shipping fast
  "Legacy Code Rescue Pack"             — 12 prompts for understanding/fixing old code

MARKETPLACE FEATURES:
  - Browse, preview, and install packs
  - Creators can publish packs (free or paid)
  - Ratings, reviews, install count per pack
  - Revenue sharing: 70% to creator, 30% to platform
  - "Verified" badge for packs from known experts
  - Version updates pushed to all installers
```

### 1.9 — Real-Time Collaboration (NEW)

Multiple users working on prompts together:

```
COLLABORATION FEATURES:
  - Live co-editing of prompt templates (like Google Docs)
  - Presence indicators (see who's editing)
  - Inline comments and suggestions on prompt text
  - Approval workflow: draft → review → approved → published
  - Change history with author attribution
  - @mention teammates in comments
  - Prompt review assignments ("@alice please review this before we ship")
  - Team prompt governance: only admins can publish to team library
```

### 1.10 — Command Palette (Global Shortcut)

`Cmd+K` anywhere on the platform opens a universal command palette:

```
COMMAND PALETTE FEATURES:
  Search prompts by keyword
  Fire any prompt instantly
  Run any workflow
  Switch between apps/integrations
  Jump to any page
  Recent prompts (last 10)
  Suggested prompts based on clipboard content
  "Compile this" — paste text, auto-compile to prompt
  Quick fire: type prompt content directly, fire immediately
```

---

## ═══════════════════════════════════════════
## PART 2 — APP INTEGRATIONS (COMPLETE LIST)
## ═══════════════════════════════════════════

Build every integration below as a first-class, fully featured plugin.
Users must never feel like they're leaving their tool to use PromptStudio.

---

### Integration 1 — VS Code Extension (Full)

**Package**: `promptstudio-vscode` | Publish to VS Code Marketplace

#### Sidebar (Activity Bar Panel):
- Full prompt library with search and filter
- Quick-fire buttons next to each prompt
- Current context panel (detected language, framework, file)
- Workflow runner with visual progress
- Recent executions with output preview

#### Editor Context Actions:
- Select any code → right-click → "PromptStudio" submenu:
  - "Review this code" (fires Code Review prompt)
  - "Debug this" (fires Debug prompt)
  - "Write tests for this" (fires Test Generation prompt)
  - "Optimize this" (fires Performance prompt)
  - "Document this" (fires Documentation prompt)
  - "Explain this" (fires Code Explanation prompt)
  - "Refactor this" (fires Refactoring prompt)
  - "Security audit this" (fires Security prompt)

#### Inline AI Response Panel:
- Output appears in a split panel beside the editor (not a popup)
- Apply changes button: AI-suggested edits applied as VS Code diff
- Save as prompt button on any output
- Copy to clipboard, open in new file options

#### Ghost Prompt Suggestions:
- As user types a comment like `// TODO: add auth middleware`
  PromptStudio shows: "I have a prompt for this → [Fire Auth Middleware Prompt]"
- As user types a function name, detects intent and suggests relevant prompt
- Non-intrusive: appears as a subtle inline ghost text, dismissed with Escape

#### Auto-Prompt Generation:
- Monitors GitHub Copilot Chat, VS Code AI Chat (Copilot, Continue, Cody)
- Scores the AI response quality
- If score > 70: shows save toast
- Extracted prompt saved with: `source:vscode`, detected language, detected framework

#### Context Auto-Injection:
Every prompt fired from VS Code automatically gets:
```
Current file: {{FILE_NAME}} ({{LANGUAGE}})
Framework detected: {{FRAMEWORK}}
Relevant code (±50 lines around cursor): {{CODE_CONTEXT}}
Project type: {{PROJECT_TYPE}} (detected from package.json / pyproject.toml / etc.)
Git branch: {{GIT_BRANCH}}
Recent changes: {{RECENT_DIFF}} (last 5 git changes)
```

#### Keybindings:
```
Ctrl+Alt+P         → Open PromptStudio panel
Ctrl+Alt+F         → Fire prompt on selection
Ctrl+Alt+R         → Run current workflow
Ctrl+Alt+S         → Save current conversation as prompt
Ctrl+Alt+C         → Compile selected text into a prompt
Ctrl+Alt+M         → Multi-model compare mode
```

---

### Integration 2 — Cursor IDE (Full)

#### A) `.cursorrules` Auto-Generator:
- Scans user's library for top-rated prompts in each category
- Generates a `.cursorrules` file that embeds their best prompts as persistent AI instructions
- Auto-regenerates when library changes
- CLI tool: `npx promptstudio generate-cursorrules`

#### B) Cursor Chat Sidebar Injection:
- Injects a PromptStudio icon into Cursor's chat panel header
- Click → opens PromptStudio mini-panel alongside Cursor chat
- One-click to insert prompt into Cursor chat input
- Auto-detects when Cursor generates good output → save prompt toast

#### C) Cursor Composer Integration:
- When Cursor Composer is open, PromptStudio shows relevant workflow suggestions
- "Running auth feature? Try the Security Audit workflow first"
- Workflow outputs fed directly into Composer as additional context

#### D) MCP Server:
Build a PromptStudio MCP (Model Context Protocol) server so Cursor can
access the full prompt library natively:
```typescript
// Cursor can call:
mcp.promptstudio.getPrompt({ id: 'senior-arch-design' })
mcp.promptstudio.searchPrompts({ query: 'debug async', category: 'DEBUGGING' })
mcp.promptstudio.firePrompt({ id: 'code-review', variables: { CODE: '...' } })
mcp.promptstudio.runWorkflow({ id: 'full-feature-build', context: '...' })
```

---

### Integration 3 — JetBrains IDEs (NEW)

**Plugin for**: IntelliJ IDEA, WebStorm, PyCharm, GoLand, Rider, CLion

#### Plugin features (identical capability to VS Code extension):
- Sidebar tool window with full prompt library
- Right-click context menu on any code selection
- Intention actions (Alt+Enter menu): "PromptStudio: Review / Test / Debug / Document"
- Inline output in editor split view
- Ghost prompt suggestions as inline hints
- Auto-prompt generation from JetBrains AI Assistant chat
- Context injection (language, framework, file, project type)
- Full keybinding support

Build as a standard IntelliJ Platform plugin (Kotlin + Gradle).

---

### Integration 4 — Windsurf & Zed (NEW)

For **Windsurf** (Codeium's IDE):
- Windsurf Extension via their extension API
- Full prompt library in sidebar
- Prompt injection into Windsurf's Cascade AI chat
- Auto-save good Cascade outputs as prompts

For **Zed** (new high-performance editor):
- Zed extension (Rust/WASM-based)
- Slash commands: `/prompt`, `/fire`, `/workflow`
- Context panel showing PromptStudio prompts relevant to current file
- Auto-prompt generation from Zed AI assistant

---

### Integration 5 — Antigravity (Full)

#### Session Bootstrapper:
When user starts an Antigravity agent session:
1. PromptStudio reads the task description
2. Matches it to the best workflow from the library
3. Asks: "I suggest running the 'Full Feature Build' workflow first. Start? [Yes/No]"
4. If Yes: injects the workflow's system context block at session start
5. All modifiers from the workflow are applied to Antigravity's system prompt

#### Live Agent Coaching:
While Antigravity agent is running:
- Monitor agent actions in real time
- Before agent writes auth code: inject Security Audit prompt automatically
- Before agent writes DB schema: inject Database Design prompt automatically
- Before agent creates API routes: inject API Design prompt automatically
- Show live "coaching tips" panel: "Agent is about to write tests — your Testing prompt suggests also adding property-based tests"

#### Post-Session Analysis:
After every Antigravity session ends:
- Full conversation sent to PromptStudio analysis engine
- Extract 2–5 reusable prompt candidates
- Quality score each candidate
- Show "Session harvest" page: "Found 4 prompts from this session"
- One-click to add all or select individual ones

---

### Integration 6 — Coursera / Udemy / edX / Pluralsight / Frontend Masters

**Browser extension** that activates on learning platforms.

#### Learning Enhancement Buttons (injected into course UI):
```
[⚡ Explain Deeper]      → Fires: "Explain {{CONCEPT}} to a senior engineer
                            who knows {{RELATED}} but not this. Use a production
                            example from a real company."

[🏗️ Build Project]      → Fires: "I just learned {{TOPIC}}. Design a production-
                            grade mini project using it. Architecture, code,
                            tests, deployment. Teach me by building."

[🧠 Quiz Me]            → Fires: "Quiz me on {{TOPIC}} at senior engineer level.
                            Ask questions one at a time. Wait for my answer.
                            Give detailed feedback. Track my score."

[🔗 Connect the Dots]   → Fires: "How does {{TOPIC}} connect to {{RELATED_TOPICS}}
                            I already know? What mental model unifies them?"

[⚡ Fast Track]         → Fires: "I have 1 hour to understand {{TOPIC}} well
                            enough to use in production. What are the 20% of
                            concepts that give 80% of the value? Teach those only."

[📋 Cheat Sheet]        → Fires: "Create a cheat sheet for {{TOPIC}} that a
                            senior engineer would actually use as a reference.
                            Real syntax, real patterns, real gotchas."
```

#### Auto Knowledge Capture:
- After completing each course section, auto-generate a "knowledge prompt"
- Stores what was learned as a searchable prompt: "Explain {{CONCEPT}} — I learned this from {{COURSE_NAME}}"
- Builds a personal knowledge base over time
- "Learning streak" tracked — daily learning goal with prompts fired per day

#### Study Plan Generator:
User inputs a learning goal → PromptStudio generates a full study plan with:
- Curated prompt sequence to learn the topic
- Recommended courses + specific modules
- Projects to build at each milestone
- Timeline with daily goals

---

### Integration 7 — GitHub (Full)

**GitHub App** + **GitHub Actions integration**

#### Pull Request Intelligence:
- When PR opened → PromptStudio auto-fires Code Review prompt on the diff
- Posts structured review as PR comment with sections:
  - 🔴 MUST FIX, 🟡 SHOULD FIX, 🟢 NICE TO HAVE
- Diff-aware: only reviews changed lines, not the whole file
- Security scan: flags any secrets, hardcoded values, SQL injection risks
- Test coverage check: flags if changed code has no corresponding test changes

#### Issue → Prompt:
- GitHub issue → one-click → structured implementation prompt
- Includes: issue title, description, labels, acceptance criteria
- Output: "Implement {{ISSUE_TITLE}}: {{REQUIREMENTS}}" as a ready-to-fire prompt

#### GitHub Actions Workflow:
```yaml
# .github/workflows/promptstudio.yml
# Auto-added to every repo when GitHub App is installed

on: [pull_request]

jobs:
  ai-review:
    steps:
      - uses: promptstudio/review-action@v2
        with:
          api_key: ${{ secrets.PROMPTSTUDIO_KEY }}
          prompts: "code-review,security-audit,performance-check"
          post_comment: true
          fail_on_critical: true
```

#### Repo Intelligence:
- "Understand this repo" workflow: fires Onboard Codebase chain on any repo
- Output: architecture diagram, tech stack, key files map, contribution guide
- Auto-generates `.github/CONTRIBUTING.md` and `ARCHITECTURE.md`

---

### Integration 8 — Linear (NEW)

OAuth app for Linear (the project management tool developers love):

- Convert Linear issues into implementation prompts automatically
- Fire prompts from within Linear issue detail view
- Post AI-generated implementation plans as Linear comments
- "Sprint Planning" workflow: takes sprint issues → generates effort estimates
  and implementation plans for each
- "Tech Debt Tracker": identifies and creates Linear issues for debt found
  during code review prompts

---

### Integration 9 — Notion (NEW)

Notion integration for teams that document in Notion:

- **Notion AI Supercharger**: replace Notion AI with PromptStudio prompts
  for technical documentation tasks
- Fire prompts from within any Notion page via `/promptstudio` slash command
- Auto-save prompt outputs directly into Notion pages
- "Architecture Doc Generator": fire → output formatted as Notion page with
  headings, tables, code blocks
- Sync PromptStudio prompt library to a Notion database (read-only view for non-dev teammates)

---

### Integration 10 — Figma (NEW)

Plugin for Figma (for full-stack teams that work with designers):

- Select any Figma frame → "Generate component from this design"
- Fires: "Implement this UI component in {{FRAMEWORK}} based on this design:
  {{DESIGN_DESCRIPTION}}. Match the design pixel-perfect. Include:
  props interface, responsive behavior, accessibility, dark mode."
- Inject Figma component properties as prompt variables automatically
- "Design Review" prompt: reviews designs for accessibility, consistency, responsiveness
- "Spec Generator": turns Figma designs into written engineering specs

---

### Integration 11 — Slack / Discord Bot (Full)

**Slash commands:**
```
/prompt [search]              → Search and display matching prompts
/fire [prompt-slug] [vars]    → Fire a prompt with variables inline
/workflow [name]              → Run a full workflow chain
/review [code snippet]        → Quick code review in thread
/explain [concept]            → Quick explanation prompt
/debug [error message]        → Quick debug prompt
/save                         → Save last AI response in channel as a prompt
/compare [prompt] [models]    → Multi-model compare in channel
/team-prompts                 → Show team's top 10 prompts
/add-prompt                   → Interactive flow to add new prompt
```

**Smart thread monitoring:**
- If someone pastes code in a channel → PromptStudio bot offers: "Want a quick review? React ✅"
- If someone posts an error → bot offers: "Debug this? React ✅"
- If someone asks a technical question → bot suggests relevant prompts

---

### Integration 12 — Universal Browser Extension (Chrome + Firefox + Arc)

Works on every website. The ultimate catch-all integration.

#### Floating Launcher:
- Small ⚡ icon in bottom-right corner of every web page (togglable)
- Click → PromptStudio mini-panel opens (prompt search, recent, fire)
- Works on: ChatGPT, Claude.ai, Gemini, Perplexity, GitHub, Linear, Notion,
  Confluence, Jira, StackOverflow, any website

#### Right-Click Context Menu:
Select any text on any webpage → right-click → PromptStudio submenu:
```
Explain this
Summarize this
Find bugs in this code
Write tests for this
Translate this to {{language}}
Fire custom prompt on this →  [submenu: top 10 prompts]
Save as prompt
```

#### AI Site Injection (ChatGPT / Claude.ai / Gemini):
On AI chat websites, extension injects:
- **PromptStudio Sidebar**: full library, search, fire — one click inserts into chat input
- **Prompt Suggestions Bar**: appears above chat input, shows 3 suggested prompts
  based on conversation context
- **Quick Modifiers Bar**: one-click modifier chips above the input box
- **Auto-Save Detection**: when AI gives a high-quality response, shows save toast

#### Universal Auto-Prompt Generation:
On every AI website:
1. Monitor user messages and AI responses
2. Score response quality in real time
3. If quality > threshold: show save toast (bottom-right, non-intrusive, auto-dismisses in 5 sec)
4. Background processing: extract template, detect variables, classify category
5. Sync to PromptStudio library via API

#### Clipboard Intelligence:
- When user copies code/text from any page, extension silently analyzes it
- Suggests: "I have 3 prompts that work well with this type of content"
- On ChatGPT/Claude, shows the suggestion above the paste area

---

## ═══════════════════════════════════════════
## PART 3 — AUTO-PROMPT INTELLIGENCE ENGINE
## ═══════════════════════════════════════════

This is the brain of PromptStudio. It runs in the background everywhere.

### 3.1 — Conversation Harvester

Captures conversations from all integrated apps:

```typescript
interface ConversationCapture {
  id: string
  user_id: string
  session_id: string
  origin_app: OriginApp
  origin_url: string | null
  messages: ConversationMessage[]     // full thread
  context: ConversationContext        // file, language, project info
  quality_score: number               // 0–100, computed by scorer
  reusability_score: number           // 0–100, computed by scorer
  prompt_candidates: PromptCandidate[]
  status: 'pending' | 'analyzed' | 'harvested' | 'dismissed'
  harvested_prompt_ids: string[]
  created_at: Date
}

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  tokens: number | null
  model: string | null
}
```

### 3.2 — Quality Scoring (Detailed Algorithm)

Score an AI response on 8 dimensions:

```
DIMENSION 1 — Structural Quality (20 pts)
  Has headers or sections:       +5
  Has code blocks:               +5
  Has numbered steps:            +4
  Has bullet points:             +3
  Has tables:                    +3

DIMENSION 2 — Content Depth (20 pts)
  > 300 words:                   +5
  > 600 words:                   +5
  Contains explanations:         +5
  Contains examples:             +5

DIMENSION 3 — Technical Specificity (20 pts)
  Low filler word ratio:         +10
  Contains specific values:      +5  (e.g. O(n log n), 200ms, 99.99%)
  Contains named patterns:       +5  (e.g. circuit breaker, saga pattern)

DIMENSION 4 — Completeness (20 pts)
  Covers multiple aspects:       +10
  Addresses edge cases:          +5
  Addresses tradeoffs:           +5

DIMENSION 5 — Engagement Signal (20 pts)
  User sent follow-up:           +10
  User conversation > 3 turns:   +5
  User copied the response:      +5  (detected via clipboard events)

Total: 100 points
Threshold to save: > 65
```

### 3.3 — Variable Extractor (Advanced)

Extracts clean, reusable templates from raw user messages:

```
EXTRACTION RULES:

1. Programming languages → {{LANGUAGE}}
   "Python" → {{LANGUAGE}}, "TypeScript" → {{LANGUAGE}}

2. Frameworks → {{FRAMEWORK}}
   "FastAPI" → {{FRAMEWORK}}, "Next.js" → {{FRAMEWORK}}

3. Feature/module names → {{FEATURE}} or {{MODULE}}
   "auth module" → {{MODULE}}, "payment flow" → {{FEATURE}}

4. Error messages → {{ERROR}}
   "TypeError: cannot read properties of undefined" → {{ERROR}}

5. Scale/numbers → {{SCALE}}
   "1M users" → {{SCALE}}, "100 RPS" → {{SCALE}}

6. Company/project names → {{PROJECT}}
   "MyApp" → {{PROJECT}}, "Acme Corp" → {{PROJECT}}

7. Technology comparisons → {{OPTION_A}} vs {{OPTION_B}}

8. Time constraints → {{DEADLINE}}
   "by Friday" → {{DEADLINE}}, "in 2 hours" → {{DEADLINE}}

EXAMPLE TRANSFORMATIONS:

Input:  "Review my Python FastAPI authentication endpoint for security issues
         — I'm worried about JWT token validation"
Output: "Review my {{LANGUAGE}} {{FRAMEWORK}} {{MODULE}} endpoint for
         {{CONCERN}} — specifically around {{SPECIFIC_CONCERN}}"

Input:  "I have an N+1 query problem in my Rails app that's slowing down
         the user listing page to 8 seconds"
Output: "I have a {{PERFORMANCE_ISSUE}} in my {{FRAMEWORK}} app that's
         slowing down {{AFFECTED_FEATURE}} to {{CURRENT_METRIC}}"
```

### 3.4 — Prompt Improver (AI-Powered)

After extracting a prompt candidate, run it through an improvement pass:

```
IMPROVER PROMPT (runs internally):
"You are a prompt engineering expert. Given this raw prompt extracted from
a developer conversation, improve it to be:
1. More specific about the expected output format
2. Role-assigned (add 'You are a [role]...' prefix)
3. Edge cases covered
4. Constraints added
5. Modifier suggestions at the end

Raw prompt: {{EXTRACTED_PROMPT}}

Return JSON: { improved_prompt, suggested_modifiers[], quality_improvement_score }"
```

### 3.5 — Semantic Deduplication

Before saving any auto-generated prompt:

```typescript
interface DeduplicationResult {
  action: 'save_new' | 'merge_with_existing' | 'save_as_variant' | 'discard'
  similar_prompt_id: string | null
  similarity_score: number
  reason: string
}

// Algorithm:
// 1. Generate embedding for new prompt template
// 2. Compare cosine similarity against all existing prompts (vector DB: pgvector)
// 3. similarity > 0.85 → merge_with_existing (update template, bump version)
// 4. similarity 0.60–0.85 → save_as_variant (fork from existing, show diff)
// 5. similarity < 0.60 → save_new
```

### 3.6 — Prompt Recommendation Engine

Surfaces the right prompt at the right moment:

```
RECOMMENDATION TRIGGERS:

In VS Code:
  - Opening a file ending in .test.* → suggest Testing prompts
  - Opening a file with 'auth' in name → suggest Security prompts
  - Viewing a git diff → suggest Code Review prompts
  - Uncommitted changes > 200 lines → suggest "Review before commit" prompt
  - Error in terminal → suggest Debug prompts

In Browser:
  - On GitHub PR page → suggest Code Review prompts
  - On StackOverflow question page → suggest relevant prompts
  - On Linear issue page → suggest Implementation prompts
  - Clipboard contains code → suggest relevant prompts

Time-based:
  - Morning (9–10am): suggest "Daily standup summary" prompt
  - Friday (3–5pm): suggest "Week retrospective" prompt
  - After long meeting: suggest "Meeting summary" prompt
```

---

## ═══════════════════════════════════════════
## PART 4 — ENTERPRISE & TEAM FEATURES
## ═══════════════════════════════════════════

### 4.1 — Organizations & Governance

```typescript
interface Organization {
  id: string
  name: string
  slug: string
  plan: 'starter' | 'growth' | 'enterprise'
  teams: Team[]
  prompt_policy: PromptPolicy       // governance rules
  sso_config: SSOConfig | null      // SAML/OIDC for enterprise
  audit_log_enabled: boolean
  created_at: Date
}

interface PromptPolicy {
  require_approval_before_publish: boolean
  min_rating_to_publish: number
  allowed_categories: PromptCategory[]
  banned_keywords: string[]           // compliance: block certain patterns
  mandatory_modifiers: Modifier[]     // e.g. "always add security modifier"
  prompt_expiry_days: number | null   // force periodic review
}
```

### 4.2 — Prompt Approval Workflow

```
WORKFLOW:
  Developer creates/edits prompt
         ↓
  Submits for review (optional comment)
         ↓
  Reviewers get notified (assigned or team admins)
         ↓
  Reviewer: Approve / Request Changes / Reject
         ↓
  If approved → published to team library
  If changes requested → back to developer with comments
  If rejected → archived with reason
```

### 4.3 — ROI & Impact Dashboard

For engineering managers:

```
METRICS TRACKED:
  - Time saved per engineer per week (estimated from usage)
  - Cost per AI interaction vs output quality
  - Team's most valuable prompts (by usage × rating)
  - Prompts that reduced bug count (correlated with bug tickets)
  - Onboarding acceleration: new engineers using prompts vs not
  - Code review turnaround time (with vs without review prompts)

REPORTS:
  Weekly team digest: top prompts, usage trends, new additions
  Monthly ROI report: estimated hours saved, cost, productivity lift
  Quarterly review: prompt library health, outdated prompts, gaps
```

### 4.4 — SSO & Compliance (Enterprise)

- SAML 2.0 and OIDC SSO (Okta, Azure AD, Google Workspace)
- SCIM user provisioning
- SOC 2 Type II compliant data handling
- Data residency options (US, EU, APAC)
- Audit log: every prompt view, edit, fire, share logged with user + timestamp
- Data retention policies (configurable per org)
- Private deployment option (self-hosted via Docker Compose or Kubernetes)

---

## ═══════════════════════════════════════════
## PART 5 — COMPLETE TECH STACK
## ═══════════════════════════════════════════

### Frontend
- Next.js 14 (App Router), TypeScript strict mode
- Tailwind CSS + shadcn/ui component library
- Zustand (client state), TanStack Query (server state)
- Monaco Editor (prompt editing — full VS Code engine)
- @dnd-kit (drag-and-drop chain builder)
- Framer Motion (animations)
- Recharts (analytics charts)
- Yjs + Hocuspocus (real-time collaboration)
- cmdk (command palette — same as Linear/Vercel uses)

### Backend
- Next.js API routes + tRPC (end-to-end type safety)
- PostgreSQL via Prisma ORM
- pgvector extension (semantic similarity for deduplication)
- NextAuth.js v5 (email + GitHub + Google + SAML SSO)
- Vercel AI SDK (multi-model, streaming, tool calling)
- BullMQ + Redis (background job queue for conversation analysis)
- Inngest (durable workflow execution for agent mode)
- Resend (transactional email)
- Stripe (billing: Free / Pro $19/mo / Team $49/seat / Enterprise custom)

### Browser Extension
- Manifest V3, TypeScript + Vite
- React for popup and injected sidebars
- Background service worker for conversation monitoring
- WebSocket for real-time sync with PromptStudio API
- Shadow DOM for injected UI (no CSS conflicts)

### VS Code Extension
- VS Code Extension API, TypeScript
- Webview API + React for sidebar panel
- Language detection via vscode.languages APIs
- Git API for branch + diff context injection

### JetBrains Plugin
- IntelliJ Platform Plugin SDK, Kotlin
- Swing + Kotlin DSL for tool windows
- Project structure API for context detection

### Infrastructure
- Vercel (web app hosting + edge functions)
- Supabase (PostgreSQL + realtime subscriptions + pgvector)
- Vercel KV (Redis — caching + BullMQ)
- Cloudflare R2 (file storage for exports, imports, outputs)
- Trigger.dev (background job orchestration)
- Sentry (error tracking + performance monitoring)
- PostHog (product analytics — self-hosted option for enterprise)
- Stripe (billing)

---

## ═══════════════════════════════════════════
## PART 6 — COMPLETE DATABASE SCHEMA
## ═══════════════════════════════════════════

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  extensions = [pgvector(map: "vector"), pg_trgm]
}

model User {
  id                String              @id @default(cuid())
  email             String              @unique
  name              String?
  avatar_url        String?
  role              UserRole            @default(DEVELOPER)
  plan              Plan                @default(FREE)
  org_id            String?
  stripe_customer_id String?            @unique
  api_keys_enc      String?             @db.Text   // AES-256 encrypted JSON
  preferences       Json                @default("{}")
  knowledge_graph   Json                @default("{}")
  streak_days       Int                 @default(0)
  last_active_at    DateTime?
  prompts           Prompt[]
  executions        Execution[]
  captures          ConversationCapture[]
  ratings           PromptRating[]
  comments          PromptComment[]
  org               Organization?       @relation(fields: [org_id], references: [id])
  created_at        DateTime            @default(now())
  updated_at        DateTime            @updatedAt
}

model Organization {
  id              String          @id @default(cuid())
  name            String
  slug            String          @unique
  plan            OrgPlan         @default(STARTER)
  owner_id        String
  prompt_policy   Json            @default("{}")
  sso_config      Json?
  audit_log_on    Boolean         @default(false)
  data_region     String          @default("us")
  teams           Team[]
  members         User[]
  created_at      DateTime        @default(now())
}

model Team {
  id          String        @id @default(cuid())
  name        String
  slug        String        @unique
  org_id      String?
  owner_id    String
  org         Organization? @relation(fields: [org_id], references: [id])
  members     TeamMember[]
  prompts     Prompt[]
  chains      Chain[]
  created_at  DateTime      @default(now())
}

model TeamMember {
  team_id   String
  user_id   String
  role      TeamRole      @default(MEMBER)
  joined_at DateTime      @default(now())
  team      Team          @relation(fields: [team_id], references: [id])
  @@id([team_id, user_id])
}

model Prompt {
  id                    String          @id @default(cuid())
  slug                  String          @unique
  title                 String
  description           String
  template              String          @db.Text
  variables             Json            @default("[]")
  modifiers             Json            @default("[]")
  context_injections    Json            @default("[]")
  chain_config          Json?
  category              Category
  subcategory           String?
  tags                  String[]
  boost_level           Int             @default(5)
  difficulty            Difficulty      @default(SENIOR)
  output_type           OutputType      @default(MIXED)
  source                PromptSource    @default(MANUAL)
  origin_app            String?
  origin_conv_id        String?
  embedding             Unsupported("vector(1536)")?
  author_id             String
  team_id               String?
  org_id                String?
  visibility            Visibility      @default(PRIVATE)
  is_verified           Boolean         @default(false)
  is_featured           Boolean         @default(false)
  version               Int             @default(1)
  parent_id             String?
  usage_count           Int             @default(0)
  avg_rating            Float           @default(0)
  avg_output_quality    Float           @default(0)
  avg_tokens            Int             @default(0)
  success_rate          Float           @default(0)
  model_recommendations String[]
  estimated_cost_usd    Float           @default(0)
  approved_at           DateTime?
  approved_by           String?
  author                User            @relation(fields: [author_id], references: [id])
  team                  Team?           @relation(fields: [team_id], references: [id])
  parent                Prompt?         @relation("Forks", fields: [parent_id], references: [id])
  forks                 Prompt[]        @relation("Forks")
  versions              PromptVersion[]
  executions            Execution[]
  ratings               PromptRating[]
  comments              PromptComment[]
  created_at            DateTime        @default(now())
  updated_at            DateTime        @updatedAt
}

model PromptVersion {
  id          String    @id @default(cuid())
  prompt_id   String
  version     Int
  template    String    @db.Text
  variables   Json
  change_note String?
  author_id   String
  prompt      Prompt    @relation(fields: [prompt_id], references: [id])
  created_at  DateTime  @default(now())
}

model Chain {
  id          String      @id @default(cuid())
  title       String
  description String?
  steps       Json        // ChainStep[]
  nodes       Json        // FlowNode[] for visual editor
  edges       Json        // FlowEdge[] for visual editor
  author_id   String
  team_id     String?
  visibility  Visibility  @default(PRIVATE)
  usage_count Int         @default(0)
  team        Team?       @relation(fields: [team_id], references: [id])
  executions  ChainExecution[]
  created_at  DateTime    @default(now())
  updated_at  DateTime    @updatedAt
}

model ChainExecution {
  id          String              @id @default(cuid())
  chain_id    String
  user_id     String
  status      ExecutionStatus     @default(RUNNING)
  steps       Json                // step outputs as they complete
  final_output String?            @db.Text
  total_tokens Int                @default(0)
  total_cost  Float               @default(0)
  started_at  DateTime            @default(now())
  completed_at DateTime?
  chain       Chain               @relation(fields: [chain_id], references: [id])
}

model Execution {
  id                String    @id @default(cuid())
  prompt_id         String
  chain_exec_id     String?
  filled_template   String    @db.Text
  model             String
  response          String    @db.Text
  tokens_input      Int
  tokens_output     Int
  cost_usd          Float
  latency_ms        Int
  quality_score     Float?    // AI-scored
  user_rating       Int?      // 1–5 from user
  origin_app        String?
  user_id           String
  prompt            Prompt    @relation(fields: [prompt_id], references: [id])
  user              User      @relation(fields: [user_id], references: [id])
  created_at        DateTime  @default(now())
}

model ConversationCapture {
  id                  String          @id @default(cuid())
  user_id             String
  session_id          String
  origin_app          String
  origin_url          String?
  messages            Json            // ConversationMessage[]
  context             Json            @default("{}")
  quality_score       Float           @default(0)
  reusability_score   Float           @default(0)
  prompt_candidates   Json            @default("[]")
  status              CaptureStatus   @default(PENDING)
  harvested_ids       String[]
  user                User            @relation(fields: [user_id], references: [id])
  created_at          DateTime        @default(now())
}

model PromptRating {
  id          String    @id @default(cuid())
  prompt_id   String
  user_id     String
  rating      Int       // 1–5
  comment     String?
  prompt      Prompt    @relation(fields: [prompt_id], references: [id])
  user        User      @relation(fields: [user_id], references: [id])
  created_at  DateTime  @default(now())
  @@unique([prompt_id, user_id])
}

model PromptComment {
  id          String    @id @default(cuid())
  prompt_id   String
  user_id     String
  body        String    @db.Text
  parent_id   String?
  resolved    Boolean   @default(false)
  prompt      Prompt    @relation(fields: [prompt_id], references: [id])
  user        User      @relation(fields: [user_id], references: [id])
  parent      PromptComment?  @relation("Replies", fields: [parent_id], references: [id])
  replies     PromptComment[] @relation("Replies")
  created_at  DateTime        @default(now())
}

model PromptPack {
  id          String    @id @default(cuid())
  title       String
  description String
  slug        String    @unique
  cover_url   String?
  price_usd   Float     @default(0)
  author_id   String
  prompt_ids  String[]
  install_count Int     @default(0)
  avg_rating  Float     @default(0)
  is_verified Boolean   @default(false)
  created_at  DateTime  @default(now())
}

model AuditLog {
  id          String    @id @default(cuid())
  org_id      String
  user_id     String
  action      String    // 'prompt.created' | 'prompt.fired' | 'prompt.shared' | etc.
  resource_id String?
  metadata    Json      @default("{}")
  ip_address  String?
  created_at  DateTime  @default(now())
}

// ─── Enums ───────────────────────────────────────

enum Category {
  ARCHITECTURE CODE_QUALITY CODE_REVIEW TESTING DEBUGGING
  PERFORMANCE SECURITY DOCUMENTATION DEVOPS REFACTORING
  LEARNING PRODUCT DATA_ENGINEERING AI_ML API_DESIGN DATABASE
  COMMUNICATION INFRASTRUCTURE
}

enum Difficulty       { JUNIOR MID SENIOR STAFF PRINCIPAL }
enum OutputType       { CODE ANALYSIS PLAN REVIEW DOCS MIXED }
enum PromptSource     { MANUAL AUTO_GENERATED COMPILED IMPORTED COMMUNITY AI_SUGGESTED }
enum CaptureStatus    { PENDING ANALYZED HARVESTED DISMISSED }
enum Visibility       { PRIVATE TEAM ORG PUBLIC }
enum TeamRole         { OWNER ADMIN MEMBER VIEWER }
enum ExecutionStatus  { RUNNING PAUSED COMPLETED FAILED CANCELLED }
enum Plan             { FREE PRO TEAM ENTERPRISE }
enum OrgPlan          { STARTER GROWTH ENTERPRISE }
enum UserRole         { DEVELOPER DEVOPS DATA_ENGINEER AI_ML_ENGINEER MANAGER DESIGNER }
```

---

## ═══════════════════════════════════════════
## PART 7 — SEED DATA (25 PROMPTS, 5 WORKFLOWS)
## ═══════════════════════════════════════════

Seed these prompts fully — complete templates, not titles only:

### Prompts to Seed:
1. Senior Architect System Design (Architecture, 10x)
2. Production-Grade Implementation (Code Quality, 9x)
3. Brutal L7 Code Review (Code Review, 8x)
4. Full Test Suite Generator (Testing, 8x)
5. SRE Deep Debug Protocol (Debugging, 9x)
6. Performance Optimization Audit (Performance, 8x)
7. OWASP Security Threat Model (Security, 9x)
8. Developer Documentation Generator (Documentation, 6x)
9. Zero-Downtime CI/CD Pipeline (DevOps, 7x)
10. Microservices DDD Decomposition (Architecture, 9x)
11. REST API Contract Designer (API Design, 7x)
12. Database Schema Optimizer (Database, 8x)
13. Incident Post-Mortem Generator (DevOps, 6x)
14. Legacy Code Understanding Map (Code Quality, 8x)
15. Tech Debt Elimination Plan (Refactoring, 7x)
16. ML System Design (AI/ML, 9x)
17. Data Pipeline Architecture (Data Engineering, 8x)
18. Product Requirements to Technical Spec (Product, 7x)
19. Engineering RFC Writer (Communication, 6x)
20. Onboard New Codebase (Code Quality, 8x)
21. Dependency Vulnerability Audit (Security, 7x)
22. Infrastructure Cost Optimizer (Infrastructure, 7x)
23. Interview Prep: System Design (Learning, 8x)
24. Prompt Compiler Meta-Prompt (AI/ML, 10x)
25. Weekly Engineering Retrospective (Communication, 5x)

### Workflows to Seed:
1. "Full Feature Build" (7 steps: arch → impl → tests → review → security → docs → deploy)
2. "10x Debug Session" (5 steps: reproduce → root cause → fix → regression test → post-mortem)
3. "Security Hardening" (6 steps: threat model → audit → fix → verify → docs → monitor)
4. "Onboard Codebase" (5 steps: understand → map → document → debt → plan)
5. "Ship MVP Fast" (6 steps: spec → arch → implement → test → deploy → monitor)

---

## ═══════════════════════════════════════════
## PART 8 — COMPLETE DELIVERABLES
## ═══════════════════════════════════════════

Deliver in this exact order. Every file complete:

1.  Full project file tree (monorepo structure)
2.  Complete Prisma schema (as shown above, with all relations)
3.  All TypeScript types, interfaces, and Zod schemas
4.  tRPC router definitions (all procedures)
5.  All API route implementations (fully working)
6.  Frontend — layout, navigation, all pages
7.  Frontend — all components (prompt library, editor, chain builder, multi-model, agent)
8.  Frontend — analytics dashboard (all charts wired to real data)
9.  Frontend — marketplace (browse, install, publish)
10. Frontend — real-time collaboration (Yjs integration)
11. VS Code extension — complete, publishable to VS Code Marketplace
12. JetBrains plugin — complete, publishable to JetBrains Marketplace
13. Browser extension — Chrome + Firefox, complete
14. Cursor MCP server — complete
15. Cursor `.cursorrules` generator — complete
16. Auto-prompt intelligence engine — complete (harvester, scorer, extractor, deduplicator)
17. Autonomous agent execution engine — complete
18. GitHub App + GitHub Actions workflow — complete
19. Slack bot — complete
20. Stripe billing integration — complete (Free / Pro / Team / Enterprise)
21. Email templates (Resend) — all transactional emails
22. Seed script — all 25 prompts + 5 workflows with full content
23. Docker Compose (for self-hosted enterprise deployment)
24. `.env.example` — every variable documented with example values
25. `README.md` — full documentation with setup, architecture, integration guide
26. `DEPLOYMENT.md` — step-by-step for Vercel + Supabase + extension publishing
27. `ARCHITECTURE.md` — system design, data flow, decision log

---

## ═══════════════════════════════════════════
## PART 9 — NON-NEGOTIABLE QUALITY RULES
## ═══════════════════════════════════════════

Before you output a single line of code, internalize these rules:

**Code:**
- TypeScript strict — zero `any`, zero `as SomeType` without a comment
- Zod validation on every API input
- Prisma for all DB queries — zero raw SQL
- Every async function: try/catch with typed errors
- Every component: loading state, error state, empty state
- No `console.log` in production code (use structured logger)
- Mobile responsive: 375px to 4K

**Security:**
- API keys encrypted (AES-256) before storing, decrypted only in memory
- All user input sanitized before DB insertion
- Rate limiting on all public endpoints (Upstash Ratelimit)
- CSRF protection on all state-changing routes
- Content Security Policy headers on all pages

**Performance:**
- All list endpoints paginated (cursor-based, not offset)
- Heavy operations in background jobs (BullMQ), not blocking API routes
- React components lazy-loaded per route
- Images optimized (Next.js Image component)
- Lighthouse: Performance 90+, Accessibility 95+, Best Practices 100

**Testing:**
- Unit tests for all utility functions and business logic
- Integration tests for all API routes
- E2E tests for critical user flows (Playwright)
- Extension tests for VS Code and browser extensions

---

## ═══════════════════════════════════════════
## PART 10 — BEGIN BUILDING
## ═══════════════════════════════════════════

Start immediately. No preamble. No "Great, I'll build this for you!" Just build.

Order:
1. Prisma schema (output complete file)
2. TypeScript types + Zod schemas (output complete file)
3. tRPC router (output complete file)
4. API routes (output all, one by one)
5. Frontend pages + components (output all, one by one)
6. VS Code extension (output all files)
7. Browser extension (output all files)
8. Auto-prompt engine (output all files)
9. Agent execution engine (output all files)
10. Seed script (output complete file)
11. Config files (.env.example, docker-compose.yml, README.md)

When you finish a file, immediately move to the next.
If you hit the context limit, say "CONTINUE" and I will ask you to continue.
Never stop mid-file. Complete each file before moving on.

Do not ask for clarification. Make reasonable assumptions.
State each assumption in a one-line comment at the top of the relevant file.

BUILD.