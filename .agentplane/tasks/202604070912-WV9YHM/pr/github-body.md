## Summary

Sync incident template assets when incidents registry mutates

When integrate or hosted-close promotes incidents into .agentplane/policy/incidents.md, the canonical asset copy under packages/agentplane/assets/policy remains stale and later agents:check fails. Make incident mutation paths keep both files in sync or make the canonical source update deterministic.

## Scope

- In scope: When integrate or hosted-close promotes incidents into .agentplane/policy/incidents.md, the canonical asset copy under packages/agentplane/assets/policy remains stale and later agents:check fails. Make incident mutation paths keep both files in sync or make the canonical source update deterministic.
- Out of scope: unrelated refactors not required for "Sync incident template assets when incidents registry mutates".

## Verification

### Plan

1. Run `bun test packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts`. Expected: incident promotion paths still pass and the framework-checkout regression for synced incident assets is covered.
2. Run `bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts`. Expected: touched implementation and regression coverage stay lint-clean.
3. Run `bun run agents:check`. Expected: after an incident-registry mutation path updates `.agentplane/policy/incidents.md`, the canonical asset copy under `packages/agentplane/assets/policy/incidents.md` remains in sync and the check passes.

### Current Status

- State: ok
- Note: Stabilized the wait-remote-pr-checks gh mock under parallel polling; targeted and fast test suites pass after commit f9a5267b.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-07T17:32:51.378Z
- Branch: task/202604070912-WV9YHM/sync-incident-assets
- Head: f9a5267b2673

```text
 .agentplane/tasks/202604070912-WV9YHM/README.md    | 118 +++++++++++++++++++++
 .../tasks/202604070912-WV9YHM/pr/diffstat.txt      |   0
 .../tasks/202604070912-WV9YHM/pr/github-body.md    |  50 +++++++++
 .../tasks/202604070912-WV9YHM/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604070912-WV9YHM/pr/meta.json |  14 +++
 .../tasks/202604070912-WV9YHM/pr/notes.jsonl       |   0
 .agentplane/tasks/202604070912-WV9YHM/pr/review.md |  57 ++++++++++
 .../tasks/202604070912-WV9YHM/pr/verify.log        |   0
 .../src/cli/run-cli.core.task-hosted-close.test.ts |  13 +++
 .../src/cli/wait-remote-pr-checks-script.test.ts   |   9 +-
 .../agentplane/src/commands/incidents/shared.ts    |  19 +++-
 packages/agentplane/src/policy/evaluate.test.ts    |  10 ++
 .../agentplane/src/shared/protected-paths.test.ts  |  11 ++
 packages/agentplane/src/shared/protected-paths.ts  |   2 +
 14 files changed, 298 insertions(+), 6 deletions(-)
```

</details>
