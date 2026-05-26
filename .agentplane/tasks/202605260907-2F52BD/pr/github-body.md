Task: `202605260907-2F52BD`
Title: Prepare v0.6.10 patch release
Canonical task record: `.agentplane/tasks/202605260907-2F52BD/README.md`

## Summary

Prepare v0.6.10 patch release

Resolve local stale tag preflight drift, prepare the next patch release candidate for v0.6.10, publish it through the branch_pr release route, and record release evidence.

## Scope

- In scope: Resolve local stale tag preflight drift, prepare the next patch release candidate for v0.6.10, publish it through the branch_pr release route, and record release evidence.
- Out of scope: unrelated refactors not required for "Prepare v0.6.10 patch release".

## Verification

- State: ok
- Note:

```text
Release candidate v0.6.10 prepared on branch_pr route. Local release candidate gate passed:
release:prepublish:fast, release:ci-check, release-ci-base 67/67, workflow coverage, significant
coverage, and release-critical 4/4. PR #4163 opened for head fbaa7d73; GitHub checks are in
progress.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-26T09:07:45.718Z
- Branch: task/202605260907-2F52BD/prepare-v0-6-10-patch-release
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .agentplane/workflows/last-known-good.md           |   3 +-
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.6.10.md                           |  92 +++++++++
 docs/user/agent-bootstrap.generated.mdx            |   1 +
 packages/agentplane/package.json                   |   6 +-
 .../run-cli.core.help-snap.test.ts.snap            |   3 +-
 packages/agentplane/src/cli/bootstrap-guide.ts     |   1 +
 packages/agentplane/src/cli/cli-smoke.test.ts      |  18 +-
 packages/agentplane/src/cli/command-invocations.ts |   4 +
 packages/agentplane/src/cli/command-snippets.ts    |   1 +
 .../src/cli/run-cli.core.hooks.hook-run.test.ts    |   2 +-
 ...un-cli.core.hooks.pre-push-task-binding.test.ts |   4 +-
 ...-cli.core.lifecycle.finish-close-commit.test.ts | 188 ++++++++++---------
 .../src/cli/run-cli.core.route-decision.test.ts    | 205 +++++++++++----------
 .../src/cli/run-cli.core.task-guided.test.ts       |  24 ++-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 .../static/img/social/docs/releases/v0.6.10.png    | Bin 0 -> 42299 bytes
 website/static/img/social/manifest.json            |   8 +
 23 files changed, 373 insertions(+), 208 deletions(-)
```

</details>
