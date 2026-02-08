import { describe, expect, it } from "vitest";

import { parseCommandArgv } from "../cli2/parse.js";
import { backendSyncSpec } from "./backend/sync.command.js";
import { syncSpec } from "./sync.command.js";

describe("commands/backend", () => {
  it("rejects backend sync with missing args", () => {
    try {
      parseCommandArgv(backendSyncSpec, []);
      throw new Error("expected E_USAGE");
    } catch (err) {
      expect(err).toMatchObject({ code: "E_USAGE" });
    }
  });

  it("rejects sync with duplicate backend ids", () => {
    try {
      parseCommandArgv(syncSpec, ["local", "extra"]);
      throw new Error("expected E_USAGE");
    } catch (err) {
      expect(err).toMatchObject({ code: "E_USAGE" });
    }
  });
});
