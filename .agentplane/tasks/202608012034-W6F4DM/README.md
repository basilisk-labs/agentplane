---
id: "202608012034-W6F4DM"
title: "Prevent artifact gate buffer overflow on large repositories"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202608011958-EMTWRX"
tags:
  - "code"
  - "release"
  - "reliability"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run artifacts:check"
  - "bun run ci:contract"
  - "bun run format:check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T20:34:50.161Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit:
  hash: "390bfc5a8817d63450b606c9453246bec377731e"
  message: "🛡️ W6F4DM release: bound artifact gate buffers"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation recorded: artifact policy child processes use an explicit 64 MiB bound; the original 1,234,456-byte tracked inventory now passes without changing policy semantics."
events:
  -
    type: "status"
    at: "2026-08-01T20:35:26.284Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T20:39:45.454Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation recorded: artifact policy child processes use an explicit 64 MiB bound; the original 1,234,456-byte tracked inventory now passes without changing policy semantics."
doc_version: 3
doc_updated_at: "2026-08-01T20:39:45.454Z"
doc_updated_by: "CODER"
description: "Raise deterministic child-process output bounds in the artifact policy gate so tracked path inventories larger than Node's default 1 MiB buffer remain verifiable without weakening artifact exclusions."
sections:
  Summary: |-
    Prevent artifact gate buffer overflow on large repositories

    Raise deterministic child-process output bounds in the artifact policy gate so tracked path inventories larger than Node's default 1 MiB buffer remain verifiable without weakening artifact exclusions.
  Scope: |-
    - In scope: Raise deterministic child-process output bounds in the artifact policy gate so tracked path inventories larger than Node's default 1 MiB buffer remain verifiable without weakening artifact exclusions.
    - Out of scope: unrelated refactors not required for "Prevent artifact gate buffer overflow on large repositories".
  Plan: "1. Preserve the failing evidence: tracked-path output is 1,234,923 bytes and artifacts:check exits with spawnSync git ENOBUFS under Node's default buffer. 2. Add one explicit bounded maxBuffer constant and apply it to every buffered git/tar child process in scripts/checks/check-agentplane-artifacts.mjs; do not relax volatile-artifact rules or cutoff semantics. 3. Re-run artifacts:check against the current repository, targeted lint/format, and the full ci:contract. 4. Publish and integrate the bounded repair before resuming RF-29 release:prepublish."
  Verify Steps: |-
    1. Run `git ls-files -z | wc -c`. Expected: output exceeds 1 MiB, preserving the original failure precondition.
    2. Run `bun run artifacts:check`. Expected: the complete tracked/archive inventories are evaluated and the artifact policy passes without ENOBUFS.
    3. Run targeted ESLint and Prettier checks for `scripts/checks/check-agentplane-artifacts.mjs`. Expected: no findings.
    4. Run `bun run ci:contract`. Expected: all repository contract checks pass.
    5. Run `git diff --check` and inspect the final worktree. Expected: only the bounded script change and task evidence are present.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: `git ls-files -z` emits 1,234,456 bytes on current main, exceeding Node child_process default maxBuffer; `bun run artifacts:check` reproduced `spawnSync git ENOBUFS`.
      Impact: Release prepublish stopped before evaluating artifact policy even though the repository contents were valid.
      Resolution: Added a shared 64 MiB bound to the three buffered git/tar calls used by the artifact gate. Artifact predicates, volatile cutoffs, and archive exclusions are unchanged.

    - Command: `bun run artifacts:check`
      Result: pass
      Evidence: `agentplane artifact policy OK` on the same 1.23 MiB tracked inventory.
      Scope: tracked and archived artifact inventory.

    - Command: targeted Prettier and ESLint plus `bun run ci:contract`
      Result: pass
      Evidence: formatting, schemas, policy, compatibility, TypeScript 7 toolchain, lint, architecture, clone, Knip, and thresholds passed.
      Scope: bounded script change and repository contract.
extensions:
  workflow_route_baseline:
    start_head_sha: "929105a503c42dcf9fe7af49c2d84627f246130e"
    version: 1
id_source: "generated"
---
## Summary

Prevent artifact gate buffer overflow on large repositories

Raise deterministic child-process output bounds in the artifact policy gate so tracked path inventories larger than Node's default 1 MiB buffer remain verifiable without weakening artifact exclusions.

## Scope

- In scope: Raise deterministic child-process output bounds in the artifact policy gate so tracked path inventories larger than Node's default 1 MiB buffer remain verifiable without weakening artifact exclusions.
- Out of scope: unrelated refactors not required for "Prevent artifact gate buffer overflow on large repositories".

## Plan

1. Preserve the failing evidence: tracked-path output is 1,234,923 bytes and artifacts:check exits with spawnSync git ENOBUFS under Node's default buffer. 2. Add one explicit bounded maxBuffer constant and apply it to every buffered git/tar child process in scripts/checks/check-agentplane-artifacts.mjs; do not relax volatile-artifact rules or cutoff semantics. 3. Re-run artifacts:check against the current repository, targeted lint/format, and the full ci:contract. 4. Publish and integrate the bounded repair before resuming RF-29 release:prepublish.

## Verify Steps

1. Run `git ls-files -z | wc -c`. Expected: output exceeds 1 MiB, preserving the original failure precondition.
2. Run `bun run artifacts:check`. Expected: the complete tracked/archive inventories are evaluated and the artifact policy passes without ENOBUFS.
3. Run targeted ESLint and Prettier checks for `scripts/checks/check-agentplane-artifacts.mjs`. Expected: no findings.
4. Run `bun run ci:contract`. Expected: all repository contract checks pass.
5. Run `git diff --check` and inspect the final worktree. Expected: only the bounded script change and task evidence are present.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: `git ls-files -z` emits 1,234,456 bytes on current main, exceeding Node child_process default maxBuffer; `bun run artifacts:check` reproduced `spawnSync git ENOBUFS`.
  Impact: Release prepublish stopped before evaluating artifact policy even though the repository contents were valid.
  Resolution: Added a shared 64 MiB bound to the three buffered git/tar calls used by the artifact gate. Artifact predicates, volatile cutoffs, and archive exclusions are unchanged.

- Command: `bun run artifacts:check`
  Result: pass
  Evidence: `agentplane artifact policy OK` on the same 1.23 MiB tracked inventory.
  Scope: tracked and archived artifact inventory.

- Command: targeted Prettier and ESLint plus `bun run ci:contract`
  Result: pass
  Evidence: formatting, schemas, policy, compatibility, TypeScript 7 toolchain, lint, architecture, clone, Knip, and thresholds passed.
  Scope: bounded script change and repository contract.
