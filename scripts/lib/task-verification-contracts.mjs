import { readFileSync } from "node:fs";
import path from "node:path";

const REPOSITORY_EFFECTS = new Set([
  "repository_write",
  "documentation",
  "source_code",
  "tests",
  "public_api",
  "schema",
  "dependencies",
  "ci",
  "release_metadata",
  "security_boundary",
]);
const EXTERNAL_EFFECTS = new Set([
  "network_read",
  "external_write",
  "credentials",
  "publish",
  "deploy",
  "destructive_git",
]);

function frontmatterLines(markdown) {
  const normalized = markdown.replaceAll("\r\n", "\n");
  if (!normalized.startsWith("---\n")) return [];
  const close = normalized.indexOf("\n---\n", 4);
  return close === -1 ? [] : normalized.slice(4, close).split("\n");
}

function parseEffectScalar(rawValue) {
  const raw = rawValue.trim();
  if (/^[a-z][a-z0-9_]*$/u.test(raw)) return raw;
  if (raw.startsWith('"') && raw.endsWith('"')) {
    try {
      const parsed = JSON.parse(raw);
      return typeof parsed === "string" ? parsed : null;
    } catch {
      return null;
    }
  }
  if (raw.startsWith("'") && raw.endsWith("'")) {
    return raw.slice(1, -1).replaceAll("''", "'");
  }
  return null;
}

function parseInlineEffectList(rawValue) {
  const raw = rawValue.trim();
  if (!raw.startsWith("[") || !raw.endsWith("]")) return null;
  const body = raw.slice(1, -1).trim();
  if (!body) return [];
  const values = body.split(",").map((value) => parseEffectScalar(value));
  return values.every((value) => typeof value === "string") ? values : null;
}

function executionContractEffectLists(markdown) {
  const lines = frontmatterLines(markdown);
  const contractLine = lines.indexOf("execution_contract:");
  if (contractLine === -1) return null;

  const effects = {
    declaration: { repository_effects: [], external_effects: [] },
    observed: { repository_effects: [], external_effects: [] },
  };
  const errors = [];
  let section = null;
  let activeList = null;
  for (const [offset, line] of lines.slice(contractLine + 1).entries()) {
    if (!line.trim()) continue;
    const indent = line.length - line.trimStart().length;
    if (indent === 0) break;
    if (line.slice(0, indent).includes("\t")) {
      errors.push(`line ${contractLine + offset + 2}: tabs are not supported`);
      continue;
    }

    const sectionMatch = /^ {2}(declaration|observed):\s*$/u.exec(line);
    if (sectionMatch) {
      section = sectionMatch[1];
      activeList = null;
      continue;
    }
    const fieldMatch = /^ {4}(repository_effects|external_effects):\s*(.*)$/u.exec(line);
    if (section && fieldMatch) {
      const field = fieldMatch[1];
      const rawValue = fieldMatch[2];
      activeList = { section, field };
      if (rawValue) {
        const values = parseInlineEffectList(rawValue);
        if (values) effects[section][field].push(...values);
        else errors.push(`line ${contractLine + offset + 2}: invalid ${field} list`);
        activeList = null;
      }
      continue;
    }
    const itemMatch = /^ {6}-\s+(.+)$/u.exec(line);
    if (activeList && itemMatch) {
      const value = parseEffectScalar(itemMatch[1]);
      if (value) effects[activeList.section][activeList.field].push(value);
      else errors.push(`line ${contractLine + offset + 2}: invalid effect scalar`);
      continue;
    }
    if (indent <= 4) activeList = null;
  }

  return { effects, errors };
}

export function readTaskVerificationEffects(changedFiles, { cwd = process.cwd() } = {}) {
  const result = {
    declaredRepositoryEffects: [],
    declaredExternalEffects: [],
    observedRepositoryEffects: [],
    observedExternalEffects: [],
    parseErrors: [],
    sourcePaths: [],
  };
  const taskReadmes = [...new Set(changedFiles)].filter((filePath) =>
    /^\.agentplane\/tasks\/[^/]+\/README\.md$/u.test(filePath),
  );
  for (const relativePath of taskReadmes) {
    let markdown;
    try {
      markdown = readFileSync(path.join(cwd, relativePath), "utf8");
    } catch {
      continue;
    }
    const parsedContract = executionContractEffectLists(markdown);
    if (!parsedContract) continue;
    const executionContract = parsedContract.effects;
    result.parseErrors.push(...parsedContract.errors.map((error) => `${relativePath}: ${error}`));
    const append = (target, values, allowed) => {
      for (const value of Array.isArray(values) ? values : []) {
        if (allowed.has(value)) result[target].push(value);
        else result.parseErrors.push(`${relativePath}: unknown effect value ${String(value)}`);
      }
    };
    append(
      "declaredRepositoryEffects",
      executionContract.declaration?.repository_effects,
      REPOSITORY_EFFECTS,
    );
    append(
      "declaredExternalEffects",
      executionContract.declaration?.external_effects,
      EXTERNAL_EFFECTS,
    );
    append(
      "observedRepositoryEffects",
      executionContract.observed?.repository_effects,
      REPOSITORY_EFFECTS,
    );
    append(
      "observedExternalEffects",
      executionContract.observed?.external_effects,
      EXTERNAL_EFFECTS,
    );
    result.sourcePaths.push(relativePath);
  }
  for (const key of Object.keys(result)) {
    if (Array.isArray(result[key])) result[key] = [...new Set(result[key])].toSorted();
  }
  return result;
}
