# Commands Reference (Node.js v1)

`docs/cli-contract.md` is the canonical, stable contract for the v1 CLI surface.

This page provides a quick “what do I type” view.

## Help / version

```bash
agentplane --help
agentplane --version
```

## Init

```bash
agentplane init
```

## Config

```bash
agentplane config show
agentplane config set workflow_mode branch_pr
agentplane config set tasks.verify.required_tags '["code","backend"]'
```

## Tasks

```bash
agentplane task list
agentplane task show <task-id>
agentplane task new --title "..." --description "..." --priority med --owner CODER --tag nodejs
agentplane task doc show <task-id>
agentplane task doc set <task-id> --section Summary --text "..."
agentplane task export
agentplane task lint
```

## Workflow

```bash
agentplane start <task-id>
agentplane block <task-id>
agentplane verify <task-id>
agentplane finish <task-id> --commit <git-rev>
```

## Branching / PR artifacts (branch_pr)

```bash
agentplane work start <task-id> --agent CODER --slug <slug> --worktree
agentplane pr open <task-id>
agentplane pr update <task-id>
agentplane pr check <task-id>
agentplane integrate <task-id> --branch task/<task-id>/<slug> --run-verify
```

## Recipes

```bash
agentplane recipe list
agentplane recipe info <id>
agentplane recipe install <url|id|path>
agentplane recipe remove <id>
agentplane recipe list-remote --refresh
```

## Developing the CLI in this repo

```bash
npm install
npm -w agentplane run build
node packages/agentplane/dist/cli.js --help
```

## Legacy note
The repository contains legacy Python commands under `.agent-plane/`. This page intentionally documents the Node.js `agentplane` target per `ROADMAP.md`.

