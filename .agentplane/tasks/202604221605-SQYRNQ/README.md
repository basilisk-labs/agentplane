---
id: "202604221605-SQYRNQ"
title: "Publish v0.3.19 init hotfix release"
result_summary: "Published v0.3.19 patch release for init cached recipe manifest compatibility and ASCII logo restoration."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "init"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T16:06:04.437Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T16:17:43.844Z"
  updated_by: "CODER"
  note: "Verified v0.3.19 release: release plan/apply completed; release parity passed; PR #502 checks passed and merged; Publish to npm workflow 24789330913 succeeded; npm view reports agentplane, @agentplaneorg/core, and @agentplaneorg/recipes at 0.3.19."
commit:
  hash: "45ba9c57f93995c662813d5b1136d87374c8eb98"
  message: "Merge pull request #502 from basilisk-labs/release/v0.3.19-publish"
comments:
  -
    author: "CODER"
    body: "Start: publish v0.3.19 patch release for the init cached recipe manifest compatibility fix and restored interactive init ASCII logo."
  -
    author: "CODER"
    body: "Verified: v0.3.19 hotfix release is merged to main, tagged, published by GitHub workflow 24789330913, and visible on npm for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes as 0.3.19."
events:
  -
    type: "status"
    at: "2026-04-22T16:06:04.900Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: publish v0.3.19 patch release for the init cached recipe manifest compatibility fix and restored interactive init ASCII logo."
  -
    type: "verify"
    at: "2026-04-22T16:17:43.844Z"
    author: "CODER"
    state: "ok"
    note: "Verified v0.3.19 release: release plan/apply completed; release parity passed; PR #502 checks passed and merged; Publish to npm workflow 24789330913 succeeded; npm view reports agentplane, @agentplaneorg/core, and @agentplaneorg/recipes at 0.3.19."
  -
    type: "status"
    at: "2026-04-22T16:17:49.512Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.3.19 hotfix release is merged to main, tagged, published by GitHub workflow 24789330913, and visible on npm for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes as 0.3.19."
doc_version: 3
doc_updated_at: "2026-04-22T16:17:49.512Z"
doc_updated_by: "CODER"
description: "Publish the next patch release containing the init cached recipe manifest compatibility fix and restored interactive init ASCII logo."
sections:
  Summary: |-
    Publish v0.3.19 init hotfix release
    
    Publish the next patch release containing the init cached recipe manifest compatibility fix and restored interactive init ASCII logo.
  Scope: |-
    - In scope: Publish the next patch release containing the init cached recipe manifest compatibility fix and restored interactive init ASCII logo.
    - Out of scope: unrelated refactors not required for "Publish v0.3.19 init hotfix release".
  Plan: |-
    Goal: publish v0.3.19 as a patch release for the init hotfix merged in PR #501.
    
    Plan:
    1. Generate a patch release plan from v0.3.18 to current main.
    2. Write docs/releases/v0.3.19.md describing the init manifest compatibility fix and ASCII logo restoration.
    3. Apply the release plan locally on release/v0.3.19-publish.
    4. Run release parity and release gates.
    5. Push the release branch, open PR to main, wait for hosted checks, merge, push tag, and verify GitHub/npm publication.
  Verify Steps: |-
    - agentplane release plan --patch
    - agentplane release apply --plan <plan-dir>
    - bun run release:parity
    - bun run ci:local:fast or pre-push standard gate
    - GitHub PR checks pass
    - Publish to npm workflow passes after merge/tag
    - npm view agentplane version && npm view @agentplaneorg/core version && npm view @agentplaneorg/recipes version report 0.3.19
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T16:17:43.844Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified v0.3.19 release: release plan/apply completed; release parity passed; PR #502 checks passed and merged; Publish to npm workflow 24789330913 succeeded; npm view reports agentplane, @agentplaneorg/core, and @agentplaneorg/recipes at 0.3.19.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T16:06:04.906Z, excerpt_hash=sha256:3390d1d6cda5202f5a1a39f46d2f75500496018fd22bd03236bf9586ef49cbbe
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Pre-push release-mode hook failed when inherited test execution changed shared git core.bare=true; restored local core.bare=false and confirmed remote tag v0.3.19 points at main merge commit 45ba9c57.
      Impact: No publication impact: GitHub Publish to npm completed successfully and npm registry versions are 0.3.19.
      Resolution: Use hosted release workflow as publication evidence; record local hook pollution as a release-process follow-up rather than blocking this hotfix.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Publish v0.3.19 init hotfix release

Publish the next patch release containing the init cached recipe manifest compatibility fix and restored interactive init ASCII logo.

## Scope

- In scope: Publish the next patch release containing the init cached recipe manifest compatibility fix and restored interactive init ASCII logo.
- Out of scope: unrelated refactors not required for "Publish v0.3.19 init hotfix release".

## Plan

Goal: publish v0.3.19 as a patch release for the init hotfix merged in PR #501.

Plan:
1. Generate a patch release plan from v0.3.18 to current main.
2. Write docs/releases/v0.3.19.md describing the init manifest compatibility fix and ASCII logo restoration.
3. Apply the release plan locally on release/v0.3.19-publish.
4. Run release parity and release gates.
5. Push the release branch, open PR to main, wait for hosted checks, merge, push tag, and verify GitHub/npm publication.

## Verify Steps

- agentplane release plan --patch
- agentplane release apply --plan <plan-dir>
- bun run release:parity
- bun run ci:local:fast or pre-push standard gate
- GitHub PR checks pass
- Publish to npm workflow passes after merge/tag
- npm view agentplane version && npm view @agentplaneorg/core version && npm view @agentplaneorg/recipes version report 0.3.19

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T16:17:43.844Z — VERIFY — ok

By: CODER

Note: Verified v0.3.19 release: release plan/apply completed; release parity passed; PR #502 checks passed and merged; Publish to npm workflow 24789330913 succeeded; npm view reports agentplane, @agentplaneorg/core, and @agentplaneorg/recipes at 0.3.19.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T16:06:04.906Z, excerpt_hash=sha256:3390d1d6cda5202f5a1a39f46d2f75500496018fd22bd03236bf9586ef49cbbe

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Pre-push release-mode hook failed when inherited test execution changed shared git core.bare=true; restored local core.bare=false and confirmed remote tag v0.3.19 points at main merge commit 45ba9c57.
  Impact: No publication impact: GitHub Publish to npm completed successfully and npm registry versions are 0.3.19.
  Resolution: Use hosted release workflow as publication evidence; record local hook pollution as a release-process follow-up rather than blocking this hotfix.
  Promotion: incident-candidate
  Fixability: external
