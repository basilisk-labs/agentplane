# Homepage Content Map

This file is the content and presentation contract for the public home page at `/`.
It defines what the page must say, what the page must prove, and what visual direction the implementation should follow.

It does not replace the canonical product docs. The homepage is an acquisition and orientation surface.

## Canonical source set

Primary inputs:

- `README.md`
- `docs/user/overview.mdx`
- `docs/user/workflow.mdx`
- `docs/user/commands.mdx`
- `docs/user/task-lifecycle.mdx`

Supporting inputs:

- `docs/user/setup.mdx`
- `docs/user/branching-and-pr-artifacts.mdx`
- `docs/help/troubleshooting-by-symptom.mdx`
- `docs/reference/generated-reference.mdx`
- `docs/developer/release-and-publishing.mdx`
- `docs/releases/`

## Product statement

### Canonical category phrase

AgentPlane is a Git-native control plane for auditable agent work.

### Human-readable value statement

Put coding agents on a governed Git workflow.

### What a visitor should understand in the first screen

1. AgentPlane is a local CLI workflow, not a hosted agent platform.
2. It runs inside real git repositories.
3. It adds approvals, task state, verification, and closure to agent work.
4. Its value is trust, control, and traceability.
5. It supports both a fast local path and a stricter PR-oriented path.

## Anti-positioning

The homepage must not frame AgentPlane as:

1. a generic AI coding assistant,
2. an autonomous company OS,
3. a prompt framework,
4. a hosted runtime or control dashboard,
5. a smarter wrapper around AGENTS.md alone.

## 2026 visual direction

The homepage should look current for 2026 without becoming decorative noise.

### Visual principles

1. Oversized editorial typography.
2. Glass / translucent surfaces with restrained depth.
3. Bento-style information blocks.
4. Subtle aurora gradients and tactile noise.
5. Small motion-friendly affordances and high-clarity hover states.
6. Product proof presented as repository artifacts, not stock illustrations.

### Product-specific constraint

The visual language must still feel technical, controlled, and trustworthy.
Do not drift into playful consumer-AI aesthetics or glossy autonomy theater.

## Page architecture

### 1. Hero

Goal:
Make category, value, and trust model legible immediately.

Must include:

- category phrase,
- one-sentence value statement,
- repository-native proof,
- primary CTA into docs,
- a concrete command / workflow preview.

Recommended proof points:

- local CLI,
- repo-local state,
- verify / finish flow,
- direct and `branch_pr` modes.

### 2. Why teams adopt it

Goal:
Explain the process failure mode AgentPlane fixes.

Core message:
Fast agents are easy. Governed agent work is the harder problem.

Must contrast:

- hidden session state,
- implicit approvals,
- vague completion,
- repo-visible state,
- explicit verification,
- deterministic closure.

### 3. Repository surface

Goal:
Translate abstraction into concrete files and state.

Must answer:
What appears in my repo, and why does it matter?

Must show:

- `AGENTS.md` or `CLAUDE.md`,
- `.agentplane/`,
- task records,
- `start -> verify -> finish`,
- optional backend paths.

### 4. Control model

Goal:
Show that AgentPlane governs execution as a stateful workflow.

Preferred loop:

`Constrain -> Start -> Execute -> Verify -> Finish`

Must stay below the fold; the homepage should not open with deep doctrine.

### 5. Workflow modes

Goal:
Explain mode choice as integration discipline, not feature gating.

Must show:

- `direct` for fast local loops,
- `branch_pr` for structured worktree / PR flow.

### 6. Docs rail

Goal:
Turn the homepage into a reliable navigation surface.

Required groups:

- Getting started
- Workflow model
- Reference
- Developer track
- Support

### 7. Journal surface

Goal:
Show evidence of active shipping.

Must distinguish:

- blog as context and analysis,
- release notes as formal source of truth.

### 8. Closing CTA

Goal:
Resolve ambiguity about next action.

Preferred order:

1. Open overview
2. Read workflow model
3. Browse release notes / blog

## Claim inventory

### Safe claims

- Local CLI workflow.
- Repository-native setup and state.
- Policy gateway file (`AGENTS.md` or `CLAUDE.md`).
- `.agentplane/` workspace.
- Task records and verification state.
- Explicit workflow operations such as `start-ready`, `verify`, and `finish`.
- `direct` and `branch_pr` workflow modes.
- Release notes and blog as separate surfaces.

### Claims to avoid unless separately validated

- Enterprise compliance guarantees.
- Support for every external coding agent.
- Hosted orchestration features.
- Cost governance / budgeting.
- Autonomous long-running operation.
- Any performance or productivity percentage.

## Copy rules

1. Use simple product language before internal terminology.
2. Do not lead with roles, projections, or harness doctrine.
3. Avoid repetitive "framework" wording.
4. Prefer repository, workflow, state, verification, closure, and audit language.
5. Keep "Harness engineering" spelled correctly everywhere.
6. Standardize product naming:
   - product: `AgentPlane`
   - CLI/package: `agentplane`

## Definition of done

The homepage is correct when:

1. A new visitor can identify category and value in under 10 seconds.
2. The first screen communicates trust through repository proof, not abstraction.
3. The layout feels current for 2026 while staying credible for a technical product.
4. The page sends users cleanly into docs, workflow docs, and release history.
5. Nothing on the page promises more than the current release supports.
