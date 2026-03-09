# agentplane

[![npm](https://img.shields.io/npm/v/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![Downloads](https://img.shields.io/npm/dm/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/basilisk-labs/agentplane/blob/main/LICENSE)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-3c873a.svg)](https://github.com/basilisk-labs/agentplane/blob/main/docs/user/prerequisites.mdx)

**Git-native control plane for auditable agent work.**

Put coding agents on a governed Git workflow.

`agentplane` is the CLI for AgentPlane. It runs locally inside a git repository, not in a hosted runtime, and adds visible workflow artifacts such as `AGENTS.md` or `CLAUDE.md`, `.agentplane/`, task records, verification state, and deterministic closure. Teams use it when they want agent work to stay explicit, inspectable, and governed inside the repository instead of behaving like an opaque assistant.

## What agentplane is

`agentplane` is a repo-native CLI workflow for agent-driven development.

- It runs in your repository and keeps workflow state local.
- It adds approvals, task state, verification, and finish to agent work.
- It supports both `direct` and `branch_pr` workflow modes.
- It keeps repository artifacts visible instead of hiding execution behind a hosted control plane.

## 5-minute start

Install and initialize the CLI:

```bash
npm install -g agentplane
agentplane init
agentplane quickstart
```

`agentplane init` is human-oriented: interactive onboarding includes workflow/backend selection,
policy gateway selection (`--policy-gateway codex|claude` -> `AGENTS.md` or `CLAUDE.md`),
execution profile selection (`conservative|balanced|aggressive`), approval toggles, and optional recipes.

Create your first task and run the workflow:

```bash
agentplane task new --title "First task" --description "Describe the change" --priority med --owner ORCHESTRATOR --tag docs
agentplane verify <task-id> --ok --by ORCHESTRATOR --note "Verified"
agentplane finish <task-id> --author ORCHESTRATOR --body "Verified: done" --result "First task completed"
```

Prefer `npx` instead of a global install?

```bash
npx agentplane init
npx agentplane quickstart
```

## What gets installed automatically

- `.agentplane/` is created with config, tasks, agents, and caches.
- The selected policy gateway file is created if missing and defines the policy/guardrails:
  `AGENTS.md` (Codex) or `CLAUDE.md` (Claude Code).
- Built-in agent definitions are copied into `.agentplane/agents/`.
- Optional recipes can install additional agents when you run `agentplane recipes install ...`.
- `.agentplane/config.json` stores execution defaults under `execution` (profile, reasoning effort, tool budget, safety gates).

## Upgrade review reports

After `agentplane upgrade` (auto or agent-assisted mode), a machine-readable review report is written under `.agentplane/.upgrade/`:

- Agent mode: `.agentplane/.upgrade/agent/<runId>/review.json`
- Auto mode: `.agentplane/.upgrade/last-review.json`

If any entry has `needsSemanticReview: true`, treat it as a signal to create an `UPGRADER` task to perform a semantic prompt merge.

## Guardrails and artifacts

- Approval gates for plans and network access (configured in `.agentplane/config.json`).
- Role boundaries (ORCHESTRATOR, PLANNER, CODER, INTEGRATOR, etc.).
- Agent definitions in `.agentplane/agents/`.
- Task records in `.agentplane/tasks/` with a snapshot export in `.agentplane/tasks.json`.
- A visible, reproducible pipeline:

```text
Preflight -> Plan -> Approval -> Tasks -> Verify -> Finish -> Export
```

## Features

- Policy-first execution with explicit approvals and guardrails.
- Role-based workflows for teams: ORCHESTRATOR, PLANNER, CREATOR, INTEGRATOR, etc.
- Two workflow modes: `direct` (single checkout) and `branch_pr` (worktrees + integration).
- Task tracking, verification, and exports baked in.
- Recipes for repeatable setup and automation.

## Install

```bash
npm install -g agentplane
```

Or run without installing:

```bash
npx agentplane --help
```

## Requirements

- Node.js >= 20

## Common Commands

```bash
agentplane --help
agentplane quickstart
agentplane role ORCHESTRATOR
agentplane role UPGRADER
agentplane config show
agentplane task list
agentplane task new --title "..." --description "..." --priority med --owner ORCHESTRATOR --tag docs
agentplane verify <task-id> --ok --by ORCHESTRATOR --note "Verified"
agentplane finish <task-id> --author ORCHESTRATOR --body "Verified: done" --result "Task completed"
agentplane recipes list
```

## Docs and Guides

- Documentation index: https://github.com/basilisk-labs/agentplane/tree/main/docs
- Workflow overview: https://github.com/basilisk-labs/agentplane/blob/main/docs/user/workflow.mdx
- CLI commands: https://github.com/basilisk-labs/agentplane/blob/main/docs/user/commands.mdx
- Project layout: https://github.com/basilisk-labs/agentplane/blob/main/docs/developer/project-layout.mdx
- Recipes: https://github.com/basilisk-labs/agentplane/tree/main/agentplane-recipes

## Support

- Issues: https://github.com/basilisk-labs/agentplane/issues
- Contributing: https://github.com/basilisk-labs/agentplane/blob/main/CONTRIBUTING.md

## License

MIT
