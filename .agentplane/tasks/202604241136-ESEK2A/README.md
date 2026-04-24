---
id: "202604241136-ESEK2A"
title: "v0.3 freeze B1: migrate remaining legacy prompts to Clack adapter"
result_summary: "B1 migrated non-init prompt consumers to generic Clack-backed adapter names."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "init"
  - "v0.3"
verify:
  - "rg -n 'promptChoice|promptYesNo|promptInput' packages/agentplane/src"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T11:48:18.553Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from v0.3 freeze graph; B1 limited to non-init prompt consumers, with init route preserved for B2."
verification:
  state: "ok"
  updated_at: "2026-04-24T11:49:50.125Z"
  updated_by: "CODER"
  note: "Command: rg -n 'promptChoice|promptYesNo|promptInput' packages/agentplane/src --glob '!*.test.ts' | Result: pass; non-init production consumers moved off legacy names, remaining matches are cli/prompts compatibility aliases, init v1 orchestrate, and recipe overlay promptInputs variable false positive. Command: bun run test -- runtime/approvals, shared approvals/network, workflow, cli/prompts focused files | Result: pass; 5 files, 47 tests. Command: bun run typecheck | Result: pass. Command: git diff --check | Result: pass."
commit:
  hash: "6bb77d710c8a235fbebc5aff113e0d9f26f167d3"
  message: "✨ ESEK2A cli: route non-init prompts through adapter names"
comments:
  -
    author: "CODER"
    body: "Start: Implement B1 only by moving non-init prompt consumers to generic Clack-backed adapter names, leaving init v1/v2 routing untouched for B2."
  -
    author: "CODER"
    body: "Verified: B1 moved non-init prompt consumers to generic Clack-backed adapter names, preserved init v1 compatibility aliases for B2, passed focused prompt/approval/workflow tests, typecheck, and refreshed repo-local runtime."
events:
  -
    type: "status"
    at: "2026-04-24T11:48:26.157Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement B1 only by moving non-init prompt consumers to generic Clack-backed adapter names, leaving init v1/v2 routing untouched for B2."
  -
    type: "verify"
    at: "2026-04-24T11:49:50.125Z"
    author: "CODER"
    state: "ok"
    note: "Command: rg -n 'promptChoice|promptYesNo|promptInput' packages/agentplane/src --glob '!*.test.ts' | Result: pass; non-init production consumers moved off legacy names, remaining matches are cli/prompts compatibility aliases, init v1 orchestrate, and recipe overlay promptInputs variable false positive. Command: bun run test -- runtime/approvals, shared approvals/network, workflow, cli/prompts focused files | Result: pass; 5 files, 47 tests. Command: bun run typecheck | Result: pass. Command: git diff --check | Result: pass."
  -
    type: "status"
    at: "2026-04-24T11:50:36.746Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: B1 moved non-init prompt consumers to generic Clack-backed adapter names, preserved init v1 compatibility aliases for B2, passed focused prompt/approval/workflow tests, typecheck, and refreshed repo-local runtime."
