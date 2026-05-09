---
id: "202605091233-GJX6S4"
title: "Align task new tests with canonical sections"
result_summary: "Merged PR 3499 to main with task-new regression tests aligned to canonical README sections."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T12:33:35.432Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T12:40:51.056Z"
  updated_by: "CODER"
  note: "Task new regression tests aligned with canonical README sections and targeted backend route verified."
commit:
  hash: "fbc0ee5ac1b88bad387e24eb1c2ef33663709b89"
  message: "Merge pull request #3499 from basilisk-labs/codex/v05-cloud-pull-fetch-fix"
comments:
  -
    author: "CODER"
    body: "Start: Update the task new regression assertions to match doc_version=3 canonical sections and unblock the targeted backend pre-push route."
  -
    author: "INTEGRATOR"
    body: "Verified: PR 3499 merged to main after task-new canonical section assertions passed locally and the full pre-push and hosted checks completed successfully."
events:
  -
    type: "status"
    at: "2026-05-09T12:33:38.965Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Update the task new regression assertions to match doc_version=3 canonical sections and unblock the targeted backend pre-push route."
  -
    type: "verify"
    at: "2026-05-09T12:40:51.056Z"
    author: "CODER"
    state: "ok"
    note: "Task new regression tests aligned with canonical README sections and targeted backend route verified."
  -
    type: "status"
    at: "2026-05-09T13:21:27.421Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR 3499 merged to main after task-new canonical section assertions passed locally and the full pre-push and hosted checks completed successfully."
doc_version: 3
doc_updated_at: "2026-05-09T13:21:27.424Z"
doc_updated_by: "INTEGRATOR"
description: "Update task new regression tests to assert doc_version=3 canonical sections instead of duplicated Markdown body so targeted backend pre-push route reflects the current task README contract."
sections:
  Summary: |-
    Align task new tests with canonical sections
    
    Update task new regression tests to assert doc_version=3 canonical sections instead of duplicated Markdown body so targeted backend pre-push route reflects the current task README contract.
  Scope: |-
    - In scope: Update task new regression tests to assert doc_version=3 canonical sections instead of duplicated Markdown body so targeted backend pre-push route reflects the current task README contract.
    - Out of scope: unrelated refactors not required for "Align task new tests with canonical sections".
  Plan: |-
    1. Update task new tests to assert doc_version=3 canonical frontmatter sections through readTask() instead of expecting duplicated Markdown body.
    2. Keep coverage for escaped newline normalization, Verify Steps content, and absence of scaffold TODO markers.
    3. Re-run the failing CLI test, targeted backend pre-push suite, cloud focused tests, hotspots, typecheck, lint, and live cloud pull before publishing.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T12:40:51.056Z — VERIFY — ok
    
    By: CODER
    
    Note: Task new regression tests aligned with canonical README sections and targeted backend route verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T12:33:38.972Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Result: pass. Evidence: 13 tests passed. Scope: task new README canonical section assertions.
    Command: bunx vitest run targeted backend/task CLI suite. Result: pass. Evidence: 19 files, 186 tests passed. Scope: pre-push backend route that previously failed.
    Command: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend/cloud-backend-utils.test.ts. Result: pass. Evidence: 25 tests passed. Scope: cloud backend timeout/freshness coverage.
    Command: bun run hotspots:check. Result: pass. Evidence: threshold check passed; oversized test baseline OK. Scope: hotspot budgets.
    Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: TypeScript project references.
    Command: bun run lint:core. Result: pass. Evidence: eslint exited 0. Scope: core lint surface.
    Command: bun run framework:dev:bootstrap && ap backend sync cloud --direction pull --conflict=diff --yes. Result: pass. Evidence: cloud pull diff changed=0 ignored_remote_only=0 conflicts=0. Scope: repo-local CLI build and live cloud pull.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605091233-GJX6S4/blueprint/resolved-snapshot.json
    - old_digest: 6168f3104df4da4f0d7da107b28a498865674bf3d51e111e2e45886e5cf8994b
    - current_digest: 6168f3104df4da4f0d7da107b28a498865674bf3d51e111e2e45886e5cf8994b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091233-GJX6S4
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
