---
id: "202608020639-X1DWST"
title: "Allow the v0.7 release version delta in compatibility evidence"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "compatibility"
  - "release-blocker"
  - "v0.7"
verify:
  - "bun test packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
  - "bun run bench:compatibility:check"
  - "bun run typecheck"
  - "bun run ci:contract"
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T06:41:13.430Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-02T06:41:46.473Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-02T06:41:46.473Z"
doc_updated_by: "CODER"
description: "Freeze the exact 0.7.0 package-manifest version and internal dependency parity delta in the reviewed compatibility candidate without modifying the immutable 0.6.24 baseline, and add regression coverage that rejects every non-version manifest drift."
sections:
  Summary: |-
    Allow the v0.7 release version delta in compatibility evidence

    Freeze the exact 0.7.0 package-manifest version and internal dependency parity delta in the reviewed compatibility candidate without modifying the immutable 0.6.24 baseline, and add regression coverage that rejects every non-version manifest drift.
  Scope: |-
    - In scope: Freeze the exact 0.7.0 package-manifest version and internal dependency parity delta in the reviewed compatibility candidate without modifying the immutable 0.6.24 baseline, and add regression coverage that rejects every non-version manifest drift.
    - Out of scope: unrelated refactors not required for "Allow the v0.7 release version delta in compatibility evidence".
  Plan: |-
    1. Model the planned release-version delta separately from the cumulative 0.7 compatibility surface, leaving the immutable 0.6.24 baseline and pre-version candidate digest unchanged.
    2. Accept only the exact 0.7.0 publishable package versions and internal dependency parity digest; reject any additional manifest, CLI, workflow, context, machine-output, or tarball drift.
    3. Freeze explicit source-task provenance and expected section/surface digests in the reviewed candidate artifact.
    4. Add focused positive and negative regression coverage for pre-version main, the exact planned release delta, and tampered manifest changes.
    5. Run the focused baseline suite, compatibility check, TypeScript typecheck, and full CI contract before independent review.
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow the v0.7 release version delta in compatibility evidence". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow the v0.7 release version delta in compatibility evidence". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "1c4f6b2e3d5103e1f62c71c104c5c615061eb4b4"
    version: 1
id_source: "generated"
---
## Summary

Allow the v0.7 release version delta in compatibility evidence

Freeze the exact 0.7.0 package-manifest version and internal dependency parity delta in the reviewed compatibility candidate without modifying the immutable 0.6.24 baseline, and add regression coverage that rejects every non-version manifest drift.

## Scope

- In scope: Freeze the exact 0.7.0 package-manifest version and internal dependency parity delta in the reviewed compatibility candidate without modifying the immutable 0.6.24 baseline, and add regression coverage that rejects every non-version manifest drift.
- Out of scope: unrelated refactors not required for "Allow the v0.7 release version delta in compatibility evidence".

## Plan

1. Model the planned release-version delta separately from the cumulative 0.7 compatibility surface, leaving the immutable 0.6.24 baseline and pre-version candidate digest unchanged.
2. Accept only the exact 0.7.0 publishable package versions and internal dependency parity digest; reject any additional manifest, CLI, workflow, context, machine-output, or tarball drift.
3. Freeze explicit source-task provenance and expected section/surface digests in the reviewed candidate artifact.
4. Add focused positive and negative regression coverage for pre-version main, the exact planned release delta, and tampered manifest changes.
5. Run the focused baseline suite, compatibility check, TypeScript typecheck, and full CI contract before independent review.

## Verify Steps

PLANNER fallback scaffold for "Allow the v0.7 release version delta in compatibility evidence". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow the v0.7 release version delta in compatibility evidence". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
