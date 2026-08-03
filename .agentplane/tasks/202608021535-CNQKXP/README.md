---
id: "202608021535-CNQKXP"
title: "Add compatibility retirement inventory and doctor legacy"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "compatibility"
  - "doctor"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T18:25:57.298Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-03T19:12:26.883Z"
  updated_by: "TESTER"
  note: "PASS at bc76eb0c6: compatibility retirement inventory, doctor legacy, advanced repair migration, package contract, and legacy alias compatibility verified."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-03T19:13:53.838Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 2 typed finding(s)."
  evaluated_sha: "bc76eb0c6f879cf387c241a81bcd16e4ca2037cf"
  blueprint_digest: "68f0d871b479bb466fce69bd630fb80919ee850312ddbb465b15108b1ae8801a"
  evidence_refs:
    - ".agentplane/tasks/202608021535-CNQKXP/quality/20260803-191257032-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608021535-CNQKXP/quality/20260803-191257032-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608021535-CNQKXP/quality/objects/sha256/8a6a74d7771e895b9def50b612e1ea1171a6305d8a7e040932e33c56ca8039ad.md"
    - ".agentplane/tasks/202608021535-CNQKXP/quality/20260803-191257032-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608021535-CNQKXP/quality/20260803-191257032-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608021535-CNQKXP/quality/20260803-191257032-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608021535-CNQKXP/quality/20260803-191257032-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608021535-CNQKXP/README.md"
    - ".agentplane/tasks/202608021535-CNQKXP/quality/objects/sha256/2bb730169b33ef9854f812504fe27240f1e22f4aa2e6e2b70321f725979fec8a.patch"
    - ".agentplane/tasks/202608021535-CNQKXP/quality/objects/sha256/d4b57e0325c53da69f6983286d59b91b0a56f1bcefd63615f046f4eebc65e4fc.json"
    - ".agentplane/tasks/202608021535-CNQKXP/verification/20260803191226883-b87ac1f8fe31fddd.json"
    - ".agentplane/tasks/202608021535-CNQKXP/quality/objects/sha256/a678349924d6de7236f3762033ddde35c1bf310b5d2d2fb99c386bbd378fe344.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Three registered adapters emit null migration_command values, so doctor legacy findings do not all name a migration command as required."
    - "The focused manifest tests do not exercise the required malformed semver, stale-path, or unknown-probe negative fixtures."
commit:
  hash: "bc76eb0c6f879cf387c241a81bcd16e4ca2037cf"
  message: "🩺 CNQKXP code: add compatibility retirement doctor"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: compatibility retirement manifest, read-only doctor legacy probes, advanced repair namespace, compatibility ratchet, package smoke coverage, and documentation."
events:
  -
    type: "status"
    at: "2026-08-03T18:26:18.257Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-03T19:11:53.224Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: compatibility retirement manifest, read-only doctor legacy probes, advanced repair namespace, compatibility ratchet, package smoke coverage, and documentation."
  -
    type: "verify"
    at: "2026-08-03T19:12:26.883Z"
    author: "TESTER"
    state: "ok"
    note: "PASS at bc76eb0c6: compatibility retirement inventory, doctor legacy, advanced repair migration, package contract, and legacy alias compatibility verified."
