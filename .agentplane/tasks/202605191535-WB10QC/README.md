---
id: "202605191535-WB10QC"
title: "Make local test routing more flexible and observable"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T15:37:01.844Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T16:42:27.423Z"
  updated_by: "EVALUATOR"
  note: "Evaluator gate pass: local verification and hosted PR checks are green on head a46645a20944fd4d235ff12a928f54fbc5ece723."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-19T16:42:27.423Z"
  updated_by: "EVALUATOR"
  note: "Evaluator gate pass: local verification and hosted PR checks are green on head a46645a20944fd4d235ff12a928f54fbc5ece723."
  evaluated_sha: "a46645a20944fd4d235ff12a928f54fbc5ece723"
  blueprint_digest: "1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847"
  evidence_refs:
    - ".agentplane/tasks/202605191535-WB10QC/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191535-WB10QC-flexible-test-routing/.agentplane/tasks/202605191535-WB10QC/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing explainable local CI routing and registry-aligned targeted test reporting in the dedicated branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-19T15:43:23.766Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing explainable local CI routing and registry-aligned targeted test reporting in the dedicated branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-19T15:50:59.907Z"
    author: "CODER"
    state: "ok"
    note: "Implemented explainable local CI routing and verified targeted selector/report behavior."
  -
    type: "verify"
    at: "2026-05-19T15:53:25.712Z"
    author: "CODER"
    state: "ok"
    note: "Revalidated local CI route explainability after implementation and PR artifact commits."
  -
    type: "verify"
    at: "2026-05-19T15:58:21.237Z"
    author: "CODER"
    state: "ok"
    note: "Verified generated scripts inventory after adding local CI package scripts."
  -
    type: "verify"
    at: "2026-05-19T16:42:27.423Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator gate pass: local verification and hosted PR checks are green on head a46645a20944fd4d235ff12a928f54fbc5ece723."
