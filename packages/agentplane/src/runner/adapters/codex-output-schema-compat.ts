import { isRecord } from "../../shared/guards.js";

function simplifyCodexSchemaComposition(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((entry) => simplifyCodexSchemaComposition(entry));
  }
  if (!isRecord(value)) return value;
  if (Object.keys(value).length === 1 && Array.isArray(value.allOf) && value.allOf.length === 1) {
    return simplifyCodexSchemaComposition(value.allOf[0]);
  }
  for (const keyword of ["oneOf", "anyOf"] as const) {
    const alternatives: unknown = value[keyword];
    if (!Array.isArray(alternatives) || alternatives.length === 0) continue;
    const siblings = Object.fromEntries(Object.entries(value).filter(([key]) => key !== keyword));
    const preferred: unknown = alternatives[0];
    return simplifyCodexSchemaComposition(
      isRecord(preferred) ? { ...preferred, ...siblings } : siblings,
    );
  }
  return Object.fromEntries(
    Object.entries(value).map(([key, nested]) => [key, simplifyCodexSchemaComposition(nested)]),
  );
}

function requireEveryCodexObjectProperty(
  value: unknown,
  rootFields: ReadonlySet<string>,
  root = true,
): unknown {
  if (Array.isArray(value)) {
    return value.map((entry) => requireEveryCodexObjectProperty(entry, rootFields, false));
  }
  if (!isRecord(value)) return value;
  const properties = isRecord(value.properties) ? value.properties : null;
  if (properties) {
    const originallyRequired = new Set(
      Array.isArray(value.required)
        ? value.required.filter((field): field is string => typeof field === "string")
        : [],
    );
    for (const [key, property] of Object.entries(properties)) {
      if (
        !originallyRequired.has(key) &&
        !(root && rootFields.has(key)) &&
        isRecord(property) &&
        typeof property.type === "string"
      ) {
        property.type = [property.type, "null"];
      }
    }
    value.required = Object.keys(properties);
  }
  return Object.fromEntries(
    Object.entries(value).map(([key, nested]) => [
      key,
      requireEveryCodexObjectProperty(nested, rootFields, false),
    ]),
  );
}

export function omitNullCodexFields(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((entry) => omitNullCodexFields(entry));
  if (!isRecord(value)) return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([, nested]) => nested !== null)
      .map(([key, nested]) => [key, omitNullCodexFields(nested)]),
  );
}

export function codexCompatibleRoleSchema(
  schema: Record<string, unknown>,
  rootFields: ReadonlySet<string>,
): Record<string, unknown> {
  delete schema.allOf;
  const blocker = isRecord(schema.properties) ? schema.properties.blocker : null;
  const blockerProperties =
    isRecord(blocker) && isRecord(blocker.properties) ? blocker.properties : null;
  const scopeExtension = blockerProperties?.scope_extension_request;
  if (isRecord(scopeExtension) && Array.isArray(scopeExtension.anyOf)) {
    const first: unknown = scopeExtension.anyOf[0];
    if (isRecord(first)) {
      delete scopeExtension.anyOf;
      Object.assign(scopeExtension, first);
      if (isRecord(scopeExtension.properties)) {
        for (const field of ["scope_roots", "repository_effects"]) {
          const property = scopeExtension.properties[field];
          if (isRecord(property)) delete property.minItems;
        }
      }
    }
  }
  const simplified = simplifyCodexSchemaComposition(schema);
  return requireEveryCodexObjectProperty(simplified, rootFields) as Record<string, unknown>;
}
