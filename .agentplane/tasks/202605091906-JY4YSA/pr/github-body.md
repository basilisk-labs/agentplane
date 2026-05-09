Task: `202605091906-JY4YSA`
Title: Support packaged blueprint catalogs
Canonical task record: `.agentplane/tasks/202605091906-JY4YSA/README.md`

## Summary

Support packaged blueprint catalogs

Teach AgentPlane CLI to consume recipes-like blueprint release indexes with versioned package tarballs and checksums while preserving existing source catalog compatibility.

## Scope

- In scope: Teach AgentPlane CLI to consume recipes-like blueprint release indexes with versioned package tarballs and checksums while preserving existing source catalog compatibility.
- Out of scope: unrelated refactors not required for "Support packaged blueprint catalogs".

## Verification

- State: ok
- Note: Packaged blueprint catalog support verified.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T19:16:57.571Z
- Branch: task/202605091906-JY4YSA/packaged-blueprint-catalog
- Head: 8575da6dfc4d

```text
 .../blueprint/resolved-snapshot.json               | 496 +++++++++++++++++++++
 .../src/cli/run-cli.core.blueprint.test.ts         | 119 +++++
 .../src/commands/blueprints/blueprints.command.ts  |   6 +-
 .../agentplane/src/commands/blueprints/catalog.ts  | 252 +++++++++--
 4 files changed, 825 insertions(+), 48 deletions(-)
```

</details>
