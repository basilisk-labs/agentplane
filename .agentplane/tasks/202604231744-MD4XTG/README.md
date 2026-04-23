---
id: "202604231744-MD4XTG"
title: "Decompose migrate-doc runtime hotspot"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T17:44:57.942Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T18:21:39.389Z"
  updated_by: "CODER"
  note: |-
    Command: wc -l packages/agentplane/src/commands/task/migrate-doc.ts packages/agentplane/src/commands/task/migrate-doc.readme.ts; Result: pass; Evidence: migrate-doc.ts is now 191 lines and the extracted readme helper is 280 lines, removing the original hotspot from the runtime warning set. Scope: hotspot decomposition for the migrate-doc command surface.
    Command: ./node_modules/.bin/tsc -p packages/agentplane/tsconfig.json --noEmit; Result: pass; Evidence: typecheck completed successfully with the extracted readme helper module wired into the task command. Scope: package-level type safety for the touched task command modules.
    Command: node scripts/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; Result: pass; Evidence: hotspot threshold check passed and migrate-doc.ts no longer appears in the runtime warning list. Scope: repository hotspot guard after the migrate-doc split.
    Command: git diff --check; Result: pass; Evidence: no whitespace or patch formatting errors. Scope: final patch hygiene for the touched files.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split migrate-doc into smaller helpers, keep the command surface stable, and re-run the migrate-doc focused verification after the extraction."
events:
  -
    type: "status"
    at: "2026-04-23T17:44:58.401Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split migrate-doc into smaller helpers, keep the command surface stable, and re-run the migrate-doc focused verification after the extraction."
  -
    type: "verify"
    at: "2026-04-23T18:21:39.389Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: wc -l packages/agentplane/src/commands/task/migrate-doc.ts packages/agentplane/src/commands/task/migrate-doc.readme.ts; Result: pass; Evidence: migrate-doc.ts is now 191 lines and the extracted readme helper is 280 lines, removing the original hotspot from the runtime warning set. Scope: hotspot decomposition for the migrate-doc command surface.
      Command: ./node_modules/.bin/tsc -p packages/agentplane/tsconfig.json --noEmit; Result: pass; Evidence: typecheck completed successfully with the extracted readme helper module wired into the task command. Scope: package-level type safety for the touched task command modules.
      Command: node scripts/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; Result: pass; Evidence: hotspot threshold check passed and migrate-doc.ts no longer appears in the runtime warning list. Scope: repository hotspot guard after the migrate-doc split.
      Command: git diff --check; Result: pass; Evidence: no whitespace or patch formatting errors. Scope: final patch hygiene for the touched files.
doc_version: 3
doc_updated_at: "2026-04-23T18:21:58.425Z"
doc_updated_by: "CODER"
description: "Split packages/agentplane/src/commands/task/migrate-doc.ts into smaller focused helpers while preserving migrate-doc behavior and existing task migration coverage."
sections:
  Summary: |-
    Decompose migrate-doc runtime hotspot
    
    Split packages/agentplane/src/commands/task/migrate-doc.ts into smaller focused helpers while preserving migrate-doc behavior and existing task migration coverage.
  Scope: |-
    - In scope: Split packages/agentplane/src/commands/task/migrate-doc.ts into smaller focused helpers while preserving migrate-doc behavior and existing task migration coverage.
    - Out of scope: unrelated refactors not required for "Decompose migrate-doc runtime hotspot".
  Plan: "Map the major responsibilities inside packages/agentplane/src/commands/task/migrate-doc.ts, extract the pure migration helpers into focused sibling modules, keep the command entrypoint thin, and re-verify migrate-doc coverage plus task-oriented CLI behavior."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T18:21:39.389Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: wc -l packages/agentplane/src/commands/task/migrate-doc.ts packages/agentplane/src/commands/task/migrate-doc.readme.ts; Result: pass; Evidence: migrate-doc.ts is now 191 lines and the extracted readme helper is 280 lines, removing the original hotspot from the runtime warning set. Scope: hotspot decomposition for the migrate-doc command surface.
    Command: ./node_modules/.bin/tsc -p packages/agentplane/tsconfig.json --noEmit; Result: pass; Evidence: typecheck completed successfully with the extracted readme helper module wired into the task command. Scope: package-level type safety for the touched task command modules.
    Command: node scripts/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; Result: pass; Evidence: hotspot threshold check passed and migrate-doc.ts no longer appears in the runtime warning list. Scope: repository hotspot guard after the migrate-doc split.
    Command: git diff --check; Result: pass; Evidence: no whitespace or patch formatting errors. Scope: final patch hygiene for the touched files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T17:44:58.409Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Command: node scripts/bootstrap-framework-dev.mjs
    Skipped: command failed in the current shell before any repo mutation.
    Reason: the script requires bun, but this shell reports spawnSync bun ENOENT.
    Risk: low, because the code split is already typechecked and hotspot-checked locally, and the next push/release path will rebuild the runtime in pre-push CI-style checks.
    Approval: user asked to keep working through all open tasks and proceed to the release path after task closure.
id_source: "generated"
---
## Summary

Decompose migrate-doc runtime hotspot

Split packages/agentplane/src/commands/task/migrate-doc.ts into smaller focused helpers while preserving migrate-doc behavior and existing task migration coverage.

## Scope

- In scope: Split packages/agentplane/src/commands/task/migrate-doc.ts into smaller focused helpers while preserving migrate-doc behavior and existing task migration coverage.
- Out of scope: unrelated refactors not required for "Decompose migrate-doc runtime hotspot".

## Plan

Map the major responsibilities inside packages/agentplane/src/commands/task/migrate-doc.ts, extract the pure migration helpers into focused sibling modules, keep the command entrypoint thin, and re-verify migrate-doc coverage plus task-oriented CLI behavior.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T18:21:39.389Z — VERIFY — ok

By: CODER

Note: Command: wc -l packages/agentplane/src/commands/task/migrate-doc.ts packages/agentplane/src/commands/task/migrate-doc.readme.ts; Result: pass; Evidence: migrate-doc.ts is now 191 lines and the extracted readme helper is 280 lines, removing the original hotspot from the runtime warning set. Scope: hotspot decomposition for the migrate-doc command surface.
Command: ./node_modules/.bin/tsc -p packages/agentplane/tsconfig.json --noEmit; Result: pass; Evidence: typecheck completed successfully with the extracted readme helper module wired into the task command. Scope: package-level type safety for the touched task command modules.
Command: node scripts/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; Result: pass; Evidence: hotspot threshold check passed and migrate-doc.ts no longer appears in the runtime warning list. Scope: repository hotspot guard after the migrate-doc split.
Command: git diff --check; Result: pass; Evidence: no whitespace or patch formatting errors. Scope: final patch hygiene for the touched files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T17:44:58.409Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Command: node scripts/bootstrap-framework-dev.mjs
Skipped: command failed in the current shell before any repo mutation.
Reason: the script requires bun, but this shell reports spawnSync bun ENOENT.
Risk: low, because the code split is already typechecked and hotspot-checked locally, and the next push/release path will rebuild the runtime in pre-push CI-style checks.
Approval: user asked to keep working through all open tasks and proceed to the release path after task closure.
