![Agent Plane Header](docs/assets/header.png)

# Agent Plane (`agentplane`)

[![npm](https://img.shields.io/npm/v/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![Downloads](https://img.shields.io/npm/dm/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-3c873a.svg)](docs/prerequisites.mdx)
[![CLI Contract](https://img.shields.io/badge/CLI-contract-111827.svg)](docs/cli-contract.mdx)
[![Roadmap](https://img.shields.io/badge/Roadmap-ROADMAP.md-6b7280.svg)](ROADMAP.md)

Agent Plane is an offline-first workflow framework and CLI for running task-driven development with agent workflows. It provides task lifecycle management, guardrails, workflow modes, and recipe-driven automation in a single installable tool.

## Why Agent Plane

- **Reliable task lifecycle**: create, track, verify, and close work with explicit metadata.
- **Workflow modes**: direct or branch_pr with PR artifacts and verify gates.
- **Guardrails**: enforce clean commits and consistent task docs.
- **Recipes**: optional automation packs for planning, sync, and operations.

## Install

```bash
npm i -g agentplane@latest
```

## Quickstart

From a git repository:

```bash
agentplane init
agentplane quickstart
```

`agentplane init` creates `.agentplane/` (config, tasks, recipes, caches). `agentplane quickstart` prints the current CLI help output.

## Core CLI workflows

Common commands:

```bash
agentplane task list
agentplane task show <task-id>
agentplane task new --title "..." --description "..." --priority med --owner CODER --tag <tag>
agentplane start <task-id> --author CODER --body "Start: ..."
agentplane verify <task-id>
agentplane finish <task-id> --author INTEGRATOR --body "Verified: ..."
```

Use `agentplane --help` for the full command reference.

## Workflow modes

- **direct**: work in a single checkout; no task branches required.
- **branch_pr**: per-task branches and worktrees with PR artifacts and verify gates.

Switch modes:

```bash
agentplane mode get
agentplane mode set <direct|branch_pr>
```

## Recipes

Recipes are optional automation packs installed and run via CLI:

```bash
agentplane recipe list
agentplane scenario list
agentplane scenario run <recipe:scenario>
```

See `docs/recipes-spec.mdx` for the recipe format and safety rules.

## Configuration

Configuration lives in `.agentplane/config.json` and can be updated via CLI:

```bash
agentplane config show
agentplane config set tasks.verify.required_tags '["code","backend"]'
```

## Project layout (high level)

- `packages/agentplane/`: Node.js CLI entrypoint (TypeScript + ESM)
- `packages/core/`: core libraries (project resolution, config, task models)
- `packages/spec/`: schemas + examples
- `docs/`: user documentation
- `.agentplane/`: project state directory for the Node.js CLI

## Documentation

- Start here: `docs/index.mdx`
- Commands reference: `docs/commands.mdx`
- CLI contract: `docs/cli-contract.mdx`
- Recipes spec: `docs/recipes-spec.mdx`

## Development

```bash
bun install
bun run --filter=agentplane build
node packages/agentplane/bin/agentplane.js --help
```

## License

MIT. See `LICENSE`.
