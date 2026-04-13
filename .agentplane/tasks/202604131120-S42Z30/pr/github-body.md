## Summary

Format release hardening files blocked by pre-push

Apply required Prettier formatting to the release-hardening files that currently block git push origin main after the branch_pr reconciliation fixes.

## Scope

- In scope: Apply required Prettier formatting to the release-hardening files that currently block git push origin main after the branch_pr reconciliation fixes.
- Out of scope: unrelated refactors not required for "Format release hardening files blocked by pre-push".

## Verification

- State: ok
- Note: Pre-push formatting blockers were rewritten and format:check now passes.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-13T11:22:20.606Z
- Branch: task/202604131120-S42Z30/format-prepush-blockers
- Head: 095510aedc6a

```text
 .agentplane/tasks/202604131120-S42Z30/README.md    | 94 ++++++++++++++++++++++
 .../run-cli.core.tasks.normalize-migrate.test.ts   | 14 ++--
 .../agentplane/src/commands/doctor.command.test.ts |  3 +-
 .../src/commands/task/hosted-merge-sync.ts         |  5 +-
 4 files changed, 105 insertions(+), 11 deletions(-)
```

</details>
