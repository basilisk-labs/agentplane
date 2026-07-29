# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The tracking-ref helper fetches without a forced refspec, so it can reject a legitimate rewritten task head when the constrained checkout already has a stale tracking ref. This breaks rebased-branch publication and protected integration recovery.

## Evidence
- .agentplane/tasks/202607291449-FTHNAR/quality/20260729-173309191-recovery-context/evaluator-diff.patch

## Missing Tests
- Add a constrained-refspec regression where the tracking ref already points to the old task head, the remote task branch is rewritten through the force-with-lease publication path, and refresh must update the tracking ref to the rewritten head.
- Add an integration-preparation test using a real Git repository with a stale, non-ancestor tracking ref; the current mocked test proves invocation but not successful non-fast-forward refresh.

## Hidden Assumptions
- The implementation assumes an explicit fetch refspec without a leading force marker can always replace an existing remote-tracking ref, including when the published branch history was rewritten.

## Residual Risks
- Make the bounded tracking-ref refresh support legitimate non-fast-forward task-branch updates, then verify both publication and integration preparation with a stale tracking ref under a constrained remote.fetch configuration.
