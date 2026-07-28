# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- A failed task-state mutation can leave behind a durable verification record that falsely appears successful and is later frozen as authoritative evaluator evidence.

## Evidence
- .agentplane/tasks/202607282157-FT85MC/quality/20260728-224507238-recovery-context/evaluator-diff.patch

## Missing Tests
- Force executeTaskVerificationTransitionRequest or applyTaskMutation to fail after writeJsonStableIfChanged succeeds, then assert that no authoritative verification record remains or that the record is explicitly invalidated and excluded from evaluator evidence discovery.

## Hidden Assumptions
- Once the verification JSON write succeeds, the subsequent task transition and backend persistence cannot fail.
- Every file under the task verification directory represents a successfully accepted verification outcome.

## Residual Risks
- Make durable verification evidence and the accepted task transition atomic or introduce a committed/invalidated state that verificationRecordPaths excludes; then add the post-write transition-failure regression test and rerun the focused evaluator and verification suites.
