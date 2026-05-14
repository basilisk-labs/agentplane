---
id: "202605141002-R9MPV5"
title: "Generate README header image"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T10:02:49.811Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T10:14:23.478Z"
  updated_by: "CODER"
  note: "Final local fast CI is green for README header generator."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement the approved README header image generator in the task worktree, keeping the diff limited to generator wiring, generated asset, README reference, and task verification evidence."
events:
  -
    type: "status"
    at: "2026-05-14T10:03:20.227Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the approved README header image generator in the task worktree, keeping the diff limited to generator wiring, generated asset, README reference, and task verification evidence."
  -
    type: "verify"
    at: "2026-05-14T10:08:37.992Z"
    author: "CODER"
    state: "ok"
    note: "README header generator implemented and verified."
  -
    type: "verify"
    at: "2026-05-14T10:09:55.531Z"
    author: "CODER"
    state: "ok"
    note: "Post-commit verification remains green for README header generator."
  -
    type: "verify"
    at: "2026-05-14T10:14:23.478Z"
    author: "CODER"
    state: "ok"
    note: "Final local fast CI is green for README header generator."
doc_version: 3
doc_updated_at: "2026-05-14T10:14:23.484Z"
doc_updated_by: "CODER"
description: "Add an algorithmic README header image generator that includes the AgentPlane logo, release-derived wording, and version number, then wire the generated asset into the root README."
sections:
  Summary: |-
    Generate README header image
    
    Add an algorithmic README header image generator that includes the AgentPlane logo, release-derived wording, and version number, then wire the generated asset into the root README.
  Scope: |-
    - In scope: Add an algorithmic README header image generator that includes the AgentPlane logo, release-derived wording, and version number, then wire the generated asset into the root README.
    - Out of scope: unrelated refactors not required for "Generate README header image".
  Plan: "Implement an algorithmic README header image generator. Inspect existing README/header/logo/release/version surfaces. Add a deterministic generator using local release/tag/package metadata with a safe fallback, generate a minimal header asset that includes logo, release-derived text, and version number, update root README to reference it, and verify generator output plus policy/runtime checks."
  Verify Steps: |-
    1. Run `bun run docs:readme-header:generate`. Expected: `docs/assets/header.svg` is generated from the latest release tag and release notes without changing unrelated assets.
    2. Run `bun run docs:readme-header:check`. Expected: the generated header is fresh.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
    4. Run `agentplane doctor`. Expected: runtime health check passes.
    5. Inspect `README.md` and `docs/assets/header.svg`. Expected: the root README points at the generated SVG header, and the header includes the AgentPlane logo, release-derived copy, and version number.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T10:08:37.992Z — VERIFY — ok
    
    By: CODER
    
    Note: README header generator implemented and verified.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T10:03:20.227Z, excerpt_hash=sha256:465c7d07d0c63ad16d56601e8bff2614ef73a29c4ff3465e9aafa01abc669b19
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141002-R9MPV5-readme-header-image/.agentplane/tasks/202605141002-R9MPV5/blueprint/resolved-snapshot.json
    - old_digest: ba36ff1bdc2fa34f8bd2dd55ae5151fd4d3b7117fee80269e59854abba812a5c
    - current_digest: ba36ff1bdc2fa34f8bd2dd55ae5151fd4d3b7117fee80269e59854abba812a5c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141002-R9MPV5
    
    ### 2026-05-14T10:09:55.531Z — VERIFY — ok
    
    By: CODER
    
    Note: Post-commit verification remains green for README header generator.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T10:08:38.002Z, excerpt_hash=sha256:465c7d07d0c63ad16d56601e8bff2614ef73a29c4ff3465e9aafa01abc669b19
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141002-R9MPV5-readme-header-image/.agentplane/tasks/202605141002-R9MPV5/blueprint/resolved-snapshot.json
    - old_digest: ba36ff1bdc2fa34f8bd2dd55ae5151fd4d3b7117fee80269e59854abba812a5c
    - current_digest: ba36ff1bdc2fa34f8bd2dd55ae5151fd4d3b7117fee80269e59854abba812a5c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141002-R9MPV5
    
    ### 2026-05-14T10:14:23.478Z — VERIFY — ok
    
    By: CODER
    
    Note: Final local fast CI is green for README header generator.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T10:09:55.541Z, excerpt_hash=sha256:465c7d07d0c63ad16d56601e8bff2614ef73a29c4ff3465e9aafa01abc669b19
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141002-R9MPV5-readme-header-image/.agentplane/tasks/202605141002-R9MPV5/blueprint/resolved-snapshot.json
    - old_digest: ba36ff1bdc2fa34f8bd2dd55ae5151fd4d3b7117fee80269e59854abba812a5c
    - current_digest: ba36ff1bdc2fa34f8bd2dd55ae5151fd4d3b7117fee80269e59854abba812a5c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141002-R9MPV5
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: bun run docs:readme-header:generate; bun run docs:readme-header:check; bunx eslint scripts/generate/generate-readme-header.mjs; bunx prettier --check README.md package.json scripts/generate/generate-readme-header.mjs .agentplane/tasks/202605141002-R9MPV5/README.md; node .agentplane/policy/check-routing.mjs; git diff --check; agentplane doctor. Visual render passed with qlmanage thumbnail at /tmp/header.svg.png. Latest published GitHub release was checked with gh release list: v0.5.0 Latest; local package/docs are 0.6.0 but not the published latest release.
      Impact: README now uses generated docs/assets/header.svg containing the logo, release-derived copy, and version number. Existing docs/assets/header.png remains untouched for other public surfaces.
      Resolution: No task-local rework required. Doctor reported unrelated pre-existing branch_pr reconciliation warnings for other tasks.
    
    - Observation: Head commit 224991f8c contains the generator, generated SVG, README link, and task PR artifacts. Re-run checks passed before commit: docs:readme-header:generate/check, targeted eslint/prettier, policy routing, git diff --check, agentplane doctor, qlmanage SVG render.
      Impact: PR #3706 points at the verified task branch.
      Resolution: No rework required.
    
    - Observation: Final head 987a65118 includes scripts/README freshness after adding docs:readme-header scripts. bun run ci:local:fast passed: format, schemas, agent templates, policy routing, release parity, CLI cold baseline, build, docs freshness, scripts README freshness, onboarding, hotspot baseline, vitest project routing, core lint, fast unit suite (305 files, 1790 passed, 2 skipped), and critical CLI E2E chunks 1-5.
      Impact: PR #3706 is ready for hosted checks from the updated task branch.
      Resolution: No rework required.
