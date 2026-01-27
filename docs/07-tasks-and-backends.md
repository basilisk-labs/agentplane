# Tasks and Backends (Node.js v1)

## Summary

Tasks are operated through `agentplane`, which routes reads/writes to the active backend. The backend decides the canonical store:

- `local`: `.agentplane/tasks/` is canonical.
- `redmine`: Redmine is canonical; `.agentplane/tasks/` is an offline cache layer.

`tasks.json` is an exported snapshot for browsing and integrations (checksum-bearing).

## Routing model

1. `agentplane` resolves the repo root and loads `.agentplane/config.json`.
2. The config points to an active backend (`tasks_backend.config_path`).
3. Writes go to the canonical backend, then the local cache is refreshed as needed.
4. Sync is explicit: `agentplane backend sync <id>`.

## Task identity

- ID format: `YYYYMMDDHHMM-<RAND>`
- IDs are immutable once created.

## Local task layout

Each task lives in:

```
.agentplane/tasks/<task-id>/README.md
```

The README begins with YAML frontmatter; the v1 contract is represented as a JSON Schema in:

- `packages/spec/schemas/task-readme-frontmatter.schema.json`

## Exported snapshot (`tasks.json`)

The exported view lives at:

```
.agentplane/tasks.json
```

Schema:

- `packages/spec/schemas/tasks-export.schema.json`

Canonicalization rules (checksum stability) are described in:

- `packages/spec/README.md`

## Sync and conflicts (remote backends)

For remote backends (v1 parity: Redmine), sync is explicit and supports conflict strategy:

- `agentplane backend sync redmine --direction push|pull`
- `--conflict diff|prefer-local|prefer-remote|fail`

## Configuration

Config file:

```
.agentplane/config.json
```

Schema:

- `packages/spec/schemas/config.schema.json`

## Commands reference

The authoritative command surface is documented in:

- `docs/cli-contract.md`

## Legacy note

This repository still includes a Python backend implementation under `.agent-plane/` for the legacy toolchain. The target v1 system uses `.agentplane/` and `agentplane`.
