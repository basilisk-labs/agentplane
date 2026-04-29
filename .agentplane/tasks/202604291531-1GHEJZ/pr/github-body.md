## Summary

Create framework prompt module registry

Convert bundled framework prompt sources into a registry of PromptModules for AGENTS/CLAUDE gateway templates, policy modules, agent profile JSON templates, runner prompts, and runtime execution profile prompts without changing emitted files yet.

## Scope

- In scope: framework-owned PromptModule registry for bundled gateway, policy, agent profile, runner, and execution-profile prompt sources.
- In scope: stable addresses, owner metadata, provenance, content hashes, and load conditions matching workflow/policy gateway flavor where needed.
- Out of scope: changing `agentplane init` output and recipe-owned mutations.

## Verification

- State: ok
- Note: Verified framework prompt module registry: focused registry/compiler/template tests passed (20 tests), typecheck passed, git diff --check passed, framework bootstrap passed, doctor passed with 0 errors and 0 warnings.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T17:57:09.358Z
- Branch: task/202604291531-1GHEJZ/framework-prompt-module-registry
- Head: bcb2b9ad48d7

```text
No changes detected.
```

</details>
