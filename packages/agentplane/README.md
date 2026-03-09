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

## Why teams use it

Teams use `agentplane` when changing files is not enough and they need the work itself to stay legible.

- **Trust comes from visible process.** Plans, verification, and finish are recorded instead of implied.
- **The workflow stays local.** There is no hosted control plane between your repository and your team.
- **Git remains first-class.** `agentplane` governs agent work inside commits and repository state instead of bypassing them.
- **The same CLI fits different review styles.** Use `direct` for short loops or `branch_pr` for stricter integration.

## What appears in your repository

`agentplane init` creates a visible workflow surface inside the repository.

```text
AGENTS.md or CLAUDE.md   Policy gateway for the repository
.agentplane/            Repo-local workspace and workflow state
.agentplane/config.json Current repo configuration
.agentplane/agents/     Installed agent profiles
.agentplane/tasks/      Per-task records and evidence
.agentplane/WORKFLOW.md Materialized workflow contract
```

You may also see `.agentplane/tasks.json` later if you export a task snapshot, and `.agentplane/workflows/last-known-good.md` as part of the workflow runtime state.

## Install and first run

```bash
npm install -g agentplane
```

Run the CLI inside the git repository you want to govern:

```bash
cd /path/to/your-repository
agentplane init
agentplane quickstart
```

If the directory is not a git repository yet, `agentplane init` initializes git first.

`agentplane init` is interactive by default. It lets you choose the workflow mode, backend, gateway file (`AGENTS.md` or `CLAUDE.md`), execution profile, and optional recipe setup.

On the first run it creates the visible workflow surface:

- `AGENTS.md` or `CLAUDE.md`
- `.agentplane/config.json`
- `.agentplane/tasks/`
- `.agentplane/agents/`
- `.agentplane/WORKFLOW.md`

Prefer not to install globally:

```bash
npx agentplane init
npx agentplane quickstart
```

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
agentplane verify <task-id> --ok --by REVIEWER --note "Looks good"
agentplane finish <task-id> --author DOCS --body "Verified: ..." --result "One-line outcome" --commit <git-rev>
```

That is the shortest believable first-win path: initialize the repo, create a task, verify the change, and close it through the recorded workflow instead of an unstructured agent session.

## Workflow modes

### `direct`

- single checkout
- fast local iteration
- deterministic close commit on `finish` by default
- best fit for solo work or short loops

### `branch_pr`

- per-task branch or worktree flow
- explicit PR artifacts under `.agentplane/tasks/<task-id>/pr/`
- stricter handoff and integration discipline
- better fit for teams that want implementation separated from integration

## When to use it

Use `agentplane` when:

- you want coding agents to work inside a real git repository
- you need explicit task state, approvals, verification, and closure
- you want repo-local workflow artifacts instead of a hidden assistant session

Do not use `agentplane` when:

- you want a hosted agent platform
- you want a generic prompt framework
- you want the tool to hide git or replace your editor

## Requirements

- Node.js 20+

## Documentation

- Overview: https://agentplane.org/docs/user/overview
- Setup: https://agentplane.org/docs/user/setup
- Workflow: https://agentplane.org/docs/user/workflow
- Commands: https://agentplane.org/docs/user/commands
- Backends: https://agentplane.org/docs/user/backends
- CLI reference: https://agentplane.org/docs/user/cli-reference.generated
- Release notes: https://agentplane.org/docs/releases
- Recipes repository: https://github.com/basilisk-labs/agentplane/tree/main/agentplane-recipes

## Support

- Issues: https://github.com/basilisk-labs/agentplane/issues
- Contributing: https://github.com/basilisk-labs/agentplane/blob/main/CONTRIBUTING.md

## License

MIT
