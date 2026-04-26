import { execFile } from "node:child_process";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/check-knip-baseline.mjs");

const roots: string[] = [];

async function setupKnipFixture(report: unknown): Promise<{ root: string; baselinePath: string }> {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-knip-baseline-"));
  roots.push(root);
  const binDir = path.join(root, "node_modules", ".bin");
  await mkdir(binDir, { recursive: true });
  const knipPath = path.join(binDir, "knip");
  await writeFile(
    knipPath,
    [
      "#!/usr/bin/env node",
      `process.stdout.write(${JSON.stringify(`${JSON.stringify(report)}\n`)});`,
    ].join("\n"),
    "utf8",
  );
  await chmod(knipPath, 0o755);
  await writeFile(path.join(root, "knip.json"), "{}", "utf8");
  return { root, baselinePath: path.join(root, "knip-baseline.json") };
}

async function runScript(root: string, args: string[]) {
  return await execFileAsync("node", [SCRIPT_PATH, ...args], { cwd: root });
}

afterEach(async () => {
  while (roots.length > 0) {
    const root = roots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("check-knip-baseline script", () => {
  it("writes and checks a named JSON allowlist", async () => {
    const report = {
      issues: [
        {
          file: "src/example.ts",
          exports: [{ name: "unusedExport", line: 3, col: 17 }],
          types: [{ name: "UnusedType", line: 4, col: 13 }],
        },
      ],
    };
    const { root, baselinePath } = await setupKnipFixture(report);

    const update = await runScript(root, ["--baseline", baselinePath, "--update-baseline"]);
    expect(update.stdout).toContain("Knip unused-code baseline updated");

    const baseline = JSON.parse(await readFile(baselinePath, "utf8")) as {
      entries?: { file: string; exports?: { name: string }[]; types?: { name: string }[] }[];
    };
    expect(baseline.entries?.[0]?.file).toBe("src/example.ts");
    expect(baseline.entries?.[0]?.exports?.[0]?.name).toBe("unusedExport");
    expect(baseline.entries?.[0]?.types?.[0]?.name).toBe("UnusedType");

    const check = await runScript(root, ["--baseline", baselinePath]);
    expect(check.stdout).toContain("Knip unused-code baseline OK");
  });

  it("reports new entries by name", async () => {
    const { root, baselinePath } = await setupKnipFixture({
      issues: [
        {
          file: "src/example.ts",
          exports: [{ name: "allowedExport", line: 3, col: 17 }],
        },
      ],
    });
    await runScript(root, ["--baseline", baselinePath, "--update-baseline"]);

    await setupKnipFixture({
      issues: [
        {
          file: "src/example.ts",
          exports: [{ name: "newExport", line: 3, col: 17 }],
        },
      ],
    });
    const result = await execFileAsync("node", [SCRIPT_PATH, "--baseline", baselinePath], {
      cwd: roots.at(-1),
    }).catch((err: unknown) => err as { stderr: string });

    expect(result.stderr).toContain("New unused-code entries");
    expect(result.stderr).toContain("newExport");
    expect(result.stderr).toContain("Stale baseline entries");
    expect(result.stderr).toContain("allowedExport");
  });
});
