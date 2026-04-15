## Summary

Split exact-sha release recovery from broad Core CI test surface

Add a workflow_dispatch release-recovery validation path that proves exact historical SHA publishability and emits release-ready artifacts without requiring the full evolving Core CI suite to pass on old commits.

## Scope

- In scope: Add a workflow_dispatch release-recovery validation path that proves exact historical SHA publishability and emits release-ready artifacts without requiring the full evolving Core CI suite to pass on old commits.
- Out of scope: unrelated refactors not required for "Split exact-sha release recovery from broad Core CI test surface".

## Verification

- State: ok
- Note: Verified: exact-sha workflow_dispatch recovery now uses a publishability-only validation path; ci-workflow-contract.test.ts passes locally.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T14:32:15.945Z
- Branch: task/202604151423-EPXV54/release-recovery-dispatch-path
- Head: 4731c5b89bae

```text
 .agentplane/tasks/202604151423-EPXV54/README.md    | 121 +++++++++++++++++++++
 .github/workflows/ci.yml                           |  56 +++++++++-
 .../commands/release/ci-workflow-contract.test.ts  |  18 ++-
 3 files changed, 186 insertions(+), 9 deletions(-)
```

</details>
