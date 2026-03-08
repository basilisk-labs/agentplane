---
id: "202603081006-5MRPTV"
title: "Sync policy, docs, and agent prompts to README v3 contract"
result_summary: "README v3 language synced across policy, docs, and agent prompts."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on:
  - "202603081006-BVYTKB"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T10:14:26.735Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved the sync batch after the canonical README v3 contract was recorded."
verification:
  state: "ok"
  updated_at: "2026-03-08T10:16:47.926Z"
  updated_by: "DOCS"
  note: "Synced policy/assets, runtime mirrors, user docs, and agent prompts to the version-aware README v3 contract; agents:check, routing, doctor, and website build passed."
commit:
  hash: "ba3bd6c59a89ec49c1395c969a7662d819967a94"
  message: "📝 5MRPTV task: sync README v3 language surfaces"
comments:
  -
    author: "DOCS"
    body: "Start: sync policy, docs, and agent prompts to the canonical README v3 contract without changing task runtime templates yet."
  -
    author: "DOCS"
    body: "Verified: policy, docs, and agent prompt surfaces now describe the version-aware README v3 contract and Findings boundary consistently."
events:
  -
    type: "status"
    at: "2026-03-08T10:14:32.272Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: sync policy, docs, and agent prompts to the canonical README v3 contract without changing task runtime templates yet."
  -
    type: "verify"
    at: "2026-03-08T10:16:47.926Z"
    author: "DOCS"
    state: "ok"
    note: "Synced policy/assets, runtime mirrors, user docs, and agent prompts to the version-aware README v3 contract; agents:check, routing, doctor, and website build passed."
  -
    type: "status"
    at: "2026-03-08T10:17:41.508Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: policy, docs, and agent prompt surfaces now describe the version-aware README v3 contract and Findings boundary consistently."
doc_version: 2
doc_updated_at: "2026-03-08T10:17:41.508Z"
doc_updated_by: "DOCS"
description: "Update policy modules, user docs, and agent prompt assets to speak the new README v3 language, replacing Notes with Findings and clarifying Verify Steps semantics."
id_source: "generated"
---
## Summary

Sync policy, docs, and agent prompts to README v3 contract

Update policy modules, user docs, and agent prompt assets to speak the new README v3 language, replacing Notes with Findings and clarifying Verify Steps semantics.

## Scope

- In scope: Update policy modules, user docs, and agent prompt assets to speak the new README v3 language, replacing Notes with Findings and clarifying Verify Steps semantics..
- Out of scope: unrelated refactors not required for "Sync policy, docs, and agent prompts to README v3 contract".

## Plan

1. Implement the change for "Sync policy, docs, and agent prompts to README v3 contract".
2. Run required checks and capture verification evidence.
3. Finalize task notes and finish with traceable commit metadata.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

1. Review the touched policy, docs, and agent prompt surfaces. Expected: they consistently use Findings as the task-local section and keep incidents as curated policy memory.
2. Run template and routing checks after syncing packaged assets into .agentplane mirrors. Expected: agent/policy sync and routing checks pass.
3. Build the docs site. Expected: documentation changes compile without errors.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T10:16:47.926Z — VERIFY — ok

By: DOCS

Note: Synced policy/assets, runtime mirrors, user docs, and agent prompts to the version-aware README v3 contract; agents:check, routing, doctor, and website build passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T10:14:32.272Z, excerpt_hash=sha256:04168bbc3d7006a154d61313632dfb08838a3ff7e8297c775a870477be65e001

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
