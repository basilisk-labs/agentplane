import { describe, expect, it } from "vitest";

import {
  UnsupportedWorkflowVersionError,
  WORKFLOW_FRONT_MATTER_JSON_SCHEMA,
  WORKFLOW_V1_FRONT_MATTER_FIXTURE,
  WORKFLOW_V2_FRONT_MATTER_FIXTURE,
  migrateWorkflowFrontMatterV1ToV2,
  parseWorkflowFrontMatter,
  renderWorkflowV1FrontMatterFixtureJson,
  renderWorkflowV2FrontMatterFixtureJson,
} from "./workflow-contract.js";

describe("WORKFLOW front matter contract", () => {
  it("normalizes supported v1 input to v2 meaning", () => {
    const normalized = parseWorkflowFrontMatter(WORKFLOW_V1_FRONT_MATTER_FIXTURE);

    expect(normalized).toEqual({
      version: 2,
      workflow: { mode: "branch_pr" },
      owners: WORKFLOW_V1_FRONT_MATTER_FIXTURE.owners,
      approvals: WORKFLOW_V1_FRONT_MATTER_FIXTURE.approvals,
      retry_policy: WORKFLOW_V1_FRONT_MATTER_FIXTURE.retry_policy,
      timeouts: WORKFLOW_V1_FRONT_MATTER_FIXTURE.timeouts,
      in_scope_paths: WORKFLOW_V1_FRONT_MATTER_FIXTURE.in_scope_paths,
    });
  });

  it("keeps valid v2 fields without materializing absent defaults", () => {
    const normalized = parseWorkflowFrontMatter(WORKFLOW_V2_FRONT_MATTER_FIXTURE);

    expect(normalized).toEqual(WORKFLOW_V2_FRONT_MATTER_FIXTURE);
    expect(normalized.approvals).not.toHaveProperty("require_force");
    expect(normalized.tasks).toEqual({
      backend: { config_path: ".agentplane/backends/local/backend.json" },
    });
  });

  it("rejects unsupported future versions with a typed error", () => {
    expect(() =>
      parseWorkflowFrontMatter({
        ...WORKFLOW_V2_FRONT_MATTER_FIXTURE,
        version: 3,
      }),
    ).toThrow(UnsupportedWorkflowVersionError);

    try {
      parseWorkflowFrontMatter({ ...WORKFLOW_V2_FRONT_MATTER_FIXTURE, version: 3 });
      throw new Error("expected unsupported version error");
    } catch (error) {
      expect(error).toMatchObject({
        code: "WF_UNSUPPORTED_VERSION",
        version: 3,
        supportedVersions: [1, 2],
      });
    }
  });

  it("publishes v1 and v2 branches from the same Zod source", () => {
    const branches = WORKFLOW_FRONT_MATTER_JSON_SCHEMA.anyOf as {
      properties?: { version?: { const?: number } };
    }[];

    expect(branches.map((branch) => branch.properties?.version?.const)).toEqual([1, 2]);
    expect(JSON.parse(renderWorkflowV1FrontMatterFixtureJson())).toEqual(
      WORKFLOW_V1_FRONT_MATTER_FIXTURE,
    );
    expect(JSON.parse(renderWorkflowV2FrontMatterFixtureJson())).toEqual(
      WORKFLOW_V2_FRONT_MATTER_FIXTURE,
    );
  });

  it("keeps the pure v1 migrator deterministic", () => {
    const first = migrateWorkflowFrontMatterV1ToV2(WORKFLOW_V1_FRONT_MATTER_FIXTURE);
    const second = migrateWorkflowFrontMatterV1ToV2(WORKFLOW_V1_FRONT_MATTER_FIXTURE);

    expect(second).toEqual(first);
  });
});
