---
id: "202605281707-51DD0G"
title: "Route packet v2 for agent next-action surfaces"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "agent-efficiency"
  - "code"
  - "route-oracle"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T17:08:14.078Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T17:22:03.817Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts --config vitest.workspace.ts; Result: pass, 5 files and 84 tests. Command: bun run typecheck; Result: pass. Command: bun run format:changed; Result: pass. Command: bun run hotspots:check; Result: pass with warnings below thresholds. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: pass after framework dev bootstrap. Command: bun run docs:cli:check, docs:bootstrap:check, release:parity; Result: pass."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-28T17:24:44.737Z"
  updated_by: "EVALUATOR"
  note: "Route packet v2 batch implementation passed focused tests, typecheck, docs checks, policy routing, doctor, and task verification."
  evaluated_sha: "afaae0408d989031f9abb4bfd9caadbec7f28e30"
  blueprint_digest: "a3df440f0edb36b57ad5caa7281a15070f35fd41e0d86d1f88ad1fe74e500ae9"
  evidence_refs:
    - ".agentplane/tasks/202605281707-51DD0G/README.md"
    - ".agentplane/tasks/202605281707-51DD0G/quality/20260528-172444737-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605281707-51DD0G/quality/20260528-172444737-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605281707-51DD0G/quality/20260528-172444737-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605281707-51DD0G/blueprint/resolved-snapshot.json"
    - "d8e944335382"
    - "bunx vitest run local-ci-selection/result-manifest/route-decision/task-run-blueprint/evaluator-run"
    - "bun run typecheck"
    - "bun run docs:cli:check"
    - "ap doctor"
  findings:
    - "No unresolved evaluator findings. Hotspot extraction is intentionally narrow: route packet decision helpers were isolated while broader task-run decomposition remains a future refactor because current hotspots stay under enforced thresholds."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing the approved v0.6.12 agent-efficiency batch from the primary branch_pr worktree, beginning with route packet v2 as the shared contract."
events:
  -
    type: "status"
    at: "2026-05-28T17:09:33.291Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the approved v0.6.12 agent-efficiency batch from the primary branch_pr worktree, beginning with route packet v2 as the shared contract."
  -
    type: "verify"
    at: "2026-05-28T17:22:03.817Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts --config vitest.workspace.ts; Result: pass, 5 files and 84 tests. Command: bun run typecheck; Result: pass. Command: bun run format:changed; Result: pass. Command: bun run hotspots:check; Result: pass with warnings below thresholds. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: pass after framework dev bootstrap. Command: bun run docs:cli:check, docs:bootstrap:check, release:parity; Result: pass."
