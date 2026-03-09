# AgentPlane Editorial & Messaging Guide (v2)

This document defines how AgentPlane speaks across the website, README, docs, release notes, blog posts, demos, and in-product user-facing prompts.

Its purpose is not tone consistency alone.
Its purpose is category clarity, trust, and disciplined messaging.

---

## 1. Messaging Foundation

### 1.1 Canonical category

Use this as the primary positioning line when the surface needs product-category clarity:

**AgentPlane is a Git-native control plane for auditable agent work.**

### 1.2 Human version

Use this when the surface needs a simpler value statement:

**Put coding agents on a governed Git workflow.**

### 1.3 One-sentence explainer

Default explainer:

**AgentPlane adds task state, approvals, verification, and deterministic closure to agent work inside real Git repositories.**

### 1.4 What AgentPlane is not

Do not position AgentPlane as:

- a generic AI coding assistant,
- a hosted autonomous coding platform,
- an “AI company OS”,
- a prompt framework,
- a repository instructions file,
- a replacement for Git or CI.

### 1.5 Product naming

- Use **AgentPlane** for the product/brand.
- Use `agentplane` for CLI, code, package names, paths, and commands.

---

## 2. Audience Lanes

Every major page should implicitly know who it is speaking to.

### 2.1 Individual engineer

Primary pain:

- agents are fast but messy,
- changes are hard to verify,
- chat history is not a reliable workflow.

Value language:

- governed local workflow,
- clear task lifecycle,
- repo-visible state,
- cleaner closure.

### 2.2 Team lead / engineering manager

Primary pain:

- multiple agent surfaces create inconsistency,
- PRs and tasks lose discipline,
- review and verification become ambiguous.

Value language:

- standardized workflow,
- explicit approvals,
- predictable task execution,
- clearer team conventions.

### 2.3 Platform / security / developer productivity

Primary pain:

- AI coding enters the repo without control boundaries,
- there is no consistent audit trail,
- repo policy and agent behavior drift apart.

Value language:

- policy layer for AI coding,
- auditable task artifacts,
- repository-native governance,
- coexistence with existing Git and CI controls.

---

## 3. Voice and Tone

### 3.1 Core tone

- Precise
- Calm
- Operational
- Evidence-first
- Non-theatrical

### 3.2 What confidence should sound like

Confidence comes from concrete shipped behavior, not emphasis.
Write like an operator describing a reliable system.

### 3.3 Disallowed tone

Avoid:

- hype,
- futurist grandstanding,
- “AI magic” framing,
- empty certainty,
- swagger language,
- conversational filler.

Examples of words to avoid unless quoting someone else:

- revolutionary
- magical
- seamless
- game-changing
- autonomous company
- superhuman

---

## 4. Messaging Order

Across homepage, README, overview docs, and comparison pages, use this order:

1. **Job** — what the product does for the user.
2. **Surface** — where it operates.
3. **Control boundary** — what makes it safe/governed.
4. **Proof** — the artifact or mechanism that proves the claim.
5. **Next action** — what the reader should do next.

Do not lead with doctrine, architecture philosophy, or internal taxonomy.

---

## 5. Preferred Vocabulary

### 5.1 Prefer

Prefer concrete nouns and verbs such as:

- repository
- repo-native
- task
- verification
- approval
- closure
- workflow
- artifact
- audit trail
- governed
- scoped
- traceable
- finish
- verify
- restore
- integrate

### 5.2 Use carefully

Use only when the surrounding copy already explains the product:

- harness engineering
- workflow contract
- projection
- policy tree
- deterministic recovery
- operator surface

### 5.3 Avoid as lead language

Avoid leading with:

- policy-driven framework
- agent-first workflow tooling
- deterministic workflow framework
- project automation platform
- multi-agent system

These may appear deeper in docs if they are concretely explained.

---

## 6. First-Screen Contracts by Surface

### 6.1 Homepage

The first screen must answer:

1. What is AgentPlane?
2. Where does it run?
3. Why should I trust it?
4. What do I do next?

### 6.2 README

The first 100–140 words must make the category legible and provide a believable first-win path.

### 6.3 Docs overview

The top of the page must orient the user toward first value, not explain every concept.

