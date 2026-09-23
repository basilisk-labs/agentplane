# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The diff-base fallback can exclude task-owned changes. resolveIntegratedBaseFromTaskUpstream selects the first qualifying second parent from any published merge, without establishing that it belongs to the configured base branch. If a task merges a feature branch descended from the local base, that feature tip satisfies both ancestry checks and becomes the review base, hiding its changes from the evaluator.

## Evidence
- .agentplane/tasks/202609231207-R59HKK/quality/objects/sha256/b62f2aa81cf989ed4066eed7a13bdfafe0a259b324469b0fcf7cae04b1fc5872.patch

## Missing Tests
- Publish a task head containing a merge from a feature branch while base tracking remains unchanged; assert that the frozen diff retains the feature branch changes.
- Merge the intended base, then merge another task-owned branch; assert that recovery selects the integrated base rather than the newest merge's second parent.

## Hidden Assumptions
- Every qualifying second parent in published task history represents an integrated base update.

## Residual Risks
- All supplied evidence digests matched. The frozen verification record reports the required checks passing for the evaluated SHA; checks were not rerun. Constrain fallback selection to evidence identifying the intended base, preserve the existing base when that identity cannot be established, and cover non-base merges before repeating evaluation.
