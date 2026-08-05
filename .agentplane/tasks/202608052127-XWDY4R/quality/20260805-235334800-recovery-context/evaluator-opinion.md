# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- executeEvaluatorSupervisorEpisode treats every intent_recorded journal as a resumable evaluator outcome; when the latest operation is PLANNER/agent_episode it catches validation failure and stops the shared journal as effect_in_doubt.
- acceptExternalAgentResult only accepts a running intent_recorded journal, so a later matching PLANNER result cannot reconcile the effect after the evaluator-induced stop.

## Evidence
- .agentplane/tasks/202608052127-XWDY4R/quality/objects/sha256/89c53905d0d48525cdc39511155336552e5dd2d8df4ea8c35291316ef5daba0d.patch

## Missing Tests
- Evaluator execution with an unrelated pending PLANNER external-agent intent must fail closed without mutating the journal, and the matching result must remain consumable.

## Hidden Assumptions
- The evaluator supervisor assumes any shared intent_recorded operation belongs to EVALUATOR.

## Residual Risks
- Guard evaluator resume by role and kind before any stop transition. Add an externally evidenced recovery path that reopens only the exact matching stopped effect_in_doubt intent without launching another provider operation. Cover both behaviors with regression tests, reconcile this task's PLANNER exchange, then rerun structured verification and EVALUATOR.
