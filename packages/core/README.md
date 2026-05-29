<p align="center">
  <img src="https://raw.githubusercontent.com/basilisk-labs/agentplane/main/docs/assets/readme-headers/core.svg" alt="Agentplane core package header" style="width:100%;max-width:100%;"/>
</p>

# @agentplaneorg/core

[![npm](https://img.shields.io/npm/v/@agentplaneorg/core.svg)](https://www.npmjs.com/package/@agentplaneorg/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/basilisk-labs/agentplane/blob/main/LICENSE)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-3c873a.svg)](https://github.com/basilisk-labs/agentplane/blob/main/docs/user/prerequisites.mdx)

Core utilities and models used by the `agentplane` CLI.

This package powers the CLI's repo-visible contracts: project discovery, configuration loading,
commit-subject validation, task README parsing/rendering, task exports, Agent Change Record (ACR)
schema helpers, and workflow metadata utilities. If you are an end user, install the CLI instead:

```bash
npm install -g agentplane
```

## Install

```bash
npm install @agentplaneorg/core
```

## Requirements

- Node.js 20+
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

The root import is a backward-compatible aggregate export. Prefer narrow subpaths for new code:

```ts
import { validateCommitSubject } from "@agentplaneorg/core/commit";
import { GitContext } from "@agentplaneorg/core/git";
import { runProcess } from "@agentplaneorg/core/process";
import { renderTaskReadme } from "@agentplaneorg/core/tasks";
```

## Exported modules

| Import path                   | Area       | Highlights                                                           |
| ----------------------------- | ---------- | -------------------------------------------------------------------- |
| `@agentplaneorg/core`         | Full API   | Backward-compatible aggregate export                                 |
| `@agentplaneorg/core/commit`  | Commit     | Commit-subject parsing and validation                                |
| `@agentplaneorg/core/config`  | Config     | Config schema, loading, validation, and default handling             |
| `@agentplaneorg/core/fs`      | Filesystem | Atomic write helpers                                                 |
| `@agentplaneorg/core/git`     | Git        | Git context, base branch helpers, and changed-file helpers           |
| `@agentplaneorg/core/process` | Process    | Process execution helpers                                            |
| `@agentplaneorg/core/schemas` | Schemas    | Schema renderers, ACR schema access, and task metadata validators    |
| `@agentplaneorg/core/tasks`   | Tasks      | Task docs, task stores, task exports, and README rendering utilities |

## Stability

| Surface                   | Stability                                    |
| ------------------------- | -------------------------------------------- |
| Published subpath exports | Stable across patch releases                 |
| Root aggregate export     | Backward compatible until a breaking release |
| Internal file layout      | Not public API                               |
| Task/schema contracts     | Versioned through repo-visible specs         |

## Docs

- Repository: https://github.com/basilisk-labs/agentplane
- CLI package: https://www.npmjs.com/package/agentplane
- User docs: https://agentplane.org/docs/user/overview
- ACR schema: https://agentplane.org/schemas/acr-v0.1.schema.json
- Developer docs: https://agentplane.org/docs/developer

## License

MIT
