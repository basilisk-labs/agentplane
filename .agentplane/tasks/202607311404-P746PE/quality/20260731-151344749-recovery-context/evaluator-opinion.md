# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The frozen evaluator target is 8a7f4e640022b355662b36f6b50ac8bf7a3aa65f, while the latest recorded verification targets 0af1c1a648db15f88a72571b7411cd5ebe8ca7ac; evaluator preparation consequently freezes no verification records.

## Evidence
- .agentplane/tasks/202607311404-P746PE/README.md
- .agentplane/tasks/202607311404-P746PE/quality/20260731-151344749-recovery-context/evaluator-observed-checks.json
- .agentplane/tasks/202607311404-P746PE/quality/20260731-151344749-recovery-context/evaluator-diff.patch

## Missing Tests
- Add an end-to-end regression that records verification at the semantic implementation commit, then applies the complete pre-merge closure sequence—including quality artifacts, evaluator artifacts, verification artifacts, and DONE task README updates—and asserts that a newly prepared evaluator work order retains the same evaluated_sha and freezes the verification record.
- Assert that evaluator-observed-checks.json contains the accepted verification record for this full lifecycle fixture, not merely that isolated resolver calls return an expected SHA.

## Hidden Assumptions
- The implementation assumes every post-verification lifecycle commit will be classified as skippable managed or authority-only metadata; the frozen packet shows at least one later task-artifact commit is instead selected as a new review target.
- Focused fixtures are assumed to model the complete pre-merge closure artifact sequence, but they did not reproduce the frozen episode's empty verification_records outcome.

## Residual Risks
- Rework semantic target resolution against the complete closure history from 0af1c1a648db15f88a72571b7411cd5ebe8ca7ac through 8a7f4e640022b355662b36f6b50ac8bf7a3aa65f. Identify which lifecycle artifact is treated as independently reviewable, preserve freshness for genuine semantic task metadata, and add an end-to-end assertion that verification implementation_sha, evaluator evaluated_sha, and the frozen verification record remain identical and non-empty.
