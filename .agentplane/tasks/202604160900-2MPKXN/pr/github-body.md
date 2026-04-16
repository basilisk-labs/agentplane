## Summary

Audit remaining local and remote branches

Classify the remaining local task/backup branches and remote task/task-close refs, integrate any still-relevant work through the canonical branch_pr route, and remove branches that are stale or already represented on main.

## Scope

- In scope: Classify the remaining local task/backup branches and remote task/task-close refs, integrate any still-relevant work through the canonical branch_pr route, and remove branches that are stale or already represented on main.
- Out of scope: unrelated refactors not required for "Audit remaining local and remote branches".

## Verification

- State: ok
- Note: Verified branch audit cleanup: merged-but-unclosed task projections S5T1VV and V0H90T are canonicalized, superseded release task 4G7YPZ is closed, stale local/remote task refs are removed, and policy routing still passes.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-16T10:01:34.081Z
- Branch: task/202604160900-2MPKXN/finalize-task-state-cleanup
- Head: 843cc1c4e572

```text
 .agentplane/tasks/202604131545-S5T1VV/README.md    |  18 +++-
 .agentplane/tasks/202604131545-S5T1VV/pr/meta.json |   8 +-
 .agentplane/tasks/202604131608-V0H90T/README.md    |  18 +++-
 .agentplane/tasks/202604131608-V0H90T/pr/meta.json |   8 +-
 .agentplane/tasks/202604150629-4G7YPZ/README.md    | 117 +++++++++++++++++++++
 5 files changed, 155 insertions(+), 14 deletions(-)
```

</details>
