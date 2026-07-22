import { execFileSync } from "node:child_process";

import { normalizeRepoPath, sha256 } from "./trust-boundary-ast.mjs";

export const TRUST_BOUNDARY_RULES = [
  {
    id: "trust.no-automatic-semantic-verdict",
    rf_owners: ["RF-00"],
    owner_task_ids: ["202607221846-YGWMA2"],
    description: "Routers and templates must not manufacture a semantic pass verdict.",
  },
  {
    id: "trust.no-agent-writable-observed-fields",
    rf_owners: ["RF-01a", "RF-01b"],
    owner_task_ids: ["202607221846-4CE7EG", "202607221846-Y89CFB"],
    description:
      "Agent-writable results must not define or override observed process, Git, check, or artifact facts.",
  },
  {
    id: "trust.no-implicit-danger-sandbox",
    rf_owners: ["RF-03"],
    owner_task_ids: ["202607221846-9XC1H0"],
    description: "A missing sandbox choice must not fall back to danger-full-access.",
  },
  {
    id: "trust.no-untyped-durable-route-workorder",
    rf_owners: ["RF-05a", "RF-05b"],
    owner_task_ids: ["202607221848-T9B3PS", "202607221848-VC4VVS"],
    description: "Durable route and work-order payloads require typed, validated contracts.",
  },
  {
    id: "trust.no-rendered-command-orchestration",
    rf_owners: ["RF-06b", "RF-09", "RF-25"],
    owner_task_ids: ["202607221848-VBV9B1", "202607221850-DRWR0V", "202607221854-PGPR3J"],
    description:
      "Rendered command strings and AgentPlane subprocesses must not be the internal orchestration protocol.",
  },
  {
    id: "trust.no-duplicate-runner-task-representation",
    rf_owners: ["RF-21"],
    owner_task_ids: ["202607221850-9C9WBP"],
    description:
      "Serialized runner task input must not carry TaskData beside duplicate task projections.",
  },
];

const RULE_BY_ID = new Map(TRUST_BOUNDARY_RULES.map((rule) => [rule.id, rule]));

export function ruleById(ruleId) {
  return RULE_BY_ID.get(ruleId);
}

export function trustBoundaryOriginDigest(violationIds) {
  return sha256(`${[...violationIds].toSorted().join("\n")}\n`);
}

