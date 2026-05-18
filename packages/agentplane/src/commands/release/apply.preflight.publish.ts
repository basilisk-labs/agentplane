import path from "node:path";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { withDiagnosticContext } from "../shared/diagnostics.js";
import { CliError } from "../../shared/errors.js";
import {
  resolvePreferredNodeExecutable,
  withPreferredRuntimePath,
} from "../../shared/runtime-env.js";
import { execFileAsync, runProcess } from "@agentplaneorg/core/process";

import { releasePushDescription, type ReleaseCommandLabel } from "./apply.preflight.git.js";

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

async function runReleasePrepublishPhase(gitRoot: string, phase: "fast" | "heavy"): Promise<void> {
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
  for (const phase of ["fast", "heavy"] as const) {
    try {
      await runReleasePrepublishPhase(gitRoot, phase);
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
