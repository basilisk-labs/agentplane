# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- The patch migrates command capability declarations and loaders but does not implement the approved typed results/errors, centralized rendering and exit mapping, retry/wait, or audit surfaces.
- Read-oriented integration queue operations such as list and doctor receive the full provider-write profile, including backend/task writes and git mutation, so capabilities are not classified per operation.
- The frozen verification record contains only a summary assertion and no command records, runner history, or runtime evidence demonstrating the required negative and recovery scenarios.

## Evidence
- .agentplane/tasks/202607221908-7WV0A7/README.md
- .agentplane/tasks/202607221908-7WV0A7/quality/20260801-113550169-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221908-7WV0A7/quality/20260801-113550169-recovery-context/evaluator-observed-checks.json
- .agentplane/policy/dod.code.md

## Missing Tests
- Per-operation denial tests proving read-only integration queue commands cannot request backend.write, task.write, git.mutate, route.remote, or provider capabilities unless their behavior explicitly requires them.
- State-matrix tests for authorized and unauthorized provider/integration/release operations with typed and audited outcomes.
- Failure and recovery tests for late checks, network failure, merge conflict, partial publication, retry bounds, and duplicate-effect prevention.
- Human/JSON renderer and release-artifact parity tests covering typed success and failure results with exact-SHA provenance.

## Hidden Assumptions
- A shared provider-write profile is sufficiently granular for every mutating and diagnostic integration operation.
- Existing command handlers already provide the typed results, centralized rendering, exit mapping, retry behavior, and audit semantics required by the approved plan.
- The verification summary accurately covers all required negative and concurrency-sensitive scenarios despite the frozen packet containing no command-level or runtime evidence.

## Residual Risks
- Continue from evaluated SHA d53ad1acb3f9473a2f5e493035b8bb8ba7b049fa: split provider/integration/release/ops requirements into exact per-operation profiles, complete the typed-result/rendering/retry/audit portion of the approved plan, and attach deterministic evidence for the specified negative, recovery, parity, and concurrency-sensitive scenarios.
