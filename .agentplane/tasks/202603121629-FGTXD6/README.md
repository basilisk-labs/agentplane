---
id: "202603121629-FGTXD6"
title: "Apply and publish release v0.3.6"
result_summary: "Release v0.3.6 is published on npm; tag v0.3.6 remains on fd7c68fce981adec9472749b5117a66291324146 and publish recovery ran from c842f3140ec22a61fbd8e68acbd1ce0ec9e9d4fa."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "release"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T16:30:34.865Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T17:12:32.404Z"
  updated_by: "CODER"
  note: "release plan resolved 0.3.5 -> 0.3.6; bun run release:prepublish passed on recovery commit c842f3140ec2; publish workflow 23014381210 succeeded; npm view agentplane version=0.3.6 and npm view @agentplaneorg/core version=0.3.6"
commit:
  hash: "c842f3140ec22a61fbd8e68acbd1ce0ec9e9d4fa"
  message: "🧪 FGTXD6 guard: restore significant coverage for publish gate"
comments:
  -
    author: "CODER"
    body: "Start: generate the 0.3.6 patch release plan, validate release gates, apply the release with push if every preflight passes, and then confirm npm publication for both packages."
  -
    author: "CODER"
    body: "Verified: release apply produced tag v0.3.6 at fd7c68fce981adec9472749b5117a66291324146, recovery commit c842f3140ec22a61fbd8e68acbd1ce0ec9e9d4fa restored the publish gate, workflow 23014381210 completed successfully, and both npm packages now resolve to 0.3.6."
events:
  -
    type: "status"
    at: "2026-03-12T16:30:52.799Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: generate the 0.3.6 patch release plan, validate release gates, apply the release with push if every preflight passes, and then confirm npm publication for both packages."
  -
    type: "verify"
    at: "2026-03-12T17:12:32.404Z"
    author: "CODER"
    state: "ok"
    note: "release plan resolved 0.3.5 -> 0.3.6; bun run release:prepublish passed on recovery commit c842f3140ec2; publish workflow 23014381210 succeeded; npm view agentplane version=0.3.6 and npm view @agentplaneorg/core version=0.3.6"
  -
    type: "status"
    at: "2026-03-12T17:12:46.613Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release apply produced tag v0.3.6 at fd7c68fce981adec9472749b5117a66291324146, recovery commit c842f3140ec22a61fbd8e68acbd1ce0ec9e9d4fa restored the publish gate, workflow 23014381210 completed successfully, and both npm packages now resolve to 0.3.6."
doc_version: 3
doc_updated_at: "2026-03-12T17:12:46.614Z"
doc_updated_by: "CODER"
description: "Prepare the 0.3.6 patch release, generate the release plan and notes, pass release prepublish gates, apply the release, push commit and tag, and confirm that both packages are published on npm."
id_source: "generated"
---
## Summary

Apply and publish release v0.3.6

Prepare the 0.3.6 patch release, generate the release plan and notes, pass release prepublish gates, apply the release, push commit and tag, and confirm that both packages are published on npm.

## Scope

- In scope: Prepare the 0.3.6 patch release, generate the release plan and notes, pass release prepublish gates, apply the release, push commit and tag, and confirm that both packages are published on npm.
- Out of scope: unrelated refactors not required for "Apply and publish release v0.3.6".

## Plan

Release plan: version=0.3.6, tag=v0.3.6, scope=generate the patch release plan from v0.3.5, update release notes and release-facing docs if the plan requires it, run release:prepublish, apply the release with push, then confirm npm publication for @agentplaneorg/core@0.3.6 and agentplane@0.3.6.

## Verify Steps

1. Run agentplane release plan --patch and confirm the target resolves to v0.3.6 from v0.3.5. Expected: a release plan directory is created and its notes inventory matches the actual post-0.3.5 changes.
2. Run bun run release:prepublish. Expected: release parity, builds, docs checks, lint, and release-critical validation pass for the prepared v0.3.6 scope.
3. Run agentplane release apply --push --yes and verify the result. Expected: the release commit and v0.3.6 tag are pushed and both npm package versions become visible on npmjs.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T17:12:32.404Z — VERIFY — ok

By: CODER

Note: release plan resolved 0.3.5 -> 0.3.6; bun run release:prepublish passed on recovery commit c842f3140ec2; publish workflow 23014381210 succeeded; npm view agentplane version=0.3.6 and npm view @agentplaneorg/core version=0.3.6

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T16:30:52.800Z, excerpt_hash=sha256:b55ea4b1fd934ceedbdac21771cb7eea0b3659146d4a11f30a5c570b94ff4a65

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
