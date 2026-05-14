---
id: "202605142104-T42JAK"
title: "Clean up blog typography"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T21:05:01.994Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T21:15:04.303Z"
  updated_by: "CODER"
  note: "Verified blog author UI removal, homepage local menu removal, card order swap, typecheck, and production build."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved blog typography cleanup in the dedicated branch_pr worktree, limited to website blog UI/CSS and task evidence."
events:
  -
    type: "status"
    at: "2026-05-14T21:05:14.607Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved blog typography cleanup in the dedicated branch_pr worktree, limited to website blog UI/CSS and task evidence."
  -
    type: "verify"
    at: "2026-05-14T21:15:04.303Z"
    author: "CODER"
    state: "ok"
    note: "Verified blog author UI removal, homepage local menu removal, card order swap, typecheck, and production build."
doc_version: 3
doc_updated_at: "2026-05-14T21:15:04.308Z"
doc_updated_by: "CODER"
description: "Hide redundant team author presentation on blog pages and refine the blog typography surface without changing post metadata."
sections:
  Summary: |-
    Clean up blog typography
    
    Hide redundant team author presentation on blog pages and refine the blog typography surface without changing post metadata.
  Scope: |-
    - In scope: Hide redundant team author presentation on blog pages and refine the blog typography surface without changing post metadata.
    - Out of scope: unrelated refactors not required for "Clean up blog typography".
  Plan: "Scope: refine the website blog presentation only. Plan: (1) inspect the current blog landing and post theme surface; (2) start a dedicated branch_pr worktree for CODER; (3) hide redundant team author UI on blog post pages while preserving author metadata/frontmatter; (4) tune blog landing/post CSS toward cleaner typography with small metadata markers, rule lines, and compact rhythm; (5) run the declared task verification and the website build or nearest focused site check; (6) record verification evidence and prepare PR artifacts."
  Verify Steps: |-
    PLANNER fallback scaffold for "Clean up blog typography". Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the requested outcome for "Clean up blog typography". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T21:15:04.303Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified blog author UI removal, homepage local menu removal, card order swap, typecheck, and production build.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T21:05:14.607Z, excerpt_hash=sha256:c3f400ab0337e81a2f3574e8969817b2051c394653c49a0655c5410904719e38
    
    Details:
    
    Command: bun run typecheck. Result: pass. Evidence: tsc exited 0 after dependencies were available via bun install --ignore-scripts. Scope: website TypeScript/theme overrides.
    
    Command: bun run build. Result: pass. Evidence: check-content ok; Docusaurus client/server compiled successfully; static files generated; only existing vscode-languageserver-types dynamic require warning observed. Scope: production website build.
    
    Command: Playwright wrapper snapshots for http://127.0.0.1:3057/ and /blog/agentplane-0-6-context-management-llm-wiki. Result: pass. Evidence: homepage snapshot exposes only navigation Main and shows Release notes card before A compact record card; blog post snapshot shows date/reading time plus FIELD NOTE and no visible Team byline. Scope: requested UI behavior.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605142104-T42JAK-clean-blog-typography/.agentplane/tasks/202605142104-T42JAK/blueprint/resolved-snapshot.json
    - old_digest: a639e736c4552c52d5841c2b8e16979b6a70d4908c75de018598b230fc336f3d
    - current_digest: a639e736c4552c52d5841c2b8e16979b6a70d4908c75de018598b230fc336f3d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605142104-T42JAK
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Clean up blog typography

Hide redundant team author presentation on blog pages and refine the blog typography surface without changing post metadata.

## Scope

- In scope: Hide redundant team author presentation on blog pages and refine the blog typography surface without changing post metadata.
- Out of scope: unrelated refactors not required for "Clean up blog typography".

## Plan

Scope: refine the website blog presentation only. Plan: (1) inspect the current blog landing and post theme surface; (2) start a dedicated branch_pr worktree for CODER; (3) hide redundant team author UI on blog post pages while preserving author metadata/frontmatter; (4) tune blog landing/post CSS toward cleaner typography with small metadata markers, rule lines, and compact rhythm; (5) run the declared task verification and the website build or nearest focused site check; (6) record verification evidence and prepare PR artifacts.

## Verify Steps

PLANNER fallback scaffold for "Clean up blog typography". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Clean up blog typography". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T21:15:04.303Z — VERIFY — ok

By: CODER

Note: Verified blog author UI removal, homepage local menu removal, card order swap, typecheck, and production build.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T21:05:14.607Z, excerpt_hash=sha256:c3f400ab0337e81a2f3574e8969817b2051c394653c49a0655c5410904719e38

Details:

Command: bun run typecheck. Result: pass. Evidence: tsc exited 0 after dependencies were available via bun install --ignore-scripts. Scope: website TypeScript/theme overrides.

Command: bun run build. Result: pass. Evidence: check-content ok; Docusaurus client/server compiled successfully; static files generated; only existing vscode-languageserver-types dynamic require warning observed. Scope: production website build.

Command: Playwright wrapper snapshots for http://127.0.0.1:3057/ and /blog/agentplane-0-6-context-management-llm-wiki. Result: pass. Evidence: homepage snapshot exposes only navigation Main and shows Release notes card before A compact record card; blog post snapshot shows date/reading time plus FIELD NOTE and no visible Team byline. Scope: requested UI behavior.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605142104-T42JAK-clean-blog-typography/.agentplane/tasks/202605142104-T42JAK/blueprint/resolved-snapshot.json
- old_digest: a639e736c4552c52d5841c2b8e16979b6a70d4908c75de018598b230fc336f3d
- current_digest: a639e736c4552c52d5841c2b8e16979b6a70d4908c75de018598b230fc336f3d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605142104-T42JAK

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
