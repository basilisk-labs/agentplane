## Summary

Promote incidents during branch_pr integrate and hosted-close

Make branch_pr closure paths promote reusable external incidents into .agentplane/policy/incidents.md the same way direct finish already does, and lock the behavior with tests.

## Scope

- In scope: Make branch_pr closure paths promote reusable external incidents into .agentplane/policy/incidents.md the same way direct finish already does, and lock the behavior with tests.
- Out of scope: unrelated refactors not required for "Promote incidents during branch_pr integrate and hosted-close".

## Verification

### Plan

1. Run `bun test packages/agentplane/src/shared/protected-paths.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts -t "treats \.agentplane/policy as an allow-policy prefix|classifies incidents registry under \.agentplane/policy as policy|promotes structured external incident candidates into the incident registry|task hosted-close closes a merged branch_pr task exactly once"`. Expected: all targeted tests pass, proving policy classification plus direct/integrate/hosted-close incident promotion.
2. Run `bun x eslint packages/agentplane/src/shared/protected-paths.ts packages/agentplane/src/shared/protected-paths.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts`. Expected: lint exits 0.
3. Run `agentplane task show 202604061916-2860KH` after `bun run framework:dev:bootstrap`. Expected: repo-local runtime is current and the task artifacts remain loadable for branch_pr publication.

### Current Status

- State: ok
- Note: Targeted vitest passed for finish/integrate/hosted-close incident promotion; eslint passed; protected policy path coverage added for .agentplane/policy/**.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-06T19:54:27.503Z
- Branch: task/202604061916-2860KH/branch-pr-incidents
- Head: ca7c8399d6b5

```text
No changes detected.
```

</details>
