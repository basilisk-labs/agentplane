Task: `202608111010-2M6168`
Title: Make task episode plans lossless and language-neutral
Canonical task record: `.agentplane/tasks/202608111010-2M6168/README.md`

## Summary

Make task episode plans lossless and language-neutral

Prevent valid user-authored Plan sections from blocking task brief, next-action, or advance. Preserve the task-selected language, keep full Plan content authoritative, and compact only optional context without mutating lifecycle state.

## Scope

- In scope: Prevent valid user-authored Plan sections from blocking task brief, next-action, or advance. Preserve the task-selected language, keep full Plan content authoritative, and compact only optional context without mutating lifecycle state.
- Out of scope: unrelated refactors not required for "Make task episode plans lossless and language-neutral".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-11T10:11:16.241Z
- Branch: task/202608111010-2M6168/make-task-episode-plans-lossless-and-language-ne
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/runner/context/task-context.test.ts        | 50 +++++++++++++++++++++-
 .../agentplane/src/runner/context/task-context.ts  | 27 ++++++++----
 2 files changed, 67 insertions(+), 10 deletions(-)
```

</details>
