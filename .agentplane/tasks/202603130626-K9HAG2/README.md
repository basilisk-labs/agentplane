---
id: "202603130626-K9HAG2"
title: "Add explicit publish workflow sha input"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T06:27:17.903Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T06:29:49.297Z"
  updated_by: "CODER"
  note: "Release workflow manual recovery now prefers exact sha input."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add explicit publish workflow sha input and wire manual recovery to exact commit selection."
events:
  -
    type: "status"
    at: "2026-03-13T06:27:19.066Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add explicit publish workflow sha input and wire manual recovery to exact commit selection."
  -
    type: "verify"
    at: "2026-03-13T06:29:49.297Z"
    author: "CODER"
    state: "ok"
    note: "Release workflow manual recovery now prefers exact sha input."
doc_version: 3
doc_updated_at: "2026-03-13T06:29:49.298Z"
doc_updated_by: "CODER"
description: "Harden manual release recovery by making workflow_dispatch resolve a fixed SHA instead of a mutable ref."
id_source: "generated"
---
## Summary

Add explicit publish workflow sha input

Harden manual release recovery by making workflow_dispatch resolve a fixed SHA instead of a mutable ref.

## Scope

- In scope: Harden manual release recovery by making workflow_dispatch resolve a fixed SHA instead of a mutable ref.
- Out of scope: unrelated refactors not required for "Add explicit publish workflow sha input".

## Plan

1. Add explicit `workflow_dispatch` `sha` input to `.github/workflows/publish.yml` and make manual publish resolve a fixed commit instead of only a mutable ref.
2. Update release resolver/docs/tests so manual recovery documents and validates the preferred `sha` path.
3. Run release workflow contract checks plus targeted workflow/release tests and record evidence.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: publish workflow contract and release-ready source resolution stay green with explicit `sha` support.
2. Run `bun run workflows:lint`. Expected: workflow syntax and action wiring remain valid after manual publish input changes.
3. Inspect `.github/workflows/publish.yml`. Expected: manual dispatch exposes a `sha` input and uses it to resolve the exact release-ready source.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T06:29:49.297Z — VERIFY — ok

By: CODER

Note: Release workflow manual recovery now prefers exact sha input.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T06:27:19.066Z, excerpt_hash=sha256:019fe7f096ec6788fc0f43e40551f3a8ad2a47998e067db7992bdce45f2994fc

Details:

Command: bun x vitest run packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts --hookTimeout 60000 --testTimeout 60000
Result: pass
Evidence: 2 files, 5 tests passed; publish workflow contract and release-ready source script stayed green.
Scope: release workflow contract and release-ready source resolution.

Command: bun run workflows:lint
Result: pass
Evidence: workflow lint and workflow command contract both returned OK.
Scope: GitHub Actions workflow syntax and command wiring.

Command: ./node_modules/.bin/prettier --check .github/workflows/publish.yml docs/developer/release-and-publishing.mdx docs/help/troubleshooting.mdx packages/agentplane/src/commands/release/publish-workflow-contract.test.ts
Result: pass
Evidence: all touched workflow, docs, and test files match Prettier.
Scope: formatting of the edited publish workflow, docs, and release contract test.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
