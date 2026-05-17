---
id: "202605170941-3RACDD"
title: "Fix context wiki lint on initialized wiki scaffold"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 2
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-17T09:42:18.790Z"
doc_updated_by: "ORCHESTRATOR"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
