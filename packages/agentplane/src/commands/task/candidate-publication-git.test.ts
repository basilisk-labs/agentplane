import { execFileSync } from "node:child_process";
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { createCandidateGitPort } from "./candidate-publication-git.js";

const roots: string[] = [];
afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});
function fixture() {
  const root = mkdtempSync(path.join(os.tmpdir(), "candidate-git-"));
  roots.push(root);
  const env = { ...process.env, GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: os.devNull };
  const git = (...args: string[]) =>
    execFileSync("git", args, {
      cwd: root,
      env,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  git("init", "--quiet");
  git("config", "user.name", "Fixture");
  git("config", "user.email", "fixture@example.invalid");
  writeFileSync(path.join(root, "file"), "base");
  git("add", "file");
  git("-c", `core.hooksPath=${os.devNull}`, "commit", "--quiet", "-m", "base");
  const base = git("rev-parse", "HEAD");
  writeFileSync(path.join(root, "file"), "candidate");
  git("add", "file");
  git("-c", `core.hooksPath=${os.devNull}`, "commit", "--quiet", "-m", "candidate");
  const commit = git("rev-parse", "HEAD");
  const remote = path.join(root, "remote.git");
  git("init", "--bare", "--quiet", remote);
  git("push", "--quiet", remote, `${base}:refs/heads/base`);
  const candidate_ref = `refs/heads/agentplane-candidates/fixture/${commit}`;
  const identity = { commit, candidate_ref, remote_url: remote };
  const hook = path.join(root, ".git", "hooks", "pre-push");
  const setHook = (body: string) => {
    writeFileSync(hook, `#!${process.execPath}\n${body}\n`);
    chmodSync(hook, 0o700);
  };
  return { root, git, base, remote, identity, setHook, port: createCandidateGitPort(root) };
}

describe.skipIf(process.platform === "win32")("candidate create-only Git port", () => {
  it("publishes exact immutable SHA and preserves the existing hook and unrelated dirty bytes", async () => {
    const f = fixture();
    const marker = path.join(f.root, "hook-input");
    f.setHook(
      `const fs=require('node:fs'); fs.writeFileSync(${JSON.stringify(marker)}, fs.readFileSync(0));`,
    );
    writeFileSync(path.join(f.root, "file"), "unrelated dirty bytes");
    expect(await f.port.read(f.identity)).toBeNull();
    await f.port.create(f.identity);
    expect(await f.port.read(f.identity)).toBe(f.identity.commit);
    expect(readFileSync(marker, "utf8")).toContain(`${f.identity.candidate_ref} ${"0".repeat(40)}`);
    expect(readFileSync(path.join(f.root, "file"), "utf8")).toBe("unrelated dirty bytes");
    expect(f.git("rev-parse", "HEAD")).toBe(f.identity.commit);
    expect(f.git("--git-dir", f.remote, "for-each-ref", "--format=%(refname)").split("\n")).toEqual(
      ["refs/heads/agentplane-candidates/fixture/" + f.identity.commit, "refs/heads/base"],
    );
  });
  it("retains a rejecting existing hook", async () => {
    const f = fixture();
    f.setHook("process.exit(17)");
    await expect(f.port.create(f.identity)).rejects.toThrow();
    expect(await f.port.read(f.identity)).toBeNull();
  });
  it("refuses an existing ancestor instead of silently fast-forwarding it", async () => {
    const f = fixture();
    f.git("--git-dir", f.remote, "update-ref", f.identity.candidate_ref, f.base);
    await expect(f.port.create(f.identity)).rejects.toThrow();
    expect(await f.port.read(f.identity)).toBe(f.base);
  });
  it("server compare rejects a race after advertised absence and before receive", async () => {
    const f = fixture();
    f.setHook(
      `require('node:child_process').execFileSync('git', ${JSON.stringify(["--git-dir", f.remote, "update-ref", f.identity.candidate_ref, f.base, "0".repeat(40)])});`,
    );
    await expect(f.port.create(f.identity)).rejects.toThrow();
    expect(await f.port.read(f.identity)).toBe(f.base);
  });
  it("rejects URL rewrite configuration before connecting or publishing", async () => {
    const f = fixture();
    f.git("config", `url.${f.remote}.insteadOf`, "https://example.invalid/repository.git");
    await expect(
      f.port.read({ ...f.identity, remote_url: "https://example.invalid/repository.git" }),
    ).rejects.toThrow("rewritten");
    expect(await f.port.read(f.identity)).toBeNull();
  });
});
