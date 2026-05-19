/* eslint-disable @typescript-eslint/no-unused-vars, unicorn/consistent-function-scoping, unicorn/no-array-sort */
import { lstatSync, existsSync } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

export { isRecord } from "../shared/guards.js";

export type ScopeName = "wiki" | "facts" | "graph" | "tasks" | "capabilities" | "tasks-acr" | "raw";

type ParsedSourceRef = {
  path: string;
  selectors: Record<string, string>;
};

const MAX_SNIPPET_LINES = 16;

export function parseSourceRef(raw: string): ParsedSourceRef {
  const hashIndex = raw.indexOf("#");
  if (hashIndex === -1) {
    return { path: raw, selectors: {} };
  }
  const base = raw.slice(0, hashIndex);
  const selectorText = raw.slice(hashIndex + 1);
  const selectors: Record<string, string> = {};
  if (!selectorText) return { path: base, selectors };

  const pairs = selectorText.split("&");
  for (const pair of pairs) {
    const [rawKey, rawValue] = pair.split("=");
    if (!rawKey || rawValue === undefined) continue;
    const key = decodeURIComponent(rawKey.trim());
    selectors[key] = decodeURIComponent(rawValue.trim());
  }
  return { path: base, selectors };
}

export function toPosix(p: string): string {
  return p.split(path.sep).join("/");
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath);
    return true;
  } catch (err) {
    if ((err as { code?: string } | null)?.code === "ENOENT") return false;
    throw err;
  }
}

export async function readText(filePath: string): Promise<string> {
  return await readFile(filePath, "utf8");
}

export async function collectMatchingFiles(root: string, relPath: string): Promise<string[]> {
  const abs = path.join(root, relPath);
  const out: string[] = [];
  const stack: string[] = [abs];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    const stats = await stat(current);
    if (stats.isDirectory()) {
      const entries = await readdir(current, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(current, entry.name);
        if (entry.isDirectory()) {
          if (entry.name === ".git") continue;
          stack.push(full);
        } else {
          out.push(toPosix(path.relative(root, full)));
        }
      }
      continue;
    }
    if (stats.isFile()) {
      out.push(toPosix(path.relative(root, current)));
    }
  }
  return out;
}

export function normalizeScopeList(scopeValue: string): ScopeName[] {
  const defaultScope: ScopeName[] = ["wiki", "facts", "graph", "capabilities"];
  if (!scopeValue.trim()) return defaultScope;
  const scopes = scopeValue
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean)
    .flatMap((part) => {
      if (part === "context" || part === "curated") return defaultScope;
      if (part === "capabilities") return "capabilities" as const;
      if (part === "capability") return "capabilities" as const;
      if (part === "facts" || part === "fact" || part === "claims") return "facts" as const;
      if (part === "graph" || part === "entities" || part === "entity") return "graph" as const;
      if (part === "tasks") return "tasks" as const;
      if (part === "tasks-acr" || part === "acr" || part === "acrs") return "tasks-acr" as const;
      if (part === "wiki") return "wiki" as const;
      if (part === "raw") return "raw" as const;
      if (part === "all") return [...defaultScope, "raw", "tasks", "tasks-acr"] as const;
      return "raw" as const;
    });
  return [...new Set(scopes)];
}

export function pathMatchesScopes(rowPath: string, scopes: ScopeName[]): boolean {
  return scopes.some((scope) => {
    switch (scope) {
      case "wiki": {
        return rowPath.startsWith("context/wiki/");
      }
      case "facts": {
        return rowPath.startsWith(".agentplane/context/derived/facts/");
      }
      case "graph": {
        return rowPath.startsWith(".agentplane/context/derived/graph/");
      }
      case "tasks": {
        return rowPath.startsWith(".agentplane/tasks/");
      }
      case "tasks-acr": {
        return rowPath.startsWith(".agentplane/tasks/") && rowPath.includes("/acr.json");
      }
      case "capabilities": {
        return (
          rowPath.startsWith("context/capabilities/") ||
          rowPath.startsWith(".agentplane/context/derived/capabilities/")
        );
      }
      case "raw": {
        return rowPath.startsWith("context/raw/") && !rowPath.startsWith("context/raw/private/");
      }
      default: {
        return false;
      }
    }
  });
}

