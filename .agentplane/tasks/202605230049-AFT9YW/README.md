---
id: "202605230049-AFT9YW"
title: "Narrow hosted close PR local CI route"
result_summary: "Merged via PR #4058."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T00:49:34.378Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T01:02:16.822Z"
  updated_by: "CODER"
  note: "Addressed PR review: hosted-close-pr bucket now matches only hosted-close-pr files, while non-PR hosted-close command paths remain on the generic task route. Re-ran selector tests, route smoke, lint, and format."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-23T00:54:27.458Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: implementation is scoped to local CI route selection; declared checks passed; no broad fallback remains for isolated hosted-close-pr paths."
  evaluated_sha: "2e03c1dd735a70df8b0975ebd2a251a7b7460ffb"
  blueprint_digest: "b60e680a94ea950ea79717c7bb72c674f79fc7840d521627013270eddd9c89c7"
  evidence_refs:
    - ".agentplane/tasks/202605230049-AFT9YW/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230049-AFT9YW-hosted-close-pr-ci-route/.agentplane/tasks/202605230049-AFT9YW/blueprint/resolved-snapshot.json"
  findings:
    - "Reviewed changed files and verification evidence. The selector regression asserts bucket=hosted-close-pr, reason=hosted_close_pr_paths_only, forks pool, neutral task artifacts stripped from lint targets, and the exact focused test file list. run-local-ci smoke confirmed the route in executable form."
commit:
  hash: "a1b5b819ffecffb68651a5fa808492bdae61dbba"
  message: "Merge pull request #4058 from basilisk-labs/task/202605230049-AFT9YW/hosted-close-pr-ci-route"
comments:
  -
    author: "CODER"
    body: "Start: narrowing hosted-close-pr local CI routing to focused hosted-close tests before generic task or CLI fallbacks."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4058 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-23T00:49:49.439Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: narrowing hosted-close-pr local CI routing to focused hosted-close tests before generic task or CLI fallbacks."
  -
    type: "verify"
    at: "2026-05-23T00:53:44.353Z"
    author: "CODER"
    state: "ok"
    note: "Implemented a dedicated hosted-close-pr local CI bucket before generic task/CLI routes. Verification passed: selector regression suite, real changed-file route smoke, lint, and format."
  -
    type: "verify"
    at: "2026-05-23T00:54:27.458Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator check: implementation is scoped to local CI route selection; declared checks passed; no broad fallback remains for isolated hosted-close-pr paths."
  -
    type: "verify"
    at: "2026-05-23T01:02:16.822Z"
    author: "CODER"
    state: "ok"
    note: "Addressed PR review: hosted-close-pr bucket now matches only hosted-close-pr files, while non-PR hosted-close command paths remain on the generic task route. Re-ran selector tests, route smoke, lint, and format."
  -
    type: "status"
    at: "2026-05-23T01:08:45.446Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4058 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-23T01:08:45.453Z"
