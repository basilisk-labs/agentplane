# AgentPlane Editorial Guide

## 1. Brand Voice

### 1.1 Core tone

- Precise, operational, and accountable.
- Calm confidence, no hype language.
- Evidence-first: claims must map to shipped behavior, policy, or measurable outcome.

### 1.2 Writing principles

- Lead with what changed and why it matters.
- Prefer concrete nouns and verbs over abstract positioning language.
- Keep paragraphs short and scannable.
- Use active voice and explicit responsibility.
- Separate facts, decisions, and next steps.

### 1.3 Language guardrails

- Avoid buzzwords: "revolutionary", "game-changing", "magic", "seamless".
- Avoid vague claims without proof.
- Avoid performative urgency.
- Prefer exact command names, file paths, and version references where relevant.

### 1.4 Preferred content structure

- Context: current state and user/operator pain.
- Change: what was introduced.
- Impact: what improves in day-to-day execution.
- Limits: what is not solved yet.
- Next: concrete follow-up or roadmap steps.

## 2. Content Generation Rules

### 2.1 Quality bar

- Every generated text must be publishable without stylistic cleanup.
- Generated copy must preserve project terminology consistency.
- If uncertainty exists, state assumptions explicitly.

### 2.2 Consistency contracts

- Product naming: use "AgentPlane" for brand, `agentplane` for CLI/tooling identifiers.
- Workflow terminology: use existing lifecycle words (`plan`, `verify`, `finish`, `export`).
- Release and roadmap text must align with committed repository state.

### 2.3 Style constraints for generated content

- No fluff intros.
- No rhetorical questions.
- No pseudo-conversational filler.
- No contradiction with policy docs (`AGENTS.md`, `POLICY.md`, `DESIGN.md`).

## 3. Blog Post Formats

## 3.1 Roadmap post

Purpose:

- Explain strategic direction and sequencing.

Mandatory sections:

- Why now
- Version-by-version roadmap
- Operational impact for users
- Risks and open questions
- What to expect next

Constraints:

- Must stay future-facing and avoid design-system deep dives unless directly roadmap-critical.
- Must tie each version to an execution outcome.

## 3.2 Release post

Purpose:

- Document shipped changes in an operator-friendly format.

Mandatory sections:

- Release scope (version + date)
- Key changes
- Breaking/behavioral changes
- Upgrade path
- Verification signals (tests/checks/CI status)

Constraints:

- Include migration commands when needed.
- Use explicit "before/after" statements for behavior changes.

## 3.3 Announcement post

Purpose:

- Announce new capability, integration, or major process change.

Mandatory sections:

- Problem statement
- What is new
- Who should use it now
- Rollout status (GA/beta/experimental)
- Immediate next actions

Constraints:

- Announcements must include scope boundaries and known limitations.

## 3.4 Publication or research note

Purpose:

- Publish a method, analysis, benchmark, or implementation rationale.

Mandatory sections:

- Objective
- Method
- Findings
- Decision
- Follow-up work

Constraints:

- Include reproducibility details (commands, scripts, data paths) when applicable.

## 4. Editorial QA Checklist

Before publishing, confirm:

- Title is concrete and non-promotional.
- First paragraph states the operational value.
- Sections follow the selected format contract.
- Terminology matches repository conventions.
- Claims are verifiable from repository state.
- Closing section states the next concrete milestone.
