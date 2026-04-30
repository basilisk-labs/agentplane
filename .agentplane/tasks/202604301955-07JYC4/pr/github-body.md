## Summary

Prune unused GPT-5.5 prompt diagnostic exports

Remove or internalize the newly unused GPT-5.5 prompt diagnostic type exports so the Knip baseline guard returns to green without broadening the unused-code baseline.

## Scope

- In scope: Remove or internalize the newly unused GPT-5.5 prompt diagnostic type exports so the Knip baseline guard returns to green without broadening the unused-code baseline.
- Out of scope: unrelated refactors not required for "Prune unused GPT-5.5 prompt diagnostic exports".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T19:59:01.395Z
- Branch: task/202604301955-07JYC4/prune-gpt55-diagnostics
- Head: b5b81253af14

```text
 packages/agentplane/src/runtime/prompt-modules/gpt55-contract.ts | 4 ++--
 packages/agentplane/src/runtime/prompt-modules/index.ts          | 2 --
 2 files changed, 2 insertions(+), 4 deletions(-)
```

</details>
