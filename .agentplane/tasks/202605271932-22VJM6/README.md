---
id: "202605271932-22VJM6"
title: "Teach agent prompts route oracle fields"
result_summary: "Merged via PR #4176."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-27T19:32:26.925Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-27T19:44:23.483Z"
  updated_by: "CODER"
  note: "Implemented route oracle guidance in agent templates, role/quickstart/bootstrap prompt surfaces, generated agent bootstrap docs, and runner bootstrap. Evidence: focused prompt/runner tests passed (14 pass); agents:check passed; docs:bootstrap:check and docs:cli:check passed; typecheck passed; format:check passed; hotspots:check passed with existing warnings only; policy routing OK; ap doctor OK with informational runtime notices only."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-27T19:59:10.082Z"
  updated_by: "EVALUATOR"
  note: "Agent-facing prompts now explicitly teach route oracle fields, and runner bootstrap now distinguishes rendered route_* lines from camelCase bundle JSON paths."
  evaluated_sha: "ef0f2d993ff694ffcdadcceebed6103685d823c4"
  blueprint_digest: "60a9768b36ca75d14ae76c56c76ed86d72243cba7d5a86b232f5f1710d161933"
  evidence_refs:
    - ".agentplane/tasks/202605271932-22VJM6/README.md"
    - ".agentplane/tasks/202605271932-22VJM6/quality/20260527-195910082-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605271932-22VJM6/quality/20260527-195910082-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605271932-22VJM6/quality/20260527-195910082-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605271932-22VJM6/blueprint/resolved-snapshot.json"
    - "bun test packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts; bun run typecheck; bun run format:check; bun run framework:dev:bootstrap"
  findings:
    - "Addressed PR review by naming bundle paths route_decision.oracle.nextCommand, route_decision.oracle.authoritativeCheckout, route_decision.oracle.blocker, and route_decision.oracle.phase while keeping rendered route_* summary guidance."
commit:
  hash: "82b1250035473abdd39497222749662d5caf6499"
  message: "🚧 22VJM6 task: Refresh evaluator review"
comments:
  -
    author: "CODER"
    body: "Start: update agent-facing prompt surfaces so route oracle fields are explicit and verified."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4176 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-27T19:33:13.531Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: update agent-facing prompt surfaces so route oracle fields are explicit and verified."
  -
    type: "verify"
    at: "2026-05-27T19:44:23.483Z"
    author: "CODER"
    state: "ok"
    note: "Implemented route oracle guidance in agent templates, role/quickstart/bootstrap prompt surfaces, generated agent bootstrap docs, and runner bootstrap. Evidence: focused prompt/runner tests passed (14 pass); agents:check passed; docs:bootstrap:check and docs:cli:check passed; typecheck passed; format:check passed; hotspots:check passed with existing warnings only; policy routing OK; ap doctor OK with informational runtime notices only."
  -
    type: "status"
    at: "2026-05-27T20:08:58.800Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4176 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-27T20:08:58.805Z"
