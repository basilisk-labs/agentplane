---
id: "202603231944-VWVVW0"
title: "Fix Codex adapter argv ordering for top-level flags"
result_summary: "runner: codex argv ordering fixed"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "codex"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T19:45:59.980Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T19:47:34.872Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts; Result: pass; Evidence: all 6 codex adapter tests passed with the argv order locked to top-level approval flags before exec. Scope: packages/agentplane/src/runner/adapters/codex.ts and packages/agentplane/src/runner/adapters/codex.test.ts. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds completed successfully after the argv reorder. Scope: source build compatibility for the touched runner adapter code. Command: bunx prettier --check packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/codex.test.ts && bunx eslint packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/codex.test.ts; Result: pass; Evidence: formatting and lint passed on the touched files. Scope: style and static validation for the task diff."
commit:
  hash: "bd616aba31d21ae3af82fda18eee19c3d8ae82ef"
  message: "✅ VWVVW0 code: done"
comments:
  -
    author: "CODER"
    body: "Start: inspect the Codex adapter against the real CLI contract, move top-level flags before the exec subcommand, update the locked tests, and verify the corrected invocation order with targeted tests and source builds."
  -
    author: "CODER"
    body: "Verified: Rebuilt the Codex runner invocation so approval flags are placed before the exec subcommand, updated the locked adapter expectations, and verified the corrected argv order with codex adapter tests, source builds, prettier, and eslint."
events:
  -
    type: "status"
    at: "2026-03-23T19:46:38.695Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect the Codex adapter against the real CLI contract, move top-level flags before the exec subcommand, update the locked tests, and verify the corrected invocation order with targeted tests and source builds."
  -
    type: "verify"
    at: "2026-03-23T19:47:34.872Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts; Result: pass; Evidence: all 6 codex adapter tests passed with the argv order locked to top-level approval flags before exec. Scope: packages/agentplane/src/runner/adapters/codex.ts and packages/agentplane/src/runner/adapters/codex.test.ts. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds completed successfully after the argv reorder. Scope: source build compatibility for the touched runner adapter code. Command: bunx prettier --check packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/codex.test.ts && bunx eslint packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/codex.test.ts; Result: pass; Evidence: formatting and lint passed on the touched files. Scope: style and static validation for the task diff."
  -
    type: "status"
    at: "2026-03-23T19:47:45.010Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Rebuilt the Codex runner invocation so approval flags are placed before the exec subcommand, updated the locked adapter expectations, and verified the corrected argv order with codex adapter tests, source builds, prettier, and eslint."
doc_version: 3
doc_updated_at: "2026-03-23T19:47:45.010Z"
doc_updated_by: "CODER"
description: "Rebuild Codex runner invocation so approval and related top-level CLI flags are placed before the exec subcommand, matching the real Codex CLI contract."
sections:
  Summary: |-
    Fix Codex adapter argv ordering for top-level flags
    
    Rebuild Codex runner invocation so approval and related top-level CLI flags are placed before the exec subcommand, matching the real Codex CLI contract.
  Scope: |-
    - In scope: Rebuild Codex runner invocation so approval and related top-level CLI flags are placed before the exec subcommand, matching the real Codex CLI contract.
    - Out of scope: unrelated refactors not required for "Fix Codex adapter argv ordering for top-level flags".
  Plan: "1. Inspect Codex adapter argv assembly and its tests against the real Codex CLI contract. 2. Move top-level flags such as approval/search before the exec subcommand. 3. Update adapter tests to lock the corrected ordering. 4. Verify with targeted tests and source builds."
  Verify Steps: "1. Run bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts. 2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. 3. Confirm the Codex adapter now assembles top-level flags before the exec subcommand in the locked test expectations."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T19:47:34.872Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts; Result: pass; Evidence: all 6 codex adapter tests passed with the argv order locked to top-level approval flags before exec. Scope: packages/agentplane/src/runner/adapters/codex.ts and packages/agentplane/src/runner/adapters/codex.test.ts. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds completed successfully after the argv reorder. Scope: source build compatibility for the touched runner adapter code. Command: bunx prettier --check packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/codex.test.ts && bunx eslint packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/codex.test.ts; Result: pass; Evidence: formatting and lint passed on the touched files. Scope: style and static validation for the task diff.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T19:46:38.696Z, excerpt_hash=sha256:9717e58862b6e6c76a34c2fe2a7d085fa7f7d775519fd442a09e281e5dea7f3f
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix Codex adapter argv ordering for top-level flags

Rebuild Codex runner invocation so approval and related top-level CLI flags are placed before the exec subcommand, matching the real Codex CLI contract.

## Scope

- In scope: Rebuild Codex runner invocation so approval and related top-level CLI flags are placed before the exec subcommand, matching the real Codex CLI contract.
- Out of scope: unrelated refactors not required for "Fix Codex adapter argv ordering for top-level flags".

## Plan

1. Inspect Codex adapter argv assembly and its tests against the real Codex CLI contract. 2. Move top-level flags such as approval/search before the exec subcommand. 3. Update adapter tests to lock the corrected ordering. 4. Verify with targeted tests and source builds.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts. 2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. 3. Confirm the Codex adapter now assembles top-level flags before the exec subcommand in the locked test expectations.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T19:47:34.872Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts; Result: pass; Evidence: all 6 codex adapter tests passed with the argv order locked to top-level approval flags before exec. Scope: packages/agentplane/src/runner/adapters/codex.ts and packages/agentplane/src/runner/adapters/codex.test.ts. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds completed successfully after the argv reorder. Scope: source build compatibility for the touched runner adapter code. Command: bunx prettier --check packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/codex.test.ts && bunx eslint packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/codex.test.ts; Result: pass; Evidence: formatting and lint passed on the touched files. Scope: style and static validation for the task diff.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T19:46:38.696Z, excerpt_hash=sha256:9717e58862b6e6c76a34c2fe2a7d085fa7f7d775519fd442a09e281e5dea7f3f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
