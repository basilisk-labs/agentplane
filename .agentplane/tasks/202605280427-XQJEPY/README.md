---
id: "202605280427-XQJEPY"
title: "Migrate process runner to execa v9"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "dependencies"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T04:28:08.509Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T05:51:00.457Z"
  updated_by: "CODER"
  note: "Extended dependency update verified: upgraded @typescript-eslint/eslint-plugin to 8.60.0, @typescript-eslint/parser to 8.60.0, and turbo to 2.9.15; npm outdated returned {}; local checks passed: format:check, core build, targeted eslint, test:project -- core, test:critical, policy routing."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Migrate the core process runner to execa v9 in the dedicated branch_pr worktree, preserve the public process API, and record an outdated dependency audit without upgrading unrelated packages."
events:
  -
    type: "status"
    at: "2026-05-28T04:28:47.996Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Migrate the core process runner to execa v9 in the dedicated branch_pr worktree, preserve the public process API, and record an outdated dependency audit without upgrading unrelated packages."
  -
    type: "verify"
    at: "2026-05-28T04:40:04.894Z"
    author: "CODER"
    state: "ok"
    note: "Migrated @agentplaneorg/core process runner to execa v9.6.1 with compatibility normalization for named API, killed flag, Buffer output, and Bun binary-output runtime behavior. Verification passed: bun test packages/core/src/process/run-process.test.ts; bun run test:project -- core packages/core/src/process/run-process.test.ts; bun run --filter=@agentplaneorg/core build; bun run test:project -- core; bun run test:critical; bun run format:check; node .agentplane/policy/check-routing.mjs; ap doctor; targeted eslint on changed process files; git diff --check. npm outdated reports only patch-level @typescript-eslint/eslint-plugin, @typescript-eslint/parser, and turbo follow-ups."
  -
    type: "verify"
    at: "2026-05-28T05:51:00.457Z"
    author: "CODER"
    state: "ok"
    note: "Extended dependency update verified: upgraded @typescript-eslint/eslint-plugin to 8.60.0, @typescript-eslint/parser to 8.60.0, and turbo to 2.9.15; npm outdated returned {}; local checks passed: format:check, core build, targeted eslint, test:project -- core, test:critical, policy routing."
