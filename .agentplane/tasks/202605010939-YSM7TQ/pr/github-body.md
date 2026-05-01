## Summary

Rotate recipes signing trust root

Rotate the recipes remote index signing trust root, document key custody and rotation, and make the recipes catalog publish path sign indexes through GitHub Actions rather than local ad hoc keys.

## Scope

- In scope: Rotate the recipes remote index signing trust root, document key custody and rotation, and make the recipes catalog publish path sign indexes through GitHub Actions rather than local ad hoc keys.
- Out of scope: unrelated refactors not required for "Rotate recipes signing trust root".

## Verification

- State: ok
- Note: Command: node packages/agentplane/bin/agentplane.js recipes list-remote --refresh --yes with clean AGENTPLANE_HOME. Result: pass; Evidence: code-map@0.1.0 listed from default remote signed with key_id 2026-05. Command: bun test packages/agentplane/src/cli/run-cli.recipes.remote-usage.test.ts packages/agentplane/src/cli/run-cli.recipes.validation-list.test.ts packages/agentplane/src/cli/run-cli.recipes.install-project.test.ts packages/recipes/src/index.test.ts packages/recipes/src/overlay.test.ts. Result: pass; Evidence: 40 pass, 0 fail. Command: node .agentplane/policy/check-routing.mjs; bun run docs:ia:check; bun run docs:recipes:check; bun run format:check; agentplane doctor; gh pr checks 670. Result: pass; Evidence: routing OK, docs checks OK, Prettier OK, doctor OK, hosted checks pass/skipped as scoped. Key custody: RECIPES_INDEX_SIGNING_PRIVATE_KEY exists in agentplane-recipes secrets; rg found no private key material or 2026-05-dev in tracked tree.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T10:00:31.203Z
- Branch: task/202605010939-YSM7TQ/recipes-signing-rotation
- Head: 3fc930da98f1

```text
 agentplane-recipes                                 |  2 +-
 .../0009-recipes-index-signing-algorithm-policy.md | 25 ++++++++++++++++++++++
 docs/developer/recipes-development.mdx             |  6 ++++++
 docs/developer/recipes-safety.mdx                  |  4 ++++
 packages/recipes/src/constants.ts                  |  3 +++
 5 files changed, 39 insertions(+), 1 deletion(-)
```

</details>
