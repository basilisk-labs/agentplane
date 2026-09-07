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
  it.each([
    { module: "homebrew", tag: "v0.4.2" },
    { module: "setup-agentplane", tag: "v0.4.1" },
  ])(
    "rejects setup-tag repair for $module and $tag before using credentials",
    async ({ module, tag }) => {
      const root = await makeTempRoot();
      await expect(
        execFileAsync(
          "node",
          [
            SCRIPT_PATH,
            "--module",
            module,
            "--repo",
            "basilisk-labs/setup-agentplane",
            "--source",
            root,
            "--copy",
            "action.yml:action.yml",
            "--version",
            "0.4.2",
            "--tag",
            tag,
            "--sha",
            "abc123",
            "--token-env",
            "AGENTPLANE_TEST_MISSING_TOKEN",
            "--out",
            path.join(root, "result.json"),
            "--repair-existing-setup-tag",
          ],
          { env: { ...process.env, AGENTPLANE_TEST_MISSING_TOKEN: "" } },
        ),
      ).rejects.toThrow(
        "Setup tag repair requires the setup-agentplane module and its exact version tag",
      );
    },
  );

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

  it("merges and verifies the distribution PR even when optional repository metadata updates are denied", async () => {
    const root = await makeTempRoot();
    const binDir = path.join(root, "bin");
    const cloneLog = path.join(root, "clone.log");
    const originDir = path.join(root, "origin.git");
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
        "const { execFileSync } = require('node:child_process');",
        "const args = process.argv.slice(2);",
        `fs.appendFileSync(${JSON.stringify(cloneLog)}, args.join(" ") + String.fromCharCode(10));`,
        `const originDir = ${JSON.stringify(originDir)};`,
        "function git(gitArgs, cwd) { execFileSync('git', gitArgs, { cwd, stdio: 'ignore' }); }",
        [
          "if (args[0] === 'repo' && args[1] === 'clone') {",
          "  fs.rmSync(originDir, { recursive: true, force: true });",
          "  git(['init', '--bare', originDir]);",
          "  git(['clone', originDir, args[3]]);",
          "  git(['config', 'user.name', 'test'], args[3]);",
          "  git(['config', 'user.email', 'test@example.com'], args[3]);",
          "  git(['switch', '-c', 'main'], args[3]);",
          "  fs.mkdirSync(path.join(args[3], 'Formula'), { recursive: true });",
          "  fs.writeFileSync(path.join(args[3], 'Formula', 'agentplane.rb'), 'old formula' + String.fromCharCode(10));",
          "  git(['add', '.'], args[3]);",
          "  git(['commit', '-m', 'initial'], args[3]);",
          "  git(['push', '--set-upstream', 'origin', 'main'], args[3]);",
          "  process.exit(0);",
          "}",
        ].join("\n"),
        "if (args[0] === 'auth') process.exit(0);",
        "if (args[0] === 'api' && args.includes('/repos/basilisk-labs/homebrew-tap/topics')) { console.error('gh: Resource not accessible by personal access token (HTTP 403)'); process.exit(1); }",
        "if (args[0] === 'api') process.exit(0);",
        "if (args[0] === 'pr' && args[1] === 'list') { process.stdout.write(''); process.exit(0); }",
        "if (args[0] === 'pr' && args[1] === 'create') { process.stdout.write('https://github.com/basilisk-labs/homebrew-tap/pull/7' + String.fromCharCode(10)); process.exit(0); }",
        [
          "if (args[0] === 'pr' && args[1] === 'merge') {",
          "  git(['switch', 'main'], process.cwd());",
          "  git(['merge', '--ff-only', 'agentplane/v0.4.2'], process.cwd());",
          "  git(['push', 'origin', 'main'], process.cwd());",
          "  process.exit(0);",
          "}",
        ].join("\n"),
        "console.error('unexpected gh ' + args.join(' '));",
        "process.exit(2);",
      ].join("\n"),
    );
    await chmod(path.join(binDir, "gh"), 0o755);
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
      verification: { ok: boolean; branch: string; sha: string };
      metadata: { ok: boolean; warnings: { target: string; reasonCode: string }[] };
    };
    expect(stdout).toContain("homebrew external publish published");
    expect(payload.status).toBe("published");
    expect(payload.prUrl).toBe("https://github.com/basilisk-labs/homebrew-tap/pull/7");
    expect(payload.verification).toMatchObject({
      ok: true,
      branch: "main",
    });
    expect(payload.verification.sha).toMatch(/^[0-9a-f]{40}$/u);
    expect(payload.metadata.ok).toBe(false);
    expect(payload.metadata.warnings).toContainEqual(
      expect.objectContaining({
        target: "topics",
        reasonCode: "external_metadata_permission_denied",
      }),
    );
  }, 180_000);
  it("updates repository topics with a GitHub API JSON array payload", async () => {
    const root = await makeTempRoot();
    const binDir = path.join(root, "bin");
    const topicsPayloadLog = path.join(root, "topics-payload.json");
    await mkdir(path.join(root, "source", "bucket"), { recursive: true });
    await mkdir(binDir, { recursive: true });
    await writeFile(path.join(root, "source", "bucket", "agentplane.json"), "{}\n");
    await writeFile(
      path.join(binDir, "gh"),
      [
        "#!/usr/bin/env node",
        "const fs = require('node:fs');",
        "const args = process.argv.slice(2);",
        "if (args[0] === 'repo' && args[1] === 'clone') { fs.mkdirSync(args[3], { recursive: true }); process.exit(0); }",
        "if (args[0] === 'auth') process.exit(0);",
        "if (args[0] === 'api' && args.includes('/repos/basilisk-labs/scoop-bucket/topics')) {",
        "  const inputIndex = args.indexOf('--input');",
        "  if (inputIndex < 0) { console.error('missing --input'); process.exit(2); }",
        `  fs.copyFileSync(args[inputIndex + 1], ${JSON.stringify(topicsPayloadLog)});`,
        "  const payload = JSON.parse(fs.readFileSync(args[inputIndex + 1], 'utf8'));",
        "  if (!Array.isArray(payload.names)) { console.error('names is not an array'); process.exit(3); }",
        "  process.exit(0);",
        "}",
        "if (args[0] === 'api') process.exit(0);",
        "if (args[0] === 'pr' && args[1] === 'list') { process.stdout.write(''); process.exit(0); }",
        "if (args[0] === 'pr' && args[1] === 'create') { process.stdout.write('https://github.com/basilisk-labs/scoop-bucket/pull/7' + String.fromCharCode(10)); process.exit(0); }",
        "console.error('unexpected gh ' + args.join(' '));",
        "process.exit(2);",
      ].join("\n"),
    );
    await writeFile(
      path.join(binDir, "git"),
      [
        "#!/usr/bin/env node",
        "const args = process.argv.slice(2);",
        "if (args[0] === 'status') process.exit(0);",
        "process.exit(0);",
      ].join("\n"),
    );
    await chmod(path.join(binDir, "gh"), 0o755);
    await chmod(path.join(binDir, "git"), 0o755);
    const outPath = path.join(root, "result.json");

    await execFileAsync(
      "node",
      [
        SCRIPT_PATH,
        "--module",
        "scoop",
        "--repo",
        "basilisk-labs/scoop-bucket",
        "--source",
        path.join(root, "source"),
        "--copy",
        "bucket/agentplane.json:bucket/agentplane.json",
        "--repo-topics",
        "agentplane,scoop,windows,cli",
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
      metadata: { ok: boolean; updated: string[] };
    };
    const topicsPayload = JSON.parse(await readFile(topicsPayloadLog, "utf8")) as {
      names: string[];
    };
    expect(payload.metadata.ok).toBe(true);
    expect(payload.metadata.updated).toContain("topics");
    expect(topicsPayload.names).toEqual(["agentplane", "scoop", "windows", "cli"]);
  }, 180_000);

  it.each([
    {
      scenario: "creates a missing tag",
      stale: false,
      repair: false,
      race: false,
      status: "published",
    },
    {
      scenario: "refuses a stale tag by default",
      stale: true,
      repair: false,
      race: false,
      status: "tag_unverified",
    },
    {
      scenario: "repairs a stale tag explicitly",
      stale: true,
      repair: true,
      race: false,
      status: "published",
    },
    {
      scenario: "preserves a concurrently changed tag",
      stale: true,
      repair: true,
      race: true,
      status: "tag_unverified",
    },
  ])(
    "$scenario after publishing setup-agentplane",
    async ({ stale, repair, race, status }) => {
      const root = await makeTempRoot();
      const binDir = path.join(root, "bin");
      const originDir = path.join(root, "origin.git");
      await mkdir(path.join(root, "source"), { recursive: true });
      await mkdir(binDir, { recursive: true });
      await writeFile(path.join(root, "source", "action.yml"), "name: setup-agentplane\n");
      await writeFile(path.join(root, "source", "README.md"), "# setup-agentplane\n");
      await writeFile(
        path.join(binDir, "gh"),
        [
          "#!/usr/bin/env node",
          "const fs = require('node:fs');",
          "const path = require('node:path');",
          "const { execFileSync } = require('node:child_process');",
          "const args = process.argv.slice(2);",
          `const originDir = ${JSON.stringify(originDir)};`,
          "function git(gitArgs, cwd) { execFileSync('git', gitArgs, { cwd, stdio: 'ignore' }); }",
          [
            "if (args[0] === 'repo' && args[1] === 'clone') {",
            "  fs.rmSync(originDir, { recursive: true, force: true });",
            "  git(['init', '--bare', originDir]);",
            "  git(['clone', originDir, args[3]]);",
            "  git(['config', 'user.name', 'test'], args[3]);",
            "  git(['config', 'user.email', 'test@example.com'], args[3]);",
            "  git(['switch', '-c', 'main'], args[3]);",
            "  fs.writeFileSync(path.join(args[3], 'action.yml'), 'name: old setup-agentplane' + String.fromCharCode(10));",
            "  fs.writeFileSync(path.join(args[3], 'README.md'), '# old setup-agentplane' + String.fromCharCode(10));",
            "  git(['add', '.'], args[3]);",
            "  git(['commit', '-m', 'initial'], args[3]);",
            "  git(['push', '--set-upstream', 'origin', 'main'], args[3]);",
            ...(stale
              ? [
                  "  git(['tag', 'v0.4.2'], args[3]);",
                  "  git(['push', 'origin', 'refs/tags/v0.4.2'], args[3]);",
                ]
              : []),
            ...(race
              ? [
                  "  git(['switch', '-c', 'concurrent'], args[3]);",
                  "  git(['commit', '--allow-empty', '-m', 'concurrent tag target'], args[3]);",
                  "  git(['push', 'origin', 'concurrent'], args[3]);",
                  "  git(['switch', 'main'], args[3]);",
                ]
              : []),
            "  process.exit(0);",
            "}",
          ].join("\n"),
          "if (args[0] === 'auth') process.exit(0);",
          "if (args[0] === 'api') process.exit(0);",
          "if (args[0] === 'pr' && args[1] === 'list') { process.stdout.write(''); process.exit(0); }",
          "if (args[0] === 'pr' && args[1] === 'create') { process.stdout.write('https://github.com/basilisk-labs/setup-agentplane/pull/7' + String.fromCharCode(10)); process.exit(0); }",
          [
            "if (args[0] === 'pr' && args[1] === 'merge') {",
            "  git(['switch', 'main'], process.cwd());",
            "  git(['merge', '--ff-only', 'agentplane/v0.4.2'], process.cwd());",
            "  git(['push', 'origin', 'main'], process.cwd());",
            "  process.exit(0);",
            "}",
          ].join("\n"),
          "console.error('unexpected gh ' + args.join(' '));",
          "process.exit(2);",
        ].join("\n"),
      );
      await chmod(path.join(binDir, "gh"), 0o755);
      if (race) {
        await writeFile(
          path.join(binDir, "git"),
          [
            "#!/usr/bin/env node",
            "const { spawnSync } = require('node:child_process');",
            "const args = process.argv.slice(2);",
            `const env = { ...process.env, PATH: ${JSON.stringify(process.env.PATH ?? "")} };`,
            "const result = spawnSync('git', args, { env, encoding: 'utf8' });",
            "process.stdout.write(result.stdout || '');",
            "process.stderr.write(result.stderr || '');",
            "if (result.status === 0 && args[0] === 'ls-remote' && args.includes('refs/tags/v0.4.2')) {",
            `  const mutation = spawnSync('git', ['--git-dir', ${JSON.stringify(originDir)}, 'update-ref', 'refs/tags/v0.4.2', 'refs/heads/concurrent'], { env, encoding: 'utf8' });`,
            "  if (mutation.status !== 0) process.exit(mutation.status || 1);",
            "}",
            "process.exit(result.status ?? 1);",
          ].join("\n"),
        );
        await chmod(path.join(binDir, "git"), 0o755);
      }
      const outPath = path.join(root, "result.json");

      await execFileAsync(
        "node",
        [
          SCRIPT_PATH,
          "--module",
          "setup-agentplane",
          "--repo",
          "basilisk-labs/setup-agentplane",
          "--source",
          path.join(root, "source"),
          "--copy",
          "action.yml:action.yml",
          "--copy",
          "README.md:README.md",
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
          ...(repair ? ["--repair-existing-setup-tag"] : []),
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
        setupTag: { status: string; tag: string; sha: string };
      };
      expect(payload.status).toBe(status);
      expect(payload.setupTag).toMatchObject({
        status: status === "published" ? "published" : "failed",
        tag: "v0.4.2",
      });
      const { stdout: tagSha } = await execFileAsync("git", [
        "--git-dir",
        originDir,
        "rev-parse",
        "refs/tags/v0.4.2",
      ]);
      const expectedRef = race
        ? "refs/heads/concurrent"
        : status === "published"
          ? "refs/heads/main"
          : "refs/heads/main^";
      const { stdout: expectedSha } = await execFileAsync("git", [
        "--git-dir",
        originDir,
        "rev-parse",
        expectedRef,
      ]);
      expect(tagSha.trim()).toBe(expectedSha.trim());
      if (status === "published") expect(payload.setupTag.sha).toBe(tagSha.trim());
    },
    180_000,
  );

  it("verifies setup-agentplane tag proof when action files are unchanged", async () => {
    const root = await makeTempRoot();
    const binDir = path.join(root, "bin");
    await mkdir(path.join(root, "source"), { recursive: true });
    await mkdir(binDir, { recursive: true });
    await writeFile(path.join(root, "source", "action.yml"), "name: setup-agentplane\n");
    await writeFile(path.join(root, "source", "README.md"), "# setup-agentplane\n");
    await writeFile(
      path.join(binDir, "gh"),
      [
        "#!/usr/bin/env node",
        "const fs = require('node:fs');",
        "const path = require('node:path');",
        "const args = process.argv.slice(2);",
        "if (args[0] === 'repo' && args[1] === 'clone') {",
        "  fs.mkdirSync(args[3], { recursive: true });",
        "  fs.writeFileSync(path.join(args[3], 'action.yml'), 'name: setup-agentplane' + String.fromCharCode(10));",
        "  fs.writeFileSync(path.join(args[3], 'README.md'), '# setup-agentplane' + String.fromCharCode(10));",
        "  process.exit(0);",
        "}",
        "if (args[0] === 'auth') process.exit(0);",
        "if (args[0] === 'api') process.exit(0);",
        "console.error('unexpected gh ' + args.join(' '));",
        "process.exit(2);",
      ].join("\n"),
    );
    await writeFile(
      path.join(binDir, "git"),
      [
        "#!/usr/bin/env node",
        "const args = process.argv.slice(2);",
        "if (args[0] === 'status') process.exit(0);",
        "if (args[0] === 'rev-parse') { process.stdout.write('c'.repeat(40) + String.fromCharCode(10)); process.exit(0); }",
        "if (args[0] === 'ls-remote') { process.stdout.write('c'.repeat(40) + String.fromCharCode(9) + 'refs/tags/v0.4.2' + String.fromCharCode(10)); process.exit(0); }",
        "process.exit(0);",
      ].join("\n"),
    );
    await chmod(path.join(binDir, "gh"), 0o755);
    await chmod(path.join(binDir, "git"), 0o755);
    const outPath = path.join(root, "result.json");

    await execFileAsync(
      "node",
      [
        SCRIPT_PATH,
        "--module",
        "setup-agentplane",
        "--repo",
        "basilisk-labs/setup-agentplane",
        "--source",
        path.join(root, "source"),
        "--copy",
        "action.yml:action.yml",
        "--copy",
        "README.md:README.md",
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
      setupTag: { status: string; tag: string; sha: string };
    };
    expect(payload.status).toBe("unchanged");
    expect(payload.setupTag).toMatchObject({
      status: "published",
      tag: "v0.4.2",
      sha: "c".repeat(40),
    });
  }, 180_000);
});
