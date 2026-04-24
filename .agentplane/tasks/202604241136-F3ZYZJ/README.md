---
id: "202604241136-F3ZYZJ"
title: "v0.3 freeze A1: prune agentplane package JS before bundling"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "build"
  - "release"
  - "v0.3"
verify:
  - "bun run --filter=agentplane build"
  - "find packages/agentplane/dist -type f | wc -l"
  - "rg -n 'agentplane/dist' packages --glob '*.ts'"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T11:38:31.842Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from user-supplied v0.3 freeze audit plan; scope limited to A1 build:bundle prune-js change."
verification:
  state: "ok"
  updated_at: "2026-04-24T11:40:42.920Z"
  updated_by: "CODER"
  note: "Command: rg -n 'agentplane/dist' packages --glob '*.ts' | Result: pass with reviewed non-import path fixture in branch/work-start.materialize.ts. Command: bun run --filter=agentplane build | Result: pass; build runs prune-package-js before tsup and emits dist/cli.js. Command: find packages/agentplane/dist -type f | wc -l | Result: pass; count 1248, with only one JS runtime file and zero JS maps; declarations remain for later A3 whitelist work. Command: git diff --check | Result: pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement A1 only by adding the existing prune-package-js step before tsup in agentplane build:bundle, then verify package build output and deep dist imports."
events:
  -
    type: "status"
    at: "2026-04-24T11:38:36.009Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement A1 only by adding the existing prune-package-js step before tsup in agentplane build:bundle, then verify package build output and deep dist imports."
  -
    type: "verify"
    at: "2026-04-24T11:40:42.920Z"
    author: "CODER"
    state: "ok"
    note: "Command: rg -n 'agentplane/dist' packages --glob '*.ts' | Result: pass with reviewed non-import path fixture in branch/work-start.materialize.ts. Command: bun run --filter=agentplane build | Result: pass; build runs prune-package-js before tsup and emits dist/cli.js. Command: find packages/agentplane/dist -type f | wc -l | Result: pass; count 1248, with only one JS runtime file and zero JS maps; declarations remain for later A3 whitelist work. Command: git diff --check | Result: pass."
doc_version: 3
doc_updated_at: "2026-04-24T11:40:42.954Z"
doc_updated_by: "CODER"
description: "Add prune-package-js to the agentplane build:bundle path and verify the publish dist runtime surface shrinks without breaking the tsup CLI bundle."
sections:
  Summary: |-
    v0.3 freeze A1: prune agentplane package JS before bundling
    
    Add prune-package-js to the agentplane build:bundle path and verify the publish dist runtime surface shrinks without breaking the tsup CLI bundle.
  Scope: |-
    - In scope: Add prune-package-js to the agentplane build:bundle path and verify the publish dist runtime surface shrinks without breaking the tsup CLI bundle.
    - Out of scope: unrelated refactors not required for "v0.3 freeze A1: prune agentplane package JS before bundling".
  Plan: |-
    Release plan: version=0.3.25, tag=none, scope=package build artifact only.
    1. Confirm tracked tree is clean and inspect current agentplane/core package build patterns.
    2. Add scripts/prune-package-js.mjs dist before tsup in packages/agentplane build:bundle.
    3. Verify no repo source imports agentplane/dist deep paths.
    4. Run the package build and compare dist file count/runtime files.
    5. Record verification evidence and finish only this A1 scope.
  Verify Steps: |-
    1. Run `rg -n 'agentplane/dist' packages --glob '*.ts'`. Expected: no deep runtime import; path string fixtures are reviewed and documented if present.
    2. Run `bun run --filter=agentplane build`. Expected: build succeeds with prune-package-js before tsup.
    3. Run `find packages/agentplane/dist -type f | wc -l` and inspect top-level dist files. Expected: runtime .js files are pruned before tsup and only the bundled CLI runtime .js remains; declaration files may remain for A1, with tighter package whitelist deferred to A3.
    4. Run `git diff --check`. Expected: no whitespace errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T11:40:42.920Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: rg -n 'agentplane/dist' packages --glob '*.ts' | Result: pass with reviewed non-import path fixture in branch/work-start.materialize.ts. Command: bun run --filter=agentplane build | Result: pass; build runs prune-package-js before tsup and emits dist/cli.js. Command: find packages/agentplane/dist -type f | wc -l | Result: pass; count 1248, with only one JS runtime file and zero JS maps; declarations remain for later A3 whitelist work. Command: git diff --check | Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T11:39:07.560Z, excerpt_hash=sha256:0aa84e467d8a3a8450784ede4bf5052223d9d67371c56f16cd30f44f82ca740f
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

v0.3 freeze A1: prune agentplane package JS before bundling

Add prune-package-js to the agentplane build:bundle path and verify the publish dist runtime surface shrinks without breaking the tsup CLI bundle.

## Scope

- In scope: Add prune-package-js to the agentplane build:bundle path and verify the publish dist runtime surface shrinks without breaking the tsup CLI bundle.
- Out of scope: unrelated refactors not required for "v0.3 freeze A1: prune agentplane package JS before bundling".

## Plan

Release plan: version=0.3.25, tag=none, scope=package build artifact only.
1. Confirm tracked tree is clean and inspect current agentplane/core package build patterns.
2. Add scripts/prune-package-js.mjs dist before tsup in packages/agentplane build:bundle.
3. Verify no repo source imports agentplane/dist deep paths.
4. Run the package build and compare dist file count/runtime files.
5. Record verification evidence and finish only this A1 scope.

## Verify Steps

1. Run `rg -n 'agentplane/dist' packages --glob '*.ts'`. Expected: no deep runtime import; path string fixtures are reviewed and documented if present.
2. Run `bun run --filter=agentplane build`. Expected: build succeeds with prune-package-js before tsup.
3. Run `find packages/agentplane/dist -type f | wc -l` and inspect top-level dist files. Expected: runtime .js files are pruned before tsup and only the bundled CLI runtime .js remains; declaration files may remain for A1, with tighter package whitelist deferred to A3.
4. Run `git diff --check`. Expected: no whitespace errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T11:40:42.920Z — VERIFY — ok

By: CODER

Note: Command: rg -n 'agentplane/dist' packages --glob '*.ts' | Result: pass with reviewed non-import path fixture in branch/work-start.materialize.ts. Command: bun run --filter=agentplane build | Result: pass; build runs prune-package-js before tsup and emits dist/cli.js. Command: find packages/agentplane/dist -type f | wc -l | Result: pass; count 1248, with only one JS runtime file and zero JS maps; declarations remain for later A3 whitelist work. Command: git diff --check | Result: pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T11:39:07.560Z, excerpt_hash=sha256:0aa84e467d8a3a8450784ede4bf5052223d9d67371c56f16cd30f44f82ca740f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
