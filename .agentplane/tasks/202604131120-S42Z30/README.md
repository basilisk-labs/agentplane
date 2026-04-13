---
id: "202604131120-S42Z30"
title: "Format release hardening files blocked by pre-push"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-13T11:20:37.230Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-13T11:22:42.468Z"
  updated_by: "CODER"
  note: "Pre-push formatting blockers were rewritten and format:check now passes."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: format the three files currently failing pre-push, verify format:check passes, then hand the cleanup back to base for final push."
events:
  -
    type: "status"
    at: "2026-04-13T11:21:14.160Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: format the three files currently failing pre-push, verify format:check passes, then hand the cleanup back to base for final push."
  -
    type: "verify"
    at: "2026-04-13T11:22:42.468Z"
    author: "CODER"
    state: "ok"
    note: "Pre-push formatting blockers were rewritten and format:check now passes."
doc_version: 3
doc_updated_at: "2026-04-13T11:22:42.494Z"
doc_updated_by: "CODER"
description: "Apply required Prettier formatting to the release-hardening files that currently block git push origin main after the branch_pr reconciliation fixes."
sections:
  Summary: |-
    Format release hardening files blocked by pre-push
    
    Apply required Prettier formatting to the release-hardening files that currently block git push origin main after the branch_pr reconciliation fixes.
  Scope: |-
    - In scope: Apply required Prettier formatting to the release-hardening files that currently block git push origin main after the branch_pr reconciliation fixes.
    - Out of scope: unrelated refactors not required for "Format release hardening files blocked by pre-push".
  Plan: "1. Format only the files currently blocking pre-push on main. 2. Verify the formatter gate passes locally. 3. Integrate the formatting-only task and repeat git push origin main."
  Verify Steps: |-
    1. Review the requested outcome for "Format release hardening files blocked by pre-push". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-13T11:22:42.468Z — VERIFY — ok
    
    By: CODER
    
    Note: Pre-push formatting blockers were rewritten and format:check now passes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T11:21:14.173Z, excerpt_hash=sha256:689c262fa7c7b641654a3e41b08f268adaff58f725b05aff3c4cb4fc3992156d
    
    Details:
    
    Validated with: bunx prettier packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts --write; bun run format:check
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Format release hardening files blocked by pre-push

Apply required Prettier formatting to the release-hardening files that currently block git push origin main after the branch_pr reconciliation fixes.

## Scope

- In scope: Apply required Prettier formatting to the release-hardening files that currently block git push origin main after the branch_pr reconciliation fixes.
- Out of scope: unrelated refactors not required for "Format release hardening files blocked by pre-push".

## Plan

1. Format only the files currently blocking pre-push on main. 2. Verify the formatter gate passes locally. 3. Integrate the formatting-only task and repeat git push origin main.

## Verify Steps

1. Review the requested outcome for "Format release hardening files blocked by pre-push". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-13T11:22:42.468Z — VERIFY — ok

By: CODER

Note: Pre-push formatting blockers were rewritten and format:check now passes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T11:21:14.173Z, excerpt_hash=sha256:689c262fa7c7b641654a3e41b08f268adaff58f725b05aff3c4cb4fc3992156d

Details:

Validated with: bunx prettier packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts --write; bun run format:check

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
