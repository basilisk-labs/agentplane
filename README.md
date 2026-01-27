![Agent Plane Header](assets/header.png)

# Agent Plane (`agentplane`)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-3c873a.svg)](docs/02-prerequisites.md)
[![CLI Contract](https://img.shields.io/badge/CLI-contract-111827.svg)](docs/cli-contract.md)
[![Roadmap](https://img.shields.io/badge/Roadmap-ROADMAP.md-6b7280.svg)](ROADMAP.md)
[![Specs](https://img.shields.io/badge/Specs-packages%2Fspec-0f766e.svg)](packages/spec/README.md)
[![Docs](https://img.shields.io/badge/Docs-Start%20Here-6b7280.svg)](docs/README.md)

Agent Plane is an offline-first workflow framework for using OpenAI Codex in your IDE. The v1 target is a globally installable Node.js CLI named `agentplane` that manages tasks, workflows, guardrails, backends, and optional recipes.

## Status

- Source of truth for scope and ordering: `ROADMAP.md`.
- Node.js workspace (in progress): `packages/agentplane`, `packages/core`, `packages/recipes`, `packages/spec`, `packages/testkit`.
- Legacy Python implementation still exists under `.agent-plane/` and will be retired as the Node.js CLI reaches parity.

## Quick start (target UX)

In a git repository:

```bash
npx agentplane init
agentplane --help
```

The CLI creates `.agentplane/` (config, tasks, caches, recipes).

## Developing in this repo (current)

```bash
npm install
npm -w agentplane run build
node packages/agentplane/dist/cli.js --help
```

## Documentation

- Start here: `docs/README.md`
- Command contract: `docs/cli-contract.md`
- Recipes spec: `docs/recipes-spec.md`
- Format schemas/examples: `packages/spec/`

## Repository layout (high level)

- `packages/agentplane/`: Node.js CLI entrypoint (TypeScript + ESM)
- `packages/core/`: core libraries (project resolution, config, later: tasks/backends/workflow)
- `packages/spec/`: v1 schemas + examples
- `docs/`: Node-first documentation
- `.agent-plane/`: legacy Python toolchain (deprecated)

