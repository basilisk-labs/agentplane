---
id: "202605171014-MS20TE"
title: "Fix residual CodeQL guardrail alerts"
result_summary: "Merged via PR #3817."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "codeql"
  - "security"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T10:14:49.402Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T10:15:54.078Z"
  updated_by: "CODER"
  note: "Local implementation checks passed: focused tests 72 pass / 0 fail, changed-file eslint passed, core typecheck passed. Hosted CodeQL still requires PR verification."
  attempts: 0
commit:
  hash: "ad1b402eca9d7bdd0a4c37042da4dbb055c328ea"
  message: "Merge pull request #3817 from basilisk-labs/task/202605171014-MS20TE/codeql-real-guardrails"
comments:
  -
    author: "CODER"
    body: "Start: implement residual CodeQL guardrail fixes after reopened alerts #5-#17; verify with focused tests, eslint, PR CodeQL, and main Code scanning."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3817 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-17T10:14:57.357Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement residual CodeQL guardrail fixes after reopened alerts #5-#17; verify with focused tests, eslint, PR CodeQL, and main Code scanning."
  -
    type: "verify"
    at: "2026-05-17T10:15:54.078Z"
    author: "CODER"
    state: "ok"
    note: "Local implementation checks passed: focused tests 72 pass / 0 fail, changed-file eslint passed, core typecheck passed. Hosted CodeQL still requires PR verification."
  -
    type: "status"
    at: "2026-05-17T12:03:20.556Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3817 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-17T12:03:20.560Z"
doc_updated_by: "INTEGRATOR"
description: "Replace residual CodeQL dismissals with code-level guardrails for process execution, git refs/pathspecs, commit metadata, and dotted config writes."
sections:
  Summary: |-
    Fix residual CodeQL guardrail alerts

    Replace residual CodeQL dismissals with code-level guardrails for process execution, git refs/pathspecs, commit metadata, and dotted config writes.
  Scope: |-
    - In scope: Replace residual CodeQL dismissals with code-level guardrails for process execution, git refs/pathspecs, commit metadata, and dotted config writes.
    - Out of scope: unrelated refactors not required for "Fix residual CodeQL guardrail alerts".
  Plan: |-
    1. Replace residual CodeQL dismissals with code-level guardrails for internal process execution and git object/diff helpers.
    2. Encode CodeQL recommendations as tests: executable allowlist, repo-relative git paths, own-property config writes, and composite-revision-free diff behavior.
    3. Remove ineffective CodeQL suppression comments, run focused tests and eslint, then publish a PR and verify Code scanning before merge.
  Verify Steps: |-
    1. Run focused tests for changed process/config/git/task-backend behavior. Expected: all tests pass.
    2. Run eslint on changed TypeScript implementation and tests. Expected: no lint errors.
    3. Run core typecheck. Expected: no type errors.
    4. Verify PR CodeQL and GitHub Code scanning for reopened #5-#17. Expected: no remaining open alerts for the fixed paths.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - 2026-05-17: `bun test packages/core/src/process/run-process.test.ts packages/core/src/config/config.test.ts packages/core/src/git/git-diff.test.ts packages/core/src/git/git-client.test.ts packages/core/src/commit/commit-policy.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts` passed: 72 pass, 0 fail.
    - 2026-05-17: `bunx eslint packages/core/src/process/run-process.ts packages/core/src/process/run-process.test.ts packages/core/src/config/defaults.ts packages/core/src/config/config.test.ts packages/core/src/git/git-client.ts packages/core/src/git/git-client.test.ts packages/core/src/git/git-diff.ts packages/core/src/git/git-diff.test.ts packages/core/src/commit/commit-policy.ts packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts` passed.
    - 2026-05-17: `bun run --filter=@agentplaneorg/core typecheck` passed.

    ### 2026-05-17T10:15:54.078Z — VERIFY — ok

    By: CODER

    Note: Local implementation checks passed: focused tests 72 pass / 0 fail, changed-file eslint passed, core typecheck passed. Hosted CodeQL still requires PR verification.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T10:14:57.357Z, excerpt_hash=sha256:72283f6ec16af625e90710a1644761c6cce3493e74884732e2da145aa8f0b3de

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/codex-codeql-residual-fixes/.agentplane/tasks/202605171014-MS20TE/blueprint/resolved-snapshot.json
    - old_digest: 78f86ab4e8a2f7612648ea3234aab307cb774742c9967908d27663e462dad0ac
    - current_digest: 78f86ab4e8a2f7612648ea3234aab307cb774742c9967908d27663e462dad0ac
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171014-MS20TE

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix residual CodeQL guardrail alerts

Replace residual CodeQL dismissals with code-level guardrails for process execution, git refs/pathspecs, commit metadata, and dotted config writes.

## Scope

- In scope: Replace residual CodeQL dismissals with code-level guardrails for process execution, git refs/pathspecs, commit metadata, and dotted config writes.
- Out of scope: unrelated refactors not required for "Fix residual CodeQL guardrail alerts".

## Plan

1. Replace residual CodeQL dismissals with code-level guardrails for internal process execution and git object/diff helpers.
2. Encode CodeQL recommendations as tests: executable allowlist, repo-relative git paths, own-property config writes, and composite-revision-free diff behavior.
3. Remove ineffective CodeQL suppression comments, run focused tests and eslint, then publish a PR and verify Code scanning before merge.

## Verify Steps

1. Run focused tests for changed process/config/git/task-backend behavior. Expected: all tests pass.
2. Run eslint on changed TypeScript implementation and tests. Expected: no lint errors.
3. Run core typecheck. Expected: no type errors.
4. Verify PR CodeQL and GitHub Code scanning for reopened #5-#17. Expected: no remaining open alerts for the fixed paths.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- 2026-05-17: `bun test packages/core/src/process/run-process.test.ts packages/core/src/config/config.test.ts packages/core/src/git/git-diff.test.ts packages/core/src/git/git-client.test.ts packages/core/src/commit/commit-policy.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts` passed: 72 pass, 0 fail.
- 2026-05-17: `bunx eslint packages/core/src/process/run-process.ts packages/core/src/process/run-process.test.ts packages/core/src/config/defaults.ts packages/core/src/config/config.test.ts packages/core/src/git/git-client.ts packages/core/src/git/git-client.test.ts packages/core/src/git/git-diff.ts packages/core/src/git/git-diff.test.ts packages/core/src/commit/commit-policy.ts packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts` passed.
- 2026-05-17: `bun run --filter=@agentplaneorg/core typecheck` passed.

### 2026-05-17T10:15:54.078Z — VERIFY — ok

By: CODER

Note: Local implementation checks passed: focused tests 72 pass / 0 fail, changed-file eslint passed, core typecheck passed. Hosted CodeQL still requires PR verification.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T10:14:57.357Z, excerpt_hash=sha256:72283f6ec16af625e90710a1644761c6cce3493e74884732e2da145aa8f0b3de

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/codex-codeql-residual-fixes/.agentplane/tasks/202605171014-MS20TE/blueprint/resolved-snapshot.json
- old_digest: 78f86ab4e8a2f7612648ea3234aab307cb774742c9967908d27663e462dad0ac
- current_digest: 78f86ab4e8a2f7612648ea3234aab307cb774742c9967908d27663e462dad0ac
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171014-MS20TE

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
