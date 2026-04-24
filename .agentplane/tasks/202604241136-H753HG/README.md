---
id: "202604241136-H753HG"
title: "v0.3 freeze A3: whitelist agentplane package files"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604241136-CKSK2S"
tags:
  - "build"
  - "release"
  - "v0.3"
verify:
  - "npm pack --dry-run"
  - "npm pack --dry-run --ignore-scripts"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T11:45:52.625Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from user-supplied v0.3 freeze audit plan; whitelist keeps dist build manifest because current install verification tooling depends on it."
verification:
  state: "ok"
  updated_at: "2026-04-24T11:46:57.142Z"
  updated_by: "CODER"
  note: "Command: npm pack --dry-run --ignore-scripts --json in packages/agentplane | Result: pass; entryCount=46, size=356263 bytes, dist=[.build-manifest.json, cli.d.ts, cli.js], no bin .d.ts and no map files. Command: npm pack --dry-run --json in packages/agentplane | Result: pass; prepack build completed and entryCount=46, size=356271 bytes. Command: find packages/agentplane/dist -type f -name '*.js' | sort | Result: pass; only packages/agentplane/dist/cli.js. Command: git diff --check | Result: pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement A3 only by replacing broad package files entries with explicit runtime/publish artifacts, retaining dist build manifest for install verification."
events:
  -
    type: "status"
    at: "2026-04-24T11:45:58.575Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement A3 only by replacing broad package files entries with explicit runtime/publish artifacts, retaining dist build manifest for install verification."
  -
    type: "verify"
    at: "2026-04-24T11:46:57.142Z"
    author: "CODER"
    state: "ok"
    note: "Command: npm pack --dry-run --ignore-scripts --json in packages/agentplane | Result: pass; entryCount=46, size=356263 bytes, dist=[.build-manifest.json, cli.d.ts, cli.js], no bin .d.ts and no map files. Command: npm pack --dry-run --json in packages/agentplane | Result: pass; prepack build completed and entryCount=46, size=356271 bytes. Command: find packages/agentplane/dist -type f -name '*.js' | sort | Result: pass; only packages/agentplane/dist/cli.js. Command: git diff --check | Result: pass."
doc_version: 3
doc_updated_at: "2026-04-24T11:46:57.147Z"
doc_updated_by: "CODER"
description: "Tighten packages/agentplane package files so the npm tarball contains only required bin, dist, assets, README, and LICENSE artifacts."
sections:
  Summary: |-
    v0.3 freeze A3: whitelist agentplane package files
    
    Tighten packages/agentplane package files so the npm tarball contains only required bin, dist, assets, README, and LICENSE artifacts.
  Scope: |-
    - In scope: Tighten packages/agentplane package files so the npm tarball contains only required bin, dist, assets, README, and LICENSE artifacts.
    - Out of scope: unrelated refactors not required for "v0.3 freeze A3: whitelist agentplane package files".
  Plan: |-
    Release plan: version=0.3.25, tag=none, scope=agentplane package files whitelist only.
    1. Confirm A1/A2 are DONE and tracked tree is clean except unrelated untracked audit markdown.
    2. Inspect bin runtime imports and dist manifest usage before tightening files[].
    3. Replace broad files entries with explicit bin JS files, dist/cli.js, dist/cli.d.ts, dist/.build-manifest.json, assets, README.md, and LICENSE.
    4. Run npm pack dry-runs and confirm .d.ts.map/.js.map are absent and bin/*.d.ts are excluded.
    5. Record package size/file-count evidence and finish only A3 scope.
  Verify Steps: |-
    1. Run `npm pack --dry-run --ignore-scripts` from `packages/agentplane`. Expected: tarball file list contains only explicit package files, no `dist/**/*.d.ts.map`, no `dist/**/*.js.map`, and no `bin/*.d.ts`.
    2. Run `npm pack --dry-run` from `packages/agentplane`. Expected: prepack build succeeds and the same whitelist is respected after build.
    3. Run `find packages/agentplane/dist -type f -name '*.js' | sort`. Expected: only `packages/agentplane/dist/cli.js` exists as runtime JS after A1.
    4. Run `git diff --check`. Expected: no whitespace errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T11:46:57.142Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: npm pack --dry-run --ignore-scripts --json in packages/agentplane | Result: pass; entryCount=46, size=356263 bytes, dist=[.build-manifest.json, cli.d.ts, cli.js], no bin .d.ts and no map files. Command: npm pack --dry-run --json in packages/agentplane | Result: pass; prepack build completed and entryCount=46, size=356271 bytes. Command: find packages/agentplane/dist -type f -name '*.js' | sort | Result: pass; only packages/agentplane/dist/cli.js. Command: git diff --check | Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T11:45:58.588Z, excerpt_hash=sha256:80047fa7f5710e505f0ef3dba14cbb134dc3dab725916386256ed3b08c03eddf
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

v0.3 freeze A3: whitelist agentplane package files

Tighten packages/agentplane package files so the npm tarball contains only required bin, dist, assets, README, and LICENSE artifacts.

## Scope

- In scope: Tighten packages/agentplane package files so the npm tarball contains only required bin, dist, assets, README, and LICENSE artifacts.
- Out of scope: unrelated refactors not required for "v0.3 freeze A3: whitelist agentplane package files".

## Plan

Release plan: version=0.3.25, tag=none, scope=agentplane package files whitelist only.
1. Confirm A1/A2 are DONE and tracked tree is clean except unrelated untracked audit markdown.
2. Inspect bin runtime imports and dist manifest usage before tightening files[].
3. Replace broad files entries with explicit bin JS files, dist/cli.js, dist/cli.d.ts, dist/.build-manifest.json, assets, README.md, and LICENSE.
4. Run npm pack dry-runs and confirm .d.ts.map/.js.map are absent and bin/*.d.ts are excluded.
5. Record package size/file-count evidence and finish only A3 scope.

## Verify Steps

1. Run `npm pack --dry-run --ignore-scripts` from `packages/agentplane`. Expected: tarball file list contains only explicit package files, no `dist/**/*.d.ts.map`, no `dist/**/*.js.map`, and no `bin/*.d.ts`.
2. Run `npm pack --dry-run` from `packages/agentplane`. Expected: prepack build succeeds and the same whitelist is respected after build.
3. Run `find packages/agentplane/dist -type f -name '*.js' | sort`. Expected: only `packages/agentplane/dist/cli.js` exists as runtime JS after A1.
4. Run `git diff --check`. Expected: no whitespace errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T11:46:57.142Z — VERIFY — ok

By: CODER

Note: Command: npm pack --dry-run --ignore-scripts --json in packages/agentplane | Result: pass; entryCount=46, size=356263 bytes, dist=[.build-manifest.json, cli.d.ts, cli.js], no bin .d.ts and no map files. Command: npm pack --dry-run --json in packages/agentplane | Result: pass; prepack build completed and entryCount=46, size=356271 bytes. Command: find packages/agentplane/dist -type f -name '*.js' | sort | Result: pass; only packages/agentplane/dist/cli.js. Command: git diff --check | Result: pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T11:45:58.588Z, excerpt_hash=sha256:80047fa7f5710e505f0ef3dba14cbb134dc3dab725916386256ed3b08c03eddf

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
