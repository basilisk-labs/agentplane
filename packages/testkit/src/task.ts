import { defaultConfig } from "@agentplaneorg/core/config";
import type { ResolvedProject } from "@agentplaneorg/core/project";
import { GitContext } from "@agentplaneorg/core/git";

import type { CommandContext, taskBackend } from "./agentplane-internal.js";

type TaskBackend = taskBackend.TaskBackend;
type TaskData = taskBackend.TaskData;

export function makeTaskFixture(overrides: Partial<TaskData> = {}): TaskData {
  return {
    id: "T-1",
    title: "Title",
    description: "Desc",
    status: "TODO",
    priority: "normal",
    owner: "CODER",
    depends_on: [],
    tags: [],
    verify: [],
    comments: [],
    events: [],
    doc_version: 3,
    doc_updated_by: "CODER",
    ...overrides,
  };
}

export function makeTaskBackendDouble(overrides: Partial<TaskBackend> = {}): TaskBackend {
  return {
    id: "mock",
    capabilities: {
      canonical_source: "local",
      projection: "canonical",
      projection_read_mode: "fallback",
      reads_from_projection_by_default: false,
      writes_task_readmes: true,
      supports_task_revisions: true,
      supports_revision_guarded_writes: true,
      may_access_network_on_read: false,
      may_access_network_on_write: false,
      supports_projection_refresh: false,
      supports_push_sync: false,
      supports_snapshot_export: false,
    },
    listTasks: () => Promise.resolve([]),
    getTask: () => Promise.resolve(null),
    writeTask: () => Promise.resolve(),
    getTaskDoc: () => Promise.resolve(""),
    setTaskDoc: () => Promise.resolve(),
    ...overrides,
  };
}

export function makeTaskCommandContext(
  opts: {
    taskBackend?: TaskBackend;
    overrides?: Partial<CommandContext>;
    configureConfig?: (config: ReturnType<typeof defaultConfig>) => void;
    git?: CommandContext["git"];
    resolvedProject?: ResolvedProject;
  } = {},
): CommandContext {
  const config = defaultConfig();
  config.paths.workflow_dir = ".agentplane/tasks";
  opts.configureConfig?.(config);

  const resolved =
    opts.resolvedProject ??
    ({
      gitRoot: "/repo",
      agentplaneDir: "/repo/.agentplane",
    } as unknown as ResolvedProject);
  const backend = opts.taskBackend ?? makeTaskBackendDouble();

  const ctx: CommandContext = {
    resolvedProject: resolved,
    config,
    taskBackend: backend,
    backendId: backend.id,
    backendConfigPath: "/repo/.agentplane/backends/local/backend.json",
    git: opts.git ?? new GitContext({ gitRoot: resolved.gitRoot }),
    memo: {},
  };

  return { ...ctx, ...opts.overrides };
}
