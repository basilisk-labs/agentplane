---
id: "202604091258-XKAYP1"
title: "Reduce pr open artifact churn after remote PR linkage"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "ux"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T12:58:53.608Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T14:20:35.833Z"
  updated_by: "CODER"
  note: "Rebased onto main after 75VJ4R removed the shared wait-remote-checks blocker and reran targeted wait-remote/pr-flow coverage for the pr open artifact-churn path."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Reduce pr open metadata churn so GitHub PR linkage updates avoid rewriting stable review and body artifacts."
events:
  -
    type: "status"
    at: "2026-04-09T13:10:49.000Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Reduce pr open metadata churn so GitHub PR linkage updates avoid rewriting stable review and body artifacts."
  -
    type: "verify"
    at: "2026-04-09T13:12:58.480Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t \"pr open keeps review/body stable\" && bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; Result: pass. Evidence: create-path and existing-PR-path stability tests passed and eslint stayed clean. Scope: pr open artifact rendering during remote PR linkage."
  -
    type: "verify"
    at: "2026-04-09T14:20:35.833Z"
    author: "CODER"
    state: "ok"
    note: "Rebased onto main after 75VJ4R removed the shared wait-remote-checks blocker and reran targeted wait-remote/pr-flow coverage for the pr open artifact-churn path."
doc_version: 3
doc_updated_at: "2026-04-09T14:20:35.839Z"
doc_updated_by: "CODER"
description: "When pr open creates or links a GitHub PR, avoid rewriting review/body artifacts unnecessarily so the task branch does not require a broad metadata-only follow-up commit."
sections:
  Summary: |-
    Reduce pr open artifact churn after remote PR linkage
    
    When pr open creates or links a GitHub PR, avoid rewriting review/body artifacts unnecessarily so the task branch does not require a broad metadata-only follow-up commit.
  Scope: |-
    - In scope: When pr open creates or links a GitHub PR, avoid rewriting review/body artifacts unnecessarily so the task branch does not require a broad metadata-only follow-up commit.
    - Out of scope: unrelated refactors not required for "Reduce pr open artifact churn after remote PR linkage".
  Plan: "1. Reproduce the post-pr-open metadata churn when remote PR linkage rewrites review/body artifacts even though task content and branch head are unchanged. 2. Preserve stable rendered artifacts when only GitHub linkage metadata changes, keeping necessary meta updates only. 3. Add regression coverage for create/link existing PR flows and verify the task branch stays minimally dirty."
  Verify Steps: |-
    1. Reproduce pr open against create/link-existing GitHub PR paths. Expected: review/body artifacts stay unchanged when only linkage metadata changes.
    2. Run focused pr-flow tests around pr open idempotence and existing-PR hydration. Expected: only the required metadata delta remains.
    3. Run relevant lint/tests. Expected: PR artifact generation still passes existing contract checks.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T13:12:58.480Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t "pr open keeps review/body stable" && bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; Result: pass. Evidence: create-path and existing-PR-path stability tests passed and eslint stayed clean. Scope: pr open artifact rendering during remote PR linkage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:10:49.029Z, excerpt_hash=sha256:8d3d8ed5cf48ccd3aff4cffd513ab37004e7ade050c24827c361a47a514f0165
    
    ### 2026-04-09T14:20:35.833Z — VERIFY — ok
    
    By: CODER
    
    Note: Rebased onto main after 75VJ4R removed the shared wait-remote-checks blocker and reran targeted wait-remote/pr-flow coverage for the pr open artifact-churn path.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:12:58.484Z, excerpt_hash=sha256:8d3d8ed5cf48ccd3aff4cffd513ab37004e7ade050c24827c361a47a514f0165
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Reduce pr open artifact churn after remote PR linkage

When pr open creates or links a GitHub PR, avoid rewriting review/body artifacts unnecessarily so the task branch does not require a broad metadata-only follow-up commit.

## Scope

- In scope: When pr open creates or links a GitHub PR, avoid rewriting review/body artifacts unnecessarily so the task branch does not require a broad metadata-only follow-up commit.
- Out of scope: unrelated refactors not required for "Reduce pr open artifact churn after remote PR linkage".

## Plan

1. Reproduce the post-pr-open metadata churn when remote PR linkage rewrites review/body artifacts even though task content and branch head are unchanged. 2. Preserve stable rendered artifacts when only GitHub linkage metadata changes, keeping necessary meta updates only. 3. Add regression coverage for create/link existing PR flows and verify the task branch stays minimally dirty.

## Verify Steps

1. Reproduce pr open against create/link-existing GitHub PR paths. Expected: review/body artifacts stay unchanged when only linkage metadata changes.
2. Run focused pr-flow tests around pr open idempotence and existing-PR hydration. Expected: only the required metadata delta remains.
3. Run relevant lint/tests. Expected: PR artifact generation still passes existing contract checks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T13:12:58.480Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t "pr open keeps review/body stable" && bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; Result: pass. Evidence: create-path and existing-PR-path stability tests passed and eslint stayed clean. Scope: pr open artifact rendering during remote PR linkage.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:10:49.029Z, excerpt_hash=sha256:8d3d8ed5cf48ccd3aff4cffd513ab37004e7ade050c24827c361a47a514f0165

### 2026-04-09T14:20:35.833Z — VERIFY — ok

By: CODER

Note: Rebased onto main after 75VJ4R removed the shared wait-remote-checks blocker and reran targeted wait-remote/pr-flow coverage for the pr open artifact-churn path.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:12:58.484Z, excerpt_hash=sha256:8d3d8ed5cf48ccd3aff4cffd513ab37004e7ade050c24827c361a47a514f0165

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
