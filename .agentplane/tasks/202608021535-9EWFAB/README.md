---
id: "202608021535-9EWFAB"
title: "Compact and deduplicate v0.7.1 task evidence"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 10
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
  updated_at: "2026-08-03T16:55:26.894Z"
  updated_by: "TESTER"
  note: "Content-addressed evaluator packets passed the task-specific and repository-wide verification contract."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-03T16:57:15.449Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "2849b3045fc19132735399f9a5a867433af937ac"
  blueprint_digest: "9f18277ac6ecd4ab07e5c8a0dbb85c3df0b3599250cad56dec4387f73fbcfe85"
  evidence_refs:
    - ".agentplane/tasks/202608021535-9EWFAB/quality/20260803-165615418-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/20260803-165615418-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/objects/sha256/110f221dca95afdf54c7c1cc5fa3824fee5449c7f33e02f959689fc904686856.md"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/20260803-165615418-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/20260803-165615418-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/20260803-165615418-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/20260803-165615418-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608021535-9EWFAB/README.md"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/objects/sha256/3f18f075a19d2a4c72f66a302849b36dcefe8a131bffc188d4ada68c7e669482.patch"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/objects/sha256/fe0e208e57482c738be6ecd3989033dbe2fe23b4c16611de9a8d2064a0e4dc6d.json"
    - ".agentplane/tasks/202608021535-9EWFAB/verification/20260803165526894-450a0a95c3b94c3a.json"
    - ".agentplane/tasks/202608021535-9EWFAB/quality/objects/sha256/1d10aae86985eacf7c0cd07bea467527500d74414682917460f3861f465afac2.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The content-addressed evidence store validates paths lexically but does not reject symlinked parent directories, allowing object writes or frozen-artifact reads to escape the repository."
commit:
  hash: "2849b3045fc19132735399f9a5a867433af937ac"
  message: "🗜️ 9EWFAB evidence: deduplicate immutable inputs"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: content-addressed evaluator inputs, compact per-review manifests, pre-provider integrity validation, legacy work-order compatibility, and focused regression coverage."
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
doc_version: 3
doc_updated_at: "2026-08-03T16:55:27.822Z"
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

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The main-branch evaluator quality history contains 5,440 files and 88,984,550 bytes; exact duplicate content accounts for 18,243,269 bytes across 261 digest groups, led by repeated evaluator diffs.
      Impact: Per-review raw packet copies inflate repository checkout size and PR review noise even though evaluators need only immutable, hash-addressable inputs plus small outcome artifacts.
      Resolution: Store new diff, observed-check, blueprint, prompt, and result-schema inputs once per task under quality/objects/sha256; keep compact per-review manifests and work orders, verify bytes before provider execution, retain legacy raw work-order compatibility, and suppress rendered Git diffs only for immutable object blobs.
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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The main-branch evaluator quality history contains 5,440 files and 88,984,550 bytes; exact duplicate content accounts for 18,243,269 bytes across 261 digest groups, led by repeated evaluator diffs.
  Impact: Per-review raw packet copies inflate repository checkout size and PR review noise even though evaluators need only immutable, hash-addressable inputs plus small outcome artifacts.
  Resolution: Store new diff, observed-check, blueprint, prompt, and result-schema inputs once per task under quality/objects/sha256; keep compact per-review manifests and work orders, verify bytes before provider execution, retain legacy raw work-order compatibility, and suppress rendered Git diffs only for immutable object blobs.
