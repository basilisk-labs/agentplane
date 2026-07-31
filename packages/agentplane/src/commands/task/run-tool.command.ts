import path from "node:path";

import type { ResolvedProject } from "@agentplaneorg/core/project";

import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter } from "../../cli/output.js";
import {
  RUNNER_PHASE_TOOL_BROKER_DIR_ENV,
  RUNNER_PHASE_TOOL_TOKEN_ENV,
} from "../../runner/phase-tools/contract.js";
import { invokeRunnerPhaseToolThroughBroker } from "../../runner/phase-tools/broker.js";
import type { RunnerPhaseToolResponse } from "../../runner/types.js";

const MAX_PHASE_TOOL_INPUT_BYTES = 1024 * 1024;

export type TaskRunToolParsed = {
  tool: string;
};

export const taskRunToolSpec: CommandSpec<TaskRunToolParsed> = {
  id: ["task", "run", "tool"],
  group: "Task",
  summary: "Invoke one signed run-scoped phase tool from the active agent episode.",
  args: [{ name: "tool", required: true, valueHint: "<tool-name>" }],
  options: [],
  notes: [
    "This internal command is bound to the signed token and run directory injected by the runner supervisor.",
    "It reads exactly one JSON value from stdin. Command visibility is not an authority boundary.",
  ],
  parse: (raw) => ({
    tool: String(raw.args.tool),
  }),
};

async function readStdinJson(): Promise<unknown> {
  if (process.stdin.isTTY) {
    throw new Error("Run-scoped phase tools require one JSON value on stdin.");
  }
  const chunks: Buffer[] = [];
  let bytes = 0;
  for await (const chunk of process.stdin) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk), "utf8");
    bytes += buffer.byteLength;
    if (bytes > MAX_PHASE_TOOL_INPUT_BYTES) {
      throw new Error(`Run-scoped phase-tool input exceeds ${MAX_PHASE_TOOL_INPUT_BYTES} bytes.`);
    }
    chunks.push(buffer);
  }
  const text = Buffer.concat(chunks).toString("utf8").trim();
  if (!text) throw new Error("Run-scoped phase tools require one JSON value on stdin.");
  return JSON.parse(text) as unknown;
}

function localDenial(tool: string, message: string): RunnerPhaseToolResponse {
  return {
    schema_version: 1,
    kind: "runner_phase_tool_response",
    status: "denied",
    code: "invalid_input",
    tool,
    run_id: null,
    work_order_id: null,
    data: { message },
    audit: null,
  };
}

export function makeRunTaskRunToolHandler(
  getResolvedProject: (cmd: string) => Promise<ResolvedProject>,
  deps: {
    env?: NodeJS.ProcessEnv;
    read_input?: () => Promise<unknown>;
  } = {},
) {
  return async (_ctx: CommandCtx, parsed: TaskRunToolParsed): Promise<number> => {
    const output = createCliEmitter();
    const env = deps.env ?? process.env;
    const token = env[RUNNER_PHASE_TOOL_TOKEN_ENV]?.trim() ?? "";
    const brokerDirectory = env[RUNNER_PHASE_TOOL_BROKER_DIR_ENV]?.trim() ?? "";
    let input: unknown;
    try {
      input = await (deps.read_input ?? readStdinJson)();
    } catch (error) {
      const response = localDenial(
        parsed.tool,
        error instanceof Error ? error.message : "Run-scoped phase-tool input is invalid.",
      );
      output.json(response);
      return 2;
    }
    if (!token || !brokerDirectory) {
      const response: RunnerPhaseToolResponse = {
        ...localDenial(
          parsed.tool,
          "The runner supervisor did not provide a signed phase token and broker channel.",
        ),
        code: "invalid_token",
      };
      output.json(response);
      return 2;
    }
    const project = await getResolvedProject("task run tool");
    const expectedPrefix = path.join(project.gitRoot, ".agentplane", "tmp", "runner-phase-tools");
    const relativeBrokerPath = path.relative(expectedPrefix, brokerDirectory);
    if (
      relativeBrokerPath === "" ||
      relativeBrokerPath === ".." ||
      relativeBrokerPath.startsWith(`..${path.sep}`) ||
      path.isAbsolute(relativeBrokerPath)
    ) {
      const response: RunnerPhaseToolResponse = {
        ...localDenial(parsed.tool, "The runner phase-tool broker path is outside this checkout."),
        code: "invalid_token",
      };
      output.json(response);
      return 2;
    }
    const response = await invokeRunnerPhaseToolThroughBroker({
      directory: brokerDirectory,
      token,
      tool: parsed.tool,
      input,
    });
    output.json(response);
    return response.status === "ok" ? 0 : 2;
  };
}
