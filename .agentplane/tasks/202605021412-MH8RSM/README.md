---
id: "202605021412-MH8RSM"
title: "Switch Scoop and setup-action to standalone assets"
result_summary: "Merged via PR #756."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605021412-3KA8WV"
tags:
  - "code"
  - "release"
  - "scoop"
  - "setup-action"
verify:
  - "bun run release:scoop:check"
  - "bun run release:setup-action:check"
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T17:38:56.650Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T17:43:57.303Z"
  updated_by: "CODER"
  note: "Passed: agentplane task verify-show 202605021412-MH8RSM; bun run release:scoop:check; bun run release:setup-action:check; bun test packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts; bunx eslint scripts/render-scoop-manifest.mjs scripts/render-setup-agentplane-action.mjs packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor."
commit:
  hash: "51ed52d6df7098ed0bc636d5a4e71065bd903aca"
  message: "release: Switch Scoop and setup action to standalone assets (MH8RSM)"
comments:
  -
    author: "CODER"
    body: "Start: Switch Scoop and setup-agentplane generated artifacts to standalone bundled-runtime archives."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #756 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-02T17:39:32.064Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Switch Scoop and setup-agentplane generated artifacts to standalone bundled-runtime archives."
  -
    type: "verify"
    at: "2026-05-02T17:43:57.303Z"
    author: "CODER"
    state: "ok"
    note: "Passed: agentplane task verify-show 202605021412-MH8RSM; bun run release:scoop:check; bun run release:setup-action:check; bun test packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts; bunx eslint scripts/render-scoop-manifest.mjs scripts/render-setup-agentplane-action.mjs packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor."
  -
    type: "status"
    at: "2026-05-02T17:47:05.593Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #756 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-02T17:47:05.599Z"
doc_updated_by: "INTEGRATOR"
description: "Update Scoop manifest rendering and setup-agentplane action generation to prefer bundled-runtime archives, remove npm/Node install assumptions, and keep explicit fallback or evidence when a platform asset is missing."
sections:
  Summary: |-
    Switch Scoop and setup-action to standalone assets
    
    Update Scoop manifest rendering and setup-agentplane action generation to prefer bundled-runtime archives, remove npm/Node install assumptions, and keep explicit fallback or evidence when a platform asset is missing.
  Scope: |-
    - In scope: Update Scoop manifest rendering and setup-agentplane action generation to prefer bundled-runtime archives, remove npm/Node install assumptions, and keep explicit fallback or evidence when a platform asset is missing.
    - Out of scope: unrelated refactors not required for "Switch Scoop and setup-action to standalone assets".
  Plan: |-
    Switch Scoop and setup-agentplane renderers to standalone assets.
    
    Scope:
    - Render Scoop manifest from win32-x64 standalone asset, without nodejs dependency or npm tarball extraction.
    - Render setup-agentplane action that resolves runner OS/arch to standalone archives, verifies SHA256, extracts, and adds bundled bin to PATH.
    - Keep check mode deterministic via --standalone-check-mode.
    - Add focused renderer tests for Scoop and setup-agentplane standalone behavior.
    
    Verification:
    - agentplane task verify-show 202605021412-MH8RSM
    - bun run release:scoop:check
    - bun run release:setup-action:check
    - bun test packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts
    - node .agentplane/policy/check-routing.mjs
    - agentplane doctor
  Verify Steps: |-
    1. Run `bun run release:scoop:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run release:setup-action:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T17:43:57.303Z — VERIFY — ok
    
    By: CODER
    
    Note: Passed: agentplane task verify-show 202605021412-MH8RSM; bun run release:scoop:check; bun run release:setup-action:check; bun test packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts; bunx eslint scripts/render-scoop-manifest.mjs scripts/render-setup-agentplane-action.mjs packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T17:39:32.064Z, excerpt_hash=sha256:a20b14481a99a0245c6949b3a4f37fe42f14cdee89fc9aa4ffe14585b7f7c0a1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Switch Scoop and setup-action to standalone assets

Update Scoop manifest rendering and setup-agentplane action generation to prefer bundled-runtime archives, remove npm/Node install assumptions, and keep explicit fallback or evidence when a platform asset is missing.

## Scope

- In scope: Update Scoop manifest rendering and setup-agentplane action generation to prefer bundled-runtime archives, remove npm/Node install assumptions, and keep explicit fallback or evidence when a platform asset is missing.
- Out of scope: unrelated refactors not required for "Switch Scoop and setup-action to standalone assets".

## Plan

Switch Scoop and setup-agentplane renderers to standalone assets.

Scope:
- Render Scoop manifest from win32-x64 standalone asset, without nodejs dependency or npm tarball extraction.
- Render setup-agentplane action that resolves runner OS/arch to standalone archives, verifies SHA256, extracts, and adds bundled bin to PATH.
- Keep check mode deterministic via --standalone-check-mode.
- Add focused renderer tests for Scoop and setup-agentplane standalone behavior.

Verification:
- agentplane task verify-show 202605021412-MH8RSM
- bun run release:scoop:check
- bun run release:setup-action:check
- bun test packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts
- node .agentplane/policy/check-routing.mjs
- agentplane doctor

## Verify Steps

1. Run `bun run release:scoop:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run release:setup-action:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T17:43:57.303Z — VERIFY — ok

By: CODER

Note: Passed: agentplane task verify-show 202605021412-MH8RSM; bun run release:scoop:check; bun run release:setup-action:check; bun test packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts; bunx eslint scripts/render-scoop-manifest.mjs scripts/render-setup-agentplane-action.mjs packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T17:39:32.064Z, excerpt_hash=sha256:a20b14481a99a0245c6949b3a4f37fe42f14cdee89fc9aa4ffe14585b7f7c0a1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
