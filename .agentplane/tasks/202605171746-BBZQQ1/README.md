---
id: "202605171746-BBZQQ1"
title: "Add feedback issue publish transports"
result_summary: "Merged via PR #3855."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "diagnostics"
  - "github"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T17:46:57.017Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T18:13:31.941Z"
  updated_by: "CODER"
  note: "Post-refactor verification: split feedback issue publishing helpers below hotspot threshold after pre-push hotspot gate caught oversized command module."
  attempts: 0
commit:
  hash: "0d961b9f73414ffa57c9bed80cbc21b3c612bf7d"
  message: "Merge pull request #3855 from basilisk-labs/task/202605171746-BBZQQ1/feedback-issue-transports"
comments:
  -
    author: "CODER"
    body: "Start: implement controlled feedback issue publishing transports, preserving dry-run privacy bounds and adding targeted tests/docs for GitHub and cloud fallback behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3855 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-17T17:47:24.388Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement controlled feedback issue publishing transports, preserving dry-run privacy bounds and adding targeted tests/docs for GitHub and cloud fallback behavior."
  -
    type: "verify"
    at: "2026-05-17T18:04:35.770Z"
    author: "CODER"
    state: "ok"
    note: "Implemented controlled feedback issue transports and verified focused CLI/config coverage plus generated artifacts."
  -
    type: "verify"
    at: "2026-05-17T18:13:31.941Z"
    author: "CODER"
    state: "ok"
    note: "Post-refactor verification: split feedback issue publishing helpers below hotspot threshold after pre-push hotspot gate caught oversized command module."
  -
    type: "status"
    at: "2026-05-18T05:22:15.114Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3855 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-18T05:22:15.120Z"
