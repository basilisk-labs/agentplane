---
id: "202601131643-VXPBHQ"
title: "Revise comment-driven commit emoji and formatting rules"
status: "DONE"
priority: "normal"
owner: "REDMINE"
depends_on: []
tags:
  - "git"
  - "workflow"
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
  hash: "8fd29a0da544ca8b96eb9326d418863e3963a0bf"
  message: "✨ VXPBHQ infer emojis for intermediate comment commits; format comment bodies into summary/details; document rules"
comments:
  -
    author: "REDMINE"
    body: "Verified: mark task done; commit emoji inference and comment formatting updates; docs updated; tests not run."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:48.496Z"
doc_updated_by: "agentplane"
description: "Define fixed emojis for start/finish status commits, choose intermediate emojis based on comment intent, and improve commit message formatting/detail in the agentctl workflow."
id_source: "custom"
dirty: false
---
## Summary

Update comment-driven commit subject building to use fixed start/finish emojis, semantic emoji inference for intermediate commits, and structured formatting of the comment body.

## Context

Comment-driven commits currently reuse the raw comment body and only cover a narrow set of emojis; the request is to formalize start/finish icons and infer intermediate emojis from intent.

## Scope

Adjust commit message derivation and emoji selection in agentctl, then update agentctl.md with the new rules and examples.

## Risks

Emoji inference may pick an unexpected icon for ambiguous wording; keep the explicit --commit-emoji override available and document the heuristics.

## Verify Steps

Manual: stage a dummy file and run start/block/finish with --commit-from-comment to confirm emoji selection and formatted subjects; verify guard commit checks still pass.

## Rollback Plan

Revert the agentctl commit(s) that adjust emoji selection/formatting to restore prior comment-driven commit behavior.

## Notes

Document the emoji inference rules and examples in agentctl.md alongside the comment-driven commit guidance.

## Plan


## Verification
