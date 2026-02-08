---
id: "202602081652-9YH0VS"
title: "Refactor: merge cli2 into cli/spec"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "cli"
  - "refactor"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T16:53:56.095Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved by user (2026-02-08)"
verification:
  state: "ok"
  updated_at: "2026-02-08T16:58:11.098Z"
  updated_by: "ORCHESTRATOR"
  note: "Refactor built + typecheck + cli core tests OK"
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: moving src/cli2 under src/cli/spec and updating imports; will verify via typecheck and CLI core tests."
events:
  -
    type: "status"
    at: "2026-02-08T16:54:05.489Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: moving src/cli2 under src/cli/spec and updating imports; will verify via typecheck and CLI core tests."
  -
    type: "verify"
    at: "2026-02-08T16:58:11.098Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Refactor built + typecheck + cli core tests OK"
doc_version: 2
doc_updated_at: "2026-02-08T16:58:11.100Z"
doc_updated_by: "ORCHESTRATOR"
description: "Remove top-level src/cli2 by moving spec-driven CLI (spec/parse/help/registry) under src/cli/spec; update imports; keep behavior unchanged; keep docs generation working."
id_source: "generated"
---
## Summary

Move the spec-driven CLI layer (currently `src/cli2`) under `src/cli/spec` to avoid a duplicated top-level CLI folder layout, without changing behavior.

## Scope

In scope:
- `packages/agentplane/src/cli2/*` -> `packages/agentplane/src/cli/spec/*` (git move).
- Update TypeScript ESM import specifiers across `packages/agentplane/src/**`.
- Update any docs that reference the old file paths (only if path-specific).
- Rebuild and run CLI tests.

Out of scope:
- Any behavior/contract changes to the CLI.
- Renaming command ids or flags.

## Plan

Move src/cli2 under src/cli/spec and update imports; keep CLI behavior unchanged; verify with typecheck + cli core tests.

## Risks

- Relative import paths may be subtly wrong in nested modules under `src/cli/run-cli/**`; mitigate with focused `rg` audit + typecheck + CLI test suite.
- Generated docs/tests may still refer to the old `cli2` wording; treat `cli2` as a conceptual label unless a path reference breaks.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T16:58:11.098Z — VERIFY — ok

By: ORCHESTRATOR

Note: Refactor built + typecheck + cli core tests OK

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T16:54:05.489Z, excerpt_hash=sha256:10213c13cda62c10bf9765f2877ece1d44a997a32079ce1be31da74cab24f627

Details:

Changes: moved packages/agentplane/src/cli2 -> packages/agentplane/src/cli/spec; updated imports; fixed spec errors.ts and parse.test.ts relative imports. Verified: bun run typecheck, bun run test:cli:core, agentplane help --json, agentplane docs cli.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the refactor commits to restore the previous folder layout and import paths (src/cli2 + original relative imports).

## Verify Steps

Pass criteria:
- `bun run typecheck` succeeds.
- `bun run test:cli:core` succeeds.
- `node packages/agentplane/bin/agentplane.js help --json` still emits the same shape (array of HelpJson objects).
- `node packages/agentplane/bin/agentplane.js docs cli --out /tmp/cli.mdx` succeeds.

Checks to run:
- `bun run typecheck`
- `bun run test:cli:core`
- `node packages/agentplane/bin/agentplane.js help --json >/tmp/help.json`
- `node packages/agentplane/bin/agentplane.js docs cli --out /tmp/cli.mdx`
