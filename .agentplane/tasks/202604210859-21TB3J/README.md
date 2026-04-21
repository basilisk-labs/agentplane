---
id: "202604210859-21TB3J"
title: "Resolve recipe manifest and types hotspot"
status: "DOING"
priority: "low"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T10:27:32.910Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T10:37:40.052Z"
  updated_by: "CODER"
  note: "Resolved recipe manifest/types hotspot as hand-maintained code with minimal domain split; recipes typecheck, tests, build, and types-file guard pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: classify recipe manifest/types hotspot, choose marker versus split, update minimal recipe package code/docs, and run recipe-focused verification."
events:
  -
    type: "status"
    at: "2026-04-21T10:27:37.526Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: classify recipe manifest/types hotspot, choose marker versus split, update minimal recipe package code/docs, and run recipe-focused verification."
  -
    type: "verify"
    at: "2026-04-21T10:35:01.147Z"
    author: "CODER"
    state: "ok"
    note: "Decision: packages/recipes/src/manifest.ts and packages/recipes/src/types.ts are hand-maintained code, not generated/data-heavy artifacts. Chosen resolution: minimal domain split. types.ts is now a compatibility barrel over semantic contract modules; manifest.ts keeps behavior and imports shared primitive normalizers from manifest-primitives.ts. Verification: Command: bun run --filter=@agentplaneorg/recipes typecheck. Result: pass. Evidence: @agentplaneorg/recipes typecheck exited with code 0. Scope: recipes TypeScript contracts after split. Command: bun run --filter=@agentplaneorg/recipes test. Result: pass. Evidence: 5 Bun tests passed across index.test.ts and overlay.test.ts. Scope: recipes package tests. Command: node scripts/check-types-files.mjs. Result: pass. Evidence: types.ts guardrail OK (count=10, max=10). Scope: repository types.ts guardrail after keeping packages/recipes/src/types.ts as the public barrel. Command: ./node_modules/.bin/prettier --check packages/recipes/package.json packages/recipes/src/manifest.ts packages/recipes/src/types.ts packages/recipes/src/catalog-contracts.ts packages/recipes/src/compiled-contracts.ts packages/recipes/src/install-contracts.ts packages/recipes/src/manifest-contracts.ts packages/recipes/src/manifest-primitives.ts packages/recipes/src/resolver-contracts.ts packages/recipes/src/scenario-contracts.ts. Result: pass. Evidence: all matched files use Prettier code style. Scope: formatted recipes split files."
  -
    type: "verify"
    at: "2026-04-21T10:37:40.052Z"
    author: "CODER"
    state: "ok"
    note: "Resolved recipe manifest/types hotspot as hand-maintained code with minimal domain split; recipes typecheck, tests, build, and types-file guard pass."
doc_version: 3
doc_updated_at: "2026-04-21T10:37:40.055Z"
doc_updated_by: "CODER"
description: "Determine whether recipe manifest/types files are generated or hand-maintained, then either mark generated or decompose by domain."
sections:
  Summary: "Close the recipe manifest/types hotspot with the least-churn option: generated marker if generated, or domain split if hand-maintained."
  Scope: "In scope: packages/recipes manifest/types files and related imports/tests. Out of scope: recipe schema redesign."
  Plan: |-
    1. Determine whether files are generated, data-heavy, or manually structured code.
    2. If generated/data-heavy, add marker/docs and exclude from hotspot pressure if appropriate.
    3. If manual code, split into cohesive domain modules.
    4. Run recipe package tests/typecheck.
  Verify Steps: |-
    - Decision is explicit in code/docs/task findings.
    - If split, imports remain stable.
    - Recipe tests/typecheck pass.
  Verification: |-
    - Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210859-21TB3J`
      - Result: pass
      - Evidence: contract requires explicit generated-vs-manual decision, stable imports if split, and recipes tests/typecheck.
      - Scope: task acceptance contract.
    - Decision: packages/recipes/src/manifest.ts and packages/recipes/src/types.ts are hand-maintained code, not generated/data-heavy artifacts.
      - Result: pass
      - Evidence: manifest.ts contains normalization/cross-field validation; types.ts contains public semantic contracts.
      - Scope: hotspot classification.
    - Command: `bun run --filter=@agentplaneorg/recipes typecheck`
      - Result: pass
      - Evidence: @agentplaneorg/recipes typecheck exited with code 0.
      - Scope: recipes TypeScript contracts after split.
    - Command: `bun run --filter=@agentplaneorg/recipes test`
      - Result: pass
      - Evidence: 5 Bun tests passed across index.test.ts and overlay.test.ts.
      - Scope: recipes package tests.
    - Command: `bun run --filter=@agentplaneorg/recipes build`
      - Result: pass
      - Evidence: tsup built dist/index.js successfully.
      - Scope: recipes package bundle after type barrel split.
    - Command: `node scripts/check-types-files.mjs`
      - Result: pass
      - Evidence: types.ts guardrail OK (count=10, max=10).
      - Scope: repository types.ts guardrail after keeping packages/recipes/src/types.ts as public barrel.
    - Command: `bunx prettier --check packages/recipes/package.json packages/recipes/src/manifest.ts packages/recipes/src/types.ts packages/recipes/src/catalog-contracts.ts packages/recipes/src/compiled-contracts.ts packages/recipes/src/install-contracts.ts packages/recipes/src/manifest-contracts.ts packages/recipes/src/manifest-primitives.ts packages/recipes/src/resolver-contracts.ts packages/recipes/src/scenario-contracts.ts`
      - Result: pass
      - Evidence: all matched files use Prettier code style.
      - Scope: formatted recipes split files.
    - Command: `git diff --check -- packages/recipes/package.json packages/recipes/src/manifest.ts packages/recipes/src/types.ts packages/recipes/src/catalog-contracts.ts packages/recipes/src/compiled-contracts.ts packages/recipes/src/install-contracts.ts packages/recipes/src/manifest-contracts.ts packages/recipes/src/manifest-primitives.ts packages/recipes/src/resolver-contracts.ts packages/recipes/src/scenario-contracts.ts .agentplane/tasks/202604210859-21TB3J/README.md`
      - Result: pass
      - Evidence: no whitespace errors after trimming task README verification output.
      - Scope: changed files for this task.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T10:37:40.052Z — VERIFY — ok
    
    By: CODER
    
    Note: Resolved recipe manifest/types hotspot as hand-maintained code with minimal domain split; recipes typecheck, tests, build, and types-file guard pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:37:39.085Z, excerpt_hash=sha256:631bb17f58db8dfdeea3701914af21184164d71fd4342f9974fc29d8bc668dea
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert marker or module split changes."
  Findings: "Source input: REFACTORING_PLAN C.3."
id_source: "generated"
---
## Summary

Close the recipe manifest/types hotspot with the least-churn option: generated marker if generated, or domain split if hand-maintained.

## Scope

In scope: packages/recipes manifest/types files and related imports/tests. Out of scope: recipe schema redesign.

## Plan

1. Determine whether files are generated, data-heavy, or manually structured code.
2. If generated/data-heavy, add marker/docs and exclude from hotspot pressure if appropriate.
3. If manual code, split into cohesive domain modules.
4. Run recipe package tests/typecheck.

## Verify Steps

- Decision is explicit in code/docs/task findings.
- If split, imports remain stable.
- Recipe tests/typecheck pass.

## Verification

- Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210859-21TB3J`
  - Result: pass
  - Evidence: contract requires explicit generated-vs-manual decision, stable imports if split, and recipes tests/typecheck.
  - Scope: task acceptance contract.
