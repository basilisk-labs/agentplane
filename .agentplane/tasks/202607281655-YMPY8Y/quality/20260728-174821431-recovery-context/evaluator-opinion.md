# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- Replacement authorization and lineage are not enforced atomically by the supervisor journal state machine.
- Frozen verification evidence does not substantiate the declared checks or the required real replacement episode.

## Evidence
- .agentplane/tasks/202607281655-YMPY8Y/quality/20260728-174821431-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607281655-YMPY8Y/quality/20260728-174821431-recovery-context/evaluator-observed-checks.json
- .agentplane/tasks/202607281655-YMPY8Y/README.md

## Missing Tests
- A core state-machine test proving that preparing a replacement cannot be followed by an unbound or differently bound operation.
- A test proving replacement_of_operation_key cannot be supplied through the generic start path without a matching terminal operation_failed authorization.
- Command-level tests for --replacement rejection after effect_in_doubt and after each exhausted budget dimension.
- The declared real read-only --replacement provider episode for task 202607221850-8HBF4J, with evidence that the original failed operation remains unchanged and no provider effect is replayed.

## Hidden Assumptions
- Only executeEvaluatorSupervisorEpisode will call the exported replacement preparation and generic start functions in the required sequence.
- Passing --replacement constitutes sufficient durable authorization even though the journal does not persist a pending authorized replacement before the next operation starts.
- A replacement cannot be interleaved with another caller or operation between journal preparation and operation start.
- The verification summary accurately represents successful commands despite the frozen observed-checks artifact containing no command records.

## Residual Risks
- Make replacement authorization and lineage one atomic journal transition, or persist a pending replacement constraint that start must consume only for the exact failed operation key. Reject arbitrary replacement metadata on generic starts, add negative and concurrency/interleaving coverage, and provide frozen command-level check evidence; retain the real provider episode as a required post-integration proof if it cannot validly run before integration.
