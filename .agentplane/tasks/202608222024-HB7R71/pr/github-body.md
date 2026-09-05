Task: `202608222024-HB7R71`
Title: Publish AgentPlane v0.7.8 from exact release-ready main d93e42cc
Canonical task record: `.agentplane/tasks/202608222024-HB7R71/README.md`

## Summary

Publish AgentPlane v0.7.8 from exact release-ready main d93e42cc

Prepare, verify, merge, publish, and post-publish verify stable v0.7.8 from exact main d93e42ccaedd59e77fc17c495a01dc7cde049d0f after the mandatory incident gate closeout. Release-only scope: already-merged task-centric Core plus exactly one context.maximum_assimilation compatibility E2E. Do not add Knowledge Assimilation subsystem work, redesign context, or alter existing context contracts, prompts, extraction schemas, artifacts, provenance, or verification gates. Use only repository-owned candidate and hosted publish workflows; bind PR, Core CI release-ready artifact, publish-result, tag, GitHub Release, npm packages, and installed CLI readback to exact SHAs. Complete the repository-owned post-publish evidence follow-up and 0.7.9-beta.1 opening before capturing the final RepositorySnapshot.

## Scope

- In scope: Prepare, verify, merge, publish, and post-publish verify stable v0.7.8 from exact main d93e42ccaedd59e77fc17c495a01dc7cde049d0f after the mandatory incident gate closeout. Release-only scope: already-merged task-centric Core plus exactly one context.maximum_assimilation compatibility E2E. Do not add Knowledge Assimilation subsystem work, redesign context, or alter existing context contracts, prompts, extraction schemas, artifacts, provenance, or verification gates. Use only repository-owned candidate and hosted publish workflows; bind PR, Core CI release-ready artifact, publish-result, tag, GitHub Release, npm packages, and installed CLI readback to exact SHAs. Complete the repository-owned post-publish evidence follow-up and 0.7.9-beta.1 opening before capturing the final RepositorySnapshot.
- Out of scope: unrelated refactors not required for "Publish AgentPlane v0.7.8 from exact release-ready main d93e42cc".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run release:prepublish
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T20:29:26.343Z
- Branch: task/202608222024-HB7R71/publish-agentplane-v0-7-8-from-exact-release-rea
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/assets/header.svg                             |   4 +-
 docs/assets/readme-headers/adr.svg                 |   4 +-
 docs/assets/readme-headers/agentplane-cli.svg      |   4 +-
 docs/assets/readme-headers/agentplane.svg          |   4 +-
 docs/assets/readme-headers/core.svg                |   4 +-
 docs/assets/readme-headers/docs.svg                |   4 +-
 docs/assets/readme-headers/humanizer.svg           |   4 +-
 docs/assets/readme-headers/recipes.svg             |   4 +-
 docs/assets/readme-headers/releases.svg            |   4 +-
 docs/assets/readme-headers/schemas.svg             |   4 +-
 docs/assets/readme-headers/scripts.svg             |   4 +-
 docs/assets/readme-headers/skills.svg              |   4 +-
 docs/assets/readme-headers/spec.svg                |   4 +-
 docs/assets/readme-headers/testkit.svg             |   4 +-
 docs/releases/v0.7.8.md                            |  52 +++++++++++++++++++++
 website/static/img/social/docs/releases/v0.7.8.png | Bin 0 -> 53352 bytes
 website/static/img/social/manifest.json            |   8 ++++
 17 files changed, 88 insertions(+), 28 deletions(-)
```

</details>
