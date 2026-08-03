---
id: "202608021535-9EWFAB"
title: "Compact and deduplicate v0.7.1 task evidence"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "compaction"
  - "evidence"
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
  updated_at: "2026-08-03T16:19:04.434Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-03T17:10:52.614Z"
  updated_by: "TESTER"
  note: "Symlink-escape rework passed focused security coverage and the repository release contract."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-03T17:12:08.410Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "345a4a71f5c92be5329420bf10c90e911c8ccb2f"
  blueprint_digest: "9f18277ac6ecd4ab07e5c8a0dbb85c3df0b3599250cad56dec4387f73fbcfe85"
  evidence_refs:
    - ".agentplane/tasks/202608021535-9EWFAB/quality/20260803-171115230-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/20260803-171115230-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/objects/sha256/e1be95659c2b4c6682717cbc54ef22e27b7d8a425a96625a7ac73c48884862e6.md"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/20260803-171115230-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/20260803-171115230-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/20260803-171115230-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/20260803-171115230-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608021535-9EWFAB/README.md"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/objects/sha256/f8387e823a299bd00fd12e1f11ff156021c37ef89c6fc208bb458af3c33e4179.patch"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/objects/sha256/8dc7db9494b51ce6ffcadef59a48029f49d6ce874e6fc48aa1ead610f1ae6390.json"
    - ".agentplane/tasks/202608021535-9EWFAB/verification/20260803171052614-a1b73ee18c8b5a13.json"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/objects/sha256/1d10aae86985eacf7c0cd07bea467527500d74414682917460f3861f465afac2.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The symlink hardening remains vulnerable to a directory-swap race: parent directories are checked by pathname, then later path-based open, rename, link, or unlink operations follow those paths without binding the operation to the verified directory handle. A concurrent process can replace a checked directory with an external symlink between validation and mutation, allowing writes outside the repository."
commit:
  hash: "345a4a71f5c92be5329420bf10c90e911c8ccb2f"
  message: "🔐 9EWFAB evidence: harden packet paths"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: content-addressed evaluator inputs, compact per-review manifests, pre-provider integrity validation, legacy work-order compatibility, and focused regression coverage."
  -
    author: "CODER"
    body: "Rework: reject symlinked evidence-store ancestors, use repository real-path checks and no-follow file handles, publish manifests atomically, and cover outside-repository escape attempts."
events:
  -
    type: "status"
    at: "2026-08-03T16:19:36.480Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-03T16:52:06.559Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: content-addressed evaluator inputs, compact per-review manifests, pre-provider integrity validation, legacy work-order compatibility, and focused regression coverage."
  -
    type: "verify"
    at: "2026-08-03T16:55:26.894Z"
    author: "TESTER"
    state: "ok"
    note: "Content-addressed evaluator packets passed the task-specific and repository-wide verification contract."
  -
    type: "status"
    at: "2026-08-03T17:10:17.135Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Rework: reject symlinked evidence-store ancestors, use repository real-path checks and no-follow file handles, publish manifests atomically, and cover outside-repository escape attempts."
  -
    type: "verify"
    at: "2026-08-03T17:10:52.614Z"
    author: "TESTER"
    state: "ok"
    note: "Symlink-escape rework passed focused security coverage and the repository release contract."
