import { createHash } from "node:crypto";
import { isDeepStrictEqual } from "node:util";

const backends = ["local", "serialized-direct", "cloud-fake"];
const taskClasses = ["direct", "branch_pr", "context", "release", "batch"];
const interruptions = ["before-write", "after-write", "unknown-readback"];
const effectScenarios = [
  "not-issued",
  "applied",
  "not-applied",
  "timeout-before",
  "timeout-after",
  "uncertain",
  "reconciled",
  "admission-before-write",
  "admission-after-write",
  "admission-unknown-readback",
];
const digest = (bytes) => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;

/** Fail closed on an incomplete capture. Tests and old frozen expectations remain independent inputs. */
export function qualifyKernelCorpus({
  anchor,
  kernel,
  migration,
  evidence,
  persistence,
  captured,
}) {
  if (!/^[a-f0-9]{40}$/u.test(anchor) || captured?.source_anchor !== anchor)
    throw new Error("Qualification capture anchor mismatch");
  const inputs = {
    kernel: kernel?.fixtures,
    migration: migration?.fixtures,
    evidence: evidence?.fixtures,
    persistence: persistence?.fixtures,
    observed_persistence: captured.fixtures,
    supplemental: captured.supplemental_kernel,
    effects: captured.effect_replay,
    workspaces: captured.workspace_replay,
    observed_evidence: captured.evidence_replay,
    crashes: captured.crash_matrix,
  };
  const indices = {};
  for (const [name, fixtures] of Object.entries(inputs)) {
    if (!Array.isArray(fixtures) || fixtures.length === 0)
      throw new Error(`Missing qualification collection: ${name}`);
    const index = new Map();
    for (const fixture of fixtures) {
      const id = fixture.identity?.fixture_id ?? fixture.id;
      if (!id || index.has(id))
        throw new Error(`Duplicate or missing qualification identity: ${name}/${id}`);
      const source =
        typeof fixture.source_bytes === "string"
          ? Buffer.from(fixture.source_bytes)
          : typeof fixture.source_base64 === "string"
            ? Buffer.from(fixture.source_base64, "base64")
            : null;
      const sourceDigest = fixture.identity?.source_digest ?? fixture.source_digest;
      if (!source || digest(source) !== sourceDigest)
        throw new Error(`Qualification source digest mismatch: ${name}/${id}`);
      if (fixture.expected === undefined)
        throw new Error(`Missing qualification expectation: ${name}/${id}`);
      if (
        [
          "observed_persistence",
          "supplemental",
          "effects",
          "workspaces",
          "observed_evidence",
          "crashes",
        ].includes(name) &&
        fixture.identity?.implementation_anchor !== anchor
      )
        throw new Error(`Fixture anchor mismatch: ${name}/${id}`);
      index.set(id, fixture);
    }
    indices[name] = index;
  }
  const references = (collection, ids) =>
    ids.map((id) => {
      if (!indices[collection]?.has(id))
        throw new Error(`Missing required qualification case: ${collection}/${id}`);
      return `${collection}/${id}`;
    });
  const all = (collection) => references(collection, [...indices[collection].keys()].toSorted());
  const persistedIds = backends.flatMap((backend) =>
    taskClasses.map((taskClass) => `${backend}-${taskClass}`),
  );
  for (const id of persistedIds) {
    const original = indices.persistence.get(id);
    const observed = indices.observed_persistence.get(id);
    if (
      !original ||
      !observed ||
      original.source_bytes !== observed.source_bytes ||
      !isDeepStrictEqual(original.expected, observed.expected)
    )
      throw new Error(`Frozen persistence observation mismatch: ${id}`);
    if (observed.expected.at(-1)?.next_action?.reason_code !== "kernel_task_completed")
      throw new Error(`Incomplete Task journey: ${id}`);
  }
  const crashLabels = [
    ...new Set(
      ["branch_pr", "release"].flatMap((taskClass) =>
        JSON.parse(indices.persistence.get(`local-${taskClass}`).source_bytes).steps.map(
          (step) => step.label,
        ),
      ),
    ),
  ];
  for (const required of [
    "creation",
    "plan",
    "approval",
    "claim",
    "result",
    "validation",
    "work-item-completion",
    "completion",
    "prepare-repository.commit",
    "prepare-evaluator.review",
    "prepare-pr.open",
    "prepare-pr.merge",
    "prepare-hosted.close",
    "prepare-release.publish",
    "prepare-workspace.cleanup",
  ])
    if (!crashLabels.includes(required))
      throw new Error(`Missing required crash point: ${required}`);
  const crashIds = backends.flatMap((backend) =>
    interruptions.flatMap((mode) => crashLabels.map((label) => `${backend}-${mode}-${label}`)),
  );
  references("crashes", crashIds);
  for (const fixture of indices.crashes.values()) {
    const origin = fixture.expected_origin;
    const frozen = origin && indices.persistence.get(origin.fixture_id);
    if (
      !frozen ||
      frozen.identity.implementation_anchor !== origin.implementation_anchor ||
      !isDeepStrictEqual(fixture.expected, frozen.expected[origin.observation_index])
    )
      throw new Error(
        `Crash expectation differs from frozen origin: ${fixture.identity.fixture_id}`,
      );
  }
  const families = {
    canonical: all("kernel"),
    legacy_lifecycle: references("migration", [
      "legacy-TODO",
      "legacy-DOING",
      "legacy-BLOCKED",
      "legacy-DONE",
      "unknown-status",
    ]),
    plans: [
      ...references("kernel", ["plan-non-material", "plan-material", "plan-stale"]),
      ...references("supplemental", [
        "plan-pending",
        "plan-approved",
        "plan-rejected",
        "plan-stale-approval",
        "plan-agent-cannot-approve",
      ]),
    ],
    work_items: references("supplemental", [
      "work-item-dependency-chain",
      "work-item-fan-out",
      "conflicting-resource-claim",
      "work-item-rework",
      "work-item-new-attempt",
      "work-item-result",
      "work-item-duplicate-result",
      "work-item-stale-result",
      "work-item-conflicting-result-id",
      "optional-unclaimed",
      "optional-active-claim",
      "independent-ready-while-blocked",
    ]),
    required_inputs: [
      ...references("migration", [
        "source-path-ambiguous",
        "typed-context",
        "typed-output",
        "declared-output",
        "input-collision",
      ]),
      ...references("supplemental", ["missing-upstream-output", "resolved-upstream-output"]),
    ],
    validation: [
      ...references("evidence", [
        "validation-focused",
        "validation-full",
        "validation-hosted",
        "validation-FAILED",
        "validation-BLOCKED",
        "validation-STALE",
        "validation-focused-cannot-satisfy-full",
        "validation-focused-cannot-satisfy-hosted",
        "validation-changed-toolchain",
        "validation-stale-implementation",
        "validation-missing-evidence-shape",
      ]),
      ...references(
        "observed_evidence",
        backends.map((backend) => `${backend}-missing-executable`),
      ),
    ],
    evaluator: [
      ...references("evidence", [
        "review-PASS",
        "review-REWORK",
        "review-BLOCKED",
        "review-HUMAN_REQUIRED",
        "review-semantic-drift",
      ]),
      ...references(
        "observed_evidence",
        backends.flatMap((backend) => [`${backend}-metadata-review`, `${backend}-semantic-review`]),
      ),
    ],
    effects: references("effects", [
      ...backends.flatMap((backend) =>
        effectScenarios.map((scenario) => `${backend}-effect-${scenario}`),
      ),
      "cloud-fake-effect-concurrent-start",
    ]),
    workspaces: references("workspaces", [
      "workspace-base",
      "workspace-task-worktree",
      "workspace-missing-frozen-document",
      "workspace-divergent-head",
    ]),
    backends: [
      ...references("observed_persistence", persistedIds),
      ...references("crashes", crashIds),
    ],
    task_classes: references("observed_persistence", persistedIds),
    crash_points: references("crashes", crashIds),
  };
  return {
    schema_version: 1,
    implementation_anchor: anchor,
    collections: Object.entries(inputs).map(([name, fixtures]) => ({
      name,
      fixtures: fixtures.length,
      digest: digest(JSON.stringify(fixtures)),
    })),
    families: Object.entries(families).map(([family, cases]) => ({
      family,
      cases,
      count: cases.length,
    })),
  };
}
