import { describe, expect, it } from "vitest";

import { isWorkflowEnforcementDisabled, workflowEnforcementEnvHint } from "./enforcement.js";

describe("workflow-runtime/enforcement", () => {
  it("defaults to enforcement enabled", () => {
    expect(isWorkflowEnforcementDisabled({})).toBe(false);
  });

  it("treats AGENTPLANE_WORKFLOW_ENFORCEMENT=off as disabled", () => {
    expect(isWorkflowEnforcementDisabled({ AGENTPLANE_WORKFLOW_ENFORCEMENT: "off" })).toBe(true);
    expect(isWorkflowEnforcementDisabled({ AGENTPLANE_WORKFLOW_ENFORCEMENT: "FALSE" })).toBe(true);
  });

  it("supports legacy AGENTPLANE_WORKFLOW_CONTRACT alias", () => {
    expect(isWorkflowEnforcementDisabled({ AGENTPLANE_WORKFLOW_CONTRACT: "0" })).toBe(true);
  });

  it("returns canonical env hint", () => {
    expect(workflowEnforcementEnvHint()).toBe("AGENTPLANE_WORKFLOW_ENFORCEMENT");
  });
});
