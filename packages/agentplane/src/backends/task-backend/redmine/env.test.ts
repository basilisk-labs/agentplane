import { afterEach, describe, expect, it } from "vitest";

import { BackendError } from "../shared.js";
import { readRedmineEnv } from "./env.js";

const SNAPSHOT_ENV = { ...process.env };

function resetRedmineEnv(): void {
  for (const key of Object.keys(process.env)) {
    if (key.startsWith("AGENTPLANE_REDMINE_")) delete process.env[key];
  }
}

afterEach(() => {
  resetRedmineEnv();
  Object.assign(process.env, SNAPSHOT_ENV);
});

describe("readRedmineEnv", () => {
  it("parses all supported redmine env keys", () => {
    process.env.AGENTPLANE_REDMINE_URL = "https://redmine.example";
    process.env.AGENTPLANE_REDMINE_API_KEY = "key";
    process.env.AGENTPLANE_REDMINE_PROJECT_ID = "proj";
    process.env.AGENTPLANE_REDMINE_ASSIGNEE_ID = "7";
    process.env.AGENTPLANE_REDMINE_OWNER_AGENT = "CODER";
    process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID = "1";
    process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC = "2";
    process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC_VERSION = "3";
    process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC_UPDATED_AT = "4";
    process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC_UPDATED_BY = "5";
    process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_TAGS = "6";
    process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_PRIORITY = "7";
    process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_OWNER = "8";
    process.env.AGENTPLANE_REDMINE_BATCH_SIZE = "50";
    process.env.AGENTPLANE_REDMINE_BATCH_PAUSE = "200";

    const parsed = readRedmineEnv();
    expect(parsed.url).toBe("https://redmine.example");
    expect(parsed.apiKey).toBe("key");
    expect(parsed.projectId).toBe("proj");
    expect(parsed.assigneeId).toBe(7);
    expect(parsed.ownerAgent).toBe("CODER");
    expect(parsed.customFields).toEqual({
      task_id: 1,
      doc: 2,
      doc_version: 3,
      doc_updated_at: 4,
      doc_updated_by: 5,
      tags: 6,
      priority: 7,
      owner: 8,
    });
    expect(parsed.batch).toEqual({ size: 50, pauseMs: 200 });
  });

  it("throws a backend error for invalid integer values", () => {
    process.env.AGENTPLANE_REDMINE_BATCH_SIZE = "invalid";
    expect(() => readRedmineEnv()).toThrow(BackendError);
    expect(() => readRedmineEnv()).toThrow(
      /Invalid Redmine configuration env value for AGENTPLANE_REDMINE_BATCH_SIZE/u,
    );
  });
});
