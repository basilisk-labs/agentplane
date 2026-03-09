---
id: "202603091356-XR4275"
title: "Restructure package README around install-first user flow"
result_summary: "Restructured packages/agentplane/README.md into an install-first npm surface with clearer user value, repo artifacts, quickstart, workflow modes, and public docs links."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on:
  - "202603091356-T123A9"
tags:
  - "docs"
  - "readme"
  - "package"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T14:03:54.414Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T14:06:47.657Z"
  updated_by: "REVIEWER"
  note: |-
    Command: sed -n 1,260p packages/agentplane/README.md; Result: pass; Evidence: top half now leads with category, value, repo artifacts, and install-first flow before reference material; Scope: packages/agentplane/README.md; Links: https://agentplane.org/docs/user/overview, https://agentplane.org/docs/user/setup, https://agentplane.org/docs/user/workflow.
    Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: docs-only README rewrite routing contract; Links: .agentplane/policy/check-routing.mjs.
    Command: agentplane doctor; Result: pass; Evidence: errors=0 warnings=0 with informational runtime/archive output only; Scope: repo health after package README rewrite; Links: packages/agentplane/README.md.
commit:
  hash: "6d7fdd5bad007167f43ead123c3fbf25e67e8e24"
  message: "📝 XR4275 package-readme: restructure install-first flow"
comments:
  -
    author: "DOCS"
    body: "Start: Rebuilding the package README around the npm install path, visible repo artifacts, workflow modes, and the first-run user journey without internal doctrine dominating the page."
  -
    author: "DOCS"
    body: "Verified: Rebuilt the package README around the npm install path, visible repo artifacts, workflow modes, and an install-first first-run surface while removing legacy framework-first section ordering."
events:
  -
    type: "status"
    at: "2026-03-09T14:03:14.313Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Rebuilding the package README around the npm install path, visible repo artifacts, workflow modes, and the first-run user journey without internal doctrine dominating the page."
  -
    type: "verify"
    at: "2026-03-09T14:06:47.657Z"
    author: "REVIEWER"
    state: "ok"
    note: |-
      Command: sed -n 1,260p packages/agentplane/README.md; Result: pass; Evidence: top half now leads with category, value, repo artifacts, and install-first flow before reference material; Scope: packages/agentplane/README.md; Links: https://agentplane.org/docs/user/overview, https://agentplane.org/docs/user/setup, https://agentplane.org/docs/user/workflow.
      Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: docs-only README rewrite routing contract; Links: .agentplane/policy/check-routing.mjs.
      Command: agentplane doctor; Result: pass; Evidence: errors=0 warnings=0 with informational runtime/archive output only; Scope: repo health after package README rewrite; Links: packages/agentplane/README.md.
  -
    type: "status"
    at: "2026-03-09T14:06:53.584Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: Rebuilt the package README around the npm install path, visible repo artifacts, workflow modes, and an install-first first-run surface while removing legacy framework-first section ordering."
doc_version: 3
doc_updated_at: "2026-03-09T14:06:53.584Z"
doc_updated_by: "DOCS"
description: "Rebuild packages/agentplane/README.md around user value, what gets installed, quickstart, workflow modes, and documentation links instead of framework-first language and internal taxonomy."
id_source: "generated"
---
## Summary

Restructure package README around install-first user flow

Rebuild packages/agentplane/README.md around user value, what gets installed, quickstart, workflow modes, and documentation links instead of framework-first language and internal taxonomy.

## Scope

- In scope: Rebuild packages/agentplane/README.md around user value, what gets installed, quickstart, workflow modes, and documentation links instead of framework-first language and internal taxonomy.
- Out of scope: unrelated refactors not required for "Restructure package README around install-first user flow".

## Plan

1. Rewrite the package README section order around npm-user value: what it is, why teams use it, what gets installed, install/quickstart, workflow modes, task flow, fit, docs, and support.
2. Replace GitHub-source links with stable public docs or canonical repo links where npm readers actually need them, and compress or remove internal taxonomy that does not help acquisition.
3. Re-read the full package README as an npm surface and confirm that the top half explains the product before reference material or role language.

## Verify Steps

1. Read the top half of packages/agentplane/README.md. Expected: it explains what agentplane is, why teams use it, what appears in the repo, and the npm-first path before reference material.
2. Check every command and path shown in packages/agentplane/README.md against current docs and repo state. Expected: no invalid commands, missing paths, or hosted-runtime claims remain.
3. Scan the full packages/agentplane/README.md as an npm package surface. Expected: workflow modes, repo artifacts, docs links, and support sections follow an install-first flow without role taxonomy dominating the page.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T14:06:47.657Z — VERIFY — ok

By: REVIEWER

Note: Command: sed -n 1,260p packages/agentplane/README.md; Result: pass; Evidence: top half now leads with category, value, repo artifacts, and install-first flow before reference material; Scope: packages/agentplane/README.md; Links: https://agentplane.org/docs/user/overview, https://agentplane.org/docs/user/setup, https://agentplane.org/docs/user/workflow.
Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: docs-only README rewrite routing contract; Links: .agentplane/policy/check-routing.mjs.
Command: agentplane doctor; Result: pass; Evidence: errors=0 warnings=0 with informational runtime/archive output only; Scope: repo health after package README rewrite; Links: packages/agentplane/README.md.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T14:03:46.766Z, excerpt_hash=sha256:2dcdbb43fd690bdf2224b8b8bc3592db73b9e646bc123c2d758337f8d0b100cc

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
