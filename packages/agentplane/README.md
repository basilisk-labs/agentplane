# agentplane

[![npm](https://img.shields.io/npm/v/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![Downloads](https://img.shields.io/npm/dm/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/basilisk-labs/agentplane/blob/main/LICENSE)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-3c873a.svg)](https://github.com/basilisk-labs/agentplane/blob/main/docs/user/prerequisites.mdx)

Agent Plane is an offline-first CLI for running policy-driven agent workflows inside real repositories.
It turns "AI magic" into a predictable process with approvals, role boundaries, and audit-friendly artifacts.

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

## Quickstart

Initialize a repository:

```bash
npx agentplane init
```

See the built-in quickstart guide:

```bash
npx agentplane quickstart
```

Switch workflow mode if you need a structured team flow:

```bash
npx agentplane config set workflow_mode branch_pr
```

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

## How it works

Agent Plane expects a repository policy file (`AGENTS.md`) plus a project config (`.agentplane/config.json`).
Together, they define role boundaries, approval gates, and the execution pipeline:

```text
Preflight -> Plan -> Approval -> Tasks -> Verify -> Finish -> Export
```

## Support

- Issues: https://github.com/basilisk-labs/agentplane/issues
- Contributing: https://github.com/basilisk-labs/agentplane/blob/main/CONTRIBUTING.md

## License

MIT
