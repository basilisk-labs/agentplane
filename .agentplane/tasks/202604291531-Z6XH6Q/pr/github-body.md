## Summary

Extend recipe manifests with prompt module mutations

Extend recipe/project overlay schema support so vendored recipes can declare prompt modules and structured prompt module mutations with validated asset references, without applying them to compiled init surfaces yet.

## Scope

- In scope: recipe manifest/project overlay parsing for prompt module declarations and mutation sets.
- In scope: validation for referenced module assets, recipe provenance, schema compatibility, and safe failure messages.
- Out of scope: applying recipe mutations to generated prompt artifacts or changing public scenario behavior.

## Verification

- State: ok
- Note: Recipe manifests now accept prompt_modules and prompt_mutation_sets JSON assets, validate recipe-owned module/mutation-set shape and provenance, and publish them into recipe-assets without applying them to overlay prompt surfaces.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T18:36:29.612Z
- Branch: task/202604291531-Z6XH6Q/recipe-prompt-mutations
- Head: 8cbee17f8634

```text
No changes detected.
```

</details>
