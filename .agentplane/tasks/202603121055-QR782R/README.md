---
id: "202603121055-QR782R"
title: "Preserve formatter and linter signal in commit hook summaries"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on:
  - "202603121055-JXSY64"
tags:
  - "code"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T11:08:49.549Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: keep decisive formatter and linter failure lines visible in compressed commit hook summaries without changing hook scripts or phase labeling."
events:
  -
    type: "status"
    at: "2026-03-12T11:09:03.407Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: keep decisive formatter and linter failure lines visible in compressed commit hook summaries without changing hook scripts or phase labeling."
doc_version: 3
doc_updated_at: "2026-03-12T11:09:03.407Z"
doc_updated_by: "CODER"
description: "Keep decisive pre-commit failure lines in commit wrapper diagnostics so formatter and linter failures remain visible after output compression."
id_source: "generated"
---
## Summary

Keep decisive formatter and linter failure lines visible in compressed `agentplane commit` hook summaries so agents can see the real failure cause without digging through full hook logs.

## Scope

- Touch only commit-wrapper failure summarization and directly related tests/docs.
- Do not change hook scripts or policy outcomes.
- Preserve phase-correct close-vs-task commit diagnostics.

## Plan

1. Extend commit hook-output compression so salient formatter/linter failure lines survive even when the raw log is long.
2. Keep task-commit and close-commit phase labeling unchanged while improving error signal quality.
3. Add regression coverage for compressed summaries that would otherwise hide the decisive failure line.

## Verify Steps

- `bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts --hookTimeout 60000 --testTimeout 60000`
- `bun run --filter=@agentplaneorg/core build`
- `bun run --filter=agentplane build`

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the implementation commit for this task to restore the previous compressed hook summary behavior.

## Findings
