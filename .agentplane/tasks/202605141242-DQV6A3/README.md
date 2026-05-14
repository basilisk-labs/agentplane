---
id: "202605141242-DQV6A3"
title: "Use full-width README header on GitHub and npm"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T12:42:44.430Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T13:02:26.080Z"
  updated_by: "CODER"
  note: "Re-verified after addressing Codex review: README headers now use CSS style width/max-width instead of invalid percentage width attributes; formatting, policy routing, doctor, npm pack dry run, and whitespace checks passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement full-width root README header and add the same generated header to the npm package README surface."
events:
  -
    type: "status"
    at: "2026-05-14T12:43:22.733Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement full-width root README header and add the same generated header to the npm package README surface."
  -
    type: "verify"
    at: "2026-05-14T12:44:57.353Z"
    author: "CODER"
    state: "ok"
    note: "Verified full-width root README header, npm README raw GitHub header, formatting, policy routing, doctor, npm package dry run, and whitespace checks. Doctor passed with pre-existing branch_pr normalization warnings unrelated to this diff."
  -
    type: "verify"
    at: "2026-05-14T13:02:26.080Z"
    author: "CODER"
    state: "ok"
    note: "Re-verified after addressing Codex review: README headers now use CSS style width/max-width instead of invalid percentage width attributes; formatting, policy routing, doctor, npm pack dry run, and whitespace checks passed."
doc_version: 3
doc_updated_at: "2026-05-14T13:02:26.089Z"
doc_updated_by: "CODER"
description: "Make the generated header image use full available width in the root README and add the same generated header to the npm package README surface."
sections:
  Summary: |-
    Use full-width README header on GitHub and npm
    
    Make the generated header image use full available width in the root README and add the same generated header to the npm package README surface.
  Scope: |-
    - In scope: Make the generated header image use full available width in the root README and add the same generated header to the npm package README surface.
    - Out of scope: unrelated refactors not required for "Use full-width README header on GitHub and npm".
  Plan: |-
    1. Inspect the root README, npm package README, and package metadata to confirm the rendered surfaces.
    2. Update the root README header image to render at full available width on GitHub.
    3. Add the same generated header asset to packages/agentplane/README.md using a GitHub raw URL suitable for npmjs rendering, also at full available width.
    4. Verify formatting, routing policy, package tarball contents, and docs diff before opening/integrating the branch.
  Verify Steps: |-
    1. Inspect `README.md`. Expected: the generated header image uses `style="width:100%;max-width:100%;"`.
    2. Inspect `packages/agentplane/README.md`. Expected: it includes the same generated header asset via a GitHub raw URL suitable for npmjs rendering, also with `style="width:100%;max-width:100%;"`.
    3. Run `bunx prettier --check README.md packages/agentplane/README.md .agentplane/tasks/202605141242-DQV6A3/README.md`. Expected: formatting passes.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing passes.
    5. Run `agentplane doctor`. Expected: repository health checks pass.
    6. Run `npm pack --json --dry-run --ignore-scripts` from `packages/agentplane`. Expected: the package dry run succeeds and includes `package/README.md`.
    7. Run `git diff --check`. Expected: no whitespace errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T12:44:57.353Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified full-width root README header, npm README raw GitHub header, formatting, policy routing, doctor, npm package dry run, and whitespace checks. Doctor passed with pre-existing branch_pr normalization warnings unrelated to this diff.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T12:43:22.733Z, excerpt_hash=sha256:90fd1b2c116a68892d86a8e33ee41f0150ad36d780c9cc95a7aa33e34b07b17a
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141242-DQV6A3-npm-readme-header/.agentplane/tasks/202605141242-DQV6A3/blueprint/resolved-snapshot.json
    - old_digest: 7eff10a80745b59188c6807ff2ba53cad11207aaa99d0085f928c18dc92ed163
    - current_digest: 7eff10a80745b59188c6807ff2ba53cad11207aaa99d0085f928c18dc92ed163
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141242-DQV6A3
    
    ### 2026-05-14T13:02:26.080Z — VERIFY — ok
    
    By: CODER
    
    Note: Re-verified after addressing Codex review: README headers now use CSS style width/max-width instead of invalid percentage width attributes; formatting, policy routing, doctor, npm pack dry run, and whitespace checks passed.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T12:44:57.363Z, excerpt_hash=sha256:69e062ff4e9a560db36db0342c672ee3c3f0e39c705867793e8286f21afc5a9a
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141242-DQV6A3-npm-readme-header/.agentplane/tasks/202605141242-DQV6A3/blueprint/resolved-snapshot.json
    - old_digest: 7eff10a80745b59188c6807ff2ba53cad11207aaa99d0085f928c18dc92ed163
    - current_digest: 7eff10a80745b59188c6807ff2ba53cad11207aaa99d0085f928c18dc92ed163
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141242-DQV6A3
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: README.md uses docs/assets/header.svg with width=100%; packages/agentplane/README.md uses the same generated SVG via raw.githubusercontent.com with width=100%; npm pack dry run includes package/README.md.
      Impact: GitHub README renders the header at full available content width; npmjs package README will render the same generated header after the next package publication.
      Resolution: No code changes required; package publication remains a separate release step.
    
    - Observation: README.md and packages/agentplane/README.md both use style="width:100%;max-width:100%;"; package README uses the raw GitHub URL for the generated header and npm pack dry run includes package/README.md.
      Impact: GitHub and npm README rendering can fill the available content width with valid HTML/CSS.
      Resolution: Addressed review comment 3241418628 by replacing width attributes with inline style sizing.
