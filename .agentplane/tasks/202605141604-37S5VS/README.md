---
id: "202605141604-37S5VS"
title: "Enable feedback issue prompts by default"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T16:04:34.617Z"
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
    body: "Start: implementing default-on feedback issue prompts, explicit opt-out documentation, and focused tests/docs verification in the task worktree."
events:
  -
    type: "status"
    at: "2026-05-14T16:05:09.671Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing default-on feedback issue prompts, explicit opt-out documentation, and focused tests/docs verification in the task worktree."
doc_version: 3
doc_updated_at: "2026-05-14T16:16:16.921Z"
doc_updated_by: "CODER"
description: "Change AgentPlane feedback GitHub issue prompts to be enabled by default, keep opt-out command support, and document the deliberate default in README and website docs."
sections:
  Summary: |-
    Enable feedback issue prompts by default

    Change AgentPlane feedback GitHub issue prompts to be enabled by default, keep opt-out command support, and document the deliberate default in README and website docs.
  Scope: |-
    - In scope: Change AgentPlane feedback GitHub issue prompts to be enabled by default, keep opt-out command support, and document the deliberate default in README and website docs.
    - Out of scope: unrelated refactors not required for "Enable feedback issue prompts by default".
  Plan: |-
    1. Update feedback GitHub issue defaults so newly initialized AgentPlane projects enable feedback.github_issues.enabled by default while retaining explicit opt-out via config set.
    2. Ensure init presets/non-interactive flows write the new default consistently and tests cover default-on plus explicit false opt-out.
    3. Update README and website/docs copy to state the project intentionally enables this feedback issue prompt mode to speed development, and provide the disable command for users who do not want it.
    4. Regenerate generated docs/schemas if affected and run focused config/init/insights tests plus docs/schema/lint/type checks.
  Verify Steps: |-
    1. Run focused Vitest coverage for feedback config defaults, init prompt/default behavior, insights issue handling, CLI help snapshots, and command catalog/help contracts. Expected: all selected tests pass.
    2. Run generated artifact checks for config schemas and CLI reference docs. Expected: schemas and docs are in sync.
    3. Run formatting, TypeScript, knip, targeted ESLint for changed source/site files, and Docusaurus site checks. Expected: changed scope passes; any broader pre-existing website lint drift is recorded separately.
    4. Run AgentPlane policy/runtime checks. Expected: routing validation and ap doctor pass, with unrelated existing warnings explicitly noted if present.
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

Enable feedback issue prompts by default

Change AgentPlane feedback GitHub issue prompts to be enabled by default, keep opt-out command support, and document the deliberate default in README and website docs.

## Scope

- In scope: Change AgentPlane feedback GitHub issue prompts to be enabled by default, keep opt-out command support, and document the deliberate default in README and website docs.
- Out of scope: unrelated refactors not required for "Enable feedback issue prompts by default".

## Plan

1. Update feedback GitHub issue defaults so newly initialized AgentPlane projects enable feedback.github_issues.enabled by default while retaining explicit opt-out via config set.
2. Ensure init presets/non-interactive flows write the new default consistently and tests cover default-on plus explicit false opt-out.
3. Update README and website/docs copy to state the project intentionally enables this feedback issue prompt mode to speed development, and provide the disable command for users who do not want it.
4. Regenerate generated docs/schemas if affected and run focused config/init/insights tests plus docs/schema/lint/type checks.

## Verify Steps

1. Run focused Vitest coverage for feedback config defaults, init prompt/default behavior, insights issue handling, CLI help snapshots, and command catalog/help contracts. Expected: all selected tests pass.
2. Run generated artifact checks for config schemas and CLI reference docs. Expected: schemas and docs are in sync.
3. Run formatting, TypeScript, knip, targeted ESLint for changed source/site files, and Docusaurus site checks. Expected: changed scope passes; any broader pre-existing website lint drift is recorded separately.
4. Run AgentPlane policy/runtime checks. Expected: routing validation and ap doctor pass, with unrelated existing warnings explicitly noted if present.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
