import { realpath } from "node:fs/promises";
import path from "node:path";

import {
  AGENT_SEMANTIC_RESULT_KIND,
  AGENT_SEMANTIC_RESULT_SCHEMA_VERSION,
  KNOWLEDGE_REQUEST_DESIRED_KIND_VALUES,
  KNOWLEDGE_REQUEST_KIND,
  KNOWLEDGE_REQUEST_SCHEMA_VERSION,
  validateAgentSemanticResultForWorkOrder,
  type AgentSemanticResult,
  type AgentSemanticResultKnowledgeRequest,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import { z } from "zod";

import { prepareKnowledgeExcerpt } from "../../context/knowledge-ref.js";
import { isRecord } from "../../shared/guards.js";
import { readRunnerRunState } from "../artifacts.js";
import { readRunnerResultManifest } from "../result-manifest.js";
import { RUNNER_BUNDLE_FILENAME, RUNNER_STATE_FILENAME } from "../task-run-paths.js";
import {
  readStableRegularTextNoFollow,
  writeNewStableRegularFileNoFollow,
} from "../stable-file.js";
import type {
  RunnerContextBundle,
  RunnerPhaseToolManifest,
  RunnerPhaseToolResponse,
  RunnerPhaseToolResponseCode,
} from "../types.js";
import { serveRunnerPhaseToolKnowledgeRequest } from "./knowledge.js";
import {
  runnerPhaseToolManifestDigest,
  revokeRunnerPhaseToolGrant,
  validateRunnerPhaseToolToken,
  type RunnerPhaseToolGrantRecord,
} from "./token.js";
import { persistRunnerPhaseToolAudit } from "./audit.js";

const REPORT_BLOCKER_SCHEMA = z
  .object({
    summary: z.string().trim().min(1),
    recommended_action: z.string().trim().min(1).optional(),
    findings: z.array(z.string()).optional(),
    uncertainty: z.array(z.string()).optional(),
  })
  .strict();

const KNOWLEDGE_REQUEST_INPUT_SCHEMA = z
  .object({
    query: z.string().trim().min(1),
    reason: z.string().trim().min(1),
    desired_kind: z.enum(KNOWLEDGE_REQUEST_DESIRED_KIND_VALUES),
    blocking: z.boolean(),
  })
  .strict();

const KNOWLEDGE_SEARCH_INPUT_SCHEMA = z
  .object({
    query: z.string().trim().min(1),
    desired_kind: z.enum(KNOWLEDGE_REQUEST_DESIRED_KIND_VALUES).optional(),
  })
  .strict();

const KNOWLEDGE_SHOW_INPUT_SCHEMA = z
  .object({
    ref: z.string().trim().min(1),
    digest: z.string().regex(/^sha256:[0-9a-f]{64}$/u),
  })
  .strict();

type LoadedPhaseToolRun = {
  bundle: RunnerContextBundle;
  manifest: RunnerPhaseToolManifest;
  work_order: AgentWorkOrderV2;
  record: RunnerPhaseToolGrantRecord;
};

function denied(opts: {
  code: RunnerPhaseToolResponseCode;
  tool: string;
  message: string;
  run_id?: string | null;
  work_order_id?: string | null;
}): RunnerPhaseToolResponse {
  return {
    schema_version: 1,
    kind: "runner_phase_tool_response",
    status: "denied",
    code: opts.code,
    tool: opts.tool,
    run_id: opts.run_id ?? null,
    work_order_id: opts.work_order_id ?? null,
    data: { message: opts.message },
    audit: null,
  };
}

function accepted(opts: {
  tool: string;
  run_id: string;
  work_order_id: string;
  data: unknown;
}): RunnerPhaseToolResponse {
  return {
    schema_version: 1,
    kind: "runner_phase_tool_response",
    status: "ok",
    code: "accepted",
    tool: opts.tool,
    run_id: opts.run_id,
    work_order_id: opts.work_order_id,
    data: opts.data,
    audit: null,
  };
}

function isPhaseToolResponse(
  value: LoadedPhaseToolRun | RunnerPhaseToolResponse,
): value is RunnerPhaseToolResponse {
  return "status" in value && value.kind === "runner_phase_tool_response";
}

async function loadBundle(runDir: string): Promise<RunnerContextBundle> {
  const bundle = JSON.parse(
    await readStableRegularTextNoFollow(
      path.join(runDir, RUNNER_BUNDLE_FILENAME),
      "runner phase-tool bundle",
    ),
  ) as unknown;
  if (!isRecord(bundle) || !isRecord(bundle.execution)) {
    throw new Error("Runner phase-tool bundle is invalid.");
  }
  return bundle as unknown as RunnerContextBundle;
}

async function validateRunBinding(opts: {
  repository_root: string;
  run_dir: string;
  tool: string;
  token: string;
  now?: Date;
}): Promise<LoadedPhaseToolRun | RunnerPhaseToolResponse> {
  const tokenValidation = await validateRunnerPhaseToolToken({
    run_dir: opts.run_dir,
    token: opts.token,
    tool: opts.tool,
    now: opts.now,
  });
  if (tokenValidation.status === "denied") {
    return denied({
      code: tokenValidation.code,
      tool: opts.tool,
      message: tokenValidation.message,
      run_id: tokenValidation.record?.claims.run_id,
      work_order_id: tokenValidation.record?.claims.work_order_id,
    });
  }
  let bundle: RunnerContextBundle;
  try {
    bundle = await loadBundle(opts.run_dir);
  } catch {
    return denied({
      code: "storage_error",
      tool: opts.tool,
      message: "The prepared runner bundle is missing or invalid.",
      run_id: tokenValidation.claims.run_id,
      work_order_id: tokenValidation.claims.work_order_id,
    });
  }
  const manifest = bundle.execution.phase_tools;
  const workOrder = bundle.work_order;
  if (
    !manifest ||
    !workOrder ||
    tokenValidation.record.manifest_digest !== runnerPhaseToolManifestDigest(manifest)
  ) {
    return denied({
      code: "invalid_token",
      tool: opts.tool,
      message: "The signed phase-tool grant does not match the prepared runner manifest.",
      run_id: tokenValidation.claims.run_id,
      work_order_id: tokenValidation.claims.work_order_id,
    });
  }
  const claims = tokenValidation.claims;
  if (
    claims.run_id !== bundle.execution.run_id ||
    claims.run_id !== manifest.run_id ||
    path.resolve(bundle.execution.artifact_paths.run_dir) !== path.resolve(opts.run_dir)
  ) {
    return denied({
      code: "invalid_token",
      tool: opts.tool,
      message: "The run-scoped phase token does not match the prepared run.",
      run_id: claims.run_id,
      work_order_id: claims.work_order_id,
    });
  }
  if (
    claims.work_order_id !== workOrder.work_order_id ||
    claims.work_order_id !== manifest.work_order_id
  ) {
    return denied({
      code: "work_order_mismatch",
      tool: opts.tool,
      message: "The run-scoped phase token does not match the prepared work order.",
      run_id: claims.run_id,
      work_order_id: claims.work_order_id,
    });
  }
  if (claims.state_fingerprint_digest !== workOrder.state_fingerprint.digest) {
    return denied({
      code: "state_fingerprint_mismatch",
      tool: opts.tool,
      message: "The run-scoped phase token does not match the prepared state fingerprint.",
      run_id: claims.run_id,
      work_order_id: claims.work_order_id,
    });
  }
  if (claims.role !== workOrder.role || claims.role !== manifest.role) {
    return denied({
      code: "role_forbidden",
      tool: opts.tool,
      message: "The run-scoped phase token role does not match the prepared work order.",
      run_id: claims.run_id,
      work_order_id: claims.work_order_id,
    });
  }
  if (
    claims.phase !== manifest.phase ||
    claims.phase !== (bundle.route_decision?.oracle.phase ?? "semantic_episode")
  ) {
    return denied({
      code: "invalid_token",
      tool: opts.tool,
      message: "The run-scoped phase token does not match the active route phase.",
      run_id: claims.run_id,
      work_order_id: claims.work_order_id,
    });
  }
  const declaredTool = manifest.tools.find((candidate) => candidate.name === opts.tool);
  if (
    !declaredTool?.allowed ||
    declaredTool.transport !== "run_scoped_command" ||
    declaredTool.invocation === null
  ) {
    return denied({
      code: "tool_not_allowed",
      tool: opts.tool,
      message: "The prepared adapter/work-order capability map does not allow this phase tool.",
      run_id: claims.run_id,
      work_order_id: claims.work_order_id,
    });
  }
  let currentRoot: string;
  let preparedRoot: string;
  try {
    [currentRoot, preparedRoot] = await Promise.all([
      realpath(opts.repository_root),
      realpath(bundle.repository.git_root),
    ]);
  } catch {
    return denied({
      code: "storage_error",
      tool: opts.tool,
      message: "The repository binding for the run-scoped phase tool is unavailable.",
      run_id: claims.run_id,
      work_order_id: claims.work_order_id,
    });
  }
  if (currentRoot !== preparedRoot) {
    return denied({
      code: "invalid_token",
      tool: opts.tool,
      message: "The run-scoped phase token cannot be used from another repository checkout.",
      run_id: claims.run_id,
      work_order_id: claims.work_order_id,
    });
  }
  const state = await readRunnerRunState(path.join(opts.run_dir, RUNNER_STATE_FILENAME));
  const stateStatus = state?.status;
  if (
    state?.run_id !== claims.run_id ||
    (stateStatus !== "prepared" && stateStatus !== "running")
  ) {
    return denied({
      code: "run_not_active",
      tool: opts.tool,
      message: "Run-scoped phase tools are available only while the bound run is active.",
      run_id: claims.run_id,
      work_order_id: claims.work_order_id,
    });
  }
  try {
    if (await readRunnerResultManifest(bundle.execution.artifact_paths.result_path)) {
      return denied({
        code: "terminal_result_exists",
        tool: opts.tool,
        message: "Run-scoped phase tools are closed after a terminal semantic result exists.",
        run_id: claims.run_id,
        work_order_id: claims.work_order_id,
      });
    }
  } catch {
    return denied({
      code: "storage_error",
      tool: opts.tool,
      message: "The terminal semantic result state is unreadable.",
      run_id: claims.run_id,
      work_order_id: claims.work_order_id,
    });
  }
  return {
    bundle,
    manifest,
    work_order: workOrder,
    record: tokenValidation.record,
  };
}

async function executeTool(opts: {
  loaded: LoadedPhaseToolRun;
  repository_root: string;
  run_dir: string;
  tool: string;
  input: unknown;
  now?: Date;
}): Promise<RunnerPhaseToolResponse> {
  const binding = {
    tool: opts.tool,
    run_id: opts.loaded.manifest.run_id,
    work_order_id: opts.loaded.work_order.work_order_id,
  };
  if (opts.tool === "report_result") {
    let semantic: AgentSemanticResult;
    try {
      semantic = validateAgentSemanticResultForWorkOrder({
        work_order: opts.loaded.work_order,
        semantic_result: opts.input,
      });
    } catch (error) {
      return denied({
        ...binding,
        code: "invalid_input",
        message: error instanceof Error ? error.message : "Invalid semantic result.",
      });
    }
    if (semantic.status !== "completed" && semantic.status !== "failed") {
      return denied({
        ...binding,
        code: "invalid_input",
        message: "report_result accepts only completed or failed semantic results.",
      });
    }
    if (await readRunnerResultManifest(opts.loaded.bundle.execution.artifact_paths.result_path)) {
      return denied({
        ...binding,
        code: "terminal_result_exists",
        message: "A terminal semantic result already exists for this run.",
      });
    }
    await writeNewStableRegularFileNoFollow(
      opts.loaded.bundle.execution.artifact_paths.result_path,
      `${JSON.stringify(semantic, null, 2)}\n`,
      "runner phase-tool semantic result",
    );
    await revokeRunnerPhaseToolGrant({
      run_dir: opts.run_dir,
      record: opts.loaded.record,
      at: opts.now,
      reason: "terminal_report",
    });
    return accepted({
      ...binding,
      data: {
        result_path: opts.loaded.bundle.execution.artifact_paths.result_path,
        status: semantic.status,
        token_revoked: true,
      },
    });
  }
  if (opts.tool === "report_blocker") {
    const parsed = REPORT_BLOCKER_SCHEMA.safeParse(opts.input);
    if (!parsed.success) {
      return denied({
        ...binding,
        code: "invalid_input",
        message: parsed.error.issues.map((issue) => issue.message).join("; "),
      });
    }
    const semantic: AgentSemanticResult = {
      schema_version: AGENT_SEMANTIC_RESULT_SCHEMA_VERSION,
      kind: AGENT_SEMANTIC_RESULT_KIND,
      work_order_id: opts.loaded.work_order.work_order_id,
      status: "blocked",
      summary: parsed.data.summary,
      findings: parsed.data.findings ?? [],
      uncertainty: parsed.data.uncertainty ?? [],
      blocker: {
        summary: parsed.data.summary,
        ...(parsed.data.recommended_action
          ? { recommended_action: parsed.data.recommended_action }
          : {}),
      },
    };
    if (await readRunnerResultManifest(opts.loaded.bundle.execution.artifact_paths.result_path)) {
      return denied({
        ...binding,
        code: "terminal_result_exists",
        message: "A terminal semantic result already exists for this run.",
      });
    }
    await writeNewStableRegularFileNoFollow(
      opts.loaded.bundle.execution.artifact_paths.result_path,
      `${JSON.stringify(semantic, null, 2)}\n`,
      "runner phase-tool blocker result",
    );
    await revokeRunnerPhaseToolGrant({
      run_dir: opts.run_dir,
      record: opts.loaded.record,
      at: opts.now,
      reason: "terminal_report",
    });
    return accepted({
      ...binding,
      data: {
        result_path: opts.loaded.bundle.execution.artifact_paths.result_path,
        status: semantic.status,
        token_revoked: true,
      },
    });
  }
  if (opts.tool === "request_knowledge" || opts.tool === "knowledge_search") {
    let request: AgentSemanticResultKnowledgeRequest;
    if (opts.tool === "request_knowledge") {
      const parsed = KNOWLEDGE_REQUEST_INPUT_SCHEMA.safeParse(opts.input);
      if (!parsed.success) {
        return denied({
          ...binding,
          code: "invalid_input",
          message: parsed.error.issues.map((issue) => issue.message).join("; "),
        });
      }
      request = {
        schema_version: KNOWLEDGE_REQUEST_SCHEMA_VERSION,
        kind: KNOWLEDGE_REQUEST_KIND,
        query: parsed.data.query,
        reason: parsed.data.reason,
        desired_kind: parsed.data.desired_kind,
        scope: "task_context",
        blocking: parsed.data.blocking,
      };
    } else {
      const parsed = KNOWLEDGE_SEARCH_INPUT_SCHEMA.safeParse(opts.input);
      if (!parsed.success) {
        return denied({
          ...binding,
          code: "invalid_input",
          message: parsed.error.issues.map((issue) => issue.message).join("; "),
        });
      }
      request = {
        schema_version: KNOWLEDGE_REQUEST_SCHEMA_VERSION,
        kind: KNOWLEDGE_REQUEST_KIND,
        query: parsed.data.query,
        reason: "Run-scoped knowledge_search request.",
        desired_kind: parsed.data.desired_kind ?? "any",
        scope: "task_context",
        blocking: false,
      };
    }
    const served = await serveRunnerPhaseToolKnowledgeRequest({
      manifest: opts.loaded.manifest,
      work_order: opts.loaded.work_order,
      repository_root: opts.repository_root,
      run_dir: opts.run_dir,
      request,
    });
    return accepted({
      ...binding,
      data: {
        response: served.response,
        knowledge_audit: served.audit,
      },
    });
  }
  if (opts.tool === "knowledge_show") {
    const parsed = KNOWLEDGE_SHOW_INPUT_SCHEMA.safeParse(opts.input);
    if (!parsed.success) {
      return denied({
        ...binding,
        code: "invalid_input",
        message: parsed.error.issues.map((issue) => issue.message).join("; "),
      });
    }
    const knowledgeRef = opts.loaded.work_order.knowledge_refs.find(
      (candidate) => candidate.ref === parsed.data.ref && candidate.digest === parsed.data.digest,
    );
    if (!knowledgeRef) {
      return denied({
        ...binding,
        code: "invalid_input",
        message: "knowledge_show accepts only an exact digest-bound work-order KnowledgeRef.",
      });
    }
    const excerpt = await prepareKnowledgeExcerpt({
      repository_root: opts.repository_root,
      knowledge_ref: knowledgeRef,
      max_bytes: 2048,
      max_lines: 60,
    });
    return accepted({
      ...binding,
      data: { knowledge_ref: knowledgeRef, excerpt },
    });
  }
  return denied({
    ...binding,
    code: "tool_not_allowed",
    message: "Lifecycle and undeclared operations are not available through the phase-tool API.",
  });
}

export async function invokeRunnerPhaseTool(opts: {
  repository_root: string;
  run_dir: string;
  token: string;
  tool: string;
  input: unknown;
  now?: Date;
}): Promise<RunnerPhaseToolResponse> {
  const binding = await validateRunBinding(opts);
  if (isPhaseToolResponse(binding)) return binding;
  let response: RunnerPhaseToolResponse;
  try {
    response = await executeTool({ ...opts, loaded: binding });
  } catch (error) {
    response = denied({
      code: "storage_error",
      tool: opts.tool,
      message: error instanceof Error ? error.message : "The phase-tool operation failed.",
      run_id: binding.manifest.run_id,
      work_order_id: binding.work_order.work_order_id,
    });
  }
  try {
    return await persistRunnerPhaseToolAudit({
      manifest: binding.manifest,
      record: binding.record,
      tool: opts.tool,
      input: opts.input,
      response,
      now: opts.now,
    });
  } catch {
    return {
      ...response,
      audit: null,
    };
  }
}
