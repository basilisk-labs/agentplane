Task: `202605091732-XBBTRA`
Title: Align cloud backend project id and clear recovery stash
Canonical task record: `.agentplane/tasks/202605091732-XBBTRA/README.md`

## Summary

Align cloud backend project id and clear recovery stash

Align tracked cloud backend project id with the effective .env project, run cloud backend pull/inspect/doctor checks, and remove the obsolete recovery stash after confirming no useful changes remain.

## Scope

- In scope: Align tracked cloud backend project id with the effective .env project, run cloud backend pull/inspect/doctor checks, and remove the obsolete recovery stash after confirming no useful changes remain.
- Out of scope: unrelated refactors not required for "Align cloud backend project id and clear recovery stash".

## Verification

- State: ok
- Note: Verified: backend.json project_id now matches effective .env project proj_PhwmbZq_UzFgKnXT; backend pull completed changed=0 conflicts=0; backend inspect shows no project override; doctor OK with only server-side rate_limited cloud sync warning.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T17:39:11.470Z
- Branch: task/202605091732-XBBTRA/cloud-project-sync
- Head: 820094dfb07a

```text
 .agentplane/backends/cloud/backend.json            |   2 +-
 .../blueprint/resolved-snapshot.json               | 374 +++++++++++++++++++++
 2 files changed, 375 insertions(+), 1 deletion(-)
```

</details>
