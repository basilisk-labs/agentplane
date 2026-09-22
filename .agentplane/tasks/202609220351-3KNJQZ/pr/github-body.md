Task: `202609220351-3KNJQZ`
Title: Remove marketing and recipes Git submodules
Canonical task record: `.agentplane/tasks/202609220351-3KNJQZ/README.md`

## Summary

Remove marketing and recipes Git submodules

Remove the marketing and agentplane-recipes gitlinks from the AgentPlane superproject. Keep both external repositories independent. Replace recipe submodule assumptions in CI, publish, developer bootstrap, documentation inventory generation, tests, and docs with explicit on-demand remote access or repository-neutral behavior. Preserve runtime recipe installation from the signed public catalog.

## Scope

- In scope: Remove the marketing and agentplane-recipes gitlinks from the AgentPlane superproject. Keep both external repositories independent. Replace recipe submodule assumptions in CI, publish, developer bootstrap, documentation inventory generation, tests, and docs with explicit on-demand remote access or repository-neutral behavior. Preserve runtime recipe installation from the signed public catalog.
- Out of scope: unrelated refactors not required for "Remove marketing and recipes Git submodules".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-22T04:01:31.671Z
- Branch: task/202609220351-3KNJQZ/remove-marketing-and-recipes-git-submodules
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/recipes-development.mdx             | 19 +++++++
 docs/recipes-inventory.json                        | 45 +--------------
 .../cli/generate-recipes-inventory-script.test.ts  | 63 +++++++++++----------
 scripts/checks/check-recipes-inventory-fresh.mjs   | 64 ++++++++++++++++++----
 scripts/generate/generate-recipes-inventory.mjs    | 54 ++++++++++++------
 5 files changed, 144 insertions(+), 101 deletions(-)
```

</details>
