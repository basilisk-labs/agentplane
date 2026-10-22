import assert from "node:assert/strict";
import { format } from "prettier";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { codingCases, qualifyCodingFixture, observeCodingBehavior } from "./coding-corpus.mjs";

const sha = (bytes) => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
const directory = "artifacts/bench/m05-live-0.7.13";
const historicalPath = `${directory}/coding-corpus-qualification.json`;
const historical = JSON.parse(readFileSync(historicalPath, "utf8"));
const root = mkdtempSync(path.join(os.tmpdir(), "m05-framing-qualification-"));
try {
  const cases = codingCases().map((spec) => {
    const proof = qualifyCodingFixture(root, spec);
    const prior = historical.cases.find((entry) => entry.manifest.id === spec.id);
    assert.deepEqual(proof.manifest, prior.manifest, "Frozen fixture inputs changed");
    return { manifest: proof.manifest, qualification: proof.qualification };
  });
  const spec = codingCases()[0];
  const subject = path.join(root, spec.id);
  const policyPath = path.join(root, `${spec.id}-oracle-policy.json`);
  const negativeControls = [];
  for (const invalid of ["NaN", "Infinity", "-Infinity", "undefined", "negative_zero"]) {
    const candidate =
      invalid === "negative_zero"
        ? spec.reference.replace(
            "Number(value) : null",
            "(value === '0' ? -0 : Number(value)) : null",
          )
        : `export const solve=value=>value==='4x'?null:typeof value==='string'&&/^(0|[1-9][0-9]*)$/.test(value)&&Number.isSafeInteger(Number(value))?Number(value):${invalid};\n`;
    writeFileSync(path.join(subject, "src/module.mjs"), candidate);
    execFileSync(process.execPath, ["visible.test.mjs"], { cwd: subject, stdio: "pipe" });
    const observation = observeCodingBehavior(subject, spec, policyPath);
    assert.equal(observation.passed, false, invalid);
    assert.equal(observation.process_status, 0, "Rejection must be behavioral, not infrastructure");
    negativeControls.push({ kind: invalid, visible_status: 0, observation });
  }
  const files = [
    "coding-corpus.mjs",
    "coding-corpus.test.mjs",
    "qualify-oracle-framing.mjs",
    "isolation.mjs",
    "landlock-runner.py",
  ];
  const evidence = {
    schema_version: 1,
    kind: "agentplane.m05_oracle_framing_qualification",
    task_id: "202610100510-X193M6",
    mode: "offline",
    economic_measurement: false,
    source_base: "54512a1e74e4586ee2692ae7ce42076cb02237b0",
    historical_artifact: {
      path: historicalPath,
      digest: sha(readFileSync(historicalPath)),
      superseded_claim: "Lossy JSON output comparison is not sufficient behavioral qualification.",
    },
    provenance: Object.fromEntries(
      files.map((file) => {
        const relative = `scripts/bench/internal/paired-m05/${file}`;
        return [relative, sha(readFileSync(relative))];
      }),
    ),
    cases,
    negative_controls: negativeControls,
    launch_gaps: [
      "Independent review pending for this exact framing implementation.",
      "Full broker/tool/read isolation is a separate qualification owned by CT33WV.",
      "Historical Recipe setup token usage is unknown; no zero-cost or efficiency claim.",
      "Product/model/strategy freeze and prospectively measured setup remain campaign requirements.",
    ],
  };
  writeFileSync(
    `${directory}/oracle-framing-qualification.json`,
    await format(JSON.stringify(evidence), { parser: "json" }),
  );
  console.log(
    "Five unchanged fixtures: initial RED/reference GREEN; five visible-PASS invalid-output controls rejected.",
  );
} finally {
  rmSync(root, { recursive: true, force: true });
}
