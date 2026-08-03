---
id: "202608031303-B5Q5NM"
title: "Ignore AgentPlane runtime tmp artifacts by default"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "issue-4663"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T13:04:19.850Z"
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
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-03T13:04:59.683Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-03T13:04:59.683Z"
doc_updated_by: "CODER"
description: "Fix GitHub issue #4663 by adding .agentplane/tmp to the canonical runtime gitignore contract without overwriting user rules, and add init plus migration regression coverage proving the entry is idempotent."
sections:
  Summary: |-
    Ignore AgentPlane runtime tmp artifacts by default

    Fix GitHub issue #4663 by adding .agentplane/tmp to the canonical runtime gitignore contract without overwriting user rules, and add init plus migration regression coverage proving the entry is idempotent.
  Scope: |-
    - In scope: Fix GitHub issue #4663 by adding .agentplane/tmp to the canonical runtime gitignore contract without overwriting user rules, and add init plus migration regression coverage proving the entry is idempotent.
    - Out of scope: unrelated refactors not required for "Ignore AgentPlane runtime tmp artifacts by default".
  Plan: "Add .agentplane/tmp to the single canonical runtime gitignore line set; preserve existing user entries and ordering guarantees; cover fresh init, repeated init, and upgrade or repair paths that materialize runtime ignores; keep the change limited to runtime artifact policy and focused tests; record issue #4663 evidence and close the issue only after the fix is merged."
  Verify Steps: |-
    1. Run bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.test.ts. Expected: fresh and repeated init pass and .agentplane/tmp is asserted in .gitignore.
    2. Run the focused runtime-artifact and upgrade tests selected from the touched modules. Expected: user-authored ignore lines remain intact and canonical entries are idempotent.
    3. Run git diff --check and the targeted TypeScript or lint check for touched files. Expected: no formatting, type, or lint regression.
    4. Inspect a temporary initialized repository. Expected: git status does not report files under .agentplane/tmp after AgentPlane creates runtime scratch data.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "cad13d5568828c967497a5610fd7a4daeda7528e"
    version: 1
id_source: "generated"
---
## Summary

Ignore AgentPlane runtime tmp artifacts by default

Fix GitHub issue #4663 by adding .agentplane/tmp to the canonical runtime gitignore contract without overwriting user rules, and add init plus migration regression coverage proving the entry is idempotent.

## Scope

- In scope: Fix GitHub issue #4663 by adding .agentplane/tmp to the canonical runtime gitignore contract without overwriting user rules, and add init plus migration regression coverage proving the entry is idempotent.
- Out of scope: unrelated refactors not required for "Ignore AgentPlane runtime tmp artifacts by default".

## Plan

Add .agentplane/tmp to the single canonical runtime gitignore line set; preserve existing user entries and ordering guarantees; cover fresh init, repeated init, and upgrade or repair paths that materialize runtime ignores; keep the change limited to runtime artifact policy and focused tests; record issue #4663 evidence and close the issue only after the fix is merged.

## Verify Steps

1. Run bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.test.ts. Expected: fresh and repeated init pass and .agentplane/tmp is asserted in .gitignore.
2. Run the focused runtime-artifact and upgrade tests selected from the touched modules. Expected: user-authored ignore lines remain intact and canonical entries are idempotent.
3. Run git diff --check and the targeted TypeScript or lint check for touched files. Expected: no formatting, type, or lint regression.
4. Inspect a temporary initialized repository. Expected: git status does not report files under .agentplane/tmp after AgentPlane creates runtime scratch data.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
