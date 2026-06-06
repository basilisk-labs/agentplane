# PR Review

Created: 2026-06-06T16:49:15.616Z

## Task

- Task: `202606061644-002BXX`
- Title: Refresh README headers for latest release
- Status: DOING
- Branch: `task/202606061644-002BXX/refresh-readme-headers-for-latest-release`
- Canonical task record: `.agentplane/tasks/202606061644-002BXX/README.md`

## Verification

- State: ok
- Note: Review fix verification: scripts/generate/generate-readme-header.mjs now uses packages/agentplane/package.json as the primary README header tag source and git tags only as fallback. Command: bun run docs:readme-header:check; Result: pass; Evidence: fresh for v0.6.18. Command: node --check scripts/generate/generate-readme-header.mjs; Result: pass. Command: bun run release:check; Result: pass; Evidence: header check, social images, package builds, tarball policy, and blueprint release gate passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-06T16:49:15.616Z
- Branch: task/202606061644-002BXX/refresh-readme-headers-for-latest-release
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/assets/header.svg                        |  4 +-
 docs/assets/readme-headers/adr.svg            |  4 +-
 docs/assets/readme-headers/agentplane-cli.svg |  4 +-
 docs/assets/readme-headers/agentplane.svg     |  4 +-
 docs/assets/readme-headers/core.svg           |  4 +-
 docs/assets/readme-headers/docs.svg           |  4 +-
 docs/assets/readme-headers/humanizer.svg      |  4 +-
 docs/assets/readme-headers/recipes.svg        |  4 +-
 docs/assets/readme-headers/releases.svg       |  4 +-
 docs/assets/readme-headers/schemas.svg        |  4 +-
 docs/assets/readme-headers/scripts.svg        |  4 +-
 docs/assets/readme-headers/skills.svg         |  4 +-
 docs/assets/readme-headers/spec.svg           |  4 +-
 docs/assets/readme-headers/testkit.svg        |  4 +-
 package.json                                  |  2 +-
 scripts/README.md                             | 68 +++++++++++++--------------
 scripts/generate/generate-readme-header.mjs   | 13 ++++-
 17 files changed, 75 insertions(+), 64 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
