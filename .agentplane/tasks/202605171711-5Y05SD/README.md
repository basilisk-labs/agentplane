---
id: "202605171711-5Y05SD"
title: "Improve local quality-check feedback loops"
result_summary: "Merged via PR #3840."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "quality"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T17:12:02.093Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T17:22:34.150Z"
  updated_by: "CODER"
  note: "Implemented deterministic local quality feedback-loop scripts and read-only docs-site checks. Verification passed: profile smoke, format:changed, docs:site:check with unchanged tracked status, typecheck/build via profile, lint:core, targeted script lint, test:critical, git diff --check, policy routing. Residual: lint:website has pre-existing type-aware website errors outside this change."
  attempts: 0
commit:
  hash: "30fbc60607d35300c2b0d0b3b20fb3c9f5d5cad0"
  message: "Merge pull request #3840 from basilisk-labs/task/202605171711-5Y05SD/quality-feedback-loops"
comments:
  -
    author: "CODER"
    body: "Start: Implement deterministic local quality feedback-loop commands in the task worktree, preserving existing CI contracts while adding targeted/profile scripts and read-only docs checks."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3840 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-17T17:12:16.207Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement deterministic local quality feedback-loop commands in the task worktree, preserving existing CI contracts while adding targeted/profile scripts and read-only docs checks."
  -
    type: "verify"
    at: "2026-05-17T17:22:34.150Z"
    author: "CODER"
    state: "ok"
    note: "Implemented deterministic local quality feedback-loop scripts and read-only docs-site checks. Verification passed: profile smoke, format:changed, docs:site:check with unchanged tracked status, typecheck/build via profile, lint:core, targeted script lint, test:critical, git diff --check, policy routing. Residual: lint:website has pre-existing type-aware website errors outside this change."
  -
    type: "status"
    at: "2026-05-17T17:28:07.142Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3840 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-17T17:28:07.148Z"
doc_updated_by: "INTEGRATOR"
description: "Make local quality checks more deterministic and faster after profiling lint, format, test, build, and docs checks; add targeted/profile commands and reduce write side effects in check scripts."
sections:
  Summary: |-
    Improve local quality-check feedback loops

    Make local quality checks more deterministic and faster after profiling lint, format, test, build, and docs checks; add targeted/profile commands and reduce write side effects in check scripts.
  Scope: |-
    - In scope: Make local quality checks more deterministic and faster after profiling lint, format, test, build, and docs checks; add targeted/profile commands and reduce write side effects in check scripts.
    - Out of scope: unrelated refactors not required for "Improve local quality-check feedback loops".
  Plan: "Implement local quality feedback-loop improvements from profiling: add a machine-readable profiler for core checks, add targeted changed-file formatting check, make docs site check read-only with explicit generate/build phases, keep expensive full checks available, and update npm scripts without replacing existing CI contracts. Verification: run the new profile command, targeted format command, docs site check path as feasible, typecheck/build, routing check, and targeted lint on changed scripts."
  Verify Steps: |-
    - Run `bun run ci:local:profile -- --help` or equivalent profiler smoke to confirm command discovery and output formatting.
    - Run `bun run format:changed -- --base HEAD` to confirm targeted Prettier check handles the active tree without writing files.
    - Run docs-site check/generate scripts in check mode to confirm `docs:site:check` is read-only for generated artifacts.
    - Run `bun run typecheck` and `bun run build` after implementation.
    - Run targeted lint for changed scripts/package configuration or record existing unrelated lint blockers.
    - Run `node .agentplane/policy/check-routing.mjs`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T17:22:34.150Z — VERIFY — ok

    By: CODER

    Note: Implemented deterministic local quality feedback-loop scripts and read-only docs-site checks. Verification passed: profile smoke, format:changed, docs:site:check with unchanged tracked status, typecheck/build via profile, lint:core, targeted script lint, test:critical, git diff --check, policy routing. Residual: lint:website has pre-existing type-aware website errors outside this change.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:12:16.207Z, excerpt_hash=sha256:adccafc3d65aebfe923cb0288dd630180b46767c9d7069517433eae1cd696a1a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171711-5Y05SD-quality-feedback-loops/.agentplane/tasks/202605171711-5Y05SD/blueprint/resolved-snapshot.json
    - old_digest: 91ce41388eb18f169d664de897584d80707d3451e7a08b4754a1a7bf88066c4e
    - current_digest: 91ce41388eb18f169d664de897584d80707d3451e7a08b4754a1a7bf88066c4e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171711-5Y05SD

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: lint:website still reports existing type-aware errors in website React/Docusaurus files unrelated to this task.
      Impact: Full website lint remains noisy as a broad gate, but changed scripts and docs-site build/check path are verified.
      Resolution: Recorded as residual existing blocker; use targeted script lint plus docs:site:check for this task scope.
id_source: "generated"
---
## Summary

Improve local quality-check feedback loops

Make local quality checks more deterministic and faster after profiling lint, format, test, build, and docs checks; add targeted/profile commands and reduce write side effects in check scripts.

## Scope

- In scope: Make local quality checks more deterministic and faster after profiling lint, format, test, build, and docs checks; add targeted/profile commands and reduce write side effects in check scripts.
- Out of scope: unrelated refactors not required for "Improve local quality-check feedback loops".

## Plan

Implement local quality feedback-loop improvements from profiling: add a machine-readable profiler for core checks, add targeted changed-file formatting check, make docs site check read-only with explicit generate/build phases, keep expensive full checks available, and update npm scripts without replacing existing CI contracts. Verification: run the new profile command, targeted format command, docs site check path as feasible, typecheck/build, routing check, and targeted lint on changed scripts.

## Verify Steps

- Run `bun run ci:local:profile -- --help` or equivalent profiler smoke to confirm command discovery and output formatting.
- Run `bun run format:changed -- --base HEAD` to confirm targeted Prettier check handles the active tree without writing files.
- Run docs-site check/generate scripts in check mode to confirm `docs:site:check` is read-only for generated artifacts.
- Run `bun run typecheck` and `bun run build` after implementation.
- Run targeted lint for changed scripts/package configuration or record existing unrelated lint blockers.
- Run `node .agentplane/policy/check-routing.mjs`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T17:22:34.150Z — VERIFY — ok

By: CODER

Note: Implemented deterministic local quality feedback-loop scripts and read-only docs-site checks. Verification passed: profile smoke, format:changed, docs:site:check with unchanged tracked status, typecheck/build via profile, lint:core, targeted script lint, test:critical, git diff --check, policy routing. Residual: lint:website has pre-existing type-aware website errors outside this change.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:12:16.207Z, excerpt_hash=sha256:adccafc3d65aebfe923cb0288dd630180b46767c9d7069517433eae1cd696a1a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171711-5Y05SD-quality-feedback-loops/.agentplane/tasks/202605171711-5Y05SD/blueprint/resolved-snapshot.json
- old_digest: 91ce41388eb18f169d664de897584d80707d3451e7a08b4754a1a7bf88066c4e
- current_digest: 91ce41388eb18f169d664de897584d80707d3451e7a08b4754a1a7bf88066c4e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171711-5Y05SD

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: lint:website still reports existing type-aware errors in website React/Docusaurus files unrelated to this task.
  Impact: Full website lint remains noisy as a broad gate, but changed scripts and docs-site build/check path are verified.
  Resolution: Recorded as residual existing blocker; use targeted script lint plus docs:site:check for this task scope.
