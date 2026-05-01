![Agent Plane Header](docs/assets/header.png)

# AgentPlane

[![npm](https://img.shields.io/npm/v/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![Downloads](https://img.shields.io/npm/dm/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-3c873a.svg)](docs/user/prerequisites.mdx)
[![CLI Contract](https://img.shields.io/badge/CLI-contract-111827.svg)](docs/developer/cli-contract.mdx)
[![Core CI](https://github.com/basilisk-labs/agentplane/actions/workflows/ci.yml/badge.svg)](https://github.com/basilisk-labs/agentplane/actions/workflows/ci.yml)
[![test:fast](https://img.shields.io/badge/test%3Afast-Core%20CI-2563eb.svg)](https://github.com/basilisk-labs/agentplane/actions/workflows/ci.yml)
[![coverage](https://img.shields.io/badge/coverage-Core%20CI-2563eb.svg)](https://github.com/basilisk-labs/agentplane/actions/workflows/ci.yml)
[![release:parity](https://img.shields.io/badge/release%3Aparity-Core%20CI-2563eb.svg)](https://github.com/basilisk-labs/agentplane/actions/workflows/ci.yml)
[![knip](https://img.shields.io/badge/knip-roadmap-f59e0b.svg)](ROADMAP.md#2026q2-refactor-status)

**Use coding agents without losing Git discipline.**

AgentPlane is a local CLI that makes Claude Code, Codex, Cursor, Aider, and similar coding-agent
work auditable inside your Git repository:

```text
task -> plan -> approve -> implement -> verify -> finish
```

No hosted runtime. No hidden state. Everything stays in your repo.

## Install

```bash
npm i -g agentplane
agentplane init
agentplane quickstart
```

Requirements:

- Node.js 20+
- Git repository
- Local terminal

## Why it exists

Coding agents can change files. Teams still need to know what happened:

- What task was the agent solving?
- What plan was approved?
- What changed in the repository?
- What was verified?
- Why was the task considered finished?

AgentPlane adds a visible workflow layer around agent work without replacing Git, your editor, or
your terminal.

## What appears in your repository

```text
AGENTS.md or CLAUDE.md   Policy gateway for the repository
.agentplane/            Repo-local workflow workspace
.agentplane/config.json Current workflow configuration
.agentplane/tasks/      Per-task records
.agentplane/WORKFLOW.md Materialized workflow contract
verification records    Stored in task docs
finish record           Linked to the Git revision
```

These artifacts make agent work inspectable. A reviewer can see what policy governed the repo, what
task was active, what plan was accepted, what checks ran, and how the task was closed.

## How it works

```bash
agentplane task new --title "First task" --description "Describe the change" --priority med --owner DOCS --tag docs
agentplane task plan set <task-id> --text "Explain the plan" --updated-by DOCS
agentplane task plan approve <task-id> --by ORCHESTRATOR
agentplane task start-ready <task-id> --author DOCS --body "Start: ..."
# run Claude Code, Codex, Cursor, Aider, or edit manually
agentplane task verify-show <task-id>
agentplane verify <task-id> --ok --by DOCS --note "Checks passed"
agentplane finish <task-id> --author DOCS --body "Verified: checks passed." --result "One-line outcome" --commit <git-rev>
```

If your repository does not require explicit plan approval, skip `task plan approve`.

## Without vs with AgentPlane

| Without AgentPlane       | With AgentPlane                 |
| ------------------------ | ------------------------------- |
| Prompt in chat           | Task is recorded                |
| Agent edits files        | Plan is explicit                |
| Human inspects diff      | Approval is visible             |
| Context is scattered     | Verification is stored          |
| Verification is implicit | Finish creates closure evidence |
| Closure is manual        | Everything lives close to Git   |

## Who it is for

- Developers using Claude Code, Codex, Cursor, Aider, or local coding agents.
- Maintainers who want agent changes to remain reviewable.
- Teams that need task state, verification, and closure before merging agent-generated work.
- Local-first builders who do not want a hosted agent runtime between their repo and their workflow.

## What it is not

- Not a hosted agent platform.
- Not a prompt framework.
- Not a replacement for Git.
- Not a replacement for your editor.
- Not a replacement for Claude Code, Codex, Cursor, or Aider.

## Workflow modes

### `direct`

Fast local loops in the current checkout. Good for solo work, prototypes, and short tasks.

### `branch_pr`

Structured per-task branch and PR-style handoff. Good for teams, stricter review, and integration
boundaries.

## Recipes

Start from the recipe that matches your current stack:

- [AgentPlane + Claude Code](docs/recipes/claude-code.mdx)
- [AgentPlane + Codex](docs/recipes/codex.mdx)
- [AgentPlane + Cursor](docs/recipes/cursor.mdx)
- [AgentPlane + Aider](docs/recipes/aider.mdx)
- [AgentPlane + GitHub Actions](docs/recipes/github-actions.mdx)
- [AgentPlane + branch_pr workflow](docs/recipes/branch-pr.mdx)

Each recipe includes when to use it, commands, expected repo artifacts, limitations, and a
copy-paste flow.

## Documentation

Start here:

- [Overview](docs/user/overview.mdx)
- [Setup](docs/user/setup.mdx)
- [Workflow](docs/user/workflow.mdx)
- [Task lifecycle](docs/user/task-lifecycle.mdx)
- [Commands](docs/user/commands.mdx)
- [CLI reference (generated)](docs/user/cli-reference.generated.mdx)

Developer surfaces:

- [Architecture](docs/developer/architecture.mdx)
- [CLI contract](docs/developer/cli-contract.mdx)
- [Harness engineering](docs/developer/harness-engineering.mdx)
- [Release and publishing](docs/developer/release-and-publishing.mdx)

Deep architecture terms such as framework control plane, harness contract, protocol surfaces, and
behavior precedence belong in the developer docs, not in the first-start path.

## Technical proof

- MIT licensed.
- TypeScript codebase.
- Local-first CLI.
- Active release history.
- No hosted control plane.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
