---
id: "202605040755-SM1KH2"
title: "Add launch-day copy artifacts"
result_summary: "DONE: docs/launch artifacts shipped in main."
status: "DONE"
priority: "high"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "launch"
verify:
  - "test -f docs/launch/hn.md && test -f docs/launch/twitter.md && test -f docs/launch/reddit.md && test -f docs/launch/checklist.md"
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T07:56:35.604Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T08:07:30.855Z"
  updated_by: "DOCS"
  note: "Launch artifacts landed under docs/launch with ACR-first copy and no Discord invite or badge."
commit:
  hash: "30cc08324ed2c2ecbf8707e2dfaa5255096cfe57"
  message: "Merge pull request #892 from basilisk-labs/task/202605040755-KF1EWC/launch-punch-list"
comments:
  -
    author: "DOCS"
    body: "Start: creating launch-day copy artifacts under docs/launch without Discord scope, using ACR-first positioning and explicit off-repo confirmation slots."
  -
    author: "DOCS"
    body: "Verified: launch-day copy artifacts shipped via PR #892 and are present on main."
events:
  -
    type: "status"
    at: "2026-05-04T07:57:16.224Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: creating launch-day copy artifacts under docs/launch without Discord scope, using ACR-first positioning and explicit off-repo confirmation slots."
  -
    type: "verify"
    at: "2026-05-04T08:07:30.855Z"
    author: "DOCS"
    state: "ok"
    note: "Launch artifacts landed under docs/launch with ACR-first copy and no Discord invite or badge."
  -
    type: "status"
    at: "2026-05-04T20:53:55.205Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: launch-day copy artifacts shipped via PR #892 and are present on main."
doc_version: 3
doc_updated_at: "2026-05-04T20:53:55.205Z"
doc_updated_by: "DOCS"
description: "Create HN, Twitter/X, Reddit, and launch checklist artifacts under docs/launch with ACR-first launch copy and explicit off-repo confirmation slots."
sections:
  Summary: |-
    Add launch-day copy artifacts
    
    Create HN, Twitter/X, Reddit, and launch checklist artifacts under docs/launch with ACR-first launch copy and explicit off-repo confirmation slots.
  Scope: |-
    - In scope: Create HN, Twitter/X, Reddit, and launch checklist artifacts under docs/launch with ACR-first launch copy and explicit off-repo confirmation slots.
    - Out of scope: unrelated refactors not required for "Add launch-day copy artifacts".
  Plan: "Create docs/launch/hn.md, docs/launch/twitter.md, docs/launch/reddit.md, and docs/launch/checklist.md. Copy must lead with ACRs for coding agents, reference the committed demo GIF, and keep off-repo confirmations explicit instead of pretending they are complete. Verify files exist and contain launch-ready copy without Discord scope."
  Verify Steps: |-
    1. test -f docs/launch/hn.md && test -f docs/launch/twitter.md && test -f docs/launch/reddit.md && test -f docs/launch/checklist.md passes.
    2. rg -n 'Discord|discord.gg|discord' docs/launch returns no launch invite/badge scope.
    3. rg -n 'Agent Change Record|ACR|agentplane-demo.gif' docs/launch confirms ACR-first copy and demo references.
    4. node .agentplane/policy/check-routing.mjs passes.
    5. agentplane doctor passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T08:07:30.855Z — VERIFY — ok
    
    By: DOCS
    
    Note: Launch artifacts landed under docs/launch with ACR-first copy and no Discord invite or badge.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T08:01:53.924Z, excerpt_hash=sha256:9852ec7e5ed67fbf44b1ba31e77c6eecff1dbfcf3b99d9d7a55c09a5a7448239
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands: test -f docs/launch/hn.md && test -f docs/launch/twitter.md && test -f docs/launch/reddit.md && test -f docs/launch/checklist.md passed; rg -n 'Agent Change Record|ACR|agentplane-demo.gif' docs/launch found expected launch copy references; rg -n 'discord.gg|shields.io/discord' README.md packages/agentplane/README.md website/src docs/launch website/static/llms.txt returned no matches.
      Impact: T33 and T37 repo-scoped launch copy/checklist are ready; T36 remains intentionally excluded.
      Resolution: Discord scope deferred until a real server id and invite exist.
id_source: "generated"
---
## Summary

Add launch-day copy artifacts

Create HN, Twitter/X, Reddit, and launch checklist artifacts under docs/launch with ACR-first launch copy and explicit off-repo confirmation slots.

## Scope

- In scope: Create HN, Twitter/X, Reddit, and launch checklist artifacts under docs/launch with ACR-first launch copy and explicit off-repo confirmation slots.
- Out of scope: unrelated refactors not required for "Add launch-day copy artifacts".

## Plan

Create docs/launch/hn.md, docs/launch/twitter.md, docs/launch/reddit.md, and docs/launch/checklist.md. Copy must lead with ACRs for coding agents, reference the committed demo GIF, and keep off-repo confirmations explicit instead of pretending they are complete. Verify files exist and contain launch-ready copy without Discord scope.

## Verify Steps

1. test -f docs/launch/hn.md && test -f docs/launch/twitter.md && test -f docs/launch/reddit.md && test -f docs/launch/checklist.md passes.
2. rg -n 'Discord|discord.gg|discord' docs/launch returns no launch invite/badge scope.
3. rg -n 'Agent Change Record|ACR|agentplane-demo.gif' docs/launch confirms ACR-first copy and demo references.
4. node .agentplane/policy/check-routing.mjs passes.
5. agentplane doctor passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T08:07:30.855Z — VERIFY — ok

By: DOCS

Note: Launch artifacts landed under docs/launch with ACR-first copy and no Discord invite or badge.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T08:01:53.924Z, excerpt_hash=sha256:9852ec7e5ed67fbf44b1ba31e77c6eecff1dbfcf3b99d9d7a55c09a5a7448239

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands: test -f docs/launch/hn.md && test -f docs/launch/twitter.md && test -f docs/launch/reddit.md && test -f docs/launch/checklist.md passed; rg -n 'Agent Change Record|ACR|agentplane-demo.gif' docs/launch found expected launch copy references; rg -n 'discord.gg|shields.io/discord' README.md packages/agentplane/README.md website/src docs/launch website/static/llms.txt returned no matches.
  Impact: T33 and T37 repo-scoped launch copy/checklist are ready; T36 remains intentionally excluded.
  Resolution: Discord scope deferred until a real server id and invite exist.
