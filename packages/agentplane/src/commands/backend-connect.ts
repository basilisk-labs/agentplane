import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";

import { createCliEmitter } from "../cli/output.js";
import { mapBackendError } from "../cli/error-map.js";
import { CliError } from "../shared/errors.js";
import { resolveDotEnvRoot } from "../shared/env.js";
import { isRecord } from "../shared/guards.js";
import { loadCommandContext, type CommandContext } from "./shared/task-backend.js";

const output = createCliEmitter();

export type BackendConnectParsed = {
  backendId: string;
  endpoint: string | null;
  projectId: string | null;
  provider: string | null;
  token: string | null;
  yes: boolean;
  quiet: boolean;
};

export async function cmdBackendConnectParsed(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  flags: BackendConnectParsed;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    if (opts.flags.backendId !== "cloud") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "backend connect currently supports cloud only",
        context: { command: "backend connect", reason_code: "connect_backend_unsupported" },
      });
    }
    if (ctx.backendId !== "cloud") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Configured backend is "${ctx.backendId}", not "cloud"`,
        context: { command: "backend connect", reason_code: "connect_backend_mismatch" },
      });
    }
    await applyBackendConnectConfiguration({ ctx, flags: opts.flags });
    if (!opts.flags.quiet) {
      output.success(
        "backend connect",
        undefined,
        `backend=cloud endpoint=${opts.flags.endpoint ?? "unchanged"} project=${opts.flags.projectId ?? "unchanged"}`,
      );
      if (opts.flags.token) {
        output.line("stored AGENTPLANE_CLOUD_TOKEN in ignored project .env");
      } else {
        output.line("set AGENTPLANE_CLOUD_TOKEN in the environment or local secret store");
      }
      output.line("next: agentplane backend inspect cloud --yes");
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "backend connect", root: opts.rootOverride ?? null });
  }
}

async function applyBackendConnectConfiguration(opts: {
  ctx: CommandContext;
  flags: BackendConnectParsed;
}): Promise<void> {
  const current = await readBackendConfig(opts.ctx.backendConfigPath);
  const settings = isRecord(current.settings) ? current.settings : {};
  const next = {
    ...current,
    id: "cloud",
    version: typeof current.version === "number" ? current.version : 1,
    settings: {
      ...settings,
      ...(opts.flags.endpoint ? { endpoint: opts.flags.endpoint.replaceAll(/\/+$/gu, "") } : {}),
      ...(opts.flags.projectId ? { project_id: opts.flags.projectId } : {}),
      ...(opts.flags.provider ? { provider: opts.flags.provider } : {}),
    },
  };
  await writeFile(opts.ctx.backendConfigPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");

  if (opts.flags.token) {
    const envRoot = await resolveDotEnvRoot(opts.ctx.resolvedProject.gitRoot);
    await upsertDotEnvValues(path.join(envRoot, ".env"), {
      AGENTPLANE_CLOUD_TOKEN: opts.flags.token,
    });
  }
}

async function readBackendConfig(configPath: string): Promise<Record<string, unknown>> {
  try {
    const raw = JSON.parse(await readFile(configPath, "utf8")) as unknown;
    return isRecord(raw) ? raw : {};
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return {};
    throw err;
  }
}

async function upsertDotEnvValues(filePath: string, values: Record<string, string>): Promise<void> {
  let existing = "";
  try {
    existing = await readFile(filePath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code !== "ENOENT") throw err;
  }

  const pending = new Map(Object.entries(values));
  const lines = existing.split(/\r?\n/u);
  const nextLines = lines.map((line) => {
    const match = /^([A-Za-z_][A-Za-z0-9_]*)\s*=/u.exec(line);
    const key = match?.[1];
    if (!key || !pending.has(key)) return line;
    const value = pending.get(key) ?? "";
    pending.delete(key);
    return `${key}=${quoteDotEnvValue(value)}`;
  });

  if (nextLines.length > 0 && nextLines.at(-1) === "") {
    nextLines.pop();
  }
  for (const [key, value] of pending) {
    nextLines.push(`${key}=${quoteDotEnvValue(value)}`);
  }
  await writeFile(filePath, `${nextLines.join("\n")}\n`, "utf8");
}

function quoteDotEnvValue(value: string): string {
  if (/^[A-Za-z0-9_./:@+-]+$/u.test(value)) return value;
  return JSON.stringify(value);
}
