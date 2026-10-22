import { readStableFile } from "./stable-file.mjs";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { digest } from "./contract.mjs";
import { runIsolated, writeIsolationPolicy } from "./isolation.mjs";

const sha = (bytes) => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
const gitEnv = {
  ...process.env,
  GIT_CONFIG_NOSYSTEM: "1",
  GIT_CONFIG_GLOBAL: "/dev/null",
  GIT_AUTHOR_DATE: "2026-10-08T00:00:00Z",
  GIT_COMMITTER_DATE: "2026-10-08T00:00:00Z",
};
const git = (cwd, args) =>
  execFileSync("git", args, {
    cwd,
    env: gitEnv,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();

// This author/oracle module stays outside the treatment process's read allowlist.
// No Plan or answer patch is placed in a subject repository.
export function codingCases() {
  return [
    {
      id: "direct-fix",
      workflow: "direct",
      selection: "exact",
      objective:
        "Return a safe nonnegative integer for canonical decimal strings (0 or a nonzero digit followed by digits); return null for other values.",
      initial: "export const solve = (value) => Number.parseInt(value, 10);\n",
      reference:
        "export const solve = (value) => typeof value === 'string' && /^(0|[1-9][0-9]*)$/.test(value) && Number.isSafeInteger(Number(value)) ? Number(value) : null;\n",
      visible: [
        [["4"], 4],
        [["4x"], null],
      ],
      hidden: [
        [["0"], 0],
        [["05"], null],
        [["9007199254740992"], null],
        [[7], null],
        [["-1"], null],
        [["42"], 42],
      ],
    },
    {
      id: "branch-change",
      workflow: "branch_pr",
      selection: "exact",
      objective:
        "Group rows by category, sum numeric amounts and return category/total objects sorted by category using code-point order.",
      initial:
        "export const solve = (rows) => rows.map(({category, amount}) => ({category, total:amount}));\n",
      reference:
        "export const solve = (rows) => { const totals = new Map(); for (const {category,amount} of rows) totals.set(category,(totals.get(category) ?? 0)+amount); const compare=(a,b)=>{const x=[...a],y=[...b];for(let i=0;i<Math.min(x.length,y.length);i++){const d=x[i].codePointAt(0)-y[i].codePointAt(0);if(d)return d;}return x.length-y.length;}; return [...totals].sort(([a],[b])=>compare(a,b)).map(([category,total])=>({category,total})); };\n",
      visible: [
        [
          [
            [
              { category: "a", amount: 2 },
              { category: "a", amount: 3 },
            ],
          ],
          [{ category: "a", total: 5 }],
        ],
      ],
      hidden: [
        [
          [
            [
              { category: "\u{10000}", amount: 1 },
              { category: "\uE000", amount: 2 },
            ],
          ],
          [
            { category: "\uE000", total: 2 },
            { category: "\u{10000}", total: 1 },
          ],
        ],
        [[[]], []],
        [
          [
            [
              { category: "z", amount: 4 },
              { category: "a", amount: 2 },
              { category: "z", amount: -1 },
            ],
          ],
          [
            { category: "a", total: 2 },
            { category: "z", total: 3 },
          ],
        ],
      ],
    },
    {
      id: "recoverable-failure",
      workflow: "direct",
      selection: "exact",
      objective:
        "Compute exponential retry delay min(cap, base * 2 ** attempt) for nonnegative integer attempts and positive base/cap. Preserve the original failed validation in native rework history.",
      initial: "export const solve = (attempt,base,cap) => Math.max(cap,base * 2 ** attempt);\n",
      reference: "export const solve = (attempt,base,cap) => Math.min(cap,base * 2 ** attempt);\n",
      visible: [[[0, 100, 1000], 100]],
      hidden: [
        [[1, 100, 1000], 200],
        [[4, 100, 1000], 1000],
        [[100, 1, 20], 20],
        [[0, 200, 100], 100],
      ],
    },
    {
      id: "no-match",
      workflow: "direct",
      selection: "no_match",
      objective:
        "Encode a query component with the encodeURIComponent contract, including spaces, ampersands and Unicode. No exact installed Recipe matches. Only a registered ordinary-planning fallback may complete coding.",
      initial: "export const solve = (value) => value.replaceAll(' ', '+');\n",
      reference: "export const solve = (value) => encodeURIComponent(value);\n",
      visible: [[["a b"], "a%20b"]],
      hidden: [
        [["a&b=c"], "a%26b%3Dc"],
        [["café"], "caf%C3%A9"],
        [[""], ""],
      ],
    },
    {
      id: "near-match",
      workflow: "direct",
      selection: "near_match",
      objective:
        "Split a line by its supplied nonempty delimiter, trim each field and preserve empty fields. The Recipe's delimiter binding is absent; request evidence or use the registered fallback without inventing it.",
      initial: "export const solve = (line,delimiter) => line.split(',');\n",
      reference:
        "export const solve = (line,delimiter) => line.split(delimiter).map((field)=>field.trim());\n",
      visible: [
        [
          [" a ; b ", ";"],
          ["a", "b"],
        ],
      ],
      hidden: [
        [
          ["a||b||", "||"],
          ["a", "b", ""],
        ],
        [
          [" x , ,y", ","],
          ["x", "", "y"],
        ],
        [["", ";"], [""]],
      ],
    },
  ];
}

export function materializeCodingFixture(root, spec) {
  assert.match(spec.id, /^[a-z0-9-]+$/u);
  const subject = path.join(root, spec.id);
  mkdirSync(path.join(subject, "src"), { recursive: true });
  writeFileSync(path.join(subject, "src/module.mjs"), spec.initial);
  const visible = `import assert from 'node:assert/strict';\nimport {solve} from './src/module.mjs';\nfor (const [args,expected] of ${JSON.stringify(spec.visible)}) assert.deepEqual(await solve(...args),expected);\n`;
  writeFileSync(path.join(subject, "visible.test.mjs"), visible);
  writeFileSync(
    path.join(subject, "README.md"),
    `# ${spec.id}\n\n${spec.objective}\n\nExport a synchronous pure solve function. Imports, process APIs and external effects are outside this fixture API.\n\nWritable source: src/module.mjs. Run node visible.test.mjs. Do not modify checks.\n`,
  );
  git(subject, ["init", "--quiet", "--initial-branch=main"]);
  git(subject, ["config", "user.name", "M05 Fixture"]);
  git(subject, ["config", "user.email", "fixture@invalid.local"]);
  git(subject, ["add", "src/module.mjs", "visible.test.mjs", "README.md"]);
  git(subject, ["commit", "--quiet", "-m", "Frozen coding fixture"]);
  const manifest = {
    schema_version: 4,
    id: spec.id,
    workflow: spec.workflow,
    selection: spec.selection,
    objective: spec.objective,
    initial_commit: git(subject, ["rev-parse", "HEAD"]),
    initial_tree: git(subject, ["rev-parse", "HEAD^{tree}"]),
    source_digest: sha(spec.initial),
    visible_digest: sha(visible),
    readme_digest: sha(readFileSync(path.join(subject, "README.md"))),
    reference_digest: sha(spec.reference),
    hidden_oracle_digest: digest(spec.hidden),
    scope: ["src/module.mjs"],
    check: "node visible.test.mjs",
  };
  return { subject, manifest };
}

// Encode values before JSON transport so invalid candidate outputs cannot alias
// valid expectations. This function runs in the trusted oracle process.
export function encodeOracleValue(value) {
  if (value === null) return ["null"];
  if (value === undefined) return ["undefined"];
  if (typeof value === "number") {
    return ["number", Object.is(value, -0) ? "-0" : String(value)];
  }
  if (typeof value === "string" || typeof value === "boolean") return [typeof value, value];
  if (Array.isArray(value)) {
    return [
      "array",
      Array.from({ length: value.length }, (_, i) =>
        Object.hasOwn(value, i) ? encodeOracleValue(value[i]) : ["hole"],
      ),
      Object.keys(value)
        .filter((key) => !/^(0|[1-9][0-9]*)$/.test(key) || Number(key) >= value.length)
        .toSorted()
        .map((key) => [key, encodeOracleValue(value[key])]),
    ];
  }
  if (typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
    return [
      "object",
      Object.keys(value)
        .toSorted()
        .map((key) => [key, encodeOracleValue(value[key])]),
    ];
  }
  throw new Error("Unsupported oracle output type");
}

export function observeCodingBehavior(subject, spec, policyPath) {
  const source = path.join(subject, "src/module.mjs");
  const sourceBytes = readStableFile(source);
  const before = sha(sourceBytes);
  // The fixture API is a pure ES module. It receives no host objects, imports,
  // process, filesystem, stdout or evaluator expectations. VM is a framing
  // boundary only; the enclosing Landlock subprocess remains the OS boundary.
  const program = `import fs from 'node:fs'; import vm from 'node:vm';
const encodeOracleValue=${encodeOracleValue.toString()};
const context=vm.createContext(Object.create(null),{codeGeneration:{strings:false,wasm:false}});
const input=JSON.parse(fs.readFileSync(0,'utf8'));
const module=new vm.SourceTextModule(input.source,{context});
await module.link(()=>{throw Error('Fixture API imports are not allowed')});
await module.evaluate({timeout:1000});
if(typeof module.namespace.solve!=='function')throw Error('Missing solve export');
const solve=module.namespace.solve;
const inputs=input.inputs;const outputs=[];
for(const args of inputs){const values=vm.runInContext('('+JSON.stringify(args)+')',context,{timeout:1000});outputs.push(encodeOracleValue(structuredClone(Reflect.apply(solve,undefined,values))));}
process.stdout.write(JSON.stringify(outputs));`;
  const result = runIsolated(
    policyPath,
    [process.execPath, "--experimental-vm-modules", "--input-type=module", "-e", program],
    {
      input: JSON.stringify({
        source: sourceBytes.toString("utf8"),
        inputs: spec.hidden.map(([args]) => args),
      }),
      cwd: subject,
    },
  );
  const after = sha(readStableFile(source));
  let outputs = null;
  try {
    outputs = JSON.parse(result.stdout);
  } catch {
    /* Missing output is a failure, not success. */
  }
  return {
    passed:
      result.status === 0 &&
      before === after &&
      digest(outputs) === digest(spec.hidden.map(([, expected]) => encodeOracleValue(expected))),
    source_digest: after,
    process_status: result.status,
    observed_digest: digest(outputs),
    expected_digest: digest(spec.hidden.map(([, expected]) => encodeOracleValue(expected))),
  };
}

export function qualifyCodingFixture(root, spec) {
  const { subject, manifest } = materializeCodingFixture(root, spec);
  const policyPath = path.join(root, `${spec.id}-oracle-policy.json`);
  writeIsolationPolicy(policyPath, { cwd: subject, readOnly: [subject] });
  const initial = observeCodingBehavior(subject, spec, policyPath);
  const initialVisible = runIsolated(policyPath, [process.execPath, "visible.test.mjs"], {
    cwd: subject,
  });
  writeFileSync(path.join(subject, "src/module.mjs"), spec.reference);
  const reference = observeCodingBehavior(subject, spec, policyPath);
  const referenceVisible = runIsolated(policyPath, [process.execPath, "visible.test.mjs"], {
    cwd: subject,
  });
  writeFileSync(path.join(subject, "src/module.mjs"), spec.initial);
  assert.equal(initial.passed, false, "Initial defect must fail hidden behavior");
  assert.notEqual(initialVisible.status, 0, "Initial visible check must fail");
  assert.equal(reference.passed, true, "Reference must pass independent expected outputs");
  assert.equal(referenceVisible.status, 0, referenceVisible.stderr);
  assert.equal(git(subject, ["status", "--porcelain"]), "");
  return {
    subject,
    manifest,
    policyPath,
    qualification: {
      initial,
      reference,
      initial_visible_status: initialVisible.status,
      reference_visible_status: referenceVisible.status,
    },
  };
}

// nativeFacts is resolved by the trusted host from native retained evidence.
// A model-written report or EVALUATOR verdict alone cannot establish success.
export async function verifyCodingOutcome({ subject, spec, manifest, policyPath }, nativeFacts) {
  assert.equal(manifest.hidden_oracle_digest, digest(spec.hidden), "Oracle changed");
  assert.equal(manifest.reference_digest, sha(spec.reference), "Reference changed");
  for (const [file, expected] of [
    ["README.md", manifest.readme_digest],
    ["visible.test.mjs", manifest.visible_digest],
  ]) {
    const absolute = path.join(subject, file);
    assert.equal(sha(readStableFile(absolute)), expected, "Public assertions or objective changed");
  }
  const before = git(subject, ["rev-parse", "HEAD"]);
  const native = await nativeFacts({
    subject,
    head: before,
    initial_commit: manifest.initial_commit,
  });
  assert.equal(native.head, before, "Native evidence targets another source");
  assert.equal(native.workflow, spec.workflow, "Wrong workflow stratum");
  assert.equal(native.verification, "passed");
  assert.equal(native.evaluator, "pass");
  assert.equal(native.accounting_complete, true);
  assert.deepEqual(native.scope, manifest.scope, "Native scope changed");
  if (spec.id === "recoverable-failure")
    assert.ok(
      native.failed_verification_digests.length > 0 && native.recovery_digest,
      "Original failure and recovery must survive",
    );
  if (spec.selection !== "exact")
    assert.equal(
      native.fallback,
      "native_ordinary_planning",
      "Refusal alone is not coding success",
    );
  const behavior = observeCodingBehavior(subject, spec, policyPath);
  assert.equal(git(subject, ["rev-parse", "HEAD"]), before, "Final identity changed during oracle");
  return {
    passed: behavior.passed,
    head: before,
    source_digest: behavior.source_digest,
    behavior,
    native_evidence_digest: digest(native),
    manifest_digest: digest(manifest),
  };
}
