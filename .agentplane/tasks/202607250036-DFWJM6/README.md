---
id: "202607250036-DFWJM6"
title: "Publish rebased PR branches with an explicit force-with-lease"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "publication"
  - "v0.7/reliability"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
  - "publish"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest run packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/commands/pr/internal/sync-github.test.ts"
  - "bun run typecheck"
  - "bun run lint:core"
  - "bun run hotspots:check"
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T00:36:53.216Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement a narrow explicit force-with-lease publication path for existing matching open PRs, with regression coverage for mismatches and remote races."
events:
  -
    type: "status"
    at: "2026-07-25T00:37:21.033Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement a narrow explicit force-with-lease publication path for existing matching open PRs, with regression coverage for mismatches and remote races."
doc_version: 3
doc_updated_at: "2026-07-25T01:00:05.994Z"
doc_updated_by: "CODER"
description: "Harden ap pr open so an existing matching open PR can publish a locally rebased task branch only with an explicit ref-scoped force-with-lease bound to the observed remote head, while preserving wrong-branch, wrong-upstream, and remote-race safety."
sections:
  Summary: |-
    Publish rebased PR branches with an explicit force-with-lease

    Harden ap pr open so an existing matching open PR can publish a locally rebased task branch only with an explicit ref-scoped force-with-lease bound to the observed remote head, while preserving wrong-branch, wrong-upstream, and remote-race safety.
  Scope: |-
    - In scope: Harden ap pr open so an existing matching open PR can publish a locally rebased task branch only with an explicit ref-scoped force-with-lease bound to the observed remote head, while preserving wrong-branch, wrong-upstream, and remote-race safety.
    - Out of scope: unrelated refactors not required for "Publish rebased PR branches with an explicit force-with-lease".
  Plan: |-
    1. Reproduce the existing-open-PR non-fast-forward publication route without touching RF08.
    2. Add a narrow decision that authorizes only ref-scoped --force-with-lease=<remote-ref>:<observed-head> when the open PR head exactly matches the local task branch and the observed upstream is stale.
    3. Preserve fail-closed behavior for missing/mismatched PR metadata, wrong upstream/branch, and remote races.
    4. Add focused regression tests for success and all safety refusals; run focused tests, typecheck, lint, lifecycle guards, and task verification.
    5. Commit with DCO and leave the task branch unintegrated for parent review.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/commands/pr/internal/sync-github.test.ts`. Expected: the rebased open-PR branch is updated only with an exact ref-scoped lease bound to the same GitHub repository; wrong upstream/current branch, mismatched repository/head, closed or missing PR, and a remote race remain fail-closed; existing first-publish behavior remains green.
    2. Run `bun run typecheck`. Expected: all TypeScript packages compile without errors.
    3. Run `bun run lint:core`. Expected: repository core lint passes without new findings; the unrelated website lint baseline is reported separately.
    4. Run `bun run hotspots:check`. Expected: the extracted publication module and focused regression suite stay within repository size budgets.
    5. Run `agentplane task lint --verify-steps-changed`. Expected: task documentation and acceptance coverage pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - The fallback runs only after a normal task-branch push fails and requires the current branch plus exact `origin/<branch>` upstream.
    - Force publication is authorized only when origin fetch/push URLs resolve to one identical canonical GitHub repository, the linked PR number is OPEN for the exact branch/base, and the provider head equals the observed remote head. The push uses only `--force-with-lease=refs/heads/<branch>:<observed-head>`.
    - Wrong upstream/current branch, mismatched repository/head, closed or missing PR, and a remote race are covered by explicit fail-closed regression tests.
    - Independent safety re-review verdict: PASS with no remaining findings.
    - Full `bun run lint` remains red on unchanged `website/scripts/generate-social-images.mjs:207` (`unicorn/prefer-string-replace-all`); `bun run lint:core` and targeted ESLint pass. This task does not widen into website cleanup.
id_source: "generated"
---
## Summary

Publish rebased PR branches with an explicit force-with-lease

Harden ap pr open so an existing matching open PR can publish a locally rebased task branch only with an explicit ref-scoped force-with-lease bound to the observed remote head, while preserving wrong-branch, wrong-upstream, and remote-race safety.

## Scope

- In scope: Harden ap pr open so an existing matching open PR can publish a locally rebased task branch only with an explicit ref-scoped force-with-lease bound to the observed remote head, while preserving wrong-branch, wrong-upstream, and remote-race safety.
- Out of scope: unrelated refactors not required for "Publish rebased PR branches with an explicit force-with-lease".

## Plan

1. Reproduce the existing-open-PR non-fast-forward publication route without touching RF08.
2. Add a narrow decision that authorizes only ref-scoped --force-with-lease=<remote-ref>:<observed-head> when the open PR head exactly matches the local task branch and the observed upstream is stale.
3. Preserve fail-closed behavior for missing/mismatched PR metadata, wrong upstream/branch, and remote races.
4. Add focused regression tests for success and all safety refusals; run focused tests, typecheck, lint, lifecycle guards, and task verification.
5. Commit with DCO and leave the task branch unintegrated for parent review.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/commands/pr/internal/sync-github.test.ts`. Expected: the rebased open-PR branch is updated only with an exact ref-scoped lease bound to the same GitHub repository; wrong upstream/current branch, mismatched repository/head, closed or missing PR, and a remote race remain fail-closed; existing first-publish behavior remains green.
2. Run `bun run typecheck`. Expected: all TypeScript packages compile without errors.
3. Run `bun run lint:core`. Expected: repository core lint passes without new findings; the unrelated website lint baseline is reported separately.
4. Run `bun run hotspots:check`. Expected: the extracted publication module and focused regression suite stay within repository size budgets.
5. Run `agentplane task lint --verify-steps-changed`. Expected: task documentation and acceptance coverage pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- The fallback runs only after a normal task-branch push fails and requires the current branch plus exact `origin/<branch>` upstream.
- Force publication is authorized only when origin fetch/push URLs resolve to one identical canonical GitHub repository, the linked PR number is OPEN for the exact branch/base, and the provider head equals the observed remote head. The push uses only `--force-with-lease=refs/heads/<branch>:<observed-head>`.
- Wrong upstream/current branch, mismatched repository/head, closed or missing PR, and a remote race are covered by explicit fail-closed regression tests.
- Independent safety re-review verdict: PASS with no remaining findings.
- Full `bun run lint` remains red on unchanged `website/scripts/generate-social-images.mjs:207` (`unicorn/prefer-string-replace-all`); `bun run lint:core` and targeted ESLint pass. This task does not widen into website cleanup.
