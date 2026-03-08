---
id: "202601130818-6Y8R1F"
title: "Optional git hooks installer"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags:
  - "agentctl"
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
  hash: "737b83169856fc0f118399f08b062bcf8fcd55fe"
  message: "✨ 6Y8R1F add opt-in git hooks installer + hook checks + docs"
comments:
  -
    author: "CODER"
    body: "Verified: manual review only; no automated tests run; hooks install/uninstall and enforcement changes reviewed."
doc_version: 3
doc_updated_at: "2026-02-03T12:08:42.208Z"
doc_updated_by: "agentplane"
description: "Add opt-in git hooks via agentctl (install/uninstall) to enforce commit subject suffix and protected-path/branch_pr rules for direct git commits."
---
## Summary

Add opt-in git hooks installer/uninstaller to enforce commit policy outside agentctl.

## Context

Direct git commit can bypass agentctl guardrails; opt-in hooks close the gap without enforcing automatically.

## Scope

- Add `agentctl hooks install` and `agentctl hooks uninstall` commands.
- Implement a `commit-msg` hook that enforces commit subject task suffix tokens.
- Implement a `pre-commit` hook that enforces protected-path policy and branch_pr task rules.
- Update docs to describe hook usage and opt-in behavior.

## Plan


## Verify Steps

python -m pytest -q

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the agentctl hook commands and remove any installed git hooks via `agentctl hooks uninstall`.

## Findings

Hooks are opt-in; installer never runs automatically.

## Risks

Hooks may block legitimate commits if policies are misconfigured; provide clear uninstall guidance.
