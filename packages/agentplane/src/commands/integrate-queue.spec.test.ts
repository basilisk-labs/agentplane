import { describe, expect, it } from "vitest";

import { parseCommandArgv } from "../cli/spec/parse.js";
import { integrateQueueRunNextSpec } from "./integrate-queue.spec.js";

describe("integrate queue spec parsing/validation", () => {
  it("parses bounded wait polling options for run-next", () => {
    const out = parseCommandArgv(integrateQueueRunNextSpec, [
      "--wait",
      "--poll-interval-ms",
      "30000",
      "--timeout-ms",
      "600000",
    ]);

    expect(out.parsed.wait).toBe(true);
    expect(out.parsed.pollIntervalMs).toBe(30_000);
    expect(out.parsed.timeoutMs).toBe(600_000);
  });

  it("rejects invalid wait polling values", () => {
    try {
      parseCommandArgv(integrateQueueRunNextSpec, ["--poll-interval-ms", "0"]);
      throw new Error("expected parseCommandArgv to throw");
    } catch (err) {
      expect(err).toMatchObject({ code: "E_USAGE" });
    }
  });
});
