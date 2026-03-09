---
id: "202603091337-0AMCMM"
title: "Rebuild README structure around user job and repo artifacts"
result_summary: "Rebuilt the root README around user value, repo artifacts, workflow modes, and task flow instead of internal ontology."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on:
  - "202603091337-NA4B75"
tags:
  - "docs"
  - "readme"
  - "ux-writing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T13:42:35.073Z"
  updated_by: "ORCHESTRATOR"
  note: "README structure rewrite approved with user-value-first section order."
verification:
  state: "ok"
  updated_at: "2026-03-09T13:44:12.767Z"
  updated_by: "REVIEWER"
  note: "Command: inspect the full README section order after the rewrite; Result: pass; Evidence: the file now flows through what it is, why teams use it, repo artifacts, quickstart, workflow modes, task flow, fit, docs, contributing, and license. Scope: README information architecture. Command: inspect the repo-artifacts section; Result: pass; Evidence: the README now explains AGENTS.md or CLAUDE.md, .agentplane/, task records, WORKFLOW.md, and tasks.json as visible repository state. Scope: repository-surface clarity. Command: inspect the top half for internal doctrine; Result: pass; Evidence: role taxonomy and harness engineering no longer dominate the top half and are pushed into docs links instead. Scope: acquisition-surface readability."
commit:
  hash: "9ce840fc394a1907e89ea78ee51c1b1951616c2f"
  message: "📝 0AMCMM readme: restructure around user value"
comments:
  -
    author: "DOCS"
    body: "Start: restructuring the root README around product value, repo artifacts, workflow modes, and task flow while pushing internal doctrine below the fold."
  -
    author: "DOCS"
    body: "Verified: the README now follows a user-value-first order, explains visible repository artifacts, and moves internal doctrine out of the top half."
events:
  -
    type: "status"
    at: "2026-03-09T13:42:35.477Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: restructuring the root README around product value, repo artifacts, workflow modes, and task flow while pushing internal doctrine below the fold."
  -
    type: "verify"
    at: "2026-03-09T13:44:12.767Z"
    author: "REVIEWER"
    state: "ok"
    note: "Command: inspect the full README section order after the rewrite; Result: pass; Evidence: the file now flows through what it is, why teams use it, repo artifacts, quickstart, workflow modes, task flow, fit, docs, contributing, and license. Scope: README information architecture. Command: inspect the repo-artifacts section; Result: pass; Evidence: the README now explains AGENTS.md or CLAUDE.md, .agentplane/, task records, WORKFLOW.md, and tasks.json as visible repository state. Scope: repository-surface clarity. Command: inspect the top half for internal doctrine; Result: pass; Evidence: role taxonomy and harness engineering no longer dominate the top half and are pushed into docs links instead. Scope: acquisition-surface readability."
  -
    type: "status"
    at: "2026-03-09T13:44:23.911Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: the README now follows a user-value-first order, explains visible repository artifacts, and moves internal doctrine out of the top half."
doc_version: 3
doc_updated_at: "2026-03-09T13:44:23.911Z"
doc_updated_by: "DOCS"
description: "Restructure the root README around product value, visible repo artifacts, workflow modes, and user jobs instead of internal ontology, while keeping roles and harness language below the fold."
id_source: "generated"
---
## Summary

Rebuild README structure around user job and repo artifacts

Restructure the root README around product value, visible repo artifacts, workflow modes, and user jobs instead of internal ontology, while keeping roles and harness language below the fold.

## Scope

- In scope: Restructure the root README around product value, visible repo artifacts, workflow modes, and user jobs instead of internal ontology, while keeping roles and harness language below the fold.
- Out of scope: unrelated refactors not required for "Rebuild README structure around user job and repo artifacts".

## Plan

1. Rewrite the body of README.md around the user-value section order approved in the messaging contract: what it is, why teams use it, what appears in the repo, workflow modes, task flow, and support links.
2. Remove or compress framework-first doctrine from the top half, including role taxonomy and harness-engineering language, while preserving truthful references lower in the file if still useful.
3. Re-read the resulting README as a GitHub product surface and confirm that repo artifacts, direct and branch_pr modes, and the daily lifecycle are legible without turning the file into full reference docs.

## Verify Steps

1. Confirm the README section order follows the user-value flow: what it is, why teams use it, repo artifacts, quickstart, workflow modes, task flow, fit, docs, contributing, and license. Expected: the top half reads like a GitHub acquisition surface instead of internal doctrine.
2. Check that the README explains visible repo artifacts such as AGENTS.md or CLAUDE.md, .agentplane/, task records, and workflow state. Expected: a new user can tell what appears in the repository and why it matters.
3. Check that roles and harness engineering no longer dominate the top half. Expected: any remaining internal doctrine is compressed or pushed lower in the file.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T13:44:12.767Z — VERIFY — ok

By: REVIEWER

Note: Command: inspect the full README section order after the rewrite; Result: pass; Evidence: the file now flows through what it is, why teams use it, repo artifacts, quickstart, workflow modes, task flow, fit, docs, contributing, and license. Scope: README information architecture. Command: inspect the repo-artifacts section; Result: pass; Evidence: the README now explains AGENTS.md or CLAUDE.md, .agentplane/, task records, WORKFLOW.md, and tasks.json as visible repository state. Scope: repository-surface clarity. Command: inspect the top half for internal doctrine; Result: pass; Evidence: role taxonomy and harness engineering no longer dominate the top half and are pushed into docs links instead. Scope: acquisition-surface readability.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T13:42:35.477Z, excerpt_hash=sha256:4a0849ca1c7b61549ed90d9e08e39cb42b04020f704b6eedbd2052de55dfced4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