### 6.4 Comparison pages

Comparison pages must make the axis explicit.
Examples:

- raw agent usage vs governed task flow
- repo instructions only vs full workflow control
- direct vs branch_pr

Do not write vague “better than X” copy.

---

## 7. User Dialogue Rules

These rules apply to demos, walkthroughs, examples, and user-facing agent text.

### 7.1 Correct order of conversation

When describing or simulating agent work, use this order:

1. Goal
2. Scope
3. Likely changes
4. Verification plan
5. Risks
6. Approval status
7. Outcome
8. Remaining risk
9. Next action

### 7.2 What the user should see early

Before execution details, the user should understand:

- blast radius,
- proof path,
- approval point,
- closure path.

### 7.3 What to avoid

Avoid early overuse of:

- role theater,
- architecture exposition,
- abstract internal terminology,
- long motivational framing.

---

## 8. Content Types

## 8.1 Homepage / acquisition copy

Purpose:

- category legibility,
- trust,
- routing to the next action.

Required ingredients:

- category line,
- value statement,
- concrete proof points,
- real workflow or repo surfaces,
- one dominant CTA.

## 8.2 README

Purpose:

- turn a repository visitor into an activated evaluator.

Required ingredients:

- what AgentPlane is,
- what it adds to a repo,
- quickstart,
- workflow modes,
- docs links.

## 8.3 Docs page

Purpose:

- help a user complete a task with minimal ambiguity.

Required ingredients:

- current context,
- exact command or step,
- expected output or artifact,
- failure mode or limit,
- next route.

## 8.4 Release post

Purpose:

- explain shipped changes in operator language.

Required sections:

- Release scope
- What changed
- Why it matters operationally
- Breaking or behavioral changes
- Upgrade path
- Verification signals
- What follows next

## 8.5 Roadmap post

Purpose:

- explain sequence and strategic constraints.

Required sections:

- Why now
- Current limit
- What each next version unlocks
- Risks / open questions
- What to expect next

## 8.6 Research / benchmark / method note

Purpose:

- publish reasoning, method, or measurement.

Required sections:

- Objective
- Method
- Findings
- Decision
- Reproducibility details
- Follow-up work

---

## 9. Writing Rules

### 9.1 Sentence style

- Prefer short to medium-length sentences.
- Prefer active voice.
- Prefer concrete subjects and verbs.
- Keep paragraphs compact.

### 9.2 Structural rule

For most sections, use:

1. current state or problem,
2. what changed,
3. operational impact,
4. limit or boundary,
5. next action.

### 9.3 Claims rule

Every meaningful claim should map to one of these:

- a shipped behavior,
- a command,
- a file path,
- a workflow artifact,
- a policy guarantee,
- a measured result.

### 9.4 Limits rule

State limits explicitly.
Do not hide scope boundaries.
Trust increases when the product boundary is clear.

---

## 10. Anti-Patterns

Do not publish copy that does any of the following:

- sells AgentPlane as “another coding agent”,
- leads with internal doctrine instead of user value,
- overuses “framework” language,
- substitutes proof with abstraction,
- implies capabilities not present in the current release,
- hides product limits behind vague future language,
- uses trend language without operational meaning.

---

## 11. Editorial QA Checklist

Before publishing, confirm all are true:

### Positioning discipline

- [ ] The category is legible.
- [ ] The text matches current release reality.
- [ ] The copy does not drift into hosted platform or company-OS language.

### Readability

- [ ] The first paragraph states operational value.
- [ ] Headings are concrete.
- [ ] No filler or rhetorical opening exists.

### Proof

- [ ] Major claims are backed by concrete artifacts or commands.
- [ ] Workflow terms are used consistently.
- [ ] Product naming is correct: AgentPlane / `agentplane`.

### Routing

- [ ] The piece tells the user what to do next.
- [ ] Docs, install, or workflow links are obvious where relevant.

### Trust

- [ ] Limits and boundaries are explicit.
- [ ] No unsupported promises are present.
- [ ] The tone remains calm and accountable.

---

## 12. Versioning Rule

This document governs all public-facing product language.
Any major positioning, audience, or category change must update this file first.
