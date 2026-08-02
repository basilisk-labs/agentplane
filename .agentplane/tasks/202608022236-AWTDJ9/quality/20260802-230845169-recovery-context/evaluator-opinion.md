# Semantic quality review: pass

Provenance: evaluator_supplied

EVALUATOR returned pass with 2 typed finding(s).

## Findings
- When a task branch survives merge, its head is selected before finalized evaluator evidence and is reduced through the existing semantic resolver; therefore any newer semantic commit changes the verification target and invalidates the older record.
- When the branch is absent after rebase merge and hosted close is recorded, the narrow DONE/pass/MERGED/recorded_on_base guard retains the reviewed pre-merge SHA instead of comparing unrelated rewritten base history.

## Evidence
- .agentplane/tasks/202608022236-AWTDJ9/quality/20260802-230845169-recovery-context/evaluator-diff.patch

## Missing Tests
- none recorded

## Hidden Assumptions
- PrFlowStatusReport.branch.headSha is null only when no authoritative live task-branch head is available; the existing flow-status contract and tests are relied upon for that distinction.

## Residual Risks
- none recorded
