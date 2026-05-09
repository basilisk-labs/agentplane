---
id: "202605091753-96X7WA"
title: "Deduplicate built-in blueprint builders"
result_summary: "Merged via PR #3526."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
  - "refactor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run clone:check"
  - "bun run clone:report"
  - "bun run test:project -- packages/agentplane/src/blueprints"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T17:55:07.603Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T18:07:21.515Z"
  updated_by: "CODER"
  note: "Verified: extracted shared blueprint builder and branch_pr route helpers; focused blueprint tests passed (3 files, 51 tests), typecheck passed, clone:report improved duplicatedLines 1708->1546 and duplicatedTokens 17574->16193, and clone:check passed without baseline update."
  attempts: 0
commit:
  hash: "e12e8b4c05d20a0f8feab61a609ace8dd17425c0"
  message: "Merge pull request #3526 from basilisk-labs/task/202605091753-96X7WA/blueprint-builder"
comments:
  -
    author: "CODER"
    body: "Start: extracting the shared built-in blueprint builder primitives from duplicated runtime files, preserving current blueprint exports and verifying with focused blueprint tests plus clone/type checks."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3526 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-09T17:55:52.790Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extracting the shared built-in blueprint builder primitives from duplicated runtime files, preserving current blueprint exports and verifying with focused blueprint tests plus clone/type checks."
  -
    type: "verify"
    at: "2026-05-09T18:07:21.515Z"
    author: "CODER"
    state: "ok"
    note: "Verified: extracted shared blueprint builder and branch_pr route helpers; focused blueprint tests passed (3 files, 51 tests), typecheck passed, clone:report improved duplicatedLines 1708->1546 and duplicatedTokens 17574->16193, and clone:check passed without baseline update."
  -
    type: "status"
    at: "2026-05-09T18:12:47.906Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3526 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-09T18:12:47.912Z"
doc_updated_by: "INTEGRATOR"
description: "Extract the shared built-in blueprint node/builder primitives from builtins.ts and builtins-specialized.ts so specialized blueprints reuse the canonical builder instead of duplicating the route construction code."
sections:
  Summary: |-
    Deduplicate built-in blueprint builders
    
    Extract the shared built-in blueprint node/builder primitives from builtins.ts and builtins-specialized.ts so specialized blueprints reuse the canonical builder instead of duplicating the route construction code.
  Scope: |-
    - In scope: Extract the shared built-in blueprint node/builder primitives from builtins.ts and builtins-specialized.ts so specialized blueprints reuse the canonical builder instead of duplicating the route construction code.
    - Out of scope: unrelated refactors not required for "Deduplicate built-in blueprint builders".
  Plan: "Extract a shared built-in blueprint builder module that owns NodeSpec, CORE_STOP_RULES, NODE_MODE_BY_KIND, node(), edgesFor(), evidence(), blueprint(), and any small extension helper needed by specialized blueprints. Update builtins.ts and builtins-specialized.ts to import the shared primitives without changing exported blueprint definitions or runtime behavior. Verify with blueprint-focused tests, typecheck, clone report, and clone baseline check."
  Verify Steps: |-
    1. Run `bun run clone:report`. Expected: duplicated blueprint builder clusters are gone and total duplicated lines/tokens decrease versus the pre-task report.
    2. Run `bun run test:project -- agentplane packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/blueprints/resolve.test.ts packages/agentplane/src/blueprints/snapshot.test.ts`. Expected: blueprint registry/resolve/snapshot behavior remains green.
    3. Run `bun run typecheck`. Expected: TypeScript project references compile.
    4. Run `bun run clone:check`. Expected: clone baseline guard passes without updating the baseline.
    5. Review the changed artifact or behavior for the `code` task. Expected: shared builder/route helpers preserve existing blueprint definitions and exports.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T18:07:21.515Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: extracted shared blueprint builder and branch_pr route helpers; focused blueprint tests passed (3 files, 51 tests), typecheck passed, clone:report improved duplicatedLines 1708->1546 and duplicatedTokens 17574->16193, and clone:check passed without baseline update.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T18:05:05.916Z, excerpt_hash=sha256:c49d8b1b2007168d83b1a729930599cb5e82ec1446abbd2d68c7d181a30dbd3c
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091753-96X7WA-blueprint-builder/.agentplane/tasks/202605091753-96X7WA/blueprint/resolved-snapshot.json
    - old_digest: 598662ade6038a90d5b485e536e804e5f0f4e08343e8988567a7f8f9a2da0337
    - current_digest: 598662ade6038a90d5b485e536e804e5f0f4e08343e8988567a7f8f9a2da0337
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091753-96X7WA
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Focused validation passed after correcting the task Verify Steps command from an invalid vitest project path to the repository's agentplane project plus explicit blueprint test files.
      Impact: The task now has executable acceptance coverage and the refactor removes the targeted blueprint clone clusters without changing public blueprint definitions.
      Resolution: Keep follow-up duplication work in the separate approved tasks for benchmark scripts, hook context, task transitions, verify specs, task-doc parsing, and knip cleanup.
id_source: "generated"
---
