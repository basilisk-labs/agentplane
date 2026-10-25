Task: `202610250214-EPJ5NA`
Title: Make cloud auto-pull freshness fixture deterministic
Canonical task record: `.agentplane/tasks/202610250214-EPJ5NA/README.md`

## Summary

Make cloud auto-pull freshness fixture deterministic

The cloud auto-pull stale-projection test uses a one-second freshness window and a live Date timestamp. Freeze Date only within that test so the seeded old projection remains stale and the mocked pull remains fresh under slow CI; restore real time afterward. Keep production code and assertions unchanged.

## Scope

- In scope: The cloud auto-pull stale-projection test uses a one-second freshness window and a live Date timestamp. Freeze Date only within that test so the seeded old projection remains stale and the mocked pull remains fresh under slow CI; restore real time afterward. Keep production code and assertions unchanged.
- Out of scope: unrelated refactors not required for "Make cloud auto-pull freshness fixture deterministic".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-25T02:54:28.387Z
- Branch: task/202610250214-EPJ5NA/make-cloud-auto-pull-freshness-fixture-determini
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/backends/task-backend.cloud.test.ts          | 20 +++++++++++++-------
 1 file changed, 13 insertions(+), 7 deletions(-)
```

</details>
