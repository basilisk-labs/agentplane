Task: `202605190941-P1Q6BB`
Title: Wait for release-ready source before manual publish
Canonical task record: `.agentplane/tasks/202605190941-P1Q6BB/README.md`

## Summary

Wait for release-ready source before manual publish

Make the publish workflow wait-aware for workflow_dispatch SHA targets so manual release publication waits for successful Core CI and the release-ready artifact instead of failing while CI is still in progress.

## Scope

- In scope: Make the publish workflow wait-aware for workflow_dispatch SHA targets so manual release publication waits for successful Core CI and the release-ready artifact instead of failing while CI is still in progress.
- Out of scope: unrelated refactors not required for "Wait for release-ready source before manual publish".

## Verification

- State: ok
- Note:

```text
Verified wait-aware release-ready source path: focused Vitest resolver/workflow contracts passed;
publish.yml workflow_dispatch now waits for Core CI before resolving release-ready artifacts.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T09:44:06.233Z
- Branch: task/202605190941-P1Q6BB/release-pipeline-hardening
- Head: cdae11ed0e8d

```text
No changes detected.
```

</details>
