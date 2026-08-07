# PR Review

Created: 2026-08-06T20:27:51.883Z

## Task

- Task: `202608062021-Z0X584`
- Title: Converge generated agent guidance on the supervisor-first protocol
- Status: DOING
- Branch: `task/202608062021-Z0X584/converge-generated-agent-guidance-on-the-supervi`
- Canonical task record: `.agentplane/tasks/202608062021-Z0X584/README.md`

## Verification

- State: ok
- Note: Supervisor-first prompts and lifecycle documentation match the actual planning boundary; all declared checks pass.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
 README.md                                          |  28 +-
 docs/user/agent-bootstrap.generated.mdx            |  52 +-
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
 packages/agentplane/src/cli/command-guide.test.ts  |  77 +--
 packages/agentplane/src/cli/command-guide.ts       | 100 ++-
 packages/agentplane/src/cli/command-snippets.ts    |   1 +
 .../src/cli/run-cli.core.init.branch-pr.test.ts    |   8 +-
 .../cli/run-cli/commands/init/steps/apply.test.ts  |  16 +-
 .../agentplane/src/workflow-lifecycle/contract.ts  |  52 +-
 .../src/workflow-lifecycle/parity-check.ts         |  29 +-
 scripts/checks/check-agent-bootstrap-fresh.mjs     |  55 +-
 scripts/checks/check-agent-onboarding-scenario.mjs | 125 +++-
 .../check-v0.7.1-product-contract.mjs              |   6 +-
 website/static/llms-full.txt                       | 697 +++++++--------------
 33 files changed, 1019 insertions(+), 1644 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
