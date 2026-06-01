---
id: "202606010945-5ZHGFA"
title: "Prepare v0.6.14 patch release documentation"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-01T09:46:10.714Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-01T09:49:48.129Z"
  updated_by: "DOCS"
  note: "Docs release-prep checks passed: docs:site:generate:check, docs:bootstrap:check, docs:cli:check, docs:recipes:check, docs:scripts:check, release:parity, check-routing, ap doctor, registry availability for 0.6.14, and release-notes coverage for all 41 planned commits. release:tasks:check is deferred until after this DOING release-prep task merges and closes because the gate correctly blocks active release tasks."
  attempts: 0
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: prepare v0.6.14 patch release documentation, generated docs freshness, and release gate evidence from the dedicated branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-06-01T09:46:37.513Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare v0.6.14 patch release documentation, generated docs freshness, and release gate evidence from the dedicated branch_pr worktree."
  -
    type: "verify"
    at: "2026-06-01T09:49:48.129Z"
    author: "DOCS"
    state: "ok"
    note: "Docs release-prep checks passed: docs:site:generate:check, docs:bootstrap:check, docs:cli:check, docs:recipes:check, docs:scripts:check, release:parity, check-routing, ap doctor, registry availability for 0.6.14, and release-notes coverage for all 41 planned commits. release:tasks:check is deferred until after this DOING release-prep task merges and closes because the gate correctly blocks active release tasks."
doc_version: 3
doc_updated_at: "2026-06-01T09:49:48.145Z"
doc_updated_by: "DOCS"
description: "Prepare the v0.6.14 patch release candidate documentation and generated docs freshness evidence. Scope: release notes, generated website llms-full output, release preflight evidence, and branch_pr candidate preparation without publishing npm packages or tags."
sections:
  Summary: |-
    Prepare v0.6.14 patch release documentation

    Prepare the v0.6.14 patch release candidate documentation and generated docs freshness evidence. Scope: release notes, generated website llms-full output, release preflight evidence, and branch_pr candidate preparation without publishing npm packages or tags.
  Scope: "In scope: docs/releases/v0.6.14.md, generated website/static/llms-full.txt freshness, release preflight evidence, branch_pr release candidate preparation for v0.6.14. Out of scope: npm publication, tag push, GitHub release publication, cloud-sync implementation fixes for issues #4353/#4355 unless release checks prove they are blocking."
  Plan: "Release plan: version=0.6.14, tag=v0.6.14, scope=patch release docs and generated docs freshness. Steps: refresh website/static/llms-full.txt, write docs/releases/v0.6.14.md from .agentplane/.release/plan/2026-06-01T08-21-18-028Z, verify docs match CLI/generated code surfaces, run release/docs gates, prepare branch_pr release candidate without npm/tag publication. Verify: git status full audit, docs freshness checks, release:tasks:check, release:parity, check-routing, agentplane doctor, release:check, release registry availability for 0.6.14."
  Verify Steps: |-
    1. git status --short --untracked-files=all
    2. bun run docs:site:generate:check
    3. bun run docs:bootstrap:check
    4. bun run docs:cli:check
    5. bun run docs:recipes:check
    6. bun run docs:scripts:check
    7. bun run release:parity
    8. node .agentplane/policy/check-routing.mjs
    9. ap doctor
    10. bun run release:check:registry -- --version 0.6.14
    11. Verify release notes cover all 41 commits from .agentplane/.release/plan/2026-06-01T09-47-05-624Z/changes.md.
    12. After this task merges and closes on main, rerun bun run release:tasks:check and bun run release:check because DOING release tasks correctly block candidate readiness.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-01T09:49:48.129Z — VERIFY — ok

    By: DOCS

    Note: Docs release-prep checks passed: docs:site:generate:check, docs:bootstrap:check, docs:cli:check, docs:recipes:check, docs:scripts:check, release:parity, check-routing, ap doctor, registry availability for 0.6.14, and release-notes coverage for all 41 planned commits. release:tasks:check is deferred until after this DOING release-prep task merges and closes because the gate correctly blocks active release tasks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T09:49:03.892Z, excerpt_hash=sha256:c855a7238d486735764e5ff5e11b51c56c14e748d86ab866bd70f68a5499de25

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010945-5ZHGFA-prepare-v0-6-14-patch-release-documentation/.agentplane/tasks/202606010945-5ZHGFA/blueprint/resolved-snapshot.json
    - old_digest: dc21264009c6b987c716fc5e5486a871e4f1346f45832dadfb529bee4208565b
    - current_digest: dc21264009c6b987c716fc5e5486a871e4f1346f45832dadfb529bee4208565b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606010945-5ZHGFA

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the release-prep branch or regenerate docs from the previous clean main state. Do not publish npm packages or tags from this task without separate explicit approval."
  Findings: |-
    - Observation: release:tasks:check fails in this worktree only because 202606010945-5ZHGFA is DOING.
      Impact: Candidate readiness must be rechecked on main after merge/finish before any release candidate or publish step.
      Resolution: Repeat release:tasks:check and release:check on clean main after task closure.
