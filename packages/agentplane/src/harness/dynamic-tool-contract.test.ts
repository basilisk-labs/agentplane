import { describe, expect, it } from "vitest";

import { executeDynamicTool } from "./dynamic-tool-contract.js";

describe("harness/dynamic-tool-contract", () => {
  const registry = {
    ping: {
      name: "ping",
      description: "ping tool",
      inputSchema: {
        required: ["message"],
        properties: { message: { type: "string" } },
        additionalProperties: false,
      },
    },
  };

  it("rejects unsupported tool", async () => {
    const res = await executeDynamicTool({ registry, handlers: {}, toolName: "missing", args: {} });
    expect(res.code).toBe("TOOL_UNSUPPORTED");
  });

  it("rejects invalid args", async () => {
    const res = await executeDynamicTool({
      registry,
      handlers: { ping: () => "ok" },
      toolName: "ping",
      args: {},
    });
    expect(res.code).toBe("TOOL_INVALID_ARGS");
  });

  it("returns normalized success envelope", async () => {
    const res = await executeDynamicTool({
      registry,
      handlers: { ping: (args) => ({ echoed: args.message }) },
      toolName: "ping",
      args: { message: "hello" },
    });
    expect(res).toEqual({ success: true, code: "TOOL_OK", data: { echoed: "hello" } });
  });
});