id_source: "generated"
---
## Summary

Generate README header image

Add an algorithmic README header image generator that includes the AgentPlane logo, release-derived wording, and version number, then wire the generated asset into the root README.

## Scope

- In scope: Add an algorithmic README header image generator that includes the AgentPlane logo, release-derived wording, and version number, then wire the generated asset into the root README.
- Out of scope: unrelated refactors not required for "Generate README header image".

## Plan

Implement an algorithmic README header image generator. Inspect existing README/header/logo/release/version surfaces. Add a deterministic generator using local release/tag/package metadata with a safe fallback, generate a minimal header asset that includes logo, release-derived text, and version number, update root README to reference it, and verify generator output plus policy/runtime checks.

## Verify Steps

1. Run `bun run docs:readme-header:generate`. Expected: `docs/assets/header.svg` is generated from the latest release tag and release notes without changing unrelated assets.
2. Run `bun run docs:readme-header:check`. Expected: the generated header is fresh.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
4. Run `agentplane doctor`. Expected: runtime health check passes.
5. Inspect `README.md` and `docs/assets/header.svg`. Expected: the root README points at the generated SVG header, and the header includes the AgentPlane logo, release-derived copy, and version number.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T10:08:37.992Z — VERIFY — ok

By: CODER

Note: README header generator implemented and verified.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T10:03:20.227Z, excerpt_hash=sha256:465c7d07d0c63ad16d56601e8bff2614ef73a29c4ff3465e9aafa01abc669b19

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141002-R9MPV5-readme-header-image/.agentplane/tasks/202605141002-R9MPV5/blueprint/resolved-snapshot.json
- old_digest: ba36ff1bdc2fa34f8bd2dd55ae5151fd4d3b7117fee80269e59854abba812a5c
- current_digest: ba36ff1bdc2fa34f8bd2dd55ae5151fd4d3b7117fee80269e59854abba812a5c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141002-R9MPV5

