import type {
  WorkflowDiagnostic,
  WorkflowTemplateRenderOptions,
  WorkflowValidationResult,
} from "./types.js";
import { diagnosticsToValidationResult } from "./markdown.js";

function stringifyTemplateValue(value: unknown): string {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return String(value);
  }
  if (typeof value === "symbol") {
    return value.description ? `Symbol(${value.description})` : "Symbol()";
  }
  return JSON.stringify(value) ?? "";
}

const DEFAULT_FILTERS: WorkflowTemplateRenderOptions["allowedFilters"] = {
  upper: (value) => stringifyTemplateValue(value).toUpperCase(),
  lower: (value) => stringifyTemplateValue(value).toLowerCase(),
  trim: (value) => stringifyTemplateValue(value).trim(),
  json: (value) => JSON.stringify(value),
};

const DEFAULT_OPTIONS: WorkflowTemplateRenderOptions = {
  strictVariables: true,
  strictFilters: true,
  allowedFilters: DEFAULT_FILTERS,
};

function getPathValue(context: Record<string, unknown>, dottedPath: string): unknown {
  const segments = dottedPath.split(".");
  let current: unknown = context;
  for (const segment of segments) {
    if (!current || typeof current !== "object") return undefined;
    const record = current as Record<string, unknown>;
    current = record[segment];
  }
  return current;
}

export function validateTemplateStrict(
  template: string,
  context: Record<string, unknown>,
  options: Partial<WorkflowTemplateRenderOptions> = {},
): WorkflowValidationResult {
  const opts: WorkflowTemplateRenderOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    allowedFilters: { ...DEFAULT_FILTERS, ...options.allowedFilters },
  };

  const diagnostics: WorkflowDiagnostic[] = [];
  const re = /{{\s*([a-zA-Z_][\w.]*)(?:\s*\|\s*([a-zA-Z_][\w-]*))?\s*}}/g;

  for (const match of template.matchAll(re)) {
    const variable = match[1];
    const filter = match[2];

    if (variable && opts.strictVariables) {
      const value = getPathValue(context, variable);
      if (value === undefined) {
        diagnostics.push({
          code: "WF_TEMPLATE_UNKNOWN_VARIABLE",
          severity: "ERROR",
          path: `template.${variable}`,
          message: `Unknown template variable: ${variable}`,
        });
      }
    }

    if (filter && opts.strictFilters && !opts.allowedFilters[filter]) {
      diagnostics.push({
        code: "WF_TEMPLATE_UNKNOWN_FILTER",
        severity: "ERROR",
        path: `template.filter.${filter}`,
        message: `Unknown template filter: ${filter}`,
      });
    }
  }

  return diagnosticsToValidationResult(diagnostics);
}

export function renderTemplateStrict(
  template: string,
  context: Record<string, unknown>,
  options: Partial<WorkflowTemplateRenderOptions> = {},
): { text: string; diagnostics: WorkflowDiagnostic[] } {
  const opts: WorkflowTemplateRenderOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    allowedFilters: { ...DEFAULT_FILTERS, ...options.allowedFilters },
  };

  const validation = validateTemplateStrict(template, context, opts);
  if (!validation.ok) {
    return {
      text: template,
      diagnostics: validation.diagnostics,
    };
  }

  const rendered = template.replaceAll(
    /{{\s*([a-zA-Z_][\w.]*)(?:\s*\|\s*([a-zA-Z_][\w-]*))?\s*}}/g,
    (_full, variable: string, filter: string | undefined) => {
      let value = getPathValue(context, variable);
      if (filter) {
        value = opts.allowedFilters[filter]?.(value);
      }
      return stringifyTemplateValue(value);
    },
  );

  return {
    text: rendered,
    diagnostics: [],
  };
}
