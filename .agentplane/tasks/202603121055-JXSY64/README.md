---
id: "202603121055-JXSY64"
title: "Improve commit empty-index auto-stage ergonomics"
result_summary: "Enabled empty-index auto-stage for top-level commit and aligned allow-tasks policy/help/docs contracts."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T10:57:03.444Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T11:08:02.461Z"
  updated_by: "CODER"
  note: "Verified empty-index commit auto-stage and contract sync: vitest run-cli.core.guard.commit-wrapper/run-cli.core.guard/guard impl allow/guard impl commands.unit/policy evaluate; vitest run-cli.core.help-snap/run-cli.core.docs-cli; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; agentplane docs cli --out docs/user/cli-reference.generated.mdx; dogfood agentplane commit without manual git add passed."
commit:
  hash: "c24f8d0c36055fc68d605450f388865e8ca900ee"
  message: "🚧 JXSY64 cli: auto-stage empty-index commit scope"
comments:
  -
    author: "CODER"
    body: "Start: teach top-level commit to auto-stage allowlist-scoped changes when the index is empty while preserving guard commit staged-only semantics and syncing help/tests."
  -
    author: "CODER"
    body: "Verified: top-level commit now auto-stages allowlist-scoped changes from an empty index, keeps guard commit staged-only, and synchronizes help/docs/tests."
events:
  -
    type: "status"
    at: "2026-03-12T10:57:44.020Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: teach top-level commit to auto-stage allowlist-scoped changes when the index is empty while preserving guard commit staged-only semantics and syncing help/tests."
  -
    type: "verify"
    at: "2026-03-12T11:08:02.461Z"
    author: "CODER"
    state: "ok"
    note: "Verified empty-index commit auto-stage and contract sync: vitest run-cli.core.guard.commit-wrapper/run-cli.core.guard/guard impl allow/guard impl commands.unit/policy evaluate; vitest run-cli.core.help-snap/run-cli.core.docs-cli; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; agentplane docs cli --out docs/user/cli-reference.generated.mdx; dogfood agentplane commit without manual git add passed."
  -
    type: "status"
    at: "2026-03-12T11:08:02.638Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: top-level commit now auto-stages allowlist-scoped changes from an empty index, keeps guard commit staged-only, and synchronizes help/docs/tests."
doc_version: 3
doc_updated_at: "2026-03-12T11:08:02.638Z"
doc_updated_by: "CODER"
description: "Teach top-level commit to stage allowlist-scoped changes when the git index is empty, and align help/docs/tests with the new contract."
id_source: "generated"
---
## Summary

Make top-level `agentplane commit` usable when the git index is empty by staging only the changed paths that match the explicit allowlist or active-task artifact scope before commit validation runs.

## Scope

- In scope: Teach top-level commit to stage allowlist-scoped changes when the git index is empty, and align help/docs/tests with the new contract.
- Out of scope: unrelated refactors not required for "Improve commit empty-index auto-stage ergonomics".

## Plan

1. Detect the empty-index case in the non-close `commit` flow and stage only allowlist-matched paths before policy validation.
2. Reuse or extend shared allowlist staging helpers without changing comment-driven commit semantics unexpectedly.
3. Align help/generated docs and add regression coverage for auto-stage behavior and empty-index guidance.

## Verify Steps

- `bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/commands/guard/impl/allow.test.ts --hookTimeout 60000 --testTimeout 60000`
- `bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts --hookTimeout 60000 --testTimeout 60000`
- `bun run --filter=@agentplaneorg/core build`
- `bun run --filter=agentplane build`

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T11:08:02.461Z — VERIFY — ok

By: CODER

Note: Verified empty-index commit auto-stage and contract sync: vitest run-cli.core.guard.commit-wrapper/run-cli.core.guard/guard impl allow/guard impl commands.unit/policy evaluate; vitest run-cli.core.help-snap/run-cli.core.docs-cli; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; agentplane docs cli --out docs/user/cli-reference.generated.mdx; dogfood agentplane commit without manual git add passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T10:57:44.020Z, excerpt_hash=sha256:5f531a6f98f9cea58bca3c6b1558b746c82db04995203aeac19eeec238daa7e4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
