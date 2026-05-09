---
id: "202605091754-4FFAY9"
title: "Extract shared task doc section parser"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "core"
  - "refactor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run clone:check"
  - "bun run test:project -- packages/core/src/tasks"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T17:55:13.528Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T18:52:34.181Z"
  updated_by: "CODER"
  note: "Verified: extracted shared task doc section parser; focused core task-doc/readme/store tests passed (4 files, 58 tests), typecheck passed, Prettier passed, clone:report improved metrics to 83 clones / 1384 duplicated lines / 14705 duplicated tokens, and clone:check passed without baseline update."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extract a shared task doc section parser and reuse it from normalization, ensure-section, and section-map helpers."
events:
  -
    type: "status"
    at: "2026-05-09T18:46:47.086Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract a shared task doc section parser and reuse it from normalization, ensure-section, and section-map helpers."
  -
    type: "verify"
    at: "2026-05-09T18:52:34.181Z"
    author: "CODER"
    state: "ok"
    note: "Verified: extracted shared task doc section parser; focused core task-doc/readme/store tests passed (4 files, 58 tests), typecheck passed, Prettier passed, clone:report improved metrics to 83 clones / 1384 duplicated lines / 14705 duplicated tokens, and clone:check passed without baseline update."
doc_version: 3
doc_updated_at: "2026-05-09T18:52:34.206Z"
doc_updated_by: "CODER"
description: "Unify the duplicated section parsing logic in core task document normalization so normalizeTaskDoc and normalizeDocSections share one parser."
sections:
  Summary: |-
    Extract shared task doc section parser
    
    Unify the duplicated section parsing logic in core task document normalization so normalizeTaskDoc and normalizeDocSections share one parser.
  Scope: |-
    - In scope: Unify the duplicated section parsing logic in core task document normalization so normalizeTaskDoc and normalizeDocSections share one parser.
    - Out of scope: unrelated refactors not required for "Extract shared task doc section parser".
  Plan: "Extract a shared parser for task document sections in core task-doc handling. Reuse it from normalizeTaskDoc and normalizeDocSections while preserving ordering, duplicate-section separator behavior, and required-section behavior. Verify with core task tests, typecheck, and clone check."
  Verify Steps: |-
    1. Run `bun run test:project -- core packages/core/src/tasks/task-doc.test.ts packages/core/src/tasks/task-doc-mutation.test.ts packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-store.test.ts`. Expected: task document parsing, mutation, README rendering, and store behavior remain green.
    2. Run `bun run typecheck`. Expected: TypeScript project references compile.
    3. Run `bunx prettier --check packages/core/src/tasks/task-doc.ts`. Expected: changed source is formatted.
    4. Run `bun run clone:report`. Expected: task-doc section parser duplicate cluster is gone and clone metrics decrease versus the pre-task report.
    5. Run `bun run clone:check`. Expected: clone baseline guard passes without updating the baseline.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T18:52:34.181Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: extracted shared task doc section parser; focused core task-doc/readme/store tests passed (4 files, 58 tests), typecheck passed, Prettier passed, clone:report improved metrics to 83 clones / 1384 duplicated lines / 14705 duplicated tokens, and clone:check passed without baseline update.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T18:46:47.106Z, excerpt_hash=sha256:93bb97b97fca27990952f5958b92342d641cfa12159e222be6628989d756a6d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091754-4FFAY9-task-doc-parser/.agentplane/tasks/202605091754-4FFAY9/blueprint/resolved-snapshot.json
    - old_digest: e42fc5b22ff69e1a97a3ab0b1b9de53d3f97385bbd2ac38e9f0f856e92c44633
    - current_digest: e42fc5b22ff69e1a97a3ab0b1b9de53d3f97385bbd2ac38e9f0f856e92c44633
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091754-4FFAY9
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
