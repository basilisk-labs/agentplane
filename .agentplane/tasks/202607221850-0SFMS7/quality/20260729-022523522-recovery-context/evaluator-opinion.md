# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- The supervisor reports the task as finalized without executing the task finish lifecycle operation.
- A passing evaluator verdict is converted into formal verification without evidence that the declared checks ran.
- The frozen evidence does not demonstrate the required golden-path metrics comparison or concurrency-sensitive stale-route behavior.

## Evidence
- .agentplane/tasks/202607221850-0SFMS7/quality/20260729-022523522-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221850-0SFMS7/README.md
- .agentplane/tasks/202607221850-0SFMS7/quality/20260729-022523522-recovery-context/evaluator-observed-checks.json
- .agentplane/policy/dod.code.md

## Missing Tests
- An end-to-end direct golden-path test proving that a passing evaluator is followed by declared checks, recorded verification, the real task finish lifecycle transition, and a terminal route.
- A failure-path test proving that any failed or absent declared check prevents verification and finalization.
- A concurrency/stale-state test that mutates route state between each formal post-operation and proves no stale verify or finish operation executes.
- A baseline-metrics check comparing lifecycle calls, tool calls, duplicate context, verified success, and safety against version 0.6.24.
- An out-of-scope write test for the new supervisor path, as explicitly required by the task Verify Steps.

## Hidden Assumptions
- An independent evaluator pass is assumed to substitute for execution of the task's declared verification commands.
- Writing a durable journal entry named finalize is assumed to be equivalent to completing the task lifecycle.
- Two pre-operation iterations are assumed sufficient for every valid direct route without evidence covering route variation or retries.
- Fresh route recomputation is assumed to prevent concurrency races even though no frozen check demonstrates drift between post-operations.

## Residual Risks
- Replace the no-op finalize journal action with the actual CLI-owned finish transition, gate verification on recorded results for every declared check or approved skips, and add end-to-end evidence for stale-route concurrency, required negative cases, and the 0.6.24 metrics comparison before requesting reevaluation.
