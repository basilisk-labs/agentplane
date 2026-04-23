---
id: "202604230819-RF0YSQ"
title: "Allow verify --local-only without structured finding"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T08:19:54.043Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T08:21:10.110Z"
  updated_by: "CODER"
  note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 29 tests passed including plain --local-only regression. Command: bunx eslint packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Installed clean-project smoke: pseudo-installed package layout ran verify --local-only successfully for task 202604230820-WKCRYR."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fixing verify --local-only validation for plain clean-project verification records."
events:
  -
    type: "status"
    at: "2026-04-23T08:19:54.620Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fixing verify --local-only validation for plain clean-project verification records."
  -
    type: "verify"
    at: "2026-04-23T08:21:10.110Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 29 tests passed including plain --local-only regression. Command: bunx eslint packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Installed clean-project smoke: pseudo-installed package layout ran verify --local-only successfully for task 202604230820-WKCRYR."
doc_version: 3
doc_updated_at: "2026-04-23T08:21:10.113Z"
doc_updated_by: "CODER"
description: "Fix verify validation so --local-only only modifies appended structured findings and does not make plain verification notes fail in clean user workflows."
sections:
  Summary: |-
    Allow verify --local-only without structured finding
    
    Fix verify validation so --local-only only modifies appended structured findings and does not make plain verification notes fail in clean user workflows.
  Scope: |-
    - In scope: Fix verify validation so --local-only only modifies appended structured findings and does not make plain verification notes fail in clean user workflows.
    - Out of scope: unrelated refactors not required for "Allow verify --local-only without structured finding".
  Plan: "Fix verify option validation so `--local-only` and `--repo-fixable` only require structured finding fields when at least one finding field/collection is present. Plain `agentplane verify ... --local-only` should behave like a normal verification record and ignore the finding-locality flag. Add lifecycle regression coverage and verify focused tests/lint/build."
  Verify Steps: |-
    1. Run `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts --pool=threads --maxWorkers 4`. Expected: pass, including plain verify with --local-only.
    2. Run `bunx eslint packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts`. Expected: pass.
    3. Run `bun run --filter=agentplane build`. Expected: pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T08:21:10.110Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 29 tests passed including plain --local-only regression. Command: bunx eslint packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Installed clean-project smoke: pseudo-installed package layout ran verify --local-only successfully for task 202604230820-WKCRYR.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T08:19:54.626Z, excerpt_hash=sha256:4aa79dcbd7a17909e0a840a7891d6d8e1f9b77218de009624321fab2abac5295
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Allow verify --local-only without structured finding

Fix verify validation so --local-only only modifies appended structured findings and does not make plain verification notes fail in clean user workflows.

## Scope

- In scope: Fix verify validation so --local-only only modifies appended structured findings and does not make plain verification notes fail in clean user workflows.
- Out of scope: unrelated refactors not required for "Allow verify --local-only without structured finding".

## Plan

Fix verify option validation so `--local-only` and `--repo-fixable` only require structured finding fields when at least one finding field/collection is present. Plain `agentplane verify ... --local-only` should behave like a normal verification record and ignore the finding-locality flag. Add lifecycle regression coverage and verify focused tests/lint/build.

## Verify Steps

1. Run `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts --pool=threads --maxWorkers 4`. Expected: pass, including plain verify with --local-only.
2. Run `bunx eslint packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts`. Expected: pass.
3. Run `bun run --filter=agentplane build`. Expected: pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T08:21:10.110Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 29 tests passed including plain --local-only regression. Command: bunx eslint packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Installed clean-project smoke: pseudo-installed package layout ran verify --local-only successfully for task 202604230820-WKCRYR.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T08:19:54.626Z, excerpt_hash=sha256:4aa79dcbd7a17909e0a840a7891d6d8e1f9b77218de009624321fab2abac5295

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
