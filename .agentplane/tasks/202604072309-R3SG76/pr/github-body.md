## Summary

Explain internal Findings vs incidents registry promotion

When Findings contains plain text, incidents collect and close-path diagnostics should explicitly distinguish internal follow-up defects from reusable external incident candidates so operators do not expect incidents.md updates from task-local code bugs.

## Scope

- In scope: When Findings contains plain text, incidents collect and close-path diagnostics should explicitly distinguish internal follow-up defects from reusable external incident candidates so operators do not expect incidents.md updates from task-local code bugs.
- Out of scope: unrelated refactors not required for "Explain internal Findings vs incidents registry promotion".

## Verification

### Plan

1. Run the targeted incidents and findings vitest coverage for resolve, finish, and run-cli incidents/findings flows; expected: all pass. 2. Review the changed CLI and guide messages; expected: they explicitly distinguish task-local Findings from reusable incidents registry promotion. 3. Confirm no behavior change in incidents promotion semantics; expected: incidents.md is updated only by structured reusable incident candidates, not by plain Findings text.

### Current Status

- State: ok
- Note: Re-verified after syncing canonical policy assets; incidents/finish/integrate diagnostics, bootstrap docs, routing, and agent-template sync remain aligned on the current head.

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

- Updated: 2026-04-08T01:07:42.241Z
- Branch: task/202604072309-R3SG76/incidents-findings-boundary
- Head: dba269e19c27

```text
 .agentplane/policy/workflow.branch_pr.md           |   2 +-
 .agentplane/policy/workflow.direct.md              |   4 +-
 .agentplane/tasks/202604072309-R3SG76/README.md    | 118 +++++++++++++++++++++
 .../tasks/202604072309-R3SG76/pr/diffstat.txt      |   0
 .../tasks/202604072309-R3SG76/pr/github-body.md    |  48 +++++++++
 .../tasks/202604072309-R3SG76/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604072309-R3SG76/pr/meta.json |  14 +++
 .../tasks/202604072309-R3SG76/pr/notes.jsonl       |   0
 .agentplane/tasks/202604072309-R3SG76/pr/review.md |  55 ++++++++++
 .../tasks/202604072309-R3SG76/pr/verify.log        |   0
 docs/user/agent-bootstrap.generated.mdx            |   3 +-
 docs/user/tasks-and-backends.mdx                   |   3 +-
 .../agentplane/assets/policy/workflow.branch_pr.md |   2 +-
 .../agentplane/assets/policy/workflow.direct.md    |   4 +-
 packages/agentplane/src/cli/bootstrap-guide.ts     |   4 +-
 packages/agentplane/src/cli/command-guide.test.ts  |   8 ++
 packages/agentplane/src/cli/command-guide.ts       |   2 +-
 .../src/cli/run-cli.core.incidents.test.ts         |   3 +-
 .../agentplane/src/commands/incidents/shared.ts    |   4 +-
 .../pr/integrate/internal/finalize.test.ts         |   4 +-
 .../src/commands/task/finish.unit.test.ts          |   7 +-
 21 files changed, 267 insertions(+), 19 deletions(-)
```

</details>
