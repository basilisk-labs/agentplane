## Summary

Create framework prompt module registry

Convert bundled framework prompt sources into a registry of PromptModules for AGENTS/CLAUDE gateway templates, policy modules, agent profile JSON templates, runner prompts, and runtime execution profile prompts without changing emitted files yet.

## Scope

- In scope: framework-owned PromptModule registry for bundled gateway, policy, agent profile, runner, and execution-profile prompt sources.
- In scope: stable addresses, owner metadata, provenance, content hashes, and load conditions matching workflow/policy gateway flavor where needed.
- Out of scope: changing `agentplane init` output and recipe-owned mutations.

## Verification

- State: ok
- Note: Verified: reconciled PR metadata after registry commit 7b6c07e577d8. Prior checks remain current for the committed framework registry diff: focused tests, typecheck, git diff --check, framework bootstrap, and doctor passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T18:05:26.358Z
- Branch: task/202604291531-1GHEJZ/framework-prompt-module-registry
- Head: 6a19ad8678d3

```text
 .../agentplane/src/runtime/prompt-modules/index.ts |   5 +
 .../src/runtime/prompt-modules/registry.test.ts    | 136 ++++++++++
 .../src/runtime/prompt-modules/registry.ts         | 275 +++++++++++++++++++++
 3 files changed, 416 insertions(+)
```

</details>
