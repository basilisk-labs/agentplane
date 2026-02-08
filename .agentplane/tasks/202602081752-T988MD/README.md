---
id: "202602081752-T988MD"
title: "Policy: update AGENTS.md to prod-v1.1"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T17:53:13.607Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved by user (2026-02-08)"
verification:
  state: "ok"
  updated_at: "2026-02-08T17:58:12.190Z"
  updated_by: "ORCHESTRATOR"
  note: "Applied prod-v1.1 policy patch to root and template"
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: applying v1.1 policy patch to root and template AGENTS.md; will format with Prettier and commit."
events:
  -
    type: "status"
    at: "2026-02-08T17:53:13.912Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: applying v1.1 policy patch to root and template AGENTS.md; will format with Prettier and commit."
  -
    type: "verify"
    at: "2026-02-08T17:58:12.190Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Applied prod-v1.1 policy patch to root and template"
doc_version: 2
doc_updated_at: "2026-02-08T17:58:12.192Z"
doc_updated_by: "ORCHESTRATOR"
description: "Apply Agentplane Policy v1.1 patch to root AGENTS.md and packages/agentplane/assets/AGENTS.md: add definitions/override protocol/drift policy, clarify approvals, and update CLI invocation guidance."
id_source: "generated"
---
## Summary

Update the repository agent policy to prod-v1.1 by applying the provided patch to `AGENTS.md` and `packages/agentplane/assets/AGENTS.md`.

## Scope

In scope:
- `AGENTS.md`
- `packages/agentplane/assets/AGENTS.md`

Out of scope:
- Changing CLI behavior or task system behavior.
- Editing task exports manually.

## Plan

Apply Agentplane Policy v1.1 patch to AGENTS.md and packages/agentplane/assets/AGENTS.md; run Prettier; commit and export.

## Risks

- Large policy diffs can create merge conflicts if other policy edits land concurrently.
- Pre-commit hooks enforce Prettier; ensure formatting passes before commit.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T17:58:12.190Z — VERIFY — ok

By: ORCHESTRATOR

Note: Applied prod-v1.1 policy patch to root and template

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T17:53:13.912Z, excerpt_hash=sha256:1c65f7b5be410555da7bd7f645ca770f80ce2e664dbe0ef6df9c331b5137b048

Details:

Updated AGENTS.md and packages/agentplane/assets/AGENTS.md to prod-v1.1: definitions, approval gates, override protocol, traceability tasks, drift policy, config changes. Prettier check passed.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commits from this task to restore the previous policy files.

## Verify Steps

Pass criteria:
- Both policy files declare `AGENTS_POLICY: prod-v1.1`.
- Both policy files include: Definitions, Approval gates, Override Protocol, Drift Policy.
- `bunx prettier AGENTS.md packages/agentplane/assets/AGENTS.md --check` passes.

Checks to run:
- `rg -n "AGENTS_POLICY: prod-v1.1" AGENTS.md packages/agentplane/assets/AGENTS.md`
- `rg -n "OVERRIDE PROTOCOL" AGENTS.md packages/agentplane/assets/AGENTS.md`
- `rg -n "DRIFT POLICY" AGENTS.md packages/agentplane/assets/AGENTS.md`
- `bunx prettier AGENTS.md packages/agentplane/assets/AGENTS.md --check`
