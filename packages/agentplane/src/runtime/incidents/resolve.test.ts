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
      "- Observation: local test suite was slow",
      "  Impact: local loop was slower.",
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
});
