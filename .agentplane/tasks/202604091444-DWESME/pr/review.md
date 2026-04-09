# PR Review

Created: 2026-04-09T15:07:25.382Z
Branch: task/202604091444-DWESME/finish-findings-promotion

## Summary

Let finish append structured incident findings before promotion

Allow finish-time closure to record a structured finding and immediately promote it into incidents.md so recurring workflow failures can be captured even when the finding was identified only at closeout.

## Scope

- In scope: Allow finish-time closure to record a structured finding and immediately promote it into incidents.md so recurring workflow failures can be captured even when the finding was identified only at closeout.
- Out of scope: unrelated refactors not required for "Let finish append structured incident findings before promotion".

## Verification

### Plan

1. Reproduce finish-time closure where a reusable workflow finding is identified only at closeout. Expected: finish can append a structured finding and promote it into .agentplane/policy/incidents.md in the same flow. 2. Run focused incidents/finish tests. Expected: external or repo-fixable closeout findings update both task docs and the shared incident registry deterministically. 3. Run relevant lint/tests and policy routing check. Expected: incidents policy mirrors and CLI behavior stay aligned.

### Current Status

- State: ok
- Note: Command: bun x prettier --check packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/finish.spec.ts && bun x vitest run packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts && bun x eslint packages/agentplane/src/commands/finish.spec.ts packages/agentplane/src/commands/finish.run.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts
Result: pass
Evidence: Prettier matched, 40/40 tests passed, eslint exited 0 after CI formatting fix.
Scope: current branch head after post-CI formatting for finish-time incident promotion.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-09T15:14:29.412Z
- Branch: task/202604091444-DWESME/finish-findings-promotion
- Head: ff6ac2b7f8be

```text
 .agentplane/tasks/202604091444-DWESME/README.md    | 172 +++++++++++++++++++++
 .../tasks/202604091444-DWESME/pr/diffstat.txt      |   0
 .../tasks/202604091444-DWESME/pr/github-body.md    |  61 ++++++++
 .../tasks/202604091444-DWESME/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604091444-DWESME/pr/meta.json |  14 ++
 .../tasks/202604091444-DWESME/pr/notes.jsonl       |   0
 .agentplane/tasks/202604091444-DWESME/pr/review.md |  68 ++++++++
 .../tasks/202604091444-DWESME/pr/verify.log        |   0
 .../src/cli/run-cli.core.incidents.test.ts         | 162 ++++++++++++++++++-
 packages/agentplane/src/commands/finish.run.ts     |  10 ++
 packages/agentplane/src/commands/finish.spec.ts    |  51 ++++++
 packages/agentplane/src/commands/task/finish.ts    |  89 +++++++++++
 12 files changed, 627 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
