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
- Note: Command: agentplane docs cli --out docs/user/cli-reference.generated.mdx && bun run docs:cli:check
Result: pass
Evidence: regenerated docs/user/cli-reference.generated.mdx and docs parity check reported the reference up to date.
Scope: current branch head after refreshing generated CLI docs for finish command changes.

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

- Updated: 2026-04-09T15:17:49.460Z
- Branch: task/202604091444-DWESME/finish-findings-promotion
- Head: 5777005750e9

```text
 .agentplane/tasks/202604091444-DWESME/README.md    | 194 +++++++++++++++++++++
 .../tasks/202604091444-DWESME/pr/diffstat.txt      |  13 ++
 .../tasks/202604091444-DWESME/pr/github-body.md    |  63 +++++++
 .../tasks/202604091444-DWESME/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604091444-DWESME/pr/meta.json |  17 ++
 .../tasks/202604091444-DWESME/pr/notes.jsonl       |   0
 .agentplane/tasks/202604091444-DWESME/pr/review.md |  70 ++++++++
 .../tasks/202604091444-DWESME/pr/verify.log        |   0
 docs/user/cli-reference.generated.mdx              |  16 ++
 .../src/cli/run-cli.core.incidents.test.ts         | 162 ++++++++++++++++-
 packages/agentplane/src/commands/finish.run.ts     |  10 ++
 packages/agentplane/src/commands/finish.spec.ts    |  51 ++++++
 packages/agentplane/src/commands/task/finish.ts    |  89 ++++++++++
 13 files changed, 685 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
