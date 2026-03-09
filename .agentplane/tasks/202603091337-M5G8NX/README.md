---
id: "202603091337-M5G8NX"
title: "Simplify README quickstart and first-win path"
result_summary: "Simplified the README quickstart into a believable first-win path with a clearer direct-versus-branch_pr handoff."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on:
  - "202603091337-0AMCMM"
tags:
  - "docs"
  - "readme"
  - "quickstart"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T13:45:23.645Z"
  updated_by: "ORCHESTRATOR"
  note: "Quickstart/first-win refinement approved after the IA rewrite."
verification:
  state: "ok"
  updated_at: "2026-03-09T13:46:44.336Z"
  updated_by: "REVIEWER"
  note: "Command: compare the quickstart commands against docs/user/commands.mdx and docs/user/workflow.mdx; Result: pass; Evidence: install, init, quickstart, task new, task plan set, task start-ready, task verify-show, verify, finish, and workflow_mode config set all match the current release language. Scope: command truthfulness. Command: inspect every path named in the quickstart explanation; Result: pass; Evidence: AGENTS.md or CLAUDE.md, .agentplane/config.json, .agentplane/WORKFLOW.md, and task storage paths are present in current docs and workflow behavior. Scope: artifact truthfulness. Command: read only the quickstart and workflow-modes sections; Result: pass; Evidence: the path now reads as install -> init -> first task loop -> optional branch_pr switch without requiring the rest of the README. Scope: first-win readability."
commit:
  hash: "937445b0432d9511c86b48fd53d3670241e4288b"
  message: "📝 M5G8NX readme: tighten quickstart path"
comments:
  -
    author: "DOCS"
    body: "Start: shortening the README quickstart into a clearer install-init-first-task path while keeping commands and mode descriptions release-true."
  -
    author: "DOCS"
    body: "Verified: the quickstart now shows a shorter install-init-first-task path, explains what init creates, and keeps branch_pr as an explicit mode choice instead of a hidden concept."
events:
  -
    type: "status"
    at: "2026-03-09T13:45:24.414Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: shortening the README quickstart into a clearer install-init-first-task path while keeping commands and mode descriptions release-true."
  -
    type: "verify"
    at: "2026-03-09T13:46:44.336Z"
    author: "REVIEWER"
    state: "ok"
    note: "Command: compare the quickstart commands against docs/user/commands.mdx and docs/user/workflow.mdx; Result: pass; Evidence: install, init, quickstart, task new, task plan set, task start-ready, task verify-show, verify, finish, and workflow_mode config set all match the current release language. Scope: command truthfulness. Command: inspect every path named in the quickstart explanation; Result: pass; Evidence: AGENTS.md or CLAUDE.md, .agentplane/config.json, .agentplane/WORKFLOW.md, and task storage paths are present in current docs and workflow behavior. Scope: artifact truthfulness. Command: read only the quickstart and workflow-modes sections; Result: pass; Evidence: the path now reads as install -> init -> first task loop -> optional branch_pr switch without requiring the rest of the README. Scope: first-win readability."
  -
    type: "status"
    at: "2026-03-09T13:46:51.061Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: the quickstart now shows a shorter install-init-first-task path, explains what init creates, and keeps branch_pr as an explicit mode choice instead of a hidden concept."
doc_version: 3
doc_updated_at: "2026-03-09T13:46:51.061Z"
doc_updated_by: "DOCS"
description: "Rewrite the README quickstart around install, init, what init creates, and a believable first task flow, while keeping direct and branch_pr understandable without turning the README into reference docs."
id_source: "generated"
---
## Summary

Simplify README quickstart and first-win path

Rewrite the README quickstart around install, init, what init creates, and a believable first task flow, while keeping direct and branch_pr understandable without turning the README into reference docs.

## Scope

- In scope: Rewrite the README quickstart around install, init, what init creates, and a believable first task flow, while keeping direct and branch_pr understandable without turning the README into reference docs.
- Out of scope: unrelated refactors not required for "Simplify README quickstart and first-win path".

## Plan

1. Tighten the README quickstart so the install, init, and first value path read like a believable startup sequence instead of a long command dump.
2. Explain what init creates and why it matters, then show a minimal direct-mode task flow with only the commands needed to make the lifecycle legible.
3. Clarify how branch_pr differs at a high level without expanding the README into workflow reference docs, then re-check every command and path against current docs.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T13:46:44.336Z — VERIFY — ok

By: REVIEWER

Note: Command: compare the quickstart commands against docs/user/commands.mdx and docs/user/workflow.mdx; Result: pass; Evidence: install, init, quickstart, task new, task plan set, task start-ready, task verify-show, verify, finish, and workflow_mode config set all match the current release language. Scope: command truthfulness. Command: inspect every path named in the quickstart explanation; Result: pass; Evidence: AGENTS.md or CLAUDE.md, .agentplane/config.json, .agentplane/WORKFLOW.md, and task storage paths are present in current docs and workflow behavior. Scope: artifact truthfulness. Command: read only the quickstart and workflow-modes sections; Result: pass; Evidence: the path now reads as install -> init -> first task loop -> optional branch_pr switch without requiring the rest of the README. Scope: first-win readability.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T13:45:24.414Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
