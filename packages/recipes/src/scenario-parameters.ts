import { parseScenarioV2, type ScenarioV2Definition } from "./scenario-v2.js";
import { isScenarioRepoPath } from "./internal-utils.js";

export type ScenarioParameterValue = string | number | boolean;
export type ScenarioParameterBinding = { name: string; value: ScenarioParameterValue };

export class MissingScenarioParametersError extends Error {
  readonly parameterNames: readonly string[];

  constructor(parameterNames: readonly string[]) {
    super(`Missing required parameters: ${parameterNames.join(", ")}`);
    this.name = "MissingScenarioParametersError";
    this.parameterNames = [...parameterNames];
  }
}

/**
 * Resolve {{name}} tokens once in semantic/path fields. No effects or Plan admission occur here.
 * Bindings are a list so duplicate names cannot disappear during object construction.
 */
export function resolveScenarioParameters(
  raw: unknown,
  bindings: readonly ScenarioParameterBinding[],
): ScenarioV2Definition {
  const scenario = parseScenarioV2(raw);
  const declarations = new Map(scenario.parameters.map((entry) => [entry.name, entry]));
  const values = new Map<string, ScenarioParameterValue>();
  for (const binding of bindings) {
    if (!declarations.has(binding.name)) throw new Error(`Unknown parameter: ${binding.name}`);
    if (values.has(binding.name)) throw new Error(`Duplicate parameter: ${binding.name}`);
    values.set(binding.name, binding.value);
  }
  const missing: string[] = [];
  for (const declaration of scenario.parameters) {
    if (!values.has(declaration.name) && declaration.default !== undefined) {
      values.set(declaration.name, declaration.default);
    }
    if (!values.has(declaration.name)) {
      if (declaration.required) missing.push(declaration.name);
      continue;
    }
    const value = values.get(declaration.name);
    const valid =
      declaration.type === "integer"
        ? typeof value === "number" && Number.isSafeInteger(value)
        : declaration.type === "repo_path"
          ? typeof value === "string" && isScenarioRepoPath(value)
          : typeof value === declaration.type;
    if (!valid) throw new Error(`Invalid ${declaration.type} parameter: ${declaration.name}`);
  }

  if (missing.length > 0) throw new MissingScenarioParametersError(missing);

  // Only these exact Scenario V2 fields admit substitution. New schema fields default to deny.
  const semantic =
    /^(?:summary|description|goal|plan_template\.(?:criteria\.\d+\.description|work_items\.\d+\.(?:objective|context\.symbol_hints\.\d+)|assumptions\.\d+|unresolved_questions\.\d+)|applicability\.(?:required|excluded)\.\d+\.value)$/u;
  const paths =
    /^(?:applicability\.(?:required|excluded)\.\d+\.path|plan_template\.work_items\.\d+\.(?:scope_roots\.\d+|context\.(?:required_sources|optional_sources)\.\d+))$/u;

  function interpolate(value: string, field: string, path: boolean): string {
    // Replace callbacks never rescan returned text or interpret replacement-string tokens.
    const result = value.replaceAll(
      /\{\{([A-Za-z_][A-Za-z0-9_]*)\}\}/gu,
      (_match, name: string) => {
        if (!values.has(name)) throw new Error(`Unbound parameter ${name} in ${field}`);
        if (path && declarations.get(name)?.type !== "repo_path") {
          throw new Error(`Path field ${field} requires a repo_path parameter: ${name}`);
        }
        return String(values.get(name));
      },
    );
    // Reject nested, unknown and malformed placeholders rather than recursively interpreting them.
    if (result.includes("{{") || result.includes("}}")) {
      throw new Error(`Unresolved placeholder in ${field}`);
    }
    if (path && !isScenarioRepoPath(result)) throw new Error(`Invalid repository path in ${field}`);
    return result;
  }

  function visit(value: unknown, field: string, pathResource = false): unknown {
    if (typeof value === "string") {
      const path = pathResource || paths.test(field);
      if (path || semantic.test(field)) return interpolate(value, field, path);
      if (value.includes("{{") || value.includes("}}")) {
        throw new Error(`Placeholders are forbidden in ${field}`);
      }
      return value;
    }
    if (Array.isArray(value)) return value.map((entry, index) => visit(entry, `${field}.${index}`));
    if (value !== null && typeof value === "object") {
      const record = value as Record<string, unknown>;
      return Object.fromEntries(
        Object.entries(record).map(([key, entry]) => {
          const next = field ? `${field}.${key}` : key;
          // Declarations and defaults remain source data; only referenced values are substituted.
          if (next === "parameters") return [key, entry];
          const resource =
            key === "resource" &&
            record.kind === "path" &&
            /^plan_template\.work_items\.\d+\.resource_claims\.\d+$/u.test(field);
          return [key, visit(entry, next, resource)];
        }),
      );
    }
    return value;
  }
  return parseScenarioV2(visit(scenario, ""));
}
