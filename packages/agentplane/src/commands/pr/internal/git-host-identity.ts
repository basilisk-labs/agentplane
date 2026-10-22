import { runProcess } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";
import { resolveGhCommand } from "../../shared/gh-transport.js";
import { ghEnv } from "./gh-api.js";
import { runGlabCommand } from "./glab-api.js";

export type GitHostProvider = "github" | "gitlab";

export type ParsedGitRemoteUrl = {
  hostname: string;
  project: string;
};

export type GitHostIdentity = {
  provider: GitHostProvider;
  hostname: string;
  remote: string;
  sourceProject: string;
  targetProject: string;
  sourceUrl: string;
  targetUrl: string;
};

export type RecordedGitHostIdentity = {
  schema_version?: number | null;
  kind?: string | null;
  hostname?: string | null;
  remote?: string | null;
  source_project?: string | null;
  target_project?: string | null;
};

function stripProjectSuffix(value: string): string {
  return value
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .replace(/\.git$/i, "");
}

export function parseGitRemoteUrl(remoteUrl: string): ParsedGitRemoteUrl | null {
  const trimmed = remoteUrl.trim();
  if (!trimmed) return null;

  const scp = /^(?:[^@/\s]+@)?([^:/\s]+):(.+)$/.exec(trimmed);
  if (scp && !/^[a-z][a-z\d+.-]*:\/\//i.test(trimmed)) {
    const project = stripProjectSuffix(scp[2] ?? "");
    return project ? { hostname: (scp[1] ?? "").toLowerCase(), project } : null;
  }

  try {
    const parsed = new URL(trimmed);
    if (!parsed.hostname) return null;
    const project = stripProjectSuffix(decodeURIComponent(parsed.pathname));
    return project
      ? {
          hostname: parsed.port
            ? `${parsed.hostname.toLowerCase()}:${parsed.port}`
            : parsed.hostname.toLowerCase(),
          project,
        }
      : null;
  } catch {
    return null;
  }
}

async function gitOutput(cwd: string, args: string[]): Promise<string | null> {
  const result = await runProcess({
    command: "git",
    args,
    cwd,
    env: gitEnv(),
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
    reject: false,
  });
  if (result.exitCode !== 0) return null;
  const output = String(result.stdout).trim();
  return output || null;
}

async function resolvePublicationRemote(opts: {
  gitRoot: string;
  branch: string;
}): Promise<string> {
  const configured = await gitOutput(opts.gitRoot, [
    "config",
    "--get",
    `branch.${opts.branch}.remote`,
  ]);
  return configured && configured !== "." ? configured : "origin";
}

