---
id: "202605010645-YZ5WV4"
title: "AP-14: Add modular check runner"
result_summary: "Merged via PR #684."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605010645-JH4RV4"
tags:
  - "code"
verify:
  - "node scripts/run-checks.mjs --select docs:scripts && bun run docs:scripts:check"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T12:09:31.415Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T12:15:38.501Z"
  updated_by: "CODER"
  note: "Verified modular check runner and registry wrappers."
commit:
  hash: "5ca05b007a2b513af85bbbc21552c91027b72429"
  message: "Merge pull request #684 from basilisk-labs/task/202605010645-YZ5WV4/modular-check-runner"
comments:
  -
    author: "CODER"
    body: "Start: adding the modular check runner wrapper and registry without changing existing check command implementations."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #684 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T12:09:42.632Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: adding the modular check runner wrapper and registry without changing existing check command implementations."
  -
    type: "verify"
    at: "2026-05-01T12:15:38.501Z"
    author: "CODER"
    state: "ok"
    note: "Verified modular check runner and registry wrappers."
  -
    type: "status"
    at: "2026-05-01T12:19:08.675Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #684 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T12:19:08.680Z"
doc_updated_by: "INTEGRATOR"
description: "Add scripts/run-checks.mjs with a registry of pure checks while preserving existing npm script behavior."
sections:
  Summary: |-
    AP-14: Add modular check runner
    
    Add scripts/run-checks.mjs with a registry of pure checks while preserving existing npm script behavior.
  Scope: |-
    - In scope: Add scripts/run-checks.mjs with a registry of pure checks while preserving existing npm script behavior.
    - Out of scope: unrelated refactors not required for "AP-14: Add modular check runner".
  Plan: |-
    1. Add a small pure-check registry module for selected checks, starting with docs:scripts and a few existing read-only check commands as wrappers.
    2. Add scripts/run-checks.mjs with --select, --list, and --dry-run support without changing existing check logic.
    3. Add a package script entry for the runner and refresh scripts/README.md using the existing generator.
    4. Verify node scripts/run-checks.mjs --select docs:scripts, bun run docs:scripts:check, parser/list smoke, typecheck/lint/format, bootstrap, doctor, and policy routing.
  Verify Steps: |-
    1. Run `node scripts/run-checks.mjs --select docs:scripts && bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T12:15:38.501Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified modular check runner and registry wrappers.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T12:09:42.632Z, excerpt_hash=sha256:1f641cae0c233de4fa2a1f7fb499b97e77d3bb4f58c809c9634ad998280589f7
    
    Details:
    
    Commands passed:
    - node scripts/run-checks.mjs --list
    - node scripts/run-checks.mjs --select docs:scripts --dry-run
    - node scripts/run-checks.mjs --select docs:scripts
    - bun run docs:scripts:check
    - bunx prettier --check package.json scripts/run-checks.mjs scripts/lib/check-registry.mjs scripts/README.md .agentplane/tasks/202605010645-YZ5WV4/README.md
    - git diff --check
    - bun run typecheck
    - bun run lint:core
    - bun run framework:dev:bootstrap
    - node packages/agentplane/bin/agentplane.js doctor
    - node .agentplane/policy/check-routing.mjs
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

AP-14: Add modular check runner

Add scripts/run-checks.mjs with a registry of pure checks while preserving existing npm script behavior.

## Scope

- In scope: Add scripts/run-checks.mjs with a registry of pure checks while preserving existing npm script behavior.
- Out of scope: unrelated refactors not required for "AP-14: Add modular check runner".

## Plan

1. Add a small pure-check registry module for selected checks, starting with docs:scripts and a few existing read-only check commands as wrappers.
2. Add scripts/run-checks.mjs with --select, --list, and --dry-run support without changing existing check logic.
3. Add a package script entry for the runner and refresh scripts/README.md using the existing generator.
4. Verify node scripts/run-checks.mjs --select docs:scripts, bun run docs:scripts:check, parser/list smoke, typecheck/lint/format, bootstrap, doctor, and policy routing.

## Verify Steps

1. Run `node scripts/run-checks.mjs --select docs:scripts && bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T12:15:38.501Z — VERIFY — ok

By: CODER

Note: Verified modular check runner and registry wrappers.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T12:09:42.632Z, excerpt_hash=sha256:1f641cae0c233de4fa2a1f7fb499b97e77d3bb4f58c809c9634ad998280589f7

Details:

Commands passed:
- node scripts/run-checks.mjs --list
- node scripts/run-checks.mjs --select docs:scripts --dry-run
- node scripts/run-checks.mjs --select docs:scripts
- bun run docs:scripts:check
- bunx prettier --check package.json scripts/run-checks.mjs scripts/lib/check-registry.mjs scripts/README.md .agentplane/tasks/202605010645-YZ5WV4/README.md
- git diff --check
- bun run typecheck
- bun run lint:core
- bun run framework:dev:bootstrap
- node packages/agentplane/bin/agentplane.js doctor
- node .agentplane/policy/check-routing.mjs

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
