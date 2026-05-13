import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { defineCheck, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";
import { assertReleaseParity } from "../lib/release-version-parity.mjs";

const execFileAsync = promisify(execFile);
const NPM_VIEW_TIMEOUT_MS = Number.parseInt(
  process.env.AGENTPLANE_NPM_VIEW_TIMEOUT_MS ?? "15000",
  10,
);

function parseArgs(argv) {
  const { flags } = parseScriptArgs(argv, { valueFlags: ["version"] });
  return { version: String(flags.version ?? "").trim() };
}

async function readVersion(pkgPath) {
  const raw = JSON.parse(await readFile(pkgPath, "utf8"));
  const version = typeof raw.version === "string" ? raw.version.trim() : "";
  if (!version) {
    throw new Error(`Missing version in ${pkgPath}`);
  }
  return version;
}

async function assertVersionAvailable(pkgName, version, cwd) {
  try {
    const { stdout } = await execFileAsync("npm", ["view", `${pkgName}@${version}`, "version"], {
      cwd,
      env: process.env,
      maxBuffer: 10 * 1024 * 1024,
      timeout: NPM_VIEW_TIMEOUT_MS,
    });
    const published = String(stdout ?? "").trim();
    if (published === version) {
      throw new Error(`Version already published: ${pkgName}@${version}`);
    }
    if (published.length > 0) {
      throw new Error(
        `Unexpected npm view output for ${pkgName}@${version}: ${JSON.stringify(published)}`,
      );
    }
  } catch (error) {
    const err = error;
    if (err?.code === "ETIMEDOUT" || err?.killed === true) {
      throw new Error(
        `npm view timed out for ${pkgName}@${version} after ${NPM_VIEW_TIMEOUT_MS}ms`,
      );
    }
    const text = `${String(err?.stdout ?? "")}\n${String(err?.stderr ?? "")}\n${String(err?.message ?? "")}`;
    if (/E404|404 Not Found|No match found for version|not in this registry/i.test(text)) {
      return;
    }
    throw error;
  }
}

const main = defineCheck({
  name: "check-npm-version-availability",
  parseArgs,
  async check({ options: args }) {
    const root = process.cwd();
    const corePkg = path.join(root, "packages", "core", "package.json");
    const coreVersion = await readVersion(corePkg);
    const version = args.version || coreVersion;
    // Availability checks can run before the version bump is applied.
    // Enforce local parity consistency, but do not require package.json to
    // already match the target release version.
    await assertReleaseParity(root);
    const pkgs = ["@agentplaneorg/core", "agentplane", "@agentplaneorg/recipes"];

    for (const name of pkgs) {
      await assertVersionAvailable(name, version, root);
    }

    process.stdout.write(`npm version availability check passed for ${version}\n`);
  },
});

runScriptMain(main);
