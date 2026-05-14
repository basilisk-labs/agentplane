Task: `202605141556-FFRZBW`
Title: Add runner playbook contracts
Canonical task record: `.agentplane/tasks/202605141556-FFRZBW/README.md`

## Summary

Add runner playbook contracts

Introduce generic execution blueprint, task playbook, runtime capability, and verifier contracts informed by BitGN failure classes without benchmark-specific task-id hacks.

## Scope

- In scope: Introduce generic execution blueprint, task playbook, runtime capability, and verifier contracts informed by BitGN failure classes without benchmark-specific task-id hacks.
- Out of scope: unrelated refactors not required for "Add runner playbook contracts".

## Verification

- State: ok
- Note:

```text
Re-verified after task-specific Verify Steps were recorded: runner playbook contract layer is
implemented and covered by focused checks.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T16:10:56.775Z
- Branch: task/202605141556-FFRZBW/runner-playbook-contracts
- Head: ba7585811055

```text
 .../blueprint/resolved-snapshot.json               | 552 +++++++++++++++++++++
 packages/agentplane/src/runner/playbooks.test.ts   |  61 +++
 packages/agentplane/src/runner/playbooks.ts        | 165 ++++++
 packages/agentplane/src/runner/types.ts            |  15 +
 packages/agentplane/src/runner/types/context.ts    |   2 +
 packages/agentplane/src/runner/types/playbooks.ts  |  89 ++++
 .../src/runner/usecases/task-run-blueprint.test.ts |  15 +
 .../src/runner/usecases/task-run-bootstrap.ts      |  18 +
 .../agentplane/src/runner/usecases/task-run.ts     |   2 +
 9 files changed, 919 insertions(+)
```

</details>
