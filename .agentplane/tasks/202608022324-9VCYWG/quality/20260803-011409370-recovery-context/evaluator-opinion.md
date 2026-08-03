# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Budget-exhausted recovery can consume an accepted result without binding the completed operation to the current postcondition fingerprint.

## Evidence
- .agentplane/tasks/202608022324-9VCYWG/quality/20260803-011409370-recovery-context/evaluator-diff.patch

## Missing Tests
- Add a crash-recovery test where completion exhausts the supervisor budget, the exchange remains accepted, and the current route fingerprint differs; recovery must reject the stale result and leave the exchange unconsumed.
- Add the corresponding budget-exhausted recovery success case proving the stopped journal records and validates the matching postcondition before consumption.

## Hidden Assumptions
- The implementation assumes a completed external-agent operation cannot enter the budget_exhausted stopped phase before exchange consumption, although that phase is explicitly accepted by the recovery classifier.

## Residual Risks
- Update budget-exhausted completed-operation recovery to advance or otherwise validate the stopped journal's operation and journal postcondition fingerprints before marking the exchange consumed, then cover matching and stale fingerprints with focused tests.
