---
id: "202603241541-R5QKYE"
title: "Require valid Codex result manifest for execute-mode success"
result_summary: "Codex success in execute mode now requires a valid result manifest; missing manifests fail deterministically while dry-run behavior stays unchanged."
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
  updated_at: "2026-03-24T15:42:06.503Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T15:49:35.708Z"
  updated_by: "CODER"
  note: "Verified: codex execute-mode now requires a valid result manifest; adapter and CLI regressions plus agentplane build passed."
commit:
  hash: "b62b35babed8edc8b3d9000bd30622c81d163189"
  message: "✅ R5QKYE code: done"
comments:
  -
    author: "CODER"
    body: "Start: tighten Codex execute-mode semantics so success requires an explicit valid result manifest instead of relying on exit code alone, while preserving dry-run behavior and existing runner artifacts."
  -
    author: "CODER"
    body: "Verified: codex execute-mode now refuses exit-zero runs without a valid result manifest, and the bootstrap prompt now requires writing result.json."
events:
  -
    type: "status"
    at: "2026-03-24T15:42:23.068Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tighten Codex execute-mode semantics so success requires an explicit valid result manifest instead of relying on exit code alone, while preserving dry-run behavior and existing runner artifacts."
  -
    type: "verify"
    at: "2026-03-24T15:49:35.708Z"
    author: "CODER"
    state: "ok"
    note: "Verified: codex execute-mode now requires a valid result manifest; adapter and CLI regressions plus agentplane build passed."
  -
    type: "status"
    at: "2026-03-24T15:49:49.405Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: codex execute-mode now refuses exit-zero runs without a valid result manifest, and the bootstrap prompt now requires writing result.json."
doc_version: 3
doc_updated_at: "2026-03-24T15:49:49.406Z"
doc_updated_by: "CODER"
description: "Make Codex runner success depend on a valid result manifest in execute mode instead of treating exit_code=0 as sufficient. Dry-run remains manifest-optional."
sections:
  Summary: |-
    Require valid Codex result manifest for execute-mode success
    
    Make Codex runner success depend on a valid result manifest in execute mode instead of treating exit_code=0 as sufficient. Dry-run remains manifest-optional.
  Scope: |-
    - In scope: Make Codex runner success depend on a valid result manifest in execute mode instead of treating exit_code=0 as sufficient. Dry-run remains manifest-optional.
    - Out of scope: unrelated refactors not required for "Require valid Codex result manifest for execute-mode success".
  Plan: |-
    1. Inspect the Codex execute-mode success path and identify every place where exit_code=0 is treated as sufficient without an explicit result manifest.
    2. Tighten the execute-mode contract so a missing or invalid Codex result manifest produces a deterministic failure while preserving dry-run behavior and existing artifacts.
    3. Add adapter and CLI regressions that prove execute-mode success now requires a valid manifest and rerun the smallest sufficient verification set.
  Verify Steps: |-
    1. bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
    2. bun run --filter=agentplane build
    3. Confirm execute-mode Codex success now requires a valid result manifest while dry-run semantics remain unchanged
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T15:49:35.708Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: codex execute-mode now requires a valid result manifest; adapter and CLI regressions plus agentplane build passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T15:42:23.071Z, excerpt_hash=sha256:641ee244eb9940e077fd69b28a9276d176c3f65d54253496ed2caf26e91b2477
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Require valid Codex result manifest for execute-mode success

Make Codex runner success depend on a valid result manifest in execute mode instead of treating exit_code=0 as sufficient. Dry-run remains manifest-optional.

## Scope

- In scope: Make Codex runner success depend on a valid result manifest in execute mode instead of treating exit_code=0 as sufficient. Dry-run remains manifest-optional.
- Out of scope: unrelated refactors not required for "Require valid Codex result manifest for execute-mode success".

## Plan

1. Inspect the Codex execute-mode success path and identify every place where exit_code=0 is treated as sufficient without an explicit result manifest.
2. Tighten the execute-mode contract so a missing or invalid Codex result manifest produces a deterministic failure while preserving dry-run behavior and existing artifacts.
3. Add adapter and CLI regressions that prove execute-mode success now requires a valid manifest and rerun the smallest sufficient verification set.

## Verify Steps

1. bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
2. bun run --filter=agentplane build
3. Confirm execute-mode Codex success now requires a valid result manifest while dry-run semantics remain unchanged

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T15:49:35.708Z — VERIFY — ok

By: CODER

Note: Verified: codex execute-mode now requires a valid result manifest; adapter and CLI regressions plus agentplane build passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T15:42:23.071Z, excerpt_hash=sha256:641ee244eb9940e077fd69b28a9276d176c3f65d54253496ed2caf26e91b2477

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
