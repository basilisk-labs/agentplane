# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- The evaluated revision has no frozen verification records or runner history for any declared mandatory check, while the task was marked verified by CODER with no command evidence.
- The required 0.6.24 cost comparison remains synthetic: candidate lifecycle, tool-call, duplicate-context, and safety values are hard-coded in a unit test instead of being derived from an executed direct golden-path episode; baseline tool calls are inferred from an expected trace rather than observed measurements.
- The patch updates the repository clone baseline to the current duplication totals after the mandatory contract check had failed, without frozen evidence showing that the increase was approved or that the evaluated SHA subsequently passed the contract check.

## Evidence
- .agentplane/tasks/202607221850-0SFMS7/quality/20260729-052029728-recovery-context/evaluator-observed-checks.json
- .agentplane/tasks/202607221850-0SFMS7/README.md
- .agentplane/policy/dod.code.md
- .agentplane/tasks/202607221850-0SFMS7/quality/20260729-052029728-recovery-context/evaluator-diff.patch
- .agentplane/policy/dod.core.md

## Missing Tests
- Execute the complete direct golden-path scenario through the real supervision boundary and assert observed lifecycle calls, durable tool operations, duplicate executor-context bytes, verified success, lifecycle ownership, and committed-scope enforcement against the frozen 0.6.24 baseline.
- Record and freeze successful results for bun run ci:contract, bun run coverage:workflow-suite, bun run lifecycle:invariants, and bun run test:critical on evaluated SHA 21049ad1809d882215c83ad97350aa5dd6cdb36d.
- Run a route-mutation scenario after each mutating supervisor operation and prove that no stale operation is executed, including verification-to-evaluator and evaluator-to-finish boundaries.
- Verify approval-required, missing-knowledge, evaluator-rework, out-of-scope-write, and adapter-crash cases through the integrated CLI path rather than only mocked unit boundaries.

## Hidden Assumptions
- A CODER-authored verification state with no frozen verification record is treated as equivalent to executed, independently reviewable checks.
- Hard-coded candidate metrics and expected lifecycle traces are treated as measurements of a real supervised episode.
- Raising the clone baseline is assumed to be an acceptable fix for the failed mandatory contract check without explicit scope approval or a frozen successful rerun.
- Mocked route decisions are assumed to cover concurrency-sensitive state drift at the actual persistence and CLI boundaries.

## Residual Risks
- Rework must preserve the implemented supervision changes while replacing synthetic claims with a frozen end-to-end direct episode, restoring evidence-backed verification for every declared check on the evaluated SHA, and either reverting the clone-baseline relaxation or documenting explicit approval plus a successful contract rerun. Re-evaluation should use observed artifacts that prove stale-route handling and all required typed negative stops across real CLI boundaries.
