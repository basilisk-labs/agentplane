import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  applyEvaluatorSgrReview: vi.fn(),
  createEvaluatorArtifactPreparationPort: vi.fn(() => ({ prepare: vi.fn() })),
  executeEvaluatorSupervisorEpisode: vi.fn(),
  loadEvaluatorCatalog: vi.fn(),
  loadTaskFromContext: vi.fn(),
}));

vi.mock("../../evaluators/catalog.js", () => ({
  loadEvaluatorCatalog: mocks.loadEvaluatorCatalog,
}));
vi.mock("../evaluator/evaluator-review-apply.js", () => ({
  applyEvaluatorSgrReview: mocks.applyEvaluatorSgrReview,
}));
vi.mock("../evaluator/evaluator-execute-supervisor.js", () => ({
  executeEvaluatorSupervisorEpisode: mocks.executeEvaluatorSupervisorEpisode,
}));
vi.mock("../evaluator/evaluator-artifact-port.js", () => ({
  createEvaluatorArtifactPreparationPort: mocks.createEvaluatorArtifactPreparationPort,
}));
vi.mock("../shared/task-backend.js", () => ({
  loadTaskFromContext: mocks.loadTaskFromContext,
}));

import { runAndApplyDirectTaskEvaluator } from "./direct-task-supervisor-evaluator.js";

describe("direct task supervisor evaluator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.loadEvaluatorCatalog.mockResolvedValue([{ id: "recovery-context" }]);
    mocks.loadTaskFromContext.mockResolvedValue({ quality_review: null });
    mocks.executeEvaluatorSupervisorEpisode.mockResolvedValue({
      result: { evaluator_id: "recovery-context", verdict: "pass" },
      result_path: "/repo/result.json",
      report_path: "/repo/report.md",
      work_order_path: "/repo/work-order.json",
    });
    mocks.applyEvaluatorSgrReview.mockResolvedValue({
      result_path: "result.json",
      report_path: "report.md",
    });
  });

  it("propagates replacement authority to the evaluator episode", async () => {
    await runAndApplyDirectTaskEvaluator({
      ctx: { cwd: "/repo" },
      command: { resolvedProject: { gitRoot: "/repo" } } as never,
      task: { id: "task-1" } as never,
      task_id: "task-1",
      evaluator_id: "recovery-context",
      replacement: true,
    });

    expect(mocks.executeEvaluatorSupervisorEpisode).toHaveBeenCalledWith(
      expect.objectContaining({ replacement: true }),
    );
  });
});
