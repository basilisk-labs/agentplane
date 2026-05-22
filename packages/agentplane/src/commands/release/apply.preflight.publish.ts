import path from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { withDiagnosticContext } from "../shared/diagnostics.js";
import { CliError } from "../../shared/errors.js";
import {
  resolvePreferredNodeExecutable,
  withPreferredRuntimePath,
} from "../../shared/runtime-env.js";
import { execFileAsync, runProcess } from "@agentplaneorg/core/process";

import { releasePushDescription, type ReleaseCommandLabel } from "./apply.preflight.git.js";

type ReleasePrepublishPhase = "fast" | "heavy";

async function resolveTreeDigest(gitRoot: string): Promise<string> {
  const result = await execFileAsync("git", ["rev-parse", "HEAD^{tree}"], {
    cwd: gitRoot,
    env: withPreferredRuntimePath(process.env),
  });
  return String(result.stdout ?? "").trim();
}

function releasePrepublishProofPath(gitRoot: string): string {
  return path.join(gitRoot, ".agentplane", ".release", "prepublish-proof.json");
}

async function readReleasePrepublishProof(
  gitRoot: string,
  phase: ReleasePrepublishPhase,
  treeDigest: string,
): Promise<boolean> {
  try {
    const payload = JSON.parse(await readFile(releasePrepublishProofPath(gitRoot), "utf8")) as {
      tree_digest?: unknown;
      phases?: Record<string, { ok?: unknown } | undefined>;
    };
    return payload.tree_digest === treeDigest && payload.phases?.[phase]?.ok === true;
  } catch {
    return false;
  }
}

async function writeReleasePrepublishProof(
  gitRoot: string,
  phase: ReleasePrepublishPhase,
  treeDigest: string,
): Promise<void> {
  const proofPath = releasePrepublishProofPath(gitRoot);
  let phases: Record<string, unknown> = {};
  try {
    const payload = JSON.parse(await readFile(proofPath, "utf8")) as {
      tree_digest?: unknown;
      phases?: Record<string, unknown>;
    };
    if (payload.tree_digest === treeDigest && payload.phases) phases = payload.phases;
  } catch {
    phases = {};
  }
  phases[phase] = { ok: true, completed_at: new Date().toISOString() };
  await mkdir(path.dirname(proofPath), { recursive: true });
  await writeFile(
    proofPath,
    `${JSON.stringify({ schema_version: 1, tree_digest: treeDigest, phases }, null, 2)}\n`,
    "utf8",
  );
}

function releasePrepublishEnv(): NodeJS.ProcessEnv {
  const env = withPreferredRuntimePath({
    ...process.env,
    GIT_AUTHOR_NAME: process.env.GIT_AUTHOR_NAME ?? "agentplane-release",
    GIT_AUTHOR_EMAIL: process.env.GIT_AUTHOR_EMAIL ?? "agentplane-release@example.com",
    GIT_COMMITTER_NAME: process.env.GIT_COMMITTER_NAME ?? "agentplane-release",
    GIT_COMMITTER_EMAIL: process.env.GIT_COMMITTER_EMAIL ?? "agentplane-release@example.com",
  });

  delete env.AGENTPLANE_AGENT_MODE;
  delete env.AGENTPLANE_CLI_ALIAS;
  delete env.AGENTPLANE_COLOR;
  delete env.AGENTPLANE_PROMPTS;
  delete env.FORCE_COLOR;
  delete env.NO_COLOR;

  return env;
}

export async function ensureNpmVersionsAvailable(
  gitRoot: string,
  version: string,
  commandLabel: ReleaseCommandLabel = "release apply",
): Promise<void> {
  const scriptPath = path.join(gitRoot, "scripts", "check-npm-version-availability.mjs");
  try {
    await execFileAsync(
      resolvePreferredNodeExecutable(process.env),
      [scriptPath, "--version", version],
      {
        cwd: gitRoot,
        env: withPreferredRuntimePath(process.env),
        maxBuffer: 10 * 1024 * 1024,
      },
    );
  } catch (err) {
    const details = String(
      (err as { stderr?: string; stdout?: string; message?: string } | null)?.stderr ?? "",
    ).trim();
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Pre-publish npm check failed for version ${version}. ` +
        "Ensure this version is not already published for @agentplaneorg/core and agentplane." +
        (details ? `\n\n${details}` : ""),
      context: withDiagnosticContext(
        { command: commandLabel },
        {
          state: "the target npm version is not publishable",
          likelyCause:
            "that version is already burned in npm history for one of the published packages, even if it is no longer the current dist-tag",
          nextAction: {
            command: `node scripts/check-npm-version-availability.mjs --version ${version}`,
            reason:
              "inspect which package already consumed the target version before choosing a new release number",
            reasonCode: "release_npm_version_burned",
          },
        },
      ),
    });
  }
}

async function runReleasePrepublishPhase(
  gitRoot: string,
  phase: ReleasePrepublishPhase,
): Promise<void> {
  await runProcess({
    command: "bun",
    args: ["run", `release:prepublish:${phase}`],
    cwd: gitRoot,
    env: releasePrepublishEnv(),
    stdout: "inherit",
    stderr: "inherit",
  });
}

export async function runReleasePrepublishGate(
  gitRoot: string,
  commandLabel: ReleaseCommandLabel = "release apply",
): Promise<void> {
  const treeDigest = await resolveTreeDigest(gitRoot);
  for (const phase of ["fast", "heavy"] as const) {
    if (await readReleasePrepublishProof(gitRoot, phase, treeDigest)) {
      process.stdout.write(
        `release prepublish ${phase}: reusable proof found for tree ${treeDigest}\n`,
      );
      continue;
    }
    try {
      await runReleasePrepublishPhase(gitRoot, phase);
      await writeReleasePrepublishProof(gitRoot, phase, treeDigest);
    } catch (err) {
      const details = String(
        (err as { stderr?: string; stdout?: string; message?: string } | null)?.stderr ??
          (err as { stdout?: string; message?: string } | null)?.stdout ??
          (err as { message?: string } | null)?.message ??
          "",
      ).trim();
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message:
          `Release prepublish ${phase} phase failed. \`agentplane ${commandLabel} --push\` requires a successful local \`bun run release:prepublish:${phase}\` run before ${releasePushDescription(commandLabel)}.` +
          (details ? `\n\n${details}` : ""),
        context: withDiagnosticContext(
          { command: commandLabel },
          {
            state: `release prepublish ${phase} validation failed before ${releasePushDescription(commandLabel)}`,
            likelyCause:
              phase === "fast"
                ? "a lightweight publish-readiness check rejected the current release payload before the expensive validation route started"
                : "the expensive release validation route rejected the current repository state after the fast publish-readiness checks passed",
            nextAction: {
              command: `bun run release:prepublish:${phase}`,
              reason:
                phase === "fast"
                  ? `rerun the fast prepublish phase to fix the exact payload or packaging problem before retrying ${commandLabel}`
                  : `rerun the heavy prepublish phase to inspect and fix the expensive validation failure before retrying ${commandLabel}`,
              reasonCode: `release_prepublish_${phase}_failed`,
            },
          },
        ),
      });
    }
  }
}
