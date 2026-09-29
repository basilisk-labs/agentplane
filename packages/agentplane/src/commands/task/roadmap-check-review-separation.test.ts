import path from "node:path";

import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { afterEach, describe, expect, it } from "vitest";

import {
  directTaskVerificationInputIdentity,
  type DirectTaskVerificationResult,
} from "./direct-task-verification.js";
import { kernelCheckReviewDisposition } from "./kernel-inspection.js";

const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
});

function result(
  status: DirectTaskVerificationResult["status"],
  failureKind?: "infrastructure",
): DirectTaskVerificationResult {
  return {
    status,
    artifact_path: ".agentplane/checks.json",
    reason: status === "passed" ? null : "observed failure",
    checks: [
      {
        command: "bun test focused.test.ts",
        script: null,
        check_ids: ["focused"],
        exit_code: status === "passed" ? 0 : failureKind ? null : 1,
        duration_ms: 1,
        stdout_tail: "",
        stderr_tail: "",
        ...(failureKind ? { failure_kind: failureKind } : {}),
      },
    ],
  };
}

describe("LC-07 native verification and review separation", () => {
  it("stops failed native checks before review and preserves infrastructure retry", () => {
    expect(kernelCheckReviewDisposition(result("failed"))).toBe("rework");
    expect(kernelCheckReviewDisposition(result("unsupported", "infrastructure"))).toBe("retry");
    expect(kernelCheckReviewDisposition(result("unsupported"))).toBe("blocked");
  });

  it("requires independent review after passing checks", () => {
    expect(kernelCheckReviewDisposition(result("passed"))).toBe("review");
  });

  it("reuses check evidence only for the same command, checkout, and runtime inputs", () => {
    const cwd = process.cwd();
    const baseline = directTaskVerificationInputIdentity({
      cwd,
      commands: ["bun test focused.test.ts"],
    });
    expect(
      k.kernelDigest(
        directTaskVerificationInputIdentity({
          cwd,
          commands: ["bun test focused.test.ts"],
        }),
      ),
    ).toBe(k.kernelDigest(baseline));
    expect(
      k.kernelDigest(
        directTaskVerificationInputIdentity({
          cwd,
          commands: ["bun test changed.test.ts"],
        }),
      ),
    ).not.toBe(k.kernelDigest(baseline));
    expect(
      k.kernelDigest(
        directTaskVerificationInputIdentity({
          cwd: path.join(cwd, "packages"),
          commands: ["bun test focused.test.ts"],
        }),
      ),
    ).not.toBe(k.kernelDigest(baseline));

    process.env.PATH = path.dirname(process.execPath);
    expect(
      k.kernelDigest(
        directTaskVerificationInputIdentity({
          cwd,
          commands: ["bun test focused.test.ts"],
        }),
      ),
    ).not.toBe(k.kernelDigest(baseline));
  });
});
