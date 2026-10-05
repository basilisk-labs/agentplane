import { constants } from "node:fs";
import path from "node:path";
import { taskCentricDigest } from "@agentplaneorg/core/tasks";
import {
  isScenarioRepoPath,
  parseScenarioV2,
  resolveScenarioParameters,
  type ScenarioParameterBinding,
  type ScenarioPredicate,
  type ScenarioV2Definition,
} from "@agentplaneorg/recipes";

import {
  getCapabilityEntries,
  type AgentplaneCapabilityRegistry,
} from "../../runtime/capabilities/index.js";
import {
  assertContainedPathChainIdentityUnchanged,
  captureContainedPathChainIdentity,
} from "../../shared/contained-stable-file.js";

export type RecipeObservedValue = string | number | boolean | null;
export type RecipePredicateState = "true" | "false" | "unknown";
/** Native application callbacks only. Never populate these from agent results or Recipe data. */
export type RecipeApplicabilityObservers = {
  capabilities?: () => AgentplaneCapabilityRegistry | Promise<AgentplaneCapabilityRegistry>;
  /** Exact allowlist of non-secret native observations. Keys are not expressions or object paths. */
  values?: ReadonlyMap<
    string,
    { source: string; read: () => RecipeObservedValue | Promise<RecipeObservedValue> }
  >;
};
export type RecipePredicateObservation = {
  ref: string;
  predicate: ScenarioPredicate;
  state: RecipePredicateState;
  reason: string;
  provenance: {
    observed_by: "agentplane";
    source: "filesystem" | "capability_registry" | "approved_value";
    source_ref: string;
    evidence_digest: string | null;
    evidence: unknown;
  };
};
export type RecipeApplicabilityObservation = {
  scenario_digest: string;
  repository_root: string;
  disposition: "applicable" | "mismatch" | "needs_evidence";
  predicates: RecipePredicateObservation[];
  mismatches: string[];
  evidence_needs: {
    predicate_ref: string;
    kind: ScenarioPredicate["kind"];
    source_ref: string;
    reason: string;
  }[];
};

type Reading = {
  state: RecipePredicateState;
  reason: string;
  evidence?: unknown;
  recheck?: () => Promise<void>;
};
const issued = new WeakMap<
  object,
  { digest: string; observe: () => Promise<RecipeApplicabilityObservation> }
>();
const unknown = (reason: string): Reading => ({ state: "unknown", reason });

async function observePath(root: string, relative: string): Promise<Reading> {
  if (!isScenarioRepoPath(relative)) return unknown("invalid_repository_path");
  if (!["linux", "darwin"].includes(process.platform) || !constants.O_NOFOLLOW) {
    return unknown("path_containment_unsupported");
  }
  try {
    const identity = await captureContainedPathChainIdentity({
      repository_root: root,
      file_path: path.join(root, relative),
      label: "Recipe applicability",
      path_policy: {
        target_kind: "file_or_directory",
        allow_missing_ancestors: true,
        exact_case: true,
        allow_root: true,
      },
    });
    const recheck = () =>
      assertContainedPathChainIdentityUnchanged(identity, "Recipe applicability");
    await recheck();
    return {
      state: identity.target_exists ? "true" : "false",
      reason: identity.target_exists ? "path_present" : "path_absent",
      evidence: {
        exists: identity.target_exists,
        chain: identity.identities.map((entry) => ({
          path: entry.path,
          dev: String(entry.dev),
          ino: String(entry.ino),
          ctime_ns: String(entry.ctime_ns),
          mtime_ns: String(entry.mtime_ns),
        })),
      },
      recheck,
    };
  } catch (error) {
    const code = (error as NodeJS.ErrnoException | null)?.code;
    return unknown(
      code === "EACCES" || code === "EPERM"
        ? "path_permission_denied"
        : code === "ELOOP"
          ? "path_containment_unproven"
          : code === "ENOENT"
            ? "repository_or_ancestor_unavailable"
            : "path_observation_failed",
    );
  }
}

