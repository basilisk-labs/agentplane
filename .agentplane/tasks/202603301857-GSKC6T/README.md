---
id: "202603301857-GSKC6T"
title: "Re-lock JSON compatibility and document any intentional invariants"
result_summary: "integrate: squash task/202603301857-GSKC6T/relock-json-contract"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603301857-F0343K"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T12:54:53.981Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T12:57:55.331Z"
  updated_by: "CODER"
  note: "Command: bunx eslint packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 0 lint errors after exact envelope-shape assertions were added; Scope: JSON contract tests. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 84 tests passed, including exact key-order and optional-data assertions for agent_json_v1 across help, config show, and task list/search/next; Scope: CLI JSON compatibility surface. Command: inspect docs/developer/cli-contract.mdx diff; Result: pass; Evidence: docs now describe agent_json_v1 success-envelope keys, optional data, and the --output json failure-path invariant; Scope: developer-facing contract documentation."
commit:
  hash: "306fd05935b7a2f1079bc13f395841779db6de40"
  message: "🧩 GSKC6T integrate: squash task/202603301857-GSKC6T/relock-json-contract"
comments:
  -
    author: "CODER"
    body: "Start: re-lock the stable agent_json_v1 success envelope in tests and developer docs without widening the JSON surface beyond the current contract."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-GSKC6T/pr."
events:
  -
    type: "status"
    at: "2026-03-31T12:55:29.806Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: re-lock the stable agent_json_v1 success envelope in tests and developer docs without widening the JSON surface beyond the current contract."
  -
    type: "verify"
    at: "2026-03-31T12:57:55.331Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx eslint packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 0 lint errors after exact envelope-shape assertions were added; Scope: JSON contract tests. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 84 tests passed, including exact key-order and optional-data assertions for agent_json_v1 across help, config show, and task list/search/next; Scope: CLI JSON compatibility surface. Command: inspect docs/developer/cli-contract.mdx diff; Result: pass; Evidence: docs now describe agent_json_v1 success-envelope keys, optional data, and the --output json failure-path invariant; Scope: developer-facing contract documentation."
  -
    type: "status"
    at: "2026-03-31T12:59:22.368Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-GSKC6T/pr."
doc_version: 3
doc_updated_at: "2026-03-31T12:59:22.371Z"
doc_updated_by: "INTEGRATOR"
description: "Implement Epic 6 / R6.3 from REFACTOR.md. `agent_json_v1` compatibility is explicitly tested and documented as a stable contract."
sections:
  Summary: |-
    Re-lock JSON compatibility and document any intentional invariants
    
    Implement Epic 6 / R6.3 from REFACTOR.md. `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.
  Scope: |-
    - In scope: Implement Epic 6 / R6.3 from REFACTOR.md. `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.
    - Out of scope: unrelated refactors not required for "Re-lock JSON compatibility and document any intentional invariants".
  Plan: |-
    1. Audit the current implementation and tests around tests and developer docs to isolate the exact behavior gap for R6.3.
    2. Implement the smallest change set that satisfies the REFACTOR contract: `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering tests and developer docs. Expected: the behavior described by R6.3 is observable and stable.
    2. Inspect the final diff for 202603301857-GSKC6T. Expected: scope stays limited to tests and developer docs plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T12:57:55.331Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx eslint packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 0 lint errors after exact envelope-shape assertions were added; Scope: JSON contract tests. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 84 tests passed, including exact key-order and optional-data assertions for agent_json_v1 across help, config show, and task list/search/next; Scope: CLI JSON compatibility surface. Command: inspect docs/developer/cli-contract.mdx diff; Result: pass; Evidence: docs now describe agent_json_v1 success-envelope keys, optional data, and the --output json failure-path invariant; Scope: developer-facing contract documentation.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T12:55:29.807Z, excerpt_hash=sha256:65c50d5e1d20f727a235b23ed000b5ea206c191b341a32c92680024fee59abee
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Re-lock JSON compatibility and document any intentional invariants

Implement Epic 6 / R6.3 from REFACTOR.md. `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.

## Scope

- In scope: Implement Epic 6 / R6.3 from REFACTOR.md. `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.
- Out of scope: unrelated refactors not required for "Re-lock JSON compatibility and document any intentional invariants".

## Plan

1. Audit the current implementation and tests around tests and developer docs to isolate the exact behavior gap for R6.3.
2. Implement the smallest change set that satisfies the REFACTOR contract: `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering tests and developer docs. Expected: the behavior described by R6.3 is observable and stable.
2. Inspect the final diff for 202603301857-GSKC6T. Expected: scope stays limited to tests and developer docs plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T12:57:55.331Z — VERIFY — ok

By: CODER

Note: Command: bunx eslint packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 0 lint errors after exact envelope-shape assertions were added; Scope: JSON contract tests. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 84 tests passed, including exact key-order and optional-data assertions for agent_json_v1 across help, config show, and task list/search/next; Scope: CLI JSON compatibility surface. Command: inspect docs/developer/cli-contract.mdx diff; Result: pass; Evidence: docs now describe agent_json_v1 success-envelope keys, optional data, and the --output json failure-path invariant; Scope: developer-facing contract documentation.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T12:55:29.807Z, excerpt_hash=sha256:65c50d5e1d20f727a235b23ed000b5ea206c191b341a32c92680024fee59abee

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
