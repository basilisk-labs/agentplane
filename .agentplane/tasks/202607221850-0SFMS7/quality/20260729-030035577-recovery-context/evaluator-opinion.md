# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- Committed out-of-scope EXECUTOR changes are accepted as the implementation commit. The finalization guard rejects only dirty non-task paths, then accepts any changed HEAD without inspecting the committed path set against the approved scope.
- The required comparison with the 0.6.24 baseline is still absent. The implementation reports provider episode count, lifecycle-event delta, and declared-check count, but supplies no lifecycle-call, tool-call, or duplicate-context baseline values and no pass/fail comparison.
- The frozen check evidence contains no runner history or verification records for the evaluated SHA, so none of the four declared checks is demonstrated to have run on this revision.

## Evidence
- .agentplane/tasks/202607221850-0SFMS7/quality/20260729-030035577-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221850-0SFMS7/README.md
- .agentplane/policy/dod.core.md
- .agentplane/tasks/202607221850-0SFMS7/quality/20260729-030035577-recovery-context/evaluator-observed-checks.json
- .agentplane/policy/dod.code.md

## Missing Tests
- An end-to-end case where the EXECUTOR commits a file outside the approved scope and the supervisor returns a typed drift/out-of-scope stop before verification and finish.
- A golden-scenario measurement test that compares lifecycle calls, tool calls, duplicate-context volume, verified success, and safety against the 0.6.24 baseline with explicit thresholds.
- Recorded execution of bun run ci:contract, bun run coverage:workflow-suite, bun run lifecycle:invariants, and bun run test:critical against evaluated SHA da88b1ed4305b3a70bf39633cf3739fb5e4f4609.

## Hidden Assumptions
- Any HEAD change distinct from the pre-execution commit is assumed to belong to the approved implementation scope.
- Three local counters are assumed to be sufficient evidence of lower orchestration cost despite the contract requiring a comparison with an external baseline.
- Unit tests embedded in the patch are assumed to pass even though the frozen observed-check evidence records no execution.

## Residual Risks
- The previous finalization, declared-check, and stale-route defects appear addressed in code, but replacement evaluation cannot pass yet: validate committed paths against approved scope, add the explicit 0.6.24 cost/quality comparison, and provide recorded results for every declared check on the evaluated SHA.
