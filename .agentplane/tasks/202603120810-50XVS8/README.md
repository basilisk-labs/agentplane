---
id: "202603120810-50XVS8"
title: "Sync CLI docs and bug ledger with current help/doc/runtime behavior"
result_summary: "CLI docs and bug ledger synchronized with current behavior."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202603120810-HK5B6P"
  - "202603120810-B04HQ2"
  - "202603120810-1MJKSD"
tags:
  - "docs"
  - "cli"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T08:12:30.479Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T08:27:29.550Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 8 tests passed and the generated CLI reference refreshed cleanly; Scope: bug ledger, user command docs, troubleshooting docs, and generated CLI reference."
commit:
  hash: "98543046c1517306c8518641c3d1b68b7aece760"
  message: "🩺 50XVS8 docs: sync cli guidance and bug ledger"
comments:
  -
    author: "CODER"
    body: "Start: sync the bug ledger and command docs with the shipped help, task doc, and runtime behavior after the three stabilization fixes."
  -
    author: "CODER"
    body: "Verified: docs and ledger now reflect the shipped help, task doc, stale-build, and runtime remediation behavior."
events:
  -
    type: "status"
    at: "2026-03-12T08:24:57.647Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: sync the bug ledger and command docs with the shipped help, task doc, and runtime behavior after the three stabilization fixes."
  -
    type: "verify"
    at: "2026-03-12T08:27:29.550Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 8 tests passed and the generated CLI reference refreshed cleanly; Scope: bug ledger, user command docs, troubleshooting docs, and generated CLI reference."
  -
    type: "status"
    at: "2026-03-12T08:27:34.053Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs and ledger now reflect the shipped help, task doc, stale-build, and runtime remediation behavior."
doc_version: 3
doc_updated_at: "2026-03-12T08:27:34.053Z"
doc_updated_by: "CODER"
description: "Update stabilization docs and generated or user-facing help surfaces so they match the shipped CLI behavior after the discoverability and runtime fixes."
id_source: "generated"
---
## Summary

Sync CLI docs and bug ledger with current help/doc/runtime behavior

Update stabilization docs and generated or user-facing help surfaces so they match the shipped CLI behavior after the discoverability and runtime fixes.

## Scope

- In scope: Update stabilization docs and generated or user-facing help surfaces so they match the shipped CLI behavior after the discoverability and runtime fixes.
- Out of scope: unrelated refactors not required for "Sync CLI docs and bug ledger with current help/doc/runtime behavior".

## Plan

1. Update the bug ledger remaining gaps to match shipped behavior. 2. Refresh user or generated command docs for help, task-doc, and runtime surfaces. 3. Verify docs-facing CLI tests.

## Verify Steps

- Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --hookTimeout 60000 --testTimeout 60000
- Expected: docs-facing help snapshots and generated CLI reference behavior match the shipped command surface.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T08:27:29.550Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 8 tests passed and the generated CLI reference refreshed cleanly; Scope: bug ledger, user command docs, troubleshooting docs, and generated CLI reference.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T08:24:57.647Z, excerpt_hash=sha256:f564bbe8552e63f9736e6744e1eedc6e2dbda788afea5f7e5f556341b127ac61

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
