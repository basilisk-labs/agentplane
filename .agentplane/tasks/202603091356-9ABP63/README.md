---
id: "202603091356-9ABP63"
title: "Tighten package README quickstart and npm activation path"
result_summary: "Tightened the package README quickstart so npm users can see where to run agentplane, what init creates, and how to reach first value quickly."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on:
  - "202603091356-XR4275"
tags:
  - "docs"
  - "readme"
  - "quickstart"
  - "package"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T14:08:10.222Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T14:09:15.074Z"
  updated_by: "REVIEWER"
  note: |-
    Command: sed -n 30,140p packages/agentplane/README.md; Result: pass; Evidence: install and first-task sections now show repository context, what init creates, and a shorter first-win path; Scope: packages/agentplane/README.md; Links: https://agentplane.org/docs/user/setup, https://agentplane.org/docs/user/workflow.
    Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: docs-only quickstart tightening; Links: .agentplane/policy/check-routing.mjs.
    Command: agentplane doctor; Result: pass; Evidence: errors=0 warnings=0 with informational runtime/archive output only; Scope: repo health after quickstart rewrite; Links: packages/agentplane/README.md.
commit:
  hash: "9091f225d1f61971de7ac681002f3e98a34eca0f"
  message: "📝 9ABP63 package-readme: tighten npm activation path"
comments:
  -
    author: "DOCS"
    body: "Start: Tightening the npm activation path so the package README shows the shortest believable install, init, quickstart, and first-task flow while clearly explaining what init creates."
  -
    author: "DOCS"
    body: "Verified: Shortened the npm activation path, clarified repository context, and made init outputs and the first-win task flow explicit without turning the package README back into reference material."
events:
  -
    type: "status"
    at: "2026-03-09T14:08:17.502Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Tightening the npm activation path so the package README shows the shortest believable install, init, quickstart, and first-task flow while clearly explaining what init creates."
  -
    type: "verify"
    at: "2026-03-09T14:09:15.074Z"
    author: "REVIEWER"
    state: "ok"
    note: |-
      Command: sed -n 30,140p packages/agentplane/README.md; Result: pass; Evidence: install and first-task sections now show repository context, what init creates, and a shorter first-win path; Scope: packages/agentplane/README.md; Links: https://agentplane.org/docs/user/setup, https://agentplane.org/docs/user/workflow.
      Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: docs-only quickstart tightening; Links: .agentplane/policy/check-routing.mjs.
      Command: agentplane doctor; Result: pass; Evidence: errors=0 warnings=0 with informational runtime/archive output only; Scope: repo health after quickstart rewrite; Links: packages/agentplane/README.md.
  -
    type: "status"
    at: "2026-03-09T14:09:20.721Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: Shortened the npm activation path, clarified repository context, and made init outputs and the first-win task flow explicit without turning the package README back into reference material."
doc_version: 3
doc_updated_at: "2026-03-09T14:09:20.721Z"
doc_updated_by: "DOCS"
description: "Make packages/agentplane/README.md show a concise install-first startup path for npm users, including what init creates and the shortest believable first task flow, while staying faithful to the current release."
id_source: "generated"
---
## Summary

Tighten package README quickstart and npm activation path

Make packages/agentplane/README.md show a concise install-first startup path for npm users, including what init creates and the shortest believable first task flow, while staying faithful to the current release.

## Scope

- In scope: Make packages/agentplane/README.md show a concise install-first startup path for npm users, including what init creates and the shortest believable first task flow, while staying faithful to the current release.
- Out of scope: unrelated refactors not required for "Tighten package README quickstart and npm activation path".

## Plan

1. Tighten the install and first-run section so an npm user sees the shortest believable activation path: install, init, quickstart, and the repository context in which the CLI runs.
2. Rewrite the first task path so it explains what init creates and shows a concise first-win flow without drifting back into a reference-style command dump.
3. Re-read the package README as an npm package page and confirm the quickstart is shorter, clearer, and still truthful to the current release semantics.

## Verify Steps

1. Read the install and first-run sections of packages/agentplane/README.md. Expected: an npm user can see install, init, quickstart, and what init creates without reference-style detours.
2. Read the first task path in packages/agentplane/README.md. Expected: it shows a short believable activation flow with valid current commands and the plan-approval conditional stated accurately.
3. Check all mentioned paths and links in the revised quickstart area. Expected: every path exists in the current release contract or is created by init, and every docs link points to the public docs surface.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T14:09:15.074Z — VERIFY — ok

By: REVIEWER

Note: Command: sed -n 30,140p packages/agentplane/README.md; Result: pass; Evidence: install and first-task sections now show repository context, what init creates, and a shorter first-win path; Scope: packages/agentplane/README.md; Links: https://agentplane.org/docs/user/setup, https://agentplane.org/docs/user/workflow.
Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: docs-only quickstart tightening; Links: .agentplane/policy/check-routing.mjs.
Command: agentplane doctor; Result: pass; Evidence: errors=0 warnings=0 with informational runtime/archive output only; Scope: repo health after quickstart rewrite; Links: packages/agentplane/README.md.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T14:08:17.502Z, excerpt_hash=sha256:25d3ec4c90b65a4ef829c14dd583d3cf7f7d6dc313d314fd6d458e320ab5d07f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
