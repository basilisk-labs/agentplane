# AgentPlane

[![npm](https://img.shields.io/npm/v/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![Downloads](https://img.shields.io/npm/dm/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/basilisk-labs/agentplane/blob/main/LICENSE)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-3c873a.svg)](https://agentplane.org/docs/user/prerequisites)

**Use coding agents without losing Git discipline.**

`agentplane` is a local CLI that makes Claude Code, Codex, Cursor, Aider, and similar coding-agent
work auditable inside your Git repository:

```text
task -> plan -> approve -> implement -> verify -> finish
```

No hosted runtime. No hidden control plane. Everything stays in your repo.

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

Prefer not to install globally:

```bash
npx agentplane init
npx agentplane quickstart
```

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

`agentplane init` creates a visible workflow surface:

```text
AGENTS.md or CLAUDE.md   Policy gateway for the repository
.agentplane/            Repo-local workflow workspace
.agentplane/config.json Current workflow configuration
.agentplane/agents/     Installed agent profiles
.agentplane/tasks/      Per-task records and evidence
.agentplane/WORKFLOW.md Materialized workflow contract
```

These artifacts make agent work inspectable. A reviewer can see what policy governed the repo, what
task was active, what plan was accepted, what checks ran, and how the task was closed.

## First task flow

Create a task and record the plan:

```bash
agentplane task new --title "First task" --description "Describe the change" --priority med --owner DOCS --tag docs
agentplane task plan set <task-id> --text "Explain the plan" --updated-by DOCS
```

If your repository requires explicit plan approval, run:

```bash
agentplane task plan approve <task-id> --by ORCHESTRATOR
```

Then start work, record verification, and finish:

```bash
agentplane task start-ready <task-id> --author DOCS --body "Start: ..."
agentplane task verify-show <task-id>
agentplane verify <task-id> --ok --by DOCS --note "Checks passed"
agentplane finish <task-id> --author DOCS --body "Verified: checks passed." --result "One-line outcome" --commit <git-rev>
```

That is the shortest useful path: initialize the repo, create a task, verify the change, and close it
through recorded workflow state instead of an unstructured agent session.

## Without vs with AgentPlane

| Without AgentPlane       | With AgentPlane                 |
| ------------------------ | ------------------------------- |
| Prompt in chat           | Task is recorded                |
| Agent edits files        | Plan is explicit                |
| Human inspects diff      | Approval is visible             |
| Context is scattered     | Verification is stored          |
| Verification is implicit | Finish creates closure evidence |
| Closure is manual        | Everything lives close to Git   |

## Workflow modes

### `direct`

Fast local loops in the current checkout. Good for solo work, prototypes, and short tasks.

### `branch_pr`

Structured per-task branch and PR-style handoff. Good for teams, stricter review, and integration
boundaries.

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

## Recipes

Start from the recipe that matches your current stack:

- [AgentPlane + Claude Code](https://agentplane.org/docs/recipes/claude-code)
- [AgentPlane + Codex](https://agentplane.org/docs/recipes/codex)
- [AgentPlane + Cursor](https://agentplane.org/docs/recipes/cursor)
- [AgentPlane + Aider](https://agentplane.org/docs/recipes/aider)
- [AgentPlane + GitHub Actions](https://agentplane.org/docs/recipes/github-actions)
- [AgentPlane + branch_pr workflow](https://agentplane.org/docs/recipes/branch-pr)

## Documentation

Start here:

- [Overview](https://agentplane.org/docs/user/overview)
- [Setup](https://agentplane.org/docs/user/setup)
- [Workflow](https://agentplane.org/docs/user/workflow)
- [Task lifecycle](https://agentplane.org/docs/user/task-lifecycle)
- [Commands](https://agentplane.org/docs/user/commands)
- [CLI reference](https://agentplane.org/docs/user/cli-reference.generated)

## Support

- [Issues](https://github.com/basilisk-labs/agentplane/issues)
- [Contributing](https://github.com/basilisk-labs/agentplane/blob/main/CONTRIBUTING.md)

## License

MIT
