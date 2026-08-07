Task: `202608062021-Z0X584`
Title: Converge generated agent guidance on the supervisor-first protocol
Canonical task record: `.agentplane/tasks/202608062021-Z0X584/README.md`

## Summary

Converge generated agent guidance on the supervisor-first protocol

Replace manual lifecycle choreography in bundled AGENTS.md, direct and branch_pr policies, role and quickstart guides, Codex skill, README, and workflow docs with task active, task advance, and task run as the only normal agent paths; provide one copy-paste executable first workflow and retain manual commands only as explicit operator or recovery interfaces.

## Scope

- In scope: Replace manual lifecycle choreography in bundled AGENTS.md, direct and branch_pr policies, role and quickstart guides, Codex skill, README, and workflow docs with task active, task advance, and task run as the only normal agent paths; provide one copy-paste executable first workflow and retain manual commands only as explicit operator or recovery interfaces.
- Out of scope: unrelated refactors not required for "Converge generated agent guidance on the supervisor-first protocol".

## Verification

- State: ok
- Note:

```text
Supervisor-first prompts and lifecycle documentation match the actual planning boundary; all
declared checks pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T20:52:48.085Z
- Branch: task/202608062021-Z0X584/converge-generated-agent-guidance-on-the-supervi
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/dod.code.md                     |  14 +-
 .agentplane/policy/dod.docs.md                     |  14 +-
 .agentplane/policy/governance.md                   |   3 +-
 .agentplane/policy/workflow.branch_pr.md           |  95 +--
 .agentplane/policy/workflow.direct.md              |  55 +-
 .agentplane/policy/workflow.release.md             |  37 +-
 README.md                                          |  29 +-
 docs/user/agent-bootstrap.generated.mdx            |  50 +-
 docs/user/task-lifecycle.mdx                       | 422 ++++---------
 docs/user/workflow.mdx                             | 220 ++-----
 docs/workflow-guides/branch-pr.mdx                 |  91 +--
 docs/workflow-guides/hermes-kanban.mdx             |  40 +-
 packages/agentplane/assets/AGENTS.md               |  82 +--
 .../assets/codex-plugin/skills/agentplane/SKILL.md |  27 +-
 packages/agentplane/assets/policy/dod.code.md      |  14 +-
 packages/agentplane/assets/policy/dod.docs.md      |  14 +-
 packages/agentplane/assets/policy/governance.md    |   3 +-
 .../agentplane/assets/policy/workflow.branch_pr.md |  95 +--
 .../agentplane/assets/policy/workflow.direct.md    |  55 +-
 .../agentplane/assets/policy/workflow.release.md   |  37 +-
 .../agentplane/src/agents/agents-template.test.ts  |  45 ++
 packages/agentplane/src/cli/bootstrap-guide.ts     |  54 +-
 packages/agentplane/src/cli/command-guide.test.ts  |  74 +--
 packages/agentplane/src/cli/command-guide.ts       |  98 ++-
 .../src/cli/run-cli.core.init.branch-pr.test.ts    |   8 +-
 .../cli/run-cli/commands/init/steps/apply.test.ts  |  16 +-
 .../agentplane/src/workflow-lifecycle/contract.ts  |  52 +-
 .../src/workflow-lifecycle/parity-check.ts         |  29 +-
 scripts/checks/check-agent-bootstrap-fresh.mjs     |  55 +-
 scripts/checks/check-agent-onboarding-scenario.mjs | 122 +++-
 website/static/llms-full.txt                       | 697 +++++++--------------
 31 files changed, 1008 insertions(+), 1639 deletions(-)
```

</details>
