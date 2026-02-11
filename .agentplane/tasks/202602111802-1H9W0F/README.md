---
id: "202602111802-1H9W0F"
title: "Release next patch version"
result_summary: "Published patch release v0.2.18 (core + agentplane)."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "INTEGRATOR"
depends_on: []
tags:
  - "release"
  - "npm"
  - "ci"
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
  hash: "1168d88c71f26c6a0d910a9555b997479f2b7757"
  message: "✨ release: v0.2.18"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: execute patch release pipeline end-to-end including publish."
  -
    author: "INTEGRATOR"
    body: "Verified: release prepublish passed; tag v0.2.18 pushed; npm packages @agentplaneorg/core@0.2.18 and agentplane@0.2.18 published successfully."
events:
  -
    type: "status"
    at: "2026-02-11T18:02:29.823Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: execute patch release pipeline end-to-end including publish."
  -
    type: "status"
    at: "2026-02-11T18:21:55.500Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: release prepublish passed; tag v0.2.18 pushed; npm packages @agentplaneorg/core@0.2.18 and agentplane@0.2.18 published successfully."
doc_version: 2
doc_updated_at: "2026-02-11T18:21:55.500Z"
doc_updated_by: "INTEGRATOR"
description: "Generate release plan, prepare release notes, run release prepublish checks, apply release, publish npm packages, and push tag."
id_source: "generated"
---
## Summary

Publish the next patch release with full release pipeline gates.

## Scope

In scope: release plan/apply, release notes for next version, prepublish checks, npm publish, git push tag/commit.

## Plan

1) Run release plan (patch). 2) Create docs/releases/vX.Y.Z.md from generated plan. 3) Run release:prepublish. 4) Run release apply --push --yes. 5) Publish @agentplaneorg/core and agentplane. 6) Verify npm versions and close task.

## Risks

Publish is network/auth dependent; failures can leave local tag/commit state that must be reconciled.

## Verification

Pending.

## Rollback Plan

If publish fails after tag/commit, fix issue and republish same tagged commit if version not consumed; otherwise plan next patch.

## Context

User requested immediate publish of next patch release.

## Verify Steps

bun run release:prepublish\nagentplane release plan --bump patch\nagentplane release apply --push --yes\ncd packages/core && npm publish --provenance --access public --tag latest\ncd packages/agentplane && npm publish --provenance --access public --tag latest

## Notes

### Implementation Notes\n- Pending.
