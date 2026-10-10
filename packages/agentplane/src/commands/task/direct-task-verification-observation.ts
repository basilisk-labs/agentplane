import type { CommandContext } from "../shared/task-backend.js";
import type { DirectTaskVerificationResult } from "./direct-task-verification-checks.js";
import { isInfrastructureVerification } from "./verification-infrastructure.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import {
  runProcess,
  runProcessSync,
  startProcess,
  type RunProcessOptions,
} from "@agentplaneorg/core/process";
import { constants } from "node:fs";
import { lstat, mkdir, open } from "node:fs/promises";
import path from "node:path";
import {
  createVerificationObservation,
  observationDigest,
  type ObservationReference,
} from "./verification-observation.js";

type Observation = ReturnType<typeof createVerificationObservation>;

export async function verificationImplementationIdentity(cwd: string, workflowDir: string) {
  const head = runProcessSync({
    command: "git",
    args: ["rev-parse", "HEAD"],
    cwd: cwd,
    reject: false,
    timeoutMs: 15_000,
  });
  const diff = runProcessSync({
    command: "git",
    args: ["diff", "HEAD", "--binary"],
    cwd: cwd,
    reject: false,
    timeoutMs: 15_000,
    maxBuffer: 16 * 1024 * 1024,
  });
  const untracked = runProcessSync({
    command: "git",
    args: ["ls-files", "--others", "--exclude-standard", "-z"],
    cwd: cwd,
    reject: false,
    timeoutMs: 15_000,
    maxBuffer: 1024 * 1024,
  });
  const excludedArtifactRoots = [workflowDir, ".agentplane/tmp", ".agentplane/worktrees"];
  const untrackedPaths = String(untracked.stdout)
    .split("\0")
    .filter(
      (file) =>
        file && !excludedArtifactRoots.some((root) => file === root || file.startsWith(`${root}/`)),
    );
  let remainingBytes = 8 * 1024 * 1024;
  let identityComplete =
    head.exitCode === 0 &&
    diff.exitCode === 0 &&
    untracked.exitCode === 0 &&
    untrackedPaths.length <= 256;
  const inventory: { path: string; digest?: string; unavailable?: true }[] = [];
  for (const relative of untrackedPaths.slice(0, 256)) {
    try {
      const absolute = path.resolve(cwd, relative);
      if (!absolute.startsWith(`${path.resolve(cwd)}${path.sep}`))
        throw new Error("untracked path outside checkout");
      const pathStat = await lstat(absolute);
      if (!pathStat.isFile() || pathStat.isSymbolicLink()) throw new Error("unsafe untracked file");
      const handle = await open(absolute, constants.O_RDONLY | constants.O_NOFOLLOW);
      try {
        const before = await handle.stat();
        if (before.ino !== pathStat.ino || before.dev !== pathStat.dev)
          throw new Error("untracked file replaced");
        if (!before.isFile() || before.size > Math.min(1024 * 1024, remainingBytes))
          throw new Error("untracked identity bound exceeded");
        const bytes = Buffer.alloc(before.size + 1);
        let length = 0;
        while (length < bytes.length) {
          const read = await handle.read(bytes, length, bytes.length - length, length);
          if (read.bytesRead === 0) break;
          length += read.bytesRead;
        }
        const after = await handle.stat();
        if (
          length !== before.size ||
          before.size !== after.size ||
          before.mtimeMs !== after.mtimeMs
        )
          throw new Error("untracked file changed during identity read");
        remainingBytes -= length;
        inventory.push({ path: relative, digest: observationDigest(bytes.subarray(0, length)) });
      } finally {
        await handle.close();
      }
    } catch {
      identityComplete = false;
      inventory.push({ path: relative, unavailable: true });
    }
  }
  return {
    status: identityComplete ? "complete" : "incomplete",
    head: head.exitCode === 0 ? String(head.stdout).trim() : null,
    tracked_diff_digest: diff.exitCode === 0 ? observationDigest(String(diff.stdout)) : null,
    untracked_inventory: inventory,
    untracked_inventory_digest: observationDigest(JSON.stringify(inventory)),
    omitted_untracked_paths: Math.max(0, untrackedPaths.length - 256),
    excluded_artifact_roots: excludedArtifactRoots,
  };
}

