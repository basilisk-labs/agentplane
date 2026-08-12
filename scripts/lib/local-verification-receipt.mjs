import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";

function git(args, cwd) {
  try {
    return execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function digestFiles(changedFiles) {
  return createHash("sha256")
    .update([...new Set(changedFiles)].toSorted().join("\n"))
    .digest("hex");
}

function receiptPath(cwd) {
  const gitCommonDir = git(["rev-parse", "--git-common-dir"], cwd);
  if (!gitCommonDir) return "";
  return path.join(
    path.resolve(cwd, gitCommonDir),
    "agentplane",
    "local-verification-receipt.json",
  );
}

export function writeLocalVerificationReceipt({
  cwd = process.cwd(),
  mode,
  changedFiles,
  route,
  contractDigest,
}) {
  const headSha = git(["rev-parse", "HEAD"], cwd);
  const trackedStatus = git(["status", "--short", "--untracked-files=no"], cwd);
  const target = receiptPath(cwd);
  if (!target || !/^[0-9a-f]{40}$/u.test(headSha) || trackedStatus || changedFiles.length === 0) {
    return null;
  }
  const payload = {
    schema_version: 1,
    kind: "local_verification_receipt",
    ok: true,
    created_at: new Date().toISOString(),
    head_sha: headSha,
    mode,
    route,
    changed_files_digest: digestFiles(changedFiles),
    contract_digest: contractDigest,
  };
  mkdirSync(path.dirname(target), { recursive: true });
  const temporary = `${target}.${process.pid}.tmp`;
  writeFileSync(temporary, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  renameSync(temporary, target);
  return payload;
}

export function readReusableLocalVerificationReceipt({
  cwd = process.cwd(),
  mode,
  changedFiles,
  headShas,
}) {
  const target = receiptPath(cwd);
  if (!target || !existsSync(target)) return null;
  try {
    const payload = JSON.parse(readFileSync(target, "utf8"));
    const exactHeads = [
      ...new Set(headShas.filter((sha) => /^[0-9a-f]{40}$/u.test(sha))),
    ].toSorted();
    if (
      payload?.schema_version !== 1 ||
      payload?.kind !== "local_verification_receipt" ||
      payload?.ok !== true ||
      payload?.mode !== mode ||
      exactHeads.length !== 1 ||
      payload?.head_sha !== exactHeads[0] ||
      payload?.changed_files_digest !== digestFiles(changedFiles) ||
      git(["status", "--short", "--untracked-files=no"], cwd)
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
