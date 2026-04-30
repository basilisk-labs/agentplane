## Summary

Align runner and execution profile prompt runtime

Update runner prompt/runtime guidance for GPT-5.5: bundle authority, stop/output contract, reasoning effort behavior, verbosity support if runtime-backed, and a documented Responses phase applicability audit.

## Scope

- In scope: Update runner prompt/runtime guidance for GPT-5.5: bundle authority, stop/output contract, reasoning effort behavior, verbosity support if runtime-backed, and a documented Responses phase applicability audit.
- Out of scope: unrelated refactors not required for "Align runner and execution profile prompt runtime".

## Verification

- State: ok
- Note: Verified: runner and execution profile runtime aligned for GPT-5.5; execution.text_verbosity is schema-backed and rendered into runtime prompt blocks; reasoning_effort supports xhigh; RUNNER.md records outcome/stop/output, visible progress, and Responses phase audit. Checks: bun run schemas:sync, bun run schemas:check, targeted runner/config/runtime/registry/task-run tests, bun run typecheck, bun run lint:core, bun run agents:check, node .agentplane/policy/check-routing.mjs, git diff --check, targeted Prettier check, framework:dev:bootstrap.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T19:29:44.492Z
- Branch: task/202604301809-1ZMY90/gpt55-runner-runtime
- Head: bca982dcde98

```text
 docs/developer/modular-prompt-assembly.mdx              |  5 +++++
 docs/user/configuration.mdx                             |  6 ++++++
 packages/agentplane/assets/RUNNER.md                    |  5 +++++
 .../cli/run-cli.core.tasks.query-run-prepare.test.ts    |  5 +++++
 .../src/cli/run-cli/commands/init/write-config.ts       |  3 ++-
 .../src/runner/context/base-prompt-sources.ts           |  1 +
 .../agentplane/src/runner/context/base-prompts.test.ts  |  3 +++
 .../agentplane/src/runtime/execution-profile/model.ts   |  1 +
 .../src/runtime/execution-profile/resolve.test.ts       |  5 +++++
 .../agentplane/src/runtime/execution-profile/resolve.ts |  1 +
 .../src/runtime/prompt-modules/registry.test.ts         |  2 ++
 .../agentplane/src/runtime/prompt-modules/registry.ts   |  1 +
 packages/core/schemas/config.schema.json                |  6 ++++++
 packages/core/src/config/config.test.ts                 | 17 +++++++++++++++++
 packages/core/src/config/config.ts                      |  1 +
 packages/core/src/config/execution-profile.test.ts      |  2 ++
 packages/core/src/config/execution-profile.ts           |  3 +++
 packages/core/src/config/index.ts                       |  1 +
 packages/core/src/config/schema.impl.ts                 |  8 +++++++-
 packages/core/src/index.ts                              |  1 +
 packages/spec/schemas/config.schema.json                |  6 ++++++
 21 files changed, 81 insertions(+), 2 deletions(-)
```

</details>
