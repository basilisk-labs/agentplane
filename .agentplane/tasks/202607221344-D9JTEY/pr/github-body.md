Task: `202607221344-D9JTEY`
Title: Release AgentPlane v0.6.24
Canonical task record: `.agentplane/tasks/202607221344-D9JTEY/README.md`

## Summary

Release AgentPlane v0.6.24

Prepare release notes and the v0.6.24 release candidate from current main, pass release and hosted verification, merge through protected main, dispatch Publish to npm for the merged release SHA, and verify GitHub Release, tag, and npm package parity. Do not touch agentplane-loops.

## Scope

Release v0.6.24 from main at base SHA 9de894461a781549fd1044d588037870e5532acc. In scope: generated release plan; docs/releases/v0.6.24.md; package/version and generated release artifacts produced by AgentPlane release candidate; task/PR/quality evidence; protected-main merge; Publish to npm dispatch for the merged release SHA; GitHub tag/release and npm parity readback. Out of scope: agentplane-loops, unrelated implementation changes, dependency upgrades, and new feature work.

## Verification

- State: ok
- Note:

```text
Release candidate v0.6.24 verified: frozen plan covers all 20 commits since v0.6.23; release
prepublish completed all 82 isolated groups plus workflow coverage 34/34, significant coverage
204/204, and release-critical 16/16; focused help snapshot 13/13 passed; version parity, incident
gate, release check, generated headers, workflow recovery snapshot, routing, doctor, local tarball
installation, and package policy all pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-22T13:45:45.805Z
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
 packages/spec/examples/acr.json                    |  22 +++++---
 packages/testkit/package.json                      |   2 +-
 .../static/img/social/docs/releases/v0.6.24.png    | Bin 0 -> 54287 bytes
 website/static/img/social/manifest.json            |   8 +++
 27 files changed, 125 insertions(+), 46 deletions(-)
```

</details>
