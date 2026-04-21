---
id: "202604211313-5RAM5H"
title: "Bundle agentplane CLI entry with tsup"
result_summary: "Added agentplane build:bundle through tsup, wired root build to produce the bundled CLI entry, replaced source-relative runtime asset lookups with package-root helpers, and recorded cold-path results for the bundled wrapper."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202604211313-99AH4A"
tags:
  - "build"
  - "cli"
  - "perf"
verify:
  - "bun run bench:cli:cold"
  - "bun run build"
  - "bun run release:check"
  - "bun run test:project -- critical"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:15.848Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T19:52:01.723Z"
  updated_by: "CODER"
  note: "Implemented agentplane CLI bundling with tsup while preserving bin/agentplane.js as the dist guard/runtime wrapper. Added package-root path helpers so bundled dist/cli.js resolves assets, package.json, bin/agentplane.js, and repo fallback scripts from the package root rather than source-module import.meta.url. Verification passed: bun run build; bun run release:check; bun run bench:cli:cold (quickstart avg 232.386ms, task_list avg 250.638ms, task_search avg 255.014ms, task_next avg 366.22ms, preflight_quick avg 295.473ms); bun run test:project -- critical; bun run typecheck; bun run lint:core; bun run knip:check; bun run format:check; git diff --check; node packages/agentplane/bin/agentplane.js --help; runtime explain; doctor; agents; role CODER; package-paths unit test; config module boundary unit test."
commit:
  hash: "909c90bed2d00d7ab4307487acab73a3d216d037"
  message: "📦 5RAM5H build: bundle agentplane cli entry"
comments:
  -
    author: "CODER"
    body: "Start: add a bundled agentplane CLI entry while preserving the bin wrapper, dist guard, and runtime watch behavior."
  -
    author: "CODER"
    body: "Verified: agentplane CLI entry is bundled via tsup, bin/agentplane.js still owns dist guard/runtime handoff, package-root path resolution keeps bundled asset/package/bin lookups stable, and required build/release/benchmark/critical checks passed."
events:
  -
    type: "status"
    at: "2026-04-21T19:44:56.626Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a bundled agentplane CLI entry while preserving the bin wrapper, dist guard, and runtime watch behavior."
  -
    type: "verify"
    at: "2026-04-21T19:52:01.723Z"
    author: "CODER"
    state: "ok"
    note: "Implemented agentplane CLI bundling with tsup while preserving bin/agentplane.js as the dist guard/runtime wrapper. Added package-root path helpers so bundled dist/cli.js resolves assets, package.json, bin/agentplane.js, and repo fallback scripts from the package root rather than source-module import.meta.url. Verification passed: bun run build; bun run release:check; bun run bench:cli:cold (quickstart avg 232.386ms, task_list avg 250.638ms, task_search avg 255.014ms, task_next avg 366.22ms, preflight_quick avg 295.473ms); bun run test:project -- critical; bun run typecheck; bun run lint:core; bun run knip:check; bun run format:check; git diff --check; node packages/agentplane/bin/agentplane.js --help; runtime explain; doctor; agents; role CODER; package-paths unit test; config module boundary unit test."
  -
    type: "status"
    at: "2026-04-21T19:52:58.555Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: agentplane CLI entry is bundled via tsup, bin/agentplane.js still owns dist guard/runtime handoff, package-root path resolution keeps bundled asset/package/bin lookups stable, and required build/release/benchmark/critical checks passed."
