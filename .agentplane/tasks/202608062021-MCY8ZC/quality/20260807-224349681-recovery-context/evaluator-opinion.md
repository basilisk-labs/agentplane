# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- The new branch_pr end-to-end test does not assert that the WorkOrder source_manifest is bound to the created worktree, despite that being an explicit acceptance criterion.
- Recorded verification omits the required final repository status evidence, so unintended tracked or untracked drift has not been ruled out by the frozen evidence.

## Evidence
- .agentplane/tasks/202608062021-MCY8ZC/README.md
- .agentplane/tasks/202608062021-MCY8ZC/quality/objects/sha256/8567073835e48dabdae716dcfd37749d73afbca1e3b0d88556be3d694379fa96.patch
- .agentplane/policy/dod.core.md
- .agentplane/tasks/202608062021-MCY8ZC/quality/objects/sha256/40df41279e262a7eba25cbb201cf46824f635b6d2b518a8e4f8ef493e2f73a5e.json

## Missing Tests
- Extend the base-checkout branch_pr integration test to inspect workOrder.source_manifest.source_paths and prove every referenced source resolves against the created task worktree rather than the caller checkout.
- Record git status --short --untracked-files=all at the evaluated SHA and classify any remaining tracked or untracked artifacts.

## Hidden Assumptions
- Checking the task_document entry in required_inputs is assumed to cover the distinct source_manifest binding requirement.
- Passing command suites is assumed to imply a clean final repository state even though no deterministic status evidence is frozen.

## Residual Risks
- Add explicit source_manifest worktree assertions to the branch_pr end-to-end test, rerun the declared verification, and freeze final git-status evidence demonstrating that only intended task/evaluator artifacts remain.