doc_updated_by: "INTEGRATOR"
description: "Extend the AgentPlane feedback issue flow from privacy-bounded draft creation to controlled publish transports, including GitHub publishing ergonomics and an anonymous cloud intake fallback."
sections:
  Summary: |-
    Add feedback issue publish transports

    Extend the AgentPlane feedback issue flow from privacy-bounded draft creation to controlled publish transports, including GitHub publishing ergonomics and an anonymous cloud intake fallback.
  Scope: |-
    - In scope: Extend the AgentPlane feedback issue flow from privacy-bounded draft creation to controlled publish transports, including GitHub publishing ergonomics and an anonymous cloud intake fallback.
    - Out of scope: unrelated refactors not required for "Add feedback issue publish transports".
  Plan: |-
    1. Preserve the existing privacy-bounded issue payload builder and dry-run behavior.
    2. Add explicit publish transport selection to insights issue: GitHub via current gh API path, cloud anonymous intake via configured endpoint, and auto fallback that prefers GitHub when available.
    3. Extend config/init/docs with minimal opt-in settings while keeping existing feedback.github_issues.enabled compatibility.
    4. Add targeted tests for dry-run payload, disabled feedback, cloud transport, and missing GitHub auth fallback behavior.
    5. Verify with task verify-show and focused CLI/config tests.
  Verify Steps: |-
    1. Run focused feedback/init/config tests:
     RUN  v4.1.6 /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171746-BBZQQ1-feedback-issue-transports

     Test Files  4 passed (4)
          Tests  67 passed (67)
       Start at  00:56:39
       Duration  178.34s (transform 8.66s, setup 0ms, import 10.75s, tests 178.57s, environment 1ms). Expected: all selected tests pass.
    2. Run generated artifact checks: schemas OK, /var/folders/80/hzx36fdd7ps2j5gbpwm5mcjr0000gn/T/agentplane-cli-docs-AsM22j/cli-reference.generated.mdx
    ../../../../../../../var/folders/80/hzx36fdd7ps2j5gbpwm5mcjr0000gn/T/agentplane-cli-docs-AsM22j/cli-reference.generated.mdx 148ms (unchanged)
    ok: docs/user/cli-reference.generated.mdx is up to date, and Checking 24 changed file(s) with Prettier
    Checking formatting...
    All matched files use Prettier code style!. Expected: generated schemas/docs are fresh and changed files are formatted.
    3. Run . Expected: TypeScript project references compile.
    4. Run framework safety checks: doctor (OK) and policy routing OK. Expected: repo-local runtime and routing policy pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T18:04:35.770Z — VERIFY — ok

    By: CODER

    Note: Implemented controlled feedback issue transports and verified focused CLI/config coverage plus generated artifacts.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T18:00:15.790Z, excerpt_hash=sha256:a0e7a41edcefd36499031bbb439f72891248cfec59421b0d99b448e12ffac3b9

    Details:

    Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.insights-report.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts packages/core/src/config/config.test.ts. Result: pass. Evidence: 4 test files passed, 67 tests passed. Scope: feedback issue transport behavior, init flags, prompt defaults, config defaults.
    Command: bun run schemas:check. Result: pass. Evidence: schemas OK. Scope: generated config schema artifacts.
    Command: bun run docs:cli:check. Result: pass. Evidence: cli-reference.generated.mdx is up to date. Scope: generated CLI reference.
    Command: bun run format:changed. Result: pass. Evidence: All matched files use Prettier code style. Scope: changed files.
    Command: bun run typecheck. Result: pass. Evidence: tsc -b completed with exit 0. Scope: TypeScript project references.
    Command: ap doctor. Result: pass. Evidence: doctor (OK), errors=0 warnings=0. Scope: repo-local runtime/workflow health.
    Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171746-BBZQQ1-feedback-issue-transports/.agentplane/tasks/202605171746-BBZQQ1/blueprint/resolved-snapshot.json
    - old_digest: 8938d12698dccde93c32aec6ccffb808135de7bd20085ccb99882f721377f3b5
    - current_digest: 8938d12698dccde93c32aec6ccffb808135de7bd20085ccb99882f721377f3b5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171746-BBZQQ1

    ### 2026-05-17T18:13:31.941Z — VERIFY — ok

    By: CODER

    Note: Post-refactor verification: split feedback issue publishing helpers below hotspot threshold after pre-push hotspot gate caught oversized command module.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T18:04:35.779Z, excerpt_hash=sha256:a0e7a41edcefd36499031bbb439f72891248cfec59421b0d99b448e12ffac3b9

    Details:

    Command: node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300. Result: pass. Evidence: hotspot threshold check passed; insights.command.ts is below the 600-line error threshold. Scope: feedback issue publish helper split.
    Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.insights-report.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts packages/core/src/config/config.test.ts. Result: pass. Evidence: 4 test files passed, 67 tests passed. Scope: feedback issue transport behavior after helper split.
    Command: bun run typecheck. Result: pass. Evidence: tsc -b completed with exit 0. Scope: TypeScript project references after helper split.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171746-BBZQQ1-feedback-issue-transports/.agentplane/tasks/202605171746-BBZQQ1/blueprint/resolved-snapshot.json
    - old_digest: 8938d12698dccde93c32aec6ccffb808135de7bd20085ccb99882f721377f3b5
    - current_digest: 8938d12698dccde93c32aec6ccffb808135de7bd20085ccb99882f721377f3b5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171746-BBZQQ1

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add feedback issue publish transports

Extend the AgentPlane feedback issue flow from privacy-bounded draft creation to controlled publish transports, including GitHub publishing ergonomics and an anonymous cloud intake fallback.

## Scope

- In scope: Extend the AgentPlane feedback issue flow from privacy-bounded draft creation to controlled publish transports, including GitHub publishing ergonomics and an anonymous cloud intake fallback.
- Out of scope: unrelated refactors not required for "Add feedback issue publish transports".

## Plan

1. Preserve the existing privacy-bounded issue payload builder and dry-run behavior.
2. Add explicit publish transport selection to insights issue: GitHub via current gh API path, cloud anonymous intake via configured endpoint, and auto fallback that prefers GitHub when available.
3. Extend config/init/docs with minimal opt-in settings while keeping existing feedback.github_issues.enabled compatibility.
4. Add targeted tests for dry-run payload, disabled feedback, cloud transport, and missing GitHub auth fallback behavior.
5. Verify with task verify-show and focused CLI/config tests.

