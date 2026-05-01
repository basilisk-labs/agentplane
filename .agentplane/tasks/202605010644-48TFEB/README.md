---
id: "202605010644-48TFEB"
title: "AP-03: Normalize prompt compiler context"
result_summary: "Merged via PR #645."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605010644-0B48D4"
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T07:14:53.950Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved AP-03 from user-provided Agentplane 0.4 refactor plan after AP-02 closed."
verification:
  state: "ok"
  updated_at: "2026-05-01T07:19:03.366Z"
  updated_by: "CODER"
  note: "Verified prompt compiler context normalization with: bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts --testTimeout 60000 --hookTimeout 60000; bun run typecheck; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap."
commit:
  hash: "6f83debaeaf928eae926beb6873126220e432089"
  message: "Merge pull request #645 from basilisk-labs/task/202605010644-48TFEB/prompt-context-normalizer"
comments:
  -
    author: "CODER"
    body: "Start: add pure normalization for PromptModuleCompilerContext and focused compiler diagnostics for discarded context values."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #645 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T07:15:10.114Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add pure normalization for PromptModuleCompilerContext and focused compiler diagnostics for discarded context values."
  -
    type: "verify"
    at: "2026-05-01T07:19:03.366Z"
    author: "CODER"
    state: "ok"
    note: "Verified prompt compiler context normalization with: bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts --testTimeout 60000 --hookTimeout 60000; bun run typecheck; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap."
  -
    type: "status"
    at: "2026-05-01T07:21:57.966Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #645 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T07:21:57.971Z"
doc_updated_by: "INTEGRATOR"
description: "Add a pure prompt compiler context normalizer with diagnostics for discarded or invalid values before graph compilation."
sections:
  Summary: |-
    AP-03: Normalize prompt compiler context
    
    Add a pure prompt compiler context normalizer with diagnostics for discarded or invalid values before graph compilation.
  Scope: |-
    - In scope: Add a pure prompt compiler context normalizer with diagnostics for discarded or invalid values before graph compilation.
    - Out of scope: unrelated refactors not required for "AP-03: Normalize prompt compiler context".
  Plan: |-
    1. Implement the change for "AP-03: Normalize prompt compiler context".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T07:19:03.366Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified prompt compiler context normalization with: bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts --testTimeout 60000 --hookTimeout 60000; bun run typecheck; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T07:15:10.114Z, excerpt_hash=sha256:2488d932674b6cf163d1054627d4316fd1f5fe35689a60c29436aa82178c774d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

AP-03: Normalize prompt compiler context

Add a pure prompt compiler context normalizer with diagnostics for discarded or invalid values before graph compilation.

## Scope

- In scope: Add a pure prompt compiler context normalizer with diagnostics for discarded or invalid values before graph compilation.
- Out of scope: unrelated refactors not required for "AP-03: Normalize prompt compiler context".

## Plan

1. Implement the change for "AP-03: Normalize prompt compiler context".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T07:19:03.366Z — VERIFY — ok

By: CODER

Note: Verified prompt compiler context normalization with: bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts --testTimeout 60000 --hookTimeout 60000; bun run typecheck; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T07:15:10.114Z, excerpt_hash=sha256:2488d932674b6cf163d1054627d4316fd1f5fe35689a60c29436aa82178c774d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
