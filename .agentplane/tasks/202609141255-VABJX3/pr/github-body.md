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
Bun 1.4.2 qualification and v0.6 runtime hardening pass: 57 focused tests, 92 platform-critical
tests, typecheck, focused ESLint and Prettier, workflow command contracts, compiled Bun CLI smoke,
local tarball install smoke, release:check, doctor, policy routing, git diff --check, and unchanged
bun.lock. The isolated developer reinstall installed materialized tarballs successfully; its
in-checkout temporary prefix was then rejected by the new source-coupling guard as designed.
```
- Canonical workflow state lives in the task README.

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
