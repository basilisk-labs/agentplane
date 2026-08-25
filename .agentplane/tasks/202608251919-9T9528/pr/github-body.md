Task: `202608251919-9T9528`
Title: Make task-worktree dependency preparation independent of foreign worktree package layouts
Canonical task record: `.agentplane/tasks/202608251919-9T9528/README.md`

## Summary

Make task-worktree dependency preparation independent of foreign worktree package layouts

Self-hosting blocker for 202608251755-NJQVAX. Symptom: the NJQVAX authoritative task checkout links node_modules to the base checkout, but base node_modules/eslint points into the NJ6Y8B worktree's removed pnpm layout, so node scripts/checks/run-local-ci-group.mjs core fails before lint or tests with MODULE_NOT_FOUND. Violated invariant: a task worktree prepared from current main must resolve declared dependencies deterministically and must not depend on another task worktree's transient package-manager layout. Proven root cause: shared node_modules contains absolute/generated package links whose targets are owned by a foreign worktree and no longer exist after the Bun layout transition. Recovery: preserve blocked NJQVAX and do not copy dependencies or source changes between worktrees manually. Permanent fix: make the canonical worktree dependency preparation validate and provide a self-contained or otherwise stable dependency root, fail closed on broken foreign-worktree links, and add a regression reproducing a stale foreign-worktree package target. After integration, resume NJQVAX through fresh ap task active and ap task advance packets.

## Scope

- In scope: Self-hosting blocker for 202608251755-NJQVAX. Symptom: the NJQVAX authoritative task checkout links node_modules to the base checkout, but base node_modules/eslint points into the NJ6Y8B worktree's removed pnpm layout, so node scripts/checks/run-local-ci-group.mjs core fails before lint or tests with MODULE_NOT_FOUND. Violated invariant: a task worktree prepared from current main must resolve declared dependencies deterministically and must not depend on another task worktree's transient package-manager layout. Proven root cause: shared node_modules contains absolute/generated package links whose targets are owned by a foreign worktree and no longer exist after the Bun layout transition. Recovery: preserve blocked NJQVAX and do not copy dependencies or source changes between worktrees manually. Permanent fix: make the canonical worktree dependency preparation validate and provide a self-contained or otherwise stable dependency root, fail closed on broken foreign-worktree links, and add a regression reproducing a stale foreign-worktree package target. After integration, resume NJQVAX through fresh ap task active and ap task advance packets.
- Out of scope: unrelated refactors not required for "Make task-worktree dependency preparation independent of foreign worktree package layouts".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-25T19:29:08.475Z
- Branch: task/202608251919-9T9528/make-task-worktree-dependency-preparation-indepe
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/bootstrap-framework-dev-script.test.ts |  58 ++++++++++
 .../commands/branch/work-start.materialize.test.ts | 123 +++++++++++++++++++++
 .../src/commands/branch/work-start.materialize.ts  |  65 ++++++++++-
 scripts/workflow/bootstrap-framework-dev.mjs       |  38 ++++++-
 4 files changed, 280 insertions(+), 4 deletions(-)
```

</details>
