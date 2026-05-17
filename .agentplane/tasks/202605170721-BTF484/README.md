---
id: "202605170721-BTF484"
title: "Add llm-wiki page metadata and helper commands"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "context"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T07:23:17.799Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T07:37:07.934Z"
  updated_by: "CODER"
  note: "Implemented context wiki helper commands for new/lint/explain/link with frontmatter manifest; verified directory lint regression and temp-dir CLI smoke."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement wiki page metadata and helper command behavior within the approved adaptive context curation batch worktree."
events:
  -
    type: "status"
    at: "2026-05-17T07:26:08.448Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement wiki page metadata and helper command behavior within the approved adaptive context curation batch worktree."
  -
    type: "verify"
    at: "2026-05-17T07:37:07.934Z"
    author: "CODER"
    state: "ok"
    note: "Implemented context wiki helper commands for new/lint/explain/link with frontmatter manifest; verified directory lint regression and temp-dir CLI smoke."
doc_version: 3
doc_updated_at: "2026-05-17T07:37:07.950Z"
doc_updated_by: "CODER"
description: "Introduce a stable wiki page frontmatter contract plus CLI helpers for creating, linting, linking, explaining, and querying context wiki pages and claims."
sections:
  Summary: |-
    Add llm-wiki page metadata and helper commands
    
    Introduce a stable wiki page frontmatter contract plus CLI helpers for creating, linting, linking, explaining, and querying context wiki pages and claims.
  Scope: |-
    - In scope: Introduce a stable wiki page frontmatter contract plus CLI helpers for creating, linting, linking, explaining, and querying context wiki pages and claims.
    - Out of scope: unrelated refactors not required for "Add llm-wiki page metadata and helper commands".
  Plan: "Add a stable wiki page metadata/frontmatter contract and helper CLI surfaces that let agents create, inspect, lint, and link wiki pages without inventing page manifests. Keep storage cloud-ready by treating markdown pages as context artifacts that reference atomic claims/entities/sources instead of replacing the claim layer."
  Verify Steps: |-
    1. bun test packages/agentplane/src/commands/context/context.spec.ts packages/agentplane/src/commands/context/context.learn.spec.ts
    2. Run focused manual smoke for context wiki helper commands with --help or dry-run style paths where implemented.
    3. node .agentplane/policy/check-routing.mjs
    4. git diff --check
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T07:37:07.934Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented context wiki helper commands for new/lint/explain/link with frontmatter manifest; verified directory lint regression and temp-dir CLI smoke.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T07:26:08.448Z, excerpt_hash=sha256:3710ab82c39103151926d6955c397cae1b50dcf70532226228015930e95aa232
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170721-ESJ0SW-adaptive-context-curation/.agentplane/tasks/202605170721-BTF484/blueprint/resolved-snapshot.json
    - old_digest: ad49f7dc04eebcd10f9a7571a1154bd5203f7f868825c8502742367e879d5f7c
    - current_digest: ad49f7dc04eebcd10f9a7571a1154bd5203f7f868825c8502742367e879d5f7c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170721-BTF484
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add llm-wiki page metadata and helper commands

Introduce a stable wiki page frontmatter contract plus CLI helpers for creating, linting, linking, explaining, and querying context wiki pages and claims.

## Scope

- In scope: Introduce a stable wiki page frontmatter contract plus CLI helpers for creating, linting, linking, explaining, and querying context wiki pages and claims.
- Out of scope: unrelated refactors not required for "Add llm-wiki page metadata and helper commands".

## Plan

Add a stable wiki page metadata/frontmatter contract and helper CLI surfaces that let agents create, inspect, lint, and link wiki pages without inventing page manifests. Keep storage cloud-ready by treating markdown pages as context artifacts that reference atomic claims/entities/sources instead of replacing the claim layer.

## Verify Steps

1. bun test packages/agentplane/src/commands/context/context.spec.ts packages/agentplane/src/commands/context/context.learn.spec.ts
2. Run focused manual smoke for context wiki helper commands with --help or dry-run style paths where implemented.
3. node .agentplane/policy/check-routing.mjs
4. git diff --check

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T07:37:07.934Z — VERIFY — ok

By: CODER

Note: Implemented context wiki helper commands for new/lint/explain/link with frontmatter manifest; verified directory lint regression and temp-dir CLI smoke.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T07:26:08.448Z, excerpt_hash=sha256:3710ab82c39103151926d6955c397cae1b50dcf70532226228015930e95aa232

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170721-ESJ0SW-adaptive-context-curation/.agentplane/tasks/202605170721-BTF484/blueprint/resolved-snapshot.json
- old_digest: ad49f7dc04eebcd10f9a7571a1154bd5203f7f868825c8502742367e879d5f7c
- current_digest: ad49f7dc04eebcd10f9a7571a1154bd5203f7f868825c8502742367e879d5f7c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170721-BTF484

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
