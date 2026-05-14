---
id: "202605141803-2551ZF"
title: "Refresh blog editorial surface"
result_summary: "Merged via PR #3748."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T18:03:43.708Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T18:31:28.189Z"
  updated_by: "DOCS"
  note: "Verified blog editorial refresh. Checks passed: node .agentplane/policy/check-routing.mjs, bun run docs:site:typecheck, bun run docs:site:build, git diff --check, Humanizer anti-AI scan on new/rewritten essays, and title-order audit confirming newest-first archive."
  attempts: 0
commit:
  hash: "4e9f34cd72e59f7b653bd19de287822c2e7521ff"
  message: "Merge pull request #3748 from basilisk-labs/task/202605141803-2551ZF/blog-editorial-refresh"
comments:
  -
    author: "DOCS"
    body: "Start: refreshing the public blog surface, rewriting the context article with Humanizer guidance, adding Blueprints and Recipes feature essays, and preserving editorial artifacts in agentplane-marketing."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3748 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-14T18:04:36.296Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: refreshing the public blog surface, rewriting the context article with Humanizer guidance, adding Blueprints and Recipes feature essays, and preserving editorial artifacts in agentplane-marketing."
  -
    type: "verify"
    at: "2026-05-14T18:31:28.189Z"
    author: "DOCS"
    state: "ok"
    note: "Verified blog editorial refresh. Checks passed: node .agentplane/policy/check-routing.mjs, bun run docs:site:typecheck, bun run docs:site:build, git diff --check, Humanizer anti-AI scan on new/rewritten essays, and title-order audit confirming newest-first archive."
  -
    type: "status"
    at: "2026-05-14T19:02:29.420Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3748 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-14T19:02:29.426Z"
doc_updated_by: "INTEGRATOR"
description: "Make newest blog posts appear first, normalize blog titles, rewrite the 0.6 context article with Humanizer guidance, and add humanized feature articles for Blueprints and Recipes."
sections:
  Summary: |-
    Refresh blog editorial surface
    
    Make newest blog posts appear first, normalize blog titles, rewrite the 0.6 context article with Humanizer guidance, and add humanized feature articles for Blueprints and Recipes.
  Scope: |-
    - In scope: Make newest blog posts appear first, normalize blog titles, rewrite the 0.6 context article with Humanizer guidance, and add humanized feature articles for Blueprints and Recipes.
    - Out of scope: unrelated refactors not required for "Refresh blog editorial surface".
  Plan: "1. Update the custom Docusaurus blog landing page to sort newest-first and adjust labels. 2. Audit existing blog titles and normalize public titles toward a consistent product/editorial style. 3. Rewrite the 0.6 LLM Wiki/context article using Humanizer guidance: more narrative prose, fewer lists, no press-release texture. 4. Add two new narrative articles about Blueprints and Recipes that emphasize qualitative workflow changes rather than version numbers. 5. Run formatting, site checks, and policy checks; record verification."
  Verify Steps: |-
    - Run node .agentplane/policy/check-routing.mjs.
    - Run bun run docs:site:typecheck.
    - Run bun run docs:site:build.
    - Run git diff --check.
    - Confirm blog landing sorts newest first and article titles are consistent.
    - Confirm 0.6, Blueprints, and Recipes articles pass a Humanizer editorial pass: narrative prose, fewer lists, no obvious AI vocabulary or template structure.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T18:31:28.189Z — VERIFY — ok
    
    By: DOCS
    
    Note: Verified blog editorial refresh. Checks passed: node .agentplane/policy/check-routing.mjs, bun run docs:site:typecheck, bun run docs:site:build, git diff --check, Humanizer anti-AI scan on new/rewritten essays, and title-order audit confirming newest-first archive.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T18:04:36.296Z, excerpt_hash=sha256:7f98612ed604e1820a47085d5173fd43c865a744ccfb45e81da349babac0eafd
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141803-2551ZF-blog-editorial-refresh/.agentplane/tasks/202605141803-2551ZF/blueprint/resolved-snapshot.json
    - old_digest: 3ad6e984094b6fdc784393c028cc55e265f8f35931028f412ea947dab70a0797
    - current_digest: 3ad6e984094b6fdc784393c028cc55e265f8f35931028f412ea947dab70a0797
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141803-2551ZF
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refresh blog editorial surface

Make newest blog posts appear first, normalize blog titles, rewrite the 0.6 context article with Humanizer guidance, and add humanized feature articles for Blueprints and Recipes.

## Scope

- In scope: Make newest blog posts appear first, normalize blog titles, rewrite the 0.6 context article with Humanizer guidance, and add humanized feature articles for Blueprints and Recipes.
- Out of scope: unrelated refactors not required for "Refresh blog editorial surface".

## Plan

1. Update the custom Docusaurus blog landing page to sort newest-first and adjust labels. 2. Audit existing blog titles and normalize public titles toward a consistent product/editorial style. 3. Rewrite the 0.6 LLM Wiki/context article using Humanizer guidance: more narrative prose, fewer lists, no press-release texture. 4. Add two new narrative articles about Blueprints and Recipes that emphasize qualitative workflow changes rather than version numbers. 5. Run formatting, site checks, and policy checks; record verification.

## Verify Steps

- Run node .agentplane/policy/check-routing.mjs.
- Run bun run docs:site:typecheck.
- Run bun run docs:site:build.
- Run git diff --check.
- Confirm blog landing sorts newest first and article titles are consistent.
- Confirm 0.6, Blueprints, and Recipes articles pass a Humanizer editorial pass: narrative prose, fewer lists, no obvious AI vocabulary or template structure.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T18:31:28.189Z — VERIFY — ok

By: DOCS

Note: Verified blog editorial refresh. Checks passed: node .agentplane/policy/check-routing.mjs, bun run docs:site:typecheck, bun run docs:site:build, git diff --check, Humanizer anti-AI scan on new/rewritten essays, and title-order audit confirming newest-first archive.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T18:04:36.296Z, excerpt_hash=sha256:7f98612ed604e1820a47085d5173fd43c865a744ccfb45e81da349babac0eafd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141803-2551ZF-blog-editorial-refresh/.agentplane/tasks/202605141803-2551ZF/blueprint/resolved-snapshot.json
- old_digest: 3ad6e984094b6fdc784393c028cc55e265f8f35931028f412ea947dab70a0797
- current_digest: 3ad6e984094b6fdc784393c028cc55e265f8f35931028f412ea947dab70a0797
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141803-2551ZF

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
