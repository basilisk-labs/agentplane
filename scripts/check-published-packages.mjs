import { readFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const MAX_ATTEMPTS = Number.parseInt(process.env.AGENTPLANE_PUBLISH_SMOKE_ATTEMPTS ?? "8", 10);
const DELAY_MS = Number.parseInt(process.env.AGENTPLANE_PUBLISH_SMOKE_DELAY_MS ?? "5000", 10);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readPackageInfo(packageJsonPath) {
  const raw = await readFile(packageJsonPath, "utf8");
  const parsed = JSON.parse(raw);
  return { name: parsed.name, version: parsed.version };
}

function parseSpecs(argv) {
  const specs = [];
  for (let idx = 0; idx < argv.length; idx += 1) {
    const token = argv[idx];
    if (token !== "--spec") continue;
    const value = argv[idx + 1];
    if (!value) throw new Error("Missing value for --spec");
    const at = value.lastIndexOf("@");
    if (at <= 0 || at === value.length - 1) {
      throw new Error(`Invalid --spec '${value}'. Expected <name>@<version>.`);
    }
    specs.push({ name: value.slice(0, at), version: value.slice(at + 1) });
    idx += 1;
  }
  return specs;
}

function npmViewVersion(spec) {
  return new Promise((resolve, reject) => {
    const child = spawn("npm", ["view", spec, "version"], {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(
          new Error(stderr.trim() || `npm view failed for ${spec} (exit ${code ?? "unknown"})`),
        );
      }
    });
  });
}

async function assertPublished(name, version) {
  const spec = `${name}@${version}`;
  let lastError = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const reported = await npmViewVersion(spec);
      if (reported === version) {
        process.stdout.write(`ok: ${spec} is visible in npm registry\n`);
        return;
      }
      lastError = new Error(`npm returned version '${reported}' for ${spec}`);
    } catch (error) {
      lastError = error;
    }

    if (attempt < MAX_ATTEMPTS) {
      process.stdout.write(
        `retry ${attempt}/${MAX_ATTEMPTS}: ${spec} not visible yet; waiting ${DELAY_MS}ms\n`,
      );
      await sleep(DELAY_MS);
    }
  }

  throw new Error(
    `publish smoke failed for ${spec}: ${lastError instanceof Error ? lastError.message : String(lastError)}`,
  );
}

async function main() {
  const specs = parseSpecs(process.argv.slice(2));
  const targets =
    specs.length > 0
      ? specs
      : [
          await readPackageInfo(path.join(ROOT, "packages", "core", "package.json")),
          await readPackageInfo(path.join(ROOT, "packages", "agentplane", "package.json")),
        ];

  for (const target of targets) {
    await assertPublished(target.name, target.version);
  }
}

main().catch((error) => {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
