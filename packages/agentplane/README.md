# AgentPlane CLI

**The open-source audit layer for coding agents.**

`agentplane` is a local CLI that turns Claude Code, Codex, Cursor, Aider, and similar coding-agent
work into reviewable, reversible Git artifacts.

[![npm](https://img.shields.io/npm/v/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![Downloads](https://img.shields.io/npm/dm/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![GitHub stars](https://img.shields.io/github/stars/basilisk-labs/agentplane?style=flat)](https://github.com/basilisk-labs/agentplane/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/basilisk-labs/agentplane/blob/main/LICENSE)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-3c873a.svg)](https://agentplane.org/docs/user/prerequisites)

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

## What you get after `agentplane init`

```text
AGENTS.md or CLAUDE.md   Repository policy gateway
.agentplane/
  config.json            Workflow configuration
  WORKFLOW.md            Materialized workflow contract
  agents/                Agent profiles
  tasks/                 Task plans, verification, PR artifacts, and finish state
```

AgentPlane does not run a hosted control plane. It records the task trail inside the repository you
already review.

## One task loop

```bash
agentplane task new --title "Fix parser edge case" --description "Reject empty labels" --owner CODER --tag code
agentplane task plan set <task-id> --text "Add a fixture, tighten validation, and run focused tests." --updated-by CODER
agentplane task start-ready <task-id> --author CODER --body "Start: implement parser validation with focused tests."
# Run Claude Code, Codex, Cursor, Aider, or edit manually.
agentplane task verify-show <task-id>
agentplane verify <task-id> --ok --by CODER --note "Focused tests passed."
agentplane finish <task-id> --author CODER --body "Verified: focused tests passed." --result "Parser rejects empty labels." --commit <git-rev>
```

The visible output is the point: a reviewer can inspect task intent, plan, verification, and closure
from Git-visible files.

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
