---
id: "202605170941-ZXBF4Q"
title: "Require inline wiki links and index maintenance for context curation"
result_summary: "Merged PR #3808 with inline wiki link guidance, canonical term requirements, and the context wiki index helper."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "prompt"
  - "wiki"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T09:41:24.538Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T09:58:50.963Z"
  updated_by: "CODER"
  note: "Addressed PR review edge case for context wiki index on a single page target; ancestor index pages now update for page-scoped runs. Re-ran focused context tests, typecheck, docs CLI freshness, targeted Prettier/ESLint, policy routing, and git diff check."
  attempts: 0
commit:
  hash: "ea92cff3b9f416cf00930bcc5d7406aea62655a2"
  message: "Merge pull request #3808 from basilisk-labs/task/202605170936-WIKILINK/wiki-inline-links-and-indexes"
comments:
  -
    author: "CODER"
    body: "Start: update context wiki curation prompt and docs to require inline links, canonical linked terms, and index maintenance."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3808 merged after green hosted checks; merge commit recorded and task scope is complete."
events:
  -
    type: "status"
    at: "2026-05-17T09:41:27.156Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: update context wiki curation prompt and docs to require inline links, canonical linked terms, and index maintenance."
  -
    type: "verify"
    at: "2026-05-17T09:50:19.442Z"
    author: "CODER"
    state: "ok"
    note: "Updated context assimilation prompt, context init wiki notes, docs, CLI command catalog, and release-readiness tests so wiki curation requires inline meaningful links, canonical linked terms, index maintenance, and provides context wiki index for generated index sections. Verified with focused context tests, typecheck, docs CLI freshness, targeted ESLint/Prettier, policy routing, git diff check, ap doctor, and command help smoke."
  -
    type: "verify"
    at: "2026-05-17T09:58:50.963Z"
    author: "CODER"
    state: "ok"
    note: "Addressed PR review edge case for context wiki index on a single page target; ancestor index pages now update for page-scoped runs. Re-ran focused context tests, typecheck, docs CLI freshness, targeted Prettier/ESLint, policy routing, and git diff check."
  -
    type: "status"
    at: "2026-05-17T10:52:39.142Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3808 merged after green hosted checks; merge commit recorded and task scope is complete."
doc_version: 3
doc_updated_at: "2026-05-17T10:52:39.142Z"
doc_updated_by: "INTEGRATOR"
description: "Update context assimilation guidance, init wiki notes, docs, and focused tests so CURATOR agents place meaningful wiki links inline in narrative text, reuse canonical terms with links when confidence is sufficient, record aliases when source wording differs, and maintain relevant wiki index/navigation pages. Document possible CLI helper commands for index/link maintenance."
sections:
  Summary: |-
    Require inline wiki links and index maintenance for context curation
    
    Update context assimilation guidance, init wiki notes, docs, and focused tests so CURATOR agents place meaningful wiki links inline in narrative text, reuse canonical terms with links when confidence is sufficient, record aliases when source wording differs, and maintain relevant wiki index/navigation pages. Document possible CLI helper commands for index/link maintenance.
  Scope: |-
    - In scope: Update context assimilation guidance, init wiki notes, docs, and focused tests so CURATOR agents place meaningful wiki links inline in narrative text, reuse canonical terms with links when confidence is sufficient, record aliases when source wording differs, and maintain relevant wiki index/navigation pages. Document possible CLI helper commands for index/link maintenance.
    - Out of scope: unrelated refactors not required for "Require inline wiki links and index maintenance for context curation".
  Plan: "Update context assimilation prompt module, context init wiki guidance, docs, and focused tests. Requirements: inline meaningful wiki links in narrative text rather than only Related Pages; when pre-write lookup confidently matches an existing entity/concept, use the canonical term and link to its page/section, recording source-local wording as aliases; update relevant wiki index/navigation pages after creating or moving pages; document likely future CLI helpers for index/link maintenance without adding public commands unless a minimal existing helper change is needed."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T09:50:19.442Z — VERIFY — ok
    
    By: CODER
    
    Note: Updated context assimilation prompt, context init wiki notes, docs, CLI command catalog, and release-readiness tests so wiki curation requires inline meaningful links, canonical linked terms, index maintenance, and provides context wiki index for generated index sections. Verified with focused context tests, typecheck, docs CLI freshness, targeted ESLint/Prettier, policy routing, git diff check, ap doctor, and command help smoke.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T09:41:27.156Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170936-WIKILINK-wiki-inline-links-and-indexes/.agentplane/tasks/202605170941-ZXBF4Q/blueprint/resolved-snapshot.json
    - old_digest: 8d5b4e704e15c2f06543698ff5a799eef6eb95e126e5a2facb796353666229a0
    - current_digest: 8d5b4e704e15c2f06543698ff5a799eef6eb95e126e5a2facb796353666229a0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170941-ZXBF4Q
    
    ### 2026-05-17T09:58:50.963Z — VERIFY — ok
    
    By: CODER
    
    Note: Addressed PR review edge case for context wiki index on a single page target; ancestor index pages now update for page-scoped runs. Re-ran focused context tests, typecheck, docs CLI freshness, targeted Prettier/ESLint, policy routing, and git diff check.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T09:50:19.460Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170936-WIKILINK-wiki-inline-links-and-indexes/.agentplane/tasks/202605170941-ZXBF4Q/blueprint/resolved-snapshot.json
    - old_digest: 8d5b4e704e15c2f06543698ff5a799eef6eb95e126e5a2facb796353666229a0
    - current_digest: 8d5b4e704e15c2f06543698ff5a799eef6eb95e126e5a2facb796353666229a0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170941-ZXBF4Q
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Require inline wiki links and index maintenance for context curation

