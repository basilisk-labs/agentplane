---
id: "202605021412-Q2WGGA"
title: "Build bundled-runtime CLI artifact generator"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605021412-FDDWP8"
tags:
  - "code"
  - "distribution"
  - "release"
verify:
  - "bun test packages/agentplane/src/commands/release/*standalone* scripts/*standalone*"
  - "node scripts/<standalone-artifact-script>.mjs --check"
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T16:13:58.994Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T16:35:32.601Z"
  updated_by: "CODER"
  note: |-
    Command: agentplane task verify-show 202605021412-Q2WGGA
    Result: pass
    Evidence: Verify Steps loaded before final verification.
    Scope: task verification contract.
    
    Command: node scripts/generate-standalone-cli-assets.mjs --check
    Result: pass
    Evidence: standalone CLI assets check for v0.4.1 (5 assets).
    Scope: all contract targets with synthetic embedded runtime and offline layout validation.
    
    Command: bun test packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts
    Result: pass
    Evidence: 3 pass, 0 fail, 16 expect() calls; POSIX, Windows, and all-target check-mode coverage.
    Scope: archive layout, metadata, checksum manifest, wrappers, check-mode cleanup.
    
    Command: bun run docs:scripts:check
    Result: pass
    Evidence: scripts/README.md is up to date.
    Scope: package script documentation.
    
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy routing after code/script changes.
    
    Command: agentplane doctor
    Result: pass
    Evidence: doctor OK; errors=0 warnings=0.
    Scope: repository health for task worktree.
    
    Command: bunx eslint scripts/generate-standalone-cli-assets.mjs packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts
    Result: pass
    Evidence: no lint output after fixes.
    Scope: focused lint for new script/test.
    
    Command: bun run format:check
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: repository formatting.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement the standalone CLI asset generator and focused check-mode tests according to the approved bundled-runtime artifact contract."
events:
  -
    type: "status"
    at: "2026-05-02T16:14:56.913Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the standalone CLI asset generator and focused check-mode tests according to the approved bundled-runtime artifact contract."
  -
    type: "verify"
    at: "2026-05-02T16:35:32.601Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: agentplane task verify-show 202605021412-Q2WGGA
      Result: pass
      Evidence: Verify Steps loaded before final verification.
      Scope: task verification contract.
      
      Command: node scripts/generate-standalone-cli-assets.mjs --check
      Result: pass
      Evidence: standalone CLI assets check for v0.4.1 (5 assets).
      Scope: all contract targets with synthetic embedded runtime and offline layout validation.
      
      Command: bun test packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts
      Result: pass
      Evidence: 3 pass, 0 fail, 16 expect() calls; POSIX, Windows, and all-target check-mode coverage.
      Scope: archive layout, metadata, checksum manifest, wrappers, check-mode cleanup.
      
      Command: bun run docs:scripts:check
      Result: pass
      Evidence: scripts/README.md is up to date.
      Scope: package script documentation.
      
      Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK.
      Scope: policy routing after code/script changes.
      
      Command: agentplane doctor
      Result: pass
      Evidence: doctor OK; errors=0 warnings=0.
      Scope: repository health for task worktree.
      
      Command: bunx eslint scripts/generate-standalone-cli-assets.mjs packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts
      Result: pass
      Evidence: no lint output after fixes.
      Scope: focused lint for new script/test.
      
      Command: bun run format:check
      Result: pass
      Evidence: All matched files use Prettier code style.
      Scope: repository formatting.
