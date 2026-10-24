Task: `202610241027-XK8HYS`
Title: Align branch work-start integration fixtures with frozen base and framework ownership
Canonical task record: `.agentplane/tasks/202610241027-XK8HYS/README.md`

## Summary

Align branch work-start integration fixtures with frozen base and framework ownership

Correct three pre-bump release CI assertions: an authenticated frozen task base remains valid after upstream advances; a consumer worktree receives no framework runtime; framework bootstrap fixtures declare real package ownership before expecting local runtime assets.

## Scope

- In scope: Correct three pre-bump release CI assertions: an authenticated frozen task base remains valid after upstream advances; a consumer worktree receives no framework runtime; framework bootstrap fixtures declare real package ownership before expecting local runtime assets.
- Out of scope: unrelated refactors not required for "Align branch work-start integration fixtures with frozen base and framework ownership".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-24T10:40:28.035Z
- Branch: task/202610241027-XK8HYS/align-branch-work-start-integration-fixtures-wit
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.pr-flow.test.ts           | 28 ++++++++++++----------
 .../run-cli.core.pr-flow.worktree-runtime.test.ts  | 15 +++++++++---
 2 files changed, 27 insertions(+), 16 deletions(-)
```

</details>
