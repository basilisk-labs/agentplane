# @agentplaneorg/core

[![npm](https://img.shields.io/npm/v/@agentplaneorg/core.svg)](https://www.npmjs.com/package/@agentplaneorg/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/basilisk-labs/agentplane/blob/main/LICENSE)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-3c873a.svg)](https://github.com/basilisk-labs/agentplane/blob/main/docs/user/prerequisites.mdx)

Core utilities and models used by the `agentplane` CLI. This package exposes the reusable building blocks
for project discovery, config handling, task readme parsing, and task export/linting.

If you are an end-user, install the CLI instead: https://www.npmjs.com/package/agentplane

## 5-minute start (CLI)

```bash
npm install -g agentplane
agentplane init
agentplane quickstart
agentplane task new --title "First task" --description "Describe the change" --priority med --owner ORCHESTRATOR --tag docs
agentplane verify <task-id>
agentplane finish <task-id>
```

## For library usage

### Install

```bash
npm install @agentplaneorg/core
```

### Requirements

- Node.js >= 20
- ESM-only (`type: module`)

### Usage

```ts
import {
  resolveProject,
  loadConfig,
  listTasks,
  readTask,
  buildTasksExportSnapshot,
} from "@agentplaneorg/core";

const project = await resolveProject(process.cwd());
const config = await loadConfig(project.root);
const tasks = await listTasks(project.root);
const task = await readTask(project.root, tasks[0]?.id ?? "");
const snapshot = await buildTasksExportSnapshot(project.root);

console.log(config.data.workflow_mode, task?.id, snapshot.meta.version);
```

The root `@agentplaneorg/core` import is a backward-compatible aggregate export. For new code, prefer
the narrowest published subpath when you only need one domain:

```ts
import { GitContext } from "@agentplaneorg/core/git";
import { runProcess } from "@agentplaneorg/core/process";
import { renderTaskReadme } from "@agentplaneorg/core/tasks";
```

## Exported Modules

| Import path                   | Area       | Highlights                                                                        |
| ----------------------------- | ---------- | --------------------------------------------------------------------------------- |
| `@agentplaneorg/core`         | Full API   | Backward-compatible aggregate export                                              |
| `@agentplaneorg/core/fs`      | Filesystem | `atomicWriteFile`                                                                 |
| `@agentplaneorg/core/git`     | Git        | `GitContext`, base branch helpers, changed-file helpers                           |
| `@agentplaneorg/core/logger`  | Logger     | `createLogger`, `resolveLoggerMode`                                               |
| `@agentplaneorg/core/process` | Process    | `runProcess`, `runProcessSync`, `startProcess`                                    |
| `@agentplaneorg/core/schemas` | Schemas    | `AgentplaneConfigSchema`, schema renderers, task metadata validators              |
| `@agentplaneorg/core/tasks`   | Tasks      | `createTask`, `listTasks`, `readTask`, task docs, task export and linting helpers |

## Stability

This package is versioned alongside the CLI and is primarily used by `agentplane`. The API is stable for
current use cases, but expect changes as the CLI evolves.

The root aggregate export is kept for patch/minor compatibility. Existing root re-exports will not be
removed in a patch release. Any future removal or narrowing of the aggregate export requires a breaking
release plan and migration notes that map removed symbols to their replacement subpaths.

## Docs

- Repository: https://github.com/basilisk-labs/agentplane
- Developer docs: https://github.com/basilisk-labs/agentplane/tree/main/docs

## License

MIT