doc_version: 3
doc_updated_at: "2026-04-24T11:50:36.747Z"
doc_updated_by: "CODER"
description: "Move the remaining promptChoice/promptYesNo/promptInput callsites onto the Clack-backed prompt abstraction so init no longer keeps the legacy UI stack alive."
sections:
  Summary: |-
    v0.3 freeze B1: migrate remaining legacy prompts to Clack adapter
    
    Move the remaining promptChoice/promptYesNo/promptInput callsites onto the Clack-backed prompt abstraction so init no longer keeps the legacy UI stack alive.
  Scope: |-
    - In scope: Move the remaining promptChoice/promptYesNo/promptInput callsites onto the Clack-backed prompt abstraction so init no longer keeps the legacy UI stack alive.
    - Out of scope: unrelated refactors not required for "v0.3 freeze B1: migrate remaining legacy prompts to Clack adapter".
  Plan: |-
    1. Keep init v1/v2 routing untouched; B1 only covers non-init consumers of legacy prompt helper names.
    2. Add generic Clack-backed prompt adapter exports in packages/agentplane/src/cli/prompts.ts while retaining promptChoice/promptYesNo/promptInput for init v1 compatibility until B2.
    3. Move runtime approvals and shared git base-branch prompting to the generic adapter names.
    4. Update affected non-init tests to spy on the generic adapter names.
    5. Verify production grep leaves legacy prompt names only in cli/prompts.ts and init/orchestrate.ts, then run focused tests.
  Verify Steps: |-
    1. Run `rg -n 'promptChoice|promptYesNo|promptInput' packages/agentplane/src --glob '!*.test.ts'`. Expected: production matches remain only in `packages/agentplane/src/cli/prompts.ts` and init v1 `packages/agentplane/src/cli/run-cli/commands/init/orchestrate.ts`; overlay `promptInputs` variable is a documented false positive if still matched.
    2. Run focused tests for non-init prompt consumers: `bun run test -- packages/agentplane/src/runtime/approvals/runtime.test.ts packages/agentplane/src/commands/shared/network-approval.test.ts packages/agentplane/src/commands/shared/approval-requirements.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/prompts.test.ts`. Expected: pass.
    3. Run `bun run typecheck`. Expected: pass.
    4. Run `git diff --check`. Expected: no whitespace errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T11:49:50.125Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: rg -n 'promptChoice|promptYesNo|promptInput' packages/agentplane/src --glob '!*.test.ts' | Result: pass; non-init production consumers moved off legacy names, remaining matches are cli/prompts compatibility aliases, init v1 orchestrate, and recipe overlay promptInputs variable false positive. Command: bun run test -- runtime/approvals, shared approvals/network, workflow, cli/prompts focused files | Result: pass; 5 files, 47 tests. Command: bun run typecheck | Result: pass. Command: git diff --check | Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T11:48:26.167Z, excerpt_hash=sha256:cc57743c4607c8fb8bac1bf0817a0f97782950479a743a9387fca5786529523a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

v0.3 freeze B1: migrate remaining legacy prompts to Clack adapter

Move the remaining promptChoice/promptYesNo/promptInput callsites onto the Clack-backed prompt abstraction so init no longer keeps the legacy UI stack alive.

## Scope

- In scope: Move the remaining promptChoice/promptYesNo/promptInput callsites onto the Clack-backed prompt abstraction so init no longer keeps the legacy UI stack alive.
- Out of scope: unrelated refactors not required for "v0.3 freeze B1: migrate remaining legacy prompts to Clack adapter".

## Plan

1. Keep init v1/v2 routing untouched; B1 only covers non-init consumers of legacy prompt helper names.
2. Add generic Clack-backed prompt adapter exports in packages/agentplane/src/cli/prompts.ts while retaining promptChoice/promptYesNo/promptInput for init v1 compatibility until B2.
3. Move runtime approvals and shared git base-branch prompting to the generic adapter names.
4. Update affected non-init tests to spy on the generic adapter names.
5. Verify production grep leaves legacy prompt names only in cli/prompts.ts and init/orchestrate.ts, then run focused tests.

## Verify Steps

1. Run `rg -n 'promptChoice|promptYesNo|promptInput' packages/agentplane/src --glob '!*.test.ts'`. Expected: production matches remain only in `packages/agentplane/src/cli/prompts.ts` and init v1 `packages/agentplane/src/cli/run-cli/commands/init/orchestrate.ts`; overlay `promptInputs` variable is a documented false positive if still matched.
2. Run focused tests for non-init prompt consumers: `bun run test -- packages/agentplane/src/runtime/approvals/runtime.test.ts packages/agentplane/src/commands/shared/network-approval.test.ts packages/agentplane/src/commands/shared/approval-requirements.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/prompts.test.ts`. Expected: pass.
3. Run `bun run typecheck`. Expected: pass.
4. Run `git diff --check`. Expected: no whitespace errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T11:49:50.125Z — VERIFY — ok

By: CODER

Note: Command: rg -n 'promptChoice|promptYesNo|promptInput' packages/agentplane/src --glob '!*.test.ts' | Result: pass; non-init production consumers moved off legacy names, remaining matches are cli/prompts compatibility aliases, init v1 orchestrate, and recipe overlay promptInputs variable false positive. Command: bun run test -- runtime/approvals, shared approvals/network, workflow, cli/prompts focused files | Result: pass; 5 files, 47 tests. Command: bun run typecheck | Result: pass. Command: git diff --check | Result: pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T11:48:26.167Z, excerpt_hash=sha256:cc57743c4607c8fb8bac1bf0817a0f97782950479a743a9387fca5786529523a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
