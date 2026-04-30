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
- Note: Recovered hosted-close deltas committed at 014b04e1; policy routing, doctor, GitHub open-PR check, and diff hygiene passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T09:33:08.679Z
- Branch: task/202604300928-A4CZZ3/closure-recovery
- Head: 18ab2f5e6ef2

```text
 .agentplane/policy/incidents.md                         |  2 ++
 .agentplane/tasks/202604291531-864BKX/README.md         | 12 ++++++------
 .agentplane/tasks/202604291531-864BKX/pr/github-body.md |  2 +-
 .agentplane/tasks/202604291531-864BKX/pr/meta.json      |  9 +++++----
 .agentplane/tasks/202604291531-864BKX/pr/review.md      |  2 +-
 .agentplane/tasks/202604291531-N0H28A/README.md         | 12 ++++++------
 .agentplane/tasks/202604291531-N0H28A/pr/github-body.md |  2 +-
 .agentplane/tasks/202604291531-N0H28A/pr/meta.json      |  9 +++++----
 .agentplane/tasks/202604291531-N0H28A/pr/review.md      |  2 +-
 .agentplane/tasks/202604291531-Z6XH6Q/README.md         | 12 ++++++------
 .agentplane/tasks/202604291531-Z6XH6Q/pr/github-body.md |  2 +-
 .agentplane/tasks/202604291531-Z6XH6Q/pr/meta.json      |  9 +++++----
 .agentplane/tasks/202604291531-Z6XH6Q/pr/review.md      |  2 +-
 .agentplane/tasks/202604291532-BV5NQT/README.md         | 12 ++++++------
 .agentplane/tasks/202604291532-BV5NQT/pr/github-body.md |  2 +-
 .agentplane/tasks/202604291532-BV5NQT/pr/meta.json      |  9 +++++----
 .agentplane/tasks/202604291532-BV5NQT/pr/review.md      |  2 +-
 packages/agentplane/assets/policy/incidents.md          |  2 ++
 18 files changed, 56 insertions(+), 48 deletions(-)
```

</details>
