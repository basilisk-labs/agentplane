import { readFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const requireFromAgentplane = createRequire(
  path.join(process.cwd(), "packages", "agentplane", "package.json"),
);
const { parse: parseYaml } = requireFromAgentplane("yaml");

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

function executionContractEffectLists(markdown) {
  const frontmatter = frontmatterLines(markdown).join("\n");
  if (!frontmatter) return null;
  try {
    const parsed = parseYaml(frontmatter);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed.execution_contract ?? null)
      : null;
  } catch {
    return null;
  }
}

export function readTaskVerificationEffects(changedFiles, { cwd = process.cwd() } = {}) {
  const result = {
    declaredRepositoryEffects: [],
    declaredExternalEffects: [],
    observedRepositoryEffects: [],
    observedExternalEffects: [],
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
    const executionContract = executionContractEffectLists(markdown);
    if (!executionContract || typeof executionContract !== "object") continue;
    const append = (target, values, allowed) => {
      for (const value of Array.isArray(values) ? values : []) {
        if (allowed.has(value)) result[target].push(value);
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
    result[key] = [...new Set(result[key])].toSorted();
  }
  return result;
}
