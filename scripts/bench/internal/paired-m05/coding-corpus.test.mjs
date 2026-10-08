import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  codingCases,
  qualifyCodingFixture,
  observeCodingBehavior,
  verifyCodingOutcome,
} from "./coding-corpus.mjs";

for (const spec of codingCases())
  test(`genuine coding corpus: ${spec.id} initially fails and reference passes`, (t) => {
    const root = mkdtempSync(path.join(os.tmpdir(), "m05-coding-"));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    const proof = qualifyCodingFixture(root, spec);
    assert.match(proof.manifest.initial_commit, /^[a-f0-9]{40}$/u);
    assert.equal(proof.qualification.initial.passed, false);
    assert.equal(proof.qualification.reference.passed, true);
    writeFileSync(
      path.join(proof.subject, "src/module.mjs"),
      "import fs from 'node:fs'; export const solve=()=>fs.readFileSync('/proc/self/environ','utf8');\n",
    );
    assert.equal(observeCodingBehavior(proof.subject, spec, proof.policyPath).passed, false);
  });

test("oracle rejects module-level stdout spoofing and host-environment access", (t) => {
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-oracle-adversary-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const spec = codingCases()[0],
    proof = qualifyCodingFixture(root, spec);
  for (const source of [
    "import fs from 'node:fs'; export const solve=()=>0; const inputs=JSON.parse(fs.readFileSync(0,'utf8')); console.log(JSON.stringify(inputs.map(([v])=>typeof v==='string'&&/^(0|[1-9][0-9]*)$/.test(v)&&Number.isSafeInteger(Number(v))?Number(v):null))); process.exit(0);",
    "export const solve=()=>process.env.M05_ORACLE_SENTINEL;",
    'JSON.stringify=()=>"null"; globalThis.solve=()=>42; export const solve=()=>0;',
    "export const solve=(value)=>value.constructor.constructor('return process')();",
  ]) {
    writeFileSync(path.join(proof.subject, "src/module.mjs"), source);
    assert.equal(observeCodingBehavior(proof.subject, spec, proof.policyPath).passed, false);
  }
});

test("study oracle rejects changed assertions, wrong native identity, refusal and absent recovery", async (t) => {
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-final-oracle-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const spec = codingCases()[2],
    proof = qualifyCodingFixture(root, spec);
  writeFileSync(path.join(proof.subject, "src/module.mjs"), spec.reference);
  const input = { ...proof, spec };
  const facts = ({ head }) => ({
    head,
    workflow: "direct",
    verification: "passed",
    evaluator: "pass",
    accounting_complete: true,
    scope: proof.manifest.scope,
    failed_verification_digests: ["retained-failure"],
    recovery_digest: "retained-recovery",
  });
  const verified = await verifyCodingOutcome(input, facts);
  assert.equal(verified.passed, true);
  await assert.rejects(
    verifyCodingOutcome(input, () => facts({ head: "wrong" })),
    /another source/u,
  );
  await assert.rejects(
    verifyCodingOutcome(input, (arg) => ({ ...facts(arg), failed_verification_digests: [] })),
    /failure and recovery/u,
  );
  await assert.rejects(
    verifyCodingOutcome(input, (arg) => ({ ...facts(arg), accounting_complete: false })),
    /false/u,
  );
  writeFileSync(path.join(proof.subject, "visible.test.mjs"), "// erased assertions");
  await assert.rejects(verifyCodingOutcome(input, facts), /assertions/u);
  const absent = codingCases()[3],
    noMatch = qualifyCodingFixture(root, absent);
  writeFileSync(path.join(noMatch.subject, "src/module.mjs"), absent.reference);
  await assert.rejects(
    verifyCodingOutcome({ ...noMatch, spec: absent }, (arg) => ({
      ...facts(arg),
      fallback: "refused",
    })),
    /Refusal alone/u,
  );
});
