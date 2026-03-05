export type DynamicToolInputSchema = {
  required?: string[];
  properties?: Record<string, { type: "string" | "number" | "boolean" | "object" | "array" }>;
  additionalProperties?: boolean;
};

export type DynamicToolSpec = {
  name: string;
  description: string;
  inputSchema: DynamicToolInputSchema;
};

export type DynamicToolRegistry = Record<string, DynamicToolSpec>;

export type DynamicToolResponse = {
  success: boolean;
  code: "TOOL_OK" | "TOOL_UNSUPPORTED" | "TOOL_INVALID_ARGS" | "TOOL_EXECUTION_FAILED";
  data?: unknown;
  error?: {
    message: string;
    reason?: string;
  };
};

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function matchesType(value: unknown, type: string): boolean {
  if (type === "array") return Array.isArray(value);
  if (type === "object") return isObject(value);
  return typeof value === type;
}

function validateInput(
  schema: DynamicToolInputSchema,
  args: unknown,
): { ok: boolean; message?: string } {
  if (!isObject(args)) {
    return { ok: false, message: "Tool arguments must be an object." };
  }

  const required = schema.required ?? [];
  for (const key of required) {
    if (!(key in args)) {
      return { ok: false, message: `Missing required field: ${key}` };
    }
  }

  const properties = schema.properties ?? {};
  for (const [key, value] of Object.entries(args)) {
    const propSchema = properties[key];
    if (!propSchema) {
      if (schema.additionalProperties === false) {
        return { ok: false, message: `Unknown argument: ${key}` };
      }
      continue;
    }
    if (!matchesType(value, propSchema.type)) {
      return {
        ok: false,
        message: `Invalid type for ${key}: expected ${propSchema.type}`,
      };
    }
  }

  return { ok: true };
}

export async function executeDynamicTool(opts: {
  registry: DynamicToolRegistry;
  handlers: Record<string, (args: Record<string, unknown>) => unknown>;
  toolName: string;
  args: unknown;
}): Promise<DynamicToolResponse> {
  const spec = opts.registry[opts.toolName];
  if (!spec) {
    return {
      success: false,
      code: "TOOL_UNSUPPORTED",
      error: {
        message: `Unsupported tool: ${opts.toolName}`,
      },
    };
  }

  const valid = validateInput(spec.inputSchema, opts.args);
  if (!valid.ok) {
    return {
      success: false,
      code: "TOOL_INVALID_ARGS",
      error: {
        message: valid.message ?? "Invalid tool arguments.",
      },
    };
  }

  const handler = opts.handlers[opts.toolName];
  if (!handler) {
    return {
      success: false,
      code: "TOOL_UNSUPPORTED",
      error: { message: `No handler registered for tool: ${opts.toolName}` },
    };
  }

  try {
    const data = await handler(opts.args as Record<string, unknown>);
    return {
      success: true,
      code: "TOOL_OK",
      data,
    };
  } catch (error) {
    return {
      success: false,
      code: "TOOL_EXECUTION_FAILED",
      error: {
        message: "Tool execution failed.",
        reason: error instanceof Error ? error.message : String(error),
      },
    };
  }
}
