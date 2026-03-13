---
id: "202603130734-W0CBSG"
title: "Add Notes block to commit help"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T07:35:39.211Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T07:38:23.133Z"
  updated_by: "CODER"
  note: "Verified Notes-block help surface: full help shows standalone protected-scope guidance, generated CLI reference is refreshed, and focused help/docs tests plus prettier checks all pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add explicit Notes blocks to commit and guard-commit help so protected path-scope semantics are discoverable without scanning individual option descriptions."
events:
  -
    type: "status"
    at: "2026-03-13T07:35:48.938Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add explicit Notes blocks to commit and guard-commit help so protected path-scope semantics are discoverable without scanning individual option descriptions."
  -
    type: "verify"
    at: "2026-03-13T07:38:23.133Z"
    author: "CODER"
    state: "ok"
    note: "Verified Notes-block help surface: full help shows standalone protected-scope guidance, generated CLI reference is refreshed, and focused help/docs tests plus prettier checks all pass."
doc_version: 3
doc_updated_at: "2026-03-13T07:38:23.136Z"
doc_updated_by: "CODER"
description: "Add explicit Notes sections to commit and guard commit help so standalone protected path scopes and branch-only allow-base semantics are visible without reading option descriptions line by line."
id_source: "generated"
---
## Summary

Add Notes block to commit help

Add explicit Notes sections to commit and guard commit help so standalone protected path scopes and branch-only allow-base semantics are visible without reading option descriptions line by line.

## Scope

- In scope: Add explicit Notes sections to commit and guard commit help so standalone protected path scopes and branch-only allow-base semantics are visible without reading option descriptions line by line.
- Out of scope: unrelated refactors not required for "Add Notes block to commit help".

## Plan

1. Implement the change for "Add Notes block to commit help".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: help/docs contracts stay green with the new Notes block.
2. Run `agentplane docs cli --out docs/user/cli-reference.generated.mdx`. Expected: generated CLI reference includes the new Notes block.
3. Run `./node_modules/.bin/prettier --check packages/agentplane/src/commands/commit.spec.ts packages/agentplane/src/commands/guard/commit.command.ts docs/user/cli-reference.generated.mdx packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts`. Expected: no formatting drift.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T07:38:23.133Z — VERIFY — ok

By: CODER

Note: Verified Notes-block help surface: full help shows standalone protected-scope guidance, generated CLI reference is refreshed, and focused help/docs tests plus prettier checks all pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T07:35:48.940Z, excerpt_hash=sha256:e85115c191f8616cffdf58bbccbfc6c6cf17b2f1253df8c0cffac1f42c463c56

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
