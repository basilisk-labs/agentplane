Task: `202605050621-DNQ2XD`
Title: Make branch_pr closeout idempotent

## Summary

Make branch_pr closeout idempotent

Prevent duplicate local task-close pull requests when hosted close automation has already closed a merged branch_pr task, and make pre-push range detection robust for new close branches.

## Scope

- In scope: Prevent duplicate local task-close pull requests when hosted close automation has already closed a merged branch_pr task, and make pre-push range detection robust for new close branches.
- Out of scope: unrelated refactors not required for "Make branch_pr closeout idempotent".

## Verification

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts -> pass (50 tests). Command: bunx eslint packages/agentplane/src/commands/task/finish-close.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts scripts/lib/pre-push-scope.mjs -> pass. Command: bunx prettier --check touched files -> pass. Command: bun run typecheck -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass. Command: bun run framework:dev:bootstrap -> pass. Command: node packages/agentplane/bin/agentplane.js doctor -> pass.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T06:22:07.988Z
- Branch: task/202605050621-DNQ2XD/closeout-idempotency
- Head: b4e8cc6193fd

```text
No changes detected.
```

</details>
