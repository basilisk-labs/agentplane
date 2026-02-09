import { describe, expect, it } from "vitest";

import { parseCommandArgv } from "../cli/spec/parse.js";
import { upgradeSpec } from "./upgrade.command.js";

describe("upgradeSpec parsing/validation", () => {
  it("rejects unknown options", () => {
    try {
      parseCommandArgv(upgradeSpec, ["--nope"]);
      throw new Error("expected parseCommandArgv to throw");
    } catch (err) {
      expect(err).toMatchObject({ code: "E_USAGE" });
    }
  });

  it("rejects bundle without checksum (spec validate)", () => {
    try {
      parseCommandArgv(upgradeSpec, ["--bundle", "bundle.tar.gz"]);
      throw new Error("expected parseCommandArgv to throw");
    } catch (err) {
      expect(err).toMatchObject({ code: "E_USAGE" });
    }
  });

  it("rejects checksum without bundle (spec validate)", () => {
    try {
      parseCommandArgv(upgradeSpec, ["--checksum", "bundle.tar.gz.sha256"]);
      throw new Error("expected parseCommandArgv to throw");
    } catch (err) {
      expect(err).toMatchObject({ code: "E_USAGE" });
    }
  });

  it("rejects missing value after --source", () => {
    try {
      parseCommandArgv(upgradeSpec, ["--source"]);
      throw new Error("expected parseCommandArgv to throw");
    } catch (err) {
      expect(err).toMatchObject({ code: "E_USAGE" });
    }
  });

  it("requires --remote when passing remote hint options", () => {
    try {
      parseCommandArgv(upgradeSpec, ["--tag", "v0.1.0"]);
      throw new Error("expected parseCommandArgv to throw");
    } catch (err) {
      expect(err).toMatchObject({ code: "E_USAGE" });
    }
  });

  it("rejects positional args", () => {
    try {
      parseCommandArgv(upgradeSpec, ["oops"]);
      throw new Error("expected parseCommandArgv to throw");
    } catch (err) {
      expect(err).toMatchObject({ code: "E_USAGE" });
    }
  });
});
