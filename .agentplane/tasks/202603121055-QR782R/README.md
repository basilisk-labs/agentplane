---
id: "202603121055-QR782R"
title: "Preserve formatter and linter signal in commit hook summaries"
result_summary: "Preserved salient Prettier/ESLint failure lines inside compressed commit hook summaries."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-12T11:15:25.052Z"
  updated_by: "CODER"
  note: "Verified salient hook-failure summaries: vitest run-cli.core.guard.commit-wrapper and guard impl commands.unit; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build. Prettier-style integration signal and ANSI-stripped ESLint unit signal are both preserved in compressed commit diagnostics."
commit:
  hash: "ee99550279b898c61075acfecb2f63831fa91d05"
  message: "🚧 QR782R cli: preserve salient hook failure signals"
comments:
  -
    author: "CODER"
    body: "Start: keep decisive formatter and linter failure lines visible in compressed commit hook summaries without changing hook scripts or phase labeling."
  -
    author: "CODER"
    body: "Verified: compressed commit hook summaries now preserve decisive formatter and linter failure lines while stripping ANSI noise and keeping phase labeling unchanged."
events:
  -
    type: "status"
    at: "2026-03-12T11:09:03.407Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: keep decisive formatter and linter failure lines visible in compressed commit hook summaries without changing hook scripts or phase labeling."
  -
    type: "verify"
    at: "2026-03-12T11:15:25.052Z"
    author: "CODER"
    state: "ok"
    note: "Verified salient hook-failure summaries: vitest run-cli.core.guard.commit-wrapper and guard impl commands.unit; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build. Prettier-style integration signal and ANSI-stripped ESLint unit signal are both preserved in compressed commit diagnostics."
  -
    type: "status"
    at: "2026-03-12T11:15:25.321Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: compressed commit hook summaries now preserve decisive formatter and linter failure lines while stripping ANSI noise and keeping phase labeling unchanged."
doc_version: 3
doc_updated_at: "2026-03-12T11:15:25.321Z"
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
#### 2026-03-12T11:15:25.052Z — VERIFY — ok

By: CODER

Note: Verified salient hook-failure summaries: vitest run-cli.core.guard.commit-wrapper and guard impl commands.unit; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build. Prettier-style integration signal and ANSI-stripped ESLint unit signal are both preserved in compressed commit diagnostics.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T11:09:03.407Z, excerpt_hash=sha256:a9e2eb38a4077da1f2fea4e73e6fee2b63bbaa6d4c8b8896fde5886bd4360eb8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the implementation commit for this task to restore the previous compressed hook summary behavior.

## Findings
