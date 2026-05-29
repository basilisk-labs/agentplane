<p align="center">
  <img src="docs/assets/readme-headers/agentplane.svg" alt="AgentPlane latest release header" style="width:100%;max-width:100%;"/>
</p>

# Agentplane

**CLI-first operational workflows and evidence for AI agents.**

Agentplane helps you route local agent work through tasks, plans, verification, context, recipes,
and Git-visible evidence.

```text
install -> init -> quickstart -> task -> verify -> acr
```

Operationalize AI-assisted engineering with reproducible local workflow records.

[![npm](https://img.shields.io/npm/v/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![Downloads](https://img.shields.io/npm/dm/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![GitHub stars](https://img.shields.io/github/stars/basilisk-labs/agentplane?style=flat)](https://github.com/basilisk-labs/agentplane/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js 24+](https://img.shields.io/badge/Node.js-24%2B-3c873a.svg)](docs/user/prerequisites.mdx)

[![SLSA v1 provenance](https://img.shields.io/badge/SLSA-v1-success)](https://registry.npmjs.org/-/npm/v1/attestations/agentplane@latest)
[![Trusted publisher](https://img.shields.io/badge/npm-trusted%20publisher-blue)](https://docs.npmjs.com/generating-provenance-statements)
[![Recipes signed: Ed25519](https://img.shields.io/badge/recipes-Ed25519%20signed-111827)](https://agentplane.org/docs/recipes)
[![Discussions](https://img.shields.io/github/discussions/basilisk-labs/agentplane)](https://github.com/basilisk-labs/agentplane/discussions)

## Install

```bash
npm i -g agentplane
agentplane init
agentplane quickstart
agentplane demo
```

Requirements: Node.js 24+, Git, and a local terminal.

![Agentplane CLI demo](docs/assets/agentplane-demo.gif)

## What is Agentplane?

Agentplane is not another agent framework. It is the operational layer around AI agents: workflows,
orchestration, local context, recipes, verification, task artifacts, and ACR evidence.

Use Agentplane when you want agent work to be debuggable, reproducible, observable, and safe to
operate beyond a single chat session.

## What Agentplane writes

`agentplane init` and task lifecycle commands create inspectable operational artifacts:

```text
AGENTS.md or CLAUDE.md                 Repository policy gateway
.agentplane/WORKFLOW.md                Workflow/config contract
.agentplane/agents/                    Installed agent profiles
.agentplane/tasks/<task-id>/README.md  Task intent, plan, verification, rollback, findings
.agentplane/tasks/<task-id>/acr.json   Agent Change Record
.agentplane/tasks/<task-id>/pr/        branch_pr review artifacts when that mode is active
```

The default quickstart runs locally and writes local project artifacts. It does not require account
creation. If you enable integrations that publish feedback or artifacts, the integration docs
explain the destination and opt-in setting.

## Agent Change Record

An Agent Change Record is a machine-readable record of AI-assisted engineering work. It captures
task intent, workflow state, changed files, verification evidence, and review status.

```bash
agentplane acr generate <task-id> --work-commit HEAD --write
agentplane acr validate <task-id> --mode local
agentplane acr check <task-id> --mode ci
agentplane acr explain <task-id>
```

Schema: [`schemas/acr-v0.1.schema.json`](schemas/acr-v0.1.schema.json).

## Local context

Local context is the operational knowledge an agent needs for a specific repository or workflow:
conventions, constraints, current state, reusable notes, tool instructions, and run history.

```text
context/raw/**              source material
context/wiki/**             maintained markdown wiki
context/facts/**/*.jsonl    sourced facts
context/graph/**/*.jsonl    entities and relationships
.agentplane/context/derived disposable generated projection
```

Initialize it with:

```bash
agentplane context init
agentplane context learn changes
agentplane context learn tasks --tag release --limit 20 --dry-run
agentplane context search "release checklist"
agentplane context check
```

The model matches the LLM Wiki pattern: raw sources stay immutable, the wiki accumulates synthesis,
and schema/policy files tell agents how to maintain it. Agentplane adds task lifecycle, provenance,
proposal-before-promotion, and verification gates so context updates remain reviewable.

Read [Local context](docs/user/local-context.mdx).

## First local workflow

```bash
agentplane task begin "Inspect Agentplane artifacts" --tag docs --verify "agentplane task verify-show <task-id>"
agentplane task verify-show <task-id>
agentplane task complete <task-id> --result "Inspected generated artifacts" --commit <git-rev>
```

## Agentplane is not

- a model provider;
- a prompt playground;
- a low-code chatbot builder;
- a replacement for every agent framework;
- a black-box runtime that hides operational state.

Agentplane is the local operational layer around agent workflows: tasks, plans, context, recipes,
checks, ACRs, and artifacts.

## Recipes

Recipes are reusable workflow overlays. Start with the task -> plan -> verify -> ACR flow first;
add recipes when you want a repeatable TDD, security review, or documentation update loop.

- [TDD recipe](docs/recipes/tdd.mdx)
- [Security review recipe](docs/recipes/security-review.mdx)
- [Docs update recipe](docs/recipes/docs-update.mdx)

## Who uses it

- Solo developers who want future-you to know why an agent changed 19 files.
- OSS maintainers who require agent-generated PRs to include task intent, plan, checks, and ACR.
- Engineering teams that make agent work follow a shared lifecycle before review.
- Platform and security teams that need local, inspectable, policy-aware, CI-gateable AI work.

DCO sign-off and multi-author commits are first-class. Agentplane-managed commits preserve DCO
identity fallbacks so agent and human co-authoring stays compliant.

Using Agentplane in a real repo? Tell us in
[Discussions](https://github.com/basilisk-labs/agentplane/discussions). We will add your story to
[docs/showcase](docs/showcase.mdx).

## Workflow modes

### `direct`

Fast local loops in the current checkout. Use it for solo work, prototypes, and short tasks.

### `branch_pr`

Per-task branches, worktrees, PR artifacts, and integration handoff. Use it for teams and stricter
review boundaries.

## Workflow guides

- [Agentplane + Claude Code](docs/workflow-guides/claude-code.mdx)
- [Agentplane + Codex](docs/workflow-guides/codex.mdx)
- [Agentplane + Cursor](docs/workflow-guides/cursor.mdx)
- [Agentplane + Aider](docs/workflow-guides/aider.mdx)
- [Agentplane + GitHub Actions](docs/workflow-guides/github-actions.mdx)
- [Agentplane + branch_pr workflow](docs/workflow-guides/branch-pr.mdx)

## Documentation

- [Overview](docs/user/overview.mdx)
- [Setup](docs/user/setup.mdx)
- [Workflow](docs/user/workflow.mdx)
- [Task lifecycle](docs/user/task-lifecycle.mdx)
- [Commands](docs/user/commands.mdx)
- [CLI reference](docs/user/cli-reference.generated.mdx)
- [Architecture](docs/developer/architecture.mdx)
- [CLI contract](docs/developer/cli-contract.mdx)

## Status

[![Core CI](https://github.com/basilisk-labs/agentplane/actions/workflows/ci.yml/badge.svg)](https://github.com/basilisk-labs/agentplane/actions/workflows/ci.yml)
[![test:fast](https://img.shields.io/badge/test%3Afast-Core%20CI-2563eb.svg)](https://github.com/basilisk-labs/agentplane/actions/workflows/ci.yml)
[![coverage](https://img.shields.io/badge/coverage-Core%20CI-2563eb.svg)](https://github.com/basilisk-labs/agentplane/actions/workflows/ci.yml)
[![release:parity](https://img.shields.io/badge/release%3Aparity-Core%20CI-2563eb.svg)](https://github.com/basilisk-labs/agentplane/actions/workflows/ci.yml)
[![CLI Contract](https://img.shields.io/badge/CLI-contract-111827.svg)](docs/developer/cli-contract.mdx)

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Help us ship this

If Agentplane saved you a bad merge, [star the repo](https://github.com/basilisk-labs/agentplane)
and drop a note in [Discussions](https://github.com/basilisk-labs/agentplane/discussions). It is
the only growth signal we use.

## Stargazers over time

[![Stargazers over time](https://api.star-history.com/svg?repos=basilisk-labs/agentplane&type=Date)](https://star-history.com/#basilisk-labs/agentplane&Date)

## License

MIT
