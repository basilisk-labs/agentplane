import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { afterEach, expect, it } from "vitest";
import { describeCritical } from "@agentplane/testkit";

type Lock = {
  workspaces: Record<
    string,
    {
      version: string;
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    }
  >;
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
  const current = readFileSync(path.join(process.cwd(), "bun.lock"));
  const approved = parseReplayJsonc(subject.toString("utf8"));
  const actual = parseReplayJsonc(current.toString("utf8"));
  for (const name of ["@typescript/native", "typescript", "vitest", "@vitest/coverage-v8"]) {
    approved.workspaces[""].devDependencies[name] = actual.workspaces[""].devDependencies[name];
  }
  for (const [name, value] of Object.entries(actual.packages)) {
    if (
      name === "@typescript/native" ||
      name.startsWith("@typescript/typescript-") ||
      name === "vitest" ||
      [
        "coverage-v8",
        "expect",
        "mocker",
        "pretty-format",
        "runner",
        "snapshot",
        "spy",
        "utils",
      ].some((suffix) => name === `@vitest/${suffix}`)
    )
      approved.packages[name] = value;
  }
  for (const relative of ["packages/agentplane", "packages/core", "packages/recipes"])
    approved.workspaces[relative].version = "0.7.13";
  approved.workspaces["packages/agentplane"].dependencies["@agentplaneorg/core"] = "0.7.13";
  approved.workspaces["packages/agentplane"].dependencies["@agentplaneorg/recipes"] = "0.7.13";
  approved.workspaces["packages/testkit"].dependencies["@agentplaneorg/core"] = "0.7.13";
  const driver = Buffer.from(JSON.stringify(approved, null, 2));
  expect(() => assertAnchorLockCompatible(subject, current)).toThrow("ANCHOR_LOCK_MISMATCH");
  return { subject, driver, assertAnchorLockCompatible, parseReplayJsonc };
}

