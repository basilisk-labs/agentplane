---
id: "202603301856-CKA7KC"
title: "Lock JSON output behavior with contract tests"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603301721-9ZMFDY"
tags:
  - "code"
  - "refactor"
  - "tests"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-30T19:13:12.437Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as the second Epic 0 safety-net task; scope stays limited to JSON output contract coverage in run-cli tests and avoids production CLI output changes."
verification:
  state: "ok"
  updated_at: "2026-03-30T19:18:27.862Z"
  updated_by: "CODER"
  note: "OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts --testNamePattern \"json|agent_json_v1|output json|runWithOutputMode\" plus prettier --check and eslint on the same file passed; JSON error payloads, agent_json_v1 success envelopes, and wrapped stdout/stderr are now locked without production CLI output changes."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: locking --json-errors and --output json contracts in run-cli tests, including the agent_json_v1 envelope and wrapped stdout/stderr behavior, without changing production CLI output code."
events:
  -
    type: "status"
    at: "2026-03-30T19:17:03.745Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: locking --json-errors and --output json contracts in run-cli tests, including the agent_json_v1 envelope and wrapped stdout/stderr behavior, without changing production CLI output code."
  -
    type: "verify"
    at: "2026-03-30T19:18:27.862Z"
    author: "CODER"
    state: "ok"
    note: "OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts --testNamePattern \"json|agent_json_v1|output json|runWithOutputMode\" plus prettier --check and eslint on the same file passed; JSON error payloads, agent_json_v1 success envelopes, and wrapped stdout/stderr are now locked without production CLI output changes."
doc_version: 3
doc_updated_at: "2026-03-30T19:18:27.864Z"
doc_updated_by: "CODER"
description: "Implement Epic 0 / R0.3 from REFACTOR.md. `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`."
sections:
  Summary: |-
    Lock JSON output behavior with contract tests
    
    Implement Epic 0 / R0.3 from REFACTOR.md. `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.
  Scope: |-
    - In scope: Implement Epic 0 / R0.3 from REFACTOR.md. `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.
    - Out of scope: unrelated refactors not required for "Lock JSON output behavior with contract tests".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli*.test.ts` to isolate the exact behavior gap for R0.3.
    2. Implement the smallest change set that satisfies the REFACTOR contract: `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli*.test.ts`. Expected: the behavior described by R0.3 is observable and stable.
    2. Inspect the final diff for 202603301856-CKA7KC. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli*.test.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-30T19:18:27.862Z — VERIFY — ok
    
    By: CODER
    
    Note: OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts --testNamePattern "json|agent_json_v1|output json|runWithOutputMode" plus prettier --check and eslint on the same file passed; JSON error payloads, agent_json_v1 success envelopes, and wrapped stdout/stderr are now locked without production CLI output changes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T19:17:03.746Z, excerpt_hash=sha256:7f9f620af3274be9f119d895e4c63a6593d14edb2c9a782c6119ece08c3f7f37
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Lock JSON output behavior with contract tests

Implement Epic 0 / R0.3 from REFACTOR.md. `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.

## Scope

- In scope: Implement Epic 0 / R0.3 from REFACTOR.md. `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.
- Out of scope: unrelated refactors not required for "Lock JSON output behavior with contract tests".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli*.test.ts` to isolate the exact behavior gap for R0.3.
2. Implement the smallest change set that satisfies the REFACTOR contract: `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli*.test.ts`. Expected: the behavior described by R0.3 is observable and stable.
2. Inspect the final diff for 202603301856-CKA7KC. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli*.test.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-30T19:18:27.862Z — VERIFY — ok

By: CODER

Note: OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts --testNamePattern "json|agent_json_v1|output json|runWithOutputMode" plus prettier --check and eslint on the same file passed; JSON error payloads, agent_json_v1 success envelopes, and wrapped stdout/stderr are now locked without production CLI output changes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T19:17:03.746Z, excerpt_hash=sha256:7f9f620af3274be9f119d895e4c63a6593d14edb2c9a782c6119ece08c3f7f37

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
