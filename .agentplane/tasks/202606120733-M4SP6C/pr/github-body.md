Task: `202606120733-M4SP6C`
Title: Fix task artifact lifecycle issue regressions
Canonical task record: `.agentplane/tasks/202606120733-M4SP6C/README.md`

## Summary

Fix task artifact lifecycle issue regressions

Fix GitHub issues #4505 and #4506: direct close-flow commit subject validation around task artifact cleanup, and insights issue creation blocking on dangling task artifacts. Scope is implementation/tests only; no release publishing.

## Scope

- In scope: Fix GitHub issues #4505 and #4506: direct close-flow commit subject validation around task artifact cleanup, and insights issue creation blocking on dangling task artifacts. Scope is implementation/tests only; no release publishing.
- Out of scope: unrelated refactors not required for "Fix task artifact lifecycle issue regressions".

## Verification

- State: ok
- Note:

```bash
bun test packages/agentplane/src/commands/guard/impl/close-message.test.ts; Result: pass; Evidence: \
  18 tests passed. Scope: close commit message builder. Command: bun test \
  packages/agentplane/src/cli/run-cli.core.insights-report.test.ts; Result: pass; Evidence: 11 tests \
  passed, including dangling task dir issue dry-run. Scope: insights issue/report diagnostics. \
  Command: bun test packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts \
  packages/core/src/commit/commit-policy.test.ts; Result: pass; Evidence: 34 tests passed. Scope: \
  close wrapper and commit policy. Command: bun run typecheck; Result: pass. Evidence: TypeScript \
  build exited 0. Scope: workspace typecheck. Command: bunx prettier --check touched files; Result: \
  pass. Evidence: all matched files use Prettier code style. Scope: touched files. Command: git diff \
  --check; Result: pass. Evidence: no whitespace errors. Scope: final diff. Command: node \
  .agentplane/policy/check-routing.mjs; Result: pass. Evidence: policy routing OK. Scope: policy \
  routing. Command: ap doctor; Result: pass. Evidence: doctor OK, errors=0; two pre-existing DONE \
  task missing commit hash warnings. Scope: AgentPlane workspace health.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-12T07:36:43.111Z
- Branch: task/202606120733-M4SP6C/fix-task-artifact-lifecycle-issue-regressions
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.insights-report.test.ts           |  5 ++++-
 .../src/commands/guard/impl/close-message.test.ts          | 14 +++++++-------
 .../agentplane/src/commands/guard/impl/close-message.ts    |  2 +-
 .../agentplane/src/commands/insights/insights-report.ts    | 10 +++++++++-
 4 files changed, 21 insertions(+), 10 deletions(-)
```

</details>
