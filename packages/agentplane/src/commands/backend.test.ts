import { describe, expect, it } from "vitest";

import { parseCommandArgv } from "../cli/spec/parse.js";
import {
  backendInspectSpec,
  backendMigrateCanonicalStateSpec,
  backendSyncSpec,
} from "./backend/sync.command.js";
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

  it("rejects backend migrate-canonical-state with missing args", () => {
    try {
      parseCommandArgv(backendMigrateCanonicalStateSpec, []);
      throw new Error("expected E_USAGE");
    } catch (err) {
      expect(err).toMatchObject({ code: "E_USAGE" });
    }
  });

  it("rejects backend inspect with missing args", () => {
    try {
      parseCommandArgv(backendInspectSpec, []);
      throw new Error("expected E_USAGE");
    } catch (err) {
      expect(err).toMatchObject({ code: "E_USAGE" });
    }
  });
});
