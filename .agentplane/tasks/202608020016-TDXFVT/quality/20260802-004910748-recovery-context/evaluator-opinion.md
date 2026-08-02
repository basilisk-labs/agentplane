# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The regression suite covers managed-artifact-only base-sync merges but does not cover the separately required lifecycle-only base-sync merge boundary.

## Evidence
- .agentplane/tasks/202608020016-TDXFVT/README.md
- .agentplane/tasks/202608020016-TDXFVT/quality/20260802-004910748-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202608020016-TDXFVT/verification/20260802004856843-75a19cd55dcd95b5.json

## Missing Tests
- Add a branch_pr base-sync merge fixture whose task-side delta is lifecycle-only and assert that resolveQualityReviewTargetSha returns no semantic review target.

## Hidden Assumptions
- The existing non-merge lifecycle-only tests are assumed to prove the new second-parent merge path even though that path has distinct comparison and target-selection logic.

## Residual Risks
- Add and run the missing lifecycle-only base-sync merge negative regression, then regenerate SHA-bound verification evidence for the resulting reviewed head.
