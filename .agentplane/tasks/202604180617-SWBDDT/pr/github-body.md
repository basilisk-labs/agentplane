## Summary

Adopt CommandResult for release and task commands

Introduce a typed command result contract and route selected release/task commands through renderer-owned output so command handlers stop writing output ad hoc.

## Scope

- In scope: Introduce a typed command result contract and route selected release/task commands through renderer-owned output so command handlers stop writing output ad hoc.
- Out of scope: unrelated refactors not required for "Adopt CommandResult for release and task commands".

## Verification

- State: ok
- Note: Introduced a typed CommandResult contract in cli/output and moved task comment/update/block onto the shared emitter path; typecheck, targeted lint on touched files, and focused unit tests passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T07:43:16.224Z
- Branch: task/202604180617-SWBDDT/command-result-contract
- Head: 534b112df55d

```text
No changes detected.
```

</details>
