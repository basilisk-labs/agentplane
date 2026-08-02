Task: `202608012350-3KR5T7`
Title: Regenerate llms-full after 0.6.26 assimilation
Canonical task record: `.agentplane/tasks/202608012350-3KR5T7/README.md`

## Summary

Regenerate llms-full after 0.6.26 assimilation

Refresh the generated website/static/llms-full.txt artifact from current canonical documentation so main passes the documentation site freshness gate independently of the 0.7 migration-guide task.

## Scope

- In scope: Refresh the generated website/static/llms-full.txt artifact from current canonical documentation so main passes the documentation site freshness gate independently of the 0.7 migration-guide task.
- Out of scope: unrelated refactors not required for "Regenerate llms-full after 0.6.26 assimilation".

## Verification

- State: ok
- Note: Fresh deterministic evidence is bound to the current rework checkpoint.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T23:51:28.837Z
- Branch: task/202608012350-3KR5T7/regenerate-llms-full-after-0-6-26-assimilation
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 website/static/llms-full.txt | 49 ++++++++++++++++++++++++++------------------
 1 file changed, 29 insertions(+), 20 deletions(-)
```

</details>
