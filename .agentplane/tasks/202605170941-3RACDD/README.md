---
id: "202605170941-3RACDD"
title: "Fix context wiki lint on initialized wiki scaffold"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "context"
  - "init"
  - "lint"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T17:40:47.816Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-18T17:46:14.484Z"
  updated_by: "CODER"
  note: "Verified: context wiki lint allows initialized scaffold navigation files without page frontmatter while preserving page validation for source-backed wiki pages. Focused context release-readiness tests passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: align context init scaffold files with context wiki lint so whole-tree lint passes after initialization while preserving stricter validation for source-backed content pages."
events:
  -
    type: "status"
    at: "2026-05-18T17:41:33.455Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align context init scaffold files with context wiki lint so whole-tree lint passes after initialization while preserving stricter validation for source-backed content pages."
  -
    type: "verify"
    at: "2026-05-18T17:46:14.484Z"
    author: "CODER"
    state: "ok"
    note: "Verified: context wiki lint allows initialized scaffold navigation files without page frontmatter while preserving page validation for source-backed wiki pages. Focused context release-readiness tests passed."
doc_version: 3
doc_updated_at: "2026-05-18T17:46:14.516Z"
doc_updated_by: "CODER"
description: "context init creates scaffold wiki files such as context/wiki/AGENTS.md and section index.md pages without YAML frontmatter, but context wiki lint context/wiki currently fails on those scaffold files. Update lint/init contract so whole-tree lint passes after init while still enforcing frontmatter/source refs on real content pages."
sections:
  Summary: |-
    Fix context wiki lint on initialized wiki scaffold

    context init creates scaffold wiki files such as context/wiki/AGENTS.md and section index.md pages without YAML frontmatter, but context wiki lint context/wiki currently fails on those scaffold files. Update lint/init contract so whole-tree lint passes after init while still enforcing frontmatter/source refs on real content pages.
  Scope: |-
    - In scope: context init creates scaffold wiki files such as context/wiki/AGENTS.md and section index.md pages without YAML frontmatter, but context wiki lint context/wiki currently fails on those scaffold files. Update lint/init contract so whole-tree lint passes after init while still enforcing frontmatter/source refs on real content pages.
    - Out of scope: unrelated refactors not required for "Fix context wiki lint on initialized wiki scaffold".
  Plan: "Reproduce with a fresh context init workspace, then decide whether scaffold pages should receive minimal frontmatter or context wiki lint should skip declared scaffold/navigation files. Add focused tests for context init followed by context wiki lint context/wiki. Do not change unrelated wiki validation rules."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix context wiki lint on initialized wiki scaffold". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix context wiki lint on initialized wiki scaffold". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-18T17:46:14.484Z — VERIFY — ok

    By: CODER

    Note: Verified: context wiki lint allows initialized scaffold navigation files without page frontmatter while preserving page validation for source-backed wiki pages. Focused context release-readiness tests passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T17:41:33.455Z, excerpt_hash=sha256:3ced0c8c543244daec21c6e9fe03ccae557f38243d1fdef653bf311a48264c58

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171326-FXRVNW-v063-prerelease-rough-edges/.agentplane/tasks/202605170941-3RACDD/blueprint/resolved-snapshot.json
    - old_digest: 38b9fbc260510585e0732ad8a9d63860e68bb4e569ecd86f1c0abf89e8f23730
    - current_digest: 38b9fbc260510585e0732ad8a9d63860e68bb4e569ecd86f1c0abf89e8f23730
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170941-3RACDD

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix context wiki lint on initialized wiki scaffold

context init creates scaffold wiki files such as context/wiki/AGENTS.md and section index.md pages without YAML frontmatter, but context wiki lint context/wiki currently fails on those scaffold files. Update lint/init contract so whole-tree lint passes after init while still enforcing frontmatter/source refs on real content pages.

## Scope

- In scope: context init creates scaffold wiki files such as context/wiki/AGENTS.md and section index.md pages without YAML frontmatter, but context wiki lint context/wiki currently fails on those scaffold files. Update lint/init contract so whole-tree lint passes after init while still enforcing frontmatter/source refs on real content pages.
- Out of scope: unrelated refactors not required for "Fix context wiki lint on initialized wiki scaffold".

## Plan

Reproduce with a fresh context init workspace, then decide whether scaffold pages should receive minimal frontmatter or context wiki lint should skip declared scaffold/navigation files. Add focused tests for context init followed by context wiki lint context/wiki. Do not change unrelated wiki validation rules.

## Verify Steps

PLANNER fallback scaffold for "Fix context wiki lint on initialized wiki scaffold". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix context wiki lint on initialized wiki scaffold". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-18T17:46:14.484Z — VERIFY — ok

By: CODER

Note: Verified: context wiki lint allows initialized scaffold navigation files without page frontmatter while preserving page validation for source-backed wiki pages. Focused context release-readiness tests passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T17:41:33.455Z, excerpt_hash=sha256:3ced0c8c543244daec21c6e9fe03ccae557f38243d1fdef653bf311a48264c58

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171326-FXRVNW-v063-prerelease-rough-edges/.agentplane/tasks/202605170941-3RACDD/blueprint/resolved-snapshot.json
- old_digest: 38b9fbc260510585e0732ad8a9d63860e68bb4e569ecd86f1c0abf89e8f23730
- current_digest: 38b9fbc260510585e0732ad8a9d63860e68bb4e569ecd86f1c0abf89e8f23730
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170941-3RACDD

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
