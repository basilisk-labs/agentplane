import { readFileSync } from "node:fs";
import path from "node:path";

import {
  collectTrustBoundaryViolations,
  readTrustBoundaryReferenceBaseline,
  validateTrustBoundaryBaseline,
} from "../lib/trust-boundary-ratchet.mjs";
import { defineCheck, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const BASELINE_PATH = "scripts/baselines/trust-boundary-violations.json";
const REVIEWED_CAPTURE_COMMIT = "5e4f067fd5d1d3ef9238540231ce9306133b4161";
const REVIEWED_ORIGIN_DIGEST = "8b7f261aedcc8f907ee3016ae3a393d795c4f4441e2a923a32677588b05c23cb";

function parseArgs(argv, context) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["root", "baseline", "base-ref"],
    booleanFlags: ["report"],
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  const root = path.resolve(context.cwd, flags.root ?? ".");
  return {
    root,
    baselinePath: path.resolve(root, flags.baseline ?? BASELINE_PATH),
    baseRef: flags["base-ref"] ?? "origin/main",
    report: flags.report === true,
  };
}

function readCurrentReferenceBaseline(options) {
  const relativeBaselinePath = path.relative(options.root, options.baselinePath);
  if (relativeBaselinePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativeBaselinePath)) {
    throw new Error("baseline path must stay inside the repository for base comparison");
  }
  return readTrustBoundaryReferenceBaseline({
    root: options.root,
    reference: options.baseRef,
    baselineRelativePath: relativeBaselinePath,
    allowedMissingAtCommit: REVIEWED_CAPTURE_COMMIT,
  });
}

const main = defineCheck({
  name: "check-trust-boundary-ratchet",
  parseArgs,
  check({ options, stdout }) {
    const violations = collectTrustBoundaryViolations(options.root);
    if (options.report) {
      stdout.write(`${JSON.stringify(violations, null, 2)}\n`);
      return;
    }
    const baseline = JSON.parse(readFileSync(options.baselinePath, "utf8"));
    const { baseline: baseBaseline } = readCurrentReferenceBaseline(options);
    const errors = validateTrustBoundaryBaseline({
      baseline,
      baseBaseline,
      violations,
      expectedOriginDigest: REVIEWED_ORIGIN_DIGEST,
      expectedCapturedFromCommit: REVIEWED_CAPTURE_COMMIT,
    });
    if (errors.length > 0) {
      throw new Error(
        [
          `trust-boundary ratchet failed with ${String(errors.length)} issue(s):`,
          ...errors.map((error) => `- ${error}`),
          "",
          "Remove new violations. When a legacy violation is fixed, delete its active baseline entry; never add debt to the reviewed origin.",
        ].join("\n"),
      );
    }
    const counts = Object.fromEntries(
      [...new Set(violations.map((entry) => entry.rule_id))]
        .toSorted()
        .map((ruleId) => [ruleId, violations.filter((entry) => entry.rule_id === ruleId).length]),
    );
    stdout.write(
      `trust-boundary ratchet OK (${String(violations.length)} reviewed violation(s); ${Object.entries(
        counts,
      )
        .map(([ruleId, count]) => `${ruleId}=${String(count)}`)
        .join(", ")})\n`,
    );
  },
});

runScriptMain(main);
