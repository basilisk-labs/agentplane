---
id: "202604210859-2TSS0Y"
title: "Add depcruise trend guard"
result_summary: "Added depcruise known-violations trend guard."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "ci"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T10:27:33.836Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T10:32:23.861Z"
  updated_by: "CODER"
  note: |-
    Command: agentplane task verify-show 202604210859-2TSS0Y | Result: pass | Evidence: declared checks are current baseline pass, artificial baseline growth failure, and arch:deps/arch:check green | Scope: task verification contract
    Command: node scripts/check-depcruise-known-violations.mjs | Result: pass | Evidence: dependency-cruiser known violations OK (count=49, max=49, rules=no-circular=49) | Scope: current known-violations baseline
    Command: tmp=$(mktemp); node -e '<append first known violation to temp baseline>'; node scripts/check-depcruise-known-violations.mjs --known-violations "$tmp"; expect exit 1 | Result: pass | Evidence: guard failed on count=50/max=49 and no-circular=50/max=49; wrapper reported artificial growth check failed as expected | Scope: artificial baseline growth regression
    Command: bun run arch:check | Result: pass | Evidence: baseline guard passed, depcruise reported no dependency violations found; 49 known violations ignored | Scope: dependency-cruiser architecture check
    Command: bunx eslint scripts/check-depcruise-known-violations.mjs | Result: pass | Evidence: no lint output, exit 0 | Scope: new script lint
    Command: bunx prettier --check package.json scripts/check-depcruise-known-violations.mjs | Result: pass | Evidence: All matched files use Prettier code style | Scope: changed package script and new script formatting
    Command: bun run typecheck | Result: pass | Evidence: tsc -b exited 0 | Scope: repository TypeScript project references
    Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: loaded routing policy sanity
    Command: agentplane doctor | Result: pass | Evidence: doctor OK with errors=0 warnings=0; preamble noted stale repo build from unrelated recipes file drift | Scope: workflow/runtime diagnostics
commit:
  hash: "5ecfc46a7aae4f66c0929fe6d51a600b0f25ff9f"
  message: "✅ 2TSS0Y code: done"
comments:
  -
    author: "CODER"
    body: "Start: add dependency-cruiser trend guard that passes current baseline and fails on artificial growth, with architecture verification."
  -
    author: "CODER"
    body: "Verified: added dependency-cruiser known-violations baseline guard, wired it into arch:check, and confirmed current baseline plus artificial growth behavior."
events:
  -
    type: "status"
    at: "2026-04-21T10:27:38.666Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add dependency-cruiser trend guard that passes current baseline and fails on artificial growth, with architecture verification."
  -
    type: "verify"
    at: "2026-04-21T10:32:23.861Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: agentplane task verify-show 202604210859-2TSS0Y | Result: pass | Evidence: declared checks are current baseline pass, artificial baseline growth failure, and arch:deps/arch:check green | Scope: task verification contract
      Command: node scripts/check-depcruise-known-violations.mjs | Result: pass | Evidence: dependency-cruiser known violations OK (count=49, max=49, rules=no-circular=49) | Scope: current known-violations baseline
      Command: tmp=$(mktemp); node -e '<append first known violation to temp baseline>'; node scripts/check-depcruise-known-violations.mjs --known-violations "$tmp"; expect exit 1 | Result: pass | Evidence: guard failed on count=50/max=49 and no-circular=50/max=49; wrapper reported artificial growth check failed as expected | Scope: artificial baseline growth regression
      Command: bun run arch:check | Result: pass | Evidence: baseline guard passed, depcruise reported no dependency violations found; 49 known violations ignored | Scope: dependency-cruiser architecture check
      Command: bunx eslint scripts/check-depcruise-known-violations.mjs | Result: pass | Evidence: no lint output, exit 0 | Scope: new script lint
      Command: bunx prettier --check package.json scripts/check-depcruise-known-violations.mjs | Result: pass | Evidence: All matched files use Prettier code style | Scope: changed package script and new script formatting
      Command: bun run typecheck | Result: pass | Evidence: tsc -b exited 0 | Scope: repository TypeScript project references
      Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: loaded routing policy sanity
      Command: agentplane doctor | Result: pass | Evidence: doctor OK with errors=0 warnings=0; preamble noted stale repo build from unrelated recipes file drift | Scope: workflow/runtime diagnostics
  -
    type: "status"
    at: "2026-04-21T10:35:01.502Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added dependency-cruiser known-violations baseline guard, wired it into arch:check, and confirmed current baseline plus artificial growth behavior."
