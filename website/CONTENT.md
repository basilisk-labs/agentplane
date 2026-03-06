# Homepage Content Map

This document is the content source for the public home page at `/`.
It does not prescribe layout or styling. It defines what the page must say, what each section must prove, and which repository sources support each claim.

## Canonical source set

Primary content inputs:

- `README.md`
- `docs/user/overview.mdx`
- `docs/user/website-ia.mdx`
- `docs/developer/harness-engeneering.mdx`

Secondary supporting inputs:

- `docs/user/workflow.mdx`
- `docs/user/task-lifecycle.mdx`
- `docs/user/commands.mdx`
- `docs/developer/release-and-publishing.mdx`
- `docs/releases/`

## Messaging model

### Core product statement

AgentPlane is a policy-driven CLI workflow for running agents inside real git repositories with explicit approvals, task traceability, and deterministic execution paths.

### What must be understood within the first screen

1. This is not a hosted agent platform.
2. This is a repository-native workflow layer.
3. The product promise is trust, control, and auditability.
4. The differentiator is harness engeneering, not “smarter prompts”.

### What the homepage must avoid

1. Do not describe AgentPlane as autonomous magic.
2. Do not lead with generic “AI coding assistant” language.
3. Do not over-index on role names before explaining the workflow model.
4. Do not duplicate full CLI reference or setup detail.

## Information architecture for `/`

The home page should follow this order.

### 1. Hero

Goal:
Make the product category and value proposition legible in one screen.

Primary message:
Agents you can actually trust in a repository.

Supporting message:
AgentPlane turns agent execution into an engineering process with policy gates, approvals, role boundaries, and auditable task artifacts.

Proof points:

- Policy-first execution
- Approval and planning gates
- Role-based workflows
- Safety guardrails by default
- Repository-local task and verification artifacts

Primary CTA:

- `Start with docs` -> `/docs/user/overview`

Secondary CTA:

- `Read the blog` -> `/blog`

Optional tertiary action:

- `Browse release notes` -> `/docs/releases`

Source basis:

- `README.md` sections: “What is agent/plane?”, “Key Principles”, “Quickstart”
- `docs/user/overview.mdx`

### 2. Why it exists

Goal:
Explain the failure mode in ordinary agent workflows that AgentPlane is meant to fix.

Section message:
Traditional coding agents are hard to trust because intent, scope, approval state, and verification are often implicit or missing.

Required points:

1. Unpredictable file mutation is a systems problem, not only a prompting problem.
2. Teams need bounded execution, not just helpful output.
3. AgentPlane makes behavior inspectable and reproducible.

Tone:
Analytical, not dramatic.

Source basis:

- `README.md` introduction
- `docs/developer/harness-engeneering.mdx`

### 3. Harness engeneering differentiator

Goal:
Introduce the product’s conceptual frame and explain why the system feels different from generic agent tooling.

Section message:
AgentPlane treats agent execution as harness engeneering: constrain, execute, observe, recover, integrate.

Required subpoints:

1. Legibility is the target.
2. Process beats vibes.
3. Throughput changes integration style.
4. Control autonomy by harness design.
5. Fight entropy continuously.

Suggested device:
A five-step operating loop:

`Constrain -> Execute -> Observe -> Recover -> Integrate`

Source basis:

- `docs/developer/harness-engeneering.mdx`
- `README.md` section “Harness Engeneering”

### 4. What you get in a repository

Goal:
Translate abstract workflow claims into concrete repository artifacts.

Section message:
The system is made of visible files, commands, and state transitions inside the repo.

Required artifact list:

- `AGENTS.md` as policy gateway
- `.agentplane/` as repo-local workspace
- task records in `.agentplane/tasks/`
- guarded `start -> verify -> finish` lifecycle
- optional backend integration

This section should answer:
What appears in my repository after initialization, and why does it matter?

Source basis:

- `docs/user/overview.mdx`
- `README.md` sections “Policy Gateway”, “Project Structure”, “Roles”

### 5. Workflow modes

Goal:
Show that the product supports both solo and structured team flow without making the page feel like reference docs.

Section message:
AgentPlane supports a fast `direct` mode and a stricter `branch_pr` mode for structured multi-role integration.

Required points:

1. `direct` is single-checkout and good for short loops.
2. `branch_pr` is structured, worktree-based, and integrator-oriented.
3. The choice is about integration discipline, not feature gating.

Source basis:

