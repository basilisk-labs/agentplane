---
id: "202605051957-5KNJ9K"
title: "Normalize recipe blueprint hints"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
  - "rc1"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T19:58:48.125Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T20:07:10.624Z"
  updated_by: "CODER"
  note: "Implemented recipe blueprint extension normalization and manifest validation. Focused recipe tests, full typecheck, recipes build, targeted lint/format, policy routing, diff check, and agentplane doctor all pass; doctor retains one pre-existing WCPBCX projection warning."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement recipe blueprint hint normalization in the recipes package using the approved v0.5 scope: active manifest extensions, when matching, deterministic ordering, provenance, and rejection reporting without resolver wiring or CLI behavior in this task."
  -
    author: "CODER"
    body: "Start: implement recipe blueprint hint normalization after the extension schema is available, preserving provenance and deterministic ordering."
events:
  -
    type: "status"
    at: "2026-05-05T20:01:23.017Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement recipe blueprint hint normalization in the recipes package using the approved v0.5 scope: active manifest extensions, when matching, deterministic ordering, provenance, and rejection reporting without resolver wiring or CLI behavior in this task."
  -
    type: "status"
    at: "2026-05-05T20:02:07.710Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: implement recipe blueprint hint normalization after the extension schema is available, preserving provenance and deterministic ordering."
  -
    type: "verify"
    at: "2026-05-05T20:07:10.624Z"
    author: "CODER"
    state: "ok"
    note: "Implemented recipe blueprint extension normalization and manifest validation. Focused recipe tests, full typecheck, recipes build, targeted lint/format, policy routing, diff check, and agentplane doctor all pass; doctor retains one pre-existing WCPBCX projection warning."
doc_version: 3
doc_updated_at: "2026-05-05T20:07:10.690Z"
doc_updated_by: "CODER"
description: "Add recipe blueprint-extension normalization with active recipe filtering, when matching, deterministic ordering, provenance, and compatibility reporting for resolver input."
sections:
  Summary: |-
    Normalize recipe blueprint hints
    
    Add recipe blueprint-extension normalization with active recipe filtering, when matching, deterministic ordering, provenance, and compatibility reporting for resolver input.
  Scope: |-
    - In scope: Add recipe blueprint-extension normalization with active recipe filtering, when matching, deterministic ordering, provenance, and compatibility reporting for resolver input.
    - Out of scope: unrelated refactors not required for "Normalize recipe blueprint hints".
  Plan: "Normalize recipe blueprint hints. Scope: add package-level helper that collects blueprint_extensions from active recipe manifests, applies existing when semantics, records provenance, sorts deterministically, and reports incompatible or unsafe hints for resolver input. Depends on 202605051957-Z5ZJBM."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T20:07:10.624Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented recipe blueprint extension normalization and manifest validation. Focused recipe tests, full typecheck, recipes build, targeted lint/format, policy routing, diff check, and agentplane doctor all pass; doctor retains one pre-existing WCPBCX projection warning.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T20:02:07.710Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/recipes/src/index.test.ts packages/recipes/src/overlay.test.ts packages/recipes/src/blueprint-extensions.test.ts; Result: pass; Evidence: 16 tests passed. Command: bun run --filter=@agentplaneorg/recipes typecheck; Result: pass; Evidence: package typecheck exit 0. Command: bun run typecheck; Result: pass; Evidence: tsc -b exit 0. Command: bun run --filter=@agentplaneorg/recipes build; Result: pass; Evidence: recipes dist build succeeded. Command: bunx eslint packages/recipes/src/manifest-contracts.ts packages/recipes/src/manifest.ts packages/recipes/src/blueprint-extensions.ts packages/recipes/src/blueprint-extensions.test.ts packages/recipes/src/index.ts; Result: pass; Evidence: eslint exit 0. Command: bunx prettier --check touched recipe files; Result: pass; Evidence: all matched files use Prettier style. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: git diff --check; Result: pass. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: doctor OK with one pre-existing WCPBCX branch_pr projection warning.
      Impact: Adds a bounded recipe-to-blueprint normalization layer without resolver wiring, CLI behavior, prompt graph application, or runner/runtime consumption.
      Resolution: Added manifest blueprint_extensions validation, normalized active recipe hint collection with provenance and deterministic ordering, and rejection reporting for unmatched when filters.
id_source: "generated"
---
## Summary

Normalize recipe blueprint hints

Add recipe blueprint-extension normalization with active recipe filtering, when matching, deterministic ordering, provenance, and compatibility reporting for resolver input.

## Scope

- In scope: Add recipe blueprint-extension normalization with active recipe filtering, when matching, deterministic ordering, provenance, and compatibility reporting for resolver input.
- Out of scope: unrelated refactors not required for "Normalize recipe blueprint hints".

## Plan

Normalize recipe blueprint hints. Scope: add package-level helper that collects blueprint_extensions from active recipe manifests, applies existing when semantics, records provenance, sorts deterministically, and reports incompatible or unsafe hints for resolver input. Depends on 202605051957-Z5ZJBM.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T20:07:10.624Z — VERIFY — ok

By: CODER

Note: Implemented recipe blueprint extension normalization and manifest validation. Focused recipe tests, full typecheck, recipes build, targeted lint/format, policy routing, diff check, and agentplane doctor all pass; doctor retains one pre-existing WCPBCX projection warning.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T20:02:07.710Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun test packages/recipes/src/index.test.ts packages/recipes/src/overlay.test.ts packages/recipes/src/blueprint-extensions.test.ts; Result: pass; Evidence: 16 tests passed. Command: bun run --filter=@agentplaneorg/recipes typecheck; Result: pass; Evidence: package typecheck exit 0. Command: bun run typecheck; Result: pass; Evidence: tsc -b exit 0. Command: bun run --filter=@agentplaneorg/recipes build; Result: pass; Evidence: recipes dist build succeeded. Command: bunx eslint packages/recipes/src/manifest-contracts.ts packages/recipes/src/manifest.ts packages/recipes/src/blueprint-extensions.ts packages/recipes/src/blueprint-extensions.test.ts packages/recipes/src/index.ts; Result: pass; Evidence: eslint exit 0. Command: bunx prettier --check touched recipe files; Result: pass; Evidence: all matched files use Prettier style. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: git diff --check; Result: pass. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: doctor OK with one pre-existing WCPBCX branch_pr projection warning.
  Impact: Adds a bounded recipe-to-blueprint normalization layer without resolver wiring, CLI behavior, prompt graph application, or runner/runtime consumption.
  Resolution: Added manifest blueprint_extensions validation, normalized active recipe hint collection with provenance and deterministic ordering, and rejection reporting for unmatched when filters.
