import { execFile } from "node:child_process";

import { gitEnv } from "@agentplaneorg/core/git";

import { isDotEnvLoadedKey } from "../../../shared/env.js";

export function glabEnv(): NodeJS.ProcessEnv {
  const env = gitEnv();
  for (const key of ["GLAB_TOKEN", "GITLAB_TOKEN"] as const) {
    if (isDotEnvLoadedKey(key)) delete env[key];
    if (typeof process.env[key] === "string" && !isDotEnvLoadedKey(key)) {
      env[key] = process.env[key];
    }
  }
  if (typeof process.env.GLAB_CONFIG_DIR === "string") {
    env.GLAB_CONFIG_DIR = process.env.GLAB_CONFIG_DIR;
  }
  if (typeof process.env.XDG_CONFIG_HOME === "string") {
    env.XDG_CONFIG_HOME = process.env.XDG_CONFIG_HOME;
  }
  if (typeof process.env.HOME === "string") env.HOME = process.env.HOME;
  return env;
}

export function normalizeGlabTransportError(error: unknown): string {
  if (error instanceof Error && error.message.trim()) return error.message.trim();
  if (typeof error === "string") return error.trim();
  if (typeof error === "number" || typeof error === "boolean") return String(error);
  return "";
}

export async function runGlabCommand(opts: {
  cwd: string;
  args: string[];
}): Promise<{ stdout: string; stderr: string }> {
  return await new Promise((resolve, reject) => {
    execFile(
      "glab",
      opts.args,
      {
        cwd: opts.cwd,
        env: glabEnv(),
        encoding: "utf8",
        maxBuffer: 10 * 1024 * 1024,
      },
      (error, stdout, stderr) => {
        if (error) {
          const commandError =
            error instanceof Error ? error : new Error("glab command failed without an Error");
          Object.assign(commandError, { stdout, stderr });
          reject(commandError);
          return;
        }
        resolve({ stdout: String(stdout), stderr: String(stderr) });
      },
    );
  });
}

export async function runGlabApiJson<T>(opts: {
  cwd: string;
  hostname: string;
  endpoint: string;
  method?: "GET" | "POST" | "PUT";
  inputPath?: string;
}): Promise<T> {
  const args = ["api", "--hostname", opts.hostname, opts.endpoint];
  if (opts.method && opts.method !== "GET") args.push("--method", opts.method);
  if (opts.inputPath) args.push("--input", opts.inputPath);
  const result = await runGlabCommand({
    args,
    cwd: opts.cwd,
  });
  const stdout = String(result.stdout).trim();
  return (stdout ? JSON.parse(stdout) : {}) as T;
}

export async function runGlabApiNoOutput(opts: {
  cwd: string;
  hostname: string;
  endpoint: string;
  method: "POST" | "PUT";
  inputPath?: string;
}): Promise<void> {
  await runGlabApiJson(opts);
}
