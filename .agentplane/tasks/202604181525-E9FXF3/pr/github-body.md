## Summary

Publish recipes package in npm release workflow

Update the release workflow, smoke checks, and publish-result accounting so every published agentplane release also publishes and confirms @agentplaneorg/recipes before the CLI package is considered complete.

## Scope

- In scope: Update the release workflow, smoke checks, and publish-result accounting so every published agentplane release also publishes and confirms @agentplaneorg/recipes before the CLI package is considered complete.
- Out of scope: unrelated refactors not required for "Publish recipes package in npm release workflow".

## Verification

- State: ok
- Note: release workflow now treats @agentplaneorg/recipes as a required published package across detect, publish, smoke, and manifest surfaces; separate registry smoke reproduces that the currently published 0.3.13 release is still broken until recipes is actually published or superseded
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T15:25:35.357Z
- Branch: task/202604181525-E9FXF3/publish-recipes-release-workflow
- Head: b9273fbdc7ff

```text
No changes detected.
```

</details>
