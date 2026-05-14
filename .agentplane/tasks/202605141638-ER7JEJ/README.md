---
id: "202605141638-ER7JEJ"
title: "Hotfix v0.6 audit correctness regressions"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T16:40:31.843Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T16:48:40.957Z"
  updated_by: "CODER"
  note: "Command: rg -n '\"0\\.4\\.2\"|version: \"0\\.4\\.2\"|Math\\.random\\(\\)\\.toString\\(36\\).*slice\\(2, 8\\)|pull\\.lastCheckedAt \\?\\? new Date' packages/agentplane/src/commands/acr packages/agentplane/src/backends/task-backend packages/agentplane/src/cli.ts packages/agentplane/src/cli/fs-utils.ts packages/agentplane/src/commands/branch/internal/archive-pr.ts; Result: pass; Evidence: no scoped stale ACR version, Math.random backup suffix, or client-now pull freshness matches remain. Scope: audit hotfix regressions. Command: bun run test:project -- agentplane packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/commands/release/apply.preflight.test.ts packages/agentplane/src/commands/acr/acr.command.test.ts; Result: pass; Evidence: 3 files, 28 tests passed. Scope: cloud state, release-note preflight, ACR semantics. Command: bun run lint:core -- changed files; Result: pass; Evidence: eslint completed with exit 0. Scope: changed source/test/script files. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Scope: agentplane package types. Command: node scripts/release/check-release-notes.mjs --tag v0.6.0 and fenced-bullet smoke; Result: pass; Evidence: v0.6.0 accepted and fenced bullets fail min-bullet smoke as expected. Scope: MJS release-note checker. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing gate."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved v0.6 audit hotfix scope in the task worktree, covering ACR version truthfulness, cloud state durability, release-note checker accuracy, CLI rejection output, crypto-safe backup suffixes, and pull freshness fallback without widening into larger cloud semantics refactors."
events:
  -
    type: "status"
    at: "2026-05-14T16:41:27.016Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved v0.6 audit hotfix scope in the task worktree, covering ACR version truthfulness, cloud state durability, release-note checker accuracy, CLI rejection output, crypto-safe backup suffixes, and pull freshness fallback without widening into larger cloud semantics refactors."
  -
    type: "verify"
    at: "2026-05-14T16:48:40.957Z"
    author: "CODER"
    state: "ok"
    note: "Command: rg -n '\"0\\.4\\.2\"|version: \"0\\.4\\.2\"|Math\\.random\\(\\)\\.toString\\(36\\).*slice\\(2, 8\\)|pull\\.lastCheckedAt \\?\\? new Date' packages/agentplane/src/commands/acr packages/agentplane/src/backends/task-backend packages/agentplane/src/cli.ts packages/agentplane/src/cli/fs-utils.ts packages/agentplane/src/commands/branch/internal/archive-pr.ts; Result: pass; Evidence: no scoped stale ACR version, Math.random backup suffix, or client-now pull freshness matches remain. Scope: audit hotfix regressions. Command: bun run test:project -- agentplane packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/commands/release/apply.preflight.test.ts packages/agentplane/src/commands/acr/acr.command.test.ts; Result: pass; Evidence: 3 files, 28 tests passed. Scope: cloud state, release-note preflight, ACR semantics. Command: bun run lint:core -- changed files; Result: pass; Evidence: eslint completed with exit 0. Scope: changed source/test/script files. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Scope: agentplane package types. Command: node scripts/release/check-release-notes.mjs --tag v0.6.0 and fenced-bullet smoke; Result: pass; Evidence: v0.6.0 accepted and fenced bullets fail min-bullet smoke as expected. Scope: MJS release-note checker. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing gate."