## Verify Steps

1. Run focused feedback/init/config tests:
 RUN  v4.1.6 /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171746-BBZQQ1-feedback-issue-transports

 Test Files  4 passed (4)
      Tests  67 passed (67)
   Start at  00:56:39
   Duration  178.34s (transform 8.66s, setup 0ms, import 10.75s, tests 178.57s, environment 1ms). Expected: all selected tests pass.
2. Run generated artifact checks: schemas OK, /var/folders/80/hzx36fdd7ps2j5gbpwm5mcjr0000gn/T/agentplane-cli-docs-AsM22j/cli-reference.generated.mdx
../../../../../../../var/folders/80/hzx36fdd7ps2j5gbpwm5mcjr0000gn/T/agentplane-cli-docs-AsM22j/cli-reference.generated.mdx 148ms (unchanged)
ok: docs/user/cli-reference.generated.mdx is up to date, and Checking 24 changed file(s) with Prettier
Checking formatting...
All matched files use Prettier code style!. Expected: generated schemas/docs are fresh and changed files are formatted.
3. Run . Expected: TypeScript project references compile.
4. Run framework safety checks: doctor (OK) and policy routing OK. Expected: repo-local runtime and routing policy pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T18:04:35.770Z — VERIFY — ok

By: CODER

Note: Implemented controlled feedback issue transports and verified focused CLI/config coverage plus generated artifacts.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T18:00:15.790Z, excerpt_hash=sha256:a0e7a41edcefd36499031bbb439f72891248cfec59421b0d99b448e12ffac3b9

Details:

Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.insights-report.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts packages/core/src/config/config.test.ts. Result: pass. Evidence: 4 test files passed, 67 tests passed. Scope: feedback issue transport behavior, init flags, prompt defaults, config defaults.
Command: bun run schemas:check. Result: pass. Evidence: schemas OK. Scope: generated config schema artifacts.
Command: bun run docs:cli:check. Result: pass. Evidence: cli-reference.generated.mdx is up to date. Scope: generated CLI reference.
Command: bun run format:changed. Result: pass. Evidence: All matched files use Prettier code style. Scope: changed files.
Command: bun run typecheck. Result: pass. Evidence: tsc -b completed with exit 0. Scope: TypeScript project references.
Command: ap doctor. Result: pass. Evidence: doctor (OK), errors=0 warnings=0. Scope: repo-local runtime/workflow health.
Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171746-BBZQQ1-feedback-issue-transports/.agentplane/tasks/202605171746-BBZQQ1/blueprint/resolved-snapshot.json
- old_digest: 8938d12698dccde93c32aec6ccffb808135de7bd20085ccb99882f721377f3b5
- current_digest: 8938d12698dccde93c32aec6ccffb808135de7bd20085ccb99882f721377f3b5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171746-BBZQQ1

### 2026-05-17T18:13:31.941Z — VERIFY — ok

By: CODER

Note: Post-refactor verification: split feedback issue publishing helpers below hotspot threshold after pre-push hotspot gate caught oversized command module.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T18:04:35.779Z, excerpt_hash=sha256:a0e7a41edcefd36499031bbb439f72891248cfec59421b0d99b448e12ffac3b9

Details:

Command: node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300. Result: pass. Evidence: hotspot threshold check passed; insights.command.ts is below the 600-line error threshold. Scope: feedback issue publish helper split.
Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.insights-report.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts packages/core/src/config/config.test.ts. Result: pass. Evidence: 4 test files passed, 67 tests passed. Scope: feedback issue transport behavior after helper split.
Command: bun run typecheck. Result: pass. Evidence: tsc -b completed with exit 0. Scope: TypeScript project references after helper split.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171746-BBZQQ1-feedback-issue-transports/.agentplane/tasks/202605171746-BBZQQ1/blueprint/resolved-snapshot.json
- old_digest: 8938d12698dccde93c32aec6ccffb808135de7bd20085ccb99882f721377f3b5
- current_digest: 8938d12698dccde93c32aec6ccffb808135de7bd20085ccb99882f721377f3b5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171746-BBZQQ1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
