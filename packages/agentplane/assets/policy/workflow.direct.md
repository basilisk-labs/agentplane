# Workflow: direct

Use this module when `workflow_mode=direct`.

## Required sequence

1. CHECKPOINT A: run preflight and publish summary.
2. CHECKPOINT B: build task graph and obtain explicit user approval.
3. Create/reuse task ID.
4. Fill task docs (`Summary/Scope/Plan/Risks/Verify Steps/Rollback/Notes`).
5. Approve plan (if required), then start task sequentially.
6. Implement changes in current checkout.
7. Run verification commands from loaded DoD modules.
8. Record verification (`agentplane verify ...`) if required by workflow.
9. CHECKPOINT C: finish task with traceable evidence.

## Command contract

```bash
agentplane task new --title "..." --description "..." --priority med --owner <ROLE> --tag <tag>
agentplane task plan set <task-id> --text "..." --updated-by <ROLE>
agentplane task plan approve <task-id> --by ORCHESTRATOR
agentplane task start-ready <task-id> --author <ROLE> --body "Start: ..."
agentplane verify <task-id> --ok|--rework --by <ROLE> --note "..."
agentplane finish <task-id> --author <ROLE> --body "Verified: ..." --result "..." --commit <git-rev> --close-commit
```

## ERROR RECOVERY

If any step fails:

1. Stop mutation immediately.
2. Record failure details in task `Notes` (`what failed`, `where`, `impact`).
3. Mark task blocked: `agentplane block <task-id> --author <ROLE> --body "Blocked: ..."`.
4. Request re-approval before scope/risk changes.
5. If failure is process/policy-related, append entry to `.agentplane/policy/incidents.md`.

## Constraints

- MUST NOT perform mutating actions before explicit user approval.
- MUST run `task plan approve` then `task start-ready` as `Step 1 -> wait -> Step 2` (never parallel).
- MUST stop and request re-approval on material drift.
- Do not use worktrees in direct mode.
- Do not perform `branch_pr`-only operations.
