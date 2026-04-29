## Summary

Compile framework prompt registry from fragments

Wire the framework prompt module registry, init/upgrade baseline seeding, and runner prompt bridge to emit prompt modules from parsed source fragments while preserving installed outputs and existing prompt ordering.

## Scope

- In scope: Wire the framework prompt module registry, init/upgrade baseline seeding, and runner prompt bridge to emit prompt modules from parsed source fragments while preserving installed outputs and existing prompt ordering.
- Out of scope: unrelated refactors not required for "Compile framework prompt registry from fragments".

## Verification

- State: ok
- Note: Verified fragment-derived prompt registry preserves installed outputs.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T21:30:17.791Z
- Branch: task/202604292023-RSQTPD/fragment-registry-compile
- Head: 91df573d07be

```text
 packages/agentplane/src/agents/agents-template.ts  |  22 +-
 .../cli/run-cli/commands/init/steps/apply.test.ts  |   2 +
 .../src/cli/run-cli/commands/init/write-agents.ts  |  49 +++-
 .../src/runner/context/base-prompts.test.ts        |   1 +
 .../src/runner/context/prompt-block-shared.ts      |   9 +-
 .../agentplane/src/runtime/prompt-modules/model.ts |   2 +
 .../src/runtime/prompt-modules/registry.test.ts    |  85 ++++++-
 .../src/runtime/prompt-modules/registry.ts         | 273 ++++++++++++++++-----
 .../src/runtime/prompt-modules/validation.ts       |   2 +
 9 files changed, 355 insertions(+), 90 deletions(-)
```

</details>