export async function executeObservedCheck(options: {
  processOptions: RunProcessOptions;
  runProcess?: typeof runProcess;
  observation?: Observation;
  observedOutput: Record<"stdout" | "stderr", boolean>;
}) {
  const { processOptions, observation, observedOutput } = options;
  // The verifier grammar admits executables before this streaming process boundary.
  // Keep retained evidence independent of the process output buffer and final JSON.
  let segmentStdout = "";
  let segmentStderr = "";
  const segmentOutput = { stdout: false, stderr: false };
  const capture = (name: "stdout" | "stderr", chunk: string | Buffer) => {
    if (chunk.length > 0 && !segmentOutput[name]) {
      if (observedOutput[name]) observation?.write(name, "\n");
      segmentOutput[name] = true;
      observedOutput[name] = true;
    }
    observation?.write(name, chunk);
    if (name === "stdout") segmentStdout = `${segmentStdout}${String(chunk)}`.slice(-1024 * 1024);
    else segmentStderr = `${segmentStderr}${String(chunk)}`.slice(-1024 * 1024);
  };
  const executed = await (async () => {
    if (options.runProcess) {
      const result = await options.runProcess(processOptions);
      capture("stdout", String(result.stdout ?? ""));
      capture("stderr", String(result.stderr ?? ""));
      return result;
    }
    const observedOptions = {
      ...processOptions,
      onStdout: (chunk: string | Buffer) => capture("stdout", chunk),
      onStderr: (chunk: string | Buffer) => capture("stderr", chunk),
    };
    return processOptions.command === "python" || processOptions.command === "python3"
      ? await startProcess({ ...observedOptions, buffer: true })
      : await runProcess(observedOptions);
  })();
  return { executed, stdout: segmentStdout, stderr: segmentStderr };
}

export function verificationObservationEnv(
  observation: Observation | undefined,
  implementation: Awaited<ReturnType<typeof verificationImplementationIdentity>>,
): NodeJS.ProcessEnv {
  if (!observation) return {};
  return {
    AGENTPLANE_VERIFICATION_OBSERVATION_DIR: path.join(observation.directory, "children"),
    AGENTPLANE_VERIFICATION_PARENT_RUN_ID: observation.runId,
    AGENTPLANE_VERIFICATION_BUDGET_DIR: observation.budgetDirectory,
    AGENTPLANE_VERIFICATION_IMPLEMENTATION: JSON.stringify({
      status: implementation.status,
      head: implementation.head,
      tracked_diff_digest: implementation.tracked_diff_digest,
      untracked_inventory_digest: implementation.untracked_inventory_digest,
    }),
  };
}

export async function writeCheckArtifact(opts: {
  command: CommandContext;
  task_id: string;
  result: Omit<DirectTaskVerificationResult, "artifact_path">;
  retain_infrastructure_failure?: (
    result: Omit<DirectTaskVerificationResult, "artifact_path">,
  ) => Promise<string>;
}): Promise<string> {
  if (opts.retain_infrastructure_failure && isInfrastructureVerification(opts.result))
    return opts.retain_infrastructure_failure(opts.result);
  const relative = path.join(
    opts.command.config.paths.workflow_dir,
    opts.task_id,
    "supervision",
    "declared-checks.json",
  );
  const absolute = path.join(opts.command.resolvedProject.gitRoot, relative);
  await mkdir(path.dirname(absolute), { recursive: true });
  const artifact = {
    schema_version: 1,
    kind: "direct_task_declared_checks",
    task_id: opts.task_id,
    status: opts.result.status,
    reason: opts.result.reason,
    checks: opts.result.checks,
  };
  // Equal commands and exit codes do not identify an equal execution or implementation.
  // Persist this run's observations. The writer already avoids byte-identical rewrites.
  await writeJsonStableIfChanged(absolute, artifact);
  return relative;
}

const CHECK_OUTPUT_LIMIT = 4000;
function tail(value: string): string {
  return value.length <= CHECK_OUTPUT_LIMIT ? value : value.slice(-CHECK_OUTPUT_LIMIT);
}

export function mergedOutput(values: readonly string[]): string {
  return tail(values.filter(Boolean).join("\n"));
}

export function createDeclaredCheckObservation(options: {
  root: string;
  workflowDir: string;
  taskId: string;
  command: string;
  deadline: number;
  implementation: unknown;
  runtime: unknown;
  env: NodeJS.ProcessEnv;
  cwd: string;
}): { observation?: Observation; reference?: ObservationReference } {
  try {
    const observation = createVerificationObservation({
      directory: path.join(
        options.root,
        options.workflowDir,
        options.taskId,
        "supervision",
        "verification-runs",
      ),
      binding: {
        kind: "declared_check",
        command: options.command,
        deadline_ms: options.deadline,
        implementation: options.implementation,
        runtime: options.runtime,
      },
      env: options.env,
      cwd: options.cwd,
    });
    return { observation };
  } catch {
    return {
      reference: {
        status: "unavailable",
        reason: "observation admission failed; verification still executes",
      },
    };
  }
}
