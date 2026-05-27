# PR Review

Created: 2026-05-27T19:33:13.752Z

## Task

- Task: `202605271932-22VJM6`
- Title: Teach agent prompts route oracle fields
- Status: DOING
- Branch: `task/202605271932-22VJM6/teach-agent-prompts-route-oracle-fields`
- Canonical task record: `.agentplane/tasks/202605271932-22VJM6/README.md`

## Verification

- State: ok
- Note: Implemented route oracle guidance in agent templates, role/quickstart/bootstrap prompt surfaces, generated agent bootstrap docs, and runner bootstrap. Evidence: focused prompt/runner tests passed (14 pass); agents:check passed; docs:bootstrap:check and docs:cli:check passed; typecheck passed; format:check passed; hotspots:check passed with existing warnings only; policy routing OK; ap doctor OK with informational runtime notices only.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-27T19:33:13.752Z
- Branch: task/202605271932-22VJM6/teach-agent-prompts-route-oracle-fields
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/agents/CODER.json                      |  2 +-
 .agentplane/agents/INTEGRATOR.json                 |  2 +-
 .agentplane/agents/ORCHESTRATOR.json               |  2 +-
 .agentplane/agents/PLANNER.json                    |  2 +-
 .agentplane/agents/REVIEWER.json                   |  2 +-
 .agentplane/agents/TESTER.json                     |  2 +-
 docs/user/agent-bootstrap.generated.mdx            |  4 ++--
 packages/agentplane/assets/agents/CODER.json       |  2 +-
 packages/agentplane/assets/agents/INTEGRATOR.json  |  2 +-
 .../agentplane/assets/agents/ORCHESTRATOR.json     |  2 +-
 packages/agentplane/assets/agents/PLANNER.json     |  2 +-
 packages/agentplane/assets/agents/REVIEWER.json    |  2 +-
 packages/agentplane/assets/agents/TESTER.json      |  2 +-
 packages/agentplane/src/cli/bootstrap-guide.ts     |  4 ++--
 packages/agentplane/src/cli/command-guide.test.ts  | 10 ++++++++
 packages/agentplane/src/cli/command-guide.ts       | 18 ++++++++++----
 .../src/runner/usecases/task-run-blueprint.test.ts | 28 ++++++++++++++++++++++
 .../src/runner/usecases/task-run-bootstrap.ts      | 24 ++++++++++++++++++-
 18 files changed, 91 insertions(+), 21 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
