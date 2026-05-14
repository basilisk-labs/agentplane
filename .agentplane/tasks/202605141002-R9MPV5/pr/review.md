# PR Review

Created: 2026-05-14T10:03:20.964Z

## Task

- Task: `202605141002-R9MPV5`
- Title: Generate README header image
- Status: DOING
- Branch: `task/202605141002-R9MPV5/readme-header-image`
- Canonical task record: `.agentplane/tasks/202605141002-R9MPV5/README.md`

## Verification

- State: ok
- Note: Final local fast CI is green for README header generator.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T10:14:23.510Z
- Branch: task/202605141002-R9MPV5/readme-header-image
- Head: 987a651189f2

```text
 .../blueprint/resolved-snapshot.json               | 526 +++++++++++++++++++++
 README.md                                          |   2 +-
 docs/assets/header.svg                             |  49 +-
 package.json                                       |   2 +
 scripts/README.md                                  |  38 +-
 scripts/generate/generate-readme-header.mjs        | 186 ++++++++
 6 files changed, 751 insertions(+), 52 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
