## Summary

Restore formatting after recipes release workflow fix

Bring the release workflow contract test back into Prettier compliance so subsequent branch_pr close-tail and cleanup pushes are not blocked after E9FXF3.

## Scope

- In scope: Bring the release workflow contract test back into Prettier compliance so subsequent branch_pr close-tail and cleanup pushes are not blocked after E9FXF3.
- Out of scope: unrelated refactors not required for "Restore formatting after recipes release workflow fix".

## Verification

- State: ok
- Note: restored Prettier compliance for the release workflow contract test so close-tail and cleanup pushes no longer fail after E9FXF3
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T15:36:04.807Z
- Branch: task/202604181532-YX13SX/format-release-contract-after-e9fxf3
- Head: 6dce79ebf1d2

```text
 .../agentplane/src/commands/release/publish-workflow-contract.test.ts | 4 +++-
 1 file changed, 3 insertions(+), 1 deletion(-)
```

</details>
