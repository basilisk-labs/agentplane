---
id: "202601130533-NFT0GX"
title: "Guard status commit policy"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags:
  - "agentctl"
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
  hash: "2d71622384eaef83a3e4180c474c8f8b80f3aa2b"
  message: "✨ NFT0GX Verified: status_commit_policy guardrails + confirm flag; docs/config updates; check: unittest run (temp test removed)."
comments:
  -
    author: "CODER"
    body: "Start: add status_commit_policy enforcement and unit tests for comment-driven commits."
  -
    author: "CODER"
    body: "Verified: status_commit_policy guardrails + confirm flag; docs/config updates; check: unittest run (temp test removed)."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:41.843Z"
doc_updated_by: "agentplane"
description: "Add status_commit_policy guardrails for comment-driven commits and cover enforcement with unit tests."
---
## Summary

Add status_commit_policy guardrails for comment-driven commits and cover enforcement with unit tests.

## Context

Clarify when status/comment-driven commits should be allowed so agents can update status without implicit commits.

## Scope

- Add status_commit_policy config and enforcement for comment-driven commits.\n- Add unit tests for warn/confirm/invalid policy handling.\n- Update agentctl docs to describe the policy and confirmation flag.

## Risks

Policy warnings may be overlooked in noisy output; confirm mode blocks without explicit ack.

## Verify Steps

None (no automated tests shipped).

## Rollback Plan

Revert the commit and remove status_commit_policy from config plus the enforcement hooks in agentctl.

## Notes

Ran a temporary unittest for status_commit_policy enforcement before removing the test file per request.

## Plan


## Verification
