# PR Review

Created: 2026-04-03T16:29:32.214Z
Branch: task/202604031627-DA1JVW/incidents-auto-promotion

## Summary

Auto-promote reusable external incidents from task findings

Make finish/task workflows infer reusable external incident advice from resolved Findings blocks, keep incident states honest, and align advice lookup with scope/tag recurrence semantics.

## Scope

- In scope: Make finish/task workflows infer reusable external incident advice from resolved Findings blocks, keep incident states honest, and align advice lookup with scope/tag recurrence semantics.
- Out of scope: unrelated refactors not required for "Auto-promote reusable external incidents from task findings".

## Verification

### Plan

1. Run focused incidents runtime and CLI/task workflow tests covering auto-promotion, recurrence state, and advice lookup. Expected: new external findings promote deterministically and analogous tasks receive the expected advice.
2. Run docs/policy routing validation for the updated incidents contract. Expected: routing and policy invariants remain valid after the contract changes.
3. Build the agentplane package. Expected: the CLI/runtime compiles cleanly with no new type or bundling errors.

### Current Status

- State: ok
- Note: Verified: incidents promotion now accepts resolved external Findings marked with Fixability: external or IncidentExternal: true, first occurrences stay open but still surface through advice lookup, recurring equivalents stabilize on later entries, and the shipped policy/docs/help text matches that contract. Commands: bunx vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000; bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/command-guide.test.ts -u --hookTimeout 60000 --testTimeout 60000; bun run --filter=agentplane build; bun run docs:bootstrap:generate; node packages/agentplane/dist/cli.js docs cli --out docs/user/cli-reference.generated.mdx; node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run docs:bootstrap:check; bun run docs:cli:check; bun run docs:onboarding:check.

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

- Updated: 2026-04-03T16:41:53.361Z
- Branch: task/202604031627-DA1JVW/incidents-auto-promotion
- Head: 2740da03d7a1

```text
 .agentplane/tasks/202604031627-DA1JVW/README.md    | 118 ++++++++++++++
 .../tasks/202604031627-DA1JVW/pr/diffstat.txt      |   0
 .../tasks/202604031627-DA1JVW/pr/github-body.md    |  50 ++++++
 .../tasks/202604031627-DA1JVW/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604031627-DA1JVW/pr/meta.json |  14 ++
 .../tasks/202604031627-DA1JVW/pr/notes.jsonl       |   0
 .agentplane/tasks/202604031627-DA1JVW/pr/review.md |  57 +++++++
 .../tasks/202604031627-DA1JVW/pr/verify.log        |   0
 docs/user/agent-bootstrap.generated.mdx            |   4 +-
 docs/user/agents.mdx                               |   2 +-
 docs/user/cli-reference.generated.mdx              |   6 +-
 packages/agentplane/assets/policy/governance.md    |   7 +-
 packages/agentplane/assets/policy/incidents.md     |   1 +
 .../agentplane/assets/policy/workflow.branch_pr.md |   2 +-
 .../agentplane/assets/policy/workflow.direct.md    |   4 +-
 .../run-cli.core.help-snap.test.ts.snap            |   2 +-
 packages/agentplane/src/cli/bootstrap-guide.ts     |   4 +-
 .../src/cli/run-cli.core.incidents.test.ts         |  14 +-
 .../agentplane/src/cli/run-cli.core.tasks.test.ts  |  15 +-
 .../src/commands/incidents/collect.command.ts      |   5 +-
 .../src/commands/incidents/incidents.command.ts    |   2 +-
 .../agentplane/src/commands/incidents/shared.ts    |   3 +-
 .../src/runtime/incidents/resolve.test.ts          |  86 +++++++++--
 .../agentplane/src/runtime/incidents/resolve.ts    | 169 ++++++++++++++++++---
 packages/agentplane/src/runtime/incidents/types.ts |   4 +-
 25 files changed, 493 insertions(+), 77 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
