---
id: "202605041844-6DB6T4"
title: "Harden lifecycle text payload transport"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T18:45:00.774Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T19:08:37.304Z"
  updated_by: "CODER"
  note: "Verified: payload transport changes pass focused CLI lifecycle tests, typecheck, lint, diff check, policy routing, and doctor."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement safer lifecycle text payload transport and shell risk diagnostics in the task worktree."
events:
  -
    type: "status"
    at: "2026-05-04T18:45:18.636Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement safer lifecycle text payload transport and shell risk diagnostics in the task worktree."
  -
    type: "verify"
    at: "2026-05-04T19:08:37.304Z"
    author: "CODER"
    state: "ok"
    note: "Verified: payload transport changes pass focused CLI lifecycle tests, typecheck, lint, diff check, policy routing, and doctor."
doc_version: 3
doc_updated_at: "2026-05-04T19:08:37.319Z"
doc_updated_by: "CODER"
description: "Reduce shell quoting failures by adding safe file/stdin transport and risky inline payload diagnostics for lifecycle text fields."
sections:
  Summary: |-
    Harden lifecycle text payload transport
    
    Reduce shell quoting failures by adding safe file/stdin transport and risky inline payload diagnostics for lifecycle text fields.
  Scope: |-
    - In scope: Reduce shell quoting failures by adding safe file/stdin transport and risky inline payload diagnostics for lifecycle text fields.
    - Out of scope: unrelated refactors not required for "Harden lifecycle text payload transport".
  Plan: "1. Add shared text payload input helpers for lifecycle commands. 2. Add file or stdin options for body, note, and result fields where commands currently require inline text. 3. Add risky inline payload diagnostics for shell-sensitive text. 4. Update command help and regression tests. 5. Run focused CLI tests and record verification."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T19:08:37.304Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: payload transport changes pass focused CLI lifecycle tests, typecheck, lint, diff check, policy routing, and doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:45:18.636Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts. Result: pass. Evidence: 9 tests passed. Scope: start inline risk and body-file behavior. Command: bun run test:project -- cli-core lifecycle and pr validation files. Result: pass. Evidence: 52 tests passed. Scope: task lifecycle, finish, block, and PR note compatibility. Command: bun run typecheck. Result: pass. Evidence: tsc completed. Scope: TypeScript project. Command: bun eslint touched files. Result: pass. Evidence: no lint output. Scope: touched source files. Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: full diff. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing. Command: agentplane doctor. Result: pass. Evidence: doctor OK with zero warnings or errors. Scope: workspace runtime.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Harden lifecycle text payload transport

Reduce shell quoting failures by adding safe file/stdin transport and risky inline payload diagnostics for lifecycle text fields.

## Scope

- In scope: Reduce shell quoting failures by adding safe file/stdin transport and risky inline payload diagnostics for lifecycle text fields.
- Out of scope: unrelated refactors not required for "Harden lifecycle text payload transport".

## Plan

1. Add shared text payload input helpers for lifecycle commands. 2. Add file or stdin options for body, note, and result fields where commands currently require inline text. 3. Add risky inline payload diagnostics for shell-sensitive text. 4. Update command help and regression tests. 5. Run focused CLI tests and record verification.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T19:08:37.304Z — VERIFY — ok

By: CODER

Note: Verified: payload transport changes pass focused CLI lifecycle tests, typecheck, lint, diff check, policy routing, and doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:45:18.636Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts. Result: pass. Evidence: 9 tests passed. Scope: start inline risk and body-file behavior. Command: bun run test:project -- cli-core lifecycle and pr validation files. Result: pass. Evidence: 52 tests passed. Scope: task lifecycle, finish, block, and PR note compatibility. Command: bun run typecheck. Result: pass. Evidence: tsc completed. Scope: TypeScript project. Command: bun eslint touched files. Result: pass. Evidence: no lint output. Scope: touched source files. Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: full diff. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing. Command: agentplane doctor. Result: pass. Evidence: doctor OK with zero warnings or errors. Scope: workspace runtime.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
