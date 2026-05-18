---
id: "202605171738-G3EACK"
title: "Gate framework-only policy and dev CLI commands"
result_summary: "Merged via PR #3849."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T17:38:24.422Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T18:13:27.260Z"
  updated_by: "CODER"
  note: "Local verification remains green after fixing the all-command help contract: focused Vitest help/registry/init tests, ESLint, format:check, typecheck, and policy routing passed."
  attempts: 0
commit:
  hash: "f4d81dcb171b935d5ebe4a207188ea2db5b1f644"
  message: "Merge pull request #3849 from basilisk-labs/task/202605171738-G3EACK/framework-dev-gates"
comments:
  -
    author: "CODER"
    body: "Start: implementing framework-only policy and dev CLI command gates in the dedicated branch_pr worktree, with focused tests for prompt-module filtering and command dispatch behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3849 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-17T17:38:49.601Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing framework-only policy and dev CLI command gates in the dedicated branch_pr worktree, with focused tests for prompt-module filtering and command dispatch behavior."
  -
    type: "verify"
    at: "2026-05-17T17:47:47.986Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/agents/agents-template.test.ts. Result: pass. Evidence: 3 files, 32 tests passed. Scope: framework-only policy filtering, CLI help/dispatch gates, asset/policy mirror sync. Command: bun run --filter=agentplane typecheck. Result: pass. Evidence: agentplane typecheck exited 0. Scope: touched TypeScript surfaces. Command: bunx eslint packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/cli/spec/help.ts packages/agentplane/src/runtime/prompt-modules/registry.ts packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts. Result: pass. Evidence: eslint exited 0. Scope: touched source/tests. Command: bun run format:check. Result: pass. Evidence: all matched files use Prettier code style. Scope: repository formatting. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy gateway/mirror budgets. Command: bun run docs:cli:check and bun run agents:check. Result: pass. Evidence: CLI reference up to date; agents templates OK. Scope: generated help and managed assets. Command: bun run framework:dev:bootstrap and ap doctor. Result: pass. Evidence: repo-local runtime ready; doctor OK with errors=0 warnings=0. Scope: framework runtime parity."
  -
    type: "verify"
    at: "2026-05-17T17:59:17.193Z"
    author: "CODER"
    state: "ok"
    note: "Follow-up after hosted CI: fixed knip baseline and init branch_pr tests for intentionally excluded framework.dev policy. Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts. Result: pass. Evidence: 1 file, 9 tests passed. Scope: init does not install framework.dev.md in normal projects. Command: bun run knip:check. Result: pass. Evidence: Knip baseline OK, total=564. Scope: unused-code baseline after isCommandVisibleInHelp became used. Command: bunx vitest run packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts. Result: pass. Evidence: 4 files, 41 tests passed. Scope: policy filtering, CLI gating, init asset contract. Command: bun run --filter=agentplane typecheck; eslint touched files; bun run format:check; node .agentplane/policy/check-routing.mjs; bun run docs:cli:check; bun run agents:check; bun run framework:dev:bootstrap; ap doctor. Result: pass. Evidence: typecheck exited 0; eslint exited 0; formatting OK; policy routing OK; CLI docs up to date; agents templates OK; framework runtime ready; doctor OK with errors=0 warnings=0."
  -
    type: "verify"
    at: "2026-05-17T18:13:27.260Z"
    author: "CODER"
    state: "ok"
    note: "Local verification remains green after fixing the all-command help contract: focused Vitest help/registry/init tests, ESLint, format:check, typecheck, and policy routing passed."
  -
    type: "status"
    at: "2026-05-18T05:16:41.243Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3849 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-18T05:16:41.251Z"
