---
id: "202604191643-F6DSFE"
title: "Add concise README CI badges"
result_summary: "Added README status badges for test:fast, coverage, release:parity, and knip roadmap tracking."
status: "DONE"
priority: "low"
owner: "PLANNER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "readme"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T14:04:37.875Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T14:05:51.115Z"
  updated_by: "PLANNER"
  note: "Command: rg -n 'Core CI|test:fast|coverage|release:parity|knip' README.md; Result: pass; Evidence: README contains badges for Core CI, test:fast, coverage, release:parity, and knip roadmap status. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with info-only runtime/archive findings. Command: bun run format:check; Result: pass; Evidence: Prettier reports all files formatted. Scope: README.md and task README."
commit:
  hash: "820b69d7864a532c305739f5c8e0260e1b4c1a78"
  message: "📝 F6DSFE docs: add README status badges"
comments:
  -
    author: "PLANNER"
    body: "Start: Adding README badges for current CI-backed test, coverage, and parity checks plus an explicit knip roadmap status without changing runtime code."
  -
    author: "PLANNER"
    body: "Verified: README now shows concise CI/status badges for Core CI-backed test, coverage, release parity checks, and the explicit knip roadmap status; docs checks passed."
events:
  -
    type: "status"
    at: "2026-04-20T14:04:43.976Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding README badges for current CI-backed test, coverage, and parity checks plus an explicit knip roadmap status without changing runtime code."
  -
    type: "verify"
    at: "2026-04-20T14:05:51.115Z"
    author: "PLANNER"
    state: "ok"
    note: "Command: rg -n 'Core CI|test:fast|coverage|release:parity|knip' README.md; Result: pass; Evidence: README contains badges for Core CI, test:fast, coverage, release:parity, and knip roadmap status. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with info-only runtime/archive findings. Command: bun run format:check; Result: pass; Evidence: Prettier reports all files formatted. Scope: README.md and task README."
  -
    type: "status"
    at: "2026-04-20T14:06:09.685Z"
    author: "PLANNER"
    from: "DOING"
    to: "DONE"
    note: "Verified: README now shows concise CI/status badges for Core CI-backed test, coverage, release parity checks, and the explicit knip roadmap status; docs checks passed."
doc_version: 3
doc_updated_at: "2026-04-20T14:06:09.686Z"
doc_updated_by: "PLANNER"
description: "Epic G′. Add badges for fast tests, coverage, parity, and knip status to README.md."
sections:
  Summary: |-
    Add concise README CI badges
    
    Epic G′. Add badges for fast tests, coverage, parity, and knip status to README.md.
  Scope: |-
    - In scope: Epic G′. Add badges for fast tests, coverage, parity, and knip status to README.md.
    - Out of scope: unrelated refactors not required for "Add concise README CI badges".
  Plan: "Add concise README badges that expose the current CI surface for test:fast, coverage, release:parity, and the current knip roadmap status without implying knip is already enforced. Verification: README diff review, policy routing, doctor, and format check."
  Verify Steps: |-
    1. Review the requested outcome for "Add concise README CI badges". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T14:05:51.115Z — VERIFY — ok
    
    By: PLANNER
    
    Note: Command: rg -n 'Core CI|test:fast|coverage|release:parity|knip' README.md; Result: pass; Evidence: README contains badges for Core CI, test:fast, coverage, release:parity, and knip roadmap status. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with info-only runtime/archive findings. Command: bun run format:check; Result: pass; Evidence: Prettier reports all files formatted. Scope: README.md and task README.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T14:04:43.987Z, excerpt_hash=sha256:28b3c2b8c97ebf5466b33963e47eed09c97b60049cb35c5dbdfec0d50d215a78
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add concise README CI badges

Epic G′. Add badges for fast tests, coverage, parity, and knip status to README.md.

## Scope

- In scope: Epic G′. Add badges for fast tests, coverage, parity, and knip status to README.md.
- Out of scope: unrelated refactors not required for "Add concise README CI badges".

## Plan

Add concise README badges that expose the current CI surface for test:fast, coverage, release:parity, and the current knip roadmap status without implying knip is already enforced. Verification: README diff review, policy routing, doctor, and format check.

## Verify Steps

1. Review the requested outcome for "Add concise README CI badges". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T14:05:51.115Z — VERIFY — ok

By: PLANNER

Note: Command: rg -n 'Core CI|test:fast|coverage|release:parity|knip' README.md; Result: pass; Evidence: README contains badges for Core CI, test:fast, coverage, release:parity, and knip roadmap status. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with info-only runtime/archive findings. Command: bun run format:check; Result: pass; Evidence: Prettier reports all files formatted. Scope: README.md and task README.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T14:04:43.987Z, excerpt_hash=sha256:28b3c2b8c97ebf5466b33963e47eed09c97b60049cb35c5dbdfec0d50d215a78

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
