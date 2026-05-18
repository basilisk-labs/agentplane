import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { parseScriptArgs } from "../lib/script-runtime.mjs";

const ROOT = process.cwd();
const PACKAGES = ["@agentplaneorg/core", "@agentplaneorg/recipes", "agentplane"];

function run(cmd, args) {
  try {
    const stdout = execFileSync(cmd, args, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    }).trim();
    return { ok: true, stdout };
  } catch (error) {
    return {
      ok: false,
      stdout: String(error?.stdout ?? "").trim(),
      stderr: String(error?.stderr ?? error?.message ?? "").trim(),
    };
  }
}

function readVersion() {
  return run("node", [
    "-p",
    "JSON.parse(require('node:fs').readFileSync('packages/agentplane/package.json','utf8')).version",
  ]).stdout;
}

function main() {
  const { flags } = parseScriptArgs(process.argv.slice(2), {
    valueFlags: ["version", "out"],
    booleanFlags: ["json"],
  });
  const version = String(flags.version ?? readVersion()).trim();
  if (!version) throw new Error("missing release version");
  const tag = `v${version}`;
  const outPath = path.resolve(
    ROOT,
    String(flags.out ?? `.agentplane/.release/evidence/${tag}.json`),
  );
  const evidence = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    version,
    tag,
    git: {
      head: run("git", ["rev-parse", "HEAD"]),
      remote_tag: run("git", ["ls-remote", "--tags", "origin", tag]),
    },
    npm: PACKAGES.map((name) => ({
      name,
      result: run("npm", ["view", `${name}@${version}`, "version"]),
    })),
    github_release: run("gh", [
      "release",
      "view",
      tag,
      "--json",
      "tagName,name,url,isDraft,isPrerelease",
    ]),
    publish_result: {
      path: ".agentplane/.release/publish/publish-result.json",
      exists: existsSync(path.join(ROOT, ".agentplane/.release/publish/publish-result.json")),
    },
    postpublish_audit: run("bun", [
      "run",
      "release:postpublish:audit",
      "--",
      "--publish-result",
      ".agentplane/.release/publish/publish-result.json",
    ]),
  };

  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");

  if (flags.json === true) {
    process.stdout.write(`${JSON.stringify(evidence, null, 2)}\n`);
    return;
  }
  process.stdout.write(`release evidence: ${path.relative(ROOT, outPath)}\n`);
}

try {
  main();
} catch (error) {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