Update context assimilation guidance, init wiki notes, docs, and focused tests so CURATOR agents place meaningful wiki links inline in narrative text, reuse canonical terms with links when confidence is sufficient, record aliases when source wording differs, and maintain relevant wiki index/navigation pages. Document possible CLI helper commands for index/link maintenance.

## Scope

- In scope: Update context assimilation guidance, init wiki notes, docs, and focused tests so CURATOR agents place meaningful wiki links inline in narrative text, reuse canonical terms with links when confidence is sufficient, record aliases when source wording differs, and maintain relevant wiki index/navigation pages. Document possible CLI helper commands for index/link maintenance.
- Out of scope: unrelated refactors not required for "Require inline wiki links and index maintenance for context curation".

## Plan

Update context assimilation prompt module, context init wiki guidance, docs, and focused tests. Requirements: inline meaningful wiki links in narrative text rather than only Related Pages; when pre-write lookup confidently matches an existing entity/concept, use the canonical term and link to its page/section, recording source-local wording as aliases; update relevant wiki index/navigation pages after creating or moving pages; document likely future CLI helpers for index/link maintenance without adding public commands unless a minimal existing helper change is needed.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T09:50:19.442Z — VERIFY — ok

By: CODER

Note: Updated context assimilation prompt, context init wiki notes, docs, CLI command catalog, and release-readiness tests so wiki curation requires inline meaningful links, canonical linked terms, index maintenance, and provides context wiki index for generated index sections. Verified with focused context tests, typecheck, docs CLI freshness, targeted ESLint/Prettier, policy routing, git diff check, ap doctor, and command help smoke.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T09:41:27.156Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170936-WIKILINK-wiki-inline-links-and-indexes/.agentplane/tasks/202605170941-ZXBF4Q/blueprint/resolved-snapshot.json
- old_digest: 8d5b4e704e15c2f06543698ff5a799eef6eb95e126e5a2facb796353666229a0
- current_digest: 8d5b4e704e15c2f06543698ff5a799eef6eb95e126e5a2facb796353666229a0
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170941-ZXBF4Q

### 2026-05-17T09:58:50.963Z — VERIFY — ok

By: CODER

Note: Addressed PR review edge case for context wiki index on a single page target; ancestor index pages now update for page-scoped runs. Re-ran focused context tests, typecheck, docs CLI freshness, targeted Prettier/ESLint, policy routing, and git diff check.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T09:50:19.460Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170936-WIKILINK-wiki-inline-links-and-indexes/.agentplane/tasks/202605170941-ZXBF4Q/blueprint/resolved-snapshot.json
- old_digest: 8d5b4e704e15c2f06543698ff5a799eef6eb95e126e5a2facb796353666229a0
- current_digest: 8d5b4e704e15c2f06543698ff5a799eef6eb95e126e5a2facb796353666229a0
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170941-ZXBF4Q

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