doc_version: 3
doc_updated_at: "2026-05-02T16:35:32.621Z"
doc_updated_by: "CODER"
description: "Implement a deterministic script that assembles AgentPlane CLI archives with an embedded Node runtime, installed production dependencies, package assets, wrapper entrypoints, version metadata, and sha256 outputs."
sections:
  Summary: |-
    Build bundled-runtime CLI artifact generator
    
    Implement a deterministic script that assembles AgentPlane CLI archives with an embedded Node runtime, installed production dependencies, package assets, wrapper entrypoints, version metadata, and sha256 outputs.
  Scope: |-
    - In scope: Implement a deterministic script that assembles AgentPlane CLI archives with an embedded Node runtime, installed production dependencies, package assets, wrapper entrypoints, version metadata, and sha256 outputs.
    - Out of scope: unrelated refactors not required for "Build bundled-runtime CLI artifact generator".
  Plan: |-
    Build a standalone CLI asset generator as a focused release script.
    
    Scope:
    - Add scripts/generate-standalone-cli-assets.mjs.
    - Generate deterministic platform archives for the contract targets with wrapper entrypoints, VERSION, manifest.json, package payload, checksum records, and JSON evidence.
    - Default real mode downloads and checksum-verifies official Node archives and runs npm production install inside the packaged CLI payload.
    - Check mode uses a synthetic embedded runtime and skips dependency installation so CI can validate layout/metadata without network.
    - Add package scripts and focused tests for check-mode outputs and archive layout.
    
    Verification:
    - agentplane task verify-show 202605021412-Q2WGGA
    - node scripts/generate-standalone-cli-assets.mjs --check
    - bun test packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts
    - node .agentplane/policy/check-routing.mjs
    - agentplane doctor
  Verify Steps: |-
    1. Run `node scripts/generate-standalone-cli-assets.mjs --check`. Expected: it builds all contract target archives in a temporary directory with synthetic embedded runtimes, validates archive layout, and exits successfully without network.
    2. Run `bun test packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts`. Expected: focused tests confirm archive layout, metadata, checksums, wrapper entrypoints, and check-mode behavior.
    3. Run `bun run docs:scripts:check`. Expected: package script documentation remains fresh after adding release scripts.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
    5. Run `agentplane doctor`. Expected: repository health checks pass.
    6. Review changed files and generated check output. Expected: implementation stays inside standalone generator, package scripts/docs, tests, and task artifacts.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T16:35:32.601Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane task verify-show 202605021412-Q2WGGA
    Result: pass
    Evidence: Verify Steps loaded before final verification.
    Scope: task verification contract.
    
    Command: node scripts/generate-standalone-cli-assets.mjs --check
    Result: pass
    Evidence: standalone CLI assets check for v0.4.1 (5 assets).
    Scope: all contract targets with synthetic embedded runtime and offline layout validation.
    
    Command: bun test packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts
    Result: pass
    Evidence: 3 pass, 0 fail, 16 expect() calls; POSIX, Windows, and all-target check-mode coverage.
    Scope: archive layout, metadata, checksum manifest, wrappers, check-mode cleanup.
    
    Command: bun run docs:scripts:check
    Result: pass
    Evidence: scripts/README.md is up to date.
    Scope: package script documentation.
    
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy routing after code/script changes.
    
    Command: agentplane doctor
    Result: pass
    Evidence: doctor OK; errors=0 warnings=0.
    Scope: repository health for task worktree.
    
    Command: bunx eslint scripts/generate-standalone-cli-assets.mjs packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts
    Result: pass
    Evidence: no lint output after fixes.
    Scope: focused lint for new script/test.
    
    Command: bun run format:check
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: repository formatting.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T16:15:11.710Z, excerpt_hash=sha256:907781598cdc99113e7ba70be9dd4c68a0a7635efe29f3341c081cf2fc068bcb
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Build bundled-runtime CLI artifact generator

Implement a deterministic script that assembles AgentPlane CLI archives with an embedded Node runtime, installed production dependencies, package assets, wrapper entrypoints, version metadata, and sha256 outputs.

## Scope

- In scope: Implement a deterministic script that assembles AgentPlane CLI archives with an embedded Node runtime, installed production dependencies, package assets, wrapper entrypoints, version metadata, and sha256 outputs.
- Out of scope: unrelated refactors not required for "Build bundled-runtime CLI artifact generator".

## Plan

Build a standalone CLI asset generator as a focused release script.

Scope:
- Add scripts/generate-standalone-cli-assets.mjs.
- Generate deterministic platform archives for the contract targets with wrapper entrypoints, VERSION, manifest.json, package payload, checksum records, and JSON evidence.
- Default real mode downloads and checksum-verifies official Node archives and runs npm production install inside the packaged CLI payload.
- Check mode uses a synthetic embedded runtime and skips dependency installation so CI can validate layout/metadata without network.
- Add package scripts and focused tests for check-mode outputs and archive layout.

Verification:
- agentplane task verify-show 202605021412-Q2WGGA
- node scripts/generate-standalone-cli-assets.mjs --check
- bun test packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts
- node .agentplane/policy/check-routing.mjs
- agentplane doctor

## Verify Steps

1. Run `node scripts/generate-standalone-cli-assets.mjs --check`. Expected: it builds all contract target archives in a temporary directory with synthetic embedded runtimes, validates archive layout, and exits successfully without network.
2. Run `bun test packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts`. Expected: focused tests confirm archive layout, metadata, checksums, wrapper entrypoints, and check-mode behavior.
3. Run `bun run docs:scripts:check`. Expected: package script documentation remains fresh after adding release scripts.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
5. Run `agentplane doctor`. Expected: repository health checks pass.
6. Review changed files and generated check output. Expected: implementation stays inside standalone generator, package scripts/docs, tests, and task artifacts.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T16:35:32.601Z — VERIFY — ok

By: CODER

Note: Command: agentplane task verify-show 202605021412-Q2WGGA
Result: pass
Evidence: Verify Steps loaded before final verification.
Scope: task verification contract.

Command: node scripts/generate-standalone-cli-assets.mjs --check
Result: pass
Evidence: standalone CLI assets check for v0.4.1 (5 assets).
Scope: all contract targets with synthetic embedded runtime and offline layout validation.

Command: bun test packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts
Result: pass
Evidence: 3 pass, 0 fail, 16 expect() calls; POSIX, Windows, and all-target check-mode coverage.
Scope: archive layout, metadata, checksum manifest, wrappers, check-mode cleanup.

Command: bun run docs:scripts:check
Result: pass
Evidence: scripts/README.md is up to date.
Scope: package script documentation.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy routing after code/script changes.

Command: agentplane doctor
Result: pass
Evidence: doctor OK; errors=0 warnings=0.
Scope: repository health for task worktree.

Command: bunx eslint scripts/generate-standalone-cli-assets.mjs packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts
Result: pass
Evidence: no lint output after fixes.
Scope: focused lint for new script/test.

Command: bun run format:check
Result: pass
Evidence: All matched files use Prettier code style.
Scope: repository formatting.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T16:15:11.710Z, excerpt_hash=sha256:907781598cdc99113e7ba70be9dd4c68a0a7635efe29f3341c081cf2fc068bcb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