doc_version: 3
doc_updated_at: "2026-05-14T16:48:40.965Z"
doc_updated_by: "CODER"
description: "Fix the low-risk v0.6 audit regressions that have narrow verification boundaries: ACR producer/toolchain version must match the package version, cloud backend state writes must be atomic and recover from malformed state JSON, release-note bullet counting must ignore fenced code blocks and use a strict release tag regex, CLI entrypoint must report unexpected rejections, random backup suffixes must use crypto randomness, and pull freshness must avoid client-now fallback."
sections:
  Summary: |-
    Hotfix v0.6 audit correctness regressions
    
    Fix the low-risk v0.6 audit regressions that have narrow verification boundaries: ACR producer/toolchain version must match the package version, cloud backend state writes must be atomic and recover from malformed state JSON, release-note bullet counting must ignore fenced code blocks and use a strict release tag regex, CLI entrypoint must report unexpected rejections, random backup suffixes must use crypto randomness, and pull freshness must avoid client-now fallback.
  Scope: |-
    - In scope: Fix the low-risk v0.6 audit regressions that have narrow verification boundaries: ACR producer/toolchain version must match the package version, cloud backend state writes must be atomic and recover from malformed state JSON, release-note bullet counting must ignore fenced code blocks and use a strict release tag regex, CLI entrypoint must report unexpected rejections, random backup suffixes must use crypto randomness, and pull freshness must avoid client-now fallback.
    - Out of scope: unrelated refactors not required for "Hotfix v0.6 audit correctness regressions".
  Plan: "Fix narrow v0.6 audit regressions in one branch_pr worktree. Scope: ACR generator and tests, cloud backend state persistence, release-note checker, CLI entrypoint rejection handling, crypto-safe backup suffixes, and pull freshness fallback. Out of scope: cloud pending-push semantics, remote-only/deletion pull behavior, full release-note SSOT refactor, broad isRecord migration, and schema canonicalization."
  Verify Steps: "1. Run rg -n '\"0\\.4\\.2\"' packages scripts and confirm no stale ACR/toolchain version literals remain except unrelated historical text if any. 2. Run targeted tests covering ACR generation/schema fixtures, cloud backend state read/write corruption handling, release-note validation, CLI entrypoint behavior, and backup suffix generation where tests exist or are added. 3. Run bun run lint:core -- changed source/test files. 4. Run node .agentplane/policy/check-routing.mjs. 5. Run agentplane task verify-show 202605141638-ER7JEJ before final verification."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T16:48:40.957Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: rg -n '"0\.4\.2"|version: "0\.4\.2"|Math\.random\(\)\.toString\(36\).*slice\(2, 8\)|pull\.lastCheckedAt \?\? new Date' packages/agentplane/src/commands/acr packages/agentplane/src/backends/task-backend packages/agentplane/src/cli.ts packages/agentplane/src/cli/fs-utils.ts packages/agentplane/src/commands/branch/internal/archive-pr.ts; Result: pass; Evidence: no scoped stale ACR version, Math.random backup suffix, or client-now pull freshness matches remain. Scope: audit hotfix regressions. Command: bun run test:project -- agentplane packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/commands/release/apply.preflight.test.ts packages/agentplane/src/commands/acr/acr.command.test.ts; Result: pass; Evidence: 3 files, 28 tests passed. Scope: cloud state, release-note preflight, ACR semantics. Command: bun run lint:core -- changed files; Result: pass; Evidence: eslint completed with exit 0. Scope: changed source/test/script files. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Scope: agentplane package types. Command: node scripts/release/check-release-notes.mjs --tag v0.6.0 and fenced-bullet smoke; Result: pass; Evidence: v0.6.0 accepted and fenced bullets fail min-bullet smoke as expected. Scope: MJS release-note checker. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing gate.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T16:41:27.016Z, excerpt_hash=sha256:79328cc5b9c45a557d35719ffe010e9d767b6ad309b1865d5e49b37d9b3e3321
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141638-ER7JEJ-v06-audit-hotfix/.agentplane/tasks/202605141638-ER7JEJ/blueprint/resolved-snapshot.json
    - old_digest: 321095422c48a87783674539511cd79e3e920d29c3bda7c9f06657f869d6adb1
    - current_digest: 321095422c48a87783674539511cd79e3e920d29c3bda7c9f06657f869d6adb1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141638-ER7JEJ
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Hotfix v0.6 audit correctness regressions