doc_updated_by: "INTEGRATOR"
description: "task hosted-close-pr source/test changes currently select full-fast pre-push even when the touched files map to the hosted close PR helper. Add a targeted local CI bucket for hosted-close-pr paths so agents run the hosted-close/hosted-close-pr focused suite instead of the full fast sweep."
sections:
  Summary: |-
    Narrow hosted close PR local CI route

    task hosted-close-pr source/test changes currently select full-fast pre-push even when the touched files map to the hosted close PR helper. Add a targeted local CI bucket for hosted-close-pr paths so agents run the hosted-close/hosted-close-pr focused suite instead of the full fast sweep.
  Scope: |-
    - In scope: task hosted-close-pr source/test changes currently select full-fast pre-push even when the touched files map to the hosted close PR helper. Add a targeted local CI bucket for hosted-close-pr paths so agents run the hosted-close/hosted-close-pr focused suite instead of the full fast sweep.
    - Out of scope: unrelated refactors not required for "Narrow hosted close PR local CI route".
  Plan: |-
    1. Inspect current local CI route registry and selector ordering for hosted-close-pr paths.
    2. Add a dedicated hosted-close-pr targeted test bucket covering hosted-close and hosted-close-pr focused tests.
    3. Route isolated hosted-close-pr command/helper/CLI test paths to that bucket before generic task/CLI fallbacks.
    4. Add selector regression coverage and verify the route via focused tests, run-local-ci changed-files smoke, lint, and format checks.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts`. Expected: selector regression tests pass.
    2. Run `node scripts/checks/run-local-ci.mjs --mode fast --changed-files packages/agentplane/src/commands/task/hosted-close-pr.execute.ts --changed-files packages/agentplane/src/commands/task/hosted-close-pr.precheck.ts --changed-files packages/agentplane/src/commands/task/hosted-close-pr.types.ts --changed-files packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts`. Expected: selector reports `targeted (hosted-close-pr)` and focused hosted-close tests pass.
    3. Run targeted lint and format checks for changed files. Expected: no lint errors and formatting is unchanged.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T00:53:44.353Z — VERIFY — ok

    By: CODER

    Note: Implemented a dedicated hosted-close-pr local CI bucket before generic task/CLI routes. Verification passed: selector regression suite, real changed-file route smoke, lint, and format.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T00:49:49.439Z, excerpt_hash=sha256:7b96c3ce07d90a8ca135e13b9564093e00f67bc9c5a8dd49dbe5ae75b74757f2

    Details:

    Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts
    Result: pass
    Evidence: 1 file, 53 tests passed.
    Scope: selector regression coverage.

    Command: node scripts/checks/run-local-ci.mjs --mode fast --changed-files packages/agentplane/src/commands/task/hosted-close-pr.execute.ts --changed-files packages/agentplane/src/commands/task/hosted-close-pr.precheck.ts --changed-files packages/agentplane/src/commands/task/hosted-close-pr.types.ts --changed-files packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts
    Result: pass
    Evidence: Fast CI selector: targeted (hosted-close-pr); focused 3 files, 11 tests passed.
    Scope: real changed-file route.

    Command: bun run lint:core -- scripts/lib/test-route-registry.mjs scripts/lib/local-ci-selection.mjs scripts/lib/local-ci-selection.d.ts packages/agentplane/src/cli/local-ci-selection.test.ts
    Result: pass
    Evidence: no lint errors; local-ci-selection.d.ts emitted ignored-file warning only.
    Scope: changed files.

    Command: bun run format:check -- scripts/lib/test-route-registry.mjs scripts/lib/local-ci-selection.mjs scripts/lib/local-ci-selection.d.ts packages/agentplane/src/cli/local-ci-selection.test.ts
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: changed files.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230049-AFT9YW-hosted-close-pr-ci-route/.agentplane/tasks/202605230049-AFT9YW/blueprint/resolved-snapshot.json
    - old_digest: b60e680a94ea950ea79717c7bb72c674f79fc7840d521627013270eddd9c89c7
    - current_digest: b60e680a94ea950ea79717c7bb72c674f79fc7840d521627013270eddd9c89c7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230049-AFT9YW

    ### 2026-05-23T00:54:27.458Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator check: implementation is scoped to local CI route selection; declared checks passed; no broad fallback remains for isolated hosted-close-pr paths.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T00:53:44.379Z, excerpt_hash=sha256:7b96c3ce07d90a8ca135e13b9564093e00f67bc9c5a8dd49dbe5ae75b74757f2

    Details:

    Reviewed changed files and verification evidence. The selector regression asserts bucket=hosted-close-pr, reason=hosted_close_pr_paths_only, forks pool, neutral task artifacts stripped from lint targets, and the exact focused test file list. run-local-ci smoke confirmed the route in executable form.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230049-AFT9YW-hosted-close-pr-ci-route/.agentplane/tasks/202605230049-AFT9YW/blueprint/resolved-snapshot.json
    - old_digest: b60e680a94ea950ea79717c7bb72c674f79fc7840d521627013270eddd9c89c7
    - current_digest: b60e680a94ea950ea79717c7bb72c674f79fc7840d521627013270eddd9c89c7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230049-AFT9YW

    ### 2026-05-23T01:02:16.822Z — VERIFY — ok

    By: CODER

    Note: Addressed PR review: hosted-close-pr bucket now matches only hosted-close-pr files, while non-PR hosted-close command paths remain on the generic task route. Re-ran selector tests, route smoke, lint, and format.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T00:54:27.486Z, excerpt_hash=sha256:7b96c3ce07d90a8ca135e13b9564093e00f67bc9c5a8dd49dbe5ae75b74757f2

    Details:

    Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts
    Result: pass
    Evidence: 1 file, 54 tests passed, including non-PR hosted-close routing regression.
    Scope: selector regression coverage.

    Command: node scripts/checks/run-local-ci.mjs --mode fast --changed-files packages/agentplane/src/commands/task/hosted-close-pr.execute.ts --changed-files packages/agentplane/src/commands/task/hosted-close-pr.precheck.ts --changed-files packages/agentplane/src/commands/task/hosted-close-pr.types.ts --changed-files packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts
    Result: pass
    Evidence: Fast CI selector: targeted (hosted-close-pr); focused 3 files, 11 tests passed.
    Scope: real changed-file route.

    Command: bun run lint:core -- scripts/lib/test-route-registry.mjs scripts/lib/local-ci-selection.mjs scripts/lib/local-ci-selection.d.ts packages/agentplane/src/cli/local-ci-selection.test.ts
    Result: pass
    Evidence: no lint errors; local-ci-selection.d.ts emitted ignored-file warning only.
    Scope: changed files.

    Command: bun run format:check -- scripts/lib/test-route-registry.mjs scripts/lib/local-ci-selection.mjs scripts/lib/local-ci-selection.d.ts packages/agentplane/src/cli/local-ci-selection.test.ts
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: changed files.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230049-AFT9YW-hosted-close-pr-ci-route/.agentplane/tasks/202605230049-AFT9YW/blueprint/resolved-snapshot.json
    - old_digest: b60e680a94ea950ea79717c7bb72c674f79fc7840d521627013270eddd9c89c7
    - current_digest: b60e680a94ea950ea79717c7bb72c674f79fc7840d521627013270eddd9c89c7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230049-AFT9YW

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Narrow hosted close PR local CI route

task hosted-close-pr source/test changes currently select full-fast pre-push even when the touched files map to the hosted close PR helper. Add a targeted local CI bucket for hosted-close-pr paths so agents run the hosted-close/hosted-close-pr focused suite instead of the full fast sweep.

## Scope

- In scope: task hosted-close-pr source/test changes currently select full-fast pre-push even when the touched files map to the hosted close PR helper. Add a targeted local CI bucket for hosted-close-pr paths so agents run the hosted-close/hosted-close-pr focused suite instead of the full fast sweep.
- Out of scope: unrelated refactors not required for "Narrow hosted close PR local CI route".

## Plan

1. Inspect current local CI route registry and selector ordering for hosted-close-pr paths.
2. Add a dedicated hosted-close-pr targeted test bucket covering hosted-close and hosted-close-pr focused tests.
3. Route isolated hosted-close-pr command/helper/CLI test paths to that bucket before generic task/CLI fallbacks.
4. Add selector regression coverage and verify the route via focused tests, run-local-ci changed-files smoke, lint, and format checks.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts`. Expected: selector regression tests pass.
2. Run `node scripts/checks/run-local-ci.mjs --mode fast --changed-files packages/agentplane/src/commands/task/hosted-close-pr.execute.ts --changed-files packages/agentplane/src/commands/task/hosted-close-pr.precheck.ts --changed-files packages/agentplane/src/commands/task/hosted-close-pr.types.ts --changed-files packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts`. Expected: selector reports `targeted (hosted-close-pr)` and focused hosted-close tests pass.
3. Run targeted lint and format checks for changed files. Expected: no lint errors and formatting is unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T00:53:44.353Z — VERIFY — ok

