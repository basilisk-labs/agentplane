# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The qualification evidence was generated for subject 9bd2a5fe2465eb6ea03ed7bb318acde36ac69e96, not the frozen evaluated SHA 9bd2a5fe2465a8dd4ad6d4384cf765546c941141.

## Evidence
- .agentplane/cache/v0.7.1-qualification/9bd2a5fe2465eb6ea03ed7bb318acde36ac69e96/report.json
- .agentplane/tasks/202608021125-DR7J1E/verification/20260802124531028-1210e0ba5832ecb9.json
- .agentplane/tasks/202608021125-DR7J1E/quality/20260802-124916756-recovery-context/evaluator-diff.patch

## Missing Tests
- Add a negative test requiring the supplied qualification subject to equal the repository HEAD used to build the candidate, and reject dirty or content-mismatched candidate packages.
- Regenerate and verify the complete qualification evidence against the exact frozen evaluated SHA.

## Hidden Assumptions
- The caller-supplied --subject value identifies the source tree and packed candidate even though the benchmark records it without binding it to Git HEAD or package content.

## Residual Risks
- Regenerate the frozen verification and runtime evidence from exact SHA 9bd2a5fe2465a8dd4ad6d4384cf765546c941141 after binding subject identity to the checked-out and packaged candidate; then rerun evaluator review.