doc_updated_by: "INTEGRATOR"
description: "Add framework-checkout-only policy loading and enforce framework dev CLI commands so they are available only inside AgentPlane framework checkouts, including direct repo-local CLI runs."
sections:
  Summary: |-
    Gate framework-only policy and dev CLI commands

    Add framework-checkout-only policy loading and enforce framework dev CLI commands so they are available only inside AgentPlane framework checkouts, including direct repo-local CLI runs.
  Scope: |-
    - In scope: Add framework-checkout-only policy loading and enforce framework dev CLI commands so they are available only inside AgentPlane framework checkouts, including direct repo-local CLI runs.
    - Out of scope: unrelated refactors not required for "Gate framework-only policy and dev CLI commands".
  Plan: "Implement a framework-only development surface: (1) add a bundled framework.dev policy module with repo_types=[framework] so it compiles only for AgentPlane framework checkouts; (2) propagate framework repo_type into init/recipe prompt graph compilation where applicable without polluting normal user repositories; (3) enforce framework CLI command dispatch so surface=framework commands fail outside framework checkout while remaining available through repo-local and handoff runs inside the framework repo; (4) add focused tests for policy filtering, help visibility, dispatch denial, and direct repo-local invocation semantics."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T17:47:47.986Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest run packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/agents/agents-template.test.ts. Result: pass. Evidence: 3 files, 32 tests passed. Scope: framework-only policy filtering, CLI help/dispatch gates, asset/policy mirror sync. Command: bun run --filter=agentplane typecheck. Result: pass. Evidence: agentplane typecheck exited 0. Scope: touched TypeScript surfaces. Command: bunx eslint packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/cli/spec/help.ts packages/agentplane/src/runtime/prompt-modules/registry.ts packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts. Result: pass. Evidence: eslint exited 0. Scope: touched source/tests. Command: bun run format:check. Result: pass. Evidence: all matched files use Prettier code style. Scope: repository formatting. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy gateway/mirror budgets. Command: bun run docs:cli:check and bun run agents:check. Result: pass. Evidence: CLI reference up to date; agents templates OK. Scope: generated help and managed assets. Command: bun run framework:dev:bootstrap and ap doctor. Result: pass. Evidence: repo-local runtime ready; doctor OK with errors=0 warnings=0. Scope: framework runtime parity.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:38:49.601Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171738-G3EACK-framework-dev-gates/.agentplane/tasks/202605171738-G3EACK/blueprint/resolved-snapshot.json
    - old_digest: 88f33325e7a6f1ded7183f5119416b956892a81fd7867ba3abd6a4fc11f3d960
    - current_digest: 88f33325e7a6f1ded7183f5119416b956892a81fd7867ba3abd6a4fc11f3d960
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171738-G3EACK

    ### 2026-05-17T17:59:17.193Z — VERIFY — ok

    By: CODER

    Note: Follow-up after hosted CI: fixed knip baseline and init branch_pr tests for intentionally excluded framework.dev policy. Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts. Result: pass. Evidence: 1 file, 9 tests passed. Scope: init does not install framework.dev.md in normal projects. Command: bun run knip:check. Result: pass. Evidence: Knip baseline OK, total=564. Scope: unused-code baseline after isCommandVisibleInHelp became used. Command: bunx vitest run packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts. Result: pass. Evidence: 4 files, 41 tests passed. Scope: policy filtering, CLI gating, init asset contract. Command: bun run --filter=agentplane typecheck; eslint touched files; bun run format:check; node .agentplane/policy/check-routing.mjs; bun run docs:cli:check; bun run agents:check; bun run framework:dev:bootstrap; ap doctor. Result: pass. Evidence: typecheck exited 0; eslint exited 0; formatting OK; policy routing OK; CLI docs up to date; agents templates OK; framework runtime ready; doctor OK with errors=0 warnings=0.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:47:47.995Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171738-G3EACK-framework-dev-gates/.agentplane/tasks/202605171738-G3EACK/blueprint/resolved-snapshot.json
    - old_digest: 88f33325e7a6f1ded7183f5119416b956892a81fd7867ba3abd6a4fc11f3d960
    - current_digest: 88f33325e7a6f1ded7183f5119416b956892a81fd7867ba3abd6a4fc11f3d960
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171738-G3EACK

    ### 2026-05-17T18:13:27.260Z — VERIFY — ok

    By: CODER

    Note: Local verification remains green after fixing the all-command help contract: focused Vitest help/registry/init tests, ESLint, format:check, typecheck, and policy routing passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:59:17.216Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171738-G3EACK-framework-dev-gates/.agentplane/tasks/202605171738-G3EACK/blueprint/resolved-snapshot.json
    - old_digest: 88f33325e7a6f1ded7183f5119416b956892a81fd7867ba3abd6a4fc11f3d960
    - current_digest: 88f33325e7a6f1ded7183f5119416b956892a81fd7867ba3abd6a4fc11f3d960
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171738-G3EACK

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Gate framework-only policy and dev CLI commands

Add framework-checkout-only policy loading and enforce framework dev CLI commands so they are available only inside AgentPlane framework checkouts, including direct repo-local CLI runs.

## Scope

