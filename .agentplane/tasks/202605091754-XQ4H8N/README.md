---
id: "202605091754-XQ4H8N"
title: "Clean unused exported API surface"
result_summary: "Merged via PR #3543."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "knip"
  - "refactor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run clone:check"
  - "bun run knip:check"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T17:55:14.754Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T19:27:56.727Z"
  updated_by: "CODER"
  note: "Verified: removed/narrowed unused exported API surface and stale knip baseline entry; knip:check passed, typecheck passed, Prettier passed, knip baseline helper test passed (1 file, 2 tests), and clone:check passed without baseline update."
  attempts: 0
commit:
  hash: "15443cdfbd69c897b925b5363edbb0fc777f444c"
  message: "Merge pull request #3543 from basilisk-labs/task/202605091754-XQ4H8N/knip-unused-surface"
comments:
  -
    author: "CODER"
    body: "Start: remove or narrow unused exported API surface reported by knip without changing runtime behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3543 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-09T19:23:56.807Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove or narrow unused exported API surface reported by knip without changing runtime behavior."
  -
    type: "verify"
    at: "2026-05-09T19:27:56.727Z"
    author: "CODER"
    state: "ok"
    note: "Verified: removed/narrowed unused exported API surface and stale knip baseline entry; knip:check passed, typecheck passed, Prettier passed, knip baseline helper test passed (1 file, 2 tests), and clone:check passed without baseline update."
  -
    type: "status"
    at: "2026-05-09T19:31:02.521Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3543 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-09T19:31:02.529Z"
doc_updated_by: "INTEGRATOR"
description: "Resolve the current knip baseline failures by removing accidental exports or adding real consumers for the reported unused constants/types, then update baseline only if reviewed debt remains intentional."
sections:
  Summary: |-
    Clean unused exported API surface
    
    Resolve the current knip baseline failures by removing accidental exports or adding real consumers for the reported unused constants/types, then update baseline only if reviewed debt remains intentional.
  Scope: |-
    - In scope: Resolve the current knip baseline failures by removing accidental exports or adding real consumers for the reported unused constants/types, then update baseline only if reviewed debt remains intentional.
    - Out of scope: unrelated refactors not required for "Clean unused exported API surface".
  Plan: "Resolve current knip failures by reviewing each reported unused export/type. Prefer making internal-only declarations non-exported; add consumers only where the type is part of a real public contract. Remove stale baseline entries and update baseline only if reviewed intentional debt remains. Verify with knip:check, typecheck, and clone check."
  Verify Steps: |-
    1. Run `bun run knip:check`. Expected: unused-code baseline guard succeeds with no new or stale entries.
    2. Run `bun run typecheck`. Expected: TypeScript project references compile.
    3. Run `bunx prettier --check packages/agentplane/src/backends/task-backend/cloud-backend-utils.ts packages/agentplane/src/commands/pr/integrate/queue-state.ts packages/agentplane/src/blueprints/builtin-builder.ts packages/agentplane/src/commands/acr/validate.ts packages/agentplane/src/commands/blueprints/catalog.ts packages/agentplane/src/shared/json-io.ts packages/agentplane/src/commands/task/verify-command-shared.ts scripts/baselines/knip-baseline.json`. Expected: changed files are formatted.
    4. Run `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/check-knip-baseline-script.test.ts`. Expected: knip baseline helper behavior remains green.
    5. Run `bun run clone:check`. Expected: clone baseline guard passes without updating the baseline.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T19:27:56.727Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: removed/narrowed unused exported API surface and stale knip baseline entry; knip:check passed, typecheck passed, Prettier passed, knip baseline helper test passed (1 file, 2 tests), and clone:check passed without baseline update.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T19:23:56.832Z, excerpt_hash=sha256:d959e33f279d08c3a0e3e60268ffa97428ff431643598892638960b40b25bebf
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091754-XQ4H8N-knip-unused-surface/.agentplane/tasks/202605091754-XQ4H8N/blueprint/resolved-snapshot.json
    - old_digest: a5163b22d5c798c1daff247846bdfd5ef453a0dc26272a1223f0bfae9d11e04a
    - current_digest: a5163b22d5c798c1daff247846bdfd5ef453a0dc26272a1223f0bfae9d11e04a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091754-XQ4H8N
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
