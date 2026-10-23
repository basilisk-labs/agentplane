import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { ESLint } from "eslint";

const require = createRequire(import.meta.url);
const unicorn = require("eslint-plugin-unicorn").default;
const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const eslint = new ESLint({ cwd: repository });

// Independently captured with Unicorn 66.0.0 and the frozen base's exact lockfile.
// Base: 7860c880ef6a8a2261bea584fe87afe17d947795.
// Hash every effective rule, severity and option, not only the Unicorn subset.
// Capture normalizes only the two documented renamed rules and repository path.
const baselineDigests = [
  [
    "scripts/checks/example.mjs",
    "97fd3b3337e3c5d09423911802e9ed630a9f226319e4b22af7bf16e35af3f841",
  ],
  [
    "packages/core/src/example.ts",
    "3f1f44740d719fea9855c470568d340a889da315689b8174c7c604448a381623",
  ],
  [
    "packages/agentplane/src/commands/example.ts",
    "485612149f51a6ac9ac35ebc763c40d87d431528bd5af4925228fae236bc986b",
  ],
  [
    "packages/agentplane/src/shared/errors.ts",
    "c70f12f6093ac0bc86b6865f41126eb9f6b72c2be8cae5b48a073c4e9d83e86a",
  ],
  [
    "packages/core/src/example.test.ts",
    "caf5e75a8f9af444e03aefa650a1c368f7795664192102edd597f2ce601a0a06",
  ],
  [
    "packages/core/src/example.test-helpers.ts",
    "64d220925f5ce9c45b4c41ce3f8e17514124f636e1ee46f52134997ab5ad45d5",
  ],
  [
    "packages/agentplane/src/policy/example.ts",
    "9a25e2dd0da4cb81ffc79ba98cdd1bf963bb795ca162b076272473ec761a492c",
  ],
  [
    "scripts/bench/internal/paired-m05/coding-recipe.mjs",
    "2f2ea72afa42f3e9cb3fdf50019e419bd2083120f1756b3d6c567f6f75405e4c",
  ],
];

// ESLint expands plugin defaultOptions even for disabled rules. Their options have
// no effect. Compare their severity while retaining the independently captured
// 66 representation. Never apply this normalization to an enabled rule.
const disabledDefaults66 = {
  "unicorn/comment-content": [0, { extendDefaultReplacements: true, replacements: {} }],
  "unicorn/consistent-class-member-order": [
    0,
    {
      order: [
        "static-field",
        "static-block",
        "private-field",
        "public-field",
        "constructor",
        "static-method",
        "private-method",
        "public-method",
      ],
    },
  ],
  "unicorn/no-break-in-nested-loop": [0],
  "unicorn/no-invalid-argument-count": [0],
  "unicorn/no-top-level-side-effects": [0],
  "unicorn/prefer-dom-node-html-methods": [0],
  "unicorn/prefer-early-return": [0, { maximumStatements: 1 }],
  "unicorn/prefer-https": [0],
  "unicorn/prefer-minimal-ternary": [0],
  "unicorn/prefer-short-arrow-method": [0],
  "unicorn/prefer-ternary": [0, "always"],
};

function normalizeRules(rules) {
  rules = structuredClone(rules);
  for (const [name, oldSetting] of Object.entries(disabledDefaults66)) {
    assert.equal(rules[name][0], 0, `Previously disabled rule became enabled: ${name}`);
    rules[name] = oldSetting;
  }
  // These two new options are false: the added diagnostic branches are inactive.
  for (const [name, option] of [
    ["unicorn/no-immediate-mutation", "checkConditionals"],
    ["unicorn/prefer-default-parameters", "checkFallbackExpressions"],
  ]) {
    assert.deepEqual(rules[name], [2, { [option]: false }]);
    rules[name] = [2];
  }
  return Object.fromEntries(
    Object.entries(rules)
      .map(([name, value]) => [
        name,
        JSON.parse(JSON.stringify(value).split(repository).join("<repository>")),
      ])
      .toSorted(([left], [right]) => left.localeCompare(right)),
  );
}

for (const [filePath, digest] of baselineDigests) {
  test(`preserves all effective rules for ${filePath}`, async () => {
    const config = await eslint.calculateConfigForFile(filePath);
    assert.ok(config);
    const actual = createHash("sha256")
      .update(JSON.stringify(normalizeRules(config.rules)))
      .digest("hex");
    assert.equal(actual, digest);
    for (const [name, setting] of Object.entries(config.rules)) {
      if (!name.startsWith("unicorn/") || setting[0] === 0) continue;
      const rule = unicorn.rules[name.slice("unicorn/".length)];
      assert.ok(rule, `Missing active rule: ${name}`);
      assert.ok(!rule.meta.deprecated, `Deprecated active rule: ${name}`);
    }
    assert.equal(config.rules["unicorn/name-replacements"][0], 0);
    assert.equal(config.rules["unicorn/no-unused-builtin-method-return"][0], 2);
  });
}

