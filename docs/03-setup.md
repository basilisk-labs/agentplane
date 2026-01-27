# Setup

## Install (v1 target)

End users install and run the CLI as:

```bash
npx agentplane --help
# or
bun add -g agentplane
agentplane --help
```

## Initialize a project

Inside a git repository:

```bash
agentplane init
```

This creates `.agentplane/` (config, agents, tasks, caches). v1 is offline-first; network is used only by explicit commands.

## Developing inside this repo (current)

This repository contains the in-progress Node.js workspace under `packages/`. For local development:

```bash
bun install
bun run --filter=agentplane build
node packages/agentplane/bin/agentplane.js --help
```

## Optional clean slate (repo maintenance)

If you want to scrub repo-specific artifacts in a copy:

```bash
./clean.sh
```

## Backend setup (when implemented)

- Configure the active backend in `.agentplane/config.json` (`tasks_backend.config_path`).
- Redmine credentials are loaded from `.env` without overriding already-set environment variables (see `docs/12-redmine.md`).
