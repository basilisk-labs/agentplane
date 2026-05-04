export type DynamicToolInputSchema = {
    required?: string[];
    properties?: Record<string, {
        type: "string" | "number" | "boolean" | "object" | "array";
    }>;
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
export declare function executeDynamicTool(opts: {
    registry: DynamicToolRegistry;
    handlers: Record<string, (args: Record<string, unknown>) => unknown>;
    toolName: string;
    args: unknown;
}): Promise<DynamicToolResponse>;
//# sourceMappingURL=dynamic-tool-contract.d.ts.map