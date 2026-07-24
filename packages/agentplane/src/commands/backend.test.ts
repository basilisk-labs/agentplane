import { describe, expect, it } from "vitest";

import { parseCommandArgv } from "../cli/spec/parse.js";
import {
  backendInspectSpec,
  backendMigrateCanonicalStateSpec,
  backendSyncSpec,
} from "./backend/sync.command.js";
import { cmdBackendSyncParsed } from "./backend.js";
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

  it("parses explicit projection bootstrap and adoption flags", () => {
    expect(
      parseCommandArgv(backendSyncSpec, [
        "cloud",
        "--direction",
        "push",
        "--conflict",
        "fail",
        "--bootstrap-projection",
      ]),
    ).toMatchObject({
      parsed: {
        bootstrapProjection: true,
        adoptProjectionIdentity: false,
      },
    });
    expect(
      parseCommandArgv(syncSpec, [
        "--direction",
        "pull",
        "--conflict",
        "prefer-remote",
        "--adopt-projection-identity",
      ]),
    ).toMatchObject({
      parsed: {
        bootstrapProjection: false,
        adoptProjectionIdentity: true,
      },
    });
  });

  it("rejects conflicting projection identity transitions before loading context", async () => {
    await expect(
      cmdBackendSyncParsed({
        cwd: process.cwd(),
        flags: {
          backendId: "cloud",
          direction: "push",
          conflict: "fail",
          watch: false,
          intervalMs: 30_000,
          maxIterations: 0,
          bootstrapProjection: true,
          adoptProjectionIdentity: true,
          yes: true,
          quiet: true,
        },
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
      context: { reason_code: "sync_identity_transition_conflict" },
    });
  });

  it("rejects projection bootstrap outside fail-closed push mode", async () => {
    await expect(
      cmdBackendSyncParsed({
        cwd: process.cwd(),
        flags: {
          backendId: "cloud",
          direction: "push",
          conflict: "diff",
          watch: false,
          intervalMs: 30_000,
          maxIterations: 0,
          bootstrapProjection: true,
          yes: true,
          quiet: true,
        },
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
      context: { reason_code: "sync_bootstrap_projection_invalid" },
    });
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
