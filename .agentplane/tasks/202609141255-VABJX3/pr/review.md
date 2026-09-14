# PR Review

Created: 2026-09-14T12:57:53.404Z

## Task

- Task: `202609141255-VABJX3`
- Title: Backport applicable open issue fixes to the 0.6 maintenance branch
- Status: DONE
- Branch: `task/202609141255-VABJX3/backport-applicable-open-issue-fixes-to-the-0-6`
- Canonical task record: `.agentplane/tasks/202609141255-VABJX3/README.md`

## Verification

- State: ok
- Note: Verified: final full-fast CI passed (371 files, 2190 tests, and 14 critical CLI tests), including knip baseline after keeping TaskRunnerActivityHealth private; focused and release gates remain passing.
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
 .github/workflows/ci.yml                           |  18 +--
 .github/workflows/docs-ci.yml                      |   2 +-
 .github/workflows/pages-deploy.yml                 |   2 +-
 .github/workflows/prepublish.yml                   |   2 +-
 .github/workflows/publish-distribution-module.yml  |   2 +-
 .github/workflows/publish.yml                      |   2 +-
 .github/workflows/task-hosted-close.yml            |   2 +-
 .github/workflows/workflows-lint.yml               |   2 +-
 package.json                                       |   2 +-
 ...cli.core.route-decision.direct-closeout.test.ts |  65 ++++++++++
 .../src/cli/verify-global-install-script.test.ts   |  60 ++++++++-
 .../commands/branch/work-start.hook-shim.test.ts   | 123 ++++++++++++++++++-
 .../src/commands/doctor.command.runtime.test.ts    |   3 +-
 .../src/commands/doctor/hook-readiness.ts          |   8 +-
 .../evaluator/evaluator-run.command.test.ts        |  49 +++++---
 .../src/commands/evaluator/evaluator.command.ts    |  18 ++-
 .../commands/release/release-ci-contract.test.ts   |   5 +-
 .../src/commands/shared/hook-shim-template.ts      |  26 ++--
 .../src/commands/task/run-render.test.ts           | 135 +++++++++++++++++++++
 .../agentplane/src/commands/task/run-render.ts     |  19 ++-
 .../agentplane/src/commands/task/run.command.ts    |   8 +-
 .../src/runner/usecases/task-run-inspect.ts        | 124 +++++++++++++++++++
 scripts/workflow/reinstall-global-agentplane.sh    |  34 +++---
 .../workflow/verify-global-agentplane-install.mjs  |  36 +++++-
 24 files changed, 666 insertions(+), 81 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
