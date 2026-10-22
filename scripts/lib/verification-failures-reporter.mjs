import { createVerificationObservation } from "./verification-observation.mjs";

// Vitest 5's reported-task API supplies failed files, cases and hook/collection
// errors without relying on a mutable runner cache or parsing colored output.
export default class VerificationFailuresReporter {
  observation;
  onInit() {
    const directory = process.env.AGENTPLANE_VERIFICATION_OBSERVATION_DIR;
    if (!directory) return;
    try {
      this.observation = createVerificationObservation({
        directory,
        maxRuns: 64,
        budgetDirectory: process.env.AGENTPLANE_VERIFICATION_BUDGET_DIR,
        binding: {
          kind: "vitest_failures",
          command: JSON.stringify(process.argv),
          deadline_ms: Number(process.env.AGENTPLANE_NATIVE_CHECK_DEADLINE_EPOCH_MS) || 0,
          implementation: process.env.AGENTPLANE_VERIFICATION_IMPLEMENTATION ?? "unavailable",
          parent_run_id: process.env.AGENTPLANE_VERIFICATION_PARENT_RUN_ID,
          runtime: { node: process.version, platform: process.platform, arch: process.arch },
        },
      });
      this.observation.structured("incomplete");
    } catch {
      /* Parent evidence records missing child manifests; never change test outcomes. */
    }
  }
  errors(errors) {
    return (errors ?? []).map((error) => ({
      name: String(error.name ?? "Error"),
      message: String(error.message ?? ""),
      stack: String(error.stack ?? ""),
      ...(typeof error.actual === "string" ? { actual: error.actual } : {}),
      ...(typeof error.expected === "string" ? { expected: error.expected } : {}),
    }));
  }
  onTestCaseResult(test) {
    const result = test.result();
    if (result.state !== "failed") return;
    this.observation?.failure({
      kind: "test",
      file: test.module.moduleId,
      name: test.fullName,
      errors: this.errors(result.errors),
    });
  }
  onTestModuleEnd(module) {
    for (const entity of [module, ...module.children.allSuites()]) {
      const errors = entity.errors();
      if (errors.length > 0)
        this.observation?.failure({
          kind: entity.type,
          file: module.moduleId,
          name: entity.fullName ?? module.relativeModuleId,
          errors: this.errors(errors),
        });
    }
  }
  onTestRunEnd(modules, errors, reason) {
    if (!this.observation) return;
    if (errors.length > 0)
      this.observation.failure({ kind: "unhandled", errors: this.errors(errors) });
    this.observation.structured(reason === "interrupted" ? "incomplete" : "complete");
    this.observation.finish(
      reason === "interrupted"
        ? "cancelled"
        : errors.length > 0 || modules.some((module) => !module.ok())
          ? "failed"
          : "passed",
    );
  }
}