- `README.md` section “Workflow Modes”
- `docs/user/workflow.mdx`

### 6. Homepage section rail mapped to docs

Goal:
Satisfy the `website-ia` contract and make the home page a reliable entry point into canonical docs.

Required doc groups:

1. Getting Started
   Links:
   - `/docs/user/overview`
   - `/docs/user/prerequisites`
   - `/docs/user/setup`

2. Workflow Model
   Links:
   - `/docs/user/workflow`
   - `/docs/user/task-lifecycle`
   - `/docs/user/agents`

3. Reference
   Links:
   - `/docs/user/commands`
   - `/docs/user/configuration`
   - `/docs/reference/generated-reference`

4. Developer Track
   Links:
   - `/docs/developer/architecture`
   - `/docs/developer/cli-contract`
   - `/docs/developer/release-and-publishing`

5. Support
   Links:
   - `/docs/help/troubleshooting-by-symptom`
   - `/docs/help/glossary`

Source basis:

- `docs/user/website-ia.mdx`

### 7. Release and journal surface

Goal:
Show that the product ships with an editorial record, not only static docs.

Section message:
Blog and release notes provide two different layers:

1. the blog explains why changes matter,
2. release notes provide the formal record of shipped changes.

Required links:

- `/blog`
- `/docs/releases`

Optional supporting framing:
The website should present blog posts as analysis and release notes as source-of-truth archive.

Source basis:

- `docs/user/website-ia.mdx`
- existing website blog scope

### 8. Closing CTA

Goal:
Resolve ambiguity about the next action.

Recommended CTA hierarchy:

1. Start with docs
2. Read the workflow model
3. Explore blog / release notes

Do not end with “contact us” or generic marketing copy.

Source basis:

- `README.md`
- `docs/user/overview.mdx`

## Claim inventory

These are safe homepage claims because they are supported by repository sources.

### Safe claims

1. AgentPlane is a local CLI workflow for agent-driven development in a git repository.
2. It is policy-driven and repository-native.
3. It introduces approvals, planning gates, role boundaries, and verification paths.
4. It keeps task artifacts and metadata inside the repository.
5. It supports `direct` and `branch_pr` workflow modes.
6. It uses a harness engeneering operating model for predictable execution.
7. It is not a hosted service and does not replace git visibility.

### Claims that need caution

1. “Enterprise-ready”
   Use only when tied to concrete safety/audit features.
2. “Autonomous”
   Use carefully; prefer “bounded” or “policy-aware”.
3. “Safe by default”
   Keep tied to specific guardrails, not as an absolute guarantee.

## Writing guidance

### Tone

- Technical, calm, precise
- Confident without hype
- Product-oriented, but still legible to engineers

### Style rules

1. Prefer short declarative sentences.
2. Use repository terms exactly as they exist in the product: `AGENTS.md`, `.agentplane/`, `direct`, `branch_pr`, `start`, `verify`, `finish`.
3. Distinguish facts from interpretation.
4. Every strong claim should have a nearby proof link into docs or release records.

### Vocabulary to prefer

- policy
- workflow
- repository
- traceability
- guardrails
- verification
- deterministic
- harness engeneering
- task artifacts

### Vocabulary to avoid

- magic
- autonomous coding revolution
- AI teammate that does everything
- zero-process automation
- self-driving repository

## Content components to prepare later

These are not required in this file, but the future homepage implementation should likely include them.

1. Hero headline + subhead
2. Proof-chip row
3. Diagram or operating loop for harness engeneering
4. Artifact panel showing repo-local files
5. Mode comparison cards
6. Docs entry rail mapped to IA
7. Blog and release surface
8. Final CTA block

## Open questions for homepage implementation

1. Should the hero lead with “policy-driven framework” or “workflow layer for repositories”?
2. How prominently should role names appear on the home page versus deeper docs pages?
3. Should harness engeneering be a dedicated full-width section or a tighter mid-page system block?
4. Should release notes and blog be merged into one “journal” surface on home, or remain separate entry paths?

## Minimum acceptance criteria for using this document

1. The implemented homepage must preserve the section order or justify deviations.
2. Hero claims must map back to canonical sources above.
3. The docs entry rail must follow `docs/user/website-ia.mdx`.
4. Harness engeneering must appear as a differentiator, not as buried developer jargon.
5. The page must guide users toward docs, workflow model, and release/journal surfaces without duplicating reference docs inline.