doc_version: 3
doc_updated_at: "2026-08-03T19:12:27.712Z"
doc_updated_by: "CODER"
description: "Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations."
sections:
  Summary: |-
    Add compatibility retirement inventory and doctor legacy

    Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations.
  Scope: |-
    - In scope: Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations.
    - Out of scope: unrelated refactors not required for "Add compatibility retirement inventory and doctor legacy".
  Plan: |-
    1. Inventory every production compatibility and migration adapter in AgentPlane and core, assign a stable identifier, owner surface, introduced_in, deprecated_in, remove_in, migration_command, and deterministic usage_probe, and classify entries that cannot yet have a removal version.
    2. Add a packaged machine-readable manifest plus schema and validation so missing fields, duplicate identifiers, invalid semver windows, stale file references, and unknown probes fail deterministic checks.
    3. Add agentplane doctor legacy --json and human rendering that executes the registered probes, reports used, unused, unknown, or blocked status with exact evidence, and never deletes or migrates state.
    4. Move legacy protected-conflict adoption discovery under the advanced repair namespace while retaining the old command only as a hidden compatibility alias with deprecation guidance and unchanged authority/evidence behavior.
    5. Document the retirement policy and migration window, add current/legacy/malformed/probe-failure/package-smoke fixtures, then run compatibility, help-surface, critical, full fast, and repository contract gates before independent evaluation.
  Verify Steps: |-
    1. Run the compatibility-manifest schema and inventory tests. Expected: every registered production adapter has one unique manifest entry; semver windows, source paths, migration commands, and usage probes validate; malformed or stale entries fail closed.
    2. Run focused doctor legacy fixtures in human and JSON modes. Expected: current, used legacy, unused legacy, unavailable probe, and mixed states produce stable typed output without mutation; every finding names evidence and a migration command.
    3. Run command catalog/help and legacy conflict recovery tests. Expected: the default 11-operation help remains unchanged, repair exposes the advanced legacy-adoption path, the old command is hidden/deprecated, and authority plus recovery receipts remain byte-compatible.
    4. Build and inspect the publishable AgentPlane package. Expected: the manifest and required runtime files are shipped and doctor legacy works from the packed CLI fixture.
    5. Run bun run typecheck, bun run ci:contract, bun run test:critical, bun run test:fast, bun run knip:check, bun run hotspots:check, and node .agentplane/policy/check-routing.mjs. Expected: all maintained gates pass with no compatibility-baseline or trust-boundary growth.
    6. Generate and verify task evidence, then obtain an independent EVALUATOR pass against the exact implementation SHA.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-03T19:12:26.883Z — VERIFY — ok

    By: TESTER

    Note: PASS at bc76eb0c6: compatibility retirement inventory, doctor legacy, advanced repair migration, package contract, and legacy alias compatibility verified.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T19:11:53.224Z, excerpt_hash=sha256:d18bd9c61c280e2386e9923416e2bb2a66f1e09a6114e13f536b58c38cb675ad

    Details:

    Command: bun run ci:contract
    Result: pass
    Evidence: compatibility candidate approved in release_version mode; RF-04 replay 50 runs and 70/70 outcomes; TS7 toolchain, trust ratchet, dependency architecture, clone, Knip 0/0 CLI, and coverage thresholds passed.
    Scope: repository contracts and static quality gates.

    Command: bun run test:critical
    Result: pass
    Evidence: 12/12 chunks and 79 tests passed.
    Scope: compatibility, efficiency, replay hardening, exit codes, Git edges, protected paths, scope leaks, symlink roots, and trust boundaries.

    Command: bun run test:fast
    Result: pass
    Evidence: 536 files and 3786 tests passed.
    Scope: maintained core, AgentPlane, recipes, and testkit behavior.

    Command: bun run package:tarball:check && bun run package:install-smoke
    Result: pass
    Evidence: AgentPlane tarball contains 59 policy-approved files; clean installed CLI passed 8 migration scenarios and doctor legacy smoke.
    Scope: publishable artifact and installed runtime.

    Command: ap doctor legacy --json && ap doctor legacy
    Result: pass
    Evidence: stable read-only report with 12 adapters: used=3 unused=6 unknown=3 blocked=0; human and JSON modes agree.
    Scope: current repository compatibility inventory and probes.

    Command: ap doctor && node .agentplane/policy/check-routing.mjs && git diff --check
    Result: pass
    Evidence: doctor errors=0; four pre-existing archive warnings only; policy routing and whitespace checks passed.
    Scope: repository health and policy graph.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021535-CNQKXP-add-compatibility-retirement-inventory-and-docto/.agentplane/tasks/202608021535-CNQKXP/blueprint/resolved-snapshot.json
    - old_digest: 68f0d871b479bb466fce69bd630fb80919ee850312ddbb465b15108b1ae8801a
    - current_digest: 68f0d871b479bb466fce69bd630fb80919ee850312ddbb465b15108b1ae8801a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608021535-CNQKXP

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608021535-CNQKXP
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "503e1a531103ef41ff3ef404fd55fbe442220e26"
    version: 1
id_source: "generated"
---
## Summary

Add compatibility retirement inventory and doctor legacy

Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations.

## Scope

- In scope: Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations.
- Out of scope: unrelated refactors not required for "Add compatibility retirement inventory and doctor legacy".

## Plan

