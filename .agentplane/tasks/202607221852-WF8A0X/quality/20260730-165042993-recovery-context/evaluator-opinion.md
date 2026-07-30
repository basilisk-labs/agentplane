# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- Every completed task becomes a proposal because task_pr_decision is added unconditionally, so transient and noisy tasks are not filtered before proposal creation.
- Proposal signals are derived from the full task text, but every proposal cites only README lines 1-80; signals originating later in the task record can therefore lack exact supporting evidence, and no PR, diff, or evaluator reference is attached.
- The frozen check record contains no verification records, runner history, or runtime evidence, and its note lists focused checks rather than the three declared acceptance commands.

## Evidence
- .agentplane/tasks/202607221852-WF8A0X/quality/20260730-165042993-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221852-WF8A0X/quality/20260730-165042993-recovery-context/evaluator-observed-checks.json

## Missing Tests
- A completed task containing only transient implementation details produces no knowledge proposal.
- A durable signal located after README line 80 receives an exact source reference covering that signal, or is rejected.
- Proposal provenance includes available PR, diff, decision, and evaluator references and rejects unsupported signals.
- Recorded execution of bun run task-state:check, bun run test:critical, and bun run typecheck at the evaluated SHA.
- Concurrent or repeated harvest and selection attempts preserve one proposal identity, one selection receipt, and one CURATOR owner without overwriting active work.

## Hidden Assumptions
- Every completed task or task/PR decision is inherently a durable-knowledge candidate.
- README lines 1-80 always contain the evidence used by full-record signal detection.
- An explicit task ID is sufficient semantic selection even when the generated proposal has not demonstrated durable content.
- A verification note without runner or runtime records proves the declared acceptance commands passed at the evaluated SHA.

## Residual Risks
- Filter proposal creation to explicit durable signals, bind each signal to the exact evidence span and available task/PR/diff/evaluator provenance, add transient and concurrency-sensitive negative tests, and provide deterministic records for all declared acceptance commands.
