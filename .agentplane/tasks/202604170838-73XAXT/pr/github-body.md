## Summary

Add Codex plugin installer and metadata

Bundle a Codex plugin install flow, manifest metadata, and a Codex skill so AgentPlane can appear in the Codex plugins UI via a local marketplace.

## Scope

- In scope: Bundle a Codex plugin install flow, manifest metadata, and a Codex skill so AgentPlane can appear in the Codex plugins UI via a local marketplace.
- Out of scope: unrelated refactors not required for "Add Codex plugin installer and metadata".

## Verification

- State: ok
- Note: Codex plugin installer, manifest metadata, and help surfaces verified with typecheck, targeted Vitest, and targeted ESLint.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T10:06:22.517Z
- Branch: task/202604170838-73XAXT/codex-plugin-install
- Head: 76f15ff54931

```text
 .../assets/codex-plugin/assets/header.png          | Bin 0 -> 25895 bytes
 .../agentplane/assets/codex-plugin/assets/icon.svg |   1 +
 .../agentplane/assets/codex-plugin/assets/logo.svg |   1 +
 .../assets/codex-plugin/skills/agentplane/SKILL.md |  35 +++
 .../run-cli.core.help-snap.test.ts.snap            |  15 ++
 .../src/cli/run-cli.core.codex-plugin.test.ts      |  83 +++++++
 .../src/cli/run-cli.core.group-root-usage.test.ts  |  12 +
 .../src/cli/run-cli.core.help-contract.test.ts     |   3 +
 .../src/cli/run-cli.core.help-snap.test.ts         |  11 +
 .../src/cli/run-cli/command-catalog.test.ts        |   2 +
 .../src/cli/run-cli/command-catalog/core.ts        |  24 ++
 .../agentplane/src/cli/run-cli/commands/codex.ts   | 134 +++++++++++
 .../agentplane/src/cli/run-cli/commands/core.ts    |   8 +
 .../src/commands/codex/plugin-install.test.ts      | 158 ++++++++++++
 .../src/commands/codex/plugin-install.ts           | 266 +++++++++++++++++++++
 15 files changed, 753 insertions(+)
```

</details>
