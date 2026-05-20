import { z } from "zod";

import {
  ISO_UTC_TIMESTAMP,
  NON_EMPTY_STRING,
  assertValid,
  schemaErrors,
} from "./task-artifact-schema.shared.js";

const RUNNER_HANDOFF_MODE_VALUES = ["dry_run", "execute"] as const;
const RUNNER_HANDOFF_STATUS_VALUES = [
  "requested",
  "accepted",
  "blocked",
  "expired",
  "cancelled",
] as const;
const RUNNER_HANDOFF_EVIDENCE_KIND_VALUES = [
  "task_readme",
  "verification",
  "acr",
  "trace",
  "artifact",
  "custom",
] as const;
const RUNNER_HANDOFF_UPLOAD_TARGET_KIND_VALUES = [
  "evidence",
  "artifact",
  "trace",
  "acr",
  "log",
] as const;

const GIT_OID_SCHEMA = z.string().regex(/^[a-f0-9]{7,64}$/u);
const SAFE_ID_SCHEMA = z
  .string()
  .min(1)
  .max(160)
  .regex(/^[A-Za-z0-9][A-Za-z0-9._:-]*$/u);
const SAFE_REF_COMPONENT_SCHEMA = z
  .string()
  .min(1)
  .max(240)
  .regex(
    /^(?!\/)(?!\\)(?![A-Za-z]:)(?!.*:\/\/)(?!.*\\)(?!.*(?:^|\/)\.\.(?:\/|$))(?!.*\.lock$)(?!.*@[{])(?!.*\s).+$/u,
  );
const SAFE_REPOSITORY_SLUG_SCHEMA = z
  .string()
  .min(1)
  .max(200)
  .regex(
    /^(?!\/)(?!\\)(?![A-Za-z]:)(?!.*:\/\/)(?!.*\\)(?!.*(?:^|\/)\.\.(?:\/|$))(?!.*\.git$)[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/u,
  );

export const RUNNER_HANDOFF_REPO_REF_ZOD_SCHEMA = z
  .object({
    kind: z.literal("git"),
    repository: SAFE_REPOSITORY_SLUG_SCHEMA,
    ref: SAFE_REF_COMPONENT_SCHEMA,
    commit_sha: GIT_OID_SCHEMA.optional(),
  })
  .strict();

export const RUNNER_HANDOFF_PRINCIPAL_ZOD_SCHEMA = z
  .object({
    type: z.enum(["human", "agent", "automation", "service", "unknown"]),
    id: SAFE_ID_SCHEMA,
  })
  .strict();

export const RUNNER_HANDOFF_REQUIRED_EVIDENCE_ZOD_SCHEMA = z
  .object({
    kind: z.enum(RUNNER_HANDOFF_EVIDENCE_KIND_VALUES),
    id: SAFE_ID_SCHEMA,
    required: z.boolean().default(true),
  })
  .strict();

export const RUNNER_HANDOFF_UPLOAD_TARGET_ZOD_SCHEMA = z
  .object({
    kind: z.enum(RUNNER_HANDOFF_UPLOAD_TARGET_KIND_VALUES),
    target_id: SAFE_ID_SCHEMA,
    expires_at: ISO_UTC_TIMESTAMP.optional(),
  })
  .strict();

export const RUNNER_HANDOFF_KILL_SWITCH_CHECK_ZOD_SCHEMA = z
  .object({
    checked_at: ISO_UTC_TIMESTAMP,
    active: z.literal(false),
  })
  .strict();

export const AGENTPLANE_RUNNER_HANDOFF_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    run_id: SAFE_ID_SCHEMA,
    project_id: SAFE_ID_SCHEMA,
    workspace_id: SAFE_ID_SCHEMA,
    task_id: NON_EMPTY_STRING,
    agent_task_id: SAFE_ID_SCHEMA.optional(),
    plan_id: SAFE_ID_SCHEMA.optional(),
    repo_ref: RUNNER_HANDOFF_REPO_REF_ZOD_SCHEMA,
    requested_by: RUNNER_HANDOFF_PRINCIPAL_ZOD_SCHEMA,
    mode: z.enum(RUNNER_HANDOFF_MODE_VALUES),
    required_evidence: z.array(RUNNER_HANDOFF_REQUIRED_EVIDENCE_ZOD_SCHEMA).min(1),
    upload_targets: z.array(RUNNER_HANDOFF_UPLOAD_TARGET_ZOD_SCHEMA).min(1),
    created_at: ISO_UTC_TIMESTAMP,
    expires_at: ISO_UTC_TIMESTAMP,
    status: z.enum(RUNNER_HANDOFF_STATUS_VALUES),
    kill_switch_checked: RUNNER_HANDOFF_KILL_SWITCH_CHECK_ZOD_SCHEMA,
  })
  .strict()
  .superRefine((value, ctx) => {
    if (Date.parse(value.expires_at) <= Date.parse(value.created_at)) {
      ctx.addIssue({
        code: "custom",
        path: ["expires_at"],
        message: "expires_at must be after created_at",
      });
    }
  });

