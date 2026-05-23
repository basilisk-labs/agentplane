import { describe, expect, it } from "vitest";

import { parseCommandArgv } from "../../cli/spec/parse.js";

import { evaluatorRunSpec } from "./evaluator.spec.js";

describe("evaluator run command", () => {
  it("parses structured review evidence and findings as repeatable fields", () => {
    const { parsed } = parseCommandArgv(evaluatorRunSpec, [
      "T-1",
      "--verdict",
      "pass",
      "--summary",
      "Reviewed diff and verification evidence.",
      "--finding",
      "No unresolved implementation findings after diff review.",
      "--finding",
      "Verification evidence covers the declared task contract.",
      "--evidence",
      ".agentplane/tasks/T-1/README.md",
      "--evidence",
      "bun test focused-suite",
      "--missing-test",
      "No additional missing tests found.",
      "--hidden-assumption",
      "Hosted checks must be read from current PR head.",
      "--residual-risk",
      "No residual runtime risk beyond normal CI coverage.",
      "--json",
    ]);

    expect(parsed).toMatchObject({
      taskId: "T-1",
      evaluator: "recovery-context",
      verdict: "pass",
      summary: "Reviewed diff and verification evidence.",
      findings: [
        "No unresolved implementation findings after diff review.",
        "Verification evidence covers the declared task contract.",
      ],
      evidenceRefs: [".agentplane/tasks/T-1/README.md", "bun test focused-suite"],
      missingTests: ["No additional missing tests found."],
      hiddenAssumptions: ["Hosted checks must be read from current PR head."],
      residualRisks: ["No residual runtime risk beyond normal CI coverage."],
      json: true,
      record: true,
    });
  });

  it("requires an explicit verdict", () => {
    expect(() => parseCommandArgv(evaluatorRunSpec, ["T-1"])).toThrow(/Provide --verdict/);
  });
});
