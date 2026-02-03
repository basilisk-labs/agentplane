# @agentplaneorg/core

[![npm](https://img.shields.io/npm/v/@agentplaneorg/core.svg)](https://www.npmjs.com/package/@agentplaneorg/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/basilisk-labs/agentplane/blob/main/LICENSE)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-3c873a.svg)](https://github.com/basilisk-labs/agentplane/blob/main/docs/user/prerequisites.mdx)

Core utilities and models used by the `agentplane` CLI. This package exposes the reusable building blocks
for project discovery, config handling, task readme parsing, and task export/linting.

If you are an end-user, install the CLI instead: https://www.npmjs.com/package/agentplane

## Install

```bash
npm install @agentplaneorg/core
```

## Requirements

- Node.js >= 20
- ESM-only (`type: module`)

## Usage

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

## Exported Modules

| Area              | Highlights                                                     |
| ----------------- | -------------------------------------------------------------- |
| Project discovery | `resolveProject`, `findGitRoot`                                |
| Config            | `loadConfig`, `saveConfig`, `setByDottedKey`, `validateConfig` |
| Task README       | `parseTaskReadme`, `renderTaskReadme`                          |
| Task store        | `createTask`, `listTasks`, `readTask`, `setTaskDocSection`     |
| Exports           | `buildTasksExportSnapshot`, `writeTasksExport`, checksums      |
| Linting           | `lintTasksFile`, `lintTasksSnapshot`                           |
| Git               | `getStagedFiles`, `getUnstagedFiles`, base branch helpers      |
| Commit policy     | `validateCommitSubject`, `extractTaskSuffix`                   |

## Stability

This package is versioned alongside the CLI and is primarily used by `agentplane`. The API is stable for
current use cases, but expect changes as the CLI evolves.

## Docs

- Repository: https://github.com/basilisk-labs/agentplane
- Developer docs: https://github.com/basilisk-labs/agentplane/tree/main/docs

## License

MIT
