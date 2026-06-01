Task: `202606010746-089WQK`
Title: Refresh Hermes docs social images for patch release
Canonical task record: `.agentplane/tasks/202606010746-089WQK/README.md`

## Summary

Refresh Hermes docs social images for patch release

Regenerate checked-in docs social images and manifest so release:check passes before preparing the next patch release.

## Scope

- In scope: Regenerate checked-in docs social images and manifest so release:check passes before preparing the next patch release.
- Out of scope: unrelated refactors not required for "Refresh Hermes docs social images for patch release".

## Verification

- State: ok
- Note:

```text
PR artifact freshness recheck: hosted checks passed on PR #4354 after final evaluator evidence
commit; refreshing verification so last_verified_diffstat_sha256 can match the current PR diffstat
digest before integration.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-01T07:47:43.061Z
- Branch: task/202606010746-089WQK/refresh-hermes-docs-social-images-for-patch-rele
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../img/social/docs/recipes/hermes-agentplane.png       | Bin 0 -> 61944 bytes
 .../img/social/docs/workflow-guides/hermes-kanban.png   | Bin 0 -> 61420 bytes
 website/static/img/social/manifest.json                 |  16 ++++++++++++++++
 3 files changed, 16 insertions(+)
```

</details>
