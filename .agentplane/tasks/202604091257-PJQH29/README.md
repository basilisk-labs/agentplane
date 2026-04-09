---
id: "202604091257-PJQH29"
title: "Allow explicit internal incident findings to promote into incidents.md"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incidents"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T12:58:53.574Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T14:21:26.323Z"
  updated_by: "CODER"
  note: "Rebased onto main after 75VJ4R removed the shared wait-remote-checks blocker and reran targeted incidents and wait-remote coverage for internal finding promotion into incidents.md."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Enable explicit repo-fixable workflow findings to promote into incidents registry without manual incidents.md edits."
events:
  -
    type: "status"
    at: "2026-04-09T13:11:17.097Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Enable explicit repo-fixable workflow findings to promote into incidents registry without manual incidents.md edits."
  -
    type: "verify"
    at: "2026-04-09T13:15:19.186Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/run-cli.core.incidents.test.ts --timeout 120000 && bun x eslint packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/types.ts packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/commands/task/findings-add.command.ts packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/verify-ok.command.ts packages/agentplane/src/commands/task/verify-rework.command.ts packages/agentplane/src/commands/verify.run.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts && node .agentplane/policy/check-routing.mjs; Result: pass. Evidence: incidents tests passed, eslint clean, routing check OK. Scope: repo-fixable incident promotion and incidents policy/runtime alignment."
  -
    type: "verify"
    at: "2026-04-09T14:21:26.323Z"
    author: "CODER"
    state: "ok"
    note: "Rebased onto main after 75VJ4R removed the shared wait-remote-checks blocker and reran targeted incidents and wait-remote coverage for internal finding promotion into incidents.md."
doc_version: 3
doc_updated_at: "2026-04-09T14:21:26.329Z"
doc_updated_by: "CODER"
description: "Extend incidents collection so explicitly marked internal or repository-fixable workflow findings can promote into the shared incidents registry without manual incidents.md edits."
sections:
  Summary: |-
    Allow explicit internal incident findings to promote into incidents.md
    
    Extend incidents collection so explicitly marked internal or repository-fixable workflow findings can promote into the shared incidents registry without manual incidents.md edits.
  Scope: |-
    - In scope: Extend incidents collection so explicitly marked internal or repository-fixable workflow findings can promote into the shared incidents registry without manual incidents.md edits.
    - Out of scope: unrelated refactors not required for "Allow explicit internal incident findings to promote into incidents.md".
  Plan: "1. Extend incident finding parsing and promotion planning to support explicit internal/promotable findings. 2. Update registry schema/docs/tests so incidents.md can record non-external recurring workflow failures intentionally. 3. Verify collect/finish paths promote explicit internal findings while plain local-only notes still stay task-local."
  Verify Steps: |-
    1. Run focused incidents tests for parsing and collection paths. Expected: explicit internal/promoted findings are accepted, while plain local-only findings remain task-local.
    2. Run incidents collect/verify regression covering an internal candidate. Expected: incidents registry updates without requiring Fixability: external.
    3. Run policy routing and relevant lint/tests. Expected: incidents policy assets and runtime behavior stay aligned.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T13:15:19.186Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun test packages/agentplane/src/cli/run-cli.core.incidents.test.ts --timeout 120000 && bun x eslint packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/types.ts packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/commands/task/findings-add.command.ts packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/verify-ok.command.ts packages/agentplane/src/commands/task/verify-rework.command.ts packages/agentplane/src/commands/verify.run.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts && node .agentplane/policy/check-routing.mjs; Result: pass. Evidence: incidents tests passed, eslint clean, routing check OK. Scope: repo-fixable incident promotion and incidents policy/runtime alignment.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:11:17.106Z, excerpt_hash=sha256:b9f64d4eec78460d064482fc143529bba19b12d004d085ab526fb574c1c310b7
    
    ### 2026-04-09T14:21:26.323Z — VERIFY — ok
    
    By: CODER
    
    Note: Rebased onto main after 75VJ4R removed the shared wait-remote-checks blocker and reran targeted incidents and wait-remote coverage for internal finding promotion into incidents.md.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:15:19.193Z, excerpt_hash=sha256:b9f64d4eec78460d064482fc143529bba19b12d004d085ab526fb574c1c310b7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Allow explicit internal incident findings to promote into incidents.md

Extend incidents collection so explicitly marked internal or repository-fixable workflow findings can promote into the shared incidents registry without manual incidents.md edits.

## Scope

- In scope: Extend incidents collection so explicitly marked internal or repository-fixable workflow findings can promote into the shared incidents registry without manual incidents.md edits.
- Out of scope: unrelated refactors not required for "Allow explicit internal incident findings to promote into incidents.md".

## Plan

1. Extend incident finding parsing and promotion planning to support explicit internal/promotable findings. 2. Update registry schema/docs/tests so incidents.md can record non-external recurring workflow failures intentionally. 3. Verify collect/finish paths promote explicit internal findings while plain local-only notes still stay task-local.

## Verify Steps

1. Run focused incidents tests for parsing and collection paths. Expected: explicit internal/promoted findings are accepted, while plain local-only findings remain task-local.
2. Run incidents collect/verify regression covering an internal candidate. Expected: incidents registry updates without requiring Fixability: external.
3. Run policy routing and relevant lint/tests. Expected: incidents policy assets and runtime behavior stay aligned.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T13:15:19.186Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/run-cli.core.incidents.test.ts --timeout 120000 && bun x eslint packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/types.ts packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/commands/task/findings-add.command.ts packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/verify-ok.command.ts packages/agentplane/src/commands/task/verify-rework.command.ts packages/agentplane/src/commands/verify.run.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts && node .agentplane/policy/check-routing.mjs; Result: pass. Evidence: incidents tests passed, eslint clean, routing check OK. Scope: repo-fixable incident promotion and incidents policy/runtime alignment.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:11:17.106Z, excerpt_hash=sha256:b9f64d4eec78460d064482fc143529bba19b12d004d085ab526fb574c1c310b7

### 2026-04-09T14:21:26.323Z — VERIFY — ok

By: CODER

Note: Rebased onto main after 75VJ4R removed the shared wait-remote-checks blocker and reran targeted incidents and wait-remote coverage for internal finding promotion into incidents.md.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:15:19.193Z, excerpt_hash=sha256:b9f64d4eec78460d064482fc143529bba19b12d004d085ab526fb574c1c310b7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
