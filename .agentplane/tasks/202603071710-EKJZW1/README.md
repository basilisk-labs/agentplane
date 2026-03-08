---
id: "202603071710-EKJZW1"
title: "Clean up historical task archive noise"
result_summary: "Compacted historical doctor noise into grouped warnings without weakening current-state errors."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202603071710-W5BWB6"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T19:37:24.171Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-07T19:43:11.503Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts; Result: pass; Evidence: 14 tests passed, including new aggregation coverage for repeated unknown-hash and close-commit flood cases. Scope: doctor reporting logic and regression coverage. Command: bun run lint:core -- packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.command.test.ts; Result: pass; Evidence: eslint clean after switching historical summary grouping to toSorted(). Scope: touched doctor source and tests. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0 on the implementation commit. Scope: updated doctor runtime bundle. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor; Result: pass; Evidence: doctor now reports 2 warnings instead of hundreds, summarizing 218 unknown historical hashes and 21 close-commit archive cases while preserving actionable error class for missing implementation hash in tests. Scope: real-repo doctor output under current framework-dev stale-dist guard."
commit:
  hash: "7d4822df59ccd6ff03827d6173296812a84bc25d"
  message: "🩺 EKJZW1 code: compact historical doctor noise"
comments:
  -
    author: "CODER"
    body: "Start: compact historical doctor noise without hiding actionable commit invariant failures."
  -
    author: "CODER"
    body: "Verified: doctor now summarizes historical task-archive noise while keeping actionable commit invariant failures visible."
events:
  -
    type: "status"
    at: "2026-03-07T19:37:31.006Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: compact historical doctor noise without hiding actionable commit invariant failures."
  -
    type: "verify"
    at: "2026-03-07T19:43:11.503Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts; Result: pass; Evidence: 14 tests passed, including new aggregation coverage for repeated unknown-hash and close-commit flood cases. Scope: doctor reporting logic and regression coverage. Command: bun run lint:core -- packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.command.test.ts; Result: pass; Evidence: eslint clean after switching historical summary grouping to toSorted(). Scope: touched doctor source and tests. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0 on the implementation commit. Scope: updated doctor runtime bundle. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor; Result: pass; Evidence: doctor now reports 2 warnings instead of hundreds, summarizing 218 unknown historical hashes and 21 close-commit archive cases while preserving actionable error class for missing implementation hash in tests. Scope: real-repo doctor output under current framework-dev stale-dist guard."
  -
    type: "status"
    at: "2026-03-07T19:43:21.111Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: doctor now summarizes historical task-archive noise while keeping actionable commit invariant failures visible."
doc_version: 3
doc_updated_at: "2026-03-07T19:43:21.111Z"
doc_updated_by: "CODER"
description: "Reduce doctor noise from legacy task metadata and historical archive inconsistencies without hiding actionable current-state failures."
id_source: "generated"
---
## Summary

Clean up historical task archive noise

Reduce doctor noise from legacy task metadata and historical archive inconsistencies without hiding actionable current-state failures.

## Scope

- In scope: Reduce doctor noise from legacy task metadata and historical archive inconsistencies without hiding actionable current-state failures..
- Out of scope: unrelated refactors not required for "Clean up historical task archive noise".

## Plan

1. Rework doctor's DONE-task commit invariant reporting so historical archive drift is aggregated into compact warning summaries instead of one-line-per-task flood, while keeping missing implementation hashes as direct actionable errors. 2. Cover the new reporting model with doctor.command tests, including multi-task historical noise cases and preservation of single-task warning behavior where appropriate. 3. Run targeted doctor tests, lint the touched files, rebuild agentplane, and verify that doctor still reports actionable current-state failures while reducing archive noise.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
1. `bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts`
2. `bun run lint:core -- packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.command.test.ts`
3. `bun run --filter=agentplane build`
4. `agentplane doctor`

### Evidence / Commands
- Record the exact commands and whether doctor now summarizes historical archive noise instead of printing one warning per archived task.

### Pass criteria
- Missing implementation hashes still fail doctor as actionable current-state errors.
- Historical unknown hashes and close-commit misuse are summarized compactly.
- The task does not hide new current-state failures.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T19:43:11.503Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts; Result: pass; Evidence: 14 tests passed, including new aggregation coverage for repeated unknown-hash and close-commit flood cases. Scope: doctor reporting logic and regression coverage. Command: bun run lint:core -- packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.command.test.ts; Result: pass; Evidence: eslint clean after switching historical summary grouping to toSorted(). Scope: touched doctor source and tests. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0 on the implementation commit. Scope: updated doctor runtime bundle. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor; Result: pass; Evidence: doctor now reports 2 warnings instead of hundreds, summarizing 218 unknown historical hashes and 21 close-commit archive cases while preserving actionable error class for missing implementation hash in tests. Scope: real-repo doctor output under current framework-dev stale-dist guard.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T19:37:31.006Z, excerpt_hash=sha256:b03069c55ee600c61b982ea552b50e0d5c95275d4236303c07ca3f28e6b142d4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Treat task-archive drift as a reporting problem first, not as a data-migration task.
- Prefer aggregated counts plus representative examples over silent suppression.
- Do not weaken the missing implementation hash invariant, because that still describes current-state traceability failure.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
