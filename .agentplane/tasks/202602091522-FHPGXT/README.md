---
id: "202602091522-FHPGXT"
title: "init: remove legacy module/class fields from backend stubs"
result_summary: "Backend stubs match loader contract"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "init"
  - "backend"
  - "quality"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T16:26:20.293Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass. init backend stubs now match loader contract (id/version/settings only); tests assert module/class keys are absent."
commit:
  hash: "d32c33ec186973d768297a6c4fcdb6afdfc424f9"
  message: "✅ FHPGXT init: remove legacy backend stub fields"
comments:
  -
    author: "CODER"
    body: "Start: remove misleading legacy backend.json stub fields (module/class) from init templates so generated backend configs match actual loader contract (id/version/settings only). Add/update tests."
  -
    author: "CODER"
    body: "Verified: bun run lint and bun run test:full pass. init no longer writes legacy backend.json fields (module/class); generated backend configs contain only id/version/settings."
events:
  -
    type: "status"
    at: "2026-02-09T16:24:24.844Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove misleading legacy backend.json stub fields (module/class) from init templates so generated backend configs match actual loader contract (id/version/settings only). Add/update tests."
  -
    type: "verify"
    at: "2026-02-09T16:26:20.293Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass. init backend stubs now match loader contract (id/version/settings only); tests assert module/class keys are absent."
  -
    type: "status"
    at: "2026-02-09T16:26:20.449Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass. init no longer writes legacy backend.json fields (module/class); generated backend configs contain only id/version/settings."
doc_version: 2
doc_updated_at: "2026-02-09T16:26:20.449Z"
doc_updated_by: "CODER"
description: "Update init backend.json stub templates to include only id/version/settings (remove legacy module/class fields that are ignored)."
id_source: "generated"
---
## Summary

Remove legacy module/class fields from generated backend stubs; keep backend.json stubs aligned with the actual loader contract (id/version/settings).

## Scope

packages/agentplane/src/cli/run-cli/commands/init/* backend stub writer and related tests.

## Plan

1) Locate init backend stub templates (writeBackendStubs).\n2) Remove legacy module/class fields from generated backend.json templates; keep only id/version/settings.\n3) Update docs/comments if they mention legacy fields.\n4) Update/add tests to assert generated backend.json does not include legacy keys.\n5) Run bun run lint and bun run test:full.

## Risks

Low risk; only affects generated defaults. Existing user configs with legacy fields remain accepted/ignored.

## Verify Steps

- bun run lint\n- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T16:26:20.293Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass. init backend stubs now match loader contract (id/version/settings only); tests assert module/class keys are absent.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T16:24:25.134Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit; stubs return to previous shape.