doc_version: 3
doc_updated_at: "2026-05-28T07:33:51.724Z"
doc_updated_by: "CODER"
description: "Upgrade @agentplaneorg/core process execution from execa v5 to v9, preserve runProcess/runProcessSync/startProcess/execFileAsync behavior, and audit other outdated package versions for follow-up decisions."
sections:
  Summary: |-
    Migrate process runner to execa v9

    Upgrade @agentplaneorg/core process execution from execa v5 to v9, preserve runProcess/runProcessSync/startProcess/execFileAsync behavior, and audit other outdated package versions for follow-up decisions.
  Scope: |-
    - In scope: Upgrade @agentplaneorg/core process execution from execa v5 to v9, preserve runProcess/runProcessSync/startProcess/execFileAsync behavior, and audit other outdated package versions for follow-up decisions.
    - Out of scope: unrelated refactors not required for "Migrate process runner to execa v9".
  Plan: "Plan: migrate the core process runner from execa v5 to execa v9 in a dedicated branch_pr worktree; preserve the public @agentplaneorg/core/process API shape used by CLI, hooks, PR, release, and archive paths; update package metadata and bun.lock; add or adjust focused tests for async, sync, failure/error shape, detached/startProcess, and execFileAsync compatibility; run targeted and repo-level verification; produce an outdated-dependency audit from package metadata without upgrading unrelated packages in this task."
  Verify Steps: |-
    1. Inspect current execa usage and npm metadata. Expected: exact API breakpoints and outdated package list are recorded in the final report.
    2. Update @agentplaneorg/core dependency metadata and lockfile to execa v9. Expected: package.json and bun.lock contain execa ^9.6.1 without unrelated package upgrades.
    3. Migrate packages/core/src/process/run-process.ts to execa v9. Expected: runProcess, runProcessSync, startProcess, and execFileAsync keep their public behavior for existing callers.
    4. Run focused process tests. Expected: bun test packages/core/src/process/run-process.test.ts passes.
    5. Run core build/typecheck. Expected: bun run --filter=@agentplaneorg/core build passes.
    6. Run broader verification for affected CLI/process surfaces. Expected: bun run test:project -- core and bun run test:critical pass or failures are recorded with exact scope.
    7. Run policy and routing checks. Expected: node .agentplane/policy/check-routing.mjs and ap doctor pass.
    8. Open/update the branch_pr PR. Expected: PR describes migration risk, verification evidence, and outdated dependency audit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T04:40:04.894Z — VERIFY — ok

    By: CODER

    Note: Migrated @agentplaneorg/core process runner to execa v9.6.1 with compatibility normalization for named API, killed flag, Buffer output, and Bun binary-output runtime behavior. Verification passed: bun test packages/core/src/process/run-process.test.ts; bun run test:project -- core packages/core/src/process/run-process.test.ts; bun run --filter=@agentplaneorg/core build; bun run test:project -- core; bun run test:critical; bun run format:check; node .agentplane/policy/check-routing.mjs; ap doctor; targeted eslint on changed process files; git diff --check. npm outdated reports only patch-level @typescript-eslint/eslint-plugin, @typescript-eslint/parser, and turbo follow-ups.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T04:39:52.265Z, excerpt_hash=sha256:4dbd0a525328f8248a0b71281ce5ccb5e5f0707389f26d524a4e633abc54e164

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605280427-XQJEPY-migrate-process-runner-to-execa-v9/.agentplane/tasks/202605280427-XQJEPY/blueprint/resolved-snapshot.json
    - old_digest: 24db6eb344551440f8d0e63294829e45fa777a0e8116c40c62505adf4b3ad835
    - current_digest: 24db6eb344551440f8d0e63294829e45fa777a0e8116c40c62505adf4b3ad835
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605280427-XQJEPY

    ### 2026-05-28T05:51:00.457Z — VERIFY — ok

    By: CODER

    Note: Extended dependency update verified: upgraded @typescript-eslint/eslint-plugin to 8.60.0, @typescript-eslint/parser to 8.60.0, and turbo to 2.9.15; npm outdated returned {}; local checks passed: format:check, core build, targeted eslint, test:project -- core, test:critical, policy routing.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T05:50:08.247Z, excerpt_hash=sha256:4dbd0a525328f8248a0b71281ce5ccb5e5f0707389f26d524a4e633abc54e164

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605280427-XQJEPY-migrate-process-runner-to-execa-v9/.agentplane/tasks/202605280427-XQJEPY/blueprint/resolved-snapshot.json
    - old_digest: 24db6eb344551440f8d0e63294829e45fa777a0e8116c40c62505adf4b3ad835
    - current_digest: 24db6eb344551440f8d0e63294829e45fa777a0e8116c40c62505adf4b3ad835
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605280427-XQJEPY

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Outdated dependency audit after execa migration: npm outdated reports @typescript-eslint/eslint-plugin 8.59.4 -> 8.60.0, @typescript-eslint/parser 8.59.4 -> 8.60.0, and turbo 2.9.14 -> 2.9.15.
      Impact: These are patch-level devDependency updates and are not required to unblock execa v9. Mixing them into this process-runner migration would widen review and verification scope.
      Resolution: Leave them as a follow-up dependency-maintenance PR/task; do not upgrade them in this task.

    - Observation: Follow-up direct dependency audit is now clean after upgrading @typescript-eslint/eslint-plugin to 8.60.0, @typescript-eslint/parser to 8.60.0, and turbo to 2.9.15.
      Impact: The execa major migration PR no longer leaves known outdated direct packages from the audit.
      Resolution: Updated package.json and bun.lock, refreshed installed dependencies, and reran npm outdated plus local verification before merge.

    - Observation: Codex review identified that @agentplaneorg/core still advertised Node >=20 while execa 9 requires >=20.5.0 for Node 20.
      Impact: Published core consumers on Node 20.0-20.4 would see an advertised-supported runtime with an incompatible dependency.
      Resolution: Raised @agentplaneorg/core engines.node to >=20.5.0; agentplane CLI already requires >=24, and recipes has no execa dependency.
id_source: "generated"
---
## Summary

Migrate process runner to execa v9

Upgrade @agentplaneorg/core process execution from execa v5 to v9, preserve runProcess/runProcessSync/startProcess/execFileAsync behavior, and audit other outdated package versions for follow-up decisions.

## Scope

- In scope: Upgrade @agentplaneorg/core process execution from execa v5 to v9, preserve runProcess/runProcessSync/startProcess/execFileAsync behavior, and audit other outdated package versions for follow-up decisions.
- Out of scope: unrelated refactors not required for "Migrate process runner to execa v9".

## Plan

Plan: migrate the core process runner from execa v5 to execa v9 in a dedicated branch_pr worktree; preserve the public @agentplaneorg/core/process API shape used by CLI, hooks, PR, release, and archive paths; update package metadata and bun.lock; add or adjust focused tests for async, sync, failure/error shape, detached/startProcess, and execFileAsync compatibility; run targeted and repo-level verification; produce an outdated-dependency audit from package metadata without upgrading unrelated packages in this task.

