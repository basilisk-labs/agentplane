# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- The patch adds typed results and separate renderers only for integration queue list/doctor and release plan; the approved provider, integration, release, publication, recovery, and ops command surface remains only partially migrated.
- The frozen verification packet contains no command records, runner history, or runtime evidence for the mandatory negative, failure, recovery, parity, and exact-SHA scenarios.
- The new audit metadata is asserted through synthetic renderer fixtures, but the packet does not demonstrate that retries, partial effects, or duplicated-effect prevention are measured from real execution paths.

## Evidence
- .agentplane/tasks/202607221908-7WV0A7/README.md
- .agentplane/tasks/202607221908-7WV0A7/quality/20260801-120857146-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221908-7WV0A7/quality/20260801-120857146-recovery-context/evaluator-observed-checks.json
- .agentplane/policy/dod.code.md

## Missing Tests
- Recorded state-matrix checks for every in-scope provider, integration, release, publication, recovery, and ops operation with and without each required authority.
- Runtime recovery tests covering late checks, network failure, merge conflict, partial publication, bounded retry/timeout, and prevention of duplicated effects.
- Recorded human/JSON/release artifact parity checks proving compatibility and exact-SHA provenance across the full migrated command surface.
- Command-backed records for bun run guards:check, bun run lifecycle:invariants, bun run release:parity, and bun run test:critical, including result and covered scope.

## Hidden Assumptions
- Migrating integration queue list/doctor and release plan is assumed to satisfy the task-wide typed-result and renderer requirement.
- Constant audit fields in constructed results are assumed to represent real retry and side-effect behavior.
- A tester summary is assumed to substitute for the verification evidence contract's exact command and result records.
- Untouched provider, publication, recovery, and ops paths are assumed already compliant with the approved contract.

## Residual Risks
- Continue from the narrowed capability profiles and typed queue/release-plan seams, but treat them as partial remediation. Complete the typed result/error, renderer, exit mapping, retry/wait, and audit migration for every operation named in Scope, then freeze command-backed evidence for all negative, recovery, parity, concurrency, and exact-SHA Verify Steps.
