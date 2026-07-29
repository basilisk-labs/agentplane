# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Regression coverage injects recovery_reason directly into route state and does not prove that an evaluator result is persisted, normalized, reloaded, and then routed to the bounded TESTER evidence-refresh episode.

## Evidence
- .agentplane/tasks/202607291449-FTHNAR/quality/20260729-153123032-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607291449-FTHNAR/verification/20260729153045049-45a1e66a801bf33a.json

## Missing Tests
- Add an integration or use-case test that applies a blocked evaluator result with recovery_reason=deterministic_evidence_gap, reloads the task through the backend normalization path, and confirms next-action delegates only to TESTER; then record execution of that test.
- Add the corresponding negative persistence test proving an evaluator block without recovery_reason, or with a non-evidence-gap semantic finding, reloads without selecting evidence refresh.

## Hidden Assumptions
- The newly added recovery_reason field survives evaluator result validation, review persistence, task serialization, backend normalization, and route reconstruction unchanged.
- The focused route tests are representative of persisted production task state even though they bypass the evaluator-review application path.

## Residual Risks
- Verify the recovery discriminator across the complete evaluator-result-to-task-route persistence boundary, including the unrelated-block negative case, and rerun the focused deterministic checks before requesting a fresh EVALUATOR review.