## Verify Steps

1. Inspect current execa usage and npm metadata. Expected: exact API breakpoints and outdated package list are recorded in the final report.
2. Update @agentplaneorg/core dependency metadata and lockfile to execa v9. Expected: package.json and bun.lock contain execa ^9.6.1 without unrelated package upgrades.
3. Migrate packages/core/src/process/run-process.ts to execa v9. Expected: runProcess, runProcessSync, startProcess, and execFileAsync keep their public behavior for existing callers.
4. Run focused process tests. Expected: bun test packages/core/src/process/run-process.test.ts passes.
5. Run core build/typecheck. Expected: bun run --filter=@agentplaneorg/core build passes.
6. Run broader verification for affected CLI/process surfaces. Expected: bun run test:project -- core and bun run test:critical pass or failures are recorded with exact scope.
7. Run policy and routing checks. Expected: node .agentplane/policy/check-routing.mjs and ap doctor pass.
8. Open/update the branch_pr PR. Expected: PR describes migration risk, verification evidence, and outdated dependency audit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T04:40:04.894Z — VERIFY — ok

By: CODER

Note: Migrated @agentplaneorg/core process runner to execa v9.6.1 with compatibility normalization for named API, killed flag, Buffer output, and Bun binary-output runtime behavior. Verification passed: bun test packages/core/src/process/run-process.test.ts; bun run test:project -- core packages/core/src/process/run-process.test.ts; bun run --filter=@agentplaneorg/core build; bun run test:project -- core; bun run test:critical; bun run format:check; node .agentplane/policy/check-routing.mjs; ap doctor; targeted eslint on changed process files; git diff --check. npm outdated reports only patch-level @typescript-eslint/eslint-plugin, @typescript-eslint/parser, and turbo follow-ups.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T04:39:52.265Z, excerpt_hash=sha256:4dbd0a525328f8248a0b71281ce5ccb5e5f0707389f26d524a4e633abc54e164

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605280427-XQJEPY-migrate-process-runner-to-execa-v9/.agentplane/tasks/202605280427-XQJEPY/blueprint/resolved-snapshot.json
- old_digest: 24db6eb344551440f8d0e63294829e45fa777a0e8116c40c62505adf4b3ad835
- current_digest: 24db6eb344551440f8d0e63294829e45fa777a0e8116c40c62505adf4b3ad835
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605280427-XQJEPY

### 2026-05-28T05:51:00.457Z — VERIFY — ok

By: CODER

Note: Extended dependency update verified: upgraded @typescript-eslint/eslint-plugin to 8.60.0, @typescript-eslint/parser to 8.60.0, and turbo to 2.9.15; npm outdated returned {}; local checks passed: format:check, core build, targeted eslint, test:project -- core, test:critical, policy routing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T05:50:08.247Z, excerpt_hash=sha256:4dbd0a525328f8248a0b71281ce5ccb5e5f0707389f26d524a4e633abc54e164

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605280427-XQJEPY-migrate-process-runner-to-execa-v9/.agentplane/tasks/202605280427-XQJEPY/blueprint/resolved-snapshot.json
- old_digest: 24db6eb344551440f8d0e63294829e45fa777a0e8116c40c62505adf4b3ad835
- current_digest: 24db6eb344551440f8d0e63294829e45fa777a0e8116c40c62505adf4b3ad835
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605280427-XQJEPY

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Outdated dependency audit after execa migration: npm outdated reports @typescript-eslint/eslint-plugin 8.59.4 -> 8.60.0, @typescript-eslint/parser 8.59.4 -> 8.60.0, and turbo 2.9.14 -> 2.9.15.
  Impact: These are patch-level devDependency updates and are not required to unblock execa v9. Mixing them into this process-runner migration would widen review and verification scope.
  Resolution: Leave them as a follow-up dependency-maintenance PR/task; do not upgrade them in this task.

- Observation: Follow-up direct dependency audit is now clean after upgrading @typescript-eslint/eslint-plugin to 8.60.0, @typescript-eslint/parser to 8.60.0, and turbo to 2.9.15.
  Impact: The execa major migration PR no longer leaves known outdated direct packages from the audit.
  Resolution: Updated package.json and bun.lock, refreshed installed dependencies, and reran npm outdated plus local verification before merge.

- Observation: Codex review identified that @agentplaneorg/core still advertised Node >=20 while execa 9 requires >=20.5.0 for Node 20.
  Impact: Published core consumers on Node 20.0-20.4 would see an advertised-supported runtime with an incompatible dependency.
  Resolution: Raised @agentplaneorg/core engines.node to >=20.5.0; agentplane CLI already requires >=24, and recipes has no execa dependency.
