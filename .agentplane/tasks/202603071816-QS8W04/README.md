---
id: "202603071816-QS8W04"
title: "Rewrite blog posts using HUMANIZER guidance"
result_summary: "Rewrote every public blog post and the blog index copy to remove obvious AI-writing patterns while preserving the existing structure and factual content."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T18:16:25.146Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: rewrite the public blog posts with the HUMANIZER guidance, keep the facts intact, keep the current blog structure, verify locally, and republish before moving to A2MHWZ."
verification:
  state: "ok"
  updated_at: "2026-03-07T18:28:46.839Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified locally: bun run --cwd website build; node scripts/check-design-language.mjs; node .agentplane/policy/check-routing.mjs. Humanized rewrites landed in the five public posts and the blog index copy."
commit:
  hash: "cea89c4973402c1280d7bc88ebceb75f7031fc2c"
  message: "✍️ QS8W04 task: humanize public blog copy"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: audit each current public blog post against HUMANIZER.md, rewrite the copy to remove obvious AI-writing patterns while preserving the factual content, verify the site build, and republish before switching to runtime diagnostics."
  -
    author: "DOCS"
    body: "Verified: all public posts were rewritten using HUMANIZER.md guidance, the facts stayed intact, and the public blog surface now reads more like a person wrote it."
events:
  -
    type: "status"
    at: "2026-03-07T18:16:34.588Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: audit each current public blog post against HUMANIZER.md, rewrite the copy to remove obvious AI-writing patterns while preserving the factual content, verify the site build, and republish before switching to runtime diagnostics."
  -
    type: "verify"
    at: "2026-03-07T18:28:46.839Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Verified locally: bun run --cwd website build; node scripts/check-design-language.mjs; node .agentplane/policy/check-routing.mjs. Humanized rewrites landed in the five public posts and the blog index copy."
  -
    type: "status"
    at: "2026-03-07T18:28:47.116Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: all public posts were rewritten using HUMANIZER.md guidance, the facts stayed intact, and the public blog surface now reads more like a person wrote it."
doc_version: 2
doc_updated_at: "2026-03-07T18:28:47.116Z"
doc_updated_by: "DOCS"
description: "Rewrite the public blog posts in a less AI-sounding voice using the local HUMANIZER.md guidance, preserve meaning, and keep the published blog structure intact before moving on to runtime diagnostics."
id_source: "generated"
---
## Summary

Rewrite blog posts using HUMANIZER guidance

Rewrite the public blog posts in a less AI-sounding voice using the local HUMANIZER.md guidance, preserve meaning, and keep the published blog structure intact before moving on to runtime diagnostics.

## Scope

- In scope: Rewrite the public blog posts in a less AI-sounding voice using the local HUMANIZER.md guidance, preserve meaning, and keep the published blog structure intact before moving on to runtime diagnostics..
- Out of scope: unrelated refactors not required for "Rewrite blog posts using HUMANIZER guidance".

## Plan

1. Audit all current public blog posts against HUMANIZER.md and list the strongest AI-writing tells that remain. 2. Rewrite each post to keep the same factual meaning while removing promotional filler, vague significance framing, repetitive sentence rhythm, and other patterns called out in HUMANIZER.md. 3. Verify the blog index and site build still work, then commit, publish, and record the verification evidence.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T18:28:46.839Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified locally: bun run --cwd website build; node scripts/check-design-language.mjs; node .agentplane/policy/check-routing.mjs. Humanized rewrites landed in the five public posts and the blog index copy.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T18:16:34.588Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