doc_version: 3
doc_updated_at: "2026-08-03T17:10:53.868Z"
doc_updated_by: "CODER"
description: "Replace repeated evaluator diffs, prompts, and raw logs with content-addressed references and compact Git-tracked manifests while preserving local-first auditability, exact hashes, ACR receipts, offline recovery, and optional access to raw objects."
sections:
  Summary: |-
    Compact and deduplicate v0.7.1 task evidence

    Replace repeated evaluator diffs, prompts, and raw logs with content-addressed references and compact Git-tracked manifests while preserving local-first auditability, exact hashes, ACR receipts, offline recovery, and optional access to raw objects.
  Scope: |-
    - In scope: Replace repeated evaluator diffs, prompts, and raw logs with content-addressed references and compact Git-tracked manifests while preserving local-first auditability, exact hashes, ACR receipts, offline recovery, and optional access to raw objects.
    - Out of scope: unrelated refactors not required for "Compact and deduplicate v0.7.1 task evidence".
  Plan: |-
    1. Capture the evaluator-evidence baseline and classify durable outcome artifacts versus immutable evaluator inputs; preserve the measured baseline of 5,440 quality files, 88,984,550 bytes, and 18,243,269 exact duplicate bytes.
    2. Add a deterministic task-local content-addressed evidence object store and compact per-review manifest; write immutable inputs once by SHA-256, verify existing bytes before reuse, and keep evaluator paths directly readable offline.
    3. Route evaluator diff, blueprint, observed checks, prompt, and result schema through the object store while retaining small result, report, episode, and opinion artifacts; preserve quality-review gates, ACR receipts, evidence-bundle integrity, and legacy raw-packet compatibility.
    4. Add idempotence, collision/tamper, repeated-preparation deduplication, manifest verification, and compatibility tests; suppress noisy Git diffs for immutable object blobs without hiding their hashes or contents.
    5. Prove that repeated preparation creates one object per digest and reduces duplicated tracked bytes for immutable inputs by at least 80% in the acceptance fixture; then run typecheck, focused evaluator/evidence/critical suites, ci:contract, test:fast, diff/hotspot/Knip checks, and independent evaluator review.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-evidence-store.test.ts packages/agentplane/src/commands/evaluator/evaluator-evidence-compaction.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-prepare.command.test.ts packages/agentplane/src/cli/run-cli/registry.run.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts`. Expected: immutable objects are reused by SHA-256, tamper/collision is rejected, current and legacy work orders remain readable, and evaluator execution consumes the referenced prompt/schema.
    2. Inspect the repeated-preparation acceptance test. Expected: two review directories retain only compact manifests/work orders, unchanged diff/checks/blueprint/schema resolve to one object each, and newly stored immutable-input bytes are reduced by at least 80%.
    3. Run `bun run typecheck`, `bun run ci:contract`, `bun run test:critical`, and `bun run test:fast`. Expected: all checks pass without evaluator, evidence-bundle, task-routing, hook, or lifecycle regressions.
    4. Run `bun run format:changed`, `bun run lint`, `bun run knip:check`, and the changed-file hotspot check. Expected: formatting, lint, dead-code, and size budgets pass or record a task-scoped exemption.
    5. Generate and verify the task evidence bundle, then run an independent evaluator against the committed implementation. Expected: the bundle includes compact manifests and task-local content objects, hashes verify offline, the evaluator cites frozen object paths, and the verdict is pass with no unresolved high-severity finding.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-03T16:55:26.894Z — VERIFY — ok

    By: TESTER

    Note: Content-addressed evaluator packets passed the task-specific and repository-wide verification contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T16:52:06.559Z, excerpt_hash=sha256:09d2c9b2b464aff8a6e47861fe870f2873b10b27c93e36b17138ac92353043a0

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-evidence-store.test.ts packages/agentplane/src/commands/evaluator/evaluator-evidence-compaction.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-prepare.command.test.ts packages/agentplane/src/cli/run-cli/registry.run.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts
    Result: pass
    Evidence: 7 files and 48 tests passed; concurrent reuse, collision/tamper rejection, compact packet shape, legacy compatibility, provider prompt/schema use, and >=80% repeated-input byte reduction are covered.
    Scope: evaluator packet preparation, object-store integrity, invocation, persistence, registry, and quality route.

    Command: bun run test:fast
    Result: pass
    Evidence: 535 files and 3771 tests passed in 144.35s.
    Scope: full AgentPlane, core, recipes, and testkit fast suite.

    Command: bun run test:critical
    Result: pass
    Evidence: all 12 critical-cli chunks passed, including agent-efficiency replay, protected paths, trust-boundary, symlink-root, and scope-leak suites.
    Scope: critical CLI safety and RF-04 behavior.

    Command: bun run ci:contract
    Result: pass
    Evidence: formatting, schemas, docs, RF-04 replay 50 runs, hotspots, lifecycle, trust ratchet, lint, architecture, clone baseline, Knip, and coverage passed.
    Scope: repository contract and release guardrails.

    Command: bun run typecheck && bun run format:changed && bun run knip:check
    Result: pass
    Evidence: TypeScript build passed; all changed files formatted; AgentPlane CLI unused-code baseline remained zero.
    Scope: types, formatting, and dead-code regression.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021535-9EWFAB-compact-and-deduplicate-v0-7-1-task-evidence/.agentplane/tasks/202608021535-9EWFAB/blueprint/resolved-snapshot.json
    - old_digest: 9f18277ac6ecd4ab07e5c8a0dbb85c3df0b3599250cad56dec4387f73fbcfe85
    - current_digest: 9f18277ac6ecd4ab07e5c8a0dbb85c3df0b3599250cad56dec4387f73fbcfe85
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608021535-9EWFAB

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608021535-9EWFAB
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-03T17:10:52.614Z — VERIFY — ok

    By: TESTER

    Note: Symlink-escape rework passed focused security coverage and the repository release contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T17:10:17.135Z, excerpt_hash=sha256:09d2c9b2b464aff8a6e47861fe870f2873b10b27c93e36b17138ac92353043a0

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-evidence-store.test.ts packages/agentplane/src/commands/evaluator/evaluator-evidence-compaction.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-prepare.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts packages/agentplane/src/cli/run-cli/registry.run.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts
    Result: pass
    Evidence: 8 files and 63 tests passed; six object-store tests cover concurrent reuse, collision/tamper rejection, all three symlinked ancestor directories, and verification after object-root replacement.
    Scope: evaluator preparation, object-store boundary enforcement, packet verification, execution, persistence, registry, and quality route.

    Command: bun run test:fast
    Result: pass
    Evidence: 535 files and 3775 tests passed in 153.67s.
    Scope: full AgentPlane, core, recipes, and testkit fast suite.

    Command: bun run test:critical
    Result: pass
    Evidence: all 12 critical-cli chunks passed, including RF-04 efficiency, protected paths, symlink root, scope-leak, and trust-boundary suites.
    Scope: critical CLI safety and agent-efficiency behavior.

    Command: bun run ci:contract
    Result: pass
    Evidence: formatting, schemas, docs, 50-run RF-04 replay, hotspots, lifecycle, trust ratchet, core lint, architecture, clone baseline, Knip, and coverage passed.
    Scope: repository contract and release guardrails.

    Command: bun run typecheck && bun run format:changed && bun run lint:core && bun run knip:check && bun run hotspots:check
    Result: pass
    Evidence: TypeScript build, changed-file formatting, core lint, zero AgentPlane CLI Knip regressions, and the 600-line runtime limit passed; evaluator-evidence-store.ts is 502 lines.
    Scope: types, formatting, static analysis, dead-code, and size budgets.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021535-9EWFAB-compact-and-deduplicate-v0-7-1-task-evidence/.agentplane/tasks/202608021535-9EWFAB/blueprint/resolved-snapshot.json
    - old_digest: 9f18277ac6ecd4ab07e5c8a0dbb85c3df0b3599250cad56dec4387f73fbcfe85
    - current_digest: 9f18277ac6ecd4ab07e5c8a0dbb85c3df0b3599250cad56dec4387f73fbcfe85
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608021535-9EWFAB

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608021535-9EWFAB
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The main-branch evaluator quality history contains 5,440 files and 88,984,550 bytes; exact duplicate content accounts for 18,243,269 bytes across 261 digest groups, led by repeated evaluator diffs.
      Impact: Per-review raw packet copies inflate repository checkout size and PR review noise even though evaluators need only immutable, hash-addressable inputs plus small outcome artifacts.
      Resolution: Store new diff, observed-check, blueprint, prompt, and result-schema inputs once per task under quality/objects/sha256; keep compact per-review manifests and work orders, verify bytes before provider execution, retain legacy raw work-order compatibility, and suppress rendered Git diffs only for immutable object blobs.

    - Observation: Repository-wide bun run lint reaches one unchanged website/scripts/generate-social-images.mjs prefer-string-replace-all violation after the task code passes lint:core.
      Impact: The unrelated website lint debt remains a release-wide cleanup item but does not invalidate the evaluator evidence-store implementation or its contract checks.
      Resolution: Track the website-only lint fix outside this task; this task passes lint:core, ci:contract, formatting, Knip, hotspots, typecheck, critical tests, and the full fast suite.
extensions:
  workflow_route_baseline:
    start_head_sha: "42d25ee59e3cf08909f91dd4dce761250029bf23"
    version: 1
id_source: "generated"
---
## Summary

Compact and deduplicate v0.7.1 task evidence

Replace repeated evaluator diffs, prompts, and raw logs with content-addressed references and compact Git-tracked manifests while preserving local-first auditability, exact hashes, ACR receipts, offline recovery, and optional access to raw objects.

## Scope

- In scope: Replace repeated evaluator diffs, prompts, and raw logs with content-addressed references and compact Git-tracked manifests while preserving local-first auditability, exact hashes, ACR receipts, offline recovery, and optional access to raw objects.
- Out of scope: unrelated refactors not required for "Compact and deduplicate v0.7.1 task evidence".

## Plan

1. Capture the evaluator-evidence baseline and classify durable outcome artifacts versus immutable evaluator inputs; preserve the measured baseline of 5,440 quality files, 88,984,550 bytes, and 18,243,269 exact duplicate bytes.
2. Add a deterministic task-local content-addressed evidence object store and compact per-review manifest; write immutable inputs once by SHA-256, verify existing bytes before reuse, and keep evaluator paths directly readable offline.
3. Route evaluator diff, blueprint, observed checks, prompt, and result schema through the object store while retaining small result, report, episode, and opinion artifacts; preserve quality-review gates, ACR receipts, evidence-bundle integrity, and legacy raw-packet compatibility.
4. Add idempotence, collision/tamper, repeated-preparation deduplication, manifest verification, and compatibility tests; suppress noisy Git diffs for immutable object blobs without hiding their hashes or contents.
5. Prove that repeated preparation creates one object per digest and reduces duplicated tracked bytes for immutable inputs by at least 80% in the acceptance fixture; then run typecheck, focused evaluator/evidence/critical suites, ci:contract, test:fast, diff/hotspot/Knip checks, and independent evaluator review.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-evidence-store.test.ts packages/agentplane/src/commands/evaluator/evaluator-evidence-compaction.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-prepare.command.test.ts packages/agentplane/src/cli/run-cli/registry.run.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts`. Expected: immutable objects are reused by SHA-256, tamper/collision is rejected, current and legacy work orders remain readable, and evaluator execution consumes the referenced prompt/schema.
2. Inspect the repeated-preparation acceptance test. Expected: two review directories retain only compact manifests/work orders, unchanged diff/checks/blueprint/schema resolve to one object each, and newly stored immutable-input bytes are reduced by at least 80%.
3. Run `bun run typecheck`, `bun run ci:contract`, `bun run test:critical`, and `bun run test:fast`. Expected: all checks pass without evaluator, evidence-bundle, task-routing, hook, or lifecycle regressions.
4. Run `bun run format:changed`, `bun run lint`, `bun run knip:check`, and the changed-file hotspot check. Expected: formatting, lint, dead-code, and size budgets pass or record a task-scoped exemption.
5. Generate and verify the task evidence bundle, then run an independent evaluator against the committed implementation. Expected: the bundle includes compact manifests and task-local content objects, hashes verify offline, the evaluator cites frozen object paths, and the verdict is pass with no unresolved high-severity finding.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-03T16:55:26.894Z — VERIFY — ok

