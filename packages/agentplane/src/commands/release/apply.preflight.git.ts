import { exitCodeForError } from "../../cli/exit-codes.js";
import { withDiagnosticContext } from "../shared/diagnostics.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";

export type ReleaseCommandLabel = "release apply" | "release candidate";

export function releasePushDescription(commandLabel: ReleaseCommandLabel): string {
  return commandLabel === "release candidate"
    ? "preparing or pushing the release candidate branch"
    : "pushing the release tag";
}

export async function ensureCleanTrackedTree(
  gitRoot: string,
  commandLabel: ReleaseCommandLabel = "release apply",
): Promise<void> {
  const { stdout } = await execFileAsync("git", ["status", "--short", "--untracked-files=no"], {
    cwd: gitRoot,
    env: gitEnv(),
    maxBuffer: 10 * 1024 * 1024,
  });
  const dirty = String(stdout ?? "")
    .split(/\r?\n/u)
    .map((line) => line.trimEnd())
    .filter((line) => line.length > 0);
  if (dirty.length === 0) return;

  throw new CliError({
    exitCode: exitCodeForError("E_GIT"),
    code: "E_GIT",
    message:
      `${commandLabel} requires a clean tracked working tree.\n` +
      `Found tracked changes:\n${dirty.map((line) => `  ${line}`).join("\n")}`,
    context: withDiagnosticContext(
      { command: commandLabel },
      {
        state: `${commandLabel} cannot start from a dirty tracked tree`,
        likelyCause:
          "the release flow needs to create one deterministic version-bump commit and tag, but tracked edits already exist in the workspace",
        nextAction: {
          command: "git status --short --untracked-files=no",
          reason: `inspect or clear tracked changes before rerunning \`agentplane ${commandLabel}\``,
          reasonCode: "release_dirty_tree",
        },
      },
    ),
  });
}

export async function ensureTagDoesNotExist(
  gitRoot: string,
  tag: string,
  commandLabel: ReleaseCommandLabel = "release apply",
): Promise<void> {
  try {
    await execFileAsync("git", ["rev-parse", "-q", "--verify", `refs/tags/${tag}`], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    throw new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message: `Tag already exists: ${tag}`,
      context: withDiagnosticContext(
        { command: commandLabel },
        {
          state: "the target release tag already exists locally",
          likelyCause:
            "the release version was already applied earlier, or a previous release attempt created the tag before failing later in the flow",
          nextAction: {
            command: `git show --stat --oneline ${tag}`,
            reason:
              "inspect the existing tag before deciding whether to reuse it or plan a new version",
            reasonCode: "release_tag_exists",
          },
        },
      ),
    });
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code !== 1) throw err;
  }
}

export async function ensureRemoteExists(
  gitRoot: string,
  remote: string,
  commandLabel: ReleaseCommandLabel = "release apply",
): Promise<void> {
  try {
    await execFileAsync("git", ["remote", "get-url", remote], {
      cwd: gitRoot,
      env: gitEnv(),
    });
  } catch (err) {
    const details = String(
      (err as { stderr?: string; message?: string } | null)?.stderr ??
        (err as { message?: string } | null)?.message ??
        "",
    ).trim();
    throw new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message: `Git remote is not configured: ${remote}` + (details ? `\n\n${details}` : ""),
      context: withDiagnosticContext(
        { command: commandLabel },
        {
          state: "the configured release remote does not exist locally",
          likelyCause:
            "release apply was asked to push, but the selected git remote is missing or misconfigured in this checkout",
          nextAction: {
            command: "git remote -v",
            reason: `inspect configured remotes before rerunning ${commandLabel} with --push`,
            reasonCode: "release_remote_missing",
          },
        },
      ),
    });
  }
}

export async function ensureRemoteTagDoesNotExist(
  gitRoot: string,
  remote: string,
  tag: string,
  commandLabel: ReleaseCommandLabel = "release apply",
): Promise<void> {
  let stdout = "";
  try {
    const out = await execFileAsync("git", ["ls-remote", "--tags", remote, `refs/tags/${tag}`], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    stdout = String(out.stdout ?? "").trim();
  } catch (err) {
    const details = String(
      (err as { stderr?: string; message?: string } | null)?.stderr ??
        (err as { message?: string } | null)?.message ??
        "",
    ).trim();
    throw new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message:
        `Failed to inspect remote tag state for ${remote}/${tag}.` +
        (details ? `\n\n${details}` : ""),
      context: withDiagnosticContext(
        { command: commandLabel },
        {
          state: `${commandLabel} could not verify the remote tag state`,
          likelyCause:
            "the remote is configured, but git could not query it for the target release tag before the release started",
          nextAction: {
            command: `git ls-remote --tags ${remote} refs/tags/${tag}`,
            reason: "inspect remote tag visibility before retrying the release push path",
            reasonCode: "release_remote_tag_check_failed",
          },
        },
      ),
    });
  }

  if (!stdout) return;

  throw new CliError({
    exitCode: exitCodeForError("E_GIT"),
    code: "E_GIT",
    message: `Remote tag already exists: ${remote}/${tag}`,
    context: withDiagnosticContext(
      { command: commandLabel },
      {
        state: "the target release tag already exists on the remote",
        likelyCause:
          "a previous release or partial push already published this tag upstream, so pushing the same version again would drift the local release state",
        nextAction: {
          command: `git ls-remote --tags ${remote} refs/tags/${tag}`,
          reason:
            "inspect the existing remote tag before deciding whether to recover or bump to a new version",
          reasonCode: "release_remote_tag_exists",
        },
      },
    ),
  });
}
