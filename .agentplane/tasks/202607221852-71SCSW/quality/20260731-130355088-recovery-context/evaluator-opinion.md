# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- A completed integration.enqueue journal was converted to terminal stale_state when the later pr.head.publish step opened against a new fingerprint, so safe sequential branch_pr operations cannot resume across normal task/authority mutations.

## Evidence
- .agentplane/tasks/202607221852-71SCSW/quality/20260731-130355088-recovery-context/evaluator-diff.patch

## Missing Tests
- Regression for a completed persisted workflow operation followed by a different operation after an externally changed route fingerprint.

## Hidden Assumptions
- The persisted workflow loop assumed every next mechanical step would be reached only through the immediately refreshed postcondition fingerprint.

## Residual Risks
- Reuse the existing completed-operation stale-state reopen contract for persisted workflow operations: allow reopening only when the latest operation is completed, then retry start once; preserve terminal behavior for running, failed, or effect-in-doubt operations.
