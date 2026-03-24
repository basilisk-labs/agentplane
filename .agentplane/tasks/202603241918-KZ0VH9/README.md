---
id: "202603241918-KZ0VH9"
title: "Runner tests: wait for the correct graceful-cancel postcondition"
result_summary: "The running-run cancel test no longer requires exit_signal when graceful TERM handling exits 0."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202603241918-BG2EQH"
tags:
  - "code"
  - "runner"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T19:26:49.317Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T19:33:38.998Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts -t \"cancel terminates a running execute-mode run via persisted supervision metadata\"; Result: pass; Evidence: 1 passed, 4 skipped; the test now waits for cancelled state plus cancel_signal instead of requiring exit_signal. Scope: packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.\\nCommand: git diff -- packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts .agentplane/tasks/202603241918-KZ0VH9/README.md; Result: pass; Evidence: diff is limited to the one flaky test and task traceability. Scope: KZ0VH9."
commit:
  hash: "1dd13bd1cb5c17b13dcff3a5ddc4c525c36ae50a"
  message: "✨ KZ0VH9 code: wait for the correct graceful-cancel postcondition"
comments:
  -
    author: "CODER"
    body: "Start: update the running-run cancel lifecycle test so it waits for the correct graceful-cancel postcondition and no longer requires exit_signal when the child traps TERM and exits 0."
  -
    author: "CODER"
    body: "Verified: the flaky cancel lifecycle test now waits for the correct graceful-cancel postcondition."
events:
  -
    type: "status"
    at: "2026-03-24T19:32:23.957Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: update the running-run cancel lifecycle test so it waits for the correct graceful-cancel postcondition and no longer requires exit_signal when the child traps TERM and exits 0."
  -
    type: "verify"
    at: "2026-03-24T19:33:38.998Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts -t \"cancel terminates a running execute-mode run via persisted supervision metadata\"; Result: pass; Evidence: 1 passed, 4 skipped; the test now waits for cancelled state plus cancel_signal instead of requiring exit_signal. Scope: packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.\\nCommand: git diff -- packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts .agentplane/tasks/202603241918-KZ0VH9/README.md; Result: pass; Evidence: diff is limited to the one flaky test and task traceability. Scope: KZ0VH9."
  -
    type: "status"
    at: "2026-03-24T19:33:41.101Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the flaky cancel lifecycle test now waits for the correct graceful-cancel postcondition."
doc_version: 3
doc_updated_at: "2026-03-24T19:33:41.102Z"
doc_updated_by: "CODER"
description: "Stabilize the running-run cancel lifecycle test by asserting the correct postcondition for graceful cancellation: cancelled status plus recorded cancel intent, without requiring exit_signal when the child traps TERM and exits 0."
sections:
  Summary: |-
    Runner tests: wait for the correct graceful-cancel postcondition
    
    Stabilize the running-run cancel lifecycle test by asserting the correct postcondition for graceful cancellation: cancelled status plus recorded cancel intent, without requiring exit_signal when the child traps TERM and exits 0.
  Scope: |-
    - In scope: harden the flaky cancel lifecycle assertion so it matches the real graceful-cancel contract.
    - Out of scope: broader runtime changes beyond what is needed to make the test assert the right postcondition.
  Plan: |-
    1. Update the running-run cancel lifecycle test to wait for the correct graceful-cancel postcondition.
    2. Remove the unconditional requirement that exit_signal be present when the child exits cleanly after TERM.
    3. Verify the test now asserts the corrected runtime contract instead of a stronger signal-only termination assumption.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts -t "cancel terminates a running execute-mode run via persisted supervision metadata". Expected: the test passes consistently without requiring exit_signal on graceful TERM handling.
    2. Inspect the updated assertion. Expected: it waits for cancelled state plus the corrected cancel metadata rather than a single immediate final-state read.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T19:33:38.998Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts -t "cancel terminates a running execute-mode run via persisted supervision metadata"; Result: pass; Evidence: 1 passed, 4 skipped; the test now waits for cancelled state plus cancel_signal instead of requiring exit_signal. Scope: packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.\nCommand: git diff -- packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts .agentplane/tasks/202603241918-KZ0VH9/README.md; Result: pass; Evidence: diff is limited to the one flaky test and task traceability. Scope: KZ0VH9.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T19:32:23.961Z, excerpt_hash=sha256:65457132a753515d20da443fc7d48f0cdf716fd74f342e31d1d88be6ead38196
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Runner tests: wait for the correct graceful-cancel postcondition

Stabilize the running-run cancel lifecycle test by asserting the correct postcondition for graceful cancellation: cancelled status plus recorded cancel intent, without requiring exit_signal when the child traps TERM and exits 0.

## Scope

- In scope: harden the flaky cancel lifecycle assertion so it matches the real graceful-cancel contract.
- Out of scope: broader runtime changes beyond what is needed to make the test assert the right postcondition.

## Plan

1. Update the running-run cancel lifecycle test to wait for the correct graceful-cancel postcondition.
2. Remove the unconditional requirement that exit_signal be present when the child exits cleanly after TERM.
3. Verify the test now asserts the corrected runtime contract instead of a stronger signal-only termination assumption.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts -t "cancel terminates a running execute-mode run via persisted supervision metadata". Expected: the test passes consistently without requiring exit_signal on graceful TERM handling.
2. Inspect the updated assertion. Expected: it waits for cancelled state plus the corrected cancel metadata rather than a single immediate final-state read.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T19:33:38.998Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts -t "cancel terminates a running execute-mode run via persisted supervision metadata"; Result: pass; Evidence: 1 passed, 4 skipped; the test now waits for cancelled state plus cancel_signal instead of requiring exit_signal. Scope: packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.\nCommand: git diff -- packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts .agentplane/tasks/202603241918-KZ0VH9/README.md; Result: pass; Evidence: diff is limited to the one flaky test and task traceability. Scope: KZ0VH9.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T19:32:23.961Z, excerpt_hash=sha256:65457132a753515d20da443fc7d48f0cdf716fd74f342e31d1d88be6ead38196

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
