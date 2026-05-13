Task: `202605131603-PFXN5E`
Title: Automate branch_pr merge queue finalization
Canonical task record: `.agentplane/tasks/202605131603-PFXN5E/README.md`

## Summary

Automate branch_pr merge queue finalization

Make branch_pr completion queue verified task branches for serialized integration, prefer merge commits over squash in hosted close routes, and move protected-base integration toward GitHub merge orchestration instead of a manual handoff-only stop.

## Scope

- In scope: Make branch_pr completion queue verified task branches for serialized integration, prefer merge commits over squash in hosted close routes, and move protected-base integration toward GitHub merge orchestration instead of a manual handoff-only stop.
- Out of scope: unrelated refactors not required for "Automate branch_pr merge queue finalization".

## Verification

- State: ok
- Note: Verified GitHub merge transport hardening: gh readiness checks, GH_TOKEN/GITHUB_TOKEN API fallback, init recommendation, quickstart guidance, focused tests, eslint, typecheck, schema check, policy routing, CLI docs freshness, quickstart smoke, blueprint snapshot, doctor, and git diff check passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T17:10:26.522Z
- Branch: task/202605131603-PFXN5E/automate-merge-queue
- Head: 2e7fc7d3d4b5

```text
 .agentplane/policy/workflow.branch_pr.md           |   9 +-
 .github/workflows/publish.yml                      |   4 +-
 .github/workflows/task-hosted-close.yml            |   4 +-
 docs/user/cli-reference.generated.mdx              |   1 +
 .../agentplane/assets/policy/workflow.branch_pr.md |   9 +-
 packages/agentplane/src/cli/bootstrap-guide.ts     |   4 +-
 packages/agentplane/src/cli/command-guide.test.ts  |   4 +-
 packages/agentplane/src/cli/command-guide.ts       |   6 +-
 ...n-cli.core.pr-flow.integrate-validation.test.ts |  10 +-
 .../src/commands/integrate-queue.command.ts        | 137 +++++++++++----------
 .../src/commands/integrate-queue.spec.ts           |   9 ++
 .../src/commands/pr/integrate/cmd.test.ts          | 102 +++++++++++++--
 .../agentplane/src/commands/pr/integrate/cmd.ts    | 126 +++++++++++++++++--
 .../task/hosted-close-workflow-contract.test.ts    |   5 +-
 packages/core/schemas/task-handoff.schema.json     |   5 +-
 .../core/src/tasks/task-artifact-schema.handoff.ts |   5 +-
 packages/spec/schemas/task-handoff.schema.json     |   5 +-
 schemas/task-handoff.schema.json                   |   5 +-
 18 files changed, 338 insertions(+), 112 deletions(-)
```

</details>
