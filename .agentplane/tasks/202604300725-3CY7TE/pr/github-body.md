## Summary

Enforce recipe fragment mutability and E2E patch coverage

Close the remaining correctness gap for fragmented prompts by enforcing mutation rules for locked, replaceable, extendable, and append-only fragments, and adding an end-to-end active recipe regression that patches a real named framework fragment through the compiled prompt graph.

## Scope

- In scope: Close the remaining correctness gap for fragmented prompts by enforcing mutation rules for locked, replaceable, extendable, and append-only fragments, and adding an end-to-end active recipe regression that patches a real named framework fragment through the compiled prompt graph.
- Out of scope: unrelated refactors not required for "Enforce recipe fragment mutability and E2E patch coverage".

## Verification

- State: ok
- Note: Verification passed for prompt fragment mutability enforcement and E2E recipe patch coverage.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T07:54:40.529Z
- Branch: task/202604300725-3CY7TE/fragment-mutability
- Head: 9d4a5fa929c2

```text
 .../recipes/impl/project-installed-recipes.test.ts | 30 +++++++-
 .../src/runtime/prompt-modules/compiler.test.ts    | 88 ++++++++++++++++++++++
 .../src/runtime/prompt-modules/compiler.ts         | 37 +++++++++
 3 files changed, 154 insertions(+), 1 deletion(-)
```

</details>
