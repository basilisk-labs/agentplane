---
id: "202602121122-BYNKSW"
title: "Release v0.2.21 patch"
result_summary: "v0.2.21 released and published"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "meta"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-12T11:40:32.007Z"
  updated_by: "CODER"
  note: "Verified: release apply created and pushed v0.2.21 (8db5db1f), publish workflow 21945050983 succeeded, npm shows @agentplaneorg/core@0.2.21 and agentplane@0.2.21."
commit:
  hash: "8db5db1f336fcb9d3a57fb7f80a57dde9e1adb20"
  message: "✨ release: v0.2.21"
comments:
  -
    author: "CODER"
    body: "Start: prepare and publish patch release v0.2.21 with full prepublish gating and push tag."
  -
    author: "CODER"
    body: "Verified: release commit/tag pushed, GitHub publish workflow passed, and npm package visibility confirmed for both packages."
events:
  -
    type: "status"
    at: "2026-02-12T11:22:10.053Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare and publish patch release v0.2.21 with full prepublish gating and push tag."
  -
    type: "verify"
    at: "2026-02-12T11:40:32.007Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release apply created and pushed v0.2.21 (8db5db1f), publish workflow 21945050983 succeeded, npm shows @agentplaneorg/core@0.2.21 and agentplane@0.2.21."
  -
    type: "status"
    at: "2026-02-12T11:40:32.190Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release commit/tag pushed, GitHub publish workflow passed, and npm package visibility confirmed for both packages."
doc_version: 2
doc_updated_at: "2026-02-12T11:40:32.190Z"
doc_updated_by: "CODER"
description: "Prepare release notes, run prepublish gate, apply patch release and push commit+tag to trigger GitHub publish workflow."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Generate release plan and write docs/releases/v0.2.21.md from plan inputs.\n2. Run bun run release:prepublish and resolve failures if any.\n3. Apply release via agentplane release apply --push --yes.\n4. Verify pushed tag and provide workflow follow-up checks.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-12T11:40:32.007Z — VERIFY — ok

By: CODER

Note: Verified: release apply created and pushed v0.2.21 (8db5db1f), publish workflow 21945050983 succeeded, npm shows @agentplaneorg/core@0.2.21 and agentplane@0.2.21.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T11:22:10.053Z, excerpt_hash=sha256:9ed563d8765685b87c8e9d4e97bea7df7541e75812b039dfed16bcfd535adcae

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. bun run release:prepublish
2. node packages/agentplane/bin/agentplane.js release apply --push --yes
3. git tag --list 'v0.2.21' and git ls-remote --tags origin v0.2.21
