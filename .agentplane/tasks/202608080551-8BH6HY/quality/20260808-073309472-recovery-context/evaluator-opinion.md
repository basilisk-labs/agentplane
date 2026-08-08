# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Verification rework is considered addressed after any later DOING status event, even when that event did not record a new implementation commit.

## Evidence
- .agentplane/tasks/202608080551-8BH6HY/quality/objects/sha256/0d8205290b2e749c44fb2689ec51d656d3c4557641356fe8aca7013418a18a52.patch
- .agentplane/tasks/202608080551-8BH6HY/README.md

## Missing Tests
- Add a negative routing test where verification is needs_rework, the existing failed commit remains unchanged, and an unrelated later DOING-to-DOING status event occurs; implementation_rework_required must remain present.
- Add a positive test proving convergence is tied to durable recording of a different implementation commit, rather than only event time and status.

## Hidden Assumptions
- Every DOING-targeting status event after failed verification is assumed to represent a newly recorded implementation, although the event schema and predicate do not bind that event to task.commit.

## Residual Risks
- Bind rework convergence to evidence that a new implementation commit was durably recorded after the failed verification, and cover an unrelated later DOING event as a negative case.
