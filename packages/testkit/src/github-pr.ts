import { chmod, mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

type FakeGhHandle = {
  fakeBin: string;
  logPath: string;
};

async function writeFakeGhScript(dir: string, body: string): Promise<FakeGhHandle> {
  const scriptPath = path.join(dir, "fake-gh.mjs");
  const ghPath = path.join(dir, process.platform === "win32" ? "gh.cmd" : "gh");
  await writeFile(scriptPath, body, "utf8");
  if (process.platform === "win32") {
    await writeFile(ghPath, '@echo off\r\nnode "%~dp0\\fake-gh.mjs" %*\r\n', "utf8");
  } else {
    await writeFile(ghPath, '#!/bin/sh\nnode "$(dirname "$0")/fake-gh.mjs" "$@"\n', "utf8");
    await chmod(ghPath, 0o755);
  }
  return { fakeBin: dir, logPath: path.join(dir, "gh.log") };
}

export async function installFakeGhPrLookup(opts: {
  scenarioName: string;
  branch: string;
  state?: "open" | "closed";
  mergedAt?: string | null;
  mergeCommitSha?: string | null;
}): Promise<FakeGhHandle> {
  const fakeBin = path.join(
    os.tmpdir(),
    `agentplane-gh-pr-lookup-${Date.now()}-${opts.scenarioName}`,
  );
  await mkdir(fakeBin, { recursive: true });
  return await writeFakeGhScript(
    fakeBin,
    [
      'import fs from "node:fs";',
      "const args = process.argv.slice(2);",
      "const logPath = process.env.AGENTPLANE_GH_LOG;",
      "if (logPath) fs.appendFileSync(logPath, `${JSON.stringify(args)}\\n`);",
      'if (args[0] !== "api") { console.error("unexpected gh command"); process.exit(90); }',
      'const endpoint = args[1] ?? "";',
      'const [route, query = ""] = endpoint.split("?", 2);',
      "const params = new URLSearchParams(query);",
      `const expectedHead = ${JSON.stringify(`example:${opts.branch}`)};`,
      `const response = ${JSON.stringify([
        {
          number: 321,
          html_url: "https://github.com/example/repo/pull/321",
          state: opts.state ?? "open",
          merged_at: opts.mergedAt ?? null,
          merge_commit_sha: opts.mergeCommitSha ?? null,
          head: { sha: "remote-head-sha" },
          base: { ref: "main" },
        },
      ])};`,
      'if (route === "repos/example/repo/pulls" && params.get("head") === expectedHead) {',
      "  console.log(JSON.stringify(response));",
      "  process.exit(0);",
      "}",
      'console.log("[]");',
      "process.exit(0);",
      "",
    ].join("\n"),
  );
}

export async function installFakeGhPrApi(opts: {
  scenarioName: string;
  branch: string;
  existingResponse?: object[];
  createResponse: object;
  createError?: string;
  rejectEnvKey?: string;
  rejectEnvValue?: string;
}): Promise<FakeGhHandle> {
  const fakeBin = path.join(os.tmpdir(), `agentplane-gh-pr-api-${Date.now()}-${opts.scenarioName}`);
  await mkdir(fakeBin, { recursive: true });
  return await writeFakeGhScript(
    fakeBin,
    [
      'import fs from "node:fs";',
      "const args = process.argv.slice(2);",
      "const logPath = process.env.AGENTPLANE_GH_LOG;",
      "if (logPath) fs.appendFileSync(logPath, `${JSON.stringify(args)}\\n`);",
      `const rejectEnvKey = ${JSON.stringify(opts.rejectEnvKey ?? null)};`,
      `const rejectEnvValue = ${JSON.stringify(opts.rejectEnvValue ?? null)};`,
      "if (rejectEnvKey && process.env[rejectEnvKey] === rejectEnvValue) {",
      "  console.error(`unexpected env ${rejectEnvKey}`);",
      "  process.exit(1);",
      "}",
      'if (args[0] !== "api") { console.error("unexpected gh command"); process.exit(90); }',
      'const endpoint = args[1] ?? "";',
      'const [route, query = ""] = endpoint.split("?", 2);',
      "const params = new URLSearchParams(query);",
      `const expectedHead = ${JSON.stringify(`example:${opts.branch}`)};`,
      `const existingResponse = ${JSON.stringify(opts.existingResponse ?? [])};`,
      `const createResponse = ${JSON.stringify(opts.createResponse)};`,
      `const createError = ${JSON.stringify(opts.createError ?? null)};`,
      'let method = "GET";',
      "for (let i = 2; i < args.length; i += 1) {",
      '  if (args[i] === "-X" && typeof args[i + 1] === "string") method = String(args[i + 1]).toUpperCase();',
      "}",
      'if (route === "repos/example/repo/pulls" && method === "GET" && params.get("head") === expectedHead) {',
      "  console.log(JSON.stringify(existingResponse));",
      "  process.exit(0);",
      "}",
      'if (route === "repos/example/repo/pulls" && method === "POST") {',
      "  if (createError) {",
      "    console.error(createError);",
      "    process.exit(1);",
      "  }",
      "  console.log(JSON.stringify(createResponse));",
      "  process.exit(0);",
      "}",
      'console.log("[]");',
      "process.exit(0);",
      "",
    ].join("\n"),
  );
}

export async function installFakeGhPrApiRequiringPublishedPacketHead(opts: {
  scenarioName: string;
  branch: string;
  packetCommitSubject: string;
  publishRemote: string;
}): Promise<FakeGhHandle> {
  const fakeBin = path.join(
    os.tmpdir(),
    `agentplane-gh-pr-api-head-${Date.now()}-${opts.scenarioName}`,
  );
  await mkdir(fakeBin, { recursive: true });
  return await writeFakeGhScript(
    fakeBin,
    [
      'import fs from "node:fs";',
      'import { execFileSync } from "node:child_process";',
      "const args = process.argv.slice(2);",
      "const logPath = process.env.AGENTPLANE_GH_LOG;",
      "if (logPath) fs.appendFileSync(logPath, `${JSON.stringify(args)}\\n`);",
      'if (args[0] !== "api") { console.error("unexpected gh command"); process.exit(90); }',
      'const endpoint = args[1] ?? "";',
      'const [route, query = ""] = endpoint.split("?", 2);',
      "const params = new URLSearchParams(query);",
      `const expectedHead = ${JSON.stringify(`example:${opts.branch}`)};`,
      `const requiredSubject = ${JSON.stringify(opts.packetCommitSubject)};`,
      `const publishRemote = ${JSON.stringify(opts.publishRemote)};`,
      'let method = "GET";',
      "for (let i = 2; i < args.length; i += 1) {",
      '  if (args[i] === "-X" && typeof args[i + 1] === "string") method = String(args[i + 1]).toUpperCase();',
      "}",
      'if (route === "repos/example/repo/pulls" && method === "GET" && params.get("head") === expectedHead) {',
      '  console.log("[]");',
      "  process.exit(0);",
      "}",
      'if (route === "repos/example/repo/pulls" && method === "POST") {',
      '  const subject = execFileSync("git", ["log", "-1", "--pretty=%s"], { cwd: process.cwd(), encoding: "utf8" }).trim();',
      '  const localHead = execFileSync("git", ["rev-parse", "HEAD"], { cwd: process.cwd(), encoding: "utf8" }).trim();',
      '  const publishBranch = expectedHead.split(":", 2)[1];',
      '  const remoteHeadRaw = execFileSync("git", ["ls-remote", "--heads", publishRemote, `refs/heads/${publishBranch}`], { cwd: process.cwd(), encoding: "utf8" }).trim();',
      String.raw`  const remoteHead = remoteHeadRaw.length > 0 ? remoteHeadRaw.split(/\s+/, 1)[0] : "";`,
      "  if (logPath) fs.appendFileSync(logPath, `${JSON.stringify({ subject, localHead, remoteHead, publishBranch })}\\n`);",
      "  if (subject !== requiredSubject || remoteHead !== localHead) {",
      `    console.error(${JSON.stringify('gh: HTTP 422: Validation Failed ({"message":"Validation Failed","errors":[{"resource":"PullRequest","field":"head","code":"invalid","message":"Head sha can\'t be blank"}]})')});`,
      "    process.exit(1);",
      "  }",
      `  console.log(${JSON.stringify(
        JSON.stringify({
          number: 888,
          html_url: "https://github.com/example/repo/pull/888",
          state: "open",
          merged_at: null,
          merge_commit_sha: null,
          head: { sha: "remote-head-sha" },
          base: { ref: "main" },
        }),
      )});`,
      "  process.exit(0);",
      "}",
      'console.log("[]");',
      "process.exit(0);",
      "",
    ].join("\n"),
  );
}
