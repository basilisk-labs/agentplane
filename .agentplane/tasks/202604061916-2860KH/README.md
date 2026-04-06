---
id: "202604061916-2860KH"
title: "Promote incidents during branch_pr integrate and hosted-close"
result_summary: "integrate: squash task/202604061916-2860KH/branch-pr-incidents"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T19:16:50.943Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T20:08:32.993Z"
  updated_by: "CODER"
  note: "Full test:fast passed after fixing finalize integrate mock coverage for the incidents path; targeted vitest and eslint for incidents/protected-paths remain green."
commit:
  hash: "afafdc7404f94c4380a6a4157d21f9587db6360f"
  message: "📝 2860KH task: refresh PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: implement incidents promotion for branch_pr integrate and hosted-close, then lock the behavior with regression tests."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604061916-2860KH/pr."
events:
  -
    type: "status"
    at: "2026-04-06T19:44:19.388Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement incidents promotion for branch_pr integrate and hosted-close, then lock the behavior with regression tests."
  -
    type: "verify"
    at: "2026-04-06T19:52:44.639Z"
    author: "CODER"
    state: "ok"
    note: "Targeted vitest passed for finish/integrate/hosted-close incident promotion; eslint passed; protected policy path coverage added for .agentplane/policy/**."
  -
    type: "verify"
    at: "2026-04-06T20:08:32.993Z"
    author: "CODER"
    state: "ok"
    note: "Full test:fast passed after fixing finalize integrate mock coverage for the incidents path; targeted vitest and eslint for incidents/protected-paths remain green."
  -
    type: "status"
    at: "2026-04-06T20:14:07.738Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604061916-2860KH/pr."
