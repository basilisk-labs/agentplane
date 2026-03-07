---
id: "202603071710-EKJZW1"
title: "Clean up historical task archive noise"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: compact historical doctor noise without hiding actionable commit invariant failures."
events:
  -
    type: "status"
    at: "2026-03-07T19:37:31.006Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: compact historical doctor noise without hiding actionable commit invariant failures."
doc_version: 2
doc_updated_at: "2026-03-07T19:37:31.006Z"
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

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

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

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Notes

- Treat task-archive drift as a reporting problem first, not as a data-migration task.
- Prefer aggregated counts plus representative examples over silent suppression.
- Do not weaken the missing implementation hash invariant, because that still describes current-state traceability failure.
