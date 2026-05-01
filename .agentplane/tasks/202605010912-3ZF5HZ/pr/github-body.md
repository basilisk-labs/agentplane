## Summary

Refresh npm package README metadata

Rewrite the npm-published package README to match the root README's usable onboarding shape and correct the package homepage metadata without publishing a new version.

## Scope

- In scope: Rewrite the npm-published package README to match the root README's usable onboarding shape and correct the package homepage metadata without publishing a new version.
- Out of scope: unrelated refactors not required for "Refresh npm package README metadata".

## Verification

- State: ok
- Note: Checks passed: node .agentplane/policy/check-routing.mjs; agentplane doctor; npm pack --json --dry-run --ignore-scripts in packages/agentplane; bunx prettier --check packages/agentplane/README.md packages/agentplane/package.json; git diff --check; local doc target existence check.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T11:40:54.682Z
- Branch: task/202605010912-3ZF5HZ/npm-readme-metadata
- Head: 3ac839bd2a7f

```text
 packages/agentplane/README.md    | 172 ++++++++++++++++++++-------------------
 packages/agentplane/package.json |   2 +-
 2 files changed, 89 insertions(+), 85 deletions(-)
```

</details>
