---
id: "202605290426-8EM383"
title: "Upgrade apply command decomposition"
result_summary: "Merged via PR #4278."
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
  updated_at: "2026-05-29T04:27:03.740Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T04:33:19.669Z"
  updated_by: "CODER"
  note: "Observed: upgrade apply git helpers moved into apply-git.ts; apply.ts is below hotspot threshold. Checks: upgrade.safety.test, run-cli.core.upgrade-dirty-state.test, upgrade.merge.test, typecheck, arch:check, knip:check, lint:core, format:changed, hotspots:check passed."
  attempts: 0
commit:
  hash: "b0588c3f80e2ccf2c2369466b6d2ff57f76b9c54"
  message: "♻️ 8EM383 upgrade: decompose apply git helpers"
comments:
  -
    author: "CODER"
    body: "Start: Extract upgrade apply git helpers into focused modules while preserving exported apply API and behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4278 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-29T04:27:12.980Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract upgrade apply git helpers into focused modules while preserving exported apply API and behavior."
  -
    type: "verify"
    at: "2026-05-29T04:33:19.669Z"
    author: "CODER"
    state: "ok"
    note: "Observed: upgrade apply git helpers moved into apply-git.ts; apply.ts is below hotspot threshold. Checks: upgrade.safety.test, run-cli.core.upgrade-dirty-state.test, upgrade.merge.test, typecheck, arch:check, knip:check, lint:core, format:changed, hotspots:check passed."
  -
    type: "status"
    at: "2026-05-29T04:37:11.843Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4278 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-29T04:37:11.847Z"
doc_updated_by: "INTEGRATOR"
description: "Extract focused helpers from packages/agentplane/src/commands/upgrade/apply.ts to reduce the runtime hotspot below the warning threshold without changing upgrade apply behavior."
sections:
  Summary: |-
    Upgrade apply command decomposition

    Extract focused helpers from packages/agentplane/src/commands/upgrade/apply.ts to reduce the runtime hotspot below the warning threshold without changing upgrade apply behavior.
  Scope: |-
    - In scope: Extract focused helpers from packages/agentplane/src/commands/upgrade/apply.ts to reduce the runtime hotspot below the warning threshold without changing upgrade apply behavior.
    - Out of scope: unrelated refactors not required for "Upgrade apply command decomposition".
  Plan: "Scope: reduce packages/agentplane/src/commands/upgrade/apply.ts below the 400-line hotspot warning by extracting git status / dirty patch / upgrade commit helpers into focused module(s). Preserve exported apply.ts API consumed by commands/upgrade.ts. Acceptance: typecheck, arch:check, knip:check, lint:core, format:changed, hotspots:check pass; run the most relevant upgrade test surface available or document absence of direct tests."
  Verify Steps: |-
    PLANNER fallback scaffold for "Upgrade apply command decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Upgrade apply command decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T04:33:19.669Z — VERIFY — ok

    By: CODER

    Note: Observed: upgrade apply git helpers moved into apply-git.ts; apply.ts is below hotspot threshold. Checks: upgrade.safety.test, run-cli.core.upgrade-dirty-state.test, upgrade.merge.test, typecheck, arch:check, knip:check, lint:core, format:changed, hotspots:check passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T04:27:12.980Z, excerpt_hash=sha256:c958c7a395e68ac17364f7ad1271a51be85811cb90ca8fca48c431bd63a47c31

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290426-8EM383/blueprint/resolved-snapshot.json
    - old_digest: fa99b02013864a0b2966c63a0d5849ee20ae24b91233b2023f08c01f45b6b1c8
    - current_digest: fa99b02013864a0b2966c63a0d5849ee20ae24b91233b2023f08c01f45b6b1c8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290426-8EM383

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Runtime hotspot count decreased from 13 to 12; apply.ts is now 155 lines.
      Impact: Preserves upgrade apply behavior while separating git dirty/commit logic from managed file application.
      Resolution: Re-exported createUpgradeCommit and prepareTrackedTreeForUpgrade from apply.ts so existing command imports remain stable.
id_source: "generated"
---
## Summary

Upgrade apply command decomposition

Extract focused helpers from packages/agentplane/src/commands/upgrade/apply.ts to reduce the runtime hotspot below the warning threshold without changing upgrade apply behavior.

## Scope

- In scope: Extract focused helpers from packages/agentplane/src/commands/upgrade/apply.ts to reduce the runtime hotspot below the warning threshold without changing upgrade apply behavior.
- Out of scope: unrelated refactors not required for "Upgrade apply command decomposition".

## Plan

Scope: reduce packages/agentplane/src/commands/upgrade/apply.ts below the 400-line hotspot warning by extracting git status / dirty patch / upgrade commit helpers into focused module(s). Preserve exported apply.ts API consumed by commands/upgrade.ts. Acceptance: typecheck, arch:check, knip:check, lint:core, format:changed, hotspots:check pass; run the most relevant upgrade test surface available or document absence of direct tests.

## Verify Steps

PLANNER fallback scaffold for "Upgrade apply command decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Upgrade apply command decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T04:33:19.669Z — VERIFY — ok

By: CODER

Note: Observed: upgrade apply git helpers moved into apply-git.ts; apply.ts is below hotspot threshold. Checks: upgrade.safety.test, run-cli.core.upgrade-dirty-state.test, upgrade.merge.test, typecheck, arch:check, knip:check, lint:core, format:changed, hotspots:check passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T04:27:12.980Z, excerpt_hash=sha256:c958c7a395e68ac17364f7ad1271a51be85811cb90ca8fca48c431bd63a47c31

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290426-8EM383/blueprint/resolved-snapshot.json
- old_digest: fa99b02013864a0b2966c63a0d5849ee20ae24b91233b2023f08c01f45b6b1c8
- current_digest: fa99b02013864a0b2966c63a0d5849ee20ae24b91233b2023f08c01f45b6b1c8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290426-8EM383

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Runtime hotspot count decreased from 13 to 12; apply.ts is now 155 lines.
  Impact: Preserves upgrade apply behavior while separating git dirty/commit logic from managed file application.
  Resolution: Re-exported createUpgradeCommit and prepareTrackedTreeForUpgrade from apply.ts so existing command imports remain stable.