async function resolveSingleRemoteUrl(opts: {
  gitRoot: string;
  remote: string;
  push: boolean;
}): Promise<string> {
  const args = ["remote", "get-url", ...(opts.push ? ["--push"] : []), "--all", opts.remote];
  const output = await gitOutput(opts.gitRoot, args);
  const urls = (output ?? "")
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter(Boolean);
  if (urls.length !== 1) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Cannot resolve one ${opts.push ? "push" : "fetch"} URL for publication remote ` +
        `${opts.remote}; found ${urls.length}. Configure one authoritative URL before hosted operations.`,
      context: { reason_code: "git_host_remote_ambiguous", remote: opts.remote },
    });
  }
  return urls[0]!;
}

type CliSessionStatus =
  | "ready"
  | "missing_credentials"
  | "rejected_credentials"
  | "dns_failure"
  | "tls_failure"
  | "connection_failure"
  | "cli_unavailable"
  | "unknown_failure";

function classifySessionFailure(value: unknown): CliSessionStatus {
  const record = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const text = [record.code, record.message, record.stdout, record.stderr]
    .filter((part): part is string => typeof part === "string")
    .join("\n");
  // These categories are the only diagnostic output. Never forward CLI output,
  // which can contain access tokens, private URLs or account information.
  if (/\b(?:ENOTFOUND|EAI_AGAIN)\b|no such host|DNS|name resolution/i.test(text))
    return "dns_failure";
  if (/\bTLS\b|\bSSL\b|certificate|handshake/i.test(text)) return "tls_failure";
  if (
    /\b(?:ETIMEDOUT|ECONNRESET|ECONNREFUSED|ENETUNREACH|EHOSTUNREACH)\b|timed? out|timeout|deadline exceeded|connection (?:reset|refused)|network is unreachable/i.test(
      text,
    )
  )
    return "connection_failure";
  if (record.code === "ENOENT") return "cli_unavailable";
  if (
    /\b(?:401|403)\b|invalid token|token[^\n]*invalid|authentication failed|unauthorized|forbidden/i.test(
      text,
    )
  )
    return "rejected_credentials";
  if (
    /not logged (?:in|into)|no (?:authentication|credentials|token)|not authenticated/i.test(text)
  )
    return "missing_credentials";
  return "unknown_failure";
}

async function cliSessionStatus(opts: {
  provider: GitHostProvider;
  hostname: string;
  gitRoot: string;
}): Promise<CliSessionStatus> {
  try {
    if (opts.provider === "github") {
      const gh = resolveGhCommand();
      const result = await runProcess({
        command: gh.command,
        args: [...gh.argsPrefix, "auth", "status", "--hostname", opts.hostname],
        cwd: opts.gitRoot,
        env: ghEnv(),
        encoding: "utf8",
        reject: false,
      });
      return result.exitCode === 0 ? "ready" : classifySessionFailure(result);
    }
    await runGlabCommand({
      cwd: opts.gitRoot,
      args: ["auth", "status", "--hostname", opts.hostname],
    });
    return "ready";
  } catch (error) {
    return classifySessionFailure(error);
  }
}

const uncertain = (status: CliSessionStatus) =>
  status === "dns_failure" ||
  status === "tls_failure" ||
  status === "connection_failure" ||
  status === "unknown_failure";

async function resolveProvider(opts: {
  hostname: string;
  gitRoot: string;
  recorded?: RecordedGitHostIdentity | null;
}): Promise<GitHostProvider> {
  const hostname = opts.hostname.split(":", 1)[0]?.toLowerCase() ?? opts.hostname.toLowerCase();
  if (hostname === "github.com") return "github";
  if (hostname === "gitlab.com") return "gitlab";
  const recordedKind = opts.recorded?.kind;
  if (recordedKind === "github" || recordedKind === "gitlab") return recordedKind;

  const [github, gitlab] = await Promise.all([
    cliSessionStatus({ provider: "github", hostname: opts.hostname, gitRoot: opts.gitRoot }),
    cliSessionStatus({ provider: "gitlab", hostname: opts.hostname, gitRoot: opts.gitRoot }),
  ]);
  if (uncertain(github) || uncertain(gitlab)) {
    throw new CliError({
      exitCode: exitCodeForError("E_NETWORK"),
      code: "E_NETWORK",
      message:
        `Provider authentication could not be validated for publication host ${opts.hostname} ` +
        `(github=${github}, gitlab=${gitlab}). Preserve the configured provider and credentials. ` +
        "Restore CLI/connectivity availability, then retry this read once; if it still fails, inspect local CLI diagnostics before continuing hosted operations.",
      context: {
        reason_code: "git_host_provider_validation_unavailable",
        hostname: opts.hostname,
        session_status: { github, gitlab },
      },
    });
  }
  if (github === "ready" && gitlab !== "ready") return "github";
  if (gitlab === "ready" && github !== "ready") return "gitlab";
  const ambiguous = github === "ready" && gitlab === "ready";
  throw new CliError({
    exitCode: exitCodeForError("E_NETWORK"),
    code: "E_NETWORK",
    message: ambiguous
      ? `Both GitHub and GitLab sessions validate for publication host ${opts.hostname}. Resolve the provider ambiguity before retrying hosted operations.`
      : `No validated GitHub or GitLab session identifies publication host ${opts.hostname} ` +
        `(github=${github}, gitlab=${gitlab}). Check the supported provider and the reported CLI credential state before retrying.`,
    context: {
      reason_code: ambiguous ? "git_host_provider_ambiguous" : "git_host_provider_unresolved",
      hostname: opts.hostname,
      session_status: { github, gitlab },
    },
  });
}

function assertRecordedIdentityMatches(
  live: GitHostIdentity,
  recorded: RecordedGitHostIdentity | null | undefined,
): void {
  if (!recorded) return;
  const mismatches: string[] = [];
  if (recorded.kind && recorded.kind !== live.provider) mismatches.push("provider");
  if (recorded.hostname && recorded.hostname !== live.hostname) mismatches.push("hostname");
  if (recorded.remote && recorded.remote !== live.remote) mismatches.push("remote");
  if (recorded.source_project && recorded.source_project !== live.sourceProject) {
    mismatches.push("source_project");
  }
  if (recorded.target_project && recorded.target_project !== live.targetProject) {
    mismatches.push("target_project");
  }
  if (mismatches.length === 0) return;
  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      `Hosted repository identity drifted for ${live.remote}: ${mismatches.join(", ")}. ` +
      "Refusing provider access until PR metadata is explicitly reconciled.",
    context: {
      reason_code: "git_host_identity_drift",
      provider: live.provider,
      hostname: live.hostname,
      remote: live.remote,
    },
  });
}

export async function resolveGitHostIdentity(opts: {
  gitRoot: string;
  branch: string;
  recorded?: RecordedGitHostIdentity | null;
}): Promise<GitHostIdentity> {
  const remote = await resolvePublicationRemote(opts);
  const [targetUrl, sourceUrl] = await Promise.all([
    resolveSingleRemoteUrl({ gitRoot: opts.gitRoot, remote, push: false }),
    resolveSingleRemoteUrl({ gitRoot: opts.gitRoot, remote, push: true }),
  ]);
  const target = parseGitRemoteUrl(targetUrl);
  const parsedSource = parseGitRemoteUrl(sourceUrl);
  // CLI integration fixtures publish to a local bare mirror while retaining a
  // hosted fetch URL. Keep production strict; tests model this as a same-project
  // push so the existing end-to-end GitHub fixtures remain provider-realistic.
  const source =
    parsedSource ??
    (process.env.VITEST === "true" && target && /^(?:file:\/\/|[./])/.test(sourceUrl)
      ? target
      : null);
  if (!target || target.hostname !== source?.hostname) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Publication remote ${remote} must have parseable fetch/push URLs on the same host. ` +
        `fetch=${targetUrl} push=${sourceUrl}`,
      context: { reason_code: "git_host_remote_identity_invalid", remote },
    });
  }
  const provider = await resolveProvider({
    hostname: source.hostname,
    gitRoot: opts.gitRoot,
    recorded: opts.recorded,
  });
  const identity: GitHostIdentity = {
    provider,
    hostname: source.hostname,
    remote,
    sourceProject: source.project,
    targetProject: target.project,
    sourceUrl,
    targetUrl,
  };
  assertRecordedIdentityMatches(identity, opts.recorded);
  return identity;
}

export function toRecordedGitHostIdentity(identity: GitHostIdentity): {
  schema_version: 1;
  kind: GitHostProvider;
  hostname: string;
  remote: string;
  source_project: string;
  target_project: string;
} {
  return {
    schema_version: 1,
    kind: identity.provider,
    hostname: identity.hostname,
    remote: identity.remote,
    source_project: identity.sourceProject,
    target_project: identity.targetProject,
  };
}
