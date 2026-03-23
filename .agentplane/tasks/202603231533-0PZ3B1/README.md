---
id: "202603231533-0PZ3B1"
title: "Implement working custom runner adapter"
result_summary: "Implemented configurable custom runner adapter with end-to-end CLI coverage."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603231533-3KB1AD"
tags:
  - "code"
  - "runner"
  - "config"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T16:12:08.611Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T16:15:42.621Z"
  updated_by: "CODER"
  note: "Verified custom runner adapter via targeted unit and CLI coverage; source builds pass after exporting RunnerCustomConfig from @agentplaneorg/core; doctor reports no new runner findings."
commit:
  hash: "5df542f762be740fa2d89e310a059a34ec368fdc"
  message: "✅ 0PZ3B1 code: done"
comments:
  -
    author: "CODER"
    body: "Start: implement the configurable custom runner adapter on top of the shared bundle/bootstrap/state contract and verify it through unit plus CLI execution coverage."
  -
    author: "CODER"
    body: "Verified: implemented the configurable custom runner adapter, wired config and public exports, added CLI execution coverage, and passed targeted tests, source builds, and doctor."
events:
  -
    type: "status"
    at: "2026-03-23T16:12:17.452Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the configurable custom runner adapter on top of the shared bundle/bootstrap/state contract and verify it through unit plus CLI execution coverage."
  -
    type: "verify"
    at: "2026-03-23T16:15:42.621Z"
    author: "CODER"
    state: "ok"
    note: "Verified custom runner adapter via targeted unit and CLI coverage; source builds pass after exporting RunnerCustomConfig from @agentplaneorg/core; doctor reports no new runner findings."
  -
    type: "status"
    at: "2026-03-23T16:19:29.826Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: implemented the configurable custom runner adapter, wired config and public exports, added CLI execution coverage, and passed targeted tests, source builds, and doctor."
doc_version: 3
doc_updated_at: "2026-03-23T16:19:29.827Z"
doc_updated_by: "CODER"
description: "Replace the custom adapter placeholder with a configurable external runner implementation that uses the shared bundle contract and integrates with current run artifacts/state handling."
sections:
  Summary: |-
    Implement working custom runner adapter
    
    Replace the custom adapter placeholder with a configurable external runner implementation that uses the shared bundle contract and integrates with current run artifacts/state handling.
  Scope: |-
    - In scope: Replace the custom adapter placeholder with a configurable external runner implementation that uses the shared bundle contract and integrates with current run artifacts/state handling.
    - Out of scope: unrelated refactors not required for "Implement working custom runner adapter".
  Plan: |-
    1. Implement the change for "Implement working custom runner adapter".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts`. Expected: custom adapter config validates, the external process adapter works in unit coverage, and task run succeeds end-to-end when `default_adapter=custom`.
    2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: config and runner code build cleanly from source.
    3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: no new runner/runtime integrity findings are introduced.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T16:15:42.621Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified custom runner adapter via targeted unit and CLI coverage; source builds pass after exporting RunnerCustomConfig from @agentplaneorg/core; doctor reports no new runner findings.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T16:12:17.453Z, excerpt_hash=sha256:de78549a6cabfd39afdbb3a4256b5c046d8c4983eccac7613f05c05bff28f242
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Implement working custom runner adapter

Replace the custom adapter placeholder with a configurable external runner implementation that uses the shared bundle contract and integrates with current run artifacts/state handling.

## Scope

- In scope: Replace the custom adapter placeholder with a configurable external runner implementation that uses the shared bundle contract and integrates with current run artifacts/state handling.
- Out of scope: unrelated refactors not required for "Implement working custom runner adapter".

## Plan

1. Implement the change for "Implement working custom runner adapter".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts`. Expected: custom adapter config validates, the external process adapter works in unit coverage, and task run succeeds end-to-end when `default_adapter=custom`.
2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: config and runner code build cleanly from source.
3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: no new runner/runtime integrity findings are introduced.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T16:15:42.621Z — VERIFY — ok

By: CODER

Note: Verified custom runner adapter via targeted unit and CLI coverage; source builds pass after exporting RunnerCustomConfig from @agentplaneorg/core; doctor reports no new runner findings.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T16:12:17.453Z, excerpt_hash=sha256:de78549a6cabfd39afdbb3a4256b5c046d8c4983eccac7613f05c05bff28f242

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
