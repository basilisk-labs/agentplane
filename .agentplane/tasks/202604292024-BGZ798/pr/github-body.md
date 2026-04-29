## Summary

Enable recipe patching for prompt fragments

Extend recipe prompt mutation fixtures, diagnostics, and developer docs so recipes can patch, replace, disable, or validate individual named prompt fragments across gateway, policy, runner, and agent profile surfaces.

## Scope

- In scope: Extend recipe prompt mutation fixtures, diagnostics, and developer docs so recipes can patch, replace, disable, or validate individual named prompt fragments across gateway, policy, runner, and agent profile surfaces.
- Out of scope: unrelated refactors not required for "Enable recipe patching for prompt fragments".

## Verification

- State: ok
- Note: Implemented fragment_id prompt module selectors for recipe patch/replace/disable/validator flows; verified with recipe transaction, doctor runtime, compiler tests, docs freshness, typecheck, diff check, framework bootstrap, and doctor.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T21:36:49.683Z
- Branch: task/202604292024-BGZ798/recipe-fragment-patches
- Head: 6c626d164fc7

```text
No changes detected.
```

</details>
