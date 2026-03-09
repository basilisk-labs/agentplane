---
id: "202603091337-6WRTM4"
title: "Lock README messaging contract for GitHub acquisition surface"
result_summary: "Locked the README messaging contract so the rewrite can optimize acquisition and activation without drifting away from the current release truth."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
  - "positioning"
  - "readme"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T13:38:18.806Z"
  updated_by: "ORCHESTRATOR"
  note: "README rewrite batch approved with user-provided positioning and section-order constraints."
verification:
  state: "ok"
  updated_at: "2026-03-09T13:38:59.466Z"
  updated_by: "REVIEWER"
  note: "Command: inspect task README messaging brief; Result: pass; Evidence: the task docs now contain one category sentence, one simple value statement, target reader, anti-positioning, section order, and proof points. Scope: internal README positioning contract. Command: compare brief against README.md, docs/user/overview.mdx, docs/user/workflow.mdx, docs/user/commands.mdx, and website/CONTENT.md; Result: pass; Evidence: every mandatory claim in the brief is grounded in current repository sources and no hosted-runtime or assistant-platform drift was introduced. Scope: truth-check for the rewrite contract. Command: inspect git status and touched files; Result: pass; Evidence: only the task README changed, so the task stayed planning-only and did not mutate README.md or package docs. Scope: scope discipline for the planning batch."
commit:
  hash: "5223323b68953a631f48ffd5eafc28bc4664404e"
  message: "✅ G2YW52 close: Narrowed release:ci-check by extracting release-smoke, excluding the broad init-upgrade... (202603091258-G2YW52) [code,release]"
comments:
  -
    author: "DOCS"
    body: "Start: locking the README messaging contract before any rewrite so the first screen, proof points, and anti-positioning stay release-true and conversion-oriented."
  -
    author: "DOCS"
    body: "Verified: the task docs now lock the category phrase, simple value statement, anti-positioning, section order, and proof points that the README rewrite must preserve."
events:
  -
    type: "status"
    at: "2026-03-09T13:38:23.247Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: locking the README messaging contract before any rewrite so the first screen, proof points, and anti-positioning stay release-true and conversion-oriented."
  -
    type: "verify"
    at: "2026-03-09T13:38:59.466Z"
    author: "REVIEWER"
    state: "ok"
    note: "Command: inspect task README messaging brief; Result: pass; Evidence: the task docs now contain one category sentence, one simple value statement, target reader, anti-positioning, section order, and proof points. Scope: internal README positioning contract. Command: compare brief against README.md, docs/user/overview.mdx, docs/user/workflow.mdx, docs/user/commands.mdx, and website/CONTENT.md; Result: pass; Evidence: every mandatory claim in the brief is grounded in current repository sources and no hosted-runtime or assistant-platform drift was introduced. Scope: truth-check for the rewrite contract. Command: inspect git status and touched files; Result: pass; Evidence: only the task README changed, so the task stayed planning-only and did not mutate README.md or package docs. Scope: scope discipline for the planning batch."
  -
    type: "status"
    at: "2026-03-09T13:39:07.453Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: the task docs now lock the category phrase, simple value statement, anti-positioning, section order, and proof points that the README rewrite must preserve."
doc_version: 3
doc_updated_at: "2026-03-09T13:39:07.453Z"
doc_updated_by: "DOCS"
description: "Define the messaging contract for the root README rewrite before editing the file: category phrase, simple value statement, target reader, anti-positioning, top-level section order, and required proof points grounded in the current repo/docs."
id_source: "generated"
---
## Summary

Lock README messaging contract for GitHub acquisition surface

Define the messaging contract for the root README rewrite before editing the file: category phrase, simple value statement, target reader, anti-positioning, top-level section order, and required proof points grounded in the current repo/docs.

## Scope

- In scope: Define the messaging contract for the root README rewrite before editing the file: category phrase, simple value statement, target reader, anti-positioning, top-level section order, and required proof points grounded in the current repo/docs.
- Out of scope: unrelated refactors not required for "Lock README messaging contract for GitHub acquisition surface".

## Plan

Messaging contract: category=Git-native control plane for auditable agent work; human value=Put coding agents on a governed Git workflow; target reader=GitHub visitor evaluating local CLI workflow for governed agent development; anti-positioning=no hosted platform, no generic AI coding assistant, no prompt framework, no company OS; top sections=product one-liner, what it is, why teams use it, what appears in repo, quickstart, workflow modes, task flow, when to use, docs links, contributing/license; proof points=local CLI, repo-native artifacts, approvals/task state/verification/closure, direct and branch_pr modes, visible AGENTS.md/CLAUDE.md and .agentplane state.

## Verify Steps

1. Check that the brief contains one category sentence, one simple value sentence, the target reader, anti-positioning, and a top-level section outline. Expected: every required messaging element is explicitly present in the task docs.
2. Compare the brief against README.md, docs/user/overview.mdx, docs/user/workflow.mdx, docs/user/commands.mdx, and website/CONTENT.md. Expected: all proof points and claims are grounded in current repository sources.
3. Confirm the brief does not rewrite README.md or drift into website/package README changes. Expected: the task remains planning-only and leaves a stable contract for the rewrite tasks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T13:38:59.466Z — VERIFY — ok

By: REVIEWER

Note: Command: inspect task README messaging brief; Result: pass; Evidence: the task docs now contain one category sentence, one simple value statement, target reader, anti-positioning, section order, and proof points. Scope: internal README positioning contract. Command: compare brief against README.md, docs/user/overview.mdx, docs/user/workflow.mdx, docs/user/commands.mdx, and website/CONTENT.md; Result: pass; Evidence: every mandatory claim in the brief is grounded in current repository sources and no hosted-runtime or assistant-platform drift was introduced. Scope: truth-check for the rewrite contract. Command: inspect git status and touched files; Result: pass; Evidence: only the task README changed, so the task stayed planning-only and did not mutate README.md or package docs. Scope: scope discipline for the planning batch.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T13:38:36.037Z, excerpt_hash=sha256:bacb9a4766ce2425e25436e5c7c837db4e47aa290cc65643877b75fd430548d9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Category: AgentPlane is a Git-native control plane for auditable agent work.
- Human value statement: Put coding agents on a governed Git workflow.
- Target reader: a GitHub visitor evaluating whether a local, repo-native CLI can make agent-driven development trustworthy and practical for a real team or product repository.
- Anti-positioning: do not frame AgentPlane as a hosted platform, an autonomous company OS, a generic AI coding assistant, or a prompt framework; do not lead with roles, harness doctrine, or internal taxonomy.
- First-screen obligations: explain what AgentPlane is, where it runs, why teams trust it, what appears in the repository, and how to reach first value quickly.
- Top-level README order: product one-liner; what AgentPlane is; why teams use it; what appears in your repository; 2-minute quickstart; workflow modes; typical task flow; when to use / when not to use; documentation links; contributing and license.
- Proof points that must appear: local CLI inside a git repository; repo-native artifacts like AGENTS.md or CLAUDE.md and .agentplane/; explicit approvals, task state, verification, and closure; visible direct and branch_pr workflow modes; no hosted runtime or hidden execution layer.
- Writing rule: use simple product language in the top half and push internal doctrine below the fold or out to docs.
