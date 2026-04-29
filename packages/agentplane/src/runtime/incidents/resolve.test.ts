import { describe, expect, it } from "vitest";

import {
  appendIncidentRegistryEntries,
  buildIncidentAdviceQueryFromTask,
  createIncidentRegistrySkeleton,
  parseIncidentRegistry,
  planIncidentCollection,
  renderIncidentAdvice,
  resolveIncidentAdviceMatches,
} from "./index.js";

const compactRegistryHeader = [
  "# Policy Incidents Log",
  "- Append-only. Required fields: `id`, `date`, `scope`, `failure`, `rule`, `evidence`, `enforcement`, `state`; optional: `tags`, `match`, `advice`, `source_task`, `fixability`.",
].join("\n");

describe("incidents runtime", () => {
  it("parses registry entries including machine-readable fields", () => {
    const registry = parseIncidentRegistry(
      [
        createIncidentRegistrySkeleton().trimEnd(),
        "",
        "- id: INC-20260403-01",
        "  date: 2026-04-03",
        "  scope: release publish workflow_dispatch",
        "  tags: release, github-actions",
        "  match: publish, workflow_dispatch, release-tag",
        "  failure: publish deadlocked on exact-SHA push waits",
        "  advice: validate the exact release ref inside the publish workflow",
        "  rule: Release recovery MUST validate the exact ref inside the workflow.",
        "  evidence: task 202603091222-JWN7RB",
        "  enforcement: manual",
        "  source_task: 202603091222-JWN7RB",
        "  fixability: external",
        "  state: stabilized",
        "",
      ].join("\n"),
    );

    expect(registry.entries).toHaveLength(1);
    expect(registry.entries[0]?.tags).toEqual(["release", "github-actions"]);
    expect(registry.entries[0]?.match).toEqual(["publish", "workflow_dispatch", "release-tag"]);
    expect(registry.entries[0]?.advice).toContain("exact release ref");
    expect(registry.entries[0]?.sourceTask).toBe("202603091222-JWN7RB");
  });

  it("plans promotion from external findings and dedupes same-task reruns", () => {
    const registry = parseIncidentRegistry(
      [
        createIncidentRegistrySkeleton().trimEnd(),
        "",
        "- id: INC-20260403-01",
        "  date: 2026-04-03",
        "  scope: release publish workflow_dispatch",
        "  tags: release, github-actions",
        "  match: publish, workflow_dispatch, release-tag",
        "  failure: publish deadlocked on exact-SHA push waits",
        "  advice: validate the exact release ref inside the publish workflow",
        "  rule: Release recovery MUST validate the exact ref inside the workflow.",
        "  evidence: task TASK-1",
        "  enforcement: manual",
        "  source_task: TASK-1",
        "  fixability: external",
        "  state: stabilized",
        "",
      ].join("\n"),
    );

    const findings = [
      "- Observation: publish deadlocked on exact-SHA push waits",
      "  Impact: release recovery stalled.",
      "  Resolution: validate the exact release ref inside the publish workflow.",
      "  Promotion: incident-candidate",
      "  IncidentScope: release publish workflow_dispatch",
      "  IncidentTags: release, github-actions",
      "  IncidentMatch: publish, workflow_dispatch, release-tag",
      "  IncidentAdvice: validate the exact release ref inside the publish workflow",
      "  IncidentRule: Release recovery MUST validate the exact ref inside the workflow.",
      "  IncidentExternal: true",
      "",
      "- Observation: local test suite failed after a slow retry loop",
      "  Impact: local verification was blocked.",
      "  Resolution: keep it narrow.",
      "  Promotion: incident-candidate",
      "  IncidentScope: local performance",
    ].join("\n");

    const plan = planIncidentCollection({
      task: {
        id: "TASK-1",
        title: "Fix publish gate",
        description: "Release tag workflow repair",
        tags: ["release"],
      },
      findings,
      registry,
      now: new Date("2026-04-03T10:00:00.000Z"),
    });

    expect(plan.candidates).toHaveLength(2);
    expect(plan.skipped).toHaveLength(0);
    expect(plan.promotable).toHaveLength(0);
    expect(plan.duplicates).toHaveLength(1);
    expect(plan.issues).toHaveLength(1);
    expect(plan.issues[0]?.missingFields).toEqual([
      "Fixability: external or IncidentExternal: true",
    ]);
  });

  it("tracks structured findings that are skipped because they are not marked for promotion or external handling", () => {
    const plan = planIncidentCollection({
      task: {
        id: "TASK-6",
        title: "Document transport issue",
        description: "Capture reusable workflow lesson without promoting it yet",
        tags: ["workflow"],
      },
      findings: [
        "- Observation: transient GitHub transport failures forced manual retries.",
        "  Impact: operators had to repeat the same reconcile loop.",
        "  Resolution: switch the flaky path to a resilient polling implementation.",
      ].join("\n"),
      registry: parseIncidentRegistry(createIncidentRegistrySkeleton()),
      now: new Date("2026-04-06T10:00:00.000Z"),
    });

    expect(plan.candidates).toHaveLength(0);
    expect(plan.skipped).toHaveLength(1);
    expect(plan.skipped[0]).toMatchObject({
      observation: "transient GitHub transport failures forced manual retries.",
      reason: "not_marked_external_or_promotable",
    });
    expect(plan.promotable).toHaveLength(0);
    expect(plan.issues).toHaveLength(0);
  });

  it("skips promotable-looking findings that do not describe a failure", () => {
    const plan = planIncidentCollection({
      task: {
        id: "TASK-SUCCESS",
        title: "Close hosted task",
        description: "Record closure notes",
        tags: ["workflow"],
      },
      findings: [
        "- Observation: hosted close completed and PR metadata was recorded.",
        "  Impact: operators have a cleaner audit trail.",
        "  Resolution: no follow-up required.",
        "  Promotion: incident-candidate",
        "  Fixability: external",
      ].join("\n"),
      registry: parseIncidentRegistry(createIncidentRegistrySkeleton()),
      now: new Date("2026-04-08T10:00:00.000Z"),
    });

    expect(plan.candidates).toHaveLength(0);
    expect(plan.skipped).toHaveLength(1);
    expect(plan.skipped[0]).toMatchObject({
      observation: "hosted close completed and PR metadata was recorded.",
      reason: "not_failure_like",
    });
    expect(plan.promotable).toHaveLength(0);
  });

  it("tracks plain Findings text separately from structured incident blocks", () => {
    const plan = planIncidentCollection({
      task: {
        id: "TASK-7",
        title: "Record operator confusion",
        description: "Explain why incidents promotion stayed unchanged",
        tags: ["workflow"],
      },
      findings:
        "Operators noted that incidents.md did not change after finish, but no structured incident block was recorded.",
      registry: parseIncidentRegistry(createIncidentRegistrySkeleton()),
      now: new Date("2026-04-07T10:00:00.000Z"),
    });

    expect(plan.findingsTextPresent).toBe(true);
    expect(plan.structuredFindingCount).toBe(0);
    expect(plan.candidates).toHaveLength(0);
    expect(plan.skipped).toHaveLength(0);
  });

  it("auto-promotes first external findings as open incidents and resolves advice by tags and scope", () => {
    const base = createIncidentRegistrySkeleton();
    const plan = planIncidentCollection({
      task: {
        id: "TASK-2",
        title: "Release recovery",
        description: "Handle workflow_dispatch on release tags",
        scope: "- In scope: Repair release publish workflow_dispatch recovery.",
        tags: ["release", "github-actions"],
        commitHash: "1234567890abcdef",
      },
      findings: [
        "- Observation: workflow_dispatch on release tags waited on exact-SHA push runs that never existed.",
        "  Impact: release recovery stalled.",
        "  Resolution: validate the exact release ref inside the workflow itself.",
        "  Fixability: external",
      ].join("\n"),
      registry: parseIncidentRegistry(base),
      now: new Date("2026-04-03T10:00:00.000Z"),
    });

    expect(plan.promotable).toHaveLength(1);
    expect(plan.promotable[0]?.entry.state).toBe("open");
    expect(plan.promotable[0]?.entry.scope).toBe(
      "Repair release publish workflow_dispatch recovery.",
    );
    expect(plan.promotable[0]?.entry.advice).toContain("validate the exact release ref");
    const updated = parseIncidentRegistry(
      appendIncidentRegistryEntries(
        base,
        plan.promotable.map((item) => item.entry),
      ),
    );
    const matches = resolveIncidentAdviceMatches({
      query: buildIncidentAdviceQueryFromTask({
        taskId: "TASK-3",
        title: "Repair release publish recovery",
        description: "workflow_dispatch on release tag is hanging",
        tags: ["release", "github-actions"],
      }),
      registry: updated,
    });

    expect(matches).toHaveLength(1);
    expect(matches[0]?.entry.sourceTask).toBe("TASK-2");
    expect(renderIncidentAdvice(matches)).toContain("validate the exact release ref");
  });

  it("stabilizes recurring incidents and dedupes advice output by signature", () => {
    const base = parseIncidentRegistry(
      [
        createIncidentRegistrySkeleton().trimEnd(),
        "",
        "- id: INC-20260403-01",
        "  date: 2026-04-03",
        "  scope: release publish workflow_dispatch",
        "  tags: release, github-actions",
        "  match: publish, workflow_dispatch, release-tag",
        "  failure: publish deadlocked on exact-SHA push waits",
        "  advice: validate the exact release ref inside the publish workflow",
        "  rule: Analogous release publish workflow_dispatch work MUST review and apply the recorded external incident advice before retrying.",
        "  evidence: task TASK-2",
        "  enforcement: manual",
        "  source_task: TASK-2",
        "  fixability: external",
        "  state: open",
        "",
      ].join("\n"),
    );

    const plan = planIncidentCollection({
      task: {
        id: "TASK-4",
        title: "Repeat release recovery",
        description: "Repair workflow_dispatch on release tags again",
        tags: ["release", "github-actions"],
      },
      findings: [
        "- Observation: publish deadlocked on exact-SHA push waits",
        "  Impact: release recovery stalled again.",
        "  Resolution: validate the exact release ref inside the publish workflow",
        "  IncidentScope: release publish workflow_dispatch",
        "  IncidentRule: Analogous release publish workflow_dispatch work MUST review and apply the recorded external incident advice before retrying.",
        "  Fixability: external",
      ].join("\n"),
      registry: base,
      now: new Date("2026-04-10T10:00:00.000Z"),
    });

    expect(plan.promotable).toHaveLength(1);
    expect(plan.promotable[0]?.entry.state).toBe("stabilized");
    const updated = parseIncidentRegistry(
      appendIncidentRegistryEntries(createIncidentRegistrySkeleton(), [
        ...base.entries,
        ...plan.promotable.map((item) => item.entry),
      ]),
    );
    const matches = resolveIncidentAdviceMatches({
      query: buildIncidentAdviceQueryFromTask({
        taskId: "TASK-5",
        title: "Release recovery keeps hanging",
        description: "workflow_dispatch on release tag is hanging again",
        tags: ["release", "github-actions"],
      }),
      registry: updated,
    });

    expect(matches).toHaveLength(1);
    expect(matches[0]?.entry.sourceTask).toBe("TASK-4");
    expect(matches[0]?.entry.state).toBe("stabilized");
  });

  it("parses the shipped compact registry layout and derives source_task from evidence", () => {
    const registry = parseIncidentRegistry(
      [
        compactRegistryHeader,
        "- id: INC-20260407-01 | date: 2026-04-07 | scope: task normalize hosted reconcile target selection | tags: workflow, github, transport, normalize | match: task normalize, sync-hosted-merges, gh api EOF, GraphQL EOF | failure: GitHub EOF or TLS transport failures during hosted branch_pr reconcile could abort task normalize before it reached the known stale task because the command scanned every candidate task. | advice: When GitHub transport is flaky, reconcile only the known task ids instead of scanning the full branch_pr history. | rule: Hosted reconcile commands MUST support explicit task-id scoping so known drift can be resolved without depending on unrelated GitHub lookups. | evidence: task 202604071853-XGX2YJ | enforcement: manual | fixability: external | state: open",
      ].join("\n"),
    );

    expect(registry.entries).toHaveLength(1);
    expect(registry.entries[0]?.sourceTask).toBe("202604071853-XGX2YJ");

    const plan = planIncidentCollection({
      task: {
        id: "202604071853-XGX2YJ",
        title: "Scope task normalize reconcile to selected task ids",
        description: "Add task-id filters to task normalize reconcile modes.",
        tags: ["workflow", "github", "normalize"],
        commitHash: "5fd312cceb200917bdf8aaba9a5a59532c158252",
      },
      findings: [
        "- Observation: GitHub EOF or TLS transport failures during hosted branch_pr reconcile could abort task normalize before it reached the known stale task because the command scanned every candidate task.",
        "  Impact: Operators could not deterministically reconcile a single known branch_pr drift.",
        "  Resolution: Add repeatable --task-id scoping to task normalize reconcile modes.",
        "  Promotion: incident-candidate",
        "  IncidentScope: task normalize hosted reconcile target selection",
        "  IncidentAdvice: When GitHub transport is flaky, reconcile only the known task ids instead of scanning the full branch_pr history.",
        "  IncidentRule: Hosted reconcile commands MUST support explicit task-id scoping so known drift can be resolved without depending on unrelated GitHub lookups.",
        "  IncidentTags: workflow, github, transport, normalize",
        "  IncidentMatch: task normalize, sync-hosted-merges, gh api EOF, GraphQL EOF",
        "  Fixability: external",
      ].join("\n"),
      registry,
      now: new Date("2026-04-07T19:46:10.000Z"),
    });

    expect(plan.promotable).toHaveLength(0);
    expect(plan.duplicates).toHaveLength(1);
  });

  it("normalizes compact registry writes by removing duplicate fingerprints and preserving unique ids", () => {
    const current = [
      compactRegistryHeader,
      "- id: INC-20260407-01 | date: 2026-04-07 | scope: branch_pr GitHub transport helpers | tags: workflow, github, transport, retries | match: github, gh, graphQL, EOF, TLS, SSL_ERROR_SYSCALL, remote-checks | failure: GitHub transport intermittently failed with GraphQL EOF, TLS handshake errors, and SSL_ERROR_SYSCALL during PR creation, remote-check waiting, and reconcile helpers | advice: treat transient GitHub transport failures as retriable | rule: GitHub-dependent workflow helpers MUST classify EOF/TLS/SSL transport failures as transient and retry with bounded backoff. | evidence: task 202604062309-EXTXG1 | enforcement: test + workflow helper | source_task: 202604062309-EXTXG1 | fixability: external | state: open",
      "- id: INC-20260407-04 | date: 2026-04-07 | scope: task normalize hosted reconcile target selection | tags: workflow, github, transport, normalize | match: task normalize, sync-hosted-merges, gh api EOF, GraphQL EOF | failure: GitHub EOF or TLS transport failures during hosted branch_pr reconcile could abort task normalize before it reached the known stale task because the command scanned every candidate task. | advice: When GitHub transport is flaky, reconcile only the known task ids instead of scanning the full branch_pr history. | rule: Hosted reconcile commands MUST support explicit task-id scoping so known drift can be resolved without depending on unrelated GitHub lookups. | evidence: task 202604071853-XGX2YJ | enforcement: manual | fixability: external | state: open",
      "- id: INC-20260407-01 | date: 2026-04-07 | scope: task normalize hosted reconcile target selection | tags: workflow, github, transport, normalize | match: task normalize, sync-hosted-merges, gh api EOF, GraphQL EOF | failure: GitHub EOF or TLS transport failures during hosted branch_pr reconcile could abort task normalize before it reached the known stale task because the command scanned every candidate task. | advice: When GitHub transport is flaky, reconcile only the known task ids instead of scanning the full branch_pr history. | rule: Hosted reconcile commands MUST support explicit task-id scoping so known drift can be resolved without depending on unrelated GitHub lookups. | evidence: task 202604071853-XGX2YJ; commit 5fd312cceb20 | enforcement: manual | source_task: 202604071853-XGX2YJ | fixability: external | state: open",
    ].join("\n");

    const next = appendIncidentRegistryEntries(current, [
      {
        id: "INC-20260408-01",
        date: "2026-04-08",
        scope: "incident registry write budget enforcement",
        failure: "registry writes could exceed the incidents.md line budget",
        rule: "Incident registry writes MUST fail before exceeding the incidents.md line budget.",
        evidence: "task TASK-BUDGET",
        enforcement: "test + command implementation",
        state: "open",
        tags: ["incidents", "policy"],
        match: ["incidents", "budget"],
        advice: "validate the next registry text before writing",
        sourceTask: "TASK-BUDGET",
        fixability: "external",
        rawFields: {},
        line: 0,
      },
    ]);
    const reparsed = parseIncidentRegistry(next);

    expect(next.startsWith(compactRegistryHeader)).toBe(true);
    expect(next).not.toContain("\n\n- id:");
    expect(next).not.toContain("source_task: 202604071853-XGX2YJ |");
    expect(reparsed.entries.map((entry) => entry.id)).toEqual([
      "INC-20260407-01",
      "INC-20260407-02",
      "INC-20260408-01",
    ]);
  });

  it("keeps compact appends within the existing compact style without materializing derived source_task lines", () => {
    const current = [
      compactRegistryHeader,
      "- id: INC-20260409-01 | date: 2026-04-09 | scope: branch_pr work-start base task README cleanup | failure: work start left untracked base README copies that later blocked git pull. | rule: branch_pr work start MUST remove base-checkout task README copies that were only materialized for the worktree. | evidence: task 202604081931-77V6J5 | enforcement: test + command implementation | state: stabilized",
    ].join("\n");

    const next = appendIncidentRegistryEntries(current, [
      {
        id: "INC-20260409-02",
        date: "2026-04-09",
        scope: "branch_pr GitHub auth env propagation",
        failure: "dotenv-injected auth vars overrode a valid gh keyring session",
        rule: "branch_pr GitHub child processes MUST prefer explicit shell auth and ignore repo dotenv auth fallbacks.",
        evidence: "task 202604091841-2ZX1MQ",
        enforcement: "test + command implementation",
        state: "open",
        tags: ["workflow", "github"],
        match: ["gh", "github", "dotenv"],
        advice:
          "prefer explicit shell auth and strip repo dotenv fallback tokens from gh child env",
        sourceTask: "202604091841-2ZX1MQ",
        fixability: "external",
        rawFields: {},
        line: 0,
      },
    ]);

    expect(next.startsWith(compactRegistryHeader)).toBe(true);
    expect(next).not.toContain("\n\n- id:");
    expect(next).not.toContain("source_task:");
    expect(parseIncidentRegistry(next).entries.map((entry) => entry.sourceTask)).toEqual([
      "202604081931-77V6J5",
      "202604091841-2ZX1MQ",
    ]);
  });
});
