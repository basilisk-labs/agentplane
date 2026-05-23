Task: `202605230709-SKBRHW`
Title: Refresh docs social image assets for release check
Canonical task record: `.agentplane/tasks/202605230709-SKBRHW/README.md`

## Summary

Refresh docs social image assets for release check

Regenerate checked-in docs social images so publish-time release:check passes on main before npm publication.

## Scope

- In scope: Regenerate checked-in docs social images so publish-time release:check passes on main before npm publication.
- Out of scope: unrelated refactors not required for "Refresh docs social image assets for release check".

## Verification

- State: ok
- Note:

```text
EVALUATOR quality gate passed after review fix: --check preserves semantic freshness through the
generated manifest and avoids OS-dependent PNG byte comparison.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T07:09:24.197Z
- Branch: task/202605230709-SKBRHW/refresh-social-images
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 website/scripts/generate-social-images.mjs | 55 ++++++++++++++++++++++++++++--
 1 file changed, 52 insertions(+), 3 deletions(-)
```

</details>
