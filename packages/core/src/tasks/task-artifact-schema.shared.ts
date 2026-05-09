import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { formatZodIssues } from "../schemas/zod-error-format.js";
export { isRecord } from "../types/guards.js";

export type JsonSchemaDocument = Record<string, unknown>;

export const NON_EMPTY_STRING = z.string().min(1);
export const ISO_UTC_TIMESTAMP = z.string().datetime({ offset: true });
export const NULLABLE_NON_EMPTY_STRING = NON_EMPTY_STRING.nullable();
export const NULLABLE_ISO_UTC_TIMESTAMP = ISO_UTC_TIMESTAMP.nullable();

const zodToJsonSchemaSafe = zodToJsonSchema as (
  schema: z.ZodTypeAny,
  options: {
    target: "jsonSchema7";
    $refStrategy: "none";
  },
) => JsonSchemaDocument;

export function buildJsonSchemaDocument(
  schema: z.ZodTypeAny,
  meta: {
    $id: string;
    title: string;
    description?: string;
  },
): JsonSchemaDocument {
  const generated = zodToJsonSchemaSafe(schema, {
    target: "jsonSchema7",
    $refStrategy: "none",
  });
  const { $schema: _schema, definitions: _definitions, ...rest } = generated;
  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: meta.$id,
    title: meta.title,
    ...(meta.description ? { description: meta.description } : {}),
    ...rest,
  };
}

export function formatSchemaErrors(label: string, issues: z.ZodIssue[] | undefined): string {
  if (!issues || issues.length === 0) return `${label} schema validation failed`;
  return formatZodIssues(`${label} schema validation failed`, issues);
}

export function schemaErrors<T>(label: string, schema: z.ZodType<T>, value: unknown): string[] {
  const parsed = schema.safeParse(value);
  return parsed.success ? [] : [formatSchemaErrors(label, parsed.error.issues)];
}

export function assertValid<T>(label: string, schema: z.ZodType<T>, value: unknown): T {
  const parsed = schema.safeParse(value);
  if (!parsed.success) throw new Error(formatSchemaErrors(label, parsed.error.issues));
  return parsed.data;
}
