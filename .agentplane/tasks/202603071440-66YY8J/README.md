---
id: "202603071440-66YY8J"
title: "Add startup surface drift check"
result_summary: "Added an automated startup-surface drift check."
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on:
  - "202603071440-XT4PAE"
  - "202603071440-X5MFK1"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T14:55:47.201Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: startup surface drift must fail in automation, not in human review."
verification:
  state: "ok"
  updated_at: "2026-03-07T14:55:47.545Z"
  updated_by: "REVIEWER"
  note: "Verified: the new bootstrap drift check catches AGENTS/CLI mismatches, passes after regeneration, and is wired into CI/release scripts."
commit:
  hash: "aed6d519fbe50ff428d5fc81e8d6d2566dfa2e98"
  message: "✨ ZFZKKS docs: unify agent bootstrap surfaces"
comments:
  -
    author: "TESTER"
    body: "Start: add an explicit drift check so AGENTS blocks, the generated bootstrap doc, quickstart, and role output stay aligned."
  -
    author: "TESTER"
    body: "Verified: startup-surface drift is now enforced by a dedicated check that compares AGENTS command blocks, the generated bootstrap doc, and CLI startup help surfaces."
events:
  -
    type: "status"
    at: "2026-03-07T14:55:47.325Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: add an explicit drift check so AGENTS blocks, the generated bootstrap doc, quickstart, and role output stay aligned."
  -
    type: "verify"
    at: "2026-03-07T14:55:47.545Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: the new bootstrap drift check catches AGENTS/CLI mismatches, passes after regeneration, and is wired into CI/release scripts."
  -
    type: "status"
    at: "2026-03-07T14:55:47.765Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: startup-surface drift is now enforced by a dedicated check that compares AGENTS command blocks, the generated bootstrap doc, and CLI startup help surfaces."
doc_version: 3
doc_updated_at: "2026-03-07T14:55:47.765Z"
doc_updated_by: "TESTER"
description: "Add an automated consistency check so AGENTS.md, quickstart, role output, and bootstrap docs cannot silently diverge."
id_source: "generated"
---
## Summary

Add an automated startup-surface drift check across gateway, bootstrap docs, and CLI help.

## Scope

Create a check that fails when canonical startup commands or references diverge between AGENTS, bootstrap docs, and CLI-generated help.

## Plan

1. Add a check script. 2. Add tests or CI wiring. 3. Make the failure actionable and low-noise.

## Verify Steps

1. Run the new drift check. 2. Run relevant CLI/doc tests. 3. Confirm failure text names the mismatching surface.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T14:55:47.545Z — VERIFY — ok

By: REVIEWER

Note: Verified: the new bootstrap drift check catches AGENTS/CLI mismatches, passes after regeneration, and is wired into CI/release scripts.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T14:55:47.325Z, excerpt_hash=sha256:f5e5735b0c4933c4dbffa7a53a5c5556ecf34b213ee9c9e57741d048df6a097e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove or loosen the new check if it produces false positives or cannot run in standard repo verification.

## Findings


## Risks

A weak drift check adds maintenance cost without catching real divergence; an over-strict one may become flaky.
