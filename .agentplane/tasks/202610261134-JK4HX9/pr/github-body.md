Task: `202610261134-JK4HX9`
Title: Prevent stale final-validation evidence from bypassing authority continuation
Canonical task record: `.agentplane/tasks/202610261134-JK4HX9/README.md`

## Summary

Prevent stale final-validation evidence from bypassing authority continuation

For a canonical branch PR task whose implementation changed after a recorded PASS, advance authority to the new repository fingerprint and execute fresh final validation before completion. Preserve fail-closed behavior and never synthesize verification. Add regression coverage for stale evidence and stable recovery.

## Scope

- In scope: For a canonical branch PR task whose implementation changed after a recorded PASS, advance authority to the new repository fingerprint and execute fresh final validation before completion. Preserve fail-closed behavior and never synthesize verification. Add regression coverage for stale evidence and stable recovery.
- Out of scope: unrelated refactors not required for "Prevent stale final-validation evidence from bypassing authority continuation".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-26T12:11:02.980Z
- Branch: task/202610261134-JK4HX9/prevent-stale-final-validation-evidence-from-byp
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/advance-task-step.ts         | 23 ------
 .../commands/task/roadmap-terminal-noop.test.ts    | 84 ++++++++++++++++++++++
 2 files changed, 84 insertions(+), 23 deletions(-)
```

</details>