describeCritical("critical: frozen replay security lock projection", () => {
  it("accepts only the frozen toolchain and coherent workspace release lock deltas", async () => {
    const {
      subject: subjectLock,
      driver: driverLock,
      assertAnchorLockCompatible,
      parseReplayJsonc,
    } = await lockFixture();
    expect(() => assertAnchorLockCompatible(subjectLock, driverLock)).not.toThrow();
    const tampered = Buffer.from(
      driverLock
        .toString("utf8")
        .replace(
          '"@typescript/native": "npm:typescript@7.0.2"',
          '"@typescript/native": "npm:typescript@7.0.1"',
        ),
    );
    expect(() => assertAnchorLockCompatible(subjectLock, tampered)).toThrow("ANCHOR_LOCK_MISMATCH");

    const incoherentLock = parseReplayJsonc(driverLock.toString("utf8"));
    const dependencies = incoherentLock.workspaces["packages/agentplane"].dependencies;
    expect(dependencies["@agentplaneorg/core"]).toBe(
      incoherentLock.workspaces["packages/core"].version,
    );
    dependencies["@agentplaneorg/core"] = "0.0.0-incoherent";
    const incoherentRelease = Buffer.from(JSON.stringify(incoherentLock));
    expect(() => assertAnchorLockCompatible(subjectLock, incoherentRelease)).toThrow(
      "ANCHOR_LOCK_MISMATCH",
    );
  });

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

const temporaryRoots: string[] = [];
afterEach(() => {
  for (const root of temporaryRoots.splice(0)) rmSync(root, { recursive: true, force: true });
});

async function isolatedFixture() {
  const root = mkdtempSync(path.join(tmpdir(), "anchor-dependencies-"));
  temporaryRoots.push(root);
  const subject = path.join(root, "subject");
  const driver = path.join(root, "driver");
  const store = path.join(driver, "node_modules/.bun");
  mkdirSync(store, { recursive: true });
  const write = (file: string, value: unknown) => {
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, JSON.stringify(value));
  };
  const workspaces = {
    "": { name: "fixture", devDependencies: { tsup: "1.0.0", typescript: "1.0.0" } },
    "packages/agentplane": { name: "agentplane", dependencies: { example: "1.0.0" } },
    "packages/core": { name: "@agentplaneorg/core", dependencies: {} },
  };
  const packages: Record<string, unknown[]> = {};
  for (const [name, dependencies] of [
    ["tsup", {}],
    ["typescript", {}],
    ["example", { child: "1.0.0" }],
    ["child", {}],
  ] as const) {
    const payload = { name, version: "1.0.0", dependencies };
    packages[name] = [`${name}@1.0.0`, "", { dependencies }, "sha512-fixture"];
    write(path.join(store, `${name}@1.0.0/node_modules`, name, "package.json"), payload);
  }
  for (const [relative, manifest] of Object.entries(workspaces)) {
    write(path.join(subject, relative, "package.json"), manifest);
    mkdirSync(path.join(subject, relative, "node_modules"), { recursive: true });
  }
  const lock = { workspaces, packages };
  const saveLock = () => write(path.join(subject, "bun.lock"), lock);
  saveLock();
  const module = await importModule<{
    prepareIsolatedAnchorDependencies: (
      subject: string,
      driver: string,
      repository?: string,
    ) => {
      mode: string;
      anchor_dependency_claim: Record<string, unknown>;
      assertUnchanged: () => void;
    };
  }>("scripts/bench/internal/agent-efficiency-anchor-dependencies.mjs");
  const prepare = () => module.prepareIsolatedAnchorDependencies(subject, driver, root);
  return { root, subject, driver, store, lock, saveLock, write, prepare };
}

describeCritical("critical: isolated frozen anchor dependencies", () => {
  it("selects frozen versions, isolates edges and captures a stable separate receipt", async () => {
    const f = await isolatedFixture();
    f.write(path.join(f.store, "example@2.0.0/node_modules/example/package.json"), {
      name: "example",
      version: "2.0.0",
    });
    const prepared = f.prepare();
    expect(prepared.mode).toBe("isolated_frozen_lock_v1");
    expect(prepared.anchor_dependency_claim.capture_executable_sha256).toMatch(/^sha256:/);
    const selected = realpathSync(path.join(f.subject, "packages/agentplane/node_modules/example"));
    expect(selected.startsWith(path.join(f.subject, "node_modules"))).toBe(true);
    expect(JSON.parse(readFileSync(path.join(selected, "package.json"), "utf8"))).toMatchObject({
      version: "1.0.0",
    });
    expect(() => prepared.assertUnchanged()).not.toThrow();
  });
  it("uses nested frozen edges and skips only incompatible optional platform packages", async () => {
    const f = await isolatedFixture();
    const nested = { name: "child", version: "2.0.0", dependencies: {} };
    f.write(path.join(f.store, "child@2.0.0/node_modules/child/package.json"), nested);
    f.lock.packages["example/child"] = ["child@2.0.0", "", { dependencies: {} }, "sha512-fixture"];
    const example = {
      name: "example",
      version: "1.0.0",
      dependencies: { child: "2.0.0" },
      optionalDependencies: { "other-platform": "1.0.0", "host-platform": "1.0.0" },
    };
    f.write(path.join(f.store, "example@1.0.0/node_modules/example/package.json"), example);
    f.lock.packages.example[2] = {
      dependencies: example.dependencies,
      optionalDependencies: example.optionalDependencies,
    };
    f.lock.packages["other-platform"] = [
      "other-platform@1.0.0",
      "",
      { os: [process.platform === "win32" ? "linux" : "win32"] },
      "sha512-fixture",
    ];
    f.lock.packages["host-platform"] = [
      "host-platform@1.0.0",
      "",
      { os: process.platform, cpu: process.arch },
      "sha512-fixture",
    ];
    f.write(path.join(f.store, "host-platform@1.0.0/node_modules/host-platform/package.json"), {
      name: "host-platform",
      version: "1.0.0",
      os: [process.platform],
      cpu: [process.arch],
    });
    f.saveLock();
    const prepared = f.prepare();
    const selected = realpathSync(path.join(f.subject, "packages/agentplane/node_modules/example"));
    const child = realpathSync(path.join(path.dirname(selected), "child"));
    expect(JSON.parse(readFileSync(path.join(child, "package.json"), "utf8"))).toMatchObject({
      version: "2.0.0",
    });
    expect(() => realpathSync(path.join(path.dirname(selected), "other-platform"))).toThrow();
    expect(realpathSync(path.join(path.dirname(selected), "host-platform"))).toContain(
      path.join(f.subject, "node_modules"),
    );
    expect(() => prepared.assertUnchanged()).not.toThrow();
    prepared.anchor_dependency_claim.capture_receipt_sha256 = `sha256:${"0".repeat(64)}`;
    expect(() => prepared.assertUnchanged()).toThrow("ANCHOR_DEPENDENCY_RECEIPT");
  });
  it("supports repository-contained shared module stores without current-driver fallback", async () => {
    const f = await isolatedFixture();
    const shared = path.join(f.root, "shared-modules");
    renameSync(path.join(f.driver, "node_modules"), shared);
    symlinkSync(shared, path.join(f.driver, "node_modules"));
    expect(() => f.prepare().assertUnchanged()).not.toThrow();
  });
  it("rejects omitted optional dependencies available only through an ancestor checkout", async () => {
    const f = await isolatedFixture();
    const optionalDependencies = { absent: "1.0.0" };
    f.write(path.join(f.store, "example@1.0.0/node_modules/example/package.json"), {
      name: "example",
      version: "1.0.0",
      dependencies: { child: "1.0.0" },
      optionalDependencies,
    });
    f.lock.packages.example[2] = { dependencies: { child: "1.0.0" }, optionalDependencies };
    f.saveLock();
    f.write(path.join(f.root, "node_modules/absent/package.json"), {
      name: "absent",
      version: "2.0.0",
    });
    expect(() => f.prepare()).toThrow("ANCHOR_DEPENDENCY_FALLBACK");
  });
  it.each([
    "missing",
    "wrong-version",
    "altered-edge",
    "ambiguous",
    "escape",
    "missing-transitive",
  ])("rejects %s without driver fallback", async (kind) => {
    const f = await isolatedFixture();
    const file = path.join(f.store, "example@1.0.0/node_modules/example/package.json");
    if (kind === "missing") rmSync(path.dirname(file), { recursive: true });
    if (kind === "wrong-version") f.write(file, { name: "example", version: "2.0.0" });
    if (kind === "altered-edge")
      f.write(file, { name: "example", version: "1.0.0", dependencies: { child: "2.0.0" } });
    if (kind === "ambiguous")
      f.write(path.join(f.store, "example@1.0.0+other/node_modules/example/package.json"), {
        name: "example",
        version: "1.0.0",
        dependencies: { child: "1.0.0" },
        extra: true,
      });
    if (kind === "escape") {
      rmSync(path.dirname(file), { recursive: true });
      const outside = path.join(f.root, "outside");
      f.write(path.join(outside, "package.json"), { name: "example", version: "1.0.0" });
      symlinkSync(outside, path.dirname(file));
    }
    if (kind === "missing-transitive")
      rmSync(path.join(f.store, "child@1.0.0"), { recursive: true });
    expect(() => f.prepare()).toThrow("ANCHOR_DEPENDENCY_");
  });
  it.each(["source", "materialized", "edge", "lock"])(
    "rejects %s drift after capture",
    async (kind) => {
      const f = await isolatedFixture();
      const prepared = f.prepare();
      const selected = realpathSync(
        path.join(f.subject, "packages/agentplane/node_modules/example"),
      );
      if (kind === "source")
        writeFileSync(path.join(f.store, "example@1.0.0/node_modules/example/new.js"), "changed");
      if (kind === "materialized") writeFileSync(path.join(selected, "new.js"), "changed");
      if (kind === "edge") {
        const edge = path.join(path.dirname(selected), "child");
        rmSync(edge);
        symlinkSync(selected, edge);
      }
      if (kind === "lock") {
        f.lock.packages.child[3] = "changed";
        f.saveLock();
      }
      expect(() => prepared.assertUnchanged()).toThrow();
    },
  );
});
