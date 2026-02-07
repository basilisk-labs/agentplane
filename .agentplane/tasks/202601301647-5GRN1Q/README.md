---
id: "202601301647-5GRN1Q"
title: "Deepen recipes docs and troubleshooting"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
  - "recipes"
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
  hash: "73b06a7728e47bae58c94eb7dd0072ca880bfa69"
  message: "202601301647-5GRN1Q docs: add recipe examples and troubleshooting-by-symptom nav"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: add recipes examples and troubleshooting-by-symptom doc."
  -
    author: "ORCHESTRATOR"
    body: "verified: expanded recipes docs with examples, added troubleshooting-by-symptom page, and updated docs navigation."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:34.214Z"
doc_updated_by: "agentplane"
description: "Expand recipes docs with examples and add troubleshooting-by-symptom page."
---
## Summary

- Expand recipes docs with concrete examples.\n- Add troubleshooting-by-symptom page and link it in navigation.

## Scope

- Extend docs/recipes-how-it-works.mdx and docs/recipes-spec.mdx with examples.\n- Create a troubleshooting-by-symptom doc and update docs.json/index.

## Risks

- Examples may diverge from current CLI behavior if not kept updated.\n- Troubleshooting page could become too long without careful structure.

## Verify Steps

- Review examples for accuracy.\n- Check docs/docs.json includes the new troubleshooting page.

## Rollback Plan

- Revert docs changes and navigation updates.

## Notes

- Added examples to recipes how-it-works and spec.\n- Linked troubleshooting-by-symptom in docs index and navigation.

## Plan


## Verification