export type AgentPlaneRunnerHandoff = z.infer<typeof AGENTPLANE_RUNNER_HANDOFF_ZOD_SCHEMA>;
export type AgentPlaneRunnerHandoffMode = (typeof RUNNER_HANDOFF_MODE_VALUES)[number];
export type AgentPlaneRunnerHandoffStatus = (typeof RUNNER_HANDOFF_STATUS_VALUES)[number];
export type AgentPlaneRunnerHandoffRepoRef = z.infer<typeof RUNNER_HANDOFF_REPO_REF_ZOD_SCHEMA>;
export type AgentPlaneRunnerHandoffPublic = Omit<AgentPlaneRunnerHandoff, "requested_by"> & {
  requested_by: Pick<AgentPlaneRunnerHandoff["requested_by"], "type">;
};

export type AgentPlaneRunnerHandoffValidationOptions = {
  executeEnabled?: boolean;
  killSwitchActive?: boolean;
  now?: Date | string;
};

function validationNow(opts?: AgentPlaneRunnerHandoffValidationOptions): number {
  if (!opts?.now) return Date.now();
  return opts.now instanceof Date ? opts.now.getTime() : Date.parse(opts.now);
}

export function listAgentPlaneRunnerHandoffSchemaErrors(
  value: unknown,
  opts?: AgentPlaneRunnerHandoffValidationOptions,
): string[] {
  const errors = schemaErrors("runner handoff", AGENTPLANE_RUNNER_HANDOFF_ZOD_SCHEMA, value);
  const parsed = AGENTPLANE_RUNNER_HANDOFF_ZOD_SCHEMA.safeParse(value);
  if (!parsed.success) return errors;
  if (opts?.killSwitchActive === true) {
    errors.push("runner handoff validation failed: global kill switch is active");
  }
  if (parsed.data.mode === "execute" && opts?.executeEnabled !== true) {
    errors.push("runner handoff validation failed: execute mode requires explicit enablement");
  }
  if (Date.parse(parsed.data.expires_at) <= validationNow(opts)) {
    errors.push("runner handoff validation failed: handoff is expired");
  }
  return errors;
}

export function validateAgentPlaneRunnerHandoff(
  value: unknown,
  opts?: AgentPlaneRunnerHandoffValidationOptions,
): AgentPlaneRunnerHandoff {
  const handoff = assertValid("runner handoff", AGENTPLANE_RUNNER_HANDOFF_ZOD_SCHEMA, value);
  const errors = listAgentPlaneRunnerHandoffSchemaErrors(handoff, opts);
  if (errors.length > 0) throw new Error(errors.join("\n"));
  return handoff;
}

export function sanitizeAgentPlaneRunnerHandoff(
  handoff: AgentPlaneRunnerHandoff,
): AgentPlaneRunnerHandoffPublic {
  return {
    ...handoff,
    requested_by: {
      type: handoff.requested_by.type,
    },
  };
}

export {
  RUNNER_HANDOFF_EVIDENCE_KIND_VALUES,
  RUNNER_HANDOFF_MODE_VALUES,
  RUNNER_HANDOFF_STATUS_VALUES,
  RUNNER_HANDOFF_UPLOAD_TARGET_KIND_VALUES,
};
