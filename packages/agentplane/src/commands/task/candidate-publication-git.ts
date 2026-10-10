import { execFile } from "node:child_process";
import { constants } from "node:fs";
import { mkdtemp, open, readFile, rm, writeFile, chmod } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import type { CandidatePublicationRequest } from "./candidate-publication-request.js";

const run = promisify(execFile);
export type CandidateGitIdentity = Pick<
  CandidatePublicationRequest,
  "commit" | "candidate_ref" | "remote_url"
>;

/** The caller authenticates the request and authority. This port never selects or creates a commit. */
export function createCandidateGitPort(root: string) {
  const git = async (args: string[]) =>
    (
      await run("git", args, {
        cwd: root,
        encoding: "utf8",
        timeout: 120_000,
        maxBuffer: 1024 * 1024,
        env: {
          ...process.env,
          GIT_TERMINAL_PROMPT: "0",
          GIT_NO_REPLACE_OBJECTS: "1",
          GIT_OPTIONAL_LOCKS: "0",
        },
      })
    ).stdout;
  const validateRemote = async (identity: CandidateGitIdentity) => {
    const resolved = (await git(["ls-remote", "--get-url", identity.remote_url])).trim();
    if (resolved !== identity.remote_url)
      throw new Error("Candidate remote URL is rewritten by Git configuration");
  };
  return {
    async read(identity: CandidateGitIdentity): Promise<string | null> {
      await validateRemote(identity);
      const rows = (await git(["ls-remote", "--refs", identity.remote_url, identity.candidate_ref]))
        .trim()
        .split("\n")
        .filter(Boolean);
      if (rows.length === 0) return null;
      if (rows.length !== 1) throw new Error("Candidate remote returned ambiguous ref identity");
      const [head, ref] = rows[0]!.split(/\s+/u);
      if (ref !== identity.candidate_ref || !/^[a-f0-9]{40}(?:[a-f0-9]{24})?$/u.test(head ?? ""))
        throw new Error("Candidate remote returned invalid ref identity");
      return head!;
    },
    async create(identity: CandidateGitIdentity): Promise<void> {
      await validateRemote(identity);
      if (
        !/^[a-f0-9]{40}(?:[a-f0-9]{24})?$/u.test(identity.commit) ||
        !/^refs\/heads\/agentplane-candidates\/[A-Za-z0-9_-]+\/[a-f0-9]{40}(?:[a-f0-9]{24})?$/u.test(
          identity.candidate_ref,
        ) ||
        !identity.candidate_ref.endsWith(`/${identity.commit}`)
      )
        throw new Error("Invalid immutable candidate ref");
      const hook = path.resolve(
        root,
        (await git(["rev-parse", "--git-path", "hooks/pre-push"])).trim(),
      );
      let original: string | null = null;
      try {
        const handle = await open(hook, constants.O_RDONLY | constants.O_NOFOLLOW);
        try {
          const info = await handle.stat();
          if (!info.isFile()) throw new Error("Candidate pre-push hook must be a regular file");
          if ((info.mode & 0o111) !== 0) original = hook;
        } finally {
          await handle.close();
        }
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      }
      const common = path.resolve(root, (await git(["rev-parse", "--git-common-dir"])).trim());
      const directory = await mkdtemp(path.join(common, "candidate-push-"));
      const receipt = path.join(directory, "guard.json");
      const guard = path.join(directory, "pre-push");
      if (/\s/u.test(process.execPath))
        throw new Error("Candidate guard requires a whitespace-free Node executable path");
      const script =
        `#!${process.execPath}\n` +
        `const fs = require('node:fs'); const cp = require('node:child_process');\n` +
        `const expected = ${JSON.stringify(identity)}; const original = ${JSON.stringify(original)};\n` +
        `if (process.argv[3] !== expected.remote_url) process.exit(94);\n` +
        `const input = fs.readFileSync(0, 'utf8'); const rows = input.trim().split('\\n').filter(Boolean);\n` +
        `if (rows.length !== 1) process.exit(91);\n` +
        `const fields = rows[0].split(/\\s+/);\n` +
        `if (fields.length !== 4 || fields[1] !== expected.commit || fields[2] !== expected.candidate_ref || !/^0+$/.test(fields[3]) || fields[3].length !== expected.commit.length) process.exit(92);\n` +
        `if (original) { const r = cp.spawnSync(original, process.argv.slice(2), {input, stdio: ['pipe','inherit','inherit'], timeout:120000}); if (r.error || r.status !== 0) process.exit(r.status || 93); }\n` +
        `fs.writeFileSync(${JSON.stringify(receipt)}, JSON.stringify(expected), {flag:'wx', mode:0o600});\n`;
      try {
        await writeFile(guard, script, { mode: 0o700, flag: "wx" });
        await chmod(guard, 0o700);
        await git([
          "-c",
          `core.hooksPath=${directory}`,
          "-c",
          "push.followTags=false",
          "push",
          "--porcelain",
          "--no-follow-tags",
          "--recurse-submodules=no",
          identity.remote_url,
          `${identity.commit}:${identity.candidate_ref}`,
        ]);
        if ((await readFile(receipt, "utf8")) !== JSON.stringify(identity))
          throw new Error("Candidate push did not authenticate expected-absent remote ref");
      } finally {
        await rm(directory, { recursive: true, force: true });
      }
    },
  };
}