id_source: "generated"
---
## Summary

Use full-width README header on GitHub and npm

Make the generated header image use full available width in the root README and add the same generated header to the npm package README surface.

## Scope

- In scope: Make the generated header image use full available width in the root README and add the same generated header to the npm package README surface.
- Out of scope: unrelated refactors not required for "Use full-width README header on GitHub and npm".

## Plan

1. Inspect the root README, npm package README, and package metadata to confirm the rendered surfaces.
2. Update the root README header image to render at full available width on GitHub.
3. Add the same generated header asset to packages/agentplane/README.md using a GitHub raw URL suitable for npmjs rendering, also at full available width.
4. Verify formatting, routing policy, package tarball contents, and docs diff before opening/integrating the branch.

## Verify Steps

1. Inspect `README.md`. Expected: the generated header image uses `style="width:100%;max-width:100%;"`.
2. Inspect `packages/agentplane/README.md`. Expected: it includes the same generated header asset via a GitHub raw URL suitable for npmjs rendering, also with `style="width:100%;max-width:100%;"`.
3. Run `bunx prettier --check README.md packages/agentplane/README.md .agentplane/tasks/202605141242-DQV6A3/README.md`. Expected: formatting passes.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing passes.
5. Run `agentplane doctor`. Expected: repository health checks pass.
6. Run `npm pack --json --dry-run --ignore-scripts` from `packages/agentplane`. Expected: the package dry run succeeds and includes `package/README.md`.
7. Run `git diff --check`. Expected: no whitespace errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T12:44:57.353Z — VERIFY — ok

By: CODER

Note: Verified full-width root README header, npm README raw GitHub header, formatting, policy routing, doctor, npm package dry run, and whitespace checks. Doctor passed with pre-existing branch_pr normalization warnings unrelated to this diff.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T12:43:22.733Z, excerpt_hash=sha256:90fd1b2c116a68892d86a8e33ee41f0150ad36d780c9cc95a7aa33e34b07b17a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141242-DQV6A3-npm-readme-header/.agentplane/tasks/202605141242-DQV6A3/blueprint/resolved-snapshot.json
- old_digest: 7eff10a80745b59188c6807ff2ba53cad11207aaa99d0085f928c18dc92ed163
- current_digest: 7eff10a80745b59188c6807ff2ba53cad11207aaa99d0085f928c18dc92ed163
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141242-DQV6A3

### 2026-05-14T13:02:26.080Z — VERIFY — ok

By: CODER

Note: Re-verified after addressing Codex review: README headers now use CSS style width/max-width instead of invalid percentage width attributes; formatting, policy routing, doctor, npm pack dry run, and whitespace checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T12:44:57.363Z, excerpt_hash=sha256:69e062ff4e9a560db36db0342c672ee3c3f0e39c705867793e8286f21afc5a9a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141242-DQV6A3-npm-readme-header/.agentplane/tasks/202605141242-DQV6A3/blueprint/resolved-snapshot.json
- old_digest: 7eff10a80745b59188c6807ff2ba53cad11207aaa99d0085f928c18dc92ed163
- current_digest: 7eff10a80745b59188c6807ff2ba53cad11207aaa99d0085f928c18dc92ed163
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141242-DQV6A3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: README.md uses docs/assets/header.svg with width=100%; packages/agentplane/README.md uses the same generated SVG via raw.githubusercontent.com with width=100%; npm pack dry run includes package/README.md.
  Impact: GitHub README renders the header at full available content width; npmjs package README will render the same generated header after the next package publication.
  Resolution: No code changes required; package publication remains a separate release step.

- Observation: README.md and packages/agentplane/README.md both use style="width:100%;max-width:100%;"; package README uses the raw GitHub URL for the generated header and npm pack dry run includes package/README.md.
  Impact: GitHub and npm README rendering can fill the available content width with valid HTML/CSS.
  Resolution: Addressed review comment 3241418628 by replacing width attributes with inline style sizing.
