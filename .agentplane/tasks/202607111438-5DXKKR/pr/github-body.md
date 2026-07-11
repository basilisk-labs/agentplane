Task: `202607111438-5DXKKR`
Title: Fix release evidence task attribution
Canonical task record: `.agentplane/tasks/202607111438-5DXKKR/README.md`

## Summary

Fix release evidence task attribution

Resolve hosted publish evidence to the matching release task instead of whichever task README happens to be changed by the exact publish SHA; add regression coverage and correct v0.6.22 evidence attribution.

## Scope

- In scope: Resolve hosted publish evidence to the matching release task instead of whichever task README happens to be changed by the exact publish SHA; add regression coverage and correct v0.6.22 evidence attribution.
- Out of scope: unrelated refactors not required for "Fix release evidence task attribution".

## Verification

- State: ok
- Note:

```text
Version-matched release-task resolver, ambiguity guard, evidence preservation/idempotence, and
corrected v0.6.22 attribution verified: 17/17 focused tests, agentplane typecheck, format:check, and
full ci:contract pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-11T14:49:13.478Z
- Branch: task/202607111438-5DXKKR/post-release-fix-evidence-attribution
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607030734-6T937A/README.md    | 159 ++++++++++++++++-----
 .agentplane/tasks/202607092209-F33MNN/README.md    |  47 +++++-
 .../release/release-task-evidence-script.test.ts   | 124 +++++++++++++++-
 scripts/release/release-task-evidence.mjs          | 116 ++++++++++++++-
 4 files changed, 399 insertions(+), 47 deletions(-)
```

</details>
