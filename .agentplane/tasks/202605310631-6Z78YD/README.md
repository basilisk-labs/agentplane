---
id: "202605310631-6Z78YD"
title: "Require final untracked artifact audit"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "lifecycle"
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T06:32:16.010Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-31T06:38:55.691Z"
  updated_by: "CODER"
  note: "Implemented final untracked artifact audit guidance across policy, bootstrap, preflight, finish diagnostics, docs, and tests. Checks passed: policy routing, Vitest targeted suite, bootstrap doc freshness, format:changed, doctor, preflight, and explicit git status --short --untracked-files=all review."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-31T06:40:50.902Z"
  updated_by: "EVALUATOR"
  note: "Final untracked artifact audit contract is implemented and covered by targeted tests."
  evaluated_sha: "e81a505bee4d4264e548eb090d38692e74620629"
  blueprint_digest: "45466522adf83962cc72bf150992932ca73f856e8ff9374524f3db709954eb58"
  evidence_refs:
    - ".agentplane/tasks/202605310631-6Z78YD/README.md"
    - ".agentplane/tasks/202605310631-6Z78YD/quality/20260531-064050902-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605310631-6Z78YD/quality/20260531-064050902-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605310631-6Z78YD/quality/20260531-064050902-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605310631-6Z78YD/blueprint/resolved-snapshot.json"
    - "node .agentplane/policy/check-routing.mjs; bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts; bun run docs:bootstrap:check; bun run format:changed; ap doctor; ap preflight --mode quick --role ORCHESTRATOR; git status --short --untracked-files=all"
  findings:
    - "Policy, bootstrap, preflight, finish diagnostics, and generated docs now require or surface git status --short --untracked-files=all without converting active parallel task README artifacts into blanket blockers."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the approved final untracked artifact audit contract in the dedicated branch_pr worktree, keeping policy, CLI guidance, docs, and tests scoped to closeout visibility."
events:
  -
    type: "status"
    at: "2026-05-31T06:33:45.425Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved final untracked artifact audit contract in the dedicated branch_pr worktree, keeping policy, CLI guidance, docs, and tests scoped to closeout visibility."
  -
    type: "verify"
    at: "2026-05-31T06:38:55.691Z"
    author: "CODER"
    state: "ok"
    note: "Implemented final untracked artifact audit guidance across policy, bootstrap, preflight, finish diagnostics, docs, and tests. Checks passed: policy routing, Vitest targeted suite, bootstrap doc freshness, format:changed, doctor, preflight, and explicit git status --short --untracked-files=all review."
doc_version: 3
doc_updated_at: "2026-05-31T06:38:55.708Z"
doc_updated_by: "CODER"
description: "Make AgentPlane closeout guidance require an explicit final git status with --untracked-files=all so agents cannot miss generated task or quality artifacts before reporting completion."
sections:
  Summary: |-
    Require final untracked artifact audit

    Make AgentPlane closeout guidance require an explicit final git status with --untracked-files=all so agents cannot miss generated task or quality artifacts before reporting completion.
  Scope: |-
    - In scope: Make AgentPlane closeout guidance require an explicit final git status with --untracked-files=all so agents cannot miss generated task or quality artifacts before reporting completion.
    - Out of scope: unrelated refactors not required for "Require final untracked artifact audit".
  Plan: |-
    1. Update policy and bootstrap guidance so final closeout requires explicit full untracked visibility via git status --short --untracked-files=all.
    2. Update CLI quickstart/preflight user-facing text and generated docs so agents see the full-status requirement before and after work.
    3. Add or update targeted tests that lock the command/guidance contract and protect active parallel task README classification from becoming a blanket untracked blocker.
    4. Run policy routing, targeted CLI tests, and a local preflight/status proof with --untracked-files=all before integration.
  Verify Steps: |-
    - Command: node .agentplane/policy/check-routing.mjs; Expect: policy routing and line-budget checks pass after policy/gateway edits.
    - Command: bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts; Expect: quickstart/preflight/finish guidance covers final --untracked-files=all visibility and existing task-artifact classification remains bounded.
    - Command: bun run docs:bootstrap:check; Expect: generated bootstrap docs stay aligned with the CLI renderer.
    - Command: bun run format:changed; Expect: changed files satisfy Prettier.
    - Command: ap doctor; Expect: workspace and workflow doctor pass with no errors.
    - Command: ap preflight --mode quick --role ORCHESTRATOR; Expect: local backend loads active tasks and preflight reports both tracked-only status and full artifact-audit next actions.
    - Command: git status --short --untracked-files=all; Expect: final report explicitly lists or confirms absence of untracked artifacts before closeout.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-31T06:38:55.691Z — VERIFY — ok

    By: CODER

    Note: Implemented final untracked artifact audit guidance across policy, bootstrap, preflight, finish diagnostics, docs, and tests. Checks passed: policy routing, Vitest targeted suite, bootstrap doc freshness, format:changed, doctor, preflight, and explicit git status --short --untracked-files=all review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T06:38:37.758Z, excerpt_hash=sha256:ad115caf15572ef94811d30f0f05477ec95a37749478a506608f948d939ba3d1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605310631-6Z78YD-require-final-untracked-artifact-audit/.agentplane/tasks/202605310631-6Z78YD/blueprint/resolved-snapshot.json
    - old_digest: 45466522adf83962cc72bf150992932ca73f856e8ff9374524f3db709954eb58
    - current_digest: 45466522adf83962cc72bf150992932ca73f856e8ff9374524f3db709954eb58
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605310631-6Z78YD

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Closeout guidance previously allowed agents to stop at tracked-only status or directory-collapsed git status output.
      Impact: Generated task, PR, or quality artifacts could remain unreviewed and uncommitted after finish/reporting.
      Resolution: Require full untracked artifact visibility in final evidence and surface git status --short --untracked-files=all in bootstrap, preflight next actions, DoD, and finish diagnostics.
