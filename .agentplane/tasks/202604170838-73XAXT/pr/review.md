# PR Review

Created: 2026-04-17T08:40:01.645Z
Branch: task/202604170838-73XAXT/codex-plugin-install

## Summary

Add Codex plugin installer and metadata

Bundle a Codex plugin install flow, manifest metadata, and a Codex skill so AgentPlane can appear in the Codex plugins UI via a local marketplace.

## Scope

- In scope: Bundle a Codex plugin install flow, manifest metadata, and a Codex skill so AgentPlane can appear in the Codex plugins UI via a local marketplace.
- Out of scope: unrelated refactors not required for "Add Codex plugin installer and metadata".

## Verification

### Plan

1. Run `vitest run packages/agentplane/src/commands/codex/plugin-install.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: the new Codex plugin command, group roots, and help surfaces pass.
2. Run `bun run typecheck`. Expected: touched TypeScript surfaces compile without errors.
3. Review the generated plugin manifest and marketplace entry from the command tests. Expected: manifest asset paths stay relative `./...` and the marketplace contains one `agentplane` entry without disturbing unrelated plugins.

### Current Status

- State: ok
- Note: Codex plugin installer, manifest metadata, and help surfaces verified with typecheck, targeted Vitest, and targeted ESLint.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T10:12:44.274Z
- Branch: task/202604170838-73XAXT/codex-plugin-install
- Head: fe5c9371f8cd

```text
 docs/user/cli-reference.generated.mdx              |  60 +++++
 .../assets/codex-plugin/assets/header.png          | Bin 0 -> 25895 bytes
 .../agentplane/assets/codex-plugin/assets/icon.svg |   1 +
 .../agentplane/assets/codex-plugin/assets/logo.svg |   1 +
 .../assets/codex-plugin/skills/agentplane/SKILL.md |  35 +++
 .../run-cli.core.help-snap.test.ts.snap            |  15 ++
 .../src/cli/run-cli.core.codex-plugin.test.ts      |  75 ++++++
 .../src/cli/run-cli.core.group-root-usage.test.ts  |  12 +
 .../src/cli/run-cli.core.help-contract.test.ts     |   3 +
 .../src/cli/run-cli.core.help-snap.test.ts         |  11 +
 .../src/cli/run-cli/command-catalog.test.ts        |   2 +
 .../src/cli/run-cli/command-catalog/core.ts        |  20 ++
 .../agentplane/src/cli/run-cli/commands/codex.ts   | 134 +++++++++++
 .../agentplane/src/cli/run-cli/commands/core.ts    |   8 +
 .../src/commands/codex/plugin-install.test.ts      | 158 +++++++++++++
 .../src/commands/codex/plugin-install.ts           | 262 +++++++++++++++++++++
 16 files changed, 797 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
