import { execFile } from "node:child_process";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const scriptPath = fileURLToPath(
  new URL("../../../../scripts/check-no-console.mjs", import.meta.url),
);

describe("check-no-console script", () => {
  it("fails when production TypeScript adds console usage above the configured baseline", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-no-console-"));
    const srcDir = path.join(root, "packages", "core", "src");
    await mkdir(srcDir, { recursive: true });
    await writeFile(
      path.join(srcDir, "production.ts"),
      "export function warn(): void {\n  console.warn('do not ship');\n}\n",
      "utf8",
    );

    let stderr = "";
    try {
      await execFileAsync(process.execPath, [scriptPath, "--root", root, "--max", "0"]);
    } catch (error) {
      if (typeof error === "object" && error !== null && "stderr" in error) {
        stderr = String(error.stderr);
      }
    }
    expect(stderr).toContain("production console usage baseline exceeded: count=1, max=0");
  });

  it("ignores tests and spec files", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-no-console-"));
    const srcDir = path.join(root, "packages", "core", "src");
    await mkdir(srcDir, { recursive: true });
    await writeFile(path.join(srcDir, "unit.test.ts"), "console.warn('test only');\n", "utf8");
    await writeFile(path.join(srcDir, "command.spec.ts"), "console.warn('spec only');\n", "utf8");

    const result = await execFileAsync(process.execPath, [scriptPath, "--root", root, "--max", "0"]);
    expect(result.stdout).toContain("production console usage OK (count=0, max=0)");
  });
});
