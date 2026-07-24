import path from "node:path";
import { realpath } from "node:fs/promises";

import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { readRecipeRunProfile } from "../adapters/recipe-run-profile.js";
import { normalizeRecipeArtifactPrefixes } from "../result-manifest-policy.js";
import {
  hasExplicitRunnerDangerFullAccessAuthority,
  isRunnerSandboxMode,
  resolveRunnerSandboxPolicy,
} from "../sandbox-policy.js";
import { RUNNER_DANGER_FULL_ACCESS_SANDBOX, type RunnerContextBundle } from "../types.js";

function isEnforcedCapabilityLevel(level: string | undefined): boolean {
  return level === "native" || level === "wrapper";
}

export function assertRunnerPolicyCompatibility(bundle: RunnerContextBundle): void {
  const profile = readRecipeRunProfile(bundle.recipe);
  const adapterId = bundle.execution.adapter_id;
  const capabilities = bundle.execution.adapter_capabilities;
  const sandboxPolicy =
    bundle.execution.sandbox_policy ??
    resolveRunnerSandboxPolicy({
      task: bundle.task?.data,
      recipe: bundle.recipe,
    });

  if (!isRunnerSandboxMode(sandboxPolicy.requested)) {
    throw new CliError({
      exitCode: exitCodeForError("E_RUNTIME"),
      code: "E_RUNTIME",
      message:
        `Runner sandbox ${JSON.stringify(sandboxPolicy.requested)} is invalid; supported values: ` +
        "read-only, workspace-write, danger-full-access.",
      context: {
        adapter_id: adapterId,
        policy_field: "sandbox",
        declared_value: sandboxPolicy.requested,
      },
    });
  }
  if (
    sandboxPolicy.requested === RUNNER_DANGER_FULL_ACCESS_SANDBOX &&
    !hasExplicitRunnerDangerFullAccessAuthority(sandboxPolicy.authority)
  ) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        "Runner sandbox danger-full-access requires explicit operator authority " +
        "(pass --allow-danger-full-access).",
      context: {
        adapter_id: adapterId,
        policy_field: "sandbox",
        declared_value: sandboxPolicy.requested,
        required_authority: "danger_full_access_authorized",
      },
    });
  }
  const sandboxCapability = capabilities?.fields.sandbox;
  const sandboxDecision = bundle.execution.policy_decision?.fields.sandbox;
  if (sandboxDecision?.status === "unsupported") {
    throw new CliError({
      exitCode: exitCodeForError("E_RUNTIME"),
      code: "E_RUNTIME",
      message:
        `Runner adapter ${JSON.stringify(adapterId)} cannot enforce requested sandbox ` +
        `${JSON.stringify(sandboxPolicy.requested)}.`,
      context: {
        adapter_id: adapterId,
        policy_field: "sandbox",
        declared_value: sandboxPolicy.requested,
        capability: sandboxCapability,
      },
    });
  }
  if (
    isEnforcedCapabilityLevel(sandboxCapability?.level) &&
    sandboxCapability?.supported_values &&
    !sandboxCapability.supported_values.includes(sandboxPolicy.requested)
  ) {
    throw new CliError({
      exitCode: exitCodeForError("E_RUNTIME"),
      code: "E_RUNTIME",
      message:
        `Runner adapter ${JSON.stringify(adapterId)} does not support requested sandbox ` +
        `${JSON.stringify(sandboxPolicy.requested)}; supported values: ${sandboxCapability.supported_values.join(", ")}.`,
      context: {
        adapter_id: adapterId,
        policy_field: "sandbox",
        declared_value: sandboxPolicy.requested,
        capability: sandboxCapability,
      },
    });
  }
  if (profile?.writes_artifacts_to && profile.writes_artifacts_to.length > 0) {
    normalizeRecipeArtifactPrefixes(profile.writes_artifacts_to);
  }
}

async function canonicalPath(value: string): Promise<string> {
  try {
    return await realpath(value);
  } catch {
    return path.resolve(value);
  }
}

export async function assertRunnerCheckoutAuthority(opts: {
  bundle: RunnerContextBundle;
  authoritative_checkout_path: string | null;
  mutation_path_hint: string | null;
}): Promise<void> {
  const repositoryRoot = await canonicalPath(opts.bundle.repository.git_root);
  const authoritativePath = opts.authoritative_checkout_path
    ? await canonicalPath(opts.authoritative_checkout_path)
    : null;
  if (authoritativePath && authoritativePath !== repositoryRoot) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Runner repository ${JSON.stringify(repositoryRoot)} does not match the route-authoritative ` +
        `checkout ${JSON.stringify(authoritativePath)}.`,
      context: {
        policy_field: "write_scope",
        repository_root: repositoryRoot,
        authoritative_checkout_path: authoritativePath,
      },
    });
  }
  if ((opts.bundle.execution.write_scope?.writable_roots.length ?? 0) === 0) return;
  const mutationPath = opts.mutation_path_hint
    ? await canonicalPath(opts.mutation_path_hint)
    : null;
  if (mutationPath !== repositoryRoot) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        "Write-capable runner execution requires a route mutation path matching the repository root.",
      context: {
        policy_field: "write_scope",
        repository_root: repositoryRoot,
        mutation_path_hint: mutationPath,
      },
    });
  }
}

export function assertRunnerTaskExecutable(bundle: RunnerContextBundle): void {
  const task = bundle.task;
  if (!task) return;
  const status = normalizeTaskStatus(task.data.status);
  if (status === "DOING") return;
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message:
      `${task.task_id}: runner execution requires task status DOING ` +
      `(current=${JSON.stringify(status)}; use \`agentplane task start-ready ${task.task_id} --author <ROLE> --body "Start: ..."\` first).`,
  });
}
