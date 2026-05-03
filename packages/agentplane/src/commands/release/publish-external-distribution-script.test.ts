import { execFile } from "node:child_process";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/publish-external-distribution.mjs");
const tempRoots: string[] = [];

async function makeTempRoot() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-external-distribution-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("publish-external-distribution script", () => {
  it("records a skipped evidence file when the target repository token is missing", async () => {
    const root = await makeTempRoot();
    await mkdir(path.join(root, "source", "Formula"), { recursive: true });
    await writeFile(
      path.join(root, "source", "Formula", "agentplane.rb"),
      "class Agentplane\nend\n",
    );
    const outPath = path.join(root, "result.json");

    const { stdout } = await execFileAsync(
      "node",
      [
        SCRIPT_PATH,
        "--module",
        "homebrew",
        "--repo",
        "basilisk-labs/homebrew-tap",
        "--source",
        path.join(root, "source"),
        "--copy",
        "Formula/agentplane.rb:Formula/agentplane.rb",
        "--version",
        "0.4.1",
        "--tag",
        "v0.4.1",
        "--sha",
        "abc123",
        "--token-env",
        "AGENTPLANE_TEST_MISSING_TOKEN",
        "--out",
        outPath,
      ],
      {
        cwd: process.cwd(),
        env: { ...process.env, AGENTPLANE_TEST_MISSING_TOKEN: "" },
      },
    );

    const payload = JSON.parse(await readFile(outPath, "utf8")) as {
      module: string;
      repository: string;
      requiredSecret: string;
      status: string;
    };
    expect(stdout).toContain("homebrew external publish skipped_missing_credentials");
    expect(payload).toMatchObject({
      module: "homebrew",
      repository: "basilisk-labs/homebrew-tap",
      requiredSecret: "AGENTPLANE_TEST_MISSING_TOKEN",
      status: "skipped_missing_credentials",
    });
  });

  it("accepts repeated --copy arguments and prints JSON evidence", async () => {
    const root = await makeTempRoot();
    await mkdir(path.join(root, "source"), { recursive: true });
    await writeFile(path.join(root, "source", "action.yml"), "name: setup-agentplane\n");
    await writeFile(path.join(root, "source", "README.md"), "# setup-agentplane\n");
    const outPath = path.join(root, "result.json");

    const { stdout } = await execFileAsync(
      "node",
      [
        SCRIPT_PATH,
        "--module=setup-agentplane",
        "--repo=basilisk-labs/setup-agentplane",
        "--source",
        path.join(root, "source"),
        "--copy=action.yml:action.yml",
        "--copy",
        "README.md:README.md",
        "--version=0.4.1",
        "--tag=v0.4.1",
        "--sha=abc123",
        "--token-env=AGENTPLANE_TEST_MISSING_TOKEN",
        "--out",
        outPath,
        "--json",
      ],
      {
        cwd: process.cwd(),
        env: { ...process.env, AGENTPLANE_TEST_MISSING_TOKEN: "" },
      },
    );

    const stdoutPayload = JSON.parse(stdout) as { status: string; module: string };
    const filePayload = JSON.parse(await readFile(outPath, "utf8")) as {
      status: string;
      module: string;
    };
    expect(stdoutPayload).toMatchObject({
      module: "setup-agentplane",
      status: "skipped_missing_credentials",
    });
    expect(filePayload).toEqual(stdoutPayload);
  });

  it("opens the distribution PR even when optional repository metadata updates are denied", async () => {
    const root = await makeTempRoot();
    const binDir = path.join(root, "bin");
    const cloneLog = path.join(root, "clone.log");
    const gitLog = path.join(root, "git.log");
    await mkdir(path.join(root, "source", "Formula"), { recursive: true });
    await mkdir(binDir, { recursive: true });
    await writeFile(
      path.join(root, "source", "Formula", "agentplane.rb"),
      "class Agentplane\nend\n",
    );
    await writeFile(
      path.join(binDir, "gh"),
      [
        "#!/usr/bin/env node",
        "const fs = require('node:fs');",
        "const path = require('node:path');",
        "const args = process.argv.slice(2);",
        `fs.appendFileSync(${JSON.stringify(cloneLog)}, args.join(" ") + "\\n");`,
        "if (args[0] === 'repo' && args[1] === 'clone') { fs.mkdirSync(args[3], { recursive: true }); process.exit(0); }",
        "if (args[0] === 'auth') process.exit(0);",
        "if (args[0] === 'api' && args.includes('/repos/basilisk-labs/homebrew-tap/topics')) { console.error('gh: Resource not accessible by personal access token (HTTP 403)'); process.exit(1); }",
        "if (args[0] === 'api') process.exit(0);",
        "if (args[0] === 'pr' && args[1] === 'list') { process.stdout.write(''); process.exit(0); }",
        "if (args[0] === 'pr' && args[1] === 'create') { process.stdout.write('https://github.com/basilisk-labs/homebrew-tap/pull/7\\n'); process.exit(0); }",
        "console.error('unexpected gh ' + args.join(' '));",
        "process.exit(2);",
      ].join("\n"),
    );
    await writeFile(
      path.join(binDir, "git"),
      [
        "#!/usr/bin/env node",
        "const fs = require('node:fs');",
        "const args = process.argv.slice(2);",
        `fs.appendFileSync(${JSON.stringify(gitLog)}, args.join(" ") + "\\n");`,
        "if (args[0] === 'status') { process.stdout.write(' M Formula/agentplane.rb\\n'); process.exit(0); }",
        "process.exit(0);",
      ].join("\n"),
    );
    await chmod(path.join(binDir, "gh"), 0o755);
    await chmod(path.join(binDir, "git"), 0o755);
    const outPath = path.join(root, "result.json");

    const { stdout } = await execFileAsync(
      "node",
      [
        SCRIPT_PATH,
        "--module",
        "homebrew",
        "--repo",
        "basilisk-labs/homebrew-tap",
        "--source",
        path.join(root, "source"),
        "--copy",
        "Formula/agentplane.rb:Formula/agentplane.rb",
        "--repo-topics",
        "agentplane,homebrew",
        "--repo-description",
        "Homebrew tap for AgentPlane",
        "--version",
        "0.4.2",
        "--tag",
        "v0.4.2",
        "--sha",
        "abc123",
        "--token-env",
        "AGENTPLANE_TEST_TOKEN",
        "--out",
        outPath,
      ],
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          PATH: `${binDir}${path.delimiter}${process.env.PATH ?? ""}`,
          AGENTPLANE_TEST_TOKEN: "token",
        },
      },
    );

    const payload = JSON.parse(await readFile(outPath, "utf8")) as {
      status: string;
      prUrl: string;
      metadata: { ok: boolean; warnings: { target: string; reasonCode: string }[] };
    };
    expect(stdout).toContain("homebrew external publish pr_opened");
    expect(payload.status).toBe("pr_opened");
    expect(payload.prUrl).toBe("https://github.com/basilisk-labs/homebrew-tap/pull/7");
    expect(payload.metadata.ok).toBe(false);
    expect(payload.metadata.warnings).toContainEqual(
      expect.objectContaining({
        target: "topics",
        reasonCode: "external_metadata_permission_denied",
      }),
    );
  });
});