1. Inventory every production compatibility and migration adapter in AgentPlane and core, assign a stable identifier, owner surface, introduced_in, deprecated_in, remove_in, migration_command, and deterministic usage_probe, and classify entries that cannot yet have a removal version.
2. Add a packaged machine-readable manifest plus schema and validation so missing fields, duplicate identifiers, invalid semver windows, stale file references, and unknown probes fail deterministic checks.
3. Add agentplane doctor legacy --json and human rendering that executes the registered probes, reports used, unused, unknown, or blocked status with exact evidence, and never deletes or migrates state.
4. Move legacy protected-conflict adoption discovery under the advanced repair namespace while retaining the old command only as a hidden compatibility alias with deprecation guidance and unchanged authority/evidence behavior.
5. Document the retirement policy and migration window, add current/legacy/malformed/probe-failure/package-smoke fixtures, then run compatibility, help-surface, critical, full fast, and repository contract gates before independent evaluation.

## Verify Steps

1. Run the compatibility-manifest schema and inventory tests. Expected: every registered production adapter has one unique manifest entry; semver windows, source paths, migration commands, and usage probes validate; malformed or stale entries fail closed.
2. Run focused doctor legacy fixtures in human and JSON modes. Expected: current, used legacy, unused legacy, unavailable probe, and mixed states produce stable typed output without mutation; every finding names evidence and a migration command.
3. Run command catalog/help and legacy conflict recovery tests. Expected: the default 11-operation help remains unchanged, repair exposes the advanced legacy-adoption path, the old command is hidden/deprecated, and authority plus recovery receipts remain byte-compatible.
4. Build and inspect the publishable AgentPlane package. Expected: the manifest and required runtime files are shipped and doctor legacy works from the packed CLI fixture.
5. Run bun run typecheck, bun run ci:contract, bun run test:critical, bun run test:fast, bun run knip:check, bun run hotspots:check, and node .agentplane/policy/check-routing.mjs. Expected: all maintained gates pass with no compatibility-baseline or trust-boundary growth.
6. Generate and verify task evidence, then obtain an independent EVALUATOR pass against the exact implementation SHA.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-03T19:12:26.883Z — VERIFY — ok

By: TESTER

Note: PASS at bc76eb0c6: compatibility retirement inventory, doctor legacy, advanced repair migration, package contract, and legacy alias compatibility verified.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T19:11:53.224Z, excerpt_hash=sha256:d18bd9c61c280e2386e9923416e2bb2a66f1e09a6114e13f536b58c38cb675ad

Details:

Command: bun run ci:contract
Result: pass
Evidence: compatibility candidate approved in release_version mode; RF-04 replay 50 runs and 70/70 outcomes; TS7 toolchain, trust ratchet, dependency architecture, clone, Knip 0/0 CLI, and coverage thresholds passed.
Scope: repository contracts and static quality gates.

Command: bun run test:critical
Result: pass
Evidence: 12/12 chunks and 79 tests passed.
Scope: compatibility, efficiency, replay hardening, exit codes, Git edges, protected paths, scope leaks, symlink roots, and trust boundaries.

Command: bun run test:fast
Result: pass
Evidence: 536 files and 3786 tests passed.
Scope: maintained core, AgentPlane, recipes, and testkit behavior.

Command: bun run package:tarball:check && bun run package:install-smoke
Result: pass
Evidence: AgentPlane tarball contains 59 policy-approved files; clean installed CLI passed 8 migration scenarios and doctor legacy smoke.
Scope: publishable artifact and installed runtime.

Command: ap doctor legacy --json && ap doctor legacy
Result: pass
Evidence: stable read-only report with 12 adapters: used=3 unused=6 unknown=3 blocked=0; human and JSON modes agree.
Scope: current repository compatibility inventory and probes.

Command: ap doctor && node .agentplane/policy/check-routing.mjs && git diff --check
Result: pass
Evidence: doctor errors=0; four pre-existing archive warnings only; policy routing and whitespace checks passed.
Scope: repository health and policy graph.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021535-CNQKXP-add-compatibility-retirement-inventory-and-docto/.agentplane/tasks/202608021535-CNQKXP/blueprint/resolved-snapshot.json
- old_digest: 68f0d871b479bb466fce69bd630fb80919ee850312ddbb465b15108b1ae8801a
- current_digest: 68f0d871b479bb466fce69bd630fb80919ee850312ddbb465b15108b1ae8801a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608021535-CNQKXP

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608021535-CNQKXP
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
