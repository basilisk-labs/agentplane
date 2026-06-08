import type {
  LoopRegistry,
  LoopSpec,
  LoopValidationProblem,
  LoopValidationResult,
} from "./model.js";

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function problem(
  code: LoopValidationProblem["code"],
  message: string,
  path?: string,
): LoopValidationProblem {
  return { code, message, ...(path ? { path } : {}) };
}

function duplicates(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const repeated = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) repeated.add(value);
    seen.add(value);
  }
  return [...repeated].toSorted();
}

export function validateLoopSpec(loop: LoopSpec): LoopValidationResult {
  const errors: LoopValidationProblem[] = [];
  if (!hasText(loop.id)) errors.push(problem("empty_field", "Loop id must be non-empty.", "id"));
  if (!hasText(loop.version)) {
    errors.push(problem("empty_field", "Loop version must be non-empty.", "version"));
  }
  if (!hasText(loop.title)) {
    errors.push(problem("empty_field", "Loop title must be non-empty.", "title"));
  }
  if (!hasText(loop.description)) {
    errors.push(problem("empty_field", "Loop description must be non-empty.", "description"));
  }
  if (loop.steps.length === 0) {
    errors.push(problem("missing_step", "Loop must define at least one step.", "steps"));
  }
  if (loop.transitions.length === 0) {
    errors.push(
      problem("missing_transition", "Loop must define at least one transition.", "transitions"),
    );
  }
  if (loop.outputs.required.length === 0) {
    errors.push(
      problem("missing_output", "Loop must define at least one required output.", "outputs"),
    );
  }
  if (!Number.isInteger(loop.budgets.maxIterations) || loop.budgets.maxIterations < 1) {
    errors.push(
      problem("invalid_budget", "Loop budgets.maxIterations must be a positive integer."),
    );
  }

  for (const duplicate of duplicates(loop.steps.map((step) => step.id))) {
    errors.push(problem("duplicate_step_id", `Duplicate loop step id: ${duplicate}`, "steps"));
  }
  for (const duplicate of duplicates(loop.stopConditions.map((condition) => condition.id))) {
    errors.push(
      problem(
        "duplicate_stop_condition_id",
        `Duplicate loop stop condition id: ${duplicate}`,
        "stopConditions",
      ),
    );
  }

  const stepIds = new Set(loop.steps.map((step) => step.id));
  for (const transition of loop.transitions) {
    if (transition.from && !stepIds.has(transition.from)) {
      errors.push(
        problem(
          "unknown_transition_step",
          `Transition references unknown from step: ${transition.from}`,
          "transitions",
        ),
      );
    }
    if (
      transition.to !== "finish" &&
      transition.to !== "blocked" &&
      transition.to !== "human_review"
    ) {
      if (!stepIds.has(transition.to)) {
        errors.push(
          problem(
            "unknown_transition_step",
            `Transition references unknown target step: ${transition.to}`,
            "transitions",
          ),
        );
      }
    }
  }
  return { ok: errors.length === 0, errors };
}

export function validateLoopRegistry(registry: LoopRegistry): LoopValidationResult {
  const errors: LoopValidationProblem[] = [];
  for (const duplicate of duplicates(registry.loops.map((loop) => loop.id))) {
    errors.push(problem("duplicate_loop_id", `Duplicate loop id: ${duplicate}`));
  }
  for (const loop of registry.loops) {
    errors.push(...validateLoopSpec(loop).errors);
  }
  return { ok: errors.length === 0, errors };
}
