import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts", "check-npm-version-availability.mjs");
const tempRoots: string[] = [];

async function makeTempRoot() {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-npm-version-availability-"));
  tempRoots.push(root);
  return root;
}

async function writeExecutable(root: string, relativePath: string, content: string) {
  const target = path.join(root, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, `${content}\n`, { encoding: "utf8", mode: 0o755 });
  return target;
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("check-npm-version-availability script", () => {
  it("fails explicitly when npm view hangs past the configured timeout", async () => {
    const root = await makeTempRoot();
    await mkdir(path.join(root, "packages", "core"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
    await writeFile(
      path.join(root, "packages", "core", "package.json"),
      JSON.stringify({ name: "@agentplaneorg/core", version: "0.2.7" }, null, 2) + "\n",
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "package.json"),
      JSON.stringify(
        { name: "agentplane", version: "0.2.7", dependencies: { "@agentplaneorg/core": "0.2.7" } },
        null,
        2,
      ) + "\n",
      "utf8",
    );

    await writeExecutable(
      root,
      "bin/npm",
      [
        "#!/usr/bin/env node",
        "setTimeout(() => {",
        "  process.stdout.write('late registry response\\n');",
        "}, 1_000);",
      ].join("\n"),
    );

    await expect(
      execFileAsync("node", [SCRIPT_PATH, "--version", "0.2.7"], {
        cwd: root,
        env: {
          ...process.env,
          PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}`,
          AGENTPLANE_NPM_VIEW_TIMEOUT_MS: "50",
        },
        maxBuffer: 10 * 1024 * 1024,
      }),
    ).rejects.toMatchObject({
      code: 1,
      stderr: expect.stringContaining(
        "npm view timed out for @agentplaneorg/core@0.2.7 after 50ms",
      ),
    });
  });
});