test("uses the admitted Unicorn 78 implementation", () => {
  assert.equal(unicorn.meta.version, "78.0.0");
});

test("replacement rejects ignored Array results and accepts consumed results", async () => {
  const isolated = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [
      {
        plugins: { unicorn },
        rules: { "unicorn/no-unused-builtin-method-return": "error" },
      },
    ],
  });
  const [invalid] = await isolated.lintText("[1, 2].map(value => value + 1);\n");
  assert.equal(invalid.errorCount, 1);
  assert.equal(invalid.messages[0].ruleId, "unicorn/no-unused-builtin-method-return");
  const [valid] = await isolated.lintText("const values = [1, 2].map(value => value + 1);\n");
  assert.equal(valid.errorCount, 0);
});

test("repository core checks remain active and abbreviation remains disabled", async () => {
  const [invalid] = await eslint.lintText("missingGlobal();\n", {
    filePath: "scripts/checks/example.mjs",
  });
  assert.ok(invalid.messages.some((message) => message.ruleId === "no-undef"));
  const [valid] = await eslint.lintText("export const args = [1, 2];\n", {
    filePath: "scripts/checks/example.mjs",
  });
  assert.equal(valid.errorCount, 0, JSON.stringify(valid.messages));
});

function ruleEngine(name, fix = false, options = []) {
  return new ESLint({
    overrideConfigFile: true,
    overrideConfig: [
      { plugins: { unicorn }, rules: { [`unicorn/${name}`]: ["error", ...options] } },
    ],
    fix,
  });
}

test("replacement distinguishes the global Array constructor from a shadow", async () => {
  const engine = ruleEngine("no-unused-builtin-method-return");
  const [invalid] = await engine.lintText("new Array(1).map(value => value);");
  assert.equal(invalid.errorCount, 1);
  assert.equal(invalid.messages[0].ruleId, "unicorn/no-unused-builtin-method-return");
  const [valid] = await engine.lintText(
    "class Array { map() { return this; } } new Array().map();",
  );
  assert.equal(valid.errorCount, 0);
});

test("negated logical chain fixes preserve side effects and short circuit order", async () => {
  for (const operator of ["&&", "||"]) {
    const source = `if (!first() ${operator} !second()) { yes(); } else { no(); }`;
    const [diagnostic] = await ruleEngine("no-negated-condition").lintText(source);
    assert.equal(diagnostic.errorCount, 1);
    const [fixed] = await ruleEngine("no-negated-condition", true).lintText(source);
    assert.ok(fixed.output);
    assert.equal(fixed.errorCount, 0);
    for (const first of [false, true]) {
      for (const second of [false, true]) {
        const execute = (code) => {
          const calls = [];
          runInNewContext(code, {
            first: () => {
              calls.push("first");
              return first;
            },
            second: () => {
              calls.push("second");
              return second;
            },
            yes: () => calls.push("yes"),
            no: () => calls.push("no"),
          });
          return calls;
        };
        assert.deepEqual(execute(fixed.output), execute(source));
      }
    }
  }
});

test("class field autofix preserves private declarations and accessor effects", async () => {
  const source =
    "class Example { #value; constructor() { this.#value = 1; } read() { return this.#value; } } new Example().read();";
  const [diagnostic] = await ruleEngine("prefer-class-fields").lintText(source);
  assert.equal(diagnostic.errorCount, 1);
  const [fixed] = await ruleEngine("prefer-class-fields", true).lintText(source);
  assert.ok(fixed.output);
  assert.equal(runInNewContext(fixed.output), runInNewContext(source));
  const accessor =
    "class Example { set value(value) { calls.push(value); } constructor() { this.value = 1; } } new Example();";
  const [safe] = await ruleEngine("prefer-class-fields", true).lintText(accessor);
  assert.equal(safe.output, undefined);
  assert.equal(safe.errorCount, 1);
  assert.equal(safe.messages[0].fix, undefined);
});

test("spread autofix does not turn a typed array slice into an Array", async () => {
  const source = "new Uint8Array([1, 2]).slice();";
  const [safe] = await ruleEngine("prefer-spread", true).lintText(source);
  assert.equal(safe.output, undefined);
  assert.equal(safe.errorCount, 0);
  const [ordinary] = await ruleEngine("prefer-spread").lintText("const copy = values.slice();");
  assert.equal(ordinary.errorCount, 1);
});

test("legacy default-parameter checks stay active without new fallback diagnostics", async () => {
  const engine = ruleEngine("prefer-default-parameters", false, [
    { checkFallbackExpressions: false },
  ]);
  const [invalid] = await engine.lintText(
    "function example(value) { value = value || 1; return value; }",
  );
  assert.equal(invalid.errorCount, 1);
  const [valid] = await engine.lintText("function example(value) { return value ?? 1; }");
  assert.equal(valid.errorCount, 0);
});
