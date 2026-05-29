Task: `202605292132-QRQK1M`
Title: Preserve staged index on policy hook refusal
Canonical task record: `.agentplane/tasks/202605292132-QRQK1M/README.md`

## Summary

Preserve staged index on policy hook refusal

Add regression coverage for GitHub issue #4313 so managed pre-commit protected-policy refusal preserves the staged index for retry with AGENTPLANE_ALLOW_POLICY=1.

## Scope

- In scope: Add regression coverage for GitHub issue #4313 so managed pre-commit protected-policy refusal preserves the staged index for retry with AGENTPLANE_ALLOW_POLICY=1.
- Out of scope: unrelated refactors not required for "Preserve staged index on policy hook refusal".

## Verification

- State: ok
- Note:

```text
Focused regression passes: bun test
packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts -t 'hooks run pre-commit blocks
AGENTS.md without env override'. Static checks pass: bun run typecheck, bun run lint:core, bun run
format:check, node .agentplane/policy/check-routing.mjs.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T21:33:04.651Z
- Branch: task/202605292132-QRQK1M/preserve-policy-hook-index
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts | 12 ++++++++++++
 1 file changed, 12 insertions(+)
```

</details>
