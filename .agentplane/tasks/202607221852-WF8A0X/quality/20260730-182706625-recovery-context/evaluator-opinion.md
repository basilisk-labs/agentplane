# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- An interruption after writing the source-task selection marker but before writing the selection receipt leaves an unrecoverable partial handoff: retry exits because the source already has a current CURATOR owner and never completes the missing receipt.

## Evidence
- .agentplane/tasks/202607221852-WF8A0X/quality/20260730-182706625-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221852-WF8A0X/README.md

## Missing Tests
- Interrupt or fail immediately after the source task receives context_task_extraction but before the proposal selection receipt is written; retry must adopt the same CURATOR task and complete the missing receipt.
- Force selection-receipt persistence to fail after the source marker write and verify that a later retry converges without creating another CURATOR task.

## Hidden Assumptions
- Writing the source-task selection marker and the selection receipt will complete without interruption once CURATOR task adoption has succeeded.
- A source marker always implies that the corresponding durable selection receipt already exists and is complete.

## Residual Risks
- Make retry recovery distinguish a complete existing selection from a partial marker-only handoff. When the exact CURATOR task and selection intent match but the receipt is absent, resume receipt creation instead of rejecting the selection; add interruption coverage at that boundary.
