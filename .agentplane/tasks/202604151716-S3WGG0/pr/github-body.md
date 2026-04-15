## Summary

Resolve workflow_dispatch publish target from latest release-ready SHA

Manual publish on branch_pr main should resolve the latest reachable release-ready candidate instead of raw HEAD when closure/task-artifact commits sit on top of the code merge.

## Scope

- In scope: Manual publish on branch_pr main should resolve the latest reachable release-ready candidate instead of raw HEAD when closure/task-artifact commits sit on top of the code merge.
- Out of scope: unrelated refactors not required for "Resolve workflow_dispatch publish target from latest release-ready SHA".

## Verification

- State: ok
- Note: Verified publish target selection workflow change locally.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T17:22:05.659Z
- Branch: task/202604151716-S3WGG0/publish-target-latest-release-ready
- Head: 031a5a8a3b09

```text
 .agentplane/tasks/202604151716-S3WGG0/README.md    | 155 +++++++++++++++++++++
 .github/workflows/publish.yml                      |  36 +++--
 .../release/publish-workflow-contract.test.ts      |  14 +-
 3 files changed, 193 insertions(+), 12 deletions(-)
```

</details>