doc_version: 3
doc_updated_at: "2026-04-06T20:14:07.745Z"
doc_updated_by: "INTEGRATOR"
description: "Make branch_pr closure paths promote reusable external incidents into .agentplane/policy/incidents.md the same way direct finish already does, and lock the behavior with tests."
sections:
  Summary: |-
    Promote incidents during branch_pr integrate and hosted-close
    
    Make branch_pr closure paths promote reusable external incidents into .agentplane/policy/incidents.md the same way direct finish already does, and lock the behavior with tests.
  Scope: |-
    - In scope: Make branch_pr closure paths promote reusable external incidents into .agentplane/policy/incidents.md the same way direct finish already does, and lock the behavior with tests.
    - Out of scope: unrelated refactors not required for "Promote incidents during branch_pr integrate and hosted-close".
  Plan: "1. Inspect branch_pr closure code paths and identify where direct finish promotes incidents but integrate/hosted-close do not. 2. Reuse the existing incidents collection helper in the missing branch_pr closure paths without changing unrelated finish semantics. 3. Add regression tests that prove incidents.md is updated from integrate/hosted-close flows. 4. Verify with targeted vitest and lifecycle checks."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/shared/protected-paths.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts -t "treats \.agentplane/policy as an allow-policy prefix|classifies incidents registry under \.agentplane/policy as policy|promotes structured external incident candidates into the incident registry|task hosted-close closes a merged branch_pr task exactly once"`. Expected: all targeted tests pass, proving policy classification plus direct/integrate/hosted-close incident promotion.
    2. Run `bun x eslint packages/agentplane/src/shared/protected-paths.ts packages/agentplane/src/shared/protected-paths.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts`. Expected: lint exits 0.
    3. Run `agentplane task show 202604061916-2860KH` after `bun run framework:dev:bootstrap`. Expected: repo-local runtime is current and the task artifacts remain loadable for branch_pr publication.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T19:52:44.639Z — VERIFY — ok
    
    By: CODER
    
    Note: Targeted vitest passed for finish/integrate/hosted-close incident promotion; eslint passed; protected policy path coverage added for .agentplane/policy/**.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:44:19.614Z, excerpt_hash=sha256:7224a389287037bf5e6c5cd69ab342ba859eb037879fc56c8f2727946ee3b0b1
    
    ### 2026-04-06T20:08:32.993Z — VERIFY — ok
    
    By: CODER
    
    Note: Full test:fast passed after fixing finalize integrate mock coverage for the incidents path; targeted vitest and eslint for incidents/protected-paths remain green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:52:44.645Z, excerpt_hash=sha256:7224a389287037bf5e6c5cd69ab342ba859eb037879fc56c8f2727946ee3b0b1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Root cause: `allowPolicy` did not cover `.agentplane/policy/**`, so branch_pr close paths could write `incidents.md` but guard/allowlist logic still treated it as an unauthorized dirty file.
    - Impact: `integrate` and `task hosted-close` failed or left a dirty tree whenever incident promotion produced `.agentplane/policy/incidents.md`.
    - Resolution: add `.agentplane/policy` to protected policy prefixes, classify `incidents.md` as policy, and pass `allowPolicy` through close-path staging plus branch_pr closure flows.
id_source: "generated"
---
## Summary

Promote incidents during branch_pr integrate and hosted-close

Make branch_pr closure paths promote reusable external incidents into .agentplane/policy/incidents.md the same way direct finish already does, and lock the behavior with tests.

## Scope

- In scope: Make branch_pr closure paths promote reusable external incidents into .agentplane/policy/incidents.md the same way direct finish already does, and lock the behavior with tests.
- Out of scope: unrelated refactors not required for "Promote incidents during branch_pr integrate and hosted-close".

## Plan

1. Inspect branch_pr closure code paths and identify where direct finish promotes incidents but integrate/hosted-close do not. 2. Reuse the existing incidents collection helper in the missing branch_pr closure paths without changing unrelated finish semantics. 3. Add regression tests that prove incidents.md is updated from integrate/hosted-close flows. 4. Verify with targeted vitest and lifecycle checks.

## Verify Steps

1. Run `bun test packages/agentplane/src/shared/protected-paths.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts -t "treats \.agentplane/policy as an allow-policy prefix|classifies incidents registry under \.agentplane/policy as policy|promotes structured external incident candidates into the incident registry|task hosted-close closes a merged branch_pr task exactly once"`. Expected: all targeted tests pass, proving policy classification plus direct/integrate/hosted-close incident promotion.
2. Run `bun x eslint packages/agentplane/src/shared/protected-paths.ts packages/agentplane/src/shared/protected-paths.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts`. Expected: lint exits 0.
3. Run `agentplane task show 202604061916-2860KH` after `bun run framework:dev:bootstrap`. Expected: repo-local runtime is current and the task artifacts remain loadable for branch_pr publication.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T19:52:44.639Z — VERIFY — ok

By: CODER

Note: Targeted vitest passed for finish/integrate/hosted-close incident promotion; eslint passed; protected policy path coverage added for .agentplane/policy/**.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:44:19.614Z, excerpt_hash=sha256:7224a389287037bf5e6c5cd69ab342ba859eb037879fc56c8f2727946ee3b0b1

### 2026-04-06T20:08:32.993Z — VERIFY — ok

By: CODER

Note: Full test:fast passed after fixing finalize integrate mock coverage for the incidents path; targeted vitest and eslint for incidents/protected-paths remain green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:52:44.645Z, excerpt_hash=sha256:7224a389287037bf5e6c5cd69ab342ba859eb037879fc56c8f2727946ee3b0b1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Root cause: `allowPolicy` did not cover `.agentplane/policy/**`, so branch_pr close paths could write `incidents.md` but guard/allowlist logic still treated it as an unauthorized dirty file.
- Impact: `integrate` and `task hosted-close` failed or left a dirty tree whenever incident promotion produced `.agentplane/policy/incidents.md`.
- Resolution: add `.agentplane/policy` to protected policy prefixes, classify `incidents.md` as policy, and pass `allowPolicy` through close-path staging plus branch_pr closure flows.
