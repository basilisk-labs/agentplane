import { describe, expect, it } from "vitest";
import { parseCommandArgv } from "../../cli/spec/parse.js";
import { taskScopeExtendSpec } from "./scope-extend.command.js";

const REQUEST_DIGEST = `sha256:${"1".repeat(64)}`;
const STATE_SCOPE_DIGEST = `sha256:${"2".repeat(64)}`;
const STATE_FINGERPRINT = `sha256:${"3".repeat(64)}`;

describe("task scope extend command parsing", () => {
  it.each(
    [
      { option: "--state-scope-digest", value: STATE_SCOPE_DIGEST, key: "stateScopeDigest" },
      { option: "--state-fingerprint", value: STATE_FINGERPRINT, key: "stateFingerprint" },
    ].flatMap((binding) => [false, true].map((padded) => ({ ...binding, padded }))),
  )(
    "preserves scalar $option after normalization (padded=$padded)",
    ({ option, value, key, padded }) => {
      expect(
        parseCommandArgv(taskScopeExtendSpec, [
          "T-1",
          "--scope-root",
          "packages/agentplane",
          "--request-digest",
          REQUEST_DIGEST,
          option,
          padded ? `  ${value}  ` : value,
          "--by",
          "USER",
        ]),
      ).toMatchObject({
        parsed: {
          taskId: "T-1",
          scopeRoots: ["packages/agentplane"],
          requestDigest: REQUEST_DIGEST,
          by: "USER",
          [key]: value,
        },
      });
    },
  );

  it("continues to reject a missing state binding", () => {
    const base = [
      "T-1",
      "--scope-root",
      "packages/agentplane",
      "--request-digest",
      REQUEST_DIGEST,
      "--by",
      "USER",
    ];

    expect(() => parseCommandArgv(taskScopeExtendSpec, base)).toThrow(
      "One of --state-scope-digest or --state-fingerprint is required.",
    );
  });

  it.each(["--state-scope-digest", "--state-fingerprint"] as const)(
    "treats whitespace-only %s as missing",
    (option) => {
      expect(() =>
        parseCommandArgv(taskScopeExtendSpec, [
          "T-1",
          "--scope-root",
          "packages/agentplane",
          "--request-digest",
          REQUEST_DIGEST,
          option,
          "   ",
          "--by",
          "USER",
        ]),
      ).toThrow("One of --state-scope-digest or --state-fingerprint is required.");
    },
  );

  it.each(["--state-scope-digest", "--state-fingerprint"] as const)(
    "continues to reject malformed %s",
    (option) => {
      const base = [
        "T-1",
        "--scope-root",
        "packages/agentplane",
        "--request-digest",
        REQUEST_DIGEST,
        "--by",
        "USER",
      ];

      expect(() =>
        parseCommandArgv(taskScopeExtendSpec, [...base, option, "sha256:not-a-digest"]),
      ).toThrow(`${option} must be an exact sha256:<64 lowercase hex> digest.`);
    },
  );
});