doc_updated_by: "INTEGRATOR"
description: "Update agent-facing prompt/bootstrap guidance so agents treat task next-action --explain as the route oracle and follow phase, authoritative checkout, primary blocker, and next command instead of manually reconstructing branch_pr routes."
sections:
  Summary: |-
    Teach agent prompts route oracle fields

    Update agent-facing prompt/bootstrap guidance so agents treat task next-action --explain as the route oracle and follow phase, authoritative checkout, primary blocker, and next command instead of manually reconstructing branch_pr routes.
  Scope: |-
    - In scope: Update agent-facing prompt/bootstrap guidance so agents treat task next-action --explain as the route oracle and follow phase, authoritative checkout, primary blocker, and next command instead of manually reconstructing branch_pr routes.
    - Out of scope: unrelated refactors not required for "Teach agent prompts route oracle fields".
  Plan: |-
    1. Update agent-facing bootstrap/command guidance to state that task next-action --explain is the route oracle and that agents must use phase, authoritative_checkout, primary_blocker, and next_command as the routing contract.
    2. Update any generated docs/snapshots produced from those guidance sources.
    3. Add or adjust focused tests/snapshots so prompt/help surfaces preserve the route oracle guidance.
    4. Verify with targeted tests, typecheck/docs checks as needed, policy routing, doctor, and hosted PR checks.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts`. Expected: prompt and runner bootstrap guidance include route oracle fields.
    2. Run `bun run agents:check`. Expected: synced agent templates match `.agentplane/agents`.
    3. Run `bun run docs:bootstrap:check` and `bun run docs:cli:check`. Expected: generated docs are fresh.
    4. Run `bun run typecheck`, `bun run format:check`, `bun run hotspots:check`, `node .agentplane/policy/check-routing.mjs`, and `ap doctor`. Expected: all pass or only known non-blocking informational warnings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-27T19:44:23.483Z — VERIFY — ok

    By: CODER

    Note: Implemented route oracle guidance in agent templates, role/quickstart/bootstrap prompt surfaces, generated agent bootstrap docs, and runner bootstrap. Evidence: focused prompt/runner tests passed (14 pass); agents:check passed; docs:bootstrap:check and docs:cli:check passed; typecheck passed; format:check passed; hotspots:check passed with existing warnings only; policy routing OK; ap doctor OK with informational runtime notices only.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T19:40:59.728Z, excerpt_hash=sha256:7a7686a1477b3210db6f7981c9016fb8156f74cf03f16995244f9bf5a81f6c4f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605271932-22VJM6-teach-agent-prompts-route-oracle-fields/.agentplane/tasks/202605271932-22VJM6/blueprint/resolved-snapshot.json
    - old_digest: 60a9768b36ca75d14ae76c56c76ed86d72243cba7d5a86b232f5f1710d161933
    - current_digest: 60a9768b36ca75d14ae76c56c76ed86d72243cba7d5a86b232f5f1710d161933
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605271932-22VJM6

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Teach agent prompts route oracle fields

Update agent-facing prompt/bootstrap guidance so agents treat task next-action --explain as the route oracle and follow phase, authoritative checkout, primary blocker, and next command instead of manually reconstructing branch_pr routes.

## Scope

- In scope: Update agent-facing prompt/bootstrap guidance so agents treat task next-action --explain as the route oracle and follow phase, authoritative checkout, primary blocker, and next command instead of manually reconstructing branch_pr routes.
- Out of scope: unrelated refactors not required for "Teach agent prompts route oracle fields".

## Plan

1. Update agent-facing bootstrap/command guidance to state that task next-action --explain is the route oracle and that agents must use phase, authoritative_checkout, primary_blocker, and next_command as the routing contract.
2. Update any generated docs/snapshots produced from those guidance sources.
3. Add or adjust focused tests/snapshots so prompt/help surfaces preserve the route oracle guidance.
4. Verify with targeted tests, typecheck/docs checks as needed, policy routing, doctor, and hosted PR checks.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts`. Expected: prompt and runner bootstrap guidance include route oracle fields.
2. Run `bun run agents:check`. Expected: synced agent templates match `.agentplane/agents`.
3. Run `bun run docs:bootstrap:check` and `bun run docs:cli:check`. Expected: generated docs are fresh.
4. Run `bun run typecheck`, `bun run format:check`, `bun run hotspots:check`, `node .agentplane/policy/check-routing.mjs`, and `ap doctor`. Expected: all pass or only known non-blocking informational warnings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-27T19:44:23.483Z — VERIFY — ok

By: CODER

Note: Implemented route oracle guidance in agent templates, role/quickstart/bootstrap prompt surfaces, generated agent bootstrap docs, and runner bootstrap. Evidence: focused prompt/runner tests passed (14 pass); agents:check passed; docs:bootstrap:check and docs:cli:check passed; typecheck passed; format:check passed; hotspots:check passed with existing warnings only; policy routing OK; ap doctor OK with informational runtime notices only.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T19:40:59.728Z, excerpt_hash=sha256:7a7686a1477b3210db6f7981c9016fb8156f74cf03f16995244f9bf5a81f6c4f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605271932-22VJM6-teach-agent-prompts-route-oracle-fields/.agentplane/tasks/202605271932-22VJM6/blueprint/resolved-snapshot.json
- old_digest: 60a9768b36ca75d14ae76c56c76ed86d72243cba7d5a86b232f5f1710d161933
- current_digest: 60a9768b36ca75d14ae76c56c76ed86d72243cba7d5a86b232f5f1710d161933
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605271932-22VJM6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
