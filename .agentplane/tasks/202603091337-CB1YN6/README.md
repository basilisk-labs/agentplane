---
id: "202603091337-CB1YN6"
title: "Truth-check and polish rewritten root README"
result_summary: "Reviewed and polished the rewritten README for truthfulness, command/path validity, naming discipline, and top-half readability."
status: "DONE"
priority: "high"
owner: "REVIEWER"
depends_on:
  - "202603091337-NA4B75"
  - "202603091337-0AMCMM"
  - "202603091337-M5G8NX"
tags:
  - "review"
  - "docs"
  - "readme"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T13:47:46.734Z"
  updated_by: "ORCHESTRATOR"
  note: "Final README review approved: truth-check, naming discipline, and minimal polish only."
verification:
  state: "ok"
  updated_at: "2026-03-09T13:49:58.137Z"
  updated_by: "REVIEWER"
  note: "Command: review the top 150 lines of README.md; Result: pass; Evidence: the category is legible on the first screen, the top half reads as a GitHub product surface, and internal doctrine no longer leads the file. Scope: acquisition readability. Command: verify referenced docs paths and repository files; Result: pass; Evidence: overview, setup, commands, configuration, backends, architecture, release-and-publishing, and CONTRIBUTING paths all exist in the current repo. Scope: path and link truthfulness. Command: review naming and truth defects; Result: pass; Evidence: AgentPlane vs agentplane usage is consistent, hosted-platform framing is absent, the exported task snapshot is now described as optional, and quickstart no longer hides the conditional plan-approval gate. Scope: final README truth-check."
commit:
  hash: "bdcddff9e6e96e2c0ed3f848287bd954071647c7"
  message: "📝 CB1YN6 readme: polish truth and quickstart details"
comments:
  -
    author: "REVIEWER"
    body: "Start: reviewing the rewritten README for truth defects, command/path drift, and remaining framework-speak before finalizing the batch."
  -
    author: "REVIEWER"
    body: "Verified: the rewritten root README now reads as a GitHub acquisition and activation surface, and the final review removed the remaining truth drift around optional task snapshots and conditional plan approval."
events:
  -
    type: "status"
    at: "2026-03-09T13:47:47.569Z"
    author: "REVIEWER"
    from: "TODO"
    to: "DOING"
    note: "Start: reviewing the rewritten README for truth defects, command/path drift, and remaining framework-speak before finalizing the batch."
  -
    type: "verify"
    at: "2026-03-09T13:49:41.501Z"
    author: "REVIEWER"
    state: "ok"
    note: "Command: review the top 150 lines of README.md; Result: pass; Evidence: the category is legible on the first screen, the top half reads as a GitHub product surface, and internal doctrine no longer leads the file. Scope: acquisition readability. Command: verify referenced docs paths and repository files; Result: pass; Evidence: overview, setup, commands, configuration, backends, architecture, release-and-publishing, and CONTRIBUTING paths all exist in the current repo. Scope: path and link truthfulness. Command: review naming and truth defects; Result: pass; Evidence: AgentPlane vs agentplane usage is consistent, hosted-platform framing is absent,  is now described as optional, and quickstart no longer hides the conditional plan-approval gate. Scope: final README truth-check."
  -
    type: "verify"
    at: "2026-03-09T13:49:58.137Z"
    author: "REVIEWER"
    state: "ok"
    note: "Command: review the top 150 lines of README.md; Result: pass; Evidence: the category is legible on the first screen, the top half reads as a GitHub product surface, and internal doctrine no longer leads the file. Scope: acquisition readability. Command: verify referenced docs paths and repository files; Result: pass; Evidence: overview, setup, commands, configuration, backends, architecture, release-and-publishing, and CONTRIBUTING paths all exist in the current repo. Scope: path and link truthfulness. Command: review naming and truth defects; Result: pass; Evidence: AgentPlane vs agentplane usage is consistent, hosted-platform framing is absent, the exported task snapshot is now described as optional, and quickstart no longer hides the conditional plan-approval gate. Scope: final README truth-check."
  -
    type: "status"
    at: "2026-03-09T13:50:07.517Z"
    author: "REVIEWER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the rewritten root README now reads as a GitHub acquisition and activation surface, and the final review removed the remaining truth drift around optional task snapshots and conditional plan approval."
doc_version: 3
doc_updated_at: "2026-03-09T13:50:07.517Z"
doc_updated_by: "REVIEWER"
description: "Review the rewritten README for unsupported claims, naming drift, invalid commands or paths, internal jargon overload, readability, and trust defects before considering the batch complete."
id_source: "generated"
---
## Summary

Truth-check and polish rewritten root README

Review the rewritten README for unsupported claims, naming drift, invalid commands or paths, internal jargon overload, readability, and trust defects before considering the batch complete.

## Scope

- In scope: Review the rewritten README for unsupported claims, naming drift, invalid commands or paths, internal jargon overload, readability, and trust defects before considering the batch complete.
- Out of scope: unrelated refactors not required for "Truth-check and polish rewritten root README".

## Plan

1. Read the top 150 lines of README.md as a GitHub visitor and check category clarity, naming consistency, section order, and jargon load.
2. Verify every README command and repo path against current docs/user pages and the visible repository layout.
3. Apply only the smallest necessary corrections, then record explicit review findings before closing the batch.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T13:49:41.501Z — VERIFY — ok

By: REVIEWER

Note: Command: review the top 150 lines of README.md; Result: pass; Evidence: the category is legible on the first screen, the top half reads as a GitHub product surface, and internal doctrine no longer leads the file. Scope: acquisition readability. Command: verify referenced docs paths and repository files; Result: pass; Evidence: overview, setup, commands, configuration, backends, architecture, release-and-publishing, and CONTRIBUTING paths all exist in the current repo. Scope: path and link truthfulness. Command: review naming and truth defects; Result: pass; Evidence: AgentPlane vs agentplane usage is consistent, hosted-platform framing is absent,  is now described as optional, and quickstart no longer hides the conditional plan-approval gate. Scope: final README truth-check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T13:49:09.126Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

#### 2026-03-09T13:49:58.137Z — VERIFY — ok

By: REVIEWER

Note: Command: review the top 150 lines of README.md; Result: pass; Evidence: the category is legible on the first screen, the top half reads as a GitHub product surface, and internal doctrine no longer leads the file. Scope: acquisition readability. Command: verify referenced docs paths and repository files; Result: pass; Evidence: overview, setup, commands, configuration, backends, architecture, release-and-publishing, and CONTRIBUTING paths all exist in the current repo. Scope: path and link truthfulness. Command: review naming and truth defects; Result: pass; Evidence: AgentPlane vs agentplane usage is consistent, hosted-platform framing is absent, the exported task snapshot is now described as optional, and quickstart no longer hides the conditional plan-approval gate. Scope: final README truth-check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T13:49:41.503Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: the first rewrite still over-claimed `.agentplane/tasks.json` as if it were always created directly by init.
  Impact: this weakened trust because the README blurred the line between core workflow artifacts and an optional exported snapshot.
  Resolution: changed the repo-artifacts section to say the repository typically includes these files and marked `tasks.json` as an optional exported snapshot.
  Promotion: none
- Observation: the quickstart path assumed plan approval was never required before `task start-ready`.
  Impact: this made the happy path cleaner but hid a real repo-level gate that some users will hit immediately.
  Resolution: added one explicit conditional sentence for `agentplane task plan approve <task-id> --by ORCHESTRATOR` before `task start-ready`.
  Promotion: none