async function observeCapability(
  observers: RecipeApplicabilityObservers,
  id: string,
): Promise<Reading> {
  if (typeof observers.capabilities !== "function") return unknown("capability_observer_missing");
  try {
    const registry = await observers.capabilities();
    if (!registry || !Array.isArray(registry.entries))
      return unknown("invalid_capability_observation");
    const entries = getCapabilityEntries(registry, id);
    if (entries.length === 0) return unknown("capability_not_observed");
    if (
      entries.some(
        (entry) =>
          ![
            "backend",
            "builtin",
            "command_catalog",
            "harness",
            "policy",
            "runner_adapter",
          ].includes(entry.source?.id) ||
          typeof entry.source?.detail !== "string" ||
          !entry.source.detail.trim(),
      )
    ) {
      return unknown("capability_source_not_approved");
    }
    if (
      entries.some((entry) => !["available", "blocked", "unavailable"].includes(entry.availability))
    ) {
      return unknown("invalid_capability_observation");
    }
    const evidence = entries.map((entry) => ({
      id: entry.id,
      availability: entry.availability,
      source: { id: entry.source.id, detail: entry.source.detail },
    }));
    const states = new Set(entries.map((entry) => entry.availability === "available"));
    if (states.size !== 1) return { ...unknown("conflicting_capability_observations"), evidence };
    return {
      state: states.has(true) ? "true" : "false",
      reason: states.has(true) ? "capability_available" : "capability_unavailable",
      evidence,
    };
  } catch {
    return unknown("capability_observation_failed");
  }
}

async function observeValue(
  observers: RecipeApplicabilityObservers,
  key: string,
  expected: RecipeObservedValue,
  cache: Map<string, Promise<RecipeObservedValue>>,
): Promise<Reading> {
  const reader = observers.values?.get(key);
  if (!reader) return unknown("value_observer_missing");
  if (
    typeof reader.source !== "string" ||
    !reader.source.trim() ||
    typeof reader.read !== "function"
  ) {
    return unknown("value_observer_not_approved");
  }
  try {
    let pending = cache.get(key);
    if (!pending) {
      pending = Promise.resolve().then(() => reader.read());
      cache.set(key, pending);
    }
    const value = await pending;
    if (
      value !== null &&
      typeof value !== "string" &&
      typeof value !== "boolean" &&
      !(typeof value === "number" && Number.isFinite(value))
    ) {
      return unknown("invalid_observed_value");
    }
    return {
      state: value === expected ? "true" : "false",
      reason: value === expected ? "observed_value_matches" : "observed_value_differs",
      evidence: { source: reader.source, value },
    };
  } catch {
    return unknown("value_observation_failed");
  }
}

