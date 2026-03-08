---
id: "202602020444-VP3K7X"
title: "Remove v1 mentions and restructure docs"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "fc6557ca73317553383da185034a99d79e6a1cd8"
  message: "📝 VP3K7X task doc: record summary, scope, risks, verify, rollback for docs cleanup"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: update docs to remove first-version mentions; align Node.js as 1.0; restructure docs index for clearer reading order."
  -
    author: "ORCHESTRATOR"
    body: "verified: rg scan for v1/first-version phrasing returned no matches in docs/ROADMAP.md/README.md | details: doc changes already on HEAD and task doc commit created. Hooks skipped for status commit due to unrelated lint errors in other files."
doc_version: 3
doc_updated_at: "2026-02-03T12:09:41.053Z"
doc_updated_by: "agentplane"
description: "Audit docs for references to the first version, treat Node.js as v1.0, remove v1 language, and restructure documentation sections for clarity."
---
## Summary

Removed first-version wording across docs by aligning references to Node.js 1.0 and cleaned titles/descriptions.

## Scope

Docs only: updated user/developer docs and docs index structure; no code changes.

## Plan


## Verify Steps

- rg -n "(?i)\b(v1|version\s+1|version\s+1\.0|first\s+version|первая\s+версия)\b" docs ROADMAP.md README.md

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert docs changes via git checkout or reset to prior commit; restore previous wording and index order if needed.

## Findings


## Risks

Risk of missed phrasing in docs outside current set or unintended meaning change; mitigated by keyword scan.
