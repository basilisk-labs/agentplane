import type {
  LoopContractValueType,
  LoopMetricSource,
  LoopRegistry,
  LoopSpec,
  LoopStep,
  LoopValidationProblem,
  LoopValidationResult,
} from "./model.js";
import { isSupportedLoopCondition } from "./conditions.js";

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

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

const VALID_CONTRACT_VALUE_TYPES = new Set<LoopContractValueType>([
  "string",
  "number",
  "boolean",
  "object",
  "array",
  "json",
  "path",
  "ref",
]);

const VALID_METRIC_SOURCES = new Set<LoopMetricSource>(["rule", "check", "evaluator", "aggregate"]);

function validateContractEntries(opts: {
  entries: unknown;
  path: string;
  kind: "inputs" | "outputs" | "artifacts";
}): LoopValidationProblem[] {
  const errors: LoopValidationProblem[] = [];
  if (opts.entries === undefined) return errors;
  if (!Array.isArray(opts.entries)) {
    return [
      problem("invalid_step_contract", `Step contract ${opts.kind} must be an array.`, opts.path),
    ];
  }
  const ids: string[] = [];
  for (const [index, entry] of opts.entries.entries()) {
    const entryPath = `${opts.path}.${opts.kind}[${index}]`;
    if (!isObject(entry)) {
      errors.push(problem("invalid_step_contract", "Contract entry must be an object.", entryPath));
      continue;
    }
    if (!hasText(entry.id)) {
      errors.push(
        problem("invalid_step_contract", "Contract entry id must be non-empty.", entryPath),
      );
    } else {
      ids.push(entry.id);
    }
    const entryType = entry.type;
    if (entryType !== undefined) {
      if (
        !hasText(entryType) ||
        !VALID_CONTRACT_VALUE_TYPES.has(entryType as LoopContractValueType)
      ) {
        errors.push(
          problem(
            "invalid_step_contract",
            `Contract entry type must be one of: ${[...VALID_CONTRACT_VALUE_TYPES].join(", ")}.`,
            entryPath,
          ),
        );
      }
    }
    if (opts.kind === "artifacts" && entry.path !== undefined && !hasText(entry.path)) {
      errors.push(
        problem("invalid_step_contract", "Artifact contract path must be non-empty.", entryPath),
      );
    }
  }
  for (const duplicate of duplicates(ids)) {
    errors.push(
      problem(
        "duplicate_contract_id",
        `Duplicate ${opts.kind} contract id: ${duplicate}`,
        opts.path,
      ),
    );
  }
  return errors;
}

function validateStepContract(step: LoopStep, stepIndex: number): LoopValidationProblem[] {
  const contract = step.contract as unknown;
  if (contract === undefined) return [];
  const path = `steps[${stepIndex}].contract`;
  if (!isObject(contract)) {
    return [problem("invalid_step_contract", "Step contract must be an object.", path)];
  }
  const errors: LoopValidationProblem[] = [];
  if (contract.schemaRef !== undefined && !hasText(contract.schemaRef)) {
    errors.push(
      problem("invalid_step_contract", "Step contract schemaRef must be non-empty.", path),
    );
  }
  errors.push(...validateContractEntries({ entries: contract.inputs, path, kind: "inputs" }));
  errors.push(...validateContractEntries({ entries: contract.outputs, path, kind: "outputs" }));
  errors.push(...validateContractEntries({ entries: contract.artifacts, path, kind: "artifacts" }));
  return errors;
}

function validateMetrics(loop: LoopSpec): LoopValidationProblem[] {
  const metrics = loop.metrics as unknown;
  if (metrics === undefined) return [];
  if (!Array.isArray(metrics)) {
    return [problem("invalid_metric", "Loop metrics must be an array.", "metrics")];
  }
  const errors: LoopValidationProblem[] = [];
  const ids: string[] = [];
  for (const [index, metric] of metrics.entries()) {
    const metricPath = `metrics[${index}]`;
    if (!isObject(metric)) {
      errors.push(problem("invalid_metric", "Metric definition must be an object.", metricPath));
      continue;
    }
    if (!hasText(metric.id)) {
      errors.push(problem("invalid_metric", "Metric id must be non-empty.", metricPath));
    } else {
      ids.push(metric.id);
    }
    const source = metric.source;
    if (!hasText(source) || !VALID_METRIC_SOURCES.has(source as LoopMetricSource)) {
      errors.push(
        problem(
          "invalid_metric",
          `Metric source must be one of: ${[...VALID_METRIC_SOURCES].join(", ")}.`,
          metricPath,
        ),
      );
    }
    if (
      metric.weight !== undefined &&
      (typeof metric.weight !== "number" || !Number.isFinite(metric.weight) || metric.weight <= 0)
    ) {
      errors.push(
        problem("invalid_metric", "Metric weight must be a positive number.", metricPath),
      );
    }
    if (
      metric.threshold !== undefined &&
      (typeof metric.threshold !== "number" ||
        !Number.isFinite(metric.threshold) ||
        metric.threshold < 0 ||
        metric.threshold > 1)
    ) {
      errors.push(
        problem("invalid_metric", "Metric threshold must be between 0 and 1.", metricPath),
      );
    }
    if (metric.refs !== undefined && !Array.isArray(metric.refs)) {
      errors.push(problem("invalid_metric", "Metric refs must be an array.", metricPath));
    }
  }
  for (const duplicate of duplicates(ids)) {
    errors.push(problem("duplicate_metric_id", `Duplicate metric id: ${duplicate}`, "metrics"));
  }
  return errors;
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
  const positiveIntegerBudgets: (keyof typeof loop.budgets)[] = [
    "maxWallTimeMinutes",
    "maxChangedFiles",
    "maxDiffLines",
    "maxAgentRuns",
    "maxInputTokens",
    "maxOutputTokens",
    "maxTotalTokens",
    "maxNoProgressIterations",
  ];
  for (const budget of positiveIntegerBudgets) {
    const value = loop.budgets[budget];
    if (value !== undefined && (!Number.isInteger(value) || value < 1)) {
      errors.push(
        problem(
          "invalid_budget",
          `Loop budgets.${budget} must be a positive integer.`,
          `budgets.${budget}`,
        ),
      );
    }
  }

  for (const duplicate of duplicates(loop.steps.map((step) => step.id))) {
    errors.push(problem("duplicate_step_id", `Duplicate loop step id: ${duplicate}`, "steps"));
  }
  for (const [index, step] of loop.steps.entries()) {
    errors.push(...validateStepContract(step, index));
  }
  errors.push(...validateMetrics(loop));
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
    if (isSupportedLoopCondition(transition.if) === false) {
      errors.push(
        problem(
          "unknown_transition_condition",
          `Transition condition is not in the deterministic condition registry: ${transition.if}`,
          "transitions",
        ),
      );
    }
    if (transition.from && !stepIds.has(transition.from)) {
      errors.push(
        problem(
          "unknown_transition_step",
          `Transition references unknown from step: ${transition.from}`,
          "transitions",
        ),
      );
    }
    const nonTerminalTarget =
      transition.to !== "finish" && transition.to !== "blocked" && transition.to !== "human_review";
    if (nonTerminalTarget === false || stepIds.has(transition.to)) continue;
    errors.push(
      problem(
        "unknown_transition_step",
        `Transition references unknown target step: ${transition.to}`,
        "transitions",
      ),
    );
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