- Decision: packages/recipes/src/manifest.ts and packages/recipes/src/types.ts are hand-maintained code, not generated/data-heavy artifacts.
  - Result: pass
  - Evidence: manifest.ts contains normalization/cross-field validation; types.ts contains public semantic contracts.
  - Scope: hotspot classification.
- Command: `bun run --filter=@agentplaneorg/recipes typecheck`
  - Result: pass
  - Evidence: @agentplaneorg/recipes typecheck exited with code 0.
  - Scope: recipes TypeScript contracts after split.
- Command: `bun run --filter=@agentplaneorg/recipes test`
  - Result: pass
  - Evidence: 5 Bun tests passed across index.test.ts and overlay.test.ts.
  - Scope: recipes package tests.
- Command: `bun run --filter=@agentplaneorg/recipes build`
  - Result: pass
  - Evidence: tsup built dist/index.js successfully.
  - Scope: recipes package bundle after type barrel split.
- Command: `node scripts/check-types-files.mjs`
  - Result: pass
  - Evidence: types.ts guardrail OK (count=10, max=10).
  - Scope: repository types.ts guardrail after keeping packages/recipes/src/types.ts as public barrel.
- Command: `bunx prettier --check packages/recipes/package.json packages/recipes/src/manifest.ts packages/recipes/src/types.ts packages/recipes/src/catalog-contracts.ts packages/recipes/src/compiled-contracts.ts packages/recipes/src/install-contracts.ts packages/recipes/src/manifest-contracts.ts packages/recipes/src/manifest-primitives.ts packages/recipes/src/resolver-contracts.ts packages/recipes/src/scenario-contracts.ts`
  - Result: pass
  - Evidence: all matched files use Prettier code style.
  - Scope: formatted recipes split files.
- Command: `git diff --check -- packages/recipes/package.json packages/recipes/src/manifest.ts packages/recipes/src/types.ts packages/recipes/src/catalog-contracts.ts packages/recipes/src/compiled-contracts.ts packages/recipes/src/install-contracts.ts packages/recipes/src/manifest-contracts.ts packages/recipes/src/manifest-primitives.ts packages/recipes/src/resolver-contracts.ts packages/recipes/src/scenario-contracts.ts .agentplane/tasks/202604210859-21TB3J/README.md`
  - Result: pass
  - Evidence: no whitespace errors after trimming task README verification output.
  - Scope: changed files for this task.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T10:37:40.052Z — VERIFY — ok

By: CODER

Note: Resolved recipe manifest/types hotspot as hand-maintained code with minimal domain split; recipes typecheck, tests, build, and types-file guard pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:37:39.085Z, excerpt_hash=sha256:631bb17f58db8dfdeea3701914af21184164d71fd4342f9974fc29d8bc668dea

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert marker or module split changes.

## Findings

Source input: REFACTORING_PLAN C.3.
