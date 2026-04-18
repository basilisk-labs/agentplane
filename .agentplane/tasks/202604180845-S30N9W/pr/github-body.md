## Summary

Restore formatting drift after delete-only pre-push refactor

Bring the files changed by NS8Y9G back into Prettier compliance so subsequent task-close pushes are not blocked by unrelated format drift.

## Scope

- In scope: Bring the files changed by NS8Y9G back into Prettier compliance so subsequent task-close pushes are not blocked by unrelated format drift.
- Out of scope: unrelated refactors not required for "Restore formatting drift after delete-only pre-push refactor".

## Verification

- State: ok
- Note: restored Prettier compliance for the NS8Y9G hook files so subsequent close-tail pushes are no longer blocked by unrelated format drift
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T08:49:19.828Z
- Branch: task/202604180845-S30N9W/format-unblock-ns8y9g
- Head: 568990e0ed21

```text
 packages/agentplane/src/cli/local-ci-selection.test.ts | 14 +++++++-------
 scripts/lib/pre-push-scope.mjs                         |  3 ++-
 2 files changed, 9 insertions(+), 8 deletions(-)
```

</details>
