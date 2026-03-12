---
id: "202603120848-ZZD1G5"
title: "Narrow allow-tasks help to active-task semantics"
result_summary: "help and generated docs now describe allow-tasks as active-task subtree plus export snapshot semantics"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T08:51:19.800Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T08:54:23.612Z"
  updated_by: "CODER"
  note: "Verified: agentplane help commit --compact; agentplane help guard commit --compact; bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts --hookTimeout 60000 --testTimeout 60000; agentplane docs cli --out docs/user/cli-reference.generated.mdx"
commit:
  hash: "d8e823318619222067c58844c6bd706098df8de7"
  message: "📝 ZZD1G5 docs: narrow allow-tasks help contract"
comments:
  -
    author: "CODER"
    body: "Start: narrow allow-tasks wording in help and generated CLI docs so the contract matches the implemented active-task subtree semantics."
  -
    author: "CODER"
    body: "Verified: agentplane help commit --compact; agentplane help guard commit --compact; bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts --hookTimeout 60000 --testTimeout 60000; agentplane docs cli --out docs/user/cli-reference.generated.mdx"
events:
  -
    type: "status"
    at: "2026-03-12T08:51:43.011Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: narrow allow-tasks wording in help and generated CLI docs so the contract matches the implemented active-task subtree semantics."
  -
    type: "verify"
    at: "2026-03-12T08:54:23.612Z"
    author: "CODER"
    state: "ok"
    note: "Verified: agentplane help commit --compact; agentplane help guard commit --compact; bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts --hookTimeout 60000 --testTimeout 60000; agentplane docs cli --out docs/user/cli-reference.generated.mdx"
  -
    type: "status"
    at: "2026-03-12T08:54:29.215Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: agentplane help commit --compact; agentplane help guard commit --compact; bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts --hookTimeout 60000 --testTimeout 60000; agentplane docs cli --out docs/user/cli-reference.generated.mdx"
doc_version: 3
doc_updated_at: "2026-03-12T08:54:29.215Z"
doc_updated_by: "CODER"
description: "Update command help text and generated CLI reference so --allow-tasks matches the implemented active-task artifact scope instead of implying blanket .agentplane/tasks coverage."
id_source: "generated"
---
## Summary

Narrow allow-tasks help to active-task semantics

Update command help text and generated CLI reference so --allow-tasks matches the implemented active-task artifact scope instead of implying blanket .agentplane/tasks coverage.

## Scope

- In scope: Update command help text and generated CLI reference so --allow-tasks matches the implemented active-task artifact scope instead of implying blanket .agentplane/tasks coverage.
- Out of scope: unrelated refactors not required for "Narrow allow-tasks help to active-task semantics".

## Plan

1. Tighten --allow-tasks wording in commit and guard command specs to describe the active task subtree plus export snapshot. 2. Regenerate docs/user/cli-reference.generated.mdx from live CLI specs. 3. Add/update focused tests that lock the narrowed wording so docs and help stay aligned.

## Verify Steps

1. Run `agentplane help commit --compact` and `agentplane help guard commit --compact`. Expected: `--allow-tasks` wording describes the active task subtree plus the task export snapshot, not blanket `.agentplane/tasks/` access.
2. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: help/docs regressions stay green.
3. Run `agentplane docs cli --out docs/user/cli-reference.generated.mdx`. Expected: generated reference is updated and matches current command specs without extra drift.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T08:54:23.612Z — VERIFY — ok

By: CODER

Note: Verified: agentplane help commit --compact; agentplane help guard commit --compact; bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts --hookTimeout 60000 --testTimeout 60000; agentplane docs cli --out docs/user/cli-reference.generated.mdx

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T08:51:43.011Z, excerpt_hash=sha256:02667861ba476774afa4418ffcde0dd9958c7c57f7bc48a1015892c0ecb85b3a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
