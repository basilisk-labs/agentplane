Task: `202608020830-G5AYGC`
Title: Disambiguate release evidence task selection
Canonical task record: `.agentplane/tasks/202608020830-G5AYGC/README.md`

## Summary

Disambiguate release evidence task selection

Fix post-publish evidence discovery so code tasks tagged release are not treated as release tasks; add regression coverage and record the authoritative v0.7.0 publish result on task 202607221854-XV67TD.

## Scope

- In scope: make release evidence discovery require semantic release classification (`task_kind=release` or `mutation_scope=release`); add regression coverage for code tasks that merely carry a `release` tag; apply the authoritative publish-result from run 30739430330 to release task 202607221854-XV67TD.
- Out of scope: republishing v0.7.0, moving its tag, changing release contents, or unrelated task-classification refactors.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T08:31:59.635Z
- Branch: task/202608020830-G5AYGC/disambiguate-release-evidence-task-selection
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607221854-XV67TD/README.md    | 54 +++++++++++++++++++---
 .../release/release-task-evidence-script.test.ts   | 26 +++++++++--
 scripts/release/release-task-evidence.mjs          | 19 +++++++-
 3 files changed, 88 insertions(+), 11 deletions(-)
```

</details>
