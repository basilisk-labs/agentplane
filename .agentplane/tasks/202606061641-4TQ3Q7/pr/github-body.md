Task: `202606061641-4TQ3Q7`
Title: Fix release lifecycle reliability issues
Canonical task record: `.agentplane/tasks/202606061641-4TQ3Q7/README.md`

## Summary

Fix release lifecycle reliability issues

Batch fix for GitHub issues #4461, #4462, and #4463: hook shim timeout diagnostics, release candidate generated blueprint snapshot staging, and release evidence PR verification materialization.

## Scope

- In scope: code and focused test changes for #4461, #4462, and #4463.
- In scope: release/lifecycle workflow code and GitHub workflow diagnostics needed for evidence PR verification behavior.
- Out of scope: actual npm publish, release dispatch, unrelated lifecycle refactors, or modifying issues outside #4461-#4463.

## Verification

- State: ok
- Note:

```text
Command: bunx vitest run packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts
packages/agentplane/src/commands/release/apply.apply-flow.test.ts
packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --config
vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000
--hookTimeout 60000. Result: pass; 3 files / 14 tests passed. Scope: raw hook shim timeout
diagnostics, release candidate blueprint snapshot staging, publish workflow release evidence PR
verification contract. Command: bun run format:changed. Result: pass; 7 changed files match
Prettier. Scope: changed code/workflow files. Command: bun run --filter=agentplane typecheck.
Result: pass. Scope: agentplane TypeScript. Command: bun run --filter=agentplane build. Result:
pass. Scope: runtime build freshness. Command: node .agentplane/policy/check-routing.mjs. Result:
pass. Scope: routing policy. Command: git diff --check. Result: pass. Scope: whitespace.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-06T16:44:02.627Z
- Branch: task/202606061641-4TQ3Q7/fix-release-lifecycle-reliability-issues
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
