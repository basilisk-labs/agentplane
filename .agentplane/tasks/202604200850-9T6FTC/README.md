---
id: "202604200850-9T6FTC"
title: "Guard global install path resolution"
result_summary: "Fixed pre-push global-install path fallback handling and added resolver regression coverage."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "bugfix"
  - "code"
  - "hooks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T08:51:00.475Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T08:57:46.510Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts -> pass, 37/37. Command: bun run typecheck -> pass. Command: bun run lint:core -> pass. Command: bun run format:check -> pass. Command: bun run framework:dev:bootstrap -> pass, repo-local runtime ready."
commit:
  hash: "d30a706ce56847195754f721b1d85597b4b162a5"
  message: "🐛 9T6FTC hooks: guard pre-push script fallback"
comments:
  -
    author: "CODER"
    body: "Start: Audit global-install path resolution and add focused regression tests before returning to the refactor roadmap."
  -
    author: "CODER"
    body: "Verified: hooks path resolution now prefers the target repository script, treats missing global-install fallbacks as unresolved, and passes hooks regression tests plus typecheck, lint, format, and bootstrap."
events:
  -
    type: "status"
    at: "2026-04-20T08:51:03.813Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Audit global-install path resolution and add focused regression tests before returning to the refactor roadmap."
  -
    type: "verify"
    at: "2026-04-20T08:57:46.510Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts -> pass, 37/37. Command: bun run typecheck -> pass. Command: bun run lint:core -> pass. Command: bun run format:check -> pass. Command: bun run framework:dev:bootstrap -> pass, repo-local runtime ready."
  -
    type: "status"
    at: "2026-04-20T08:58:14.873Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: hooks path resolution now prefers the target repository script, treats missing global-install fallbacks as unresolved, and passes hooks regression tests plus typecheck, lint, format, and bootstrap."
doc_version: 3
doc_updated_at: "2026-04-20T08:58:14.875Z"
doc_updated_by: "CODER"
description: "Audit CLI path resolution for global-install style layouts, fix any repo-local script path defects, and add regression tests that fail when installed CLI code resolves repository scripts from the global package location."
sections:
  Summary: |-
    Guard global install path resolution
    
    Audit CLI path resolution for global-install style layouts, fix any repo-local script path defects, and add regression tests that fail when installed CLI code resolves repository scripts from the global package location.
  Scope: |-
    - In scope: Audit CLI path resolution for global-install style layouts, fix any repo-local script path defects, and add regression tests that fail when installed CLI code resolves repository scripts from the global package location.
    - Out of scope: unrelated refactors not required for "Guard global install path resolution".
  Plan: |-
    1. Audit production path-resolution code that uses import.meta.url, fileURLToPath, package bin/assets, or repo scripts from installed CLI contexts.
    2. Fix any path that should resolve target-repository scripts before package/global fallback.
    3. Add regression coverage for global-install style layouts and static guard coverage for repo-script resolution.
    4. Run focused tests plus typecheck/lint/format/bootstrap, then record verification and finish.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T08:57:46.510Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts -> pass, 37/37. Command: bun run typecheck -> pass. Command: bun run lint:core -> pass. Command: bun run format:check -> pass. Command: bun run framework:dev:bootstrap -> pass, repo-local runtime ready.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T08:51:03.820Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Audited import.meta.url/fileURLToPath candidates touching scripts/bin paths. The real repo-script risk was pre-push fallback returning a non-existent global prefix path; workflow-playbook's bin path is package-bundled and covered by existing workflow tests.
      Impact: Global installs no longer surface misleading ~/.nvm/.../lib/scripts/run-pre-push-hook.mjs-style paths when the fallback is absent, and resolver tests now fail if missing fallbacks are treated as valid scripts.
      Resolution: Pre-push script resolution now returns repository-local script first, existing bundled fallback second, otherwise null with an actionable repository-local error message.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Guard global install path resolution

Audit CLI path resolution for global-install style layouts, fix any repo-local script path defects, and add regression tests that fail when installed CLI code resolves repository scripts from the global package location.

## Scope

- In scope: Audit CLI path resolution for global-install style layouts, fix any repo-local script path defects, and add regression tests that fail when installed CLI code resolves repository scripts from the global package location.
- Out of scope: unrelated refactors not required for "Guard global install path resolution".

## Plan

1. Audit production path-resolution code that uses import.meta.url, fileURLToPath, package bin/assets, or repo scripts from installed CLI contexts.
2. Fix any path that should resolve target-repository scripts before package/global fallback.
3. Add regression coverage for global-install style layouts and static guard coverage for repo-script resolution.
4. Run focused tests plus typecheck/lint/format/bootstrap, then record verification and finish.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T08:57:46.510Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts -> pass, 37/37. Command: bun run typecheck -> pass. Command: bun run lint:core -> pass. Command: bun run format:check -> pass. Command: bun run framework:dev:bootstrap -> pass, repo-local runtime ready.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T08:51:03.820Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Audited import.meta.url/fileURLToPath candidates touching scripts/bin paths. The real repo-script risk was pre-push fallback returning a non-existent global prefix path; workflow-playbook's bin path is package-bundled and covered by existing workflow tests.
  Impact: Global installs no longer surface misleading ~/.nvm/.../lib/scripts/run-pre-push-hook.mjs-style paths when the fallback is absent, and resolver tests now fail if missing fallbacks are treated as valid scripts.
  Resolution: Pre-push script resolution now returns repository-local script first, existing bundled fallback second, otherwise null with an actionable repository-local error message.
  Promotion: incident-candidate
  Fixability: external