id_source: "generated"
---
## Summary

Prepare v0.6.14 patch release documentation

Prepare the v0.6.14 patch release candidate documentation and generated docs freshness evidence. Scope: release notes, generated website llms-full output, release preflight evidence, and branch_pr candidate preparation without publishing npm packages or tags.

## Scope

In scope: docs/releases/v0.6.14.md, generated website/static/llms-full.txt freshness, release preflight evidence, branch_pr release candidate preparation for v0.6.14. Out of scope: npm publication, tag push, GitHub release publication, cloud-sync implementation fixes for issues #4353/#4355 unless release checks prove they are blocking.

## Plan

Release plan: version=0.6.14, tag=v0.6.14, scope=patch release docs and generated docs freshness. Steps: refresh website/static/llms-full.txt, write docs/releases/v0.6.14.md from .agentplane/.release/plan/2026-06-01T08-21-18-028Z, verify docs match CLI/generated code surfaces, run release/docs gates, prepare branch_pr release candidate without npm/tag publication. Verify: git status full audit, docs freshness checks, release:tasks:check, release:parity, check-routing, agentplane doctor, release:check, release registry availability for 0.6.14.

## Verify Steps

1. git status --short --untracked-files=all
2. bun run docs:site:generate:check
3. bun run docs:bootstrap:check
4. bun run docs:cli:check
5. bun run docs:recipes:check
6. bun run docs:scripts:check
7. bun run release:parity
8. node .agentplane/policy/check-routing.mjs
9. ap doctor
10. bun run release:check:registry -- --version 0.6.14
11. Verify release notes cover all 41 commits from .agentplane/.release/plan/2026-06-01T09-47-05-624Z/changes.md.
12. After this task merges and closes on main, rerun bun run release:tasks:check and bun run release:check because DOING release tasks correctly block candidate readiness.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-01T09:49:48.129Z — VERIFY — ok

By: DOCS

Note: Docs release-prep checks passed: docs:site:generate:check, docs:bootstrap:check, docs:cli:check, docs:recipes:check, docs:scripts:check, release:parity, check-routing, ap doctor, registry availability for 0.6.14, and release-notes coverage for all 41 planned commits. release:tasks:check is deferred until after this DOING release-prep task merges and closes because the gate correctly blocks active release tasks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T09:49:03.892Z, excerpt_hash=sha256:c855a7238d486735764e5ff5e11b51c56c14e748d86ab866bd70f68a5499de25

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010945-5ZHGFA-prepare-v0-6-14-patch-release-documentation/.agentplane/tasks/202606010945-5ZHGFA/blueprint/resolved-snapshot.json
- old_digest: dc21264009c6b987c716fc5e5486a871e4f1346f45832dadfb529bee4208565b
- current_digest: dc21264009c6b987c716fc5e5486a871e4f1346f45832dadfb529bee4208565b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606010945-5ZHGFA

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the release-prep branch or regenerate docs from the previous clean main state. Do not publish npm packages or tags from this task without separate explicit approval.

## Findings

- Observation: release:tasks:check fails in this worktree only because 202606010945-5ZHGFA is DOING.
  Impact: Candidate readiness must be rechecked on main after merge/finish before any release candidate or publish step.
  Resolution: Repeat release:tasks:check and release:check on clean main after task closure.
