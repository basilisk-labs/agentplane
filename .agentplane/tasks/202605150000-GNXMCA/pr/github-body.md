Task: `202605150000-GNXMCA`
Title: Fix v0.6.1 publish payload drift
Canonical task record: `.agentplane/tasks/202605150000-GNXMCA/README.md`

## Summary

Fix v0.6.1 publish payload drift

Update the release payload fixtures so the v0.6.1 publish workflow passes exact-ref validation, then resume publication verification.

## Scope

- In scope: Update the release payload fixtures so the v0.6.1 publish workflow passes exact-ref validation, then resume publication verification.
- Out of scope: unrelated refactors not required for "Fix v0.6.1 publish payload drift".

## Verification

- State: ok
- Note: Release checks passed after updating ACR example payload to 0.6.1.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-15T00:02:00.415Z
- Branch: task/202605150000-GNXMCA/fix-v061-publish-payload
- Head: 3507111dfd82

```text
 packages/spec/examples/acr.json | 4 ++--
 1 file changed, 2 insertions(+), 2 deletions(-)
```

</details>