doc_version: 3
doc_updated_at: "2026-05-19T16:42:27.442Z"
doc_updated_by: "CODER"
description: "Improve the local quality/test routing loop by adding an explainable local CI selector/report path and reducing registry drift for targeted test runs."
sections:
  Summary: |-
    Make local test routing more flexible and observable

    Improve the local quality/test routing loop by adding an explainable local CI selector/report path and reducing registry drift for targeted test runs.
  Scope: |-
    - In scope: Improve the local quality/test routing loop by adding an explainable local CI selector/report path and reducing registry drift for targeted test runs.
    - Out of scope: unrelated refactors not required for "Make local test routing more flexible and observable".
  Plan: |-
    1. Implement the change for "Make local test routing more flexible and observable".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. `bun run vitest:projects:check`
    2. `bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts`
    3. `node scripts/checks/run-local-ci.mjs --mode smoke --explain --changed-files packages/agentplane/src/commands/task/new.ts`
    4. `node scripts/checks/dev-impact.mjs --json`
    5. `git diff --check`
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T15:50:59.907Z — VERIFY — ok

    By: CODER

    Note: Implemented explainable local CI routing and verified targeted selector/report behavior.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:43:23.766Z, excerpt_hash=sha256:65e592fda16cab5404202de800bd05c6dac194554c7eebf9570d7bc8781b9efd

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191535-WB10QC-flexible-test-routing/.agentplane/tasks/202605191535-WB10QC/blueprint/resolved-snapshot.json
    - old_digest: 1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847
    - current_digest: 1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191535-WB10QC

    ### 2026-05-19T15:53:25.712Z — VERIFY — ok

    By: CODER

    Note: Revalidated local CI route explainability after implementation and PR artifact commits.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:50:59.961Z, excerpt_hash=sha256:65e592fda16cab5404202de800bd05c6dac194554c7eebf9570d7bc8781b9efd

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191535-WB10QC-flexible-test-routing/.agentplane/tasks/202605191535-WB10QC/blueprint/resolved-snapshot.json
    - old_digest: 1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847
    - current_digest: 1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191535-WB10QC

    ### 2026-05-19T15:58:21.237Z — VERIFY — ok

    By: CODER

    Note: Verified generated scripts inventory after adding local CI package scripts.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:53:25.769Z, excerpt_hash=sha256:65e592fda16cab5404202de800bd05c6dac194554c7eebf9570d7bc8781b9efd

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191535-WB10QC-flexible-test-routing/.agentplane/tasks/202605191535-WB10QC/blueprint/resolved-snapshot.json
    - old_digest: 1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847
    - current_digest: 1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191535-WB10QC

    ### 2026-05-19T16:42:27.423Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator gate pass: local verification and hosted PR checks are green on head a46645a20944fd4d235ff12a928f54fbc5ece723.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:58:21.312Z, excerpt_hash=sha256:65e592fda16cab5404202de800bd05c6dac194554c7eebf9570d7bc8781b9efd

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191535-WB10QC-flexible-test-routing/.agentplane/tasks/202605191535-WB10QC/blueprint/resolved-snapshot.json
    - old_digest: 1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847
    - current_digest: 1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191535-WB10QC

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun run vitest:projects:check | Result: pass | Evidence: test routing OK (414 tests, 10 primary routes) | Scope: Vitest route registry integrity. Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts | Result: pass | Evidence: 2 files, 53 tests passed | Scope: local CI selector and release script contract. Command: node scripts/checks/run-local-ci.mjs --mode smoke --explain --changed-files packages/agentplane/src/commands/task/new.ts | Result: pass | Evidence: targeted-smoke route with task bucket lint/test plan | Scope: explain output. Command: node scripts/checks/dev-impact.mjs --json | Result: pass | Evidence: broad_or_infra_sensitive_change for current mixed task/script/package diff | Scope: impact report. Command: git diff --check | Result: pass | Evidence: no whitespace errors | Scope: changed diff.
      Impact: Developers and agents can inspect the local CI route without running checks, pass changed files directly without env setup, and use ci:local:touch/explain aliases for faster feedback.
      Resolution: Added buildLocalCiExecutionPlan, run-local-ci --explain/--json/--changed-files, package aliases, and regression coverage.

    - Observation: Command: bun run vitest:projects:check | Result: pass | Evidence: test routing OK (414 tests, 10 primary routes) | Scope: Vitest route registry. Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts | Result: pass | Evidence: 2 test files, 53 tests passed | Scope: selector/report and package script contracts. Command: node scripts/checks/run-local-ci.mjs --mode smoke --explain --changed-files packages/agentplane/src/commands/task/new.ts | Result: pass | Evidence: targeted-smoke task route with concrete lint/test plan | Scope: dry explain CLI. Command: bunx eslint scripts/lib/local-ci-selection.mjs scripts/checks/run-local-ci.mjs packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts | Result: pass | Evidence: no lint output | Scope: changed JS/TS files. Command: git diff --check | Result: pass | Evidence: no whitespace errors | Scope: final diff.
      Impact: The PR branch now has current verification evidence tied to the implementation branch state.
      Resolution: Recorded verification after PR artifact creation and before final task-artifact commit.

    - Observation: Command: bun run docs:scripts:check | Result: pass | Evidence: ok: scripts/README.md is up to date | Scope: generated scripts inventory for new ci:local aliases.
      Impact: scripts/README.md is synchronized with package.json before push.
      Resolution: Regenerated scripts/README.md and recorded the docs freshness check.

    - Observation: Command: gh pr view 3940 --json statusCheckRollup,headRefOid | Result: pass | Evidence: PR head a46645a20944fd4d235ff12a928f54fbc5ece723; Core CI test/test-windows, Docs CI docs, CodeQL, dependency review, and Release-ready manifest completed successfully; recovery-validate skipped by workflow condition. Scope: hosted branch protection checks for PR #3940.
      Impact: Task branch is ready for merge lane; remaining BLOCKED state is review/protection policy, not failing tests.
      Resolution: Proceed through GitHub PR merge route authorized by the user.
id_source: "generated"
---
## Summary

Make local test routing more flexible and observable

Improve the local quality/test routing loop by adding an explainable local CI selector/report path and reducing registry drift for targeted test runs.

## Scope

- In scope: Improve the local quality/test routing loop by adding an explainable local CI selector/report path and reducing registry drift for targeted test runs.
- Out of scope: unrelated refactors not required for "Make local test routing more flexible and observable".

## Plan

1. Implement the change for "Make local test routing more flexible and observable".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. `bun run vitest:projects:check`
2. `bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts`
3. `node scripts/checks/run-local-ci.mjs --mode smoke --explain --changed-files packages/agentplane/src/commands/task/new.ts`
4. `node scripts/checks/dev-impact.mjs --json`
5. `git diff --check`

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T15:50:59.907Z — VERIFY — ok

By: CODER

Note: Implemented explainable local CI routing and verified targeted selector/report behavior.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:43:23.766Z, excerpt_hash=sha256:65e592fda16cab5404202de800bd05c6dac194554c7eebf9570d7bc8781b9efd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191535-WB10QC-flexible-test-routing/.agentplane/tasks/202605191535-WB10QC/blueprint/resolved-snapshot.json
- old_digest: 1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847
- current_digest: 1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191535-WB10QC

