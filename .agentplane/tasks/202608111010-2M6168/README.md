---
id: "202608111010-2M6168"
title: "Make task episode plans lossless and language-neutral"
result_summary: "Merged via PR #4821."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "ux"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:fast"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/runner/context/task-context.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-11T10:10:56.971Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
token_usage:
  agent_runs: 0
  input_tokens: null
  journal_digest: null
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "unavailable"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "supervisor_journal_missing"
  updated_at: "2026-08-11T10:32:32.799Z"
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "2221df170259486812cc20ed57e210482fc38378"
  message: "Merge pull request #4821 from basilisk-labs/task/202608111010-2M6168/make-task-episode-plans-lossless-and-language-ne"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: required task sections now use a language-neutral 64 KiB per-section ceiling with a separate aggregate budget; optional context remains compacted. Focused tests, typecheck, and test:fast pass."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4821 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-08-11T10:11:16.127Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-11T10:14:20.573Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: required task sections now use a language-neutral 64 KiB per-section ceiling with a separate aggregate budget; optional context remains compacted. Focused tests, typecheck, and test:fast pass."
    commit: "931302565dd84e0381e7d4b2cb827563c9eb525e"
  -
    type: "status"
    at: "2026-08-11T10:32:32.799Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4821 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
    commit: "2221df170259486812cc20ed57e210482fc38378"
doc_version: 3
doc_updated_at: "2026-08-11T10:32:32.810Z"
doc_updated_by: "INTEGRATOR"
description: "Prevent valid user-authored Plan sections from blocking task brief, next-action, or advance. Preserve the task-selected language, keep full Plan content authoritative, and compact only optional context without mutating lifecycle state."
sections:
  Summary: |-
    Make task episode plans lossless and language-neutral

    Prevent valid user-authored Plan sections from blocking task brief, next-action, or advance. Preserve the task-selected language, keep full Plan content authoritative, and compact only optional context without mutating lifecycle state.
  Scope: |-
    - In scope: Prevent valid user-authored Plan sections from blocking task brief, next-action, or advance. Preserve the task-selected language, keep full Plan content authoritative, and compact only optional context without mutating lifecycle state.
    - Out of scope: unrelated refactors not required for "Make task episode plans lossless and language-neutral".
  Plan: |-
    1. Raise the TaskEpisodeView required-section budget to a practical lossless ceiling without enforcing any language.
    2. Keep the complete Plan authoritative and fail clearly only when the documented ceiling is exceeded; compact optional context first.
    3. Add regression coverage for plans above the former 3072-byte boundary, including multilingual content and the existing CI task size.
    4. Verify focused tests, typecheck, and the fast suite; document any residual packet-size tradeoff.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun test packages/agentplane/src/runner/context/task-context.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run test:fast`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "4fb274243d45470a2c9bb23ae0c939206bacf326"
    version: 1
id_source: "generated"
---
## Summary

Make task episode plans lossless and language-neutral

Prevent valid user-authored Plan sections from blocking task brief, next-action, or advance. Preserve the task-selected language, keep full Plan content authoritative, and compact only optional context without mutating lifecycle state.

## Scope

- In scope: Prevent valid user-authored Plan sections from blocking task brief, next-action, or advance. Preserve the task-selected language, keep full Plan content authoritative, and compact only optional context without mutating lifecycle state.
- Out of scope: unrelated refactors not required for "Make task episode plans lossless and language-neutral".

## Plan

1. Raise the TaskEpisodeView required-section budget to a practical lossless ceiling without enforcing any language.
2. Keep the complete Plan authoritative and fail clearly only when the documented ceiling is exceeded; compact optional context first.
3. Add regression coverage for plans above the former 3072-byte boundary, including multilingual content and the existing CI task size.
4. Verify focused tests, typecheck, and the fast suite; document any residual packet-size tradeoff.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun test packages/agentplane/src/runner/context/task-context.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run test:fast`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

## Token Usage

- State: `unavailable`
- Completeness: `0/0` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `unavailable/agentplane`
- Journal digest: `unavailable`
- Unavailable reason: `supervisor_journal_missing`
- Updated at: `2026-08-11T10:32:32.799Z`
