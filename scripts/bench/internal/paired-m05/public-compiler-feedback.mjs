import { publicInterfaceFeedback } from "./public-interface-feedback.mjs";
import assert from "node:assert/strict";
import { constants, openSync, closeSync, fstatSync, readSync } from "node:fs";
import path from "node:path";
import {
  validateRecipeManifest,
  parseScenarioV2,
  compileScenarioInstantiation,
} from "../../../../packages/recipes/dist/index.js";
import { createRepositorySnapshot } from "../../../../packages/core/dist/tasks/index.js";

export function boundedPublicFeedbackFile(file) {
  const fd = openSync(file, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const stat = fstatSync(fd);
    assert.ok(stat.isFile() && stat.size <= 262_144, "Invalid candidate file");
    const buffer = Buffer.alloc(stat.size + 1);
    let length = 0;
    while (length < buffer.length) {
      const count = readSync(fd, buffer, length, buffer.length - length, length);
      if (!count) break;
      length += count;
    }
    const after = fstatSync(fd);
    assert.ok(
      length === stat.size && after.size === stat.size && after.mtimeMs === stat.mtimeMs,
      "Candidate changed while reading",
    );
    return buffer.subarray(0, length).toString("utf8");
  } finally {
    closeSync(fd);
  }
}
function inspect(run) {
  try {
    return { passed: true, kind: run()?.kind ?? "parsed" };
  } catch (error) {
    const issues = Array.isArray(error.issues) ? error.issues : [{ message: error.message }];
    return {
      passed: false,
      total_issues: issues.length,
      truncated: issues.length > 20,
      issues: issues.slice(0, 20).map((i) => ({
        path: JSON.stringify(i.path ?? []).slice(0, 256),
        message: String(i.message).slice(0, 1024),
      })),
    };
  }
}
export function publicCompilerFeedback(candidateRoot, publicCasesFile, productContractFile) {
  const manifest = JSON.parse(boundedPublicFeedbackFile(path.join(candidateRoot, "manifest.json")));
  const scenario = JSON.parse(boundedPublicFeedbackFile(path.join(candidateRoot, "scenario.json")));
  boundedPublicFeedbackFile(path.join(candidateRoot, "agent.md"));
  const cases = JSON.parse(boundedPublicFeedbackFile(publicCasesFile));
  assert.ok(Array.isArray(cases) && cases.length > 0 && cases.length <= 5);
  const contract = productContractFile
    ? JSON.parse(boundedPublicFeedbackFile(productContractFile))
    : null;
  const baseline = createRepositorySnapshot({
    git: { kind: "unavailable", reason_code: "PREPARATION_ONLY" },
    dirty_paths: [],
    policy_digest: null,
    config_digest: null,
    context_digest: null,
    task_history_cursor: null,
    captured_at: new Date().toISOString(),
  });
  return {
    scope:
      "Public parser/compiler feedback only; no native admission, applicability observation, oracle or authority.",
    manifest: inspect(() => validateRecipeManifest(manifest)),
    scenario: inspect(() => parseScenarioV2(scenario)),
    cases: cases.map((spec) => {
      const values = {
        objective: spec.objective,
        api_contract: spec.api,
        source_path: spec.source_path,
        visible_check: spec.visible_check,
        allowed_write_paths: JSON.stringify(spec.allowed_write_paths),
        workflow: spec.workflow,
      };
      const bindings = Object.entries(values).map(([name, value]) => ({ name, value }));
      let compatibility;
      if (contract) {
        try {
          compatibility = publicInterfaceFeedback(scenario, bindings, manifest, contract);
        } catch (error) {
          compatibility = {
            scope: "static interface only",
            error: String(error.message).slice(0, 1024),
          };
        }
      }
      return {
        id: spec.id,
        ...(compatibility ? { compatibility } : {}),
        ...inspect(() =>
          compileScenarioInstantiation({
            mode: "instantiate",
            scenario,
            bindings,
            task_id: "public-compiler-feedback",
            planning_baseline: baseline,
          }),
        ),
      };
    }),
  };
}