async function observeExpanded(
  scenario: ScenarioV2Definition,
  root: string,
  observers: RecipeApplicabilityObservers,
): Promise<RecipeApplicabilityObservation> {
  const predicates: RecipePredicateObservation[] = [];
  const pathReadings = new Map<string, Promise<Reading>>();
  const valueReadings = new Map<string, Promise<RecipeObservedValue>>();
  let capabilityReading: Promise<AgentplaneCapabilityRegistry> | undefined;
  const capabilityObserver = observers.capabilities;
  const passObservers = {
    ...observers,
    capabilities:
      typeof capabilityObserver === "function"
        ? () => {
            capabilityReading ??= Promise.resolve()
              .then(capabilityObserver)
              .then((registry) => structuredClone(registry));
            return capabilityReading;
          }
        : undefined,
  };
  const readPath = (relative: string): Promise<Reading> => {
    let reading = pathReadings.get(relative);
    if (!reading) {
      reading = observePath(root, relative);
      pathReadings.set(relative, reading);
    }
    return reading;
  };
  const rechecks: { observation: RecipePredicateObservation; check: () => Promise<void> }[] = [];
  for (const group of ["required", "excluded"] as const) {
    for (const [index, predicate] of scenario.applicability[group].entries()) {
      const reading =
        predicate.kind === "path_exists"
          ? await readPath(predicate.path)
          : predicate.kind === "capability_available"
            ? await observeCapability(passObservers, predicate.capability)
            : await observeValue(observers, predicate.key, predicate.value, valueReadings);
      const observation: RecipePredicateObservation = {
        ref: `${group}:${index}`,
        predicate: structuredClone(predicate),
        state: reading.state,
        reason: reading.reason,
        provenance: {
          observed_by: "agentplane",
          source:
            predicate.kind === "path_exists"
              ? "filesystem"
              : predicate.kind === "capability_available"
                ? "capability_registry"
                : "approved_value",
          source_ref:
            predicate.kind === "path_exists"
              ? predicate.path
              : predicate.kind === "capability_available"
                ? predicate.capability
                : predicate.key,
          evidence: reading.evidence ?? null,
          evidence_digest:
            reading.evidence === undefined ? null : taskCentricDigest(reading.evidence),
        },
      };
      predicates.push(observation);
      if (reading.recheck) rechecks.push({ observation, check: reading.recheck });
    }
  }
  for (const { observation, check } of rechecks) {
    try {
      await check();
    } catch {
      observation.state = "unknown";
      observation.reason = "path_changed_during_observation";
      observation.provenance.evidence_digest = null;
      observation.provenance.evidence = null;
    }
  }
  const mismatches = predicates
    .filter(
      (entry) =>
        entry.state !== "unknown" &&
        entry.state !== (entry.ref.startsWith("required:") ? "true" : "false"),
    )
    .map((entry) => entry.ref);
  const evidenceNeeds = predicates
    .filter((entry) => entry.state === "unknown")
    .map((entry) => ({
      predicate_ref: entry.ref,
      kind: entry.predicate.kind,
      source_ref: entry.provenance.source_ref,
      reason: entry.reason,
    }));
  const result: RecipeApplicabilityObservation = {
    scenario_digest: taskCentricDigest(scenario),
    repository_root: root,
    disposition:
      mismatches.length > 0
        ? "mismatch"
        : evidenceNeeds.length > 0
          ? "needs_evidence"
          : "applicable",
    predicates,
    mismatches,
    evidence_needs: evidenceNeeds,
  };
  issued.set(result, {
    digest: taskCentricDigest(result),
    observe: () => observeExpanded(scenario, root, observers),
  });
  return result;
}

/** Serializable reports carry provenance, never replay permission or agent-supplied truth. */
export async function observeRecipeApplicability(opts: {
  scenario: unknown;
  bindings: readonly ScenarioParameterBinding[];
  repository_root: string;
  observers?: RecipeApplicabilityObservers;
}): Promise<RecipeApplicabilityObservation> {
  const observers: RecipeApplicabilityObservers = {
    capabilities: opts.observers?.capabilities,
    values:
      opts.observers?.values instanceof Map
        ? new Map([...opts.observers.values].map(([key, reader]) => [key, { ...reader }]))
        : new Map(),
  };
  return observeExpanded(
    resolveScenarioParameters(opts.scenario, opts.bindings),
    path.resolve(opts.repository_root),
    observers,
  );
}

/** Call with the parameter-expanded Scenario from the native Plan boundary immediately before use. */
export async function assertRecipeApplicable(
  observation: unknown,
  expectedScenario: unknown,
  repositoryRoot: string,
): Promise<void> {
  const original =
    typeof observation === "object" && observation !== null ? issued.get(observation) : undefined;
  if (!original) throw new Error("Unissued Recipe applicability observation.");
  if (original.digest !== taskCentricDigest(observation))
    throw new Error("Unissued or modified Recipe applicability observation.");
  const report = observation as RecipeApplicabilityObservation;
  if (
    report.scenario_digest !== taskCentricDigest(parseScenarioV2(expectedScenario)) ||
    report.repository_root !== path.resolve(repositoryRoot)
  ) {
    throw new Error(
      "Recipe applicability observation belongs to a different Scenario or repository.",
    );
  }
  if (report.disposition !== "applicable")
    throw new Error(
      `Recipe applicability ${report.disposition}: ${report.mismatches.join(", ") || report.evidence_needs.map((need) => `${need.predicate_ref}:${need.reason}`).join(", ")}`,
    );
  const current = await original.observe();
  if (original.digest !== taskCentricDigest(current))
    throw new Error(`Stale Recipe applicability observation: ${current.disposition}.`);
}
