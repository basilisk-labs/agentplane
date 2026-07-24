import path from "node:path";

function normalizePosixGitPath(raw: string): string {
  let p = (raw ?? "").trim();
  if (!p) return "";

  while (p.startsWith("./")) p = p.slice(2);
  p = p.replaceAll(/\/{2,}/g, "/");
  p = p.replaceAll(/\/+$/g, "");
  p = p.replaceAll(/^\/+/g, "");
  return p;
}

export function normalizeGitPathCandidate(candidate: string): string {
  // Git reports repo-relative POSIX paths. On POSIX, a backslash is a literal
  // filename character and must never be promoted into a path separator.
  return normalizePosixGitPath(candidate);
}

export function normalizeGitPathPrefix(prefix: string): string {
  const raw = (prefix ?? "").trim();
  if (raw === "." || raw === "./" || raw === ".\\") return ".";
  // Policy prefixes are operator/config input, so accept Windows-style
  // separators before comparing them with Git's POSIX path surface.
  return normalizePosixGitPath(raw.replaceAll("\\", "/"));
}

function normalizedPathIsUnderPrefix(c: string, p: string): boolean {
  if (p === "." || p === "") return true;
  if (c === p) return true;

  const rel = path.posix.relative(p, c);
  return rel === "" || (!rel.startsWith("..") && !path.posix.isAbsolute(rel));
}

export function gitPathIsUnderPrefix(candidate: string, prefix: string): boolean {
  return normalizedPathIsUnderPrefix(
    normalizeGitPathCandidate(candidate),
    normalizeGitPathPrefix(prefix),
  );
}

export function gitPathPrefixIsUnderPrefix(candidatePrefix: string, prefix: string): boolean {
  return normalizedPathIsUnderPrefix(
    normalizeGitPathPrefix(candidatePrefix),
    normalizeGitPathPrefix(prefix),
  );
}
