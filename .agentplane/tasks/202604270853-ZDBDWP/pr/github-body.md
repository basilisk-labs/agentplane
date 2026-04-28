## Summary

Unify lifecycle mutations through transition service

Move remaining task lifecycle mutation paths toward the shared workflow transition service so finish, verify rework, close flows, and hosted closure share the same state transition and doc side-effect rules.

## Scope

- In scope: Move remaining task lifecycle mutation paths toward the shared workflow transition service so finish, verify rework, close flows, and hosted closure share the same state transition and doc side-effect rules.
- Out of scope: unrelated refactors not required for "Unify lifecycle mutations through transition service".

## Verification

- State: ok
- Note: Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts; Result: pass, 3 files and 15 tests. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts; Result: pass, 12 files and 63 tests. Command: bun run typecheck; Result: pass. Command: git diff --check; Result: pass. Scope: shared lifecycle close transition command path.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-28T05:27:20.334Z
- Branch: task/202604270853-ZDBDWP/lifecycle-transition-service
- Head: f3e03766eb98

```text
No changes detected.
```

</details>