By: CODER

Note: Implemented a dedicated hosted-close-pr local CI bucket before generic task/CLI routes. Verification passed: selector regression suite, real changed-file route smoke, lint, and format.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T00:49:49.439Z, excerpt_hash=sha256:7b96c3ce07d90a8ca135e13b9564093e00f67bc9c5a8dd49dbe5ae75b74757f2

Details:

Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts
Result: pass
Evidence: 1 file, 53 tests passed.
Scope: selector regression coverage.

Command: node scripts/checks/run-local-ci.mjs --mode fast --changed-files packages/agentplane/src/commands/task/hosted-close-pr.execute.ts --changed-files packages/agentplane/src/commands/task/hosted-close-pr.precheck.ts --changed-files packages/agentplane/src/commands/task/hosted-close-pr.types.ts --changed-files packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts
Result: pass
Evidence: Fast CI selector: targeted (hosted-close-pr); focused 3 files, 11 tests passed.
Scope: real changed-file route.

Command: bun run lint:core -- scripts/lib/test-route-registry.mjs scripts/lib/local-ci-selection.mjs scripts/lib/local-ci-selection.d.ts packages/agentplane/src/cli/local-ci-selection.test.ts
Result: pass
Evidence: no lint errors; local-ci-selection.d.ts emitted ignored-file warning only.
Scope: changed files.

