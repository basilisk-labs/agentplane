import { describe, expect, it } from "vitest";

import path from "node:path";

import { inspectCommandAvailability } from "./hermes-environment.js";

describe("Hermes environment", () => {
  it("resolves bare Windows commands through PATHEXT", async () => {
    const visited: string[] = [];
    const result = await inspectCommandAvailability("hermes", {
      platform: "win32",
      pathValue: "C:\\tools;D:\\bin",
      pathExtValue: ".EXE;.CMD",
      pathApi: path.win32,
      accessFn: (candidate) => {
        visited.push(candidate);
        return candidate === "D:\\bin\\hermes.CMD"
          ? Promise.resolve()
          : Promise.reject(new Error("not found"));
      },
    });

    expect(result).toEqual({
      available: true,
      resolved_path: "D:\\bin\\hermes.CMD",
    });
    expect(visited).toContain("C:\\tools\\hermes.EXE");
    expect(visited).toContain("D:\\bin\\hermes.CMD");
  });
});
