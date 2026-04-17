## Summary

Make recipe mutations transactional

Apply add/enable/disable/update/detach through candidate state and atomic artifact writes so recipe operations cannot leave partial registry or generated outputs behind.

## Scope

- In scope: Apply add/enable/disable/update/detach through candidate state and atomic artifact writes so recipe operations cannot leave partial registry or generated outputs behind.
- Out of scope: unrelated refactors not required for "Make recipe mutations transactional".

## Verification

- State: ok
- Note: Verified: recipes mutations now publish registry and derived artifacts from a validated candidate state, with rollback restoring vendored trees and active state when compilation fails.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T13:28:13.136Z
- Branch: task/202604171155-EZYZDF/transactional-recipe-mutations
- Head: cd42dd9166e5

```text
 .../src/commands/recipes.transaction.test.ts       | 279 +++++++++++++++++++++
 .../src/commands/recipes/impl/commands/add.ts      |  52 ++--
 .../src/commands/recipes/impl/commands/detach.ts   |  60 +++--
 .../src/commands/recipes/impl/commands/disable.ts  |   8 +-
 .../src/commands/recipes/impl/commands/enable.ts   |   8 +-
 .../src/commands/recipes/impl/commands/remove.ts   |  23 +-
 .../src/commands/recipes/impl/commands/update.ts   |  65 +++--
 .../commands/recipes/impl/mutation-transaction.ts  |  55 ++++
 .../src/commands/recipes/impl/overlay-project.ts   | 121 +++++++--
 .../recipes/impl/project-installed-recipes.ts      |  21 +-
 .../src/commands/recipes/impl/project-registry.ts  |  65 ++++-
 11 files changed, 633 insertions(+), 124 deletions(-)
```

</details>
