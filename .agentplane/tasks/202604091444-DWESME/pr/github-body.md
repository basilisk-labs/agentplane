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
- Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts
Result: pass
Evidence: 40/40 tests passed, including finish-time structured finding promotion during closeout.
Scope: finish CLI parsing, finish task mutation, and incident promotion flow.

Command: bun x eslint packages/agentplane/src/commands/finish.spec.ts packages/agentplane/src/commands/finish.run.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts
Result: pass
Evidence: eslint exited 0.
Scope: finish implementation and integration test coverage.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy gateway and routing budget integrity after finish command changes.

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

- Updated: 2026-04-09T15:09:00.196Z
- Branch: task/202604091444-DWESME/finish-findings-promotion
- Head: 3cf2c3611183

```text
No changes detected.
```

</details>
