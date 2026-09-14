Task: `202609141255-VABJX3`
Title: Backport applicable open issue fixes to the 0.6 maintenance branch
Canonical task record: `.agentplane/tasks/202609141255-VABJX3/README.md`

## Summary

Backport applicable open issue fixes to the 0.6 maintenance branch

Audit all open GitHub issues against AgentPlane 0.6.28 and backport only confirmed 0.6-relevant fixes for issues #5892, #5887, and #4893. Preserve the v0.6 lifecycle and avoid 0.7 task-kernel or release architecture. Implement and verify the fixes on one dedicated local branch from codex/release-v0.6.27-reclaim-fix. Do not push, open a PR, merge, or release.

## Scope

- In scope: preserve the existing #5892 and #5887 backports and #4893 regression coverage; add v0.6-native hook runner startup readiness and deterministic fallback for #5941; replace source-linked developer global installs with materialized package tarballs for the applicable #5942 failure mode; update repository and workflow Bun pins to 1.4.2 without changing runtime architecture or dependency resolution.
- Out of scope: push, PR creation, merge, release, v0.7 task-runtime identity architecture, Node removal, bun:test migration, Bun.build migration, dependency upgrades, and unrelated refactors.

## Verification

- State: ok
- Note:

```text
Verified: 57 focused tests and 92 platform-critical tests passed; typecheck, focused ESLint and
Prettier, workflow command contracts, Bun compiled CLI smoke, local tarball install smoke,
release:check, policy routing, doctor, and git diff checks passed on Bun 1.4.2; bun.lock is
unchanged.
```
- Canonical workflow state lives in the task README.

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
