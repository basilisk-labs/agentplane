---
id: "202603091039-NRWCGC"
title: "Apply and publish release v0.3.5"
result_summary: "Released v0.3.5 after the repaired publish workflow completed successfully against the v0.3.5 release line."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T10:43:17.723Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T11:28:34.357Z"
  updated_by: "CODER"
  note: "Published v0.3.5 via Publish to npm run 22851205862 after the repair commits; npm now serves agentplane@0.3.5 and @agentplaneorg/core@0.3.5, and GitHub Release v0.3.5 is live."
commit:
  hash: "c2d2d9661c1b5af26a6fd6e890f79684851f2c80"
  message: "🐛 V2X1QB website: fix Docusaurus theme typecheck"
comments:
  -
    author: "CODER"
    body: "Start: run the full 0.3.5 prepublish contour on the frozen release scope, then apply and publish the release only if the gates stay green and the resulting tag/npm state can be verified end to end."
  -
    author: "CODER"
    body: "Verified: Publish to npm run 22851205862 succeeded; npm serves agentplane@0.3.5 and @agentplaneorg/core@0.3.5; GitHub Release v0.3.5 is live."
events:
  -
    type: "status"
    at: "2026-03-09T10:43:23.268Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: run the full 0.3.5 prepublish contour on the frozen release scope, then apply and publish the release only if the gates stay green and the resulting tag/npm state can be verified end to end."
  -
    type: "verify"
    at: "2026-03-09T11:28:34.357Z"
    author: "CODER"
    state: "ok"
    note: "Published v0.3.5 via Publish to npm run 22851205862 after the repair commits; npm now serves agentplane@0.3.5 and @agentplaneorg/core@0.3.5, and GitHub Release v0.3.5 is live."
  -
    type: "status"
    at: "2026-03-09T11:28:34.636Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Publish to npm run 22851205862 succeeded; npm serves agentplane@0.3.5 and @agentplaneorg/core@0.3.5; GitHub Release v0.3.5 is live."
doc_version: 3
doc_updated_at: "2026-03-09T11:28:34.636Z"
doc_updated_by: "CODER"
description: "Run the approved 0.3.5 release flow, publish the packages, push the tag, and verify the resulting release state."
id_source: "generated"
---
## Summary

- Problem: 0.3.5 must be applied and published without reintroducing release-flow drift in tags, npm, generated docs, or repo-owned CLI expectation.
- Target outcome: run the approved release flow, publish `v0.3.5`, and verify npm, tag, and release state after push.
- Constraint: release mutation must only begin after release notes and prepublish gates are green.

## Scope

### In scope
- Run release prepublish checks for the 0.3.5 scope.
- Apply the release, push the release commit and tag, and confirm publish state.
- Record release verification evidence and close the task on the published release SHA.

### Out of scope
- New implementation changes outside release blockers discovered by release gates.
- Expanding the release scope beyond the generated 0.3.5 plan.
- Follow-up architectural work after publication.

## Plan

1. Confirm release notes exist and run the canonical prepublish gates for the frozen 0.3.5 scope.
2. Run `agentplane release apply --push --yes` and observe the resulting release commit/tag flow.
3. Verify published state across git, npm, and release metadata, then finish the task on the released commit.

## Verify Steps

1. Run `bun run release:prepublish`. Expected: the full prepublish contour passes against the frozen 0.3.5 scope.
2. Run `agentplane release apply --push --yes`. Expected: version bumps, generated artifacts, tags, and pushes complete without release-contract drift.
3. Confirm the published state with `git rev-parse v0.3.5`, `npm view agentplane version`, and `npm view @agentplaneorg/core version`. Expected: git and npm both resolve to `0.3.5` after publish completes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T11:28:34.357Z — VERIFY — ok

By: CODER

Note: Published v0.3.5 via Publish to npm run 22851205862 after the repair commits; npm now serves agentplane@0.3.5 and @agentplaneorg/core@0.3.5, and GitHub Release v0.3.5 is live.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T10:43:23.268Z, excerpt_hash=sha256:6ffda5d5f9ae088e303c705d42716e9dc06fda9e43f12324435b1d145a68f4ff

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Stop before publish if `release:prepublish` or `release apply` reports drift.
2. If publish partially succeeds, follow the release recovery path before attempting another version.

## Findings
