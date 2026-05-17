---
id: "202605170722-YP81RG"
title: "Document and test adaptive context curation flow"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T07:23:29.588Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T07:37:09.984Z"
  updated_by: "CODER"
  note: "Updated user docs and generated CLI reference for adaptive context curation flow; docs:cli:check, policy routing, diff check, typecheck, and focused tests pass."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Update docs and regression coverage for the unified adaptive context curation workflow in the batch worktree."
events:
  -
    type: "status"
    at: "2026-05-17T07:26:28.821Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Update docs and regression coverage for the unified adaptive context curation workflow in the batch worktree."
  -
    type: "verify"
    at: "2026-05-17T07:37:09.984Z"
    author: "CODER"
    state: "ok"
    note: "Updated user docs and generated CLI reference for adaptive context curation flow; docs:cli:check, policy routing, diff check, typecheck, and focused tests pass."
doc_version: 3
doc_updated_at: "2026-05-17T07:37:10.000Z"
doc_updated_by: "CODER"
description: "Update docs and focused regression tests so context learn, wiki metadata helpers, and adaptive context init are documented as one cloud-ready llm-wiki curation workflow."
sections:
  Summary: |-
    Document and test adaptive context curation flow
    
    Update docs and focused regression tests so context learn, wiki metadata helpers, and adaptive context init are documented as one cloud-ready llm-wiki curation workflow.
  Scope: |-
    - In scope: Update docs and focused regression tests so context learn, wiki metadata helpers, and adaptive context init are documented as one cloud-ready llm-wiki curation workflow.
    - Out of scope: unrelated refactors not required for "Document and test adaptive context curation flow".
  Plan: "Update focused docs and regression coverage so the adaptive context curation workflow is visible: learn files/changes creates portable CURATOR tasks, learn tasks uses the same mental model for task-history ADR/evolution extraction, wiki pages carry frontmatter, helper commands exist for agent ergonomics, and verification covers task generation plus wiki lint behavior."
  Verify Steps: |-
    1. bun test packages/agentplane/src/commands/context/ingest.spec.ts packages/agentplane/src/commands/context/context.learn.spec.ts packages/agentplane/src/commands/context/release-readiness.test.ts
    2. Verify docs/user/local-context.mdx and docs/user/commands.mdx align with generated CLI behavior.
    3. node .agentplane/policy/check-routing.mjs
    4. git diff --check
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T07:37:09.984Z — VERIFY — ok
    
    By: CODER
    
    Note: Updated user docs and generated CLI reference for adaptive context curation flow; docs:cli:check, policy routing, diff check, typecheck, and focused tests pass.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T07:26:28.821Z, excerpt_hash=sha256:b63910211981e9de98be7d3aa5be2f7ffe93f38a2f73c9357082a701c68bff53
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170721-ESJ0SW-adaptive-context-curation/.agentplane/tasks/202605170722-YP81RG/blueprint/resolved-snapshot.json
    - old_digest: 2354d4af8c002e90fa8731235f93a61f55b5229f4064d3f567c9ede8bf704f92
    - current_digest: 2354d4af8c002e90fa8731235f93a61f55b5229f4064d3f567c9ede8bf704f92
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170722-YP81RG
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Document and test adaptive context curation flow

Update docs and focused regression tests so context learn, wiki metadata helpers, and adaptive context init are documented as one cloud-ready llm-wiki curation workflow.

## Scope

- In scope: Update docs and focused regression tests so context learn, wiki metadata helpers, and adaptive context init are documented as one cloud-ready llm-wiki curation workflow.
- Out of scope: unrelated refactors not required for "Document and test adaptive context curation flow".

## Plan

Update focused docs and regression coverage so the adaptive context curation workflow is visible: learn files/changes creates portable CURATOR tasks, learn tasks uses the same mental model for task-history ADR/evolution extraction, wiki pages carry frontmatter, helper commands exist for agent ergonomics, and verification covers task generation plus wiki lint behavior.

## Verify Steps

1. bun test packages/agentplane/src/commands/context/ingest.spec.ts packages/agentplane/src/commands/context/context.learn.spec.ts packages/agentplane/src/commands/context/release-readiness.test.ts
2. Verify docs/user/local-context.mdx and docs/user/commands.mdx align with generated CLI behavior.
3. node .agentplane/policy/check-routing.mjs
4. git diff --check

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T07:37:09.984Z — VERIFY — ok

By: CODER

Note: Updated user docs and generated CLI reference for adaptive context curation flow; docs:cli:check, policy routing, diff check, typecheck, and focused tests pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T07:26:28.821Z, excerpt_hash=sha256:b63910211981e9de98be7d3aa5be2f7ffe93f38a2f73c9357082a701c68bff53

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170721-ESJ0SW-adaptive-context-curation/.agentplane/tasks/202605170722-YP81RG/blueprint/resolved-snapshot.json
- old_digest: 2354d4af8c002e90fa8731235f93a61f55b5229f4064d3f567c9ede8bf704f92
- current_digest: 2354d4af8c002e90fa8731235f93a61f55b5229f4064d3f567c9ede8bf704f92
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170722-YP81RG

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
