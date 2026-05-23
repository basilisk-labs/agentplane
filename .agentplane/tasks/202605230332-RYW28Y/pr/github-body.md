Task: `202605230332-RYW28Y`
Title: Route agent context guidance through task brief
Canonical task record: `.agentplane/tasks/202605230332-RYW28Y/README.md`

## Summary

Route agent context guidance through task brief

Update installed quickstart, role supplements, generated bootstrap docs, and onboarding checks so agents use task active and task brief before low-level route/recovery command stitching.

## Scope

- In scope: Update installed quickstart, role supplements, generated bootstrap docs, and onboarding checks so agents use task active and task brief before low-level route/recovery command stitching.
- Out of scope: unrelated refactors not required for "Route agent context guidance through task brief".

## Verification

- State: ok
- Note:

```text
Review: code scope owns the runtime renderer/checker changes; all focused docs/guidance checks and
task-scope/knip gates passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T03:33:01.016Z
- Branch: task/202605230332-RYW28Y/agent-context-guidance
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/agent-bootstrap.generated.mdx            | 26 ++++++++++++++-----
 packages/agentplane/assets/AGENTS.md               |  3 +--
 packages/agentplane/src/cli/bootstrap-guide.ts     | 30 +++++++++++++++++-----
 packages/agentplane/src/cli/command-guide.test.ts  |  9 ++++++-
 packages/agentplane/src/cli/command-guide.ts       | 14 +++++++---
 packages/agentplane/src/cli/command-invocations.ts |  2 ++
 packages/agentplane/src/cli/command-snippets.ts    |  2 ++
 scripts/checks/check-agent-onboarding-scenario.mjs |  8 +++---
 8 files changed, 72 insertions(+), 22 deletions(-)
```

</details>
