## Summary

Recover task hosted-close when base-side pr meta is missing

Make the hosted task closure command recover the merged PR/task metadata from the GitHub event or remote metadata when .agentplane/tasks/<task-id>/pr/meta.json is absent on the base checkout, so protected-main release waves do not require a manual closure PR.

## Scope

- In scope: Make the hosted task closure command recover the merged PR/task metadata from the GitHub event or remote metadata when .agentplane/tasks/<task-id>/pr/meta.json is absent on the base checkout, so protected-main release waves do not require a manual closure PR.
- Out of scope: unrelated refactors not required for "Recover task hosted-close when base-side pr meta is missing".

## Verification

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass. Evidence: 6/6 hosted-close and hosted-close-pr tests passed, including the missing base-side pr/meta.json regression. Scope: hosted-close merge-event fallback and adjacent closure recovery paths. Command: bun run framework:dev:bootstrap; Result: pass. Evidence: core build, agentplane build, and repo-local runtime verification completed without stale-snapshot warnings afterward. Scope: repo-local CLI runtime aligned with the patched hosted-close implementation.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-13T13:37:53.837Z
- Branch: task/202604131329-KHYHBT/hosted-close-pr-meta-fallback
- Head: a59a3ea04509

```text
No changes detected.
```

</details>
