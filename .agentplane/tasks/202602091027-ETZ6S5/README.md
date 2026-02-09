---
id: "202602091027-ETZ6S5"
title: "upgrade: increase download timeout for tarball fallback"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "upgrade"
  - "bug"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T10:30:14.311Z"
  updated_by: "CODER"
  note: "bun run lint; bunx vitest run packages/agentplane/src/cli/http.test.ts packages/agentplane/src/commands/upgrade*.test.ts packages/agentplane/src/commands/upgrade*.unit.test.ts"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Increase upgrade downloadToFile timeouts (bundle/checksum/tarball) so tarball_url fallback works reliably; add regression test for timeout propagation if feasible."
events:
  -
    type: "status"
    at: "2026-02-09T10:27:41.242Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Increase upgrade downloadToFile timeouts (bundle/checksum/tarball) so tarball_url fallback works reliably; add regression test for timeout propagation if feasible."
  -
    type: "verify"
    at: "2026-02-09T10:30:14.311Z"
    author: "CODER"
    state: "ok"
    note: "bun run lint; bunx vitest run packages/agentplane/src/cli/http.test.ts packages/agentplane/src/commands/upgrade*.test.ts packages/agentplane/src/commands/upgrade*.unit.test.ts"
doc_version: 2
doc_updated_at: "2026-02-09T10:30:14.314Z"
doc_updated_by: "CODER"
description: "Fix agentplane upgrade failing with E_NETWORK when downloading GitHub tarball_url due to overly short default HTTP timeout (1.5s). Use a larger timeout for upgrade downloads."
id_source: "generated"
---
## Summary

Increase HTTP download timeouts for the upgrade command so GitHub tarball_url (and bundle assets) do not fail due to the 1.5s default.

## Scope


## Plan

1. Define a reasonable upgrade download timeout constant (e.g. 60s).\n2. Pass timeoutMs to all downloadToFile calls in upgrade (bundle/checksum/assets/tarball).\n3. Add a focused unit test that asserts downloadToFile is invoked with the larger timeout in tarball fallback mode (mocking fetch).\n4. Run lint + affected tests.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T10:30:14.311Z — VERIFY — ok

By: CODER

Note: bun run lint; bunx vitest run packages/agentplane/src/cli/http.test.ts packages/agentplane/src/commands/upgrade*.test.ts packages/agentplane/src/commands/upgrade*.unit.test.ts

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T10:27:57.667Z, excerpt_hash=sha256:15fbc70148026130a4dd27a7bbea69bf0c6b152869e1da369b82b8478d74ad4d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit for 202602091027-ETZ6S5 and cut a new patch release.

## Verify Steps

Commands:\n- bun run lint\n- bunx vitest run packages/agentplane/src/commands/upgrade*.test.ts packages/agentplane/src/commands/upgrade*.unit.test.ts packages/agentplane/src/cli/http.test.ts\n\nPass criteria:\n- All commands pass.
