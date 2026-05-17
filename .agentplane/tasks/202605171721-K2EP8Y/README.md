---
id: "202605171721-K2EP8Y"
title: "Fix website dependency PR lockfile drift"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T17:21:27.096Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T17:27:02.570Z"
  updated_by: "CODER"
  note: "Website dependency update verified locally: root frozen Bun install passed, website typecheck passed, website build passed, policy routing passed, and agentplane doctor passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing the approved website dependency lockfile fix in a dedicated branch_pr worktree. Scope is limited to website TypeScript dependency metadata and Bun lockfile unless verification exposes a minimal website compatibility issue."
events:
  -
    type: "status"
    at: "2026-05-17T17:21:42.910Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the approved website dependency lockfile fix in a dedicated branch_pr worktree. Scope is limited to website TypeScript dependency metadata and Bun lockfile unless verification exposes a minimal website compatibility issue."
  -
    type: "verify"
    at: "2026-05-17T17:27:02.570Z"
    author: "CODER"
    state: "ok"
    note: "Website dependency update verified locally: root frozen Bun install passed, website typecheck passed, website build passed, policy routing passed, and agentplane doctor passed."
doc_version: 3
doc_updated_at: "2026-05-17T17:27:02.593Z"
doc_updated_by: "CODER"
description: "Update the website TypeScript dependency with the matching Bun lockfile so duplicate Dependabot website PRs can be superseded and closed."
sections:
  Summary: |-
    Fix website dependency PR lockfile drift

    Update the website TypeScript dependency with the matching Bun lockfile so duplicate Dependabot website PRs can be superseded and closed.
  Scope: |-
    - In scope: Update the website TypeScript dependency with the matching Bun lockfile so duplicate Dependabot website PRs can be superseded and closed.
    - Out of scope: unrelated refactors not required for "Fix website dependency PR lockfile drift".
  Plan: "Scope: replace the duplicate website Dependabot TypeScript PRs with one task-bound update that changes website/package.json and the matching website/bun.lock only, unless verification proves a minimal website compatibility fix is required. Steps: 1. start a branch_pr worktree as CODER; 2. update website TypeScript to 6.0.3 and regenerate the Bun lockfile; 3. run the task verify contract plus website-focused install/build/type checks and routing/doctor checks; 4. open and merge one task PR through the branch_pr route; 5. close PR #3800 and #3811 as superseded after the task PR lands. Re-approval triggers: touching non-website source beyond minimal compatibility fixes, adding/removing dependencies unrelated to TypeScript, or skipping required checks."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T17:27:02.570Z — VERIFY — ok

    By: CODER

    Note: Website dependency update verified locally: root frozen Bun install passed, website typecheck passed, website build passed, policy routing passed, and agentplane doctor passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:21:42.910Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171721-K2EP8Y-website-dependency-lockfile/.agentplane/tasks/202605171721-K2EP8Y/blueprint/resolved-snapshot.json
    - old_digest: b751282785e0a365d5a9f160486543b7096e4a4d897882f217343fb4f1e1c16f
    - current_digest: b751282785e0a365d5a9f160486543b7096e4a4d897882f217343fb4f1e1c16f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171721-K2EP8Y

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun install --frozen-lockfile --ignore-scripts. Result: pass. Evidence: Checked 1648 installs across 1837 packages with no changes. Scope: root workspace lockfile consistency for CI. Command: bun run typecheck in website. Result: pass after explicit React typings and TypeScript 6 deprecation config. Scope: website TS compilation. Command: bun run build in website. Result: pass; generated static files in build. Scope: Docusaurus production build. Command: node .agentplane/policy/check-routing.mjs. Result: pass; policy routing OK. Scope: policy routing. Command: ap doctor. Result: pass; doctor OK with zero errors/warnings.
      Impact: Supersedes duplicate website Dependabot PRs #3800 and #3811 by carrying the TypeScript 6.0.3 update with the required Bun lockfile and minimal TypeScript config compatibility fixes.
      Resolution: Open one task PR from task/202605171721-K2EP8Y/website-dependency-lockfile, merge it after hosted checks, then close #3800 and #3811 as superseded.
id_source: "generated"
---
## Summary

Fix website dependency PR lockfile drift

Update the website TypeScript dependency with the matching Bun lockfile so duplicate Dependabot website PRs can be superseded and closed.

## Scope

- In scope: Update the website TypeScript dependency with the matching Bun lockfile so duplicate Dependabot website PRs can be superseded and closed.
- Out of scope: unrelated refactors not required for "Fix website dependency PR lockfile drift".

## Plan

Scope: replace the duplicate website Dependabot TypeScript PRs with one task-bound update that changes website/package.json and the matching website/bun.lock only, unless verification proves a minimal website compatibility fix is required. Steps: 1. start a branch_pr worktree as CODER; 2. update website TypeScript to 6.0.3 and regenerate the Bun lockfile; 3. run the task verify contract plus website-focused install/build/type checks and routing/doctor checks; 4. open and merge one task PR through the branch_pr route; 5. close PR #3800 and #3811 as superseded after the task PR lands. Re-approval triggers: touching non-website source beyond minimal compatibility fixes, adding/removing dependencies unrelated to TypeScript, or skipping required checks.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T17:27:02.570Z — VERIFY — ok

By: CODER

Note: Website dependency update verified locally: root frozen Bun install passed, website typecheck passed, website build passed, policy routing passed, and agentplane doctor passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:21:42.910Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171721-K2EP8Y-website-dependency-lockfile/.agentplane/tasks/202605171721-K2EP8Y/blueprint/resolved-snapshot.json
- old_digest: b751282785e0a365d5a9f160486543b7096e4a4d897882f217343fb4f1e1c16f
- current_digest: b751282785e0a365d5a9f160486543b7096e4a4d897882f217343fb4f1e1c16f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171721-K2EP8Y

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun install --frozen-lockfile --ignore-scripts. Result: pass. Evidence: Checked 1648 installs across 1837 packages with no changes. Scope: root workspace lockfile consistency for CI. Command: bun run typecheck in website. Result: pass after explicit React typings and TypeScript 6 deprecation config. Scope: website TS compilation. Command: bun run build in website. Result: pass; generated static files in build. Scope: Docusaurus production build. Command: node .agentplane/policy/check-routing.mjs. Result: pass; policy routing OK. Scope: policy routing. Command: ap doctor. Result: pass; doctor OK with zero errors/warnings.
  Impact: Supersedes duplicate website Dependabot PRs #3800 and #3811 by carrying the TypeScript 6.0.3 update with the required Bun lockfile and minimal TypeScript config compatibility fixes.
  Resolution: Open one task PR from task/202605171721-K2EP8Y/website-dependency-lockfile, merge it after hosted checks, then close #3800 and #3811 as superseded.
