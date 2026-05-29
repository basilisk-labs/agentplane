---
id: "202605290532-83KGYN"
title: "Pre-push hook decomposition"
result_summary: "Merged via PR #4288."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "hotspot"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T05:33:01.655Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T05:38:25.859Z"
  updated_by: "CODER"
  note: "Pre-push parsing, git/env, package-script, task-binding, and release-note helper logic extracted into run.pre-push.helpers.ts; run.pre-push.ts reduced to 184 lines while preserving hook dispatch behavior."
  attempts: 0
commit:
  hash: "cbd7b2cfff5f915cc6dac85f7a86d2ba12990087"
  message: "♻️ 83KGYN hooks: decompose pre-push helpers"
comments:
  -
    author: "CODER"
    body: "Start: Extract pre-push hook parsing/git/env helpers while preserving hook behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4288 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-29T05:33:16.068Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract pre-push hook parsing/git/env helpers while preserving hook behavior."
  -
    type: "verify"
    at: "2026-05-29T05:38:25.859Z"
    author: "CODER"
    state: "ok"
    note: "Pre-push parsing, git/env, package-script, task-binding, and release-note helper logic extracted into run.pre-push.helpers.ts; run.pre-push.ts reduced to 184 lines while preserving hook dispatch behavior."
  -
    type: "status"
    at: "2026-05-29T05:41:58.175Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4288 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-29T05:41:58.179Z"
doc_updated_by: "INTEGRATOR"
description: "Extract focused helper logic from packages/agentplane/src/commands/hooks/run.pre-push.ts to reduce the runtime hotspot below the warning threshold without changing hook behavior."
sections:
  Summary: |-
    Pre-push hook decomposition

    Extract focused helper logic from packages/agentplane/src/commands/hooks/run.pre-push.ts to reduce the runtime hotspot below the warning threshold without changing hook behavior.
  Scope: |-
    - In scope: Extract focused helper logic from packages/agentplane/src/commands/hooks/run.pre-push.ts to reduce the runtime hotspot below the warning threshold without changing hook behavior.
    - Out of scope: unrelated refactors not required for "Pre-push hook decomposition".
  Plan: "Scope: reduce packages/agentplane/src/commands/hooks/run.pre-push.ts below the 400-line hotspot warning by extracting pre-push parsing/git/env/package-script helper logic into focused module(s). Preserve runPrePushHook/resolvePrePushHookScriptPath behavior and hook stdout/stderr messages. Acceptance: relevant hooks pre-push tests pass, typecheck/arch/knip/lint/format pass, bun run hotspots:check shows one fewer runtime hotspot."
  Verify Steps: |-
    PLANNER fallback scaffold for "Pre-push hook decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Pre-push hook decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T05:38:25.859Z — VERIFY — ok

    By: CODER

    Note: Pre-push parsing, git/env, package-script, task-binding, and release-note helper logic extracted into run.pre-push.helpers.ts; run.pre-push.ts reduced to 184 lines while preserving hook dispatch behavior.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T05:33:16.068Z, excerpt_hash=sha256:00c50ab50aa9a566f6cdb8b545f8345068396bb4e7124e51bd76f187fdf15371

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290532-83KGYN/blueprint/resolved-snapshot.json
    - old_digest: 0af65398f82aa3e1951c5632339b0f4cc6d5b62a20a1bbb6696877f5d86af394
    - current_digest: 0af65398f82aa3e1951c5632339b0f4cc6d5b62a20a1bbb6696877f5d86af394
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290532-83KGYN

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: bun test packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts; bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check.
      Impact: Pre-push standard/release mode messages, optional script behavior, formatting/CI mutation guards, task-bound outgoing commit audit, delete-only push skip, and external script fallback remain covered by hook tests.
      Resolution: Runtime hotspot warnings dropped from 8 to 7; run.pre-push.ts is now below 400 lines.
id_source: "generated"
---
## Summary

Pre-push hook decomposition

Extract focused helper logic from packages/agentplane/src/commands/hooks/run.pre-push.ts to reduce the runtime hotspot below the warning threshold without changing hook behavior.

## Scope

- In scope: Extract focused helper logic from packages/agentplane/src/commands/hooks/run.pre-push.ts to reduce the runtime hotspot below the warning threshold without changing hook behavior.
- Out of scope: unrelated refactors not required for "Pre-push hook decomposition".

## Plan

Scope: reduce packages/agentplane/src/commands/hooks/run.pre-push.ts below the 400-line hotspot warning by extracting pre-push parsing/git/env/package-script helper logic into focused module(s). Preserve runPrePushHook/resolvePrePushHookScriptPath behavior and hook stdout/stderr messages. Acceptance: relevant hooks pre-push tests pass, typecheck/arch/knip/lint/format pass, bun run hotspots:check shows one fewer runtime hotspot.

## Verify Steps

PLANNER fallback scaffold for "Pre-push hook decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Pre-push hook decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T05:38:25.859Z — VERIFY — ok

By: CODER

Note: Pre-push parsing, git/env, package-script, task-binding, and release-note helper logic extracted into run.pre-push.helpers.ts; run.pre-push.ts reduced to 184 lines while preserving hook dispatch behavior.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T05:33:16.068Z, excerpt_hash=sha256:00c50ab50aa9a566f6cdb8b545f8345068396bb4e7124e51bd76f187fdf15371

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290532-83KGYN/blueprint/resolved-snapshot.json
- old_digest: 0af65398f82aa3e1951c5632339b0f4cc6d5b62a20a1bbb6696877f5d86af394
- current_digest: 0af65398f82aa3e1951c5632339b0f4cc6d5b62a20a1bbb6696877f5d86af394
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290532-83KGYN

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: bun test packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts; bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check.
  Impact: Pre-push standard/release mode messages, optional script behavior, formatting/CI mutation guards, task-bound outgoing commit audit, delete-only push skip, and external script fallback remain covered by hook tests.
  Resolution: Runtime hotspot warnings dropped from 8 to 7; run.pre-push.ts is now below 400 lines.
