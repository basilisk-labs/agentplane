import { spawn } from "node:child_process";

const REQUIRED_CONTEXT_KEYS = ["agentplaneTaskId", "repo"];

export function buildAgentplaneWorkerArgs(context) {
  validateContext(context);

  return ["hermes", "supervise", context.agentplaneTaskId, "--root", context.repo, "--json"];
}

export function buildAgentplaneWorkerEnv(context, baseEnv = process.env) {
  validateContext(context);

  return {
    ...baseEnv,
    HERMES_KANBAN_TASK: context.hermesTaskId ?? "",
    HERMES_KANBAN_BOARD: context.board ?? "",
    HERMES_KANBAN_RUN_ID: context.runId ?? "",
    HERMES_KANBAN_WORKSPACE: context.workspace ?? context.repo,
  };
}

export function spawnAgentplaneWorker(context, options = {}) {
  const command = options.agentplaneBinary ?? "agentplane";
  const args = buildAgentplaneWorkerArgs(context);
  const env = buildAgentplaneWorkerEnv(context, options.env);

  return spawn(command, args, {
    cwd: context.repo,
    env,
    stdio: options.stdio ?? "inherit",
    detached: options.detached ?? false,
  });
}

function validateContext(context) {
  if (!context || typeof context !== "object") {
    throw new TypeError("Hermes Agentplane worker context must be an object.");
  }

  for (const key of REQUIRED_CONTEXT_KEYS) {
    const value = context[key];
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new TypeError(`Hermes Agentplane worker context requires ${key}.`);
    }
  }
}
