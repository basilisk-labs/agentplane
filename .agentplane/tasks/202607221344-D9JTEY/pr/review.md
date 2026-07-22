# PR Review

Created: 2026-07-22T13:45:45.805Z

## Task

- Task: `202607221344-D9JTEY`
- Title: Release AgentPlane v0.6.24
- Status: DONE
- Branch: `task/202607221344-D9JTEY/release-v0-6-24`
- Canonical task record: `.agentplane/tasks/202607221344-D9JTEY/README.md`

## Verification

- State: ok
- Note: Release candidate v0.6.24 verified: frozen plan covers all 20 commits since v0.6.23; release prepublish completed all 82 isolated groups plus workflow coverage 34/34, significant coverage 204/204, and release-critical 16/16; focused help snapshot 13/13 passed; version parity, incident gate, release check, generated headers, workflow recovery snapshot, routing, doctor, local tarball installation, and package policy all pass.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-22T14:35:38.859Z
- Branch: task/202607221344-D9JTEY/release-v0-6-24
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .agentplane/workflows/last-known-good.md           |   4 +-
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
 docs/reference/generated-reference.mdx             |   6 +--
 docs/releases/v0.6.24.md                           |  57 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +--
 .../run-cli.core.help-snap.test.ts.snap            |   1 +
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 .../static/img/social/docs/releases/v0.6.24.png    | Bin 0 -> 54287 bytes
 website/static/img/social/manifest.json            |   8 +++
 27 files changed, 111 insertions(+), 42 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
