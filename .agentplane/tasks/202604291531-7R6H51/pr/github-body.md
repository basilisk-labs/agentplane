## Summary

Implement prompt module resolver and compiler

Add the core resolver/compiler that evaluates PromptModule load conditions, dependencies, merge policies, replacement/extension bindings, conflict handling, and validator phases without changing init or recipe lifecycle surfaces yet.

## Scope

- In scope: resolver/compiler runtime under `packages/agentplane/src/runtime/prompt-modules/`.
- In scope: deterministic ordering, load-condition filtering, dependency validation, merge conflict behavior, binding resolution, and validator execution model.
- Out of scope: init file emission, recipe manifest schema changes, and public CLI commands.

## Verification

- State: ok
- Note: Verified: reconciled PR metadata after compiler commit.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T17:51:19.421Z
- Branch: task/202604291531-7R6H51/prompt-module-compiler
- Head: 3395372c98b1

```text
 .../src/runtime/prompt-modules/compiler.test.ts    | 350 +++++++++++
 .../src/runtime/prompt-modules/compiler.ts         | 678 +++++++++++++++++++++
 .../agentplane/src/runtime/prompt-modules/index.ts |  12 +
 3 files changed, 1040 insertions(+)
```

</details>