Fix the low-risk v0.6 audit regressions that have narrow verification boundaries: ACR producer/toolchain version must match the package version, cloud backend state writes must be atomic and recover from malformed state JSON, release-note bullet counting must ignore fenced code blocks and use a strict release tag regex, CLI entrypoint must report unexpected rejections, random backup suffixes must use crypto randomness, and pull freshness must avoid client-now fallback.

## Scope

- In scope: Fix the low-risk v0.6 audit regressions that have narrow verification boundaries: ACR producer/toolchain version must match the package version, cloud backend state writes must be atomic and recover from malformed state JSON, release-note bullet counting must ignore fenced code blocks and use a strict release tag regex, CLI entrypoint must report unexpected rejections, random backup suffixes must use crypto randomness, and pull freshness must avoid client-now fallback.
- Out of scope: unrelated refactors not required for "Hotfix v0.6 audit correctness regressions".

## Plan

Fix narrow v0.6 audit regressions in one branch_pr worktree. Scope: ACR generator and tests, cloud backend state persistence, release-note checker, CLI entrypoint rejection handling, crypto-safe backup suffixes, and pull freshness fallback. Out of scope: cloud pending-push semantics, remote-only/deletion pull behavior, full release-note SSOT refactor, broad isRecord migration, and schema canonicalization.

## Verify Steps

1. Run rg -n '"0\.4\.2"' packages scripts and confirm no stale ACR/toolchain version literals remain except unrelated historical text if any. 2. Run targeted tests covering ACR generation/schema fixtures, cloud backend state read/write corruption handling, release-note validation, CLI entrypoint behavior, and backup suffix generation where tests exist or are added. 3. Run bun run lint:core -- changed source/test files. 4. Run node .agentplane/policy/check-routing.mjs. 5. Run agentplane task verify-show 202605141638-ER7JEJ before final verification.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T16:48:40.957Z — VERIFY — ok

By: CODER

Note: Command: rg -n '"0\.4\.2"|version: "0\.4\.2"|Math\.random\(\)\.toString\(36\).*slice\(2, 8\)|pull\.lastCheckedAt \?\? new Date' packages/agentplane/src/commands/acr packages/agentplane/src/backends/task-backend packages/agentplane/src/cli.ts packages/agentplane/src/cli/fs-utils.ts packages/agentplane/src/commands/branch/internal/archive-pr.ts; Result: pass; Evidence: no scoped stale ACR version, Math.random backup suffix, or client-now pull freshness matches remain. Scope: audit hotfix regressions. Command: bun run test:project -- agentplane packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/commands/release/apply.preflight.test.ts packages/agentplane/src/commands/acr/acr.command.test.ts; Result: pass; Evidence: 3 files, 28 tests passed. Scope: cloud state, release-note preflight, ACR semantics. Command: bun run lint:core -- changed files; Result: pass; Evidence: eslint completed with exit 0. Scope: changed source/test/script files. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Scope: agentplane package types. Command: node scripts/release/check-release-notes.mjs --tag v0.6.0 and fenced-bullet smoke; Result: pass; Evidence: v0.6.0 accepted and fenced bullets fail min-bullet smoke as expected. Scope: MJS release-note checker. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing gate.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T16:41:27.016Z, excerpt_hash=sha256:79328cc5b9c45a557d35719ffe010e9d767b6ad309b1865d5e49b37d9b3e3321

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141638-ER7JEJ-v06-audit-hotfix/.agentplane/tasks/202605141638-ER7JEJ/blueprint/resolved-snapshot.json
- old_digest: 321095422c48a87783674539511cd79e3e920d29c3bda7c9f06657f869d6adb1
- current_digest: 321095422c48a87783674539511cd79e3e920d29c3bda7c9f06657f869d6adb1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141638-ER7JEJ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
