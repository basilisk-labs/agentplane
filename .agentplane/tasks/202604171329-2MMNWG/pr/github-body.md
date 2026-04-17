## Summary

Remove bundled recipes fallback path

Remove remaining bundled recipe fallback usage from recipes install and runtime-facing tests so remote catalog + global cache remain the only distribution path for recipes before 0.4.

## Scope

- In scope: Remove remaining bundled recipe fallback usage from recipes install and runtime-facing tests so remote catalog + global cache remain the only distribution path for recipes before 0.4.
- Out of scope: unrelated refactors not required for "Remove bundled recipes fallback path".

## Verification

- State: ok
- Note: Removed bundled recipes fallback resolution from recipes install and deleted the empty bundled-catalog compatibility surface from runtime-facing core CLI tests.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T14:17:08.661Z
- Branch: task/202604171329-2MMNWG/remove-bundled-recipes-path
- Head: b4adbcc272ea

```text
 .../src/cli/run-cli.core.backend-sync.test.ts      |  1 -
 .../cli/run-cli.core.branch-meta.readiness.test.ts |  1 -
 ...n-cli.core.branch-meta.sync-maintenance.test.ts |  1 -
 .../src/cli/run-cli.core.branch-meta.test.ts       |  1 -
 ...n-cli.core.branch-meta.workflow-profile.test.ts |  1 -
 .../cli/run-cli.core.guard.commit-wrapper.test.ts  |  1 -
 .../agentplane/src/cli/run-cli.core.guard.test.ts  |  1 -
 .../agentplane/src/cli/run-cli.core.hooks.test.ts  |  1 -
 .../src/cli/run-cli.core.lifecycle.test.ts         |  1 -
 .../agentplane/src/cli/run-cli.core.misc.test.ts   |  1 -
 .../run-cli.core.pr-flow.cleanup-merged.test.ts    |  1 -
 .../src/cli/run-cli.core.pr-flow.integrate.test.ts |  1 -
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        |  1 -
 .../src/cli/run-cli.core.pr-flow.test.ts           |  1 -
 .../src/cli/run-cli.core.tasks.export.test.ts      |  1 -
 .../src/cli/run-cli.core.tasks.query.test.ts       |  1 -
 .../agentplane/src/cli/run-cli.core.tasks.test.ts  |  1 -
 packages/agentplane/src/cli/run-cli.core.test.ts   |  1 -
 .../src/cli/run-cli.core.upgrade.test.ts           |  1 -
 .../src/commands/recipes/impl/commands/install.ts  | 11 --------
 packages/agentplane/src/recipes/bundled-recipes.ts | 30 ----------------------
 21 files changed, 60 deletions(-)
```

</details>
