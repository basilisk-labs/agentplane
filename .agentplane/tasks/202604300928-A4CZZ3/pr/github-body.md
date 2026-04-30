## Summary

Recover hosted closure branch deltas

Recover four hosted close branch commits that still contain closure metadata beyond origin/main, merge them through a branch_pr recovery PR, and remove stale remote branches after verification.

## Scope

- In scope: recover the exact missing hosted-close deltas from these remote heads into a fresh PR based on origin/main:
  - task-close/202604291531-Z6XH6Q/c69211301720
  - task-close/202604291531-N0H28A/ac327dd2b0c1
  - task-close/202604291531-864BKX/4bfe0b699a87
  - task-close/202604291532-BV5NQT/3b84434879a0
- In scope: preserve existing main history and merge only via GitHub PR.
- In scope: after successful merge, delete stale remote branches that are either merged closure branches or empty/behind legacy branches.
- Out of scope: unrelated CLI/runtime refactors, release changes, or rewriting old merged PR history.

## Verification

- State: ok
- Note: Recovered hosted-close branch deltas without code changes; policy routing, doctor, open PR check, and whitespace checks passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T09:29:34.019Z
- Branch: task/202604300928-A4CZZ3/closure-recovery
- Head: cf7f413e9725

```text
No changes detected.
```

</details>
