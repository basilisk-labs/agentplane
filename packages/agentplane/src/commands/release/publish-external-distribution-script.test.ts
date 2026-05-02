import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
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
});