By: TESTER

Note: Content-addressed evaluator packets passed the task-specific and repository-wide verification contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T16:52:06.559Z, excerpt_hash=sha256:09d2c9b2b464aff8a6e47861fe870f2873b10b27c93e36b17138ac92353043a0

Details:

Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-evidence-store.test.ts packages/agentplane/src/commands/evaluator/evaluator-evidence-compaction.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-prepare.command.test.ts packages/agentplane/src/cli/run-cli/registry.run.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts
Result: pass
Evidence: 7 files and 48 tests passed; concurrent reuse, collision/tamper rejection, compact packet shape, legacy compatibility, provider prompt/schema use, and >=80% repeated-input byte reduction are covered.
Scope: evaluator packet preparation, object-store integrity, invocation, persistence, registry, and quality route.

Command: bun run test:fast
Result: pass
Evidence: 535 files and 3771 tests passed in 144.35s.
Scope: full AgentPlane, core, recipes, and testkit fast suite.

Command: bun run test:critical
Result: pass
Evidence: all 12 critical-cli chunks passed, including agent-efficiency replay, protected paths, trust-boundary, symlink-root, and scope-leak suites.
Scope: critical CLI safety and RF-04 behavior.

Command: bun run ci:contract
Result: pass
Evidence: formatting, schemas, docs, RF-04 replay 50 runs, hotspots, lifecycle, trust ratchet, lint, architecture, clone baseline, Knip, and coverage passed.
Scope: repository contract and release guardrails.

