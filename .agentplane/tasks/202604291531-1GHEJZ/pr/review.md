# PR Review

Created: 2026-04-29T17:57:09.358Z
Branch: task/202604291531-1GHEJZ/framework-prompt-module-registry

## Summary

Create framework prompt module registry

Convert bundled framework prompt sources into a registry of PromptModules for AGENTS/CLAUDE gateway templates, policy modules, agent profile JSON templates, runner prompts, and runtime execution profile prompts without changing emitted files yet.

## Scope

- In scope: framework-owned PromptModule registry for bundled gateway, policy, agent profile, runner, and execution-profile prompt sources.
- In scope: stable addresses, owner metadata, provenance, content hashes, and load conditions matching workflow/policy gateway flavor where needed.
- Out of scope: changing `agentplane init` output and recipe-owned mutations.

## Verification

### Plan

1. Run `bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/runtime/prompt-modules/registry.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified framework prompt module registry: focused registry/compiler/template tests passed (20 tests), typecheck passed, git diff --check passed, framework bootstrap passed, doctor passed with 0 errors and 0 warnings.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert registry files and exports.
- Existing template loaders should continue to serve init/runner paths directly.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
