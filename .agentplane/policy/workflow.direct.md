# Workflow: direct

Use this module when `workflow_mode=direct`.

## Required sequence

1. Run preflight and publish summary.
2. Build task graph and obtain explicit user approval.
3. Create/reuse task ID.
4. Update task docs (`Summary/Scope/Plan/Risks/Verify Steps/Rollback/Notes`).
5. Start task (`agentplane start ...`).
6. Implement changes in current checkout.
7. Run verification commands from loaded DoD modules.
8. Record verification (`agentplane verify ...`) if required by workflow.
9. Finish/close task with traceable evidence.

## Constraints

- Do not use worktrees in direct mode.
- Do not perform branch_pr-only operations.