function scopeToFiles(root: string, scope: ScopeName): string[] {
  const paths: string[] = [];
  switch (scope) {
    case "wiki": {
      paths.push("context/wiki");
      break;
    }
    case "facts": {
      paths.push(".agentplane/context/derived/facts/facts.jsonl");
      break;
    }
    case "graph": {
      paths.push(
        ".agentplane/context/derived/graph/entities.jsonl",
        ".agentplane/context/derived/graph/edges.jsonl",
        ".agentplane/context/derived/graph/provenance_edges.jsonl",
      );
      break;
    }
    case "tasks": {
      paths.push(".agentplane/tasks");
      break;
    }
    case "capabilities": {
      paths.push(
        "context/capabilities",
        ".agentplane/context/derived/capabilities/capabilities.jsonl",
      );
      break;
    }
    case "tasks-acr": {
      paths.push(".agentplane/tasks");
      break;
    }
    case "raw": {
      paths.push("context/raw");
      break;
    }
    default: {
      paths.push("context/wiki");
    }
  }
  return paths.flatMap((p) => collectSafeFilePaths(root, p));
}

function collectSafeFilePaths(root: string, relPath: string): string[] {
  const target = path.join(root, relPath);
  if (!existsSync(target)) {
    return [toPosix(relPath)];
  }
  const st = lstatSync(target);
  if (st.isDirectory()) return [toPosix(relPath)];
  return [toPosix(relPath)];
}

export async function walkScopeFiles(root: string, scopes: ScopeName[]): Promise<string[]> {
  const files = new Set<string>();
  for (const scope of scopes) {
    const mapped = scopeToFiles(root, scope);
    for (const item of mapped) {
      const abs = path.join(root, item);
      if (await fileExists(abs)) {
        const stats = await stat(abs);
        if (stats.isDirectory()) {
          const discovered = await collectMatchingFiles(root, item);
          for (const discoveredPath of discovered) {
            if (!pathMatchesScopes(discoveredPath, scopes)) continue;
            files.add(discoveredPath);
          }
        } else {
          if (!pathMatchesScopes(item, scopes)) continue;
          files.add(item);
        }
      }
    }
  }
  return [...files.values()].sort();
}

export function parseLineRange(selector: string | undefined): [number, number] | null {
  if (!selector) return null;
  if (/^\d+$/u.test(selector)) {
    const line = Number(selector);
    return Number.isFinite(line) && line > 0 ? [line, line] : null;
  }
  const m = /^(\d+)-(\d+)$/u.exec(selector);
  if (!m) return null;
  const start = Number(m[1]);
  const end = Number(m[2]);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return null;
  return [start, end];
}

export function locateMarkdownSection(
  text: string,
  section: string,
): { start: number; end: number } | null {
  const lines = text.split(/\r?\n/);
  const slug = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/gu, "-")
      .replaceAll(/^-+|-+$/gu, "");
  const target = slug(section);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!/^#{1,6}\s+/.test(line)) continue;
    const heading = line.replace(/^#{1,6}\s+/, "").trim();
    if (slug(heading) === target) {
      const start = index + 1;
      let end = lines.length;
      for (let i = index + 1; i < lines.length; i += 1) {
        if (/^#{1,6}\s+/.test(lines[i] ?? "")) {
          end = i;
          break;
        }
      }
      return { start: start + 1, end };
    }
  }
  return null;
}

export function buildSnippet(lines: string[], start: number, end: number): string {
  const from = Math.max(1, start);
  const to = Math.max(from, Math.min(lines.length, end));
  return lines
    .slice(from - 1, to)
    .join("\n")
    .trim();
}

export function scoreMatch(text: string, query: string): number {
  const haystack = text.toLowerCase();
  const needle = query.toLowerCase();
  if (!needle.trim()) return 0;
  let count = 0;
  let idx = 0;
  while (idx !== -1) {
    idx = haystack.indexOf(needle, idx + 1);
    if (idx >= 0) count += 1;
  }
  return Math.min(1, count * 0.1 + 0.1);
}

export function parseJsonlLines(raw: string): { id?: string; [key: string]: unknown }[] {
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  return lines
    .map((line) => {
      try {
        return JSON.parse(line) as { id?: string; [key: string]: unknown };
      } catch {
        return null;
      }
    })
    .filter((row): row is { id?: string; [key: string]: unknown } => row !== null);
}
