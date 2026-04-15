## Summary

Enable exact-sha release recovery and block skipped patch planning

Add Core CI workflow_dispatch support for exact release SHA recovery, make release-ready available for recovery runs, and make release planning stop when unpublished patch versions exist instead of skipping ahead.

## Scope

- In scope: Add Core CI workflow_dispatch support for exact release SHA recovery, make release-ready available for recovery runs, and make release planning stop when unpublished patch versions exist instead of skipping ahead.
- Out of scope: unrelated refactors not required for "Enable exact-sha release recovery and block skipped patch planning".

## Verification

- State: ok
- Note: Command: bun vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/commands/release/plan.test.ts; bun run framework:dev:bootstrap; agentplane doctor. Result: pass. Evidence: 5 targeted tests passed, framework bootstrap rebuilt repo-local runtime, doctor returned OK. Scope: .github/workflows/ci.yml, release planner guard, release workflow documentation.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T07:01:30.966Z
- Branch: task/202604150649-7N1Q4J/exact-sha-release-recovery
- Head: 73e5f09bd00f

```text
 .agentplane/tasks/202604150649-7N1Q4J/README.md    | 121 +++++++++++++++++++++
 .github/workflows/ci.yml                           |  22 +++-
 docs/developer/release-and-publishing.mdx          |  14 +++
 .../commands/release/ci-workflow-contract.test.ts  |   9 +-
 .../src/commands/release/plan.command.ts           |  50 +++++++++
 .../agentplane/src/commands/release/plan.test.ts   |  19 ++++
 6 files changed, 233 insertions(+), 2 deletions(-)
```

</details>