Command: bun run format:check -- scripts/lib/test-route-registry.mjs scripts/lib/local-ci-selection.mjs scripts/lib/local-ci-selection.d.ts packages/agentplane/src/cli/local-ci-selection.test.ts
Result: pass
Evidence: All matched files use Prettier code style.
Scope: changed files.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230049-AFT9YW-hosted-close-pr-ci-route/.agentplane/tasks/202605230049-AFT9YW/blueprint/resolved-snapshot.json
- old_digest: b60e680a94ea950ea79717c7bb72c674f79fc7840d521627013270eddd9c89c7
- current_digest: b60e680a94ea950ea79717c7bb72c674f79fc7840d521627013270eddd9c89c7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230049-AFT9YW

### 2026-05-23T00:54:27.458Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator check: implementation is scoped to local CI route selection; declared checks passed; no broad fallback remains for isolated hosted-close-pr paths.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T00:53:44.379Z, excerpt_hash=sha256:7b96c3ce07d90a8ca135e13b9564093e00f67bc9c5a8dd49dbe5ae75b74757f2

Details:

Reviewed changed files and verification evidence. The selector regression asserts bucket=hosted-close-pr, reason=hosted_close_pr_paths_only, forks pool, neutral task artifacts stripped from lint targets, and the exact focused test file list. run-local-ci smoke confirmed the route in executable form.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230049-AFT9YW-hosted-close-pr-ci-route/.agentplane/tasks/202605230049-AFT9YW/blueprint/resolved-snapshot.json
- old_digest: b60e680a94ea950ea79717c7bb72c674f79fc7840d521627013270eddd9c89c7
- current_digest: b60e680a94ea950ea79717c7bb72c674f79fc7840d521627013270eddd9c89c7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230049-AFT9YW

### 2026-05-23T01:02:16.822Z — VERIFY — ok

By: CODER

Note: Addressed PR review: hosted-close-pr bucket now matches only hosted-close-pr files, while non-PR hosted-close command paths remain on the generic task route. Re-ran selector tests, route smoke, lint, and format.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T00:54:27.486Z, excerpt_hash=sha256:7b96c3ce07d90a8ca135e13b9564093e00f67bc9c5a8dd49dbe5ae75b74757f2

Details:

Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts
Result: pass
Evidence: 1 file, 54 tests passed, including non-PR hosted-close routing regression.
Scope: selector regression coverage.

Command: node scripts/checks/run-local-ci.mjs --mode fast --changed-files packages/agentplane/src/commands/task/hosted-close-pr.execute.ts --changed-files packages/agentplane/src/commands/task/hosted-close-pr.precheck.ts --changed-files packages/agentplane/src/commands/task/hosted-close-pr.types.ts --changed-files packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts
Result: pass
Evidence: Fast CI selector: targeted (hosted-close-pr); focused 3 files, 11 tests passed.
Scope: real changed-file route.

Command: bun run lint:core -- scripts/lib/test-route-registry.mjs scripts/lib/local-ci-selection.mjs scripts/lib/local-ci-selection.d.ts packages/agentplane/src/cli/local-ci-selection.test.ts
Result: pass
Evidence: no lint errors; local-ci-selection.d.ts emitted ignored-file warning only.
Scope: changed files.

Command: bun run format:check -- scripts/lib/test-route-registry.mjs scripts/lib/local-ci-selection.mjs scripts/lib/local-ci-selection.d.ts packages/agentplane/src/cli/local-ci-selection.test.ts
Result: pass
Evidence: All matched files use Prettier code style.
Scope: changed files.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230049-AFT9YW-hosted-close-pr-ci-route/.agentplane/tasks/202605230049-AFT9YW/blueprint/resolved-snapshot.json
- old_digest: b60e680a94ea950ea79717c7bb72c674f79fc7840d521627013270eddd9c89c7
- current_digest: b60e680a94ea950ea79717c7bb72c674f79fc7840d521627013270eddd9c89c7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230049-AFT9YW

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
