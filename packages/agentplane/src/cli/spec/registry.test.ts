import { describe, expect, it } from "vitest";

import { CommandRegistry } from "./registry.js";

const noopHandler = () => Promise.resolve(0);

describe("CommandRegistry", () => {
  it("throws on duplicate command ids", () => {
    const registry = new CommandRegistry();

    const spec = {
      id: ["dup"],
      group: "Test",
      summary: "test",
      args: [],
      options: [],
      examples: [],
      parse: () => ({}),
    } as const;

    registry.register(spec, noopHandler);
    expect(() => registry.register(spec, noopHandler)).toThrow(/Duplicate command id/i);
  });
});
