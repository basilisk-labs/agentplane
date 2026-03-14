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

  it("parses --allow-tarball", () => {
    const out = parseCommandArgv(upgradeSpec, ["--remote", "--allow-tarball"]);
    expect(out.parsed.allowTarball).toBe(true);
  });

  it("defaults to auto mode (apply-first)", () => {
    const out = parseCommandArgv(upgradeSpec, []);
    expect(out.parsed.mode).toBe("auto");
  });

  it("parses --agent mode", () => {
    const out = parseCommandArgv(upgradeSpec, ["--agent"]);
    expect(out.parsed.mode).toBe("agent");
  });

  it("parses --migrate-task-docs", () => {
    const out = parseCommandArgv(upgradeSpec, ["--migrate-task-docs"]);
    expect(out.parsed.migrateTaskDocs).toBe(true);
  });

  it("rejects --agent + --auto", () => {
    try {
      parseCommandArgv(upgradeSpec, ["--agent", "--auto"]);
      throw new Error("expected parseCommandArgv to throw");
    } catch (err) {
      expect(err).toMatchObject({ code: "E_USAGE" });
    }
  });

  it("rejects --migrate-task-docs with --agent", () => {
    try {
      parseCommandArgv(upgradeSpec, ["--agent", "--migrate-task-docs"]);
      throw new Error("expected parseCommandArgv to throw");
    } catch (err) {
      expect(err).toMatchObject({ code: "E_USAGE" });
    }
  });

  it("rejects --migrate-task-docs with --dry-run", () => {
    try {
      parseCommandArgv(upgradeSpec, ["--dry-run", "--migrate-task-docs"]);
      throw new Error("expected parseCommandArgv to throw");
    } catch (err) {
      expect(err).toMatchObject({ code: "E_USAGE" });
    }
  });
});
