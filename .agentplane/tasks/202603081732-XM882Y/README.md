---
id: "202603081732-XM882Y"
title: "Draft release notes for v0.3.4"
result_summary: "Release notes for v0.3.4 are drafted, verified, and ready for release apply."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on:
  - "202603081731-DYC4GW"
  - "202603081732-301XC8"
tags:
  - "docs"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T18:03:28.195Z"
  updated_by: "ORCHESTRATOR"
  note: "Release-note scope approved for install-first stabilization."
verification:
  state: "ok"
  updated_at: "2026-03-08T18:05:33.530Z"
  updated_by: "DOCS"
  note: "Release notes drafted in docs/releases/v0.3.4.md and checked against the active release plan with docs:site:check passing."
commit:
  hash: "3a5728f76fd224a67e883ab504e6daf94f78ed11"
  message: "📝 XM882Y docs: draft v0.3.4 release notes"
comments:
  -
    author: "DOCS"
    body: "Start: drafting v0.3.4 notes around install-first startup surfaces, installed-role prompt alignment, and workflow artifact restoration during upgrade for npm-installed users."
  -
    author: "DOCS"
    body: "Verified: docs/releases/v0.3.4.md now covers the install-first startup cleanup, installed profile role-help alignment, and workflow-artifact restoration during upgrade for npm-installed repositories."
events:
  -
    type: "status"
    at: "2026-03-08T18:03:33.164Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: drafting v0.3.4 notes around install-first startup surfaces, installed-role prompt alignment, and workflow artifact restoration during upgrade for npm-installed users."
  -
    type: "verify"
    at: "2026-03-08T18:05:33.530Z"
    author: "DOCS"
    state: "ok"
    note: "Release notes drafted in docs/releases/v0.3.4.md and checked against the active release plan with docs:site:check passing."
  -
    type: "status"
    at: "2026-03-08T18:05:53.750Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs/releases/v0.3.4.md now covers the install-first startup cleanup, installed profile role-help alignment, and workflow-artifact restoration during upgrade for npm-installed repositories."
doc_version: 3
doc_updated_at: "2026-03-08T18:05:53.750Z"
doc_updated_by: "DOCS"
description: "Write release notes for v0.3.4 that explain the install-first runtime guidance fix and workflow-upgrade bootstrap repair in clear user-facing language."
id_source: "generated"
---
## Summary

Draft release notes for v0.3.4

Write release notes for v0.3.4 that explain the install-first runtime guidance fix and workflow-upgrade bootstrap repair in clear user-facing language.

## Scope

- In scope: Write release notes for v0.3.4 that explain the install-first runtime guidance fix and workflow-upgrade bootstrap repair in clear user-facing language.
- Out of scope: unrelated refactors not required for "Draft release notes for v0.3.4".

## Plan

1. Review the shipped install-first fixes and confirm the exact user-facing scope for npm-installed projects.
2. Draft docs/releases/v0.3.4.md with concise bullets for startup-surface cleanup and workflow artifact restoration on upgrade.
3. Verify the release note matches the implemented behavior and record the documentation evidence before closing.

## Verify Steps

1. Run `bun run docs:site:check`. Expected: docs site builds successfully and the release note introduces no design-check failures.
2. Review `docs/releases/v0.3.4.md` against the active release plan. Expected: every listed change from the `v0.3.4` plan is covered in human-readable language.
3. Confirm the note describes the install-first startup fix and workflow-artifact upgrade repair for npm-installed users. Expected: the summary and upgrade notes stay aligned with the shipped behavior.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T18:05:33.530Z — VERIFY — ok

By: DOCS

Note: Release notes drafted in docs/releases/v0.3.4.md and checked against the active release plan with docs:site:check passing.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T18:05:29.841Z, excerpt_hash=sha256:1e8095a9050057fab4188146cdc3bc5845fa767c7fcdef895b641b414cdb4e9b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
