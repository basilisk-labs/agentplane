---
id: "202604241136-CKSK2S"
title: "v0.3 freeze A2: remove prepare from package publish scripts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604241136-F3ZYZJ"
tags:
  - "build"
  - "release"
  - "v0.3"
verify:
  - "npm pack --dry-run --ignore-scripts"
  - "rg -n '\"prepare\"' packages/agentplane/package.json packages/core/package.json packages/recipes/package.json"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T11:42:13.894Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from user-supplied v0.3 freeze audit plan; scope limited to A2 prepare script removal after A1."
verification:
  state: "ok"
  updated_at: "2026-04-24T11:43:46.528Z"
  updated_by: "CODER"
  note: "Command: rg -n '\"prepare\"' packages/agentplane/package.json packages/core/package.json packages/recipes/package.json | Result: pass; command returned no matches, so no prepare script remains. Command: npm pack --dry-run --ignore-scripts in packages/agentplane | Result: pass; dry-run pack produced agentplane@0.3.25 metadata with 1295 files, 546.0 kB. Command: npm pack --dry-run in packages/agentplane | Result: pass; prepack ran clean/build, tsup emitted dist/cli.js, dry-run pack completed. Command: git diff --check | Result: pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement A2 only by removing the remaining agentplane prepare script, preserving prepack and prepublishOnly, then verifying pack dry-runs."
events:
  -
    type: "status"
    at: "2026-04-24T11:42:20.239Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement A2 only by removing the remaining agentplane prepare script, preserving prepack and prepublishOnly, then verifying pack dry-runs."
  -
    type: "verify"
    at: "2026-04-24T11:43:46.528Z"
    author: "CODER"
    state: "ok"
    note: "Command: rg -n '\"prepare\"' packages/agentplane/package.json packages/core/package.json packages/recipes/package.json | Result: pass; command returned no matches, so no prepare script remains. Command: npm pack --dry-run --ignore-scripts in packages/agentplane | Result: pass; dry-run pack produced agentplane@0.3.25 metadata with 1295 files, 546.0 kB. Command: npm pack --dry-run in packages/agentplane | Result: pass; prepack ran clean/build, tsup emitted dist/cli.js, dry-run pack completed. Command: git diff --check | Result: pass."
doc_version: 3
doc_updated_at: "2026-04-24T11:43:46.537Z"
doc_updated_by: "CODER"
description: "Remove unsupported git-install prepare behavior from publishable packages where present and keep prepack/prepublishOnly as the release build path."
sections:
  Summary: |-
    v0.3 freeze A2: remove prepare from package publish scripts
    
    Remove unsupported git-install prepare behavior from publishable packages where present and keep prepack/prepublishOnly as the release build path.
  Scope: |-
    - In scope: Remove unsupported git-install prepare behavior from publishable packages where present and keep prepack/prepublishOnly as the release build path.
    - Out of scope: unrelated refactors not required for "v0.3 freeze A2: remove prepare from package publish scripts".
  Plan: |-
    Release plan: version=0.3.25, tag=none, scope=package script cleanup only.
    1. Confirm A1 is DONE and tracked tree is clean except unrelated untracked audit markdown.
    2. Verify prepare exists only in packages/agentplane/package.json.
    3. Remove the agentplane prepare script while leaving prepack and prepublishOnly intact.
    4. Run targeted script grep and dry-run pack checks.
    5. Record residual risk: direct git installs will no longer auto-build; supported path remains published/prepack tarball.
  Verify Steps: |-
    1. Run `rg -n '"prepare"' packages/agentplane/package.json packages/core/package.json packages/recipes/package.json`. Expected: no prepare script remains in those package scripts.
    2. Run `npm pack --dry-run --ignore-scripts` from `packages/agentplane`. Expected: package metadata can be packed without lifecycle scripts.
    3. Run `npm pack --dry-run` from `packages/agentplane`. Expected: prepack still builds successfully and dry-run pack completes.
    4. Run `git diff --check`. Expected: no whitespace errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T11:43:46.528Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: rg -n '"prepare"' packages/agentplane/package.json packages/core/package.json packages/recipes/package.json | Result: pass; command returned no matches, so no prepare script remains. Command: npm pack --dry-run --ignore-scripts in packages/agentplane | Result: pass; dry-run pack produced agentplane@0.3.25 metadata with 1295 files, 546.0 kB. Command: npm pack --dry-run in packages/agentplane | Result: pass; prepack ran clean/build, tsup emitted dist/cli.js, dry-run pack completed. Command: git diff --check | Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T11:42:20.272Z, excerpt_hash=sha256:64524cd32fcf84276e1ed03970cb8155aa58491cc9722d67a9d2715f7303d068
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

v0.3 freeze A2: remove prepare from package publish scripts

Remove unsupported git-install prepare behavior from publishable packages where present and keep prepack/prepublishOnly as the release build path.

## Scope

- In scope: Remove unsupported git-install prepare behavior from publishable packages where present and keep prepack/prepublishOnly as the release build path.
- Out of scope: unrelated refactors not required for "v0.3 freeze A2: remove prepare from package publish scripts".

## Plan

Release plan: version=0.3.25, tag=none, scope=package script cleanup only.
1. Confirm A1 is DONE and tracked tree is clean except unrelated untracked audit markdown.
2. Verify prepare exists only in packages/agentplane/package.json.
3. Remove the agentplane prepare script while leaving prepack and prepublishOnly intact.
4. Run targeted script grep and dry-run pack checks.
5. Record residual risk: direct git installs will no longer auto-build; supported path remains published/prepack tarball.

## Verify Steps

1. Run `rg -n '"prepare"' packages/agentplane/package.json packages/core/package.json packages/recipes/package.json`. Expected: no prepare script remains in those package scripts.
2. Run `npm pack --dry-run --ignore-scripts` from `packages/agentplane`. Expected: package metadata can be packed without lifecycle scripts.
3. Run `npm pack --dry-run` from `packages/agentplane`. Expected: prepack still builds successfully and dry-run pack completes.
4. Run `git diff --check`. Expected: no whitespace errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T11:43:46.528Z — VERIFY — ok

By: CODER

Note: Command: rg -n '"prepare"' packages/agentplane/package.json packages/core/package.json packages/recipes/package.json | Result: pass; command returned no matches, so no prepare script remains. Command: npm pack --dry-run --ignore-scripts in packages/agentplane | Result: pass; dry-run pack produced agentplane@0.3.25 metadata with 1295 files, 546.0 kB. Command: npm pack --dry-run in packages/agentplane | Result: pass; prepack ran clean/build, tsup emitted dist/cli.js, dry-run pack completed. Command: git diff --check | Result: pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T11:42:20.272Z, excerpt_hash=sha256:64524cd32fcf84276e1ed03970cb8155aa58491cc9722d67a9d2715f7303d068

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
