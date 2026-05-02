---
id: "202605021412-1TG306"
title: "Document standalone release channel operations"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605021412-MH8RSM"
  - "202605021412-SVX2DX"
  - "202605021412-XDJ6X7"
tags:
  - "distribution"
  - "docs"
  - "release"
verify:
  - "bun run docs:cli:check"
  - "bun run docs:scripts:check"
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T17:47:51.794Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T17:52:14.815Z"
  updated_by: "DOCS"
  note: "Passed: agentplane task verify-show 202605021412-1TG306; bun run docs:cli:check; bun run docs:scripts:check; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Document completed standalone release channel behavior and evidence boundaries."
events:
  -
    type: "status"
    at: "2026-05-02T17:48:17.855Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Document completed standalone release channel behavior and evidence boundaries."
  -
    type: "verify"
    at: "2026-05-02T17:52:14.815Z"
    author: "DOCS"
    state: "ok"
    note: "Passed: agentplane task verify-show 202605021412-1TG306; bun run docs:cli:check; bun run docs:scripts:check; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor."
doc_version: 3
doc_updated_at: "2026-05-02T17:52:14.842Z"
doc_updated_by: "DOCS"
description: "Update release and publishing docs with the standalone artifact architecture, Homebrew/Scoop/setup-action install behavior, embedded Node maintenance policy, verification commands, recovery steps, and release DoD changes."
sections:
  Summary: |-
    Document standalone release channel operations
    
    Update release and publishing docs with the standalone artifact architecture, Homebrew/Scoop/setup-action install behavior, embedded Node maintenance policy, verification commands, recovery steps, and release DoD changes.
  Scope: |-
    - In scope: Update release and publishing docs with the standalone artifact architecture, Homebrew/Scoop/setup-action install behavior, embedded Node maintenance policy, verification commands, recovery steps, and release DoD changes.
    - Out of scope: unrelated refactors not required for "Document standalone release channel operations".
  Plan: |-
    Document the completed standalone release channel operations.
    
    Scope:
    - Update release/publishing docs to reflect that GitHub Release standalone assets, Homebrew, Scoop, and setup-agentplane now consume bundled-runtime archives.
    - Document the current publish workflow behavior, verification commands, channel evidence, and recovery boundaries.
    - Refresh v0.4.1 release notes coverage for standalone assets and no-Node package manager installs.
    
    Verification:
    - agentplane task verify-show 202605021412-1TG306
    - bun run docs:cli:check
    - bun run docs:scripts:check
    - bun run format:check
    - node .agentplane/policy/check-routing.mjs
    - agentplane doctor
  Verify Steps: |-
    1. Review the requested outcome for "Document standalone release channel operations". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T17:52:14.815Z — VERIFY — ok
    
    By: DOCS
    
    Note: Passed: agentplane task verify-show 202605021412-1TG306; bun run docs:cli:check; bun run docs:scripts:check; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T17:48:17.855Z, excerpt_hash=sha256:4e1ee6a214f49ae59309e5f58dacbbc22db38d66923e644473249a5dfe55926e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Document standalone release channel operations

Update release and publishing docs with the standalone artifact architecture, Homebrew/Scoop/setup-action install behavior, embedded Node maintenance policy, verification commands, recovery steps, and release DoD changes.

## Scope

- In scope: Update release and publishing docs with the standalone artifact architecture, Homebrew/Scoop/setup-action install behavior, embedded Node maintenance policy, verification commands, recovery steps, and release DoD changes.
- Out of scope: unrelated refactors not required for "Document standalone release channel operations".

## Plan

Document the completed standalone release channel operations.

Scope:
- Update release/publishing docs to reflect that GitHub Release standalone assets, Homebrew, Scoop, and setup-agentplane now consume bundled-runtime archives.
- Document the current publish workflow behavior, verification commands, channel evidence, and recovery boundaries.
- Refresh v0.4.1 release notes coverage for standalone assets and no-Node package manager installs.

Verification:
- agentplane task verify-show 202605021412-1TG306
- bun run docs:cli:check
- bun run docs:scripts:check
- bun run format:check
- node .agentplane/policy/check-routing.mjs
- agentplane doctor

## Verify Steps

1. Review the requested outcome for "Document standalone release channel operations". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T17:52:14.815Z — VERIFY — ok

By: DOCS

Note: Passed: agentplane task verify-show 202605021412-1TG306; bun run docs:cli:check; bun run docs:scripts:check; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T17:48:17.855Z, excerpt_hash=sha256:4e1ee6a214f49ae59309e5f58dacbbc22db38d66923e644473249a5dfe55926e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
