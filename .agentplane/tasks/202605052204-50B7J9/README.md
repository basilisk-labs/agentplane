---
id: "202605052204-50B7J9"
title: "Show blueprint and context budget in runner bundle"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605052204-GD17KQ"
tags:
  - "blueprints"
  - "code"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T22:05:21.399Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T22:19:19.191Z"
  updated_by: "CODER"
  note: "Verified: runner bundle and task run inspection output now surface selected blueprint, selected recipe, context budget, policy modules, context manifest, and evidence checklist."
commit:
  hash: "5e16019e1eea4992217e70d12170dc8661de1988"
  message: "Merge pull request #952 from basilisk-labs/task/202605052203-WH7G6R/executable-blueprint-contracts"
comments:
  -
    author: "CODER"
    body: "Start: Surface selected blueprint, recipe, context budget, policy modules, and evidence checklist in runner bundle output for the approved batch."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #952 merged the dependent executable blueprint registry, plan artifact, explain, recipe binding, and runner bundle visibility tasks into main."
events:
  -
    type: "status"
    at: "2026-05-05T22:07:39.868Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Surface selected blueprint, recipe, context budget, policy modules, and evidence checklist in runner bundle output for the approved batch."
  -
    type: "verify"
    at: "2026-05-05T22:19:19.191Z"
    author: "CODER"
    state: "ok"
    note: "Verified: runner bundle and task run inspection output now surface selected blueprint, selected recipe, context budget, policy modules, context manifest, and evidence checklist."
  -
    type: "status"
    at: "2026-05-05T22:27:39.726Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #952 merged the dependent executable blueprint registry, plan artifact, explain, recipe binding, and runner bundle visibility tasks into main."
doc_version: 3
doc_updated_at: "2026-05-05T22:27:39.726Z"
doc_updated_by: "INTEGRATOR"
description: "Add the sixth implementation task for blueprint execution contracts: surface selected blueprint, selected recipe, loaded context rationale, context budget, policy modules, and evidence checklist in runner bundle output for auditability."
sections:
  Summary: |-
    Show blueprint and context budget in runner bundle
    
    Add the sixth implementation task for blueprint execution contracts: surface selected blueprint, selected recipe, loaded context rationale, context budget, policy modules, and evidence checklist in runner bundle output for auditability.
  Scope: |-
    - In scope: Add the sixth implementation task for blueprint execution contracts: surface selected blueprint, selected recipe, loaded context rationale, context budget, policy modules, and evidence checklist in runner bundle output for auditability.
    - Out of scope: unrelated refactors not required for "Show blueprint and context budget in runner bundle".
  Plan: |-
    1. Locate runner bundle assembly and current context reporting surfaces.
    2. Add selected blueprint and selected recipe metadata to runner bundle output.
    3. Include loaded context rationale, context budget, policy modules, and evidence checklist.
    4. Validate that unrelated policy modules are not reported as loaded.
    5. Add snapshot or focused tests for runner bundle visibility.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T22:19:19.191Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: runner bundle and task run inspection output now surface selected blueprint, selected recipe, context budget, policy modules, context manifest, and evidence checklist.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T22:07:39.868Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: runner dry-run preparation suite, full blueprint tests, typecheck, targeted eslint, schemas, docs CLI freshness, policy routing, doctor, and diff check.
      Impact: Runner consumers can audit the route and context boundaries from bundle.json and CLI inspection output.
      Resolution: Added blueprint plan to RunnerContextBundle and surfaced the audit fields in dry-run and run-show output.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Show blueprint and context budget in runner bundle

Add the sixth implementation task for blueprint execution contracts: surface selected blueprint, selected recipe, loaded context rationale, context budget, policy modules, and evidence checklist in runner bundle output for auditability.

## Scope

- In scope: Add the sixth implementation task for blueprint execution contracts: surface selected blueprint, selected recipe, loaded context rationale, context budget, policy modules, and evidence checklist in runner bundle output for auditability.
- Out of scope: unrelated refactors not required for "Show blueprint and context budget in runner bundle".

## Plan

1. Locate runner bundle assembly and current context reporting surfaces.
2. Add selected blueprint and selected recipe metadata to runner bundle output.
3. Include loaded context rationale, context budget, policy modules, and evidence checklist.
4. Validate that unrelated policy modules are not reported as loaded.
5. Add snapshot or focused tests for runner bundle visibility.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T22:19:19.191Z — VERIFY — ok

By: CODER

Note: Verified: runner bundle and task run inspection output now surface selected blueprint, selected recipe, context budget, policy modules, context manifest, and evidence checklist.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T22:07:39.868Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: runner dry-run preparation suite, full blueprint tests, typecheck, targeted eslint, schemas, docs CLI freshness, policy routing, doctor, and diff check.
  Impact: Runner consumers can audit the route and context boundaries from bundle.json and CLI inspection output.
  Resolution: Added blueprint plan to RunnerContextBundle and surfaced the audit fields in dry-run and run-show output.
  Promotion: incident-candidate
  Fixability: external