doc_version: 3
doc_updated_at: "2026-05-28T17:22:03.850Z"
doc_updated_by: "CODER"
description: "Extend route oracle outputs into a richer execution packet for task brief/status/next-action and runner bundle consumers."
sections:
  Summary: |-
    Route packet v2 for agent next-action surfaces

    Extend route oracle outputs into a richer execution packet for task brief/status/next-action and runner bundle consumers.
  Scope: |-
    - In scope: Extend route oracle outputs into a richer execution packet for task brief/status/next-action and runner bundle consumers.
    - Out of scope: unrelated refactors not required for "Route packet v2 for agent next-action surfaces".
  Plan: "Primary batch task for v0.6.12 agent-efficiency work. Implement route packet v2 as the shared contract used by task brief/status/next-action and runner bundle output. Include related approved tasks in this primary worktree: 202605281707-FMY3FQ, 202605281707-B1DQCY, 202605281707-7FSSSP, 202605281707-6MNB2K, 202605281707-VP74QA, 202605281707-DPJKMR, 202605281707-QEW595. Keep public CLI behavior backward-compatible while adding structured fields. Verify with focused route-decision/task-brief/task-run tests, docs/bootstrap freshness where affected, typecheck, hotspot check, ap doctor, and policy routing."
  Verify Steps: "1. Run focused route oracle tests covering new execution packet fields and legacy field compatibility. 2. Run focused task brief/status/next-action output tests. 3. Run runner task-run/bootstrap tests proving route packet fields are present in bundle/bootstrap. 4. Run bun run typecheck. 5. Run bun run hotspots:check. 6. Run node .agentplane/policy/check-routing.mjs and ap doctor."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T17:22:03.817Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts --config vitest.workspace.ts; Result: pass, 5 files and 84 tests. Command: bun run typecheck; Result: pass. Command: bun run format:changed; Result: pass. Command: bun run hotspots:check; Result: pass with warnings below thresholds. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: pass after framework dev bootstrap. Command: bun run docs:cli:check, docs:bootstrap:check, release:parity; Result: pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:09:33.291Z, excerpt_hash=sha256:ae9b78455c155d56f8a4465875b346d252a5aa4b60af5e924c272c3d9c777837

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281707-51DD0G-route-packet-v2/.agentplane/tasks/202605281707-51DD0G/blueprint/resolved-snapshot.json
    - old_digest: a3df440f0edb36b57ad5caa7281a15070f35fd41e0d86d1f88ad1fe74e500ae9
    - current_digest: a3df440f0edb36b57ad5caa7281a15070f35fd41e0d86d1f88ad1fe74e500ae9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281707-51DD0G

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  branch_pr_batch:
    base: "main"
    branch: "task/202605281707-51DD0G/route-packet-v2"
    included_task_ids:
      - "202605281707-6MNB2K"
      - "202605281707-7FSSSP"
      - "202605281707-B1DQCY"
      - "202605281707-DPJKMR"
      - "202605281707-FMY3FQ"
      - "202605281707-QEW595"
      - "202605281707-VP74QA"
    primary_task_id: "202605281707-51DD0G"
    role: "primary"
    updated_at: "2026-05-28T17:25:10.626Z"
id_source: "generated"
---
## Summary

Route packet v2 for agent next-action surfaces

Extend route oracle outputs into a richer execution packet for task brief/status/next-action and runner bundle consumers.

## Scope

- In scope: Extend route oracle outputs into a richer execution packet for task brief/status/next-action and runner bundle consumers.
- Out of scope: unrelated refactors not required for "Route packet v2 for agent next-action surfaces".

## Plan

Primary batch task for v0.6.12 agent-efficiency work. Implement route packet v2 as the shared contract used by task brief/status/next-action and runner bundle output. Include related approved tasks in this primary worktree: 202605281707-FMY3FQ, 202605281707-B1DQCY, 202605281707-7FSSSP, 202605281707-6MNB2K, 202605281707-VP74QA, 202605281707-DPJKMR, 202605281707-QEW595. Keep public CLI behavior backward-compatible while adding structured fields. Verify with focused route-decision/task-brief/task-run tests, docs/bootstrap freshness where affected, typecheck, hotspot check, ap doctor, and policy routing.

## Verify Steps

1. Run focused route oracle tests covering new execution packet fields and legacy field compatibility. 2. Run focused task brief/status/next-action output tests. 3. Run runner task-run/bootstrap tests proving route packet fields are present in bundle/bootstrap. 4. Run bun run typecheck. 5. Run bun run hotspots:check. 6. Run node .agentplane/policy/check-routing.mjs and ap doctor.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T17:22:03.817Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts --config vitest.workspace.ts; Result: pass, 5 files and 84 tests. Command: bun run typecheck; Result: pass. Command: bun run format:changed; Result: pass. Command: bun run hotspots:check; Result: pass with warnings below thresholds. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: pass after framework dev bootstrap. Command: bun run docs:cli:check, docs:bootstrap:check, release:parity; Result: pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:09:33.291Z, excerpt_hash=sha256:ae9b78455c155d56f8a4465875b346d252a5aa4b60af5e924c272c3d9c777837

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281707-51DD0G-route-packet-v2/.agentplane/tasks/202605281707-51DD0G/blueprint/resolved-snapshot.json
- old_digest: a3df440f0edb36b57ad5caa7281a15070f35fd41e0d86d1f88ad1fe74e500ae9
- current_digest: a3df440f0edb36b57ad5caa7281a15070f35fd41e0d86d1f88ad1fe74e500ae9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281707-51DD0G

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
