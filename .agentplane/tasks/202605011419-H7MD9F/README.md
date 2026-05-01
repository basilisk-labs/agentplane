---
id: "202605011419-H7MD9F"
title: "Prepare v0.4.1 patch release"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T14:55:57.718Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: preparing the v0.4.1 branch_pr release candidate from current main, with release plan, notes, parity/prepublish checks, PR publication, and hosted publish evidence as the acceptance boundary."
events:
  -
    type: "status"
    at: "2026-05-01T14:20:47.054Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: preparing the v0.4.1 branch_pr release candidate from current main, with release plan, notes, parity/prepublish checks, PR publication, and hosted publish evidence as the acceptance boundary."
doc_version: 3
doc_updated_at: "2026-05-01T14:55:47.195Z"
doc_updated_by: "CODER"
description: "Prepare the v0.4.1 release candidate from current main, including release plan, release notes, version parity, candidate branch, PR, hosted checks, and publication readiness evidence."
sections:
  Summary: |-
    Prepare v0.4.1 patch release
    
    Prepare the v0.4.1 release candidate from current main, including release plan, release notes, version parity, candidate branch, PR, hosted checks, and publication readiness evidence.
  Scope: |-
    - In scope: Prepare the v0.4.1 release candidate from current main, including release plan, release notes, version parity, candidate branch, PR, hosted checks, and publication readiness evidence.
    - Out of scope: unrelated refactors not required for "Prepare v0.4.1 patch release".
  Plan: "Release plan: version=0.4.1, tag=v0.4.1, scope=patch release from current main after v0.4.0. Additional approved scope from user: before continuing the release, correct the public recipes information architecture so the top-level Recipes section describes implemented installable signed recipes, and move Claude/Codex/Cursor/Aider/GitHub Actions/branch_pr copy-paste pages into workflow/integration guides instead of presenting them as installable recipes. Steps: generate release plan; consolidate recipe docs from implemented code and catalog inventory; write docs/releases/v0.4.1.md from v0.4.0..HEAD; run docs/recipes checks plus registry availability and release parity/prepublish gates; run branch_pr release candidate on dedicated worktree branch; open PR and wait for hosted checks; merge to main; verify hosted publish/tag/npm visibility or record exact blocker; clean stale merged task branches that are safe to remove. Out of scope: merging old backup/WIP local branches that are not proven release fixes."
  Verify Steps: |-
    1. Run `agentplane release plan --patch`. Expected: target is `0.4.1` / `v0.4.1` from current `v0.4.0` baseline.
    2. Write and validate `docs/releases/v0.4.1.md` from `v0.4.0..HEAD`. Expected: release notes cover the release range and `node scripts/check-release-notes.mjs --version 0.4.1` passes.
    3. Run registry/version gates. Expected: `node scripts/check-npm-version-availability.mjs --version 0.4.1`, `bun run release:parity`, and release candidate preflight pass.
    4. Run `agentplane release candidate --push --yes` from the task worktree. Expected: versions and release artifacts are committed on the candidate branch, pushed, and no release tag is created locally before merge.
    5. Open/merge the release PR after required hosted checks. Expected: `main` contains the release candidate and the task is closed through the branch_pr finish route.
    6. Verify publication evidence. Expected: `v0.4.1` tag, GitHub Release or publish workflow outcome, and npm visibility for `agentplane`, `@agentplaneorg/core`, and `@agentplaneorg/recipes`; if hosted publish is still pending, record the exact workflow/blocker in Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prepare v0.4.1 patch release

Prepare the v0.4.1 release candidate from current main, including release plan, release notes, version parity, candidate branch, PR, hosted checks, and publication readiness evidence.

## Scope

- In scope: Prepare the v0.4.1 release candidate from current main, including release plan, release notes, version parity, candidate branch, PR, hosted checks, and publication readiness evidence.
- Out of scope: unrelated refactors not required for "Prepare v0.4.1 patch release".

## Plan

Release plan: version=0.4.1, tag=v0.4.1, scope=patch release from current main after v0.4.0. Additional approved scope from user: before continuing the release, correct the public recipes information architecture so the top-level Recipes section describes implemented installable signed recipes, and move Claude/Codex/Cursor/Aider/GitHub Actions/branch_pr copy-paste pages into workflow/integration guides instead of presenting them as installable recipes. Steps: generate release plan; consolidate recipe docs from implemented code and catalog inventory; write docs/releases/v0.4.1.md from v0.4.0..HEAD; run docs/recipes checks plus registry availability and release parity/prepublish gates; run branch_pr release candidate on dedicated worktree branch; open PR and wait for hosted checks; merge to main; verify hosted publish/tag/npm visibility or record exact blocker; clean stale merged task branches that are safe to remove. Out of scope: merging old backup/WIP local branches that are not proven release fixes.

## Verify Steps

1. Run `agentplane release plan --patch`. Expected: target is `0.4.1` / `v0.4.1` from current `v0.4.0` baseline.
2. Write and validate `docs/releases/v0.4.1.md` from `v0.4.0..HEAD`. Expected: release notes cover the release range and `node scripts/check-release-notes.mjs --version 0.4.1` passes.
3. Run registry/version gates. Expected: `node scripts/check-npm-version-availability.mjs --version 0.4.1`, `bun run release:parity`, and release candidate preflight pass.
4. Run `agentplane release candidate --push --yes` from the task worktree. Expected: versions and release artifacts are committed on the candidate branch, pushed, and no release tag is created locally before merge.
5. Open/merge the release PR after required hosted checks. Expected: `main` contains the release candidate and the task is closed through the branch_pr finish route.
6. Verify publication evidence. Expected: `v0.4.1` tag, GitHub Release or publish workflow outcome, and npm visibility for `agentplane`, `@agentplaneorg/core`, and `@agentplaneorg/recipes`; if hosted publish is still pending, record the exact workflow/blocker in Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
