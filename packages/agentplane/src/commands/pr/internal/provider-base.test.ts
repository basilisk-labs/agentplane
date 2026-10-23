import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";
import { cleanGitEnv } from "@agentplane/testkit/cli-core-pr-flow";

import type { GitHostIdentity } from "./git-host-identity.js";
import { resolveProviderBaseBranch } from "./provider-base.js";

const exec = promisify(execFile);
const roots: string[] = [];
afterEach(async () => {
  for (const root of roots.splice(0)) await rm(root, { recursive: true, force: true });
});

async function fixture(provider: "github" | "gitlab" = "github") {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-exact-base-"));
  roots.push(root);
  const git = async (...args: string[]) => {
    const result = await exec("git", args, { cwd: root, env: cleanGitEnv() });
    return result.stdout.trim();
  };
  await git("init", "-b", "main");
  await git("config", "user.name", "Test");
  await git("config", "user.email", "test@example.invalid");
  await git("config", "agentplane.baseBranch", "main");
  await git("commit", "--allow-empty", "-m", "seed");
  const sha = await git("rev-parse", "HEAD");
  const target = path.join(root, "target.git");
  await git("init", "--bare", target);
  await git("remote", "add", "upstream", target);
  await git("push", "upstream", "main");
  const identity: GitHostIdentity = {
    provider,
    hostname: provider === "github" ? "github.com" : "gitlab.com",
    remote: "upstream",
    sourceProject: "fork/project",
    targetProject: "owner/project",
    sourceUrl: "https://github.com/fork/project.git",
    targetUrl: target,
  };
  const opts = { gitRoot: root, baseRef: sha, baseSha: sha, identity };
  return { git, root, target, sha, opts };
}

describe("exact-SHA provider base", () => {
  it.each(["github", "gitlab"] as const)(
    "maps matching %s heads without changing the frozen base",
    async (provider) => {
      const { git, sha, opts } = await fixture(provider);
      await git("update-ref", "-d", "refs/remotes/upstream/main");
      await expect(resolveProviderBaseBranch(opts)).resolves.toBe("main");
      expect(opts.baseRef).toBe(sha);
      expect(opts.baseSha).toBe(sha);
      await expect(
        resolveProviderBaseBranch({
          ...opts,
          baseRef: sha.toUpperCase(),
          baseSha: sha.toUpperCase(),
        }),
      ).resolves.toBe("main");
    },
  );

  it("leaves named and empty bases unchanged without looking up any remote", async () => {
    const { opts } = await fixture();
    const offline = { ...opts, identity: { ...opts.identity, targetUrl: "/missing-target" } };
    await expect(resolveProviderBaseBranch({ ...offline, baseRef: "main" })).resolves.toBe("main");
    await expect(resolveProviderBaseBranch({ ...offline, baseRef: null })).resolves.toBeNull();
  });

  it("rejects mismatched frozen evidence and non-branch configuration", async () => {
    const { git, sha, opts } = await fixture();
    await expect(resolveProviderBaseBranch({ ...opts, baseSha: null })).rejects.toThrow(
      "inconsistent",
    );
    await expect(resolveProviderBaseBranch({ ...opts, baseSha: "f".repeat(40) })).rejects.toThrow(
      "inconsistent",
    );
    await git("config", "agentplane.baseBranch", sha);
    await expect(resolveProviderBaseBranch(opts)).rejects.toThrow(
      "configured provider base branch",
    );
  });

  it("rejects missing live evidence even with a matching stale tracking ref", async () => {
    const { git, target, opts } = await fixture();
    await git("--git-dir", target, "update-ref", "-d", "refs/heads/main");
    await expect(resolveProviderBaseBranch(opts)).rejects.toThrow("live provider evidence");
  });

  it("rejects local drift and a moved provider base", async () => {
    const { git, opts } = await fixture();
    await git("commit", "--allow-empty", "-m", "base moved");
    await expect(resolveProviderBaseBranch(opts)).rejects.toThrow("ambiguous");
    await git("push", "upstream", "main");
    await expect(resolveProviderBaseBranch(opts)).rejects.toThrow("does not match");
  });

  it("rejects remote drift despite stale matching local and tracking refs", async () => {
    const { git, sha, opts } = await fixture();
    await git("commit", "--allow-empty", "-m", "provider moved");
    await git("push", "upstream", "main");
    await git("update-ref", "refs/heads/main", sha);
    await git("update-ref", "refs/remotes/upstream/main", sha);
    await expect(resolveProviderBaseBranch(opts)).rejects.toThrow("ambiguous");
  });
});