Command: bun run typecheck && bun run format:changed && bun run knip:check
Result: pass
Evidence: TypeScript build passed; all changed files formatted; AgentPlane CLI unused-code baseline remained zero.
Scope: types, formatting, and dead-code regression.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021535-9EWFAB-compact-and-deduplicate-v0-7-1-task-evidence/.agentplane/tasks/202608021535-9EWFAB/blueprint/resolved-snapshot.json
- old_digest: 9f18277ac6ecd4ab07e5c8a0dbb85c3df0b3599250cad56dec4387f73fbcfe85
- current_digest: 9f18277ac6ecd4ab07e5c8a0dbb85c3df0b3599250cad56dec4387f73fbcfe85
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608021535-9EWFAB

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608021535-9EWFAB
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-03T17:10:52.614Z — VERIFY — ok

By: TESTER

Note: Symlink-escape rework passed focused security coverage and the repository release contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T17:10:17.135Z, excerpt_hash=sha256:09d2c9b2b464aff8a6e47861fe870f2873b10b27c93e36b17138ac92353043a0

Details:

Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-evidence-store.test.ts packages/agentplane/src/commands/evaluator/evaluator-evidence-compaction.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-prepare.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts packages/agentplane/src/cli/run-cli/registry.run.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts
Result: pass
Evidence: 8 files and 63 tests passed; six object-store tests cover concurrent reuse, collision/tamper rejection, all three symlinked ancestor directories, and verification after object-root replacement.
Scope: evaluator preparation, object-store boundary enforcement, packet verification, execution, persistence, registry, and quality route.

