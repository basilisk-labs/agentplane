## Summary

Let verify append promotable incident findings in one command

The incident registry path exists, but real operator flow almost never leaves structured incident candidates because verify and findings are separate steps. Extend verify so a verifier can append a structured finding/incident candidate in the same command, preserving task-local opt-out and existing promotion semantics.

## Scope

- In scope: The incident registry path exists, but real operator flow almost never leaves structured incident candidates because verify and findings are separate steps. Extend verify so a verifier can append a structured finding/incident candidate in the same command, preserving task-local opt-out and existing promotion semantics.
- Out of scope: unrelated refactors not required for "Let verify append promotable incident findings in one command".

## Verification

### Plan

1. Run the focused verify/findings/incident tests. Expected: verify can append a structured finding in the same command and preserves existing verification behavior. 2. Validate local-only vs default-promotable semantics. Expected: default verify-added findings carry incident-candidate metadata, while explicit local-only entries stay task-local. 3. Run incidents collect on a representative task fixture. Expected: a verify-appended promotable finding can be promoted under the existing incidents rules.

### Current Status

- State: ok
- Note: Command: bun x vitest run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun x eslint packages/agentplane/src/cli/command-invocations.ts packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/commands/task/shared/transitions.ts packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/commands/task/verify-ok.command.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/verify-rework.command.ts packages/agentplane/src/commands/verify.run.ts packages/agentplane/src/commands/verify.spec.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun run framework:dev:bootstrap. Result: pass. Evidence: verify now accepts structured finding flags, records incident-candidate vs task-local findings in the same mutation path, and incidents collect sees verify-appended promotable findings while local-only entries stay skipped. Scope: verify-to-findings incident flow.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-08T18:50:24.855Z
- Branch: task/202604081816-DCDXVB/verify-incident-finding
- Head: 70c479c09c78

```text
No changes detected.
```

</details>
