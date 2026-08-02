# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- A non-base merge is misclassified as a configured-base merge whenever its MERGE_HEAD is any ancestor of the current configured base tip.

## Evidence
- .agentplane/tasks/202608020147-VMBX4H/quality/20260802-020617666-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202608020147-VMBX4H/README.md

## Missing Tests
- Add a non-base merge regression where MERGE_HEAD is reachable from the configured base tip; assert that pre-commit and commit-msg preserve the original staged-path set rather than applying base-sync attribution.

## Hidden Assumptions
- Any single MERGE_HEAD that is an ancestor of the configured base tip is assumed to identify a configured-base merge, although this condition also matches topic or historical commits reachable from that base.

## Residual Risks
- Tighten configured-base merge identification so reachability alone cannot classify non-base merges, then add the missing reachable-topic regression for both hook paths and rerun the declared verification set.
