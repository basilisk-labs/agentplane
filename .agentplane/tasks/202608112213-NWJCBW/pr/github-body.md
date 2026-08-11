Task: `202608112213-NWJCBW`
Title: Replace mutable setup and execution profiles with one canonical policy
Canonical task record: `.agentplane/tasks/202608112213-NWJCBW/README.md`

## Summary

Replace mutable setup and execution profiles with one canonical policy

Remove profile-driven process variants from init, config, and runtime. New and upgraded projects must resolve to one fixed execution policy while legacy profile inputs migrate compatibly without changing workflow, runner, integrations, or explicit project approvals. Preserve task flexibility by making lifecycle and safety invariants fixed instead of imposing arbitrary autonomy tiers.

## Scope

- In scope: Remove profile-driven process variants from init, config, and runtime. New and upgraded projects must resolve to one fixed execution policy while legacy profile inputs migrate compatibly without changing workflow, runner, integrations, or explicit project approvals. Preserve task flexibility by making lifecycle and safety invariants fixed instead of imposing arbitrary autonomy tiers.
- Out of scope: unrelated refactors not required for "Replace mutable setup and execution profiles with one canonical policy".

## Verification

- State: ok
- Note:

```text
Compatibility review remediation verified at 017d3d3a8. Prior full product verification remains
applicable: excluding generated task lifecycle artifacts, the only post-verification changes are the
compatibility candidate, checker, and its regression test.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-11T23:17:09.262Z
- Branch: task/202608112213-NWJCBW/replace-mutable-setup-and-execution-profiles-wit
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/assets/agentplane-demo.tape                   |   2 +-
 docs/developer/blueprints.mdx                      |   2 +-
 docs/developer/design-principles.mdx               |   3 +-
 docs/help/glossary.mdx                             |   3 +-
 docs/user/cli-reference.generated.mdx              |  32 ++---
 docs/user/commands.mdx                             |  27 ++--
 docs/user/configuration.mdx                        |  29 +++--
 docs/user/setup.mdx                                |  20 ++-
 ...n-cli.core.branch-meta.workflow-profile.test.ts |  14 ++-
 .../src/cli/run-cli.core.init.branch-pr.test.ts    |   8 +-
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  19 +--
 .../run-cli.core.init.validation-conflicts.test.ts |  14 ++-
 ...un-cli.core.lifecycle.finish-validation.test.ts |   7 +-
 .../run-cli.core.lifecycle.start-readiness.test.ts |   7 +-
 packages/agentplane/src/cli/run-cli.core.test.ts   |  24 +++-
 ...-cli.critical.agent-efficiency-baseline.test.ts |  10 +-
 .../agentplane/src/cli/run-cli/commands/config.ts  |  95 ++++++--------
 .../src/cli/run-cli/commands/init/answers.ts       |  17 +--
 .../cli/run-cli/commands/init/execution.test.ts    |   4 +-
 .../src/cli/run-cli/commands/init/execution.ts     |   8 +-
 .../src/cli/run-cli/commands/init/init-plan.ts     |   1 +
 .../src/cli/run-cli/commands/init/model.ts         |   3 +-
 .../src/cli/run-cli/commands/init/modes.ts         |   3 +-
 .../src/cli/run-cli/commands/init/orchestrate.ts   |   8 +-
 .../src/cli/run-cli/commands/init/presets.ts       |  70 +++++------
 .../src/cli/run-cli/commands/init/spec.ts          |  63 +++++++---
 .../commands/init/steps/advanced-settings.ts       |  30 +----
 .../commands/init/steps/blueprint-selection.ts     |   3 +-
 .../commands/init/steps/prompt-steps.test.ts       |  62 ++++-----
 .../run-cli/commands/init/steps/setup-profile.ts   |  38 +-----
 .../src/cli/run-cli/commands/init/write-config.ts  |   2 +-
 .../commands/shared/approval-requirements.test.ts  |   8 +-
 .../commands/task/finish.close-tail.unit.test.ts   |   1 +
 .../src/commands/workflow.maintenance.test.ts      |   1 +
 packages/agentplane/src/commands/workflow.test.ts  |   1 +
 .../src/runner/context/base-prompts.test.ts        |  10 +-
 .../runner/state-fingerprint-projections.test.ts   |   4 +-
 ...te-fingerprint-residual-git.integration.test.ts |   6 +-
 packages/agentplane/src/runtime/approvals/index.ts |   6 +-
 packages/agentplane/src/runtime/approvals/model.ts |   2 +-
 .../src/runtime/approvals/runtime.test.ts          |  15 ++-
 .../agentplane/src/runtime/approvals/runtime.ts    |  28 +----
 .../src/runtime/execution-profile/canonical.ts     |   9 ++
 .../src/runtime/execution-profile/index.ts         |   1 +
 .../src/runtime/execution-profile/resolve.test.ts  |  19 +--
 .../src/runtime/execution-profile/resolve.ts       |  52 +++-----
 .../agentplane/src/runtime/explain/resolve.test.ts |   4 +-
 .../agentplane/src/runtime/harness/resolve.test.ts |   2 +-
 packages/agentplane/src/runtime/harness/resolve.ts |  15 +--
 .../src/runtime/prompt-modules/registry.test.ts    |   4 +-
 .../src/runtime/protocol/resolve.test.ts           |   2 +-
 packages/core/schemas/config.schema.json           |   6 +-
 packages/core/schemas/workflow.schema.json         |   8 +-
 packages/core/src/config/config.test.ts            |  28 ++++-
 packages/core/src/config/execution-profile.test.ts |  43 +++----
 packages/core/src/config/execution-profile.ts      | 138 +++++++--------------
 packages/core/src/config/index.ts                  |   1 +
 packages/core/src/config/io.ts                     |  17 ++-
 packages/core/src/config/schema.impl.ts            |  15 ++-
 packages/core/src/index.ts                         |   1 +
 packages/spec/schemas/config.schema.json           |   6 +-
 packages/spec/schemas/workflow.schema.json         |   8 +-
 schemas/config.schema.json                         |   6 +-
 schemas/workflow.schema.json                       |   8 +-
 .../baselines/v0.7-compatibility-candidate.json    | 101 +++++++++++++--
 .../check-compatibility-contract-baseline.mjs      | 110 ++++++++++++++--
 66 files changed, 712 insertions(+), 602 deletions(-)
```

</details>
