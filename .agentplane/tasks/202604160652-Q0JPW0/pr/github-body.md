## Summary

Make protected-base integrate use explicit handoff result

Replace generic git-failure semantics for protected-base branch_pr integrate with an explicit handoff-required outcome while preserving existing handoff artifacts and operator route.

## Scope

- In scope: Replace generic git-failure semantics for protected-base branch_pr integrate with an explicit handoff-required outcome while preserving existing handoff artifacts and operator route.
- Out of scope: unrelated refactors not required for "Make protected-base integrate use explicit handoff result".

## Verification

- State: ok
- Note: Verified targeted exit-code and integrate regression coverage: bun vitest run packages/agentplane/src/cli/cli-contract.test.ts packages/agentplane/src/cli/exit-code.contract.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-16T06:53:13.999Z
- Branch: task/202604160652-Q0JPW0/explicit-handoff-result
- Head: 4fc96f4cf042

```text
No changes detected.
```

</details>
