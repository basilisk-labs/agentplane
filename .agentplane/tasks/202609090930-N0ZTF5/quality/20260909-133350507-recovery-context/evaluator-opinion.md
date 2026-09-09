# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- The frozen actual diff still adds approvedRecoveryPlan, implementationPlanDigest and approvedValidationRefinement to external-agent-implementation-recovery.ts; evidence-only-rework-commit.ts is unchanged. This does not implement the current approved Plan requiring extraction into the existing helper module while retaining all gates.
- The frozen verification record only runs the two focused regression files. It does not establish the mandatory bun run typecheck and bun run ci:local:full acceptance criteria. A narrow regression pass cannot establish task_outcome for the unfinished extraction.

## Evidence
- .agentplane/tasks/202609090930-N0ZTF5/quality/objects/sha256/e35f461db092ed47a54e5b3d30eb3949214f4d5a1e12a2f25780ffaddf612b88.patch

## Missing Tests
- Run typecheck and full local CI on the completed three-file extraction and retain the focused positive/negative recovery regressions.

## Hidden Assumptions
- The automatically recorded task_outcome assumes the focused regression command proves the newly approved extraction and full CI requirements; the frozen diff and check record do not support that assumption.

## Residual Risks
- Preserve the existing draft and the approved plan. Complete only the approved helper extraction within recovery.ts, recovery.test.ts and evidence-only-rework-commit.ts, with no circular dependency. Run focused regressions, typecheck and full local CI; do not waive the size limit or change the execution base. No installed CLI, publication, Arkady Factory or live runtime mutation is authorized by this task.
