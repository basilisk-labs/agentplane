# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- Replacement authorization and lineage are not enforced by the supervisor journal state machine.
- Frozen verification evidence does not demonstrate the required real replacement episode or provide command-level check records.

## Evidence
- .agentplane/tasks/202607281655-YMPY8Y/quality/20260728-174557020-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607281655-YMPY8Y/quality/20260728-174557020-recovery-context/evaluator-observed-checks.json
- .agentplane/tasks/202607281655-YMPY8Y/README.md
- .agentplane/policy/dod.code.md

## Missing Tests
- At the core state-machine boundary, prepare a replacement and then attempt to start without replacement_of_operation_key; the start must be rejected.
- Attempt to start a replacement with a replacement_of_operation_key that does not equal the latest failed operation key; the start must be rejected.
- Attempt to attach replacement_of_operation_key to a normal non-replacement episode; the start must be rejected.
- Record and validate the required real read-only --replacement provider episode after integration, including preservation of the original failed operation and creation of a distinct linked work order.

## Hidden Assumptions
- Only executeEvaluatorSupervisorEpisode will call the exported replacement preparation and start APIs.
- Passing --replacement is sufficient authorization even though no durable replacement-ready state or authorization record is encoded before start.
- Callers will always copy the latest failed operation key correctly into both operation_identity and replacement_of_operation_key.
- The verification summary is an adequate substitute for command-level evidence and the required real provider episode.

## Residual Risks
- Encode replacement authorization and the expected failed-operation key in durable validated journal state, require startSupervisorExecutionEpisode to consume that state with an exact lineage match, reject replacement metadata outside that state, add negative core tests, and attach command-level plus real-provider verification evidence before reevaluation.
