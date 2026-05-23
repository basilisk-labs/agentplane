Task: `202605231911-BZ4X3X`
Title: Polish homepage GitHub label and radius
Canonical task record: `.agentplane/tasks/202605231911-BZ4X3X/README.md`

## Summary

Polish homepage GitHub label and radius

Rename the public GitHub star label from Star to Github and give homepage blocks/buttons a very small border radius instead of fully square corners.

## Scope

- In scope: Rename the public GitHub star label from Star to Github and give homepage blocks/buttons a very small border radius instead of fully square corners.
- Out of scope: unrelated refactors not required for "Polish homepage GitHub label and radius".

## Verification

- State: ok
- Note:

```text
Evaluation accepted: built output contains Github navbar copy, screenshots render without Star
label, and homepage radius changes are visually restrained.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T19:12:04.195Z
- Branch: task/202605231911-BZ4X3X/github-label-radius
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 website/src/components/GitHubStarsButton.module.css |  1 +
 website/src/components/GitHubStarsButton.tsx        |  4 ++--
 website/src/css/custom.css                          |  8 ++++++--
 website/src/pages/_home.module.css                  | 11 +++++++++++
 website/src/theme/Root.tsx                          |  8 ++++----
 5 files changed, 24 insertions(+), 8 deletions(-)
```

</details>
