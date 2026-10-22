import type * as FsPromises from "node:fs/promises";
import { mkGitRepoRoot } from "@agentplane/testkit";
import { readFile, rename, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, expect, it, vi } from "vitest";
import { runDirectTaskVerification } from "./direct-task-verification.js";
import { verificationImplementationIdentity } from "./direct-task-verification-observation.js";
import { observationDigest } from "./verification-observation.js";

const opening = vi.hoisted(() => ({
  afterOpen: undefined as undefined | ((file: unknown) => Promise<void>),
}));
vi.mock("node:fs/promises", async (importOriginal) => {
  const original = await importOriginal<typeof FsPromises>();
  return {
    ...original,
    open: async (...args: Parameters<typeof original.open>) => {
      const handle = await original.open(...args);
      await opening.afterOpen?.(args[0]);
      return handle;
    },
  };
});

const roots: string[] = [];
afterEach(async () => {
  opening.afterOpen = undefined;
  for (const root of roots.splice(0)) await rm(root, { recursive: true, force: true });
});

it("streams native check evidence separately and retains it across retries", async () => {
  const root = await mkGitRepoRoot();
  roots.push(root);
  await writeFile(
    path.join(root, "check.mjs"),
    'console.log(process.env.AGENTPLANE_VERIFICATION_IMPLEMENTATION); console.error("EARLY FAILURE\\n" + "wrapper\\n".repeat(2000)); process.exit(1);',
  );
  const options = {
    command: {
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      resolvedProject: { gitRoot: root },
    } as never,
    cwd: root,
    task_id: "202610100440-WK8124",
    task: { verify: ["node check.mjs"] },
  };
  const first = await runDirectTaskVerification(options);
  expect(first.status).toBe("failed");
  const childIdentity = JSON.parse(first.checks[0]!.stdout_tail) as Record<string, unknown>;
  expect(childIdentity.untracked_inventory_digest).toEqual(expect.stringMatching(/^sha256:/u));
  expect(childIdentity.untracked_inventory).toBeUndefined();
  expect(first.checks[0]!.stdout_tail.length).toBeLessThan(1024);
  expect(first.checks[0]?.stderr_tail.length).toBeLessThanOrEqual(4000);
  const reference = first.checks[0]!.observation!;
  expect(reference.status).toBe("retained");
  const retained = await readFile(reference.manifest_path!, "utf8");
  expect(observationDigest(retained)).toBe(reference.digest);
  const log = await readFile(
    path.join(path.dirname(reference.manifest_path!), "stderr.jsonl"),
    "utf8",
  );
  expect(log).toContain("EARLY FAILURE");
  expect(log.length).toBeGreaterThan(4000);
  const firstManifest = JSON.parse(retained) as {
    binding: { implementation: { untracked_inventory: { path: string; digest: string }[] } };
  };
  const firstIdentity = firstManifest.binding.implementation.untracked_inventory.find(
    (entry) => entry.path === "check.mjs",
  );
  expect(firstIdentity?.digest).toBe(
    observationDigest(await readFile(path.join(root, "check.mjs"))),
  );
  await writeFile(
    path.join(root, "check.mjs"),
    "// changed implementation\n" + (await readFile(path.join(root, "check.mjs"), "utf8")),
  );
  const second = await runDirectTaskVerification(options);
  const secondManifest = JSON.parse(
    await readFile(second.checks[0]!.observation!.manifest_path!, "utf8"),
  ) as typeof firstManifest;
  expect(
    secondManifest.binding.implementation.untracked_inventory.find(
      (entry) => entry.path === "check.mjs",
    )?.digest,
  ).not.toBe(firstIdentity?.digest);
  expect(second.checks[0]!.observation!.manifest_path).not.toBe(reference.manifest_path);
  expect(await readFile(reference.manifest_path!, "utf8")).toBe(retained);
  const finalPacket = JSON.stringify(second);
  expect(finalPacket).toContain('"status":"failed"');
});

it("exposes a silent native child before completion without a second validation", async () => {
  const root = await mkGitRepoRoot();
  roots.push(root);
  await writeFile(
    path.join(root, "silent.mjs"),
    "import { existsSync } from 'node:fs'; const timer=setInterval(()=>{ if(existsSync('finish')) { clearInterval(timer); } },20);",
  );
  const running = runDirectTaskVerification({
    command: {
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      resolvedProject: { gitRoot: root },
    } as never,
    cwd: root,
    task_id: "202610100440-WK8124",
    task: { verify: ["node silent.mjs"] },
  });
  const statusPath = path.join(
    root,
    ".agentplane/tasks/202610100440-WK8124/supervision/verification-runs/run-000/status.json",
  );
  try {
    await vi.waitFor(
      async () => {
        const status = JSON.parse(await readFile(statusPath, "utf8")) as {
          state: string;
          success: boolean;
          deadline_ms: number;
          started_at_ms: number;
        };
        expect(status.state).toBe("running");
        expect(status.success).toBe(false);
        expect(status.deadline_ms).toBeGreaterThan(status.started_at_ms);
      },
      { timeout: 10_000 },
    );
  } finally {
    await writeFile(path.join(root, "finish"), "done");
  }
  const result = await running;
  expect(result.status).toBe("passed");
});

it("does not bind symlinks or files replaced after descriptor acquisition", async () => {
  const root = await mkGitRepoRoot();
  roots.push(root);
  const candidate = path.join(root, "candidate.txt");
  await writeFile(candidate, "original");
  await symlink(candidate, path.join(root, "alias.txt"), "file");
  opening.afterOpen = async (file) => {
    if (file !== candidate) return;
    opening.afterOpen = undefined;
    await rename(candidate, path.join(root, "displaced.txt"));
    await writeFile(candidate, "replacement");
  };
  const identity = await verificationImplementationIdentity(root, ".agentplane/tasks");
  expect(identity.untracked_inventory).toContainEqual({ path: "candidate.txt", unavailable: true });
  expect(identity.untracked_inventory).toContainEqual({ path: "alias.txt", unavailable: true });
});