- In scope: Add framework-checkout-only policy loading and enforce framework dev CLI commands so they are available only inside AgentPlane framework checkouts, including direct repo-local CLI runs.
- Out of scope: unrelated refactors not required for "Gate framework-only policy and dev CLI commands".

## Plan

Implement a framework-only development surface: (1) add a bundled framework.dev policy module with repo_types=[framework] so it compiles only for AgentPlane framework checkouts; (2) propagate framework repo_type into init/recipe prompt graph compilation where applicable without polluting normal user repositories; (3) enforce framework CLI command dispatch so surface=framework commands fail outside framework checkout while remaining available through repo-local and handoff runs inside the framework repo; (4) add focused tests for policy filtering, help visibility, dispatch denial, and direct repo-local invocation semantics.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T17:47:47.986Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/agents/agents-template.test.ts. Result: pass. Evidence: 3 files, 32 tests passed. Scope: framework-only policy filtering, CLI help/dispatch gates, asset/policy mirror sync. Command: bun run --filter=agentplane typecheck. Result: pass. Evidence: agentplane typecheck exited 0. Scope: touched TypeScript surfaces. Command: bunx eslint packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/cli/spec/help.ts packages/agentplane/src/runtime/prompt-modules/registry.ts packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts. Result: pass. Evidence: eslint exited 0. Scope: touched source/tests. Command: bun run format:check. Result: pass. Evidence: all matched files use Prettier code style. Scope: repository formatting. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy gateway/mirror budgets. Command: bun run docs:cli:check and bun run agents:check. Result: pass. Evidence: CLI reference up to date; agents templates OK. Scope: generated help and managed assets. Command: bun run framework:dev:bootstrap and ap doctor. Result: pass. Evidence: repo-local runtime ready; doctor OK with errors=0 warnings=0. Scope: framework runtime parity.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:38:49.601Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171738-G3EACK-framework-dev-gates/.agentplane/tasks/202605171738-G3EACK/blueprint/resolved-snapshot.json
- old_digest: 88f33325e7a6f1ded7183f5119416b956892a81fd7867ba3abd6a4fc11f3d960
- current_digest: 88f33325e7a6f1ded7183f5119416b956892a81fd7867ba3abd6a4fc11f3d960
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171738-G3EACK

### 2026-05-17T17:59:17.193Z — VERIFY — ok

By: CODER

Note: Follow-up after hosted CI: fixed knip baseline and init branch_pr tests for intentionally excluded framework.dev policy. Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts. Result: pass. Evidence: 1 file, 9 tests passed. Scope: init does not install framework.dev.md in normal projects. Command: bun run knip:check. Result: pass. Evidence: Knip baseline OK, total=564. Scope: unused-code baseline after isCommandVisibleInHelp became used. Command: bunx vitest run packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts. Result: pass. Evidence: 4 files, 41 tests passed. Scope: policy filtering, CLI gating, init asset contract. Command: bun run --filter=agentplane typecheck; eslint touched files; bun run format:check; node .agentplane/policy/check-routing.mjs; bun run docs:cli:check; bun run agents:check; bun run framework:dev:bootstrap; ap doctor. Result: pass. Evidence: typecheck exited 0; eslint exited 0; formatting OK; policy routing OK; CLI docs up to date; agents templates OK; framework runtime ready; doctor OK with errors=0 warnings=0.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:47:47.995Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171738-G3EACK-framework-dev-gates/.agentplane/tasks/202605171738-G3EACK/blueprint/resolved-snapshot.json
- old_digest: 88f33325e7a6f1ded7183f5119416b956892a81fd7867ba3abd6a4fc11f3d960
- current_digest: 88f33325e7a6f1ded7183f5119416b956892a81fd7867ba3abd6a4fc11f3d960
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171738-G3EACK

### 2026-05-17T18:13:27.260Z — VERIFY — ok

By: CODER

Note: Local verification remains green after fixing the all-command help contract: focused Vitest help/registry/init tests, ESLint, format:check, typecheck, and policy routing passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:59:17.216Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171738-G3EACK-framework-dev-gates/.agentplane/tasks/202605171738-G3EACK/blueprint/resolved-snapshot.json
- old_digest: 88f33325e7a6f1ded7183f5119416b956892a81fd7867ba3abd6a4fc11f3d960
- current_digest: 88f33325e7a6f1ded7183f5119416b956892a81fd7867ba3abd6a4fc11f3d960
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171738-G3EACK

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
