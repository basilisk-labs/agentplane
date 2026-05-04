# AgentPlane CLI

**The open-source audit layer for coding agents.**

`agentplane` is a local CLI that turns Claude Code, Codex, Cursor, Aider, and similar coding-agent
work into reviewable, reversible Git artifacts.

[![npm](https://img.shields.io/npm/v/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![Downloads](https://img.shields.io/npm/dm/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![GitHub stars](https://img.shields.io/github/stars/basilisk-labs/agentplane?style=flat)](https://github.com/basilisk-labs/agentplane/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/basilisk-labs/agentplane/blob/main/LICENSE)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-3c873a.svg)](https://agentplane.org/docs/user/prerequisites)

[![SLSA v1 provenance](https://img.shields.io/badge/SLSA-v1-success)](https://registry.npmjs.org/-/npm/v1/attestations/agentplane@latest)
[![Trusted publisher](https://img.shields.io/badge/npm-trusted%20publisher-blue)](https://docs.npmjs.com/generating-provenance-statements)
[![Recipes signed: Ed25519](https://img.shields.io/badge/recipes-Ed25519%20signed-111827)](https://agentplane.org/docs/recipes)

## Install in 30 seconds

```bash
npm i -g agentplane
agentplane init
agentplane quickstart
```

Prefer no global install:

```bash
npx agentplane init
npx agentplane quickstart
```

Requirements: Node.js 20+, Git, and a local terminal.

Experimental agent shorthand:

```bash
ap next
ap show <task-id>
ap vshow <task-id>
```

`ap` is an agent-optimized entrypoint for compact, non-interactive command use. Keep public docs and
human-facing setup on `agentplane`; use `ap` only when the installed package exposes it.

## What you get after `agentplane init`

```text
AGENTS.md or CLAUDE.md   Policy gateway for the repository
.agentplane/            Repo-local workflow workspace
.agentplane/WORKFLOW.md Current workflow/config contract
.agentplane/agents/     Installed agent profiles
.agentplane/tasks/      Per-task records and evidence
.agentplane/workflows/  Last-known-good workflow snapshot
```

AgentPlane does not run a hosted control plane. It records the task trail inside the repository you
already review.

## One task loop

```bash
agentplane task new --title "Fix parser edge case" --description "Reject empty labels." --owner <agent-id> --tag code
agentplane task plan set <task-id> --text "Add a fixture, tighten validation, and run focused tests." --updated-by <agent-id>
agentplane task plan approve <task-id> --by <reviewer-id>
agentplane task start-ready <task-id> --author <agent-id> --body "Start: implementing parser validation with focused tests."
# Run Claude Code, Codex, Cursor, Aider, or edit manually.
agentplane task verify-show <task-id>
agentplane verify <task-id> --ok --by <agent-id> --note "Focused tests passed."
agentplane finish <task-id> --author <agent-id> --result "Parser rejects empty labels." --commit <git-rev>
```

The visible output is the point: a reviewer can inspect task intent, plan, verification, and closure
from Git-visible files.

Agent IDs are configurable profiles. See
[Agents](https://agentplane.org/docs/user/agents).

## Agent Change Record

Every task can produce an **Agent Change Record (ACR)**, a deterministic JSON evidence projection
of intent, accepted plan, verification result, policy decisions, and closure commit.

```bash
agentplane acr generate <task-id> --work-commit HEAD --write
agentplane acr validate .agentplane/tasks/<task-id>/acr.json
agentplane acr check <task-id> --require-plan-approved --require-verification
agentplane acr --help
```

Schema: https://agentplane.org/schemas/acr-v0.1.schema.json

## Workflow modes

- `direct` keeps work in the current checkout for fast local loops.
- `branch_pr` creates per-task branches, worktrees, PR artifacts, and integration handoff.

## Compatible with

Claude Code, Codex CLI, Cursor agent, Aider, GitHub Actions agent runners, and MCP-driven
workflows. AgentPlane does not replace them; it records what they did and whether your gates passed.

## Recipes

Recipes are signed, versioned behavior modules for AgentPlane:

```bash
agentplane recipes list-remote
agentplane recipes install code-map --refresh --yes
```

Start with [Code Map](https://agentplane.org/docs/recipes/code-map).

## Docs

- [Overview](https://agentplane.org/docs/user/overview)
- [Setup](https://agentplane.org/docs/user/setup)
- [Task lifecycle](https://agentplane.org/docs/user/task-lifecycle)
- [Workflow guides](https://agentplane.org/docs/workflow-guides)
- [Recipes](https://agentplane.org/docs/recipes)
- [Comparison](https://agentplane.org/docs/compare)

## Repository

https://github.com/basilisk-labs/agentplane

## License

MIT
