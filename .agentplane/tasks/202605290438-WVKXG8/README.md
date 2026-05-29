---
id: "202605290438-WVKXG8"
title: "Prompt module compiler decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "hotspot"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T04:38:33.947Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T04:44:24.056Z"
  updated_by: "CODER"
  note: "Observed: prompt module compiler context normalization and load-condition matching moved into compiler.context.ts; compiler.ts is below hotspot threshold. Checks: compiler.test, mutations.test, registry.test, typecheck, arch:check, knip:check, lint:core, format:changed, hotspots:check passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Extract prompt module compiler context and matching helpers while preserving compilePromptModuleGraph behavior."
events:
  -
    type: "status"
    at: "2026-05-29T04:38:43.773Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract prompt module compiler context and matching helpers while preserving compilePromptModuleGraph behavior."
  -
    type: "verify"
    at: "2026-05-29T04:44:24.056Z"
    author: "CODER"
    state: "ok"
    note: "Observed: prompt module compiler context normalization and load-condition matching moved into compiler.context.ts; compiler.ts is below hotspot threshold. Checks: compiler.test, mutations.test, registry.test, typecheck, arch:check, knip:check, lint:core, format:changed, hotspots:check passed."
doc_version: 3
doc_updated_at: "2026-05-29T04:44:24.081Z"
doc_updated_by: "CODER"
description: "Extract focused helpers from packages/agentplane/src/runtime/prompt-modules/compiler.ts to reduce the runtime hotspot below the warning threshold without changing prompt module compilation behavior."
sections:
  Summary: |-
    Prompt module compiler decomposition

    Extract focused helpers from packages/agentplane/src/runtime/prompt-modules/compiler.ts to reduce the runtime hotspot below the warning threshold without changing prompt module compilation behavior.
  Scope: |-
    - In scope: Extract focused helpers from packages/agentplane/src/runtime/prompt-modules/compiler.ts to reduce the runtime hotspot below the warning threshold without changing prompt module compilation behavior.
    - Out of scope: unrelated refactors not required for "Prompt module compiler decomposition".
  Plan: "Scope: reduce packages/agentplane/src/runtime/prompt-modules/compiler.ts below the 400-line hotspot warning by extracting compiler context normalization and load-condition matching helpers into focused module(s). Preserve exported compiler API and prompt module compilation behavior. Acceptance: prompt-module related tests pass, typecheck/arch/knip/lint/format pass, bun run hotspots:check shows one fewer runtime hotspot."
  Verify Steps: |-
    PLANNER fallback scaffold for "Prompt module compiler decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Prompt module compiler decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T04:44:24.056Z — VERIFY — ok

    By: CODER

    Note: Observed: prompt module compiler context normalization and load-condition matching moved into compiler.context.ts; compiler.ts is below hotspot threshold. Checks: compiler.test, mutations.test, registry.test, typecheck, arch:check, knip:check, lint:core, format:changed, hotspots:check passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T04:38:43.773Z, excerpt_hash=sha256:c97736db7fca74b36b4abba3f446d48302a5a2caef68fa66b1814c76cba2d810

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290438-WVKXG8/blueprint/resolved-snapshot.json
    - old_digest: c7b013e2a1e61dc34693562a8ff8e321cbbf6718bc974c1ad87020e011783789
    - current_digest: c7b013e2a1e61dc34693562a8ff8e321cbbf6718bc974c1ad87020e011783789
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290438-WVKXG8

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Runtime hotspot count decreased from 12 to 11; compiler.ts is now 232 lines.
      Impact: Keeps prompt module compilation behavior stable while reducing compiler module size and separating context normalization.
      Resolution: Preserved compiler.ts exports through re-export-from declarations and kept compilePromptModuleGraph in compiler.ts.
id_source: "generated"
---
## Summary

Prompt module compiler decomposition

Extract focused helpers from packages/agentplane/src/runtime/prompt-modules/compiler.ts to reduce the runtime hotspot below the warning threshold without changing prompt module compilation behavior.

## Scope

- In scope: Extract focused helpers from packages/agentplane/src/runtime/prompt-modules/compiler.ts to reduce the runtime hotspot below the warning threshold without changing prompt module compilation behavior.
- Out of scope: unrelated refactors not required for "Prompt module compiler decomposition".

## Plan

Scope: reduce packages/agentplane/src/runtime/prompt-modules/compiler.ts below the 400-line hotspot warning by extracting compiler context normalization and load-condition matching helpers into focused module(s). Preserve exported compiler API and prompt module compilation behavior. Acceptance: prompt-module related tests pass, typecheck/arch/knip/lint/format pass, bun run hotspots:check shows one fewer runtime hotspot.

## Verify Steps

PLANNER fallback scaffold for "Prompt module compiler decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Prompt module compiler decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T04:44:24.056Z — VERIFY — ok

By: CODER

Note: Observed: prompt module compiler context normalization and load-condition matching moved into compiler.context.ts; compiler.ts is below hotspot threshold. Checks: compiler.test, mutations.test, registry.test, typecheck, arch:check, knip:check, lint:core, format:changed, hotspots:check passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T04:38:43.773Z, excerpt_hash=sha256:c97736db7fca74b36b4abba3f446d48302a5a2caef68fa66b1814c76cba2d810

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290438-WVKXG8/blueprint/resolved-snapshot.json
- old_digest: c7b013e2a1e61dc34693562a8ff8e321cbbf6718bc974c1ad87020e011783789
- current_digest: c7b013e2a1e61dc34693562a8ff8e321cbbf6718bc974c1ad87020e011783789
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290438-WVKXG8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Runtime hotspot count decreased from 12 to 11; compiler.ts is now 232 lines.
  Impact: Keeps prompt module compilation behavior stable while reducing compiler module size and separating context normalization.
  Resolution: Preserved compiler.ts exports through re-export-from declarations and kept compilePromptModuleGraph in compiler.ts.