doc_version: 3
doc_updated_at: "2026-04-21T19:52:58.556Z"
doc_updated_by: "CODER"
description: "Prototype and adopt a bundled agentplane CLI entry while keeping bin/agentplane.js as the runtime/watch wrapper."
sections:
  Summary: |-
    Bundle agentplane CLI entry with tsup
    
    Prototype and adopt a bundled agentplane CLI entry while keeping bin/agentplane.js as the runtime/watch wrapper.
  Scope: |-
    - In scope: Prototype and adopt a bundled agentplane CLI entry while keeping bin/agentplane.js as the runtime/watch wrapper.
    - Out of scope: unrelated refactors not required for "Bundle agentplane CLI entry with tsup".
  Plan: "Scope: reduce CLI cold-path module loading. Steps: 1. Add tsup/esbuild config for agentplane CLI dist/cli.js. 2. Keep @agentplaneorg/core and @agentplaneorg/recipes external unless measurements show a safe alternative. 3. Preserve dist-guard and runtime-watch wrapper behavior in bin/agentplane.js. 4. Compare cold-start baseline before/after. Acceptance: critical CLI E2E passes; release check passes; cold-path result is recorded."
  Verify Steps: |-
    1. Review the requested outcome for "Bundle agentplane CLI entry with tsup". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T19:52:01.723Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented agentplane CLI bundling with tsup while preserving bin/agentplane.js as the dist guard/runtime wrapper. Added package-root path helpers so bundled dist/cli.js resolves assets, package.json, bin/agentplane.js, and repo fallback scripts from the package root rather than source-module import.meta.url. Verification passed: bun run build; bun run release:check; bun run bench:cli:cold (quickstart avg 232.386ms, task_list avg 250.638ms, task_search avg 255.014ms, task_next avg 366.22ms, preflight_quick avg 295.473ms); bun run test:project -- critical; bun run typecheck; bun run lint:core; bun run knip:check; bun run format:check; git diff --check; node packages/agentplane/bin/agentplane.js --help; runtime explain; doctor; agents; role CODER; package-paths unit test; config module boundary unit test.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T19:44:56.635Z, excerpt_hash=sha256:ae9bc4646eb8f53b6fc6f595ff4d0c6323b128bd408da2d951d7fbc111632748
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- Non-acceptance smoke note: `node packages/agentplane/bin/agentplane.js recipes list --root /Users/densmirnov/Github/agentplane` returned `E_IO: Invalid field manifest.scenarios[0].name: expected string`. Required bundling acceptance checks passed, and this appears tied to local recipe manifest data rather than the CLI entry bundle. No recipe data was changed under this task scope."
id_source: "generated"
---
## Summary

Bundle agentplane CLI entry with tsup

Prototype and adopt a bundled agentplane CLI entry while keeping bin/agentplane.js as the runtime/watch wrapper.

## Scope

- In scope: Prototype and adopt a bundled agentplane CLI entry while keeping bin/agentplane.js as the runtime/watch wrapper.
- Out of scope: unrelated refactors not required for "Bundle agentplane CLI entry with tsup".

## Plan

Scope: reduce CLI cold-path module loading. Steps: 1. Add tsup/esbuild config for agentplane CLI dist/cli.js. 2. Keep @agentplaneorg/core and @agentplaneorg/recipes external unless measurements show a safe alternative. 3. Preserve dist-guard and runtime-watch wrapper behavior in bin/agentplane.js. 4. Compare cold-start baseline before/after. Acceptance: critical CLI E2E passes; release check passes; cold-path result is recorded.

## Verify Steps

1. Review the requested outcome for "Bundle agentplane CLI entry with tsup". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T19:52:01.723Z — VERIFY — ok

By: CODER

Note: Implemented agentplane CLI bundling with tsup while preserving bin/agentplane.js as the dist guard/runtime wrapper. Added package-root path helpers so bundled dist/cli.js resolves assets, package.json, bin/agentplane.js, and repo fallback scripts from the package root rather than source-module import.meta.url. Verification passed: bun run build; bun run release:check; bun run bench:cli:cold (quickstart avg 232.386ms, task_list avg 250.638ms, task_search avg 255.014ms, task_next avg 366.22ms, preflight_quick avg 295.473ms); bun run test:project -- critical; bun run typecheck; bun run lint:core; bun run knip:check; bun run format:check; git diff --check; node packages/agentplane/bin/agentplane.js --help; runtime explain; doctor; agents; role CODER; package-paths unit test; config module boundary unit test.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T19:44:56.635Z, excerpt_hash=sha256:ae9bc4646eb8f53b6fc6f595ff4d0c6323b128bd408da2d951d7fbc111632748

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Non-acceptance smoke note: `node packages/agentplane/bin/agentplane.js recipes list --root /Users/densmirnov/Github/agentplane` returned `E_IO: Invalid field manifest.scenarios[0].name: expected string`. Required bundling acceptance checks passed, and this appears tied to local recipe manifest data rather than the CLI entry bundle. No recipe data was changed under this task scope.
