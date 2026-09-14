# PR Review

Created: 2026-09-14T12:57:53.404Z

## Task

- Task: `202609141255-VABJX3`
- Title: Backport applicable open issue fixes to the 0.6 maintenance branch
- Status: DOING
- Branch: `task/202609141255-VABJX3/backport-applicable-open-issue-fixes-to-the-0-6`
- Canonical task record: `.agentplane/tasks/202609141255-VABJX3/README.md`

## Verification

- State: ok
- Note: Bun 1.4.2 qualification and v0.6 runtime hardening pass: 57 focused tests, 92 platform-critical tests, typecheck, focused ESLint and Prettier, workflow command contracts, compiled Bun CLI smoke, local tarball install smoke, release:check, doctor, policy routing, git diff --check, and unchanged bun.lock. The isolated developer reinstall installed materialized tarballs successfully; its in-checkout temporary prefix was then rejected by the new source-coupling guard as designed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-14T14:39:23.076Z
- Branch: task/202609141255-VABJX3/backport-applicable-open-issue-fixes-to-the-0-6
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...cli.core.route-decision.direct-closeout.test.ts |  65 ++++++++++
 .../evaluator/evaluator-run.command.test.ts        |  49 +++++---
 .../src/commands/evaluator/evaluator.command.ts    |  18 ++-
 .../src/commands/task/run-render.test.ts           | 135 +++++++++++++++++++++
 .../agentplane/src/commands/task/run-render.ts     |  19 ++-
 .../agentplane/src/commands/task/run.command.ts    |   8 +-
 .../src/runner/usecases/task-run-inspect.ts        | 124 +++++++++++++++++++
 7 files changed, 393 insertions(+), 25 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
