# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- A branch_pr review can silently fall back to root-commit evidence when no base reference is available and the evaluated commit has no parent.

## Evidence
- .agentplane/tasks/202607282157-FT85MC/quality/20260728-224052576-recovery-context/evaluator-diff.patch

## Missing Tests
- Add a branch_pr regression test where base resolution yields no reference and evaluated_sha is a root commit; evaluator preparation must fail with E_VALIDATION rather than freezing git show --root output.

## Hidden Assumptions
- The implementation assumes that an evaluated root commit without a resolved base is a legitimate no-base case, although the approved branch_pr contract requires unresolved bases to fail closed.

## Residual Risks
- Change branch_pr base resolution so every non-null evaluated SHA requires a resolved merge base, including root commits, while retaining root/single-commit fallback only for non-branch_pr workflows; add the missing root-commit branch_pr regression test.