### 2026-05-14T10:09:55.531Z — VERIFY — ok

By: CODER

Note: Post-commit verification remains green for README header generator.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T10:08:38.002Z, excerpt_hash=sha256:465c7d07d0c63ad16d56601e8bff2614ef73a29c4ff3465e9aafa01abc669b19

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141002-R9MPV5-readme-header-image/.agentplane/tasks/202605141002-R9MPV5/blueprint/resolved-snapshot.json
- old_digest: ba36ff1bdc2fa34f8bd2dd55ae5151fd4d3b7117fee80269e59854abba812a5c
- current_digest: ba36ff1bdc2fa34f8bd2dd55ae5151fd4d3b7117fee80269e59854abba812a5c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141002-R9MPV5

### 2026-05-14T10:14:23.478Z — VERIFY — ok

By: CODER

Note: Final local fast CI is green for README header generator.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T10:09:55.541Z, excerpt_hash=sha256:465c7d07d0c63ad16d56601e8bff2614ef73a29c4ff3465e9aafa01abc669b19

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141002-R9MPV5-readme-header-image/.agentplane/tasks/202605141002-R9MPV5/blueprint/resolved-snapshot.json
- old_digest: ba36ff1bdc2fa34f8bd2dd55ae5151fd4d3b7117fee80269e59854abba812a5c
- current_digest: ba36ff1bdc2fa34f8bd2dd55ae5151fd4d3b7117fee80269e59854abba812a5c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141002-R9MPV5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: bun run docs:readme-header:generate; bun run docs:readme-header:check; bunx eslint scripts/generate/generate-readme-header.mjs; bunx prettier --check README.md package.json scripts/generate/generate-readme-header.mjs .agentplane/tasks/202605141002-R9MPV5/README.md; node .agentplane/policy/check-routing.mjs; git diff --check; agentplane doctor. Visual render passed with qlmanage thumbnail at /tmp/header.svg.png. Latest published GitHub release was checked with gh release list: v0.5.0 Latest; local package/docs are 0.6.0 but not the published latest release.
  Impact: README now uses generated docs/assets/header.svg containing the logo, release-derived copy, and version number. Existing docs/assets/header.png remains untouched for other public surfaces.
  Resolution: No task-local rework required. Doctor reported unrelated pre-existing branch_pr reconciliation warnings for other tasks.

- Observation: Head commit 224991f8c contains the generator, generated SVG, README link, and task PR artifacts. Re-run checks passed before commit: docs:readme-header:generate/check, targeted eslint/prettier, policy routing, git diff --check, agentplane doctor, qlmanage SVG render.
  Impact: PR #3706 points at the verified task branch.
  Resolution: No rework required.

- Observation: Final head 987a65118 includes scripts/README freshness after adding docs:readme-header scripts. bun run ci:local:fast passed: format, schemas, agent templates, policy routing, release parity, CLI cold baseline, build, docs freshness, scripts README freshness, onboarding, hotspot baseline, vitest project routing, core lint, fast unit suite (305 files, 1790 passed, 2 skipped), and critical CLI E2E chunks 1-5.
  Impact: PR #3706 is ready for hosted checks from the updated task branch.
  Resolution: No rework required.
