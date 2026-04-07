## Summary

Add first-class command to append structured Findings incident candidates

Provide an ergonomic task CLI path to append structured Findings blocks, including external incident metadata, so incident promotion does not depend on manual full-doc editing.

## Scope

- In scope: Provide an ergonomic task CLI path to append structured Findings blocks, including external incident metadata, so incident promotion does not depend on manual full-doc editing.
- Out of scope: unrelated refactors not required for "Add first-class command to append structured Findings incident candidates".

## Verification

### Plan

1. Run a focused CLI test that appends a structured Findings block to a v3 task. Expected: the task README gains a canonical Observation/Impact/Resolution block in ## Findings without manual full-doc replacement.
2. Run a focused CLI test with optional external incident metadata. Expected: Promotion/Fixability/Incident* fields serialize in a shape that incidents collect can parse directly.
3. Run eslint and the touched task/incident CLI test files. Expected: touched checks pass with no regressions in task doc mutation behavior.

### Current Status

- State: ok
- Note: Focused findings command tests and eslint passed; task findings add now appends structured incident-ready blocks and incidents collect reads them directly.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-07T07:29:07.308Z
- Branch: task/202604070608-BBH3YS/findings-append-command
- Head: 9d79c4f911f7

```text
 .agentplane/tasks/202604070608-BBH3YS/README.md    | 125 +++++++++++++
 .../tasks/202604070608-BBH3YS/pr/diffstat.txt      |   0
 .../tasks/202604070608-BBH3YS/pr/github-body.md    |  50 +++++
 .../tasks/202604070608-BBH3YS/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604070608-BBH3YS/pr/meta.json |  14 ++
 .../tasks/202604070608-BBH3YS/pr/notes.jsonl       |   0
 .agentplane/tasks/202604070608-BBH3YS/pr/review.md |  57 ++++++
 .../tasks/202604070608-BBH3YS/pr/verify.log        |   0
 docs/user/cli-reference.generated.mdx              |  44 +++++
 packages/agentplane/src/cli/bootstrap-guide.ts     |   1 +
 packages/agentplane/src/cli/command-guide.ts       |   3 +-
 .../src/cli/run-cli.core.tasks.findings.test.ts    | 205 +++++++++++++++++++++
 .../src/cli/run-cli/command-catalog/task.ts        |  16 ++
 .../src/commands/task/findings-add.command.ts      | 155 ++++++++++++++++
 .../src/commands/task/findings.command.ts          |  27 +++
 packages/agentplane/src/commands/task/findings.ts  | 183 ++++++++++++++++++
 .../src/commands/task/findings.unit.test.ts        |  35 ++++
 17 files changed, 915 insertions(+), 1 deletion(-)
```

</details>
