import {
  BUILTIN_AGENTPLANE_ASSETS,
  BUILTIN_AGENTPLANE_ASSETS_HASH,
} from "./shared/builtin-assets.generated.js";

const globals = globalThis as Record<string, unknown>;
globals.__AGENTPLANE_BUILTIN_ASSETS__ = {
  assets: BUILTIN_AGENTPLANE_ASSETS,
  hash: BUILTIN_AGENTPLANE_ASSETS_HASH,
};

const [deferredRuntime, core, coreFast, lifecycle, project, task, taskRead] = await Promise.all([
  import("./cli/run-cli/deferred-runtime.js"),
  import("./cli/run-cli/command-catalog/core.js"),
  import("./cli/run-cli/command-catalog/core-fast.js"),
  import("./cli/run-cli/command-catalog/lifecycle.js"),
  import("./cli/run-cli/command-catalog/project.js"),
  import("./cli/run-cli/command-catalog/task.js"),
  import("./cli/run-cli/command-catalog/task-read.js"),
]);
globals.__AGENTPLANE_DEFERRED_RUNTIME__ = deferredRuntime;
globals.__AGENTPLANE_COMMAND_CATALOGS__ = {
  core: core.CORE_COMMANDS,
  "core-fast": coreFast.CORE_FAST_COMMANDS,
  lifecycle: lifecycle.LIFECYCLE_COMMANDS,
  project: project.PROJECT_COMMANDS,
  task: task.TASK_COMMANDS,
  "task-read": taskRead.TASK_READ_COMMANDS,
};

await import("./cli.js");
