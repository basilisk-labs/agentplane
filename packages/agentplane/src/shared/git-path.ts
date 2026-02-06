import path from "node:path";

function normalizeGitPath(raw: string): string {
  let p = (raw ?? "").trim();
  if (!p) return "";

  // Git reports repo-relative POSIX paths. Allow user-provided prefixes to be Windows-y.
  p = p.replaceAll("\\", "/");

  while (p.startsWith("./")) p = p.slice(2);
  p = p.replaceAll(/\/{2,}/g, "/");
  p = p.replaceAll(/\/+$/g, "");
  p = p.replaceAll(/^\/+/g, "");
  return p;
}

export function normalizeGitPathPrefix(prefix: string): string {
  const raw = (prefix ?? "").trim();
  if (raw === "." || raw === "./" || raw === ".\\") return ".";
  return normalizeGitPath(raw);
}

export function gitPathIsUnderPrefix(candidate: string, prefix: string): boolean {
  const c = normalizeGitPath(candidate);
  const p = normalizeGitPathPrefix(prefix);

  if (p === "." || p === "") return true;
  if (c === p) return true;

  const rel = path.posix.relative(p, c);
  return rel === "" || (!rel.startsWith("..") && !path.posix.isAbsolute(rel));
}
