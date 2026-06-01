Task: `202606010958-KRTN4Z`
Title: Refresh v0.6.14 release social assets
Canonical task record: `.agentplane/tasks/202606010958-KRTN4Z/README.md`

## Summary

Refresh v0.6.14 release social assets

Generate and verify social preview assets for docs/releases/v0.6.14.md so release:check passes on main. Scope: website/static/img/social release image/manifest updates and task evidence only.

## Scope

- In scope: Generate and verify social preview assets for docs/releases/v0.6.14.md so release:check passes on main. Scope: website/static/img/social release image/manifest updates and task evidence only.
- Out of scope: unrelated refactors not required for "Refresh v0.6.14 release social assets".

## Verification

- State: ok
- Note:

```text
Social asset checks passed: generated v0.6.14 PNG at 1280x640, updated social manifest,
docs:social:check passed, and release parity passed. release:tasks:check is deferred until this
DOING social-assets task is merged and closed because the gate correctly blocks active release
tasks.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-01T09:59:31.450Z
- Branch: task/202606010958-KRTN4Z/refresh-v0-6-14-social-assets
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 website/static/img/social/docs/releases/v0.6.14.png | Bin 0 -> 53591 bytes
 website/static/img/social/manifest.json             |   8 ++++++++
 2 files changed, 8 insertions(+)
```

</details>
