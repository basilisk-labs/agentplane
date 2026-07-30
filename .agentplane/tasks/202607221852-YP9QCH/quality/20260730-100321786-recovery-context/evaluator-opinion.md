# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The read failure branch returns basename instead of no term, so a vanished source path can create stale candidate evidence.

## Evidence
- .agentplane/tasks/202607221852-YP9QCH/quality/20260730-100321786-recovery-context/evaluator-diff.patch

## Missing Tests
- Unreadable manifest entry produces no candidate term or candidate group.

## Hidden Assumptions
- A source path remains evidence after its content cannot be read.

## Residual Risks
- Return basename null from the read failure path and add the unreadable-source regression beside the deleted-source fixture.
