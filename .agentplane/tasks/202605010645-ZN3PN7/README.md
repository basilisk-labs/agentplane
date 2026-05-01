---
id: "202605010645-ZN3PN7"
title: "AP-16: Validate spec examples as mirrors"
result_summary: "Merged via PR #688."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605010645-5H9FJ5"
tags:
  - "code"
verify:
  - "bun run schemas:check && node scripts/check-spec-examples.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T12:45:23.816Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T12:52:01.818Z"
  updated_by: "CODER"
  note: "Verified spec examples against generated core schemas."
commit:
  hash: "88df17c529aac0f80fecff477ab5beec4ef03e10"
  message: "Merge pull request #688 from basilisk-labs/task/202605010645-ZN3PN7/spec-examples-validation"
comments:
  -
    author: "CODER"
    body: "Start: adding spec example validation against generated core schemas while keeping @agentplane/spec as a mirror artifact."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #688 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T12:45:51.773Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: adding spec example validation against generated core schemas while keeping @agentplane/spec as a mirror artifact."
  -
    type: "verify"
    at: "2026-05-01T12:52:01.818Z"
    author: "CODER"
    state: "ok"
    note: "Verified spec examples against generated core schemas."
  -
    type: "status"
    at: "2026-05-01T12:55:28.885Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #688 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T12:55:28.890Z"
doc_updated_by: "INTEGRATOR"
description: "Validate packages/spec examples against generated schemas without making spec the source of truth."
sections:
  Summary: |-
    AP-16: Validate spec examples as mirrors
    
    Validate packages/spec examples against generated schemas without making spec the source of truth.
  Scope: |-
    - In scope: Validate packages/spec examples against generated schemas without making spec the source of truth.
    - Out of scope: unrelated refactors not required for "AP-16: Validate spec examples as mirrors".
  Plan: |-
    1. Use packages/core/schemas as the generated schema source when validating packages/spec/examples so @agentplane/spec remains a mirror, not the canonical source.
    2. Add scripts/check-spec-examples.mjs with an explicit example-to-schema route table and a small JSON Schema validator for the generated schema subset used by AgentPlane artifacts.
    3. Wire the check through package scripts and the modular check registry, then refresh generated script documentation.
    4. Verify bun run schemas:check, node scripts/check-spec-examples.mjs, docs:scripts:check, focused registry smoke, typecheck/lint/format, framework bootstrap, doctor, and policy routing.
  Verify Steps: |-
    1. Run `bun run schemas:check && node scripts/check-spec-examples.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T12:52:01.818Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified spec examples against generated core schemas.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T12:45:51.773Z, excerpt_hash=sha256:bf4e549fdbb2371efc953454d08b2732902b201ba76e6f7a548da3441dd97ae7
    
    Details:
    
    Commands passed:
    - node packages/agentplane/bin/agentplane.js task verify-show 202605010645-ZN3PN7
    - bun run schemas:check
    - node scripts/check-spec-examples.mjs
    - bun run spec:examples:check
    - node scripts/run-checks.mjs --select spec:examples --dry-run
    - node scripts/run-checks.mjs --select spec:examples
    - bun run docs:scripts:check
    - bunx prettier --check package.json scripts/check-spec-examples.mjs scripts/lib/check-registry.mjs scripts/README.md .agentplane/tasks/202605010645-ZN3PN7/README.md
    - git diff --check
    - bun run typecheck
    - bun run lint:core
    - bun run framework:dev:bootstrap
    - node packages/agentplane/bin/agentplane.js doctor
    - node .agentplane/policy/check-routing.mjs
    
    Spec source-of-truth note: check-spec-examples reads generated schemas from packages/core/schemas. bun run schemas:check separately proves packages/spec/schemas stays synchronized as a mirror.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

AP-16: Validate spec examples as mirrors

Validate packages/spec examples against generated schemas without making spec the source of truth.

## Scope

- In scope: Validate packages/spec examples against generated schemas without making spec the source of truth.
- Out of scope: unrelated refactors not required for "AP-16: Validate spec examples as mirrors".

## Plan

1. Use packages/core/schemas as the generated schema source when validating packages/spec/examples so @agentplane/spec remains a mirror, not the canonical source.
2. Add scripts/check-spec-examples.mjs with an explicit example-to-schema route table and a small JSON Schema validator for the generated schema subset used by AgentPlane artifacts.
3. Wire the check through package scripts and the modular check registry, then refresh generated script documentation.
4. Verify bun run schemas:check, node scripts/check-spec-examples.mjs, docs:scripts:check, focused registry smoke, typecheck/lint/format, framework bootstrap, doctor, and policy routing.

## Verify Steps

1. Run `bun run schemas:check && node scripts/check-spec-examples.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T12:52:01.818Z — VERIFY — ok

By: CODER

Note: Verified spec examples against generated core schemas.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T12:45:51.773Z, excerpt_hash=sha256:bf4e549fdbb2371efc953454d08b2732902b201ba76e6f7a548da3441dd97ae7

Details:

Commands passed:
- node packages/agentplane/bin/agentplane.js task verify-show 202605010645-ZN3PN7
- bun run schemas:check
- node scripts/check-spec-examples.mjs
- bun run spec:examples:check
- node scripts/run-checks.mjs --select spec:examples --dry-run
- node scripts/run-checks.mjs --select spec:examples
- bun run docs:scripts:check
- bunx prettier --check package.json scripts/check-spec-examples.mjs scripts/lib/check-registry.mjs scripts/README.md .agentplane/tasks/202605010645-ZN3PN7/README.md
- git diff --check
- bun run typecheck
- bun run lint:core
- bun run framework:dev:bootstrap
- node packages/agentplane/bin/agentplane.js doctor
- node .agentplane/policy/check-routing.mjs

Spec source-of-truth note: check-spec-examples reads generated schemas from packages/core/schemas. bun run schemas:check separately proves packages/spec/schemas stays synchronized as a mirror.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
