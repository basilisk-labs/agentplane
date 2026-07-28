# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- A different or stale semantic result can be accepted after the ingest journal has advanced beyond semantic_result_received, while completed mechanical phases are reused without applying or validating that result.
- The verification evidence does not demonstrate the required per-gate failure matrix, repeated semantic-rework limits, or stale-result scenario; the added supervisor tests exercise only one mechanical failure and one rework round.

## Evidence
- .agentplane/tasks/202607221850-8HBF4J/quality/20260728-214115790-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221850-8HBF4J/README.md
- .agentplane/tasks/202607221850-8HBF4J/quality/20260728-214115790-recovery-context/evaluator-observed-checks.json

## Missing Tests
- Reject a different semantic fingerprint when the run is already past semantic_result_received and is not in semantic_rework_requested.
- Fail and resume every registered mechanical gate, proving that only the failed operation is retried and prior effects are not duplicated.
- Exercise multiple evaluator-rework rounds through episode, token, and no-progress exhaustion while preserving the shared durable cursor and usage.
- Exercise a corrected semantic result after semantic_rework_requested and prove that all result-dependent mechanical phases are rerun against the new fingerprint.

## Hidden Assumptions
- The extraction file supplied on resume is assumed to contain the same semantic result already recorded in the ingest journal.
- Phase rank is assumed to prove that completed effects correspond to the currently supplied semantic fingerprint.
- A single wiki_lint retry is assumed to represent retry safety for all mechanical operations.
- One evaluator-rework round is assumed to establish bounded behavior across repeated rounds.

## Residual Risks
- Bind the supplied semantic fingerprint to resume eligibility before consulting phase completion. Reject fingerprint drift unless the journal is in semantic_rework_requested; after an accepted replacement result, invalidate or restart every result-dependent mechanical phase. Add the full per-gate retry, stale-result, corrected-result, and repeated-rework budget tests required by the task Verify Steps.
