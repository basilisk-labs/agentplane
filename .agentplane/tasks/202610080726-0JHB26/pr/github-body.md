Task: `202610080726-0JHB26`
Title: Isolate kernel exchange network authority test artifacts
Canonical task record: `.agentplane/tasks/202610080726-0JHB26/README.md`

## Summary

Isolate kernel exchange network authority test artifacts

Repair the release 0.7.13 qualification blocker: kernel-exchange.test.ts network-authority cases create a temporary root but use process.cwd() as gitRoot, leaking task-1 schema artifacts into the real repository and failing the final task-registry gate. Bind issuance to the temporary fixture root; preserve all allowed/narrowed/planning authority assertions; verify emitted schema containment, digest and unchanged real-repository task-1 state. Keep production code and registry enforcement unchanged. User authorizes all necessary release fixes, validation and main integration. Preserve prior candidate full CI passing evidence and actual final registry failure.

## Scope

- In scope: Repair the release 0.7.13 qualification blocker: kernel-exchange.test.ts network-authority cases create a temporary root but use process.cwd() as gitRoot, leaking task-1 schema artifacts into the real repository and failing the final task-registry gate. Bind issuance to the temporary fixture root; preserve all allowed/narrowed/planning authority assertions; verify emitted schema containment, digest and unchanged real-repository task-1 state. Keep production code and registry enforcement unchanged. User authorizes all necessary release fixes, validation and main integration. Preserve prior candidate full CI passing evidence and actual final registry failure.
- Out of scope: unrelated refactors not required for "Isolate kernel exchange network authority test artifacts".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-08T07:44:19.677Z
- Branch: task/202610080726-0JHB26/isolate-kernel-exchange-network-authority-test-a
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/kernel-exchange.test.ts      | 62 +++++++++++++++++++++-
 1 file changed, 60 insertions(+), 2 deletions(-)
```

</details>
