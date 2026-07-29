# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- The recovery predicate does not establish that the evaluator block was caused only by missing deterministic verification evidence. Any current evaluator-supplied blocked review with a finding and quality-report reference is delegated to TESTER, including unrelated semantic or scope blocks.
- The predicate contains no verification-versus-review freshness comparison. After TESTER records refreshed evidence without changing the reviewed SHA, the same blocked review can still satisfy the predicate and select another evidence-refresh episode instead of returning control to EVALUATOR.

## Evidence
- .agentplane/tasks/202607291449-FTHNAR/quality/20260729-150152622-recovery-context/evaluator-diff.patch

## Missing Tests
- A blocked evaluator review for a semantic implementation defect, with the same SHA, findings, and quality-report evidence reference, must remain non-mutating and must not delegate to TESTER.
- After TESTER records verification newer than the blocked evaluator review for the same implementation SHA, route recomputation must delegate to EVALUATOR rather than emit another quality-evidence-refresh episode.
- A blocked review lacking an explicit machine-readable deterministic-evidence-gap classification must not enter the refresh route.

## Hidden Assumptions
- A quality-report evidence reference and a non-empty findings array uniquely identify a missing deterministic verification-evidence block.
- Recording verification automatically changes or invalidates the blocked quality-review state sufficiently to prevent the recovery predicate from matching again.
- Free-form evaluator findings can safely drive a privileged workflow transition without an explicit typed recovery reason.

## Residual Risks
- Narrow eligibility to an explicit deterministic-evidence-gap signal and add a freshness/consumption condition so one TESTER verification record terminates recovery and routes the unchanged work unit back to EVALUATOR; retain unrelated blocked reviews as non-mutating.
