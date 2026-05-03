# PR Review

Created: 2026-05-03T13:01:45.805Z
Branch: task/202605031255-GV0N4K/workflow-md-v2-source-contract

## Summary

Define WORKFLOW.md v2 canonical source contract

Design the WORKFLOW.md v2 contract as the only project source of truth for AgentPlane workflow/config state. Specify startup contract behavior for IDE agents, CLI-owned front matter formatting, AGENTS.md policy-gateway boundaries, config.json removal strategy, migration phases, and source-of-truth conflict rules.

## Scope

- In scope: Design the WORKFLOW.md v2 contract as the only project source of truth for AgentPlane workflow/config state. Specify startup contract behavior for IDE agents, CLI-owned front matter formatting, AGENTS.md policy-gateway boundaries, config.json removal strategy, migration phases, and source-of-truth conflict rules.
- Out of scope: unrelated refactors not required for "Define WORKFLOW.md v2 canonical source contract".

## Verification

### Plan

1. Review the requested outcome for "Define WORKFLOW.md v2 canonical source contract". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: WORKFLOW v2 source-of-truth contract implemented in fb39a8d8 with CLI-owned front matter, legacy config import fallback, startup docs, and validation coverage.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T13:27:42.824Z
- Branch: task/202605031255-GV0N4K/workflow-md-v2-source-contract
- Head: fb39a8d8bc7f

```text
 .agentplane/WORKFLOW.md                            | 110 +++++++++--
 .agentplane/config.json                            |  88 ---------
 .agentplane/tasks/202605031255-92K2Q0/README.md    |  94 ++++++++++
 .agentplane/tasks/202605031255-E1YFBV/README.md    |  94 ++++++++++
 .agentplane/tasks/202605031255-H9WWA0/README.md    |  91 ++++++++++
 .agentplane/tasks/202605031255-TWKAW3/README.md    |  94 ++++++++++
 .agentplane/tasks/202605031255-XM1W31/README.md    |  94 ++++++++++
 .agentplane/tasks/202605031256-2HEMDS/README.md    |  97 ++++++++++
 .agentplane/tasks/202605031256-758Q7Z/README.md    |  93 ++++++++++
 docs/help/troubleshooting-by-symptom.mdx           |   2 +-
 docs/help/troubleshooting.mdx                      |   2 +-
 docs/user/agents.mdx                               |   2 +-
 docs/user/backends.mdx                             |   4 +-
 docs/user/backends/local.mdx                       |   2 +-
 docs/user/branching-and-pr-artifacts.mdx           |   2 +-
 docs/user/commands.mdx                             |   2 +-
 docs/user/configuration.mdx                        |  24 +--
 docs/user/overview.mdx                             |   2 +-
 docs/user/setup.mdx                                |   3 +-
 docs/user/tasks-and-backends.mdx                   |   2 +-
 packages/agentplane/README.md                      |   4 +-
 packages/agentplane/assets/AGENTS.md               |   8 +-
 .../run-cli.core.help-snap.test.ts.snap            |   6 +-
 packages/agentplane/src/cli/command-guide.ts       |   4 +-
 ...n-cli.core.branch-meta.workflow-profile.test.ts |  20 +-
 .../agentplane/src/cli/run-cli/commands/config.ts  |  62 +------
 .../src/cli/run-cli/commands/init/execution.ts     |  10 +-
 .../cli/run-cli/commands/init/steps/apply.test.ts  |   4 +-
 .../commands/init/steps/conflict-resolver.test.ts  |   6 +-
 .../src/cli/run-cli/commands/init/write-agents.ts  |   4 +-
 .../agentplane/src/commands/doctor/workspace.ts    |   2 +-
 packages/agentplane/src/commands/upgrade/policy.ts |   2 +
 packages/agentplane/src/commands/upgrade/report.ts |   3 +-
 .../src/commands/workflow-build.command.ts         |  11 +-
 .../agentplane/src/shared/workflow-artifacts.ts    |   5 +-
 .../agentplane/src/workflow-runtime/build.test.ts  |   7 +-
 packages/agentplane/src/workflow-runtime/build.ts  |  54 +++++-
 .../src/workflow-runtime/file-ops.test.ts          |  14 +-
 .../agentplane/src/workflow-runtime/file-ops.ts    |  14 +-
 .../src/workflow-runtime/validate-frontmatter.ts   |  42 ++++-
 .../src/workflow-runtime/validate.test.ts          |  29 ++-
 packages/core/src/config/config.test.ts            |  23 ++-
 packages/core/src/config/config.ts                 |   8 +
 packages/core/src/config/io.ts                     |  39 +++-
 packages/core/src/config/workflow-file.ts          | 202 +++++++++++++++++++++
 packages/spec/README.md                            |   5 +-
 packages/testkit/src/cli-harness.ts                |  10 +-
 packages/testkit/src/release.ts                    |  13 +-
 48 files changed, 1230 insertions(+), 283 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
