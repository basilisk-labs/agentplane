import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { defaultConfig, loadConfig } from "@agentplaneorg/core/config";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";
import { observeKernelRepository } from "../../runner/observation/kernel-repository.js";
import { resolveKernelPolicyBaseline } from "./kernel-policy-baseline.js";

installRunCliIntegrationHarness();

async function fixture() {
  const root = await mkGitRepoRootWithBranch("main");
  await configureGitUser(root);
  let config = defaultConfig();
  config.authority.mode = "manual";
  await writeConfig(root, config);
  const loaded = await loadConfig(path.join(root, ".agentplane"));
  config = loaded.config;
  await mkdir(path.join(root, ".agentplane/policy"), { recursive: true });
  await writeFile(path.join(root, ".agentplane/policy/local.md"), "Original policy\n");
  await commitAll(root, "seed policy fixture");
  const identity = k.kernelDigest("policy-repository");
  const observe = () =>
    observeKernelRepository({
      repository_root: root,
      repository_identity: identity,
      operational_paths: [],
    });
  const baseline = await observe();
  const directory = path.join(root, ".git/observations");
  await mkdir(directory, { recursive: true });
  await writeFile(
    path.join(directory, `${baseline.fingerprint.slice(7)}.json`),
    JSON.stringify(baseline),
  );
  const initial = await resolveKernelPolicyBaseline({
    root,
    observation_directory: directory,
    config,
    repository: baseline,
    items: [],
  });
  const requirements = {
    scope_roots: [".agentplane/WORKFLOW.md", ".agentplane/policy/local.md"],
    repository_effects: ["security_boundary"],
    external_effects: [],
    capabilities: [],
    resources: [],
  };
  const approved = {
    ...requirements,
    repository_identity: identity,
    repository_fingerprint: baseline.fingerprint,
    policy_digests: [initial.digest],
  } as k.ExecutionAuthority;
  const items = [{ id: "policy", execution_requirements: requirements }] as k.WorkItemDefinition[];
  const resolve = async (authority = approved, workItems = items) => {
    const loaded = await loadConfig(path.join(root, ".agentplane"));
    return resolveKernelPolicyBaseline({
      root,
      observation_directory: directory,
      config: loaded.config,
      repository: await observe(),
      approved: authority,
      items: workItems,
    });
  };
  const edit = async () => {
    const changed = structuredClone(config);
    changed.authority.mode = "all";
    changed.agents.approvals.require_verify = false;
    await writeConfig(root, changed);
    await writeFile(path.join(root, ".agentplane/policy/local.md"), "Updated policy\n");
  };
  return { root, config, directory, initial, approved, items, resolve, edit };
}

describe("canonical approved policy baseline", { timeout: 120_000 }, () => {
  it("keeps original configuration and digest across fresh invocations and a policy commit", async () => {
    const f = await fixture();
    await f.edit();
    const first = await f.resolve();
    expect(first.digest).toBe(f.initial.digest);
    expect(first.config).toEqual(f.config);
    await commitAll(f.root, "authorized policy edit");
    expect(await f.resolve()).toEqual(first);
    const loaded = await loadConfig(path.join(f.root, ".agentplane"));
    expect(loaded.config.authority.mode).toBe("all");
  });

  it.each([false, true])(
    "recovers a pre-snapshot task after interrupted commit (committed=%s)",
    async (committed) => {
      const f = await fixture();
      await rm(path.join(f.directory, "policies"), { recursive: true });
      await f.edit();
      if (committed) await commitAll(f.root, "interrupted policy completion");
      const resolved = await f.resolve();
      expect(resolved.config).toEqual(f.config);
      expect(await f.resolve()).toEqual({ digest: f.initial.digest, config: f.config });
    },
  );

  it("rejects missing security effects and scope even when the new config grants all operations", async () => {
    const f = await fixture();
    await f.edit();
    await expect(
      f.resolve({ ...f.approved, repository_effects: ["documentation"] }),
    ).rejects.toThrow("native_policy_changed");
    await expect(f.resolve({ ...f.approved, scope_roots: ["src"] })).rejects.toThrow(
      "native_policy_changed",
    );
    await expect(f.resolve(f.approved, [])).rejects.toThrow("native_policy_changed");
  });

  it("rejects additional policy drift outside the approved roots", async () => {
    const f = await fixture();
    await f.edit();
    await writeFile(path.join(f.root, ".agentplane/policy/unapproved.md"), "Unapproved\n");
    await expect(f.resolve()).rejects.toThrow("native_policy_changed");
  });

  it("rejects tampered snapshot evidence", async () => {
    const f = await fixture();
    await f.edit();
    const target = path.join(f.directory, "policies", `${f.initial.digest.slice(7)}.json`);
    const saved = JSON.parse(await readFile(target, "utf8")) as {
      config: { authority: { mode: string } };
    };
    saved.config.authority.mode = "all";
    await writeFile(target, JSON.stringify(saved));
    await expect(f.resolve()).rejects.toThrow("native_policy_changed");
  });
});
