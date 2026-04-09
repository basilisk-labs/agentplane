---
id: "202604091725-H21SCP"
title: "Ignore dotfiles in watched runtime snapshots"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T17:41:25.489Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T17:46:37.218Z"
  updated_by: "CODER"
  note: "Verified targeted runtime-watch/dist-guard regressions and eslint; source-tree dotfiles no longer affect watched runtime snapshots or stale-dist freshness."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: exclude dotfile litter like .DS_Store from watched runtime snapshots so stale-dist manifests stop drifting across branches and machines for non-code filesystem noise."
events:
  -
    type: "status"
    at: "2026-04-09T17:41:30.192Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: exclude dotfile litter like .DS_Store from watched runtime snapshots so stale-dist manifests stop drifting across branches and machines for non-code filesystem noise."
  -
    type: "verify"
    at: "2026-04-09T17:46:37.218Z"
    author: "CODER"
    state: "ok"
    note: "Verified targeted runtime-watch/dist-guard regressions and eslint; source-tree dotfiles no longer affect watched runtime snapshots or stale-dist freshness."
doc_version: 3
doc_updated_at: "2026-04-09T17:46:37.225Z"
doc_updated_by: "CODER"
description: "Exclude junk dotfiles such as .DS_Store from watched runtime snapshot collection so stale-dist manifests do not drift across branches or machines because of filesystem litter."
sections:
  Summary: |-
    Ignore dotfiles in watched runtime snapshots
    
    Exclude junk dotfiles such as .DS_Store from watched runtime snapshot collection so stale-dist manifests do not drift across branches or machines because of filesystem litter.
  Scope: |-
    - In scope: Exclude junk dotfiles such as .DS_Store from watched runtime snapshot collection so stale-dist manifests do not drift across branches or machines because of filesystem litter.
    - Out of scope: unrelated refactors not required for "Ignore dotfiles in watched runtime snapshots".
  Plan: "1. Exclude junk dotfiles such as .DS_Store from watched runtime snapshot collection and comparison. 2. Add regression coverage proving dotfiles in watched runtime paths do not make dist appear stale. 3. Verify with targeted stale-dist/runtime-watch tests and lint."
  Verify Steps: |-
    1. Create or simulate dotfiles such as .DS_Store inside watched runtime paths and collect the runtime snapshot. Expected: the snapshot excludes those files from watched_runtime_files and snapshot hashing.
    2. Run targeted stale-dist/runtime-watch regression tests. Expected: dotfile litter inside src no longer marks the package build stale.
    3. Lint touched runtime-watch/dist-guard sources and tests. Expected: eslint exits 0 for the modified files.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T17:46:37.218Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified targeted runtime-watch/dist-guard regressions and eslint; source-tree dotfiles no longer affect watched runtime snapshots or stale-dist freshness.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T17:41:25.234Z, excerpt_hash=sha256:cc74f66ac0b55e070575dbc5202d0e7030f8877487fb0e38d215dd1b9732b6fb
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Ignore dotfiles in watched runtime snapshots

Exclude junk dotfiles such as .DS_Store from watched runtime snapshot collection so stale-dist manifests do not drift across branches or machines because of filesystem litter.

## Scope

- In scope: Exclude junk dotfiles such as .DS_Store from watched runtime snapshot collection so stale-dist manifests do not drift across branches or machines because of filesystem litter.
- Out of scope: unrelated refactors not required for "Ignore dotfiles in watched runtime snapshots".

## Plan

1. Exclude junk dotfiles such as .DS_Store from watched runtime snapshot collection and comparison. 2. Add regression coverage proving dotfiles in watched runtime paths do not make dist appear stale. 3. Verify with targeted stale-dist/runtime-watch tests and lint.

## Verify Steps

1. Create or simulate dotfiles such as .DS_Store inside watched runtime paths and collect the runtime snapshot. Expected: the snapshot excludes those files from watched_runtime_files and snapshot hashing.
2. Run targeted stale-dist/runtime-watch regression tests. Expected: dotfile litter inside src no longer marks the package build stale.
3. Lint touched runtime-watch/dist-guard sources and tests. Expected: eslint exits 0 for the modified files.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T17:46:37.218Z — VERIFY — ok

By: CODER

Note: Verified targeted runtime-watch/dist-guard regressions and eslint; source-tree dotfiles no longer affect watched runtime snapshots or stale-dist freshness.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T17:41:25.234Z, excerpt_hash=sha256:cc74f66ac0b55e070575dbc5202d0e7030f8877487fb0e38d215dd1b9732b6fb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