### 2026-05-19T15:53:25.712Z — VERIFY — ok

By: CODER

Note: Revalidated local CI route explainability after implementation and PR artifact commits.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:50:59.961Z, excerpt_hash=sha256:65e592fda16cab5404202de800bd05c6dac194554c7eebf9570d7bc8781b9efd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191535-WB10QC-flexible-test-routing/.agentplane/tasks/202605191535-WB10QC/blueprint/resolved-snapshot.json
- old_digest: 1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847
- current_digest: 1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191535-WB10QC

### 2026-05-19T15:58:21.237Z — VERIFY — ok

By: CODER

Note: Verified generated scripts inventory after adding local CI package scripts.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:53:25.769Z, excerpt_hash=sha256:65e592fda16cab5404202de800bd05c6dac194554c7eebf9570d7bc8781b9efd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191535-WB10QC-flexible-test-routing/.agentplane/tasks/202605191535-WB10QC/blueprint/resolved-snapshot.json
- old_digest: 1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847
- current_digest: 1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191535-WB10QC

### 2026-05-19T16:42:27.423Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator gate pass: local verification and hosted PR checks are green on head a46645a20944fd4d235ff12a928f54fbc5ece723.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:58:21.312Z, excerpt_hash=sha256:65e592fda16cab5404202de800bd05c6dac194554c7eebf9570d7bc8781b9efd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191535-WB10QC-flexible-test-routing/.agentplane/tasks/202605191535-WB10QC/blueprint/resolved-snapshot.json
- old_digest: 1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847
- current_digest: 1ff36f9c31cac286789eb9dced252ac7af8d587523ee2a08b24500e59ebdf847
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191535-WB10QC

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun run vitest:projects:check | Result: pass | Evidence: test routing OK (414 tests, 10 primary routes) | Scope: Vitest route registry integrity. Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts | Result: pass | Evidence: 2 files, 53 tests passed | Scope: local CI selector and release script contract. Command: node scripts/checks/run-local-ci.mjs --mode smoke --explain --changed-files packages/agentplane/src/commands/task/new.ts | Result: pass | Evidence: targeted-smoke route with task bucket lint/test plan | Scope: explain output. Command: node scripts/checks/dev-impact.mjs --json | Result: pass | Evidence: broad_or_infra_sensitive_change for current mixed task/script/package diff | Scope: impact report. Command: git diff --check | Result: pass | Evidence: no whitespace errors | Scope: changed diff.
  Impact: Developers and agents can inspect the local CI route without running checks, pass changed files directly without env setup, and use ci:local:touch/explain aliases for faster feedback.
  Resolution: Added buildLocalCiExecutionPlan, run-local-ci --explain/--json/--changed-files, package aliases, and regression coverage.

- Observation: Command: bun run vitest:projects:check | Result: pass | Evidence: test routing OK (414 tests, 10 primary routes) | Scope: Vitest route registry. Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts | Result: pass | Evidence: 2 test files, 53 tests passed | Scope: selector/report and package script contracts. Command: node scripts/checks/run-local-ci.mjs --mode smoke --explain --changed-files packages/agentplane/src/commands/task/new.ts | Result: pass | Evidence: targeted-smoke task route with concrete lint/test plan | Scope: dry explain CLI. Command: bunx eslint scripts/lib/local-ci-selection.mjs scripts/checks/run-local-ci.mjs packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts | Result: pass | Evidence: no lint output | Scope: changed JS/TS files. Command: git diff --check | Result: pass | Evidence: no whitespace errors | Scope: final diff.
  Impact: The PR branch now has current verification evidence tied to the implementation branch state.
  Resolution: Recorded verification after PR artifact creation and before final task-artifact commit.

- Observation: Command: bun run docs:scripts:check | Result: pass | Evidence: ok: scripts/README.md is up to date | Scope: generated scripts inventory for new ci:local aliases.
  Impact: scripts/README.md is synchronized with package.json before push.
  Resolution: Regenerated scripts/README.md and recorded the docs freshness check.

- Observation: Command: gh pr view 3940 --json statusCheckRollup,headRefOid | Result: pass | Evidence: PR head a46645a20944fd4d235ff12a928f54fbc5ece723; Core CI test/test-windows, Docs CI docs, CodeQL, dependency review, and Release-ready manifest completed successfully; recovery-validate skipped by workflow condition. Scope: hosted branch protection checks for PR #3940.
  Impact: Task branch is ready for merge lane; remaining BLOCKED state is review/protection policy, not failing tests.
  Resolution: Proceed through GitHub PR merge route authorized by the user.