id_source: "generated"
---
## Summary

Require final untracked artifact audit

Make AgentPlane closeout guidance require an explicit final git status with --untracked-files=all so agents cannot miss generated task or quality artifacts before reporting completion.

## Scope

- In scope: Make AgentPlane closeout guidance require an explicit final git status with --untracked-files=all so agents cannot miss generated task or quality artifacts before reporting completion.
- Out of scope: unrelated refactors not required for "Require final untracked artifact audit".

## Plan

1. Update policy and bootstrap guidance so final closeout requires explicit full untracked visibility via git status --short --untracked-files=all.
2. Update CLI quickstart/preflight user-facing text and generated docs so agents see the full-status requirement before and after work.
3. Add or update targeted tests that lock the command/guidance contract and protect active parallel task README classification from becoming a blanket untracked blocker.
4. Run policy routing, targeted CLI tests, and a local preflight/status proof with --untracked-files=all before integration.

## Verify Steps

- Command: node .agentplane/policy/check-routing.mjs; Expect: policy routing and line-budget checks pass after policy/gateway edits.
- Command: bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts; Expect: quickstart/preflight/finish guidance covers final --untracked-files=all visibility and existing task-artifact classification remains bounded.
- Command: bun run docs:bootstrap:check; Expect: generated bootstrap docs stay aligned with the CLI renderer.
- Command: bun run format:changed; Expect: changed files satisfy Prettier.
- Command: ap doctor; Expect: workspace and workflow doctor pass with no errors.
- Command: ap preflight --mode quick --role ORCHESTRATOR; Expect: local backend loads active tasks and preflight reports both tracked-only status and full artifact-audit next actions.
- Command: git status --short --untracked-files=all; Expect: final report explicitly lists or confirms absence of untracked artifacts before closeout.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-31T06:38:55.691Z — VERIFY — ok

By: CODER

Note: Implemented final untracked artifact audit guidance across policy, bootstrap, preflight, finish diagnostics, docs, and tests. Checks passed: policy routing, Vitest targeted suite, bootstrap doc freshness, format:changed, doctor, preflight, and explicit git status --short --untracked-files=all review.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T06:38:37.758Z, excerpt_hash=sha256:ad115caf15572ef94811d30f0f05477ec95a37749478a506608f948d939ba3d1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605310631-6Z78YD-require-final-untracked-artifact-audit/.agentplane/tasks/202605310631-6Z78YD/blueprint/resolved-snapshot.json
- old_digest: 45466522adf83962cc72bf150992932ca73f856e8ff9374524f3db709954eb58
- current_digest: 45466522adf83962cc72bf150992932ca73f856e8ff9374524f3db709954eb58
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605310631-6Z78YD

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Closeout guidance previously allowed agents to stop at tracked-only status or directory-collapsed git status output.
  Impact: Generated task, PR, or quality artifacts could remain unreviewed and uncommitted after finish/reporting.
  Resolution: Require full untracked artifact visibility in final evidence and surface git status --short --untracked-files=all in bootstrap, preflight next actions, DoD, and finish diagnostics.
