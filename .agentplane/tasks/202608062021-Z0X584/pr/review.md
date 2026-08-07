# PR Review

Created: 2026-08-06T20:27:51.883Z

## Task

- Task: `202608062021-Z0X584`
- Title: Converge generated agent guidance on the supervisor-first protocol
- Status: DONE
- Branch: `task/202608062021-Z0X584/converge-generated-agent-guidance-on-the-supervi`
- Canonical task record: `.agentplane/tasks/202608062021-Z0X584/README.md`

## Verification

- State: ok
- Note: All five Verify Steps passed on implementation b5faa8b3dce6 with concrete check evidence; typecheck and focused lint also passed.
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
 README.md                                          |  26 +-
 docs/user/agent-bootstrap.generated.mdx            |  48 +-
 docs/user/task-lifecycle.mdx                       | 416 ++++---------
 docs/user/workflow.mdx                             | 216 ++-----
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
 packages/agentplane/src/cli/bootstrap-guide.ts     |  52 +-
 packages/agentplane/src/cli/command-guide.test.ts  |  74 +--
 packages/agentplane/src/cli/command-guide.ts       |  98 ++-
 .../agentplane/src/commands/task/update.command.ts |  57 ++
 packages/agentplane/src/commands/task/update.ts    |  19 +
 .../src/commands/task/update.unit.test.ts          |  45 +-
 scripts/checks/check-agent-bootstrap-fresh.mjs     |  55 +-
 scripts/checks/check-agent-onboarding-scenario.mjs |  58 +-
 website/static/llms-full.txt                       | 687 ++++++---------------
 30 files changed, 990 insertions(+), 1582 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
