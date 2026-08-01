---
id: "202608011958-EMTWRX"
title: "Archive resolved RF-24/RF-25 help snapshot incident"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202607221908-TZTE5V"
tags:
  - "incident"
  - "release"
  - "rf-24"
  - "rf-25"
  - "v0.7"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify:
  - "agentplane doctor"
  - "bun run assets:builtin:check"
  - "bun run release:incidents:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T19:58:53.486Z"
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
    author: "DOCS"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-01T20:00:07.633Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-01T20:06:46.242Z"
doc_updated_by: "DOCS"
description: "Reconcile INC-20260801-01 against merged main evidence, preserve its final state in the historical archive, remove it from the active source and packaged registries, and reopen the release gates without changing runtime behavior."
sections:
  Summary: |-
    Archive resolved RF-24/RF-25 help snapshot incident

    Reconcile INC-20260801-01 against merged main evidence, preserve its final state in the historical archive, remove it from the active source and packaged registries, and reopen the release gates without changing runtime behavior.
  Scope: |-
    - In scope: Reconcile INC-20260801-01 against merged main evidence, preserve its final state in the historical archive, remove it from the active source and packaged registries, and reopen the release gates without changing runtime behavior.
    - Out of scope: unrelated refactors not required for "Archive resolved RF-24/RF-25 help snapshot incident".
  Plan: "1. Confirm INC-20260801-01 is fixed on current main by inspecting source task 202607221908-TZTE5V, merged commit evidence, and the focused help snapshot regression. 2. Move the complete incident entry from the active registry to docs/developer/incident-archive.mdx with archived state, archived_by, and archive_reason. 3. Keep packages/agentplane/assets/policy/incidents.md byte-identical to the active registry; do not change runtime behavior or canonical rules. 4. Run the release incident gate, builtin asset parity, routing check, doctor, and the focused help snapshot test. 5. Publish and integrate the dedicated docs-only PR, then resume RF-29 release gates on refreshed main."
  Verify Steps: |-
    1. Run `bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.help-snap.test.ts`. Expected: the merged help registry snapshot remains green.
    2. Run `bun run release:incidents:check`. Expected: no active incident blocks release.
    3. Run `bun run assets:builtin:check` and compare the active source and packaged incident registries. Expected: builtin assets are fresh and the registries are byte-identical.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing and size budgets pass.
    5. Run `agentplane doctor`. Expected: exit 0 with no errors; unrelated historical warnings are recorded as residual findings.
    6. Run `git diff --check` and inspect all tracked/untracked paths. Expected: only the approved incident archive, mirrored active registry, and task artifacts changed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: INC-20260801-01 describes a help registry snapshot mismatch already fixed by source task 202607221908-TZTE5V.
      Impact: Keeping the resolved record active blocks every release prepublish gate even though no operator work remains.
      Resolution: Confirmed implementation commit 8fc6ef287988 and merged main commit e6314937c7de05d3a3a68c9e666c6a4aaaf4fc9b, then passed the focused cli-core help snapshot suite with 13/13 tests.

    - Observation: The active source and packaged incident registries were byte-identical before and after removal.
      Impact: Archival cannot create installed-policy drift.
      Resolution: Preserved the complete final record in docs/developer/incident-archive.mdx and passed release:incidents:check, assets:builtin:check, policy routing, and doctor. Doctor exited 0 with four unrelated historical workflow/task-metadata warnings already present on main.
extensions:
  workflow_route_baseline:
    start_head_sha: "14185e94deadff666a1544413ba5ae728dcacdfb"
    version: 1
id_source: "generated"
---
## Summary

Archive resolved RF-24/RF-25 help snapshot incident

Reconcile INC-20260801-01 against merged main evidence, preserve its final state in the historical archive, remove it from the active source and packaged registries, and reopen the release gates without changing runtime behavior.

## Scope

- In scope: Reconcile INC-20260801-01 against merged main evidence, preserve its final state in the historical archive, remove it from the active source and packaged registries, and reopen the release gates without changing runtime behavior.
- Out of scope: unrelated refactors not required for "Archive resolved RF-24/RF-25 help snapshot incident".

## Plan

1. Confirm INC-20260801-01 is fixed on current main by inspecting source task 202607221908-TZTE5V, merged commit evidence, and the focused help snapshot regression. 2. Move the complete incident entry from the active registry to docs/developer/incident-archive.mdx with archived state, archived_by, and archive_reason. 3. Keep packages/agentplane/assets/policy/incidents.md byte-identical to the active registry; do not change runtime behavior or canonical rules. 4. Run the release incident gate, builtin asset parity, routing check, doctor, and the focused help snapshot test. 5. Publish and integrate the dedicated docs-only PR, then resume RF-29 release gates on refreshed main.

## Verify Steps

1. Run `bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.help-snap.test.ts`. Expected: the merged help registry snapshot remains green.
2. Run `bun run release:incidents:check`. Expected: no active incident blocks release.
3. Run `bun run assets:builtin:check` and compare the active source and packaged incident registries. Expected: builtin assets are fresh and the registries are byte-identical.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing and size budgets pass.
5. Run `agentplane doctor`. Expected: exit 0 with no errors; unrelated historical warnings are recorded as residual findings.
6. Run `git diff --check` and inspect all tracked/untracked paths. Expected: only the approved incident archive, mirrored active registry, and task artifacts changed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: INC-20260801-01 describes a help registry snapshot mismatch already fixed by source task 202607221908-TZTE5V.
  Impact: Keeping the resolved record active blocks every release prepublish gate even though no operator work remains.
  Resolution: Confirmed implementation commit 8fc6ef287988 and merged main commit e6314937c7de05d3a3a68c9e666c6a4aaaf4fc9b, then passed the focused cli-core help snapshot suite with 13/13 tests.

- Observation: The active source and packaged incident registries were byte-identical before and after removal.
  Impact: Archival cannot create installed-policy drift.
  Resolution: Preserved the complete final record in docs/developer/incident-archive.mdx and passed release:incidents:check, assets:builtin:check, policy routing, and doctor. Doctor exited 0 with four unrelated historical workflow/task-metadata warnings already present on main.
