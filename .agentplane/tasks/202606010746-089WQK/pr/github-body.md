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

```bash
bun run docs:social:generate -> pass, generated 2 docs social images and left 204 unchanged. \
  Command: bun run docs:social:check -> pass, checked 206 docs social images. Command: bun run \
  release:check -> pass, release incident, ACR example, social image, package build, tarball policy, \
  and blueprint release gates passed. Command: bun run release:parity -> pass, package versions \
  remain 0.6.13. Command: node .agentplane/policy/check-routing.mjs -> pass. Command: ap doctor -> \
  pass with two pre-existing warnings for old DONE tasks missing implementation hashes. Command: bun \
  run release:tasks:check -> expected pre-finish blocker because this task is DOING; rerun after \
  integration/finish before release candidate.
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
