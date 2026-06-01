---
id: "202606010958-KRTN4Z"
title: "Refresh v0.6.14 release social assets"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-01T09:59:14.436Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-01T10:00:56.255Z"
  updated_by: "DOCS"
  note: "Social asset checks passed: generated v0.6.14 PNG at 1280x640, updated social manifest, docs:social:check passed, and release parity passed. release:tasks:check is deferred until this DOING social-assets task is merged and closed because the gate correctly blocks active release tasks."
  attempts: 0
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: refresh v0.6.14 release social image assets and manifest so release social and release checks match the new release documentation."
events:
  -
    type: "status"
    at: "2026-06-01T09:59:31.393Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: refresh v0.6.14 release social image assets and manifest so release social and release checks match the new release documentation."
  -
    type: "verify"
    at: "2026-06-01T10:00:56.255Z"
    author: "DOCS"
    state: "ok"
    note: "Social asset checks passed: generated v0.6.14 PNG at 1280x640, updated social manifest, docs:social:check passed, and release parity passed. release:tasks:check is deferred until this DOING social-assets task is merged and closed because the gate correctly blocks active release tasks."
doc_version: 3
doc_updated_at: "2026-06-01T10:00:56.270Z"
doc_updated_by: "DOCS"
description: "Generate and verify social preview assets for docs/releases/v0.6.14.md so release:check passes on main. Scope: website/static/img/social release image/manifest updates and task evidence only."
sections:
  Summary: |-
    Refresh v0.6.14 release social assets

    Generate and verify social preview assets for docs/releases/v0.6.14.md so release:check passes on main. Scope: website/static/img/social release image/manifest updates and task evidence only.
  Scope: |-
    - In scope: Generate and verify social preview assets for docs/releases/v0.6.14.md so release:check passes on main. Scope: website/static/img/social release image/manifest updates and task evidence only.
    - Out of scope: unrelated refactors not required for "Refresh v0.6.14 release social assets".
  Plan: "Plan: generate website social assets for docs/releases/v0.6.14.md, verify docs:social:check and release:check, then merge through branch_pr. Scope: website/static/img/social/** for v0.6.14, task evidence."
  Verify Steps: |-
    1. bun run docs:social:check
    2. bun run release:check
    3. bun run release:tasks:check
    4. bun run release:parity
    5. git status --short --untracked-files=all
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-01T10:00:56.255Z — VERIFY — ok

    By: DOCS

    Note: Social asset checks passed: generated v0.6.14 PNG at 1280x640, updated social manifest, docs:social:check passed, and release parity passed. release:tasks:check is deferred until this DOING social-assets task is merged and closed because the gate correctly blocks active release tasks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T09:59:31.393Z, excerpt_hash=sha256:a1d4bf804c8ffc56143c87fa63cb540661410cd99c57a236c4aa4de7d9208537

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010958-KRTN4Z-refresh-v0-6-14-social-assets/.agentplane/tasks/202606010958-KRTN4Z/blueprint/resolved-snapshot.json
    - old_digest: 1057a53f0291957c5822fc06d9ddc4029826b3fbe158a4428536c4cb73654af7
    - current_digest: 1057a53f0291957c5822fc06d9ddc4029826b3fbe158a4428536c4cb73654af7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606010958-KRTN4Z

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the social asset branch or regenerate website social images from the previous release docs state."
  Findings: |-
    - Observation: release:tasks:check fails in this worktree only because 202606010958-KRTN4Z is DOING.
      Impact: Final release readiness must be rechecked on clean main after this follow-up closes.
      Resolution: Repeat release:tasks:check and release:check on main after hosted close.
id_source: "generated"
---
## Summary

Refresh v0.6.14 release social assets

Generate and verify social preview assets for docs/releases/v0.6.14.md so release:check passes on main. Scope: website/static/img/social release image/manifest updates and task evidence only.

## Scope

- In scope: Generate and verify social preview assets for docs/releases/v0.6.14.md so release:check passes on main. Scope: website/static/img/social release image/manifest updates and task evidence only.
- Out of scope: unrelated refactors not required for "Refresh v0.6.14 release social assets".

## Plan

Plan: generate website social assets for docs/releases/v0.6.14.md, verify docs:social:check and release:check, then merge through branch_pr. Scope: website/static/img/social/** for v0.6.14, task evidence.

## Verify Steps

1. bun run docs:social:check
2. bun run release:check
3. bun run release:tasks:check
4. bun run release:parity
5. git status --short --untracked-files=all

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-01T10:00:56.255Z — VERIFY — ok

By: DOCS

Note: Social asset checks passed: generated v0.6.14 PNG at 1280x640, updated social manifest, docs:social:check passed, and release parity passed. release:tasks:check is deferred until this DOING social-assets task is merged and closed because the gate correctly blocks active release tasks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T09:59:31.393Z, excerpt_hash=sha256:a1d4bf804c8ffc56143c87fa63cb540661410cd99c57a236c4aa4de7d9208537

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010958-KRTN4Z-refresh-v0-6-14-social-assets/.agentplane/tasks/202606010958-KRTN4Z/blueprint/resolved-snapshot.json
- old_digest: 1057a53f0291957c5822fc06d9ddc4029826b3fbe158a4428536c4cb73654af7
- current_digest: 1057a53f0291957c5822fc06d9ddc4029826b3fbe158a4428536c4cb73654af7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606010958-KRTN4Z

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the social asset branch or regenerate website social images from the previous release docs state.

## Findings

- Observation: release:tasks:check fails in this worktree only because 202606010958-KRTN4Z is DOING.
  Impact: Final release readiness must be rechecked on clean main after this follow-up closes.
  Resolution: Repeat release:tasks:check and release:check on main after hosted close.
