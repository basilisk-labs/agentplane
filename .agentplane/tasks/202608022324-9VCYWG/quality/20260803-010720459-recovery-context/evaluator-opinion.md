# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Completed-journal recovery can consume an accepted exchange without proving that the completed supervisor operation recorded the same result digest and work-order identity.

## Evidence
- .agentplane/tasks/202608022324-9VCYWG/quality/20260803-010720459-recovery-context/evaluator-diff.patch

## Missing Tests
- Add a completed-journal recovery test where the operation result contains a different result_digest or work_order_id from the accepted exchange; recovery must fail closed and leave the exchange unconsumed.

## Hidden Assumptions
- A completed operation in the task's journal is assumed to correspond to the accepted exchange solely because its intent metadata matches, even though its persisted completion result is not checked.

## Residual Risks
- Before allowing completed-journal recovery to consume an accepted exchange, validate that the completed operation result is structurally present and exactly matches the exchange work_order_id and accepted result_digest; add negative fault-injection coverage for both mismatches.
