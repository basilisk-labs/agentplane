import { execFile } from "node:child_process";
import { chmod, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/release/check-published-packages.mjs");
const roots: string[] = [];

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function npmFixture(successAttempt: number) {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-published-smoke-"));
  roots.push(root);
  const counter = path.join(root, "attempts");
  const executable = path.join(root, "npm");
  await writeFile(
    executable,
    [
      "#!/bin/sh",
      `counter=${JSON.stringify(counter)}`,
      'attempt=$(cat "$counter" 2>/dev/null || printf 0)',
      "attempt=$((attempt + 1))",
      'printf "%s" "$attempt" > "$counter"',
      `if [ "$attempt" -lt ${successAttempt} ]; then`,
      '  printf "package is being processed\\n" >&2',
      "  exit 1",
      "fi",
      'printf "9.9.9\\n"',
    ].join("\n"),
  );
  await chmod(executable, 0o755);
  return { root, counter };
}

describe("published package smoke script", () => {
  it("waits beyond the former eight-attempt npm processing window", async () => {
    const fixture = await npmFixture(10);
    const result = await execFileAsync("node", [SCRIPT_PATH, "--spec", "agentplane@9.9.9"], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        PATH: `${fixture.root}${path.delimiter}${process.env.PATH ?? ""}`,
        AGENTPLANE_PUBLISH_SMOKE_DELAY_MS: "0",
      },
    });

    expect(result.stdout).toContain("agentplane@9.9.9 is visible");
    expect(await readFile(fixture.counter, "utf8")).toBe("10");
  });

  it("rejects unbounded retry configuration", async () => {
    const fixture = await npmFixture(1);
    const failure = await execFileAsync("node", [SCRIPT_PATH, "--spec", "agentplane@9.9.9"], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        PATH: `${fixture.root}${path.delimiter}${process.env.PATH ?? ""}`,
        AGENTPLANE_PUBLISH_SMOKE_ATTEMPTS: "0",
        AGENTPLANE_PUBLISH_SMOKE_DELAY_MS: "0",
      },
    }).then(
      () => null,
      (error: unknown) => error,
    );
    const stderr =
      failure && typeof failure === "object" && "stderr" in failure ? String(failure.stderr) : "";
    expect(stderr).toContain("must be an integer between");
  });
});
