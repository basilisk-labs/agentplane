---
id: "202602081344-7KD2TP"
title: "Further decompose integrate command core"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081344-GF5VSS"
tags:
  - "cli"
  - "code"
  - "refactor"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T14:24:06.310Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: scoped internal refactor only; Verify Steps defined; full test suite required."
verification:
  state: "ok"
  updated_at: "2026-02-08T14:32:27.044Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run typecheck PASS; bun run lint PASS; bun run test:full PASS (vitest, 704 tests). Refactor only: split integrate cmd core into internal modules; pr-flow tests remain green."
commit:
  hash: "36b179de0af9734a00d6b961bc6c3bfa15ed6a18"
  message: "✨ 7KD2TP pr: decompose integrate cmd core"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: decompose integrate cmd core into smaller internal modules; keep behavior stable and keep pr-flow tests passing."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run typecheck PASS; bun run lint PASS; bun run test:full PASS (vitest, 704 tests). Internal refactor only: extracted integrate cmd core helpers into packages/agentplane/src/commands/pr/integrate/internal/*.ts; no behavior changes; pr-flow tests remain green."
events: []
doc_version: 2
doc_updated_at: "2026-02-08T14:33:19.825Z"
doc_updated_by: "ORCHESTRATOR"
description: "Split commands/pr/integrate/cmd.ts into focused modules (merge strategies, meta/diffstat update, verify runner) while preserving behavior and keeping pr-flow tests green."
---
## Summary

Decompose the integrate command core into smaller focused modules while preserving behavior and keeping the PR flow test suite green.

## Scope

In scope:\n- packages/agentplane/src/commands/pr/integrate/cmd.ts (split into smaller modules)\n- New modules under packages/agentplane/src/commands/pr/integrate/ (internal-only)\n- Any required import rewires and test updates\n\nOut of scope:\n- CLI surface changes\n- Behavior changes to integrate/PR flows\n- Git policy/commit format changes

## Plan

Refactor: split packages/agentplane/src/commands/pr/integrate/cmd.ts into focused internal modules (strategy selection, verification runner, PR meta updates) while keeping CLI behavior unchanged.\n\nExecution steps:\n1) Extract cohesive helpers into packages/agentplane/src/commands/pr/integrate/*.ts with explicit inputs/outputs.\n2) Keep cmd.ts as a thin orchestrator.\n3) Update imports/tests as needed (especially run-cli.core.pr-flow.test.ts).\n4) Verify: bun run typecheck; bun run lint; bun run test:full.

## Risks

- Behavioral regressions in integrate edge-cases (rebase vs squash vs merge) that are only covered by integration tests.\n- Import-cycle risk when extracting modules; keep dependency direction single-way.\n- Subtle output/format changes that could break snapshot-style assertions.

## Verify Steps

### Scope\n- Ensure integrate command behavior remains unchanged while refactoring internal structure.\n\n### Checks\n- bun run typecheck\n- bun run lint\n- bun run test:full\n\n### Evidence / Commands\n- Capture the exact commands run and their exit status in the verification note.\n- Pay special attention to: packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts\n\n### Pass criteria\n- typecheck/lint/test:full all pass.\n- No user-facing behavior changes (CLI output, file layout artifacts, commit messages) except internal file moves.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T14:32:27.044Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run typecheck PASS; bun run lint PASS; bun run test:full PASS (vitest, 704 tests). Refactor only: split integrate cmd core into internal modules; pr-flow tests remain green.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T14:24:12.606Z, excerpt_hash=sha256:5a551037c1c20cb590ad68b7be60775102f1468ac678c8202ae93b26eda5860d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- If verification fails or behavior regresses, revert the implementation commit (git revert <sha>) and re-run bun run test:full.\n- If the refactor introduced import cycles, collapse modules back into cmd.ts and retry extraction with clearer boundaries.