doc_version: 3
doc_updated_at: "2026-04-21T10:35:01.502Z"
doc_updated_by: "CODER"
description: "Prevent dependency-cruiser known-violation baseline growth and verify the baseline format is stable enough for review."
sections:
  Summary: "Add a guard that fails on growth in dependency-cruiser known violations and documents the baseline format decision."
  Scope: "In scope: depcruise check script/config/CI script and baseline-count validation. Out of scope: draining violations."
  Plan: |-
    1. Inspect current depcruise scripts and known-violations format.
    2. Add a trend/count guard that fails on growth.
    3. If the file format is unstable, normalize or document why current format is acceptable.
    4. Run arch dependency checks.
  Verify Steps: |-
    - Current baseline passes.
    - Artificial baseline growth fails the guard.
    - arch:deps or equivalent command remains green.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T10:32:23.861Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane task verify-show 202604210859-2TSS0Y | Result: pass | Evidence: declared checks are current baseline pass, artificial baseline growth failure, and arch:deps/arch:check green | Scope: task verification contract
    Command: node scripts/check-depcruise-known-violations.mjs | Result: pass | Evidence: dependency-cruiser known violations OK (count=49, max=49, rules=no-circular=49) | Scope: current known-violations baseline
    Command: tmp=$(mktemp); node -e '<append first known violation to temp baseline>'; node scripts/check-depcruise-known-violations.mjs --known-violations "$tmp"; expect exit 1 | Result: pass | Evidence: guard failed on count=50/max=49 and no-circular=50/max=49; wrapper reported artificial growth check failed as expected | Scope: artificial baseline growth regression
    Command: bun run arch:check | Result: pass | Evidence: baseline guard passed, depcruise reported no dependency violations found; 49 known violations ignored | Scope: dependency-cruiser architecture check
    Command: bunx eslint scripts/check-depcruise-known-violations.mjs | Result: pass | Evidence: no lint output, exit 0 | Scope: new script lint
    Command: bunx prettier --check package.json scripts/check-depcruise-known-violations.mjs | Result: pass | Evidence: All matched files use Prettier code style | Scope: changed package script and new script formatting
    Command: bun run typecheck | Result: pass | Evidence: tsc -b exited 0 | Scope: repository TypeScript project references
    Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: loaded routing policy sanity
    Command: agentplane doctor | Result: pass | Evidence: doctor OK with errors=0 warnings=0; preamble noted stale repo build from unrelated recipes file drift | Scope: workflow/runtime diagnostics
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:27:38.687Z, excerpt_hash=sha256:ee4c3fb9ce040dfc830d4cb1776e25dd1d2a4dd39811f81d25db1445123965f0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Remove trend guard wiring and any baseline normalization."
  Findings: "Source input: AUDIT H-3/M-1 and REFACTORING_PLAN D.1."
id_source: "generated"
---
## Summary

Add a guard that fails on growth in dependency-cruiser known violations and documents the baseline format decision.

## Scope

In scope: depcruise check script/config/CI script and baseline-count validation. Out of scope: draining violations.

## Plan

1. Inspect current depcruise scripts and known-violations format.
2. Add a trend/count guard that fails on growth.
3. If the file format is unstable, normalize or document why current format is acceptable.
4. Run arch dependency checks.

## Verify Steps

- Current baseline passes.
- Artificial baseline growth fails the guard.
- arch:deps or equivalent command remains green.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T10:32:23.861Z — VERIFY — ok

By: CODER

Note: Command: agentplane task verify-show 202604210859-2TSS0Y | Result: pass | Evidence: declared checks are current baseline pass, artificial baseline growth failure, and arch:deps/arch:check green | Scope: task verification contract
Command: node scripts/check-depcruise-known-violations.mjs | Result: pass | Evidence: dependency-cruiser known violations OK (count=49, max=49, rules=no-circular=49) | Scope: current known-violations baseline
Command: tmp=$(mktemp); node -e '<append first known violation to temp baseline>'; node scripts/check-depcruise-known-violations.mjs --known-violations "$tmp"; expect exit 1 | Result: pass | Evidence: guard failed on count=50/max=49 and no-circular=50/max=49; wrapper reported artificial growth check failed as expected | Scope: artificial baseline growth regression
Command: bun run arch:check | Result: pass | Evidence: baseline guard passed, depcruise reported no dependency violations found; 49 known violations ignored | Scope: dependency-cruiser architecture check
Command: bunx eslint scripts/check-depcruise-known-violations.mjs | Result: pass | Evidence: no lint output, exit 0 | Scope: new script lint
Command: bunx prettier --check package.json scripts/check-depcruise-known-violations.mjs | Result: pass | Evidence: All matched files use Prettier code style | Scope: changed package script and new script formatting
Command: bun run typecheck | Result: pass | Evidence: tsc -b exited 0 | Scope: repository TypeScript project references
Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: loaded routing policy sanity
Command: agentplane doctor | Result: pass | Evidence: doctor OK with errors=0 warnings=0; preamble noted stale repo build from unrelated recipes file drift | Scope: workflow/runtime diagnostics

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:27:38.687Z, excerpt_hash=sha256:ee4c3fb9ce040dfc830d4cb1776e25dd1d2a4dd39811f81d25db1445123965f0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove trend guard wiring and any baseline normalization.

## Findings

Source input: AUDIT H-3/M-1 and REFACTORING_PLAN D.1.
