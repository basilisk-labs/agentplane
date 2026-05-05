---
id: "202605052204-4XSTAA"
title: "Expose blueprint plan explain surface"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605052204-WJ25N8"
tags:
  - "blueprints"
  - "cli"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T22:05:15.477Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T22:18:57.859Z"
  updated_by: "CODER"
  note: "Verified: blueprint explain output now includes materialized plan metadata: policy modules, allowed commands, context budget, context manifest count, evidence, recipe extensions, and stop reasons."
commit:
  hash: "5e16019e1eea4992217e70d12170dc8661de1988"
  message: "Merge pull request #952 from basilisk-labs/task/202605052203-WH7G6R/executable-blueprint-contracts"
comments:
  -
    author: "CODER"
    body: "Start: Extend blueprint explain output for the approved executable blueprint batch implementation."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #952 merged the dependent executable blueprint registry, plan artifact, explain, recipe binding, and runner bundle visibility tasks into main."
events:
  -
    type: "status"
    at: "2026-05-05T22:07:30.789Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extend blueprint explain output for the approved executable blueprint batch implementation."
  -
    type: "verify"
    at: "2026-05-05T22:18:57.859Z"
    author: "CODER"
    state: "ok"
    note: "Verified: blueprint explain output now includes materialized plan metadata: policy modules, allowed commands, context budget, context manifest count, evidence, recipe extensions, and stop reasons."
  -
    type: "status"
    at: "2026-05-05T22:27:39.722Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #952 merged the dependent executable blueprint registry, plan artifact, explain, recipe binding, and runner bundle visibility tasks into main."
doc_version: 3
doc_updated_at: "2026-05-05T22:27:39.722Z"
doc_updated_by: "INTEGRATOR"
description: "Add the fourth implementation task for blueprint execution contracts: extend the blueprint explain surface so it reports the selected blueprint definition, why it was selected, state order, evidence requirements, policy modules, and any fallback or conflict signals."
sections:
  Summary: |-
    Expose blueprint plan explain surface
    
    Add the fourth implementation task for blueprint execution contracts: extend the blueprint explain surface so it reports the selected blueprint definition, why it was selected, state order, evidence requirements, policy modules, and any fallback or conflict signals.
  Scope: |-
    - In scope: Add the fourth implementation task for blueprint execution contracts: extend the blueprint explain surface so it reports the selected blueprint definition, why it was selected, state order, evidence requirements, policy modules, and any fallback or conflict signals.
    - Out of scope: unrelated refactors not required for "Expose blueprint plan explain surface".
  Plan: |-
    1. Extend the existing blueprint explain CLI/output surface.
    2. Show selected blueprint id, selection reason, matched task intent, fallback signals, state order, required evidence, policy modules, and command boundaries.
    3. Make ambiguous or conflicting signals visible without requiring model judgment inside the script.
    4. Keep output compact enough for agent startup context.
    5. Add CLI and formatter tests.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T22:18:57.859Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: blueprint explain output now includes materialized plan metadata: policy modules, allowed commands, context budget, context manifest count, evidence, recipe extensions, and stop reasons.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T22:07:30.789Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: full blueprint resolver/explain tests plus runner dry-run preparation tests, typecheck, targeted eslint, schemas, docs CLI freshness, policy routing, doctor, and diff check.
      Impact: Agents and reviewers can see why a route was selected and what execution boundaries it carries before state execution exists.
      Resolution: Extended explain output and JSON shape through the plan artifact.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Expose blueprint plan explain surface

Add the fourth implementation task for blueprint execution contracts: extend the blueprint explain surface so it reports the selected blueprint definition, why it was selected, state order, evidence requirements, policy modules, and any fallback or conflict signals.

## Scope

- In scope: Add the fourth implementation task for blueprint execution contracts: extend the blueprint explain surface so it reports the selected blueprint definition, why it was selected, state order, evidence requirements, policy modules, and any fallback or conflict signals.
- Out of scope: unrelated refactors not required for "Expose blueprint plan explain surface".

## Plan

1. Extend the existing blueprint explain CLI/output surface.
2. Show selected blueprint id, selection reason, matched task intent, fallback signals, state order, required evidence, policy modules, and command boundaries.
3. Make ambiguous or conflicting signals visible without requiring model judgment inside the script.
4. Keep output compact enough for agent startup context.
5. Add CLI and formatter tests.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T22:18:57.859Z — VERIFY — ok

By: CODER

Note: Verified: blueprint explain output now includes materialized plan metadata: policy modules, allowed commands, context budget, context manifest count, evidence, recipe extensions, and stop reasons.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T22:07:30.789Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: full blueprint resolver/explain tests plus runner dry-run preparation tests, typecheck, targeted eslint, schemas, docs CLI freshness, policy routing, doctor, and diff check.
  Impact: Agents and reviewers can see why a route was selected and what execution boundaries it carries before state execution exists.
  Resolution: Extended explain output and JSON shape through the plan artifact.
  Promotion: incident-candidate
  Fixability: external
