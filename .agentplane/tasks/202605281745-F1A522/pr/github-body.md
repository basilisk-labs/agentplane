Task: `202605281745-F1A522`
Title: Respect ignored tasks.json in hooks
Canonical task record: `.agentplane/tasks/202605281745-F1A522/README.md`

## Summary

Respect ignored tasks.json in hooks

Fix Git hook task-protection behavior from GitHub issue #4188 so ignored .agentplane/tasks.json does not require AGENTPLANE_ALLOW_TASKS unless tracked or explicitly staged.

## Scope

- In scope: Fix Git hook task-protection behavior from GitHub issue #4188 so ignored .agentplane/tasks.json does not require AGENTPLANE_ALLOW_TASKS unless tracked or explicitly staged.
- Out of scope: unrelated refactors not required for "Respect ignored tasks.json in hooks".

## Verification

- State: ok
- Note:

```text
Verified issue #4188 hook behavior fix. Focused hook/protected-path tests passed; format:changed,
typecheck, policy routing, and doctor passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T17:46:18.377Z
- Branch: task/202605281745-F1A522/respect-ignored-tasks-json-in-hooks
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202605281713-EW6N63/README.md    | 262 +++++++++++++++
 .../blueprint/resolved-snapshot.json               | 360 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  21 ++
 .../evaluator-prompt.md                            |  74 +++++
 .../quality-report.json                            |  23 ++
 docs/user/agent-bootstrap.generated.mdx            |  26 +-
 packages/agentplane/assets/AGENTS.md               |  48 +--
 .../agentplane/src/agents/agents-template.test.ts  |   5 +-
 packages/agentplane/src/cli/bootstrap-guide.ts     |  26 +-
 packages/agentplane/src/cli/command-guide.test.ts  |  17 +-
 packages/agentplane/src/cli/command-guide.ts       |  18 +-
 .../src/cli/run-cli.core.hooks.pre-commit.test.ts  |  56 ++++
 .../agentplane/src/policy/rules/protected-paths.ts |  32 +-
 .../agentplane/src/workflow-lifecycle/contract.ts  |   2 +-
 .../src/workflow-lifecycle/parity-check.ts         |  13 +-
 scripts/checks/check-agent-bootstrap-fresh.mjs     |  12 +-
 scripts/checks/check-agent-onboarding-scenario.mjs |   2 +-
 17 files changed, 888 insertions(+), 109 deletions(-)
```

</details>
