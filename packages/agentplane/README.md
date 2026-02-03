# agentplane

[![npm](https://img.shields.io/npm/v/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![Downloads](https://img.shields.io/npm/dm/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/basilisk-labs/agentplane/blob/main/LICENSE)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-3c873a.svg)](https://github.com/basilisk-labs/agentplane/blob/main/docs/user/prerequisites.mdx)

Agent Plane is a policy-driven framework for running LLM agents inside real repositories. It turns "AI magic" into an engineering process: explicit approvals, role boundaries, and a reproducible execution pipeline. The goal is simple: make agents boring, safe, and auditable.

## Why Agent Plane

- You want agents that behave predictably inside real repos.
- You need human approvals, clear roles, and traceable artifacts.
- You want guardrails by default, not optional add-ons.
- You want an offline-first CLI that keeps state local and inspectable.

## 5-minute start

Install and initialize the CLI:

```bash
npm install -g agentplane
agentplane init
agentplane quickstart
```

Create your first task and run the workflow:

```bash
agentplane task new --title "First task" --description "Describe the change" --priority med --owner ORCHESTRATOR --tag docs
agentplane verify <task-id>
agentplane finish <task-id>
```

Prefer `npx` instead of a global install?

```bash
npx agentplane init
npx agentplane quickstart
```

## What gets installed automatically

- `.agentplane/` is created with config, tasks, agents, and caches.
- `AGENTS.md` is created if missing and defines the policy/guardrails.
- Built-in agent definitions are copied into `.agentplane/agents/`.
- Optional recipes can install additional agents when you run `agentplane recipes install ...`.

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
agentplane config show
agentplane task list
agentplane task new --title "..." --description "..." --priority med --owner ORCHESTRATOR --tag docs
agentplane verify <task-id>
agentplane finish <task-id>
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
