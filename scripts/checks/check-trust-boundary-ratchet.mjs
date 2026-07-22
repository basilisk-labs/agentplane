import { readFileSync } from "node:fs";
import path from "node:path";

import {
  collectTrustBoundaryViolations,
  validateTrustBoundaryBaseline,
} from "../lib/trust-boundary-ratchet.mjs";
import { defineCheck, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const BASELINE_PATH = "scripts/baselines/trust-boundary-violations.json";
const REVIEWED_ORIGIN_DIGEST = "eb66f918d05f34e76c2a6ac2a041088a0eb49a53a88b8bfe9b8e0554a836fc7b";

function parseArgs(argv, context) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["root", "baseline"],
    booleanFlags: ["report"],
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  const root = path.resolve(context.cwd, flags.root ?? ".");
  return {
    root,
    baselinePath: path.resolve(root, flags.baseline ?? BASELINE_PATH),
    report: flags.report === true,
  };
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
    const errors = validateTrustBoundaryBaseline({
      baseline,
      violations,
      expectedOriginDigest: REVIEWED_ORIGIN_DIGEST,
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
