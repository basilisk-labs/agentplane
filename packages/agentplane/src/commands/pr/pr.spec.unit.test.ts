import { describe, expect, it } from "vitest";

import { parseCommandArgv } from "../../cli/spec/parse.js";
import { prCheckSpec } from "./pr.spec.js";

describe("pr spec parsing", () => {
  it("parses hosted check options for pr check", () => {
    const out = parseCommandArgv(prCheckSpec, [
      "202605271730-QSZ1R3",
      "--hosted",
      "--stable-polls",
      "2",
      "--poll-interval-ms",
      "5000",
      "--timeout-ms",
      "120000",
      "--required-check",
      "PR verification",
    ]);

    expect(out.parsed).toMatchObject({
      taskId: "202605271730-QSZ1R3",
      hosted: true,
      stablePolls: 2,
      pollIntervalMs: 5000,
      timeoutMs: 120_000,
      requiredChecks: ["PR verification"],
    });
  });
});