function sameStringArray(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

export function validateTrustBoundaryBaseline({
  baseline,
  baseBaseline = null,
  violations,
  expectedOriginDigest,
  expectedCapturedFromCommit,
}) {
  const errors = [];
  if (baseline?.schema_version !== 1) errors.push("baseline schema_version must be 1");
  if (baseline?.baseline_id !== "agentplane.trust-boundary.v0.7") {
    errors.push("baseline_id must be agentplane.trust-boundary.v0.7");
  }
  if (expectedCapturedFromCommit && baseline?.captured_from_commit !== expectedCapturedFromCommit) {
    errors.push(
      `captured_from_commit must remain ${expectedCapturedFromCommit}; received ${String(
        baseline?.captured_from_commit,
      )}`,
    );
  }
  const baselineRules = Array.isArray(baseline?.rules) ? baseline.rules : [];
  for (const rule of TRUST_BOUNDARY_RULES) {
    const entry = baselineRules.find((candidate) => candidate?.id === rule.id);
    if (!entry) {
      errors.push(`baseline is missing rule metadata for ${rule.id}`);
      continue;
    }
    if (!sameStringArray(entry.rf_owners, rule.rf_owners)) {
      errors.push(`${rule.id} rf_owners do not match the canonical registry`);
    }
    if (!sameStringArray(entry.owner_task_ids, rule.owner_task_ids)) {
      errors.push(`${rule.id} owner_task_ids do not match the canonical registry`);
    }
  }
  const originIds = Array.isArray(baseline?.origin?.violation_ids)
    ? baseline.origin.violation_ids
    : [];
  const uniqueOriginIds = new Set();
  for (const violationId of originIds) {
    if (uniqueOriginIds.has(violationId)) {
      errors.push(`duplicate origin violation_id: ${String(violationId)}`);
    }
    uniqueOriginIds.add(violationId);
  }
  const originDigest = trustBoundaryOriginDigest(originIds);
  if (baseline?.origin?.violation_ids_sha256 !== originDigest) {
    errors.push("origin.violation_ids_sha256 does not match origin.violation_ids");
  }
  if (expectedOriginDigest && originDigest !== expectedOriginDigest) {
    errors.push(
      `baseline origin changed: expected digest ${expectedOriginDigest}, received ${originDigest}`,
    );
  }
  const entries = Array.isArray(baseline?.violations) ? baseline.violations : [];
  const currentById = new Map();
  const currentIds = new Set();
  for (const violation of violations) {
    if (currentIds.has(violation.violation_id)) {
      errors.push(`duplicate collected violation_id: ${violation.violation_id}`);
    }
    currentIds.add(violation.violation_id);
    currentById.set(violation.violation_id, violation);
  }
  const baselineIds = new Set();
  for (const entry of entries) {
    if (!entry || typeof entry.violation_id !== "string") {
      errors.push("baseline contains a violation without violation_id");
      continue;
    }
    if (baselineIds.has(entry.violation_id)) {
      errors.push(`duplicate baseline entry: ${entry.violation_id}`);
    }
    baselineIds.add(entry.violation_id);
    if (!originIds.includes(entry.violation_id)) {
      errors.push(
        `baseline growth is forbidden: ${entry.violation_id} is not in the reviewed origin`,
      );
    }
    const rule = RULE_BY_ID.get(entry.rule_id);
    if (!rule) {
      errors.push(
        `baseline entry ${entry.violation_id} has unknown rule_id ${String(entry.rule_id)}`,
      );
    } else if (
      !sameStringArray(entry.rf_owners, rule.rf_owners) ||
      !sameStringArray(entry.owner_task_ids, rule.owner_task_ids)
    ) {
      errors.push(`baseline entry ${entry.violation_id} has stale RF ownership`);
    }
    const collected = currentById.get(entry.violation_id);
    if (collected) {
      const exactFields = [
        ["rule_id", entry.rule_id, collected.rule_id],
        ["path", entry.path, collected.path],
        ["locator", entry.locator, collected.locator],
        ["rationale", entry.rationale, collected.message],
      ];
      for (const [field, actual, expected] of exactFields) {
        if (actual !== expected) {
          errors.push(
            `baseline entry ${entry.violation_id} ${field} does not match the collected violation`,
          );
        }
      }
      if (!sameStringArray(entry.rf_owners, collected.rf_owners)) {
        errors.push(
          `baseline entry ${entry.violation_id} rf_owners do not match the collected violation`,
        );
      }
      if (!sameStringArray(entry.owner_task_ids, collected.owner_task_ids)) {
        errors.push(
          `baseline entry ${entry.violation_id} owner_task_ids do not match the collected violation`,
        );
      }
    }
  }
  if (baseBaseline !== null) {
    if (baseBaseline?.schema_version !== 1) {
      errors.push("base baseline schema_version must be 1");
    }
    if (baseBaseline?.baseline_id !== "agentplane.trust-boundary.v0.7") {
      errors.push("base baseline_id must be agentplane.trust-boundary.v0.7");
    }
    const baseEntries = Array.isArray(baseBaseline?.violations) ? baseBaseline.violations : [];
    const baseIds = new Set();
    for (const entry of baseEntries) {
      if (!entry || typeof entry.violation_id !== "string") {
        errors.push("base baseline contains a violation without violation_id");
        continue;
      }
      if (baseIds.has(entry.violation_id)) {
        errors.push(`duplicate base baseline entry: ${entry.violation_id}`);
      }
      baseIds.add(entry.violation_id);
    }
    for (const entry of entries) {
      if (entry?.violation_id && !baseIds.has(entry.violation_id)) {
        errors.push(
          `baseline reactivation or growth is forbidden relative to the current base reference: ${entry.violation_id}`,
        );
      }
    }
  }
  for (const violation of violations) {
    if (!baselineIds.has(violation.violation_id)) {
      errors.push(
        `new violation ${violation.rule_id} at ${violation.path}:${String(violation.line)} (${violation.locator})`,
      );
    }
  }
  for (const entry of entries) {
    if (entry?.violation_id && !currentIds.has(entry.violation_id)) {
      errors.push(
        `resolved violation remains in baseline; remove it to shrink debt: ${entry.violation_id}`,
      );
    }
  }
  return errors;
}

export function baselineViolationEntry(violation) {
  return {
    violation_id: violation.violation_id,
    rule_id: violation.rule_id,
    rf_owners: violation.rf_owners,
    owner_task_ids: violation.owner_task_ids,
    path: violation.path,
    locator: violation.locator,
    rationale: violation.message,
  };
}

function gitOutput(root, args) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

export function readTrustBoundaryReferenceBaseline({
  root,
  reference,
  baselineRelativePath,
  allowedMissingAtCommit,
}) {
  let referenceCommit;
  try {
    referenceCommit = gitOutput(root, ["rev-parse", `${reference}^{commit}`]);
  } catch (error) {
    throw new Error(`cannot resolve trust-boundary base reference ${reference}`, { cause: error });
  }
  const gitPath = normalizeRepoPath(baselineRelativePath);
  try {
    gitOutput(root, ["cat-file", "-e", `${referenceCommit}:${gitPath}`]);
  } catch (error) {
    if (referenceCommit === allowedMissingAtCommit) return { baseline: null, referenceCommit };
    throw new Error(
      `cannot read ${gitPath} from current ${reference} (${referenceCommit}); refusing to run without the monotonic base`,
      { cause: error },
    );
  }
  let content;
  try {
    content = gitOutput(root, ["show", `${referenceCommit}:${gitPath}`]);
  } catch (error) {
    throw new Error(`cannot read ${gitPath} from current ${reference} (${referenceCommit})`, {
      cause: error,
    });
  }
  try {
    return { baseline: JSON.parse(content), referenceCommit };
  } catch (error) {
    throw new Error(
      `trust-boundary base baseline at ${referenceCommit}:${gitPath} is invalid JSON`,
      { cause: error },
    );
  }
}
