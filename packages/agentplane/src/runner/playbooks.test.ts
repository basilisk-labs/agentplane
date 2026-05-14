import { describe, expect, it } from "vitest";

import { makeRunnerContextBundle } from "@agentplane/testkit/runner";

import {
  buildRunnerExecutionPlaybookContract,
  resolveRunnerTaskPlaybook,
  verifyRunnerFinalState,
} from "./playbooks.js";

describe("runner execution playbooks", () => {
  it("selects the knowledge capture playbook from task signals", () => {
    const bundle = makeRunnerContextBundle({
      title: "Process inbox item into capture and distill thread",
      description: "Read the inbox source, create a knowledge card, and update the thread.",
      tags: ["context"],
    });

    const resolved = resolveRunnerTaskPlaybook(bundle);

    expect(resolved.playbook?.id).toBe("knowledge_capture_pipeline");
    expect(resolved.match_reasons.length).toBeGreaterThanOrEqual(3);
  });

  it("keeps execution blueprint state separate from playbook steps", () => {
    const bundle = makeRunnerContextBundle({
      title: "Capture inbox source into knowledge base",
      description: "Create capture, distill card, thread update, and retire the source.",
    });

    const contract = buildRunnerExecutionPlaybookContract(bundle);

    expect(contract.execution_blueprint.id).toBe("knowledge_capture_result");
    expect(contract.selected_playbook?.required_steps).toContain("write_card");
    expect(contract.execution_blueprint.required_state).toEqual([
      "capture_artifact_exists",
      "distill_card_exists",
      "retrieval_index_updated",
      "source_retired",
    ]);
  });

  it("blocks success when the final verifier state is incomplete", () => {
    const bundle = makeRunnerContextBundle({
      title: "Capture inbox source into knowledge base",
      description: "Create capture, distill card, thread update, and retire the source.",
    });
    const contract = buildRunnerExecutionPlaybookContract(bundle);

    const result = verifyRunnerFinalState({
      contract,
      state: {
        capture_artifact_exists: true,
        distill_card_exists: true,
      },
    });

    expect(result.ok).toBe(false);
    expect(result.missing).toEqual(["retrieval_index_updated", "source_retired"]);
  });
});
