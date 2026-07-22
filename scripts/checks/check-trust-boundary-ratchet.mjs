import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

import {
  collectTrustBoundaryViolations,
  validateTrustBoundaryBaseline,
} from "../lib/trust-boundary-ratchet.mjs";
import { defineCheck, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const BASELINE_PATH = "scripts/baselines/trust-boundary-violations.json";
const REVIEWED_CAPTURE_COMMIT = "5e4f067fd5d1d3ef9238540231ce9306133b4161";
const REVIEWED_ORIGIN_DIGEST = "0c1a5c01641cbf5095a732ca57c7deb22314f8793ca4ddfae8e9dca636816c83";

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

function gitOutput(root, args) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function readCheckedOutBaseBaseline(options) {
  const relativeBaselinePath = path.relative(options.root, options.baselinePath);
  if (relativeBaselinePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativeBaselinePath)) {
    throw new Error("baseline path must stay inside the repository for base comparison");
  }
  let mergeBase;
  try {
    mergeBase = gitOutput(options.root, ["merge-base", "HEAD", options.baseRef]);
  } catch (error) {
    throw new Error(`cannot resolve merge-base against ${options.baseRef}`, { cause: error });
  }
  const gitPath = relativeBaselinePath.split(path.sep).join("/");
  try {
    gitOutput(options.root, ["cat-file", "-e", `${mergeBase}:${gitPath}`]);
  } catch (error) {
    if (mergeBase === REVIEWED_CAPTURE_COMMIT) {
      return { baseline: null, mergeBase };
    }
    throw new Error(
      `cannot read ${gitPath} from checked-out base ${mergeBase}; refusing to run without the monotonic base`,
      { cause: error },
    );
  }
  let content;
  try {
    content = gitOutput(options.root, ["show", `${mergeBase}:${gitPath}`]);
  } catch (error) {
    throw new Error(`cannot read ${gitPath} from checked-out base ${mergeBase}`, {
      cause: error,
    });
  }
  try {
    return { baseline: JSON.parse(content), mergeBase };
  } catch (error) {
    throw new Error(`checked-out base baseline at ${mergeBase}:${gitPath} is invalid JSON`, {
      cause: error,
    });
  }
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
    const { baseline: baseBaseline } = readCheckedOutBaseBaseline(options);
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
