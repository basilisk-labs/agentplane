import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { expect, it } from "vitest";
import { describeCritical } from "@agentplane/testkit";

type Lock = {
  workspaces: Record<string, { devDependencies: Record<string, string> }>;
  packages: Record<string, unknown[]>;
};

async function importModule<T>(relativePath: string): Promise<T> {
  return (await import(pathToFileURL(path.join(process.cwd(), relativePath)).href)) as T;
}

async function lockFixture() {
  const { REPLAY_ANCHOR_COMMIT } = await importModule<{ REPLAY_ANCHOR_COMMIT: string }>(
    "scripts/lib/agent-efficiency-replay.mjs",
  );
  const { assertAnchorLockCompatible } = await importModule<{
    assertAnchorLockCompatible: (subject: Buffer, driver: Buffer) => void;
  }>("scripts/bench/internal/agent-efficiency-anchor-runtime.mjs");
  const { parseReplayJsonc } = await importModule<{
    parseReplayJsonc: (input: string) => Lock;
  }>("scripts/bench/internal/agent-efficiency-dependency-manifest.mjs");
  const subject = execFileSync("git", ["show", `${REPLAY_ANCHOR_COMMIT}:bun.lock`]);
  const driver = readFileSync(path.join(process.cwd(), "bun.lock"));
  return { subject, driver, assertAnchorLockCompatible, parseReplayJsonc };
}

describeCritical("critical: frozen replay security lock projection", () => {
  it("accepts the exact patched graph without changing either lock", async () => {
    const { subject, driver, assertAnchorLockCompatible } = await lockFixture();
    const beforeSubject = Buffer.from(subject);
    const beforeDriver = Buffer.from(driver);
    expect(() => assertAnchorLockCompatible(subject, driver)).not.toThrow();
    expect(subject).toEqual(beforeSubject);
    expect(driver).toEqual(beforeDriver);
    expect(() => assertAnchorLockCompatible(subject, subject)).not.toThrow();
  });

  it.each([
    ["root version", (lock: Lock) => (lock.workspaces[""].devDependencies.vitest = "4.1.12")],
    [
      "partial pin",
      (lock: Lock) => (lock.workspaces[""].devDependencies["@vitest/coverage-v8"] = "4.1.9"),
    ],
    [
      "package version",
      (lock: Lock) => (lock.packages["@vitest/mocker"][0] = "@vitest/mocker@4.1.12"),
    ],
    ["integrity", (lock: Lock) => (lock.packages["@vitest/mocker"][3] = "sha512-tampered")],
    ["registry", (lock: Lock) => (lock.packages.vitest[1] = "https://invalid.example/vitest.tgz")],
    [
      "metadata",
      (lock: Lock) => (lock.packages.vitest[2] = { dependencies: { malicious: "1.0.0" } }),
    ],
    ["unrelated package", (lock: Lock) => (lock.packages.vite[3] = "sha512-tampered")],
    [
      "additional package",
      (lock: Lock) => (lock.packages["@vitest/extra"] = ["@vitest/extra@4.1.11", "", {}]),
    ],
    ["missing package", (lock: Lock) => delete lock.packages["@vitest/spy"]],
  ] as const)("rejects a changed %s", async (_label, mutate) => {
    const { subject, driver, assertAnchorLockCompatible, parseReplayJsonc } = await lockFixture();
    const changed = parseReplayJsonc(driver.toString("utf8"));
    mutate(changed);
    expect(() => assertAnchorLockCompatible(subject, Buffer.from(JSON.stringify(changed)))).toThrow(
      "ANCHOR_LOCK_MISMATCH",
    );
  });

  it("rejects tampering with the historical package graph", async () => {
    const { subject, driver, assertAnchorLockCompatible, parseReplayJsonc } = await lockFixture();
    const changed = parseReplayJsonc(subject.toString("utf8"));
    changed.packages["@vitest/mocker"][3] = "sha512-tampered";
    expect(() => assertAnchorLockCompatible(Buffer.from(JSON.stringify(changed)), driver)).toThrow(
      "ANCHOR_LOCK_MISMATCH",
    );
  });
});
