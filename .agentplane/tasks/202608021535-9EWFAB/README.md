---
id: "202608021535-9EWFAB"
title: "Compact and deduplicate v0.7.1 task evidence"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-03T16:19:36.480Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-03T16:48:56.171Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The main-branch evaluator quality history contains 5,440 files and 88,984,550 bytes; exact duplicate content accounts for 18,243,269 bytes across 261 digest groups, led by repeated evaluator diffs.
  Impact: Per-review raw packet copies inflate repository checkout size and PR review noise even though evaluators need only immutable, hash-addressable inputs plus small outcome artifacts.
  Resolution: Store new diff, observed-check, blueprint, prompt, and result-schema inputs once per task under quality/objects/sha256; keep compact per-review manifests and work orders, verify bytes before provider execution, retain legacy raw work-order compatibility, and suppress rendered Git diffs only for immutable object blobs.
