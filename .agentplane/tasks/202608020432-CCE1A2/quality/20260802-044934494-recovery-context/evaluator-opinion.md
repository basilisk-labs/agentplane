# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Dependency closure trusts the entire current root task, so post-review removal of a declared dependency can silently remove that dependency from SHA-bound qualification.

## Evidence
- .agentplane/tasks/202608020432-CCE1A2/quality/20260802-044934494-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202608020432-CCE1A2/README.md

## Missing Tests
- Add a negative regression test that removes an existing root dependency after the reviewed implementation SHA and confirms packet creation fails closed or still validates the reviewed dependency closure.
- Add a negative regression test for other non-lifecycle root changes after the reviewed SHA to prove the exemption is limited to lifecycle fields.

## Hidden Assumptions
- The current root task differs from its reviewed-SHA version only in lifecycle fields.
- Root dependency declarations cannot be removed or otherwise altered between the reviewed SHA and packet creation.

## Residual Risks
- Constrain the root exemption to verified lifecycle-only drift, or derive and validate dependency IDs against the reviewed root so post-review dependency removal cannot shrink the SHA-bound closure. Extend regression coverage beyond the status-only positive case.