Command: bun run test:fast
Result: pass
Evidence: 535 files and 3775 tests passed in 153.67s.
Scope: full AgentPlane, core, recipes, and testkit fast suite.

Command: bun run test:critical
Result: pass
Evidence: all 12 critical-cli chunks passed, including RF-04 efficiency, protected paths, symlink root, scope-leak, and trust-boundary suites.
Scope: critical CLI safety and agent-efficiency behavior.

Command: bun run ci:contract
Result: pass
Evidence: formatting, schemas, docs, 50-run RF-04 replay, hotspots, lifecycle, trust ratchet, core lint, architecture, clone baseline, Knip, and coverage passed.
Scope: repository contract and release guardrails.

Command: bun run typecheck && bun run format:changed && bun run lint:core && bun run knip:check && bun run hotspots:check
Result: pass
Evidence: TypeScript build, changed-file formatting, core lint, zero AgentPlane CLI Knip regressions, and the 600-line runtime limit passed; evaluator-evidence-store.ts is 502 lines.
Scope: types, formatting, static analysis, dead-code, and size budgets.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021535-9EWFAB-compact-and-deduplicate-v0-7-1-task-evidence/.agentplane/tasks/202608021535-9EWFAB/blueprint/resolved-snapshot.json
- old_digest: 9f18277ac6ecd4ab07e5c8a0dbb85c3df0b3599250cad56dec4387f73fbcfe85
- current_digest: 9f18277ac6ecd4ab07e5c8a0dbb85c3df0b3599250cad56dec4387f73fbcfe85
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608021535-9EWFAB

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608021535-9EWFAB
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

- Observation: The main-branch evaluator quality history contains 5,440 files and 88,984,550 bytes; exact duplicate content accounts for 18,243,269 bytes across 261 digest groups, led by repeated evaluator diffs.
  Impact: Per-review raw packet copies inflate repository checkout size and PR review noise even though evaluators need only immutable, hash-addressable inputs plus small outcome artifacts.
  Resolution: Store new diff, observed-check, blueprint, prompt, and result-schema inputs once per task under quality/objects/sha256; keep compact per-review manifests and work orders, verify bytes before provider execution, retain legacy raw work-order compatibility, and suppress rendered Git diffs only for immutable object blobs.

- Observation: Repository-wide bun run lint reaches one unchanged website/scripts/generate-social-images.mjs prefer-string-replace-all violation after the task code passes lint:core.
  Impact: The unrelated website lint debt remains a release-wide cleanup item but does not invalidate the evaluator evidence-store implementation or its contract checks.
  Resolution: Track the website-only lint fix outside this task; this task passes lint:core, ci:contract, formatting, Knip, hotspots, typecheck, critical tests, and the full fast suite.
