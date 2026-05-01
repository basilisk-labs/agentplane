---
id: "202605011618-D5MGX8"
title: "Refine listing wording for repo-local coding-agent work"
result_summary: "Merged via PR #698."
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
  updated_at: "2026-05-01T16:19:17.413Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T16:21:04.383Z"
  updated_by: "DOCS"
  note: "Listing wording corrected and external PRs updated."
commit:
  hash: "9071ca8111c2fd86c9c11b8ad27ecb29e2415add"
  message: "Merge pull request #698 from basilisk-labs/task/202605011618-D5MGX8/refine-listing-wording"
comments:
  -
    author: "DOCS"
    body: "Start: refine listing submission wording to remove product-name enumeration and record the external PR corrections."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #698 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T16:19:51.000Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: refine listing submission wording to remove product-name enumeration and record the external PR corrections."
  -
    type: "verify"
    at: "2026-05-01T16:21:04.383Z"
    author: "DOCS"
    state: "ok"
    note: "Listing wording corrected and external PRs updated."
  -
    type: "status"
    at: "2026-05-01T16:27:46.352Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #698 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T16:27:46.358Z"
doc_updated_by: "INTEGRATOR"
description: "Replace listing submission snippets that enumerate Claude Code, Codex, Cursor, and Aider with a source-grounded neutral phrase about repo-local coding-agent work before continuing external listing PRs."
sections:
  Summary: |-
    Refine listing wording for repo-local coding-agent work
    
    Replace listing submission snippets that enumerate Claude Code, Codex, Cursor, and Aider with a source-grounded neutral phrase about repo-local coding-agent work before continuing external listing PRs.
  Scope: |-
    - In scope: Replace listing submission snippets that enumerate Claude Code, Codex, Cursor, and Aider with a source-grounded neutral phrase about repo-local coding-agent work before continuing external listing PRs.
    - Out of scope: unrelated refactors not required for "Refine listing wording for repo-local coding-agent work".
  Plan: |-
    1. Confirm the current source for the brand-list wording in README/docs recipes and mark the external-listing risk.
    2. Update docs/listing.md so future snippets use a neutral repo-local coding-agent-work phrase instead of enumerating Claude Code, Codex, Cursor, and Aider.
    3. Verify the listing document no longer contains the unsupported submission phrase and record the already-applied external PR corrections.
  Verify Steps: |-
    1. Confirm README/docs contain product-specific recipes but listing copy should avoid implying official integrations.
    2. Confirm docs/listing.md no longer uses the phrase 'Claude Code, Codex, Cursor, Aider' in submission snippets or PR template text.
    3. Confirm bradAGI PR #71 body and README diff use 'repo-local coding-agent work'.
    4. Confirm Picrew PR #4 body uses 'repo-local coding-agent work'.
    5. Run git diff --check for the AgentPlane docs change.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T16:21:04.383Z — VERIFY — ok
    
    By: DOCS
    
    Note: Listing wording corrected and external PRs updated.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T16:19:51.000Z, excerpt_hash=sha256:38a0cd57e74c424092c0e9d8cb1e3b5c900c91ccb6237bc50821c954ec729176
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Source check: README.md and docs/recipes include product-specific examples, including docs/recipes/aider.mdx, but listing submission copy should avoid implying official/product-specific integrations. Updated docs/listing.md snippets and PR template to use repo-local coding-agent work. Updated bradAGI PR #71 README diff and body; updated Picrew PR #4 body. Verified no escaped newline issue in PR bodies and no product enumeration remains in docs/listing.md snippets.
      Impact: Future listing submissions use a more defensible category description and avoid fragile claims around named tools.
      Resolution: Use 'repo-local coding-agent work' unless a target list explicitly asks for concrete examples.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Refine listing wording for repo-local coding-agent work

Replace listing submission snippets that enumerate Claude Code, Codex, Cursor, and Aider with a source-grounded neutral phrase about repo-local coding-agent work before continuing external listing PRs.

## Scope

- In scope: Replace listing submission snippets that enumerate Claude Code, Codex, Cursor, and Aider with a source-grounded neutral phrase about repo-local coding-agent work before continuing external listing PRs.
- Out of scope: unrelated refactors not required for "Refine listing wording for repo-local coding-agent work".

## Plan

1. Confirm the current source for the brand-list wording in README/docs recipes and mark the external-listing risk.
2. Update docs/listing.md so future snippets use a neutral repo-local coding-agent-work phrase instead of enumerating Claude Code, Codex, Cursor, and Aider.
3. Verify the listing document no longer contains the unsupported submission phrase and record the already-applied external PR corrections.

## Verify Steps

1. Confirm README/docs contain product-specific recipes but listing copy should avoid implying official integrations.
2. Confirm docs/listing.md no longer uses the phrase 'Claude Code, Codex, Cursor, Aider' in submission snippets or PR template text.
3. Confirm bradAGI PR #71 body and README diff use 'repo-local coding-agent work'.
4. Confirm Picrew PR #4 body uses 'repo-local coding-agent work'.
5. Run git diff --check for the AgentPlane docs change.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T16:21:04.383Z — VERIFY — ok

By: DOCS

Note: Listing wording corrected and external PRs updated.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T16:19:51.000Z, excerpt_hash=sha256:38a0cd57e74c424092c0e9d8cb1e3b5c900c91ccb6237bc50821c954ec729176

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Source check: README.md and docs/recipes include product-specific examples, including docs/recipes/aider.mdx, but listing submission copy should avoid implying official/product-specific integrations. Updated docs/listing.md snippets and PR template to use repo-local coding-agent work. Updated bradAGI PR #71 README diff and body; updated Picrew PR #4 body. Verified no escaped newline issue in PR bodies and no product enumeration remains in docs/listing.md snippets.
  Impact: Future listing submissions use a more defensible category description and avoid fragile claims around named tools.
  Resolution: Use 'repo-local coding-agent work' unless a target list explicitly asks for concrete examples.
  Promotion: incident-candidate
  Fixability: external
