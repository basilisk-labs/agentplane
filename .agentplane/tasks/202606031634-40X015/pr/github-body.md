Task: `202606031634-40X015`
Title: Fix task-local artifact commit eligibility after finish
Canonical task record: `.agentplane/tasks/202606031634-40X015/README.md`

## Summary

Fix task-local artifact commit eligibility after finish

Resolve GitHub issue #4399: task-local generated blueprint/quality artifacts should not force a separate follow-up task or require --allow-tasks when committed for the same task.

## Scope

- In scope: Resolve GitHub issue #4399: task-local generated blueprint/quality artifacts should not force a separate follow-up task or require --allow-tasks when committed for the same task.
- Out of scope: unrelated refactors not required for "Fix task-local artifact commit eligibility after finish".

## Verification

- State: ok
- Note:

```text
Command: bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts
packages/agentplane/src/policy/evaluate.test.ts
packages/agentplane/src/commands/guard/impl/policy.test.ts
packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts --pool=forks
--testTimeout 120000 --hookTimeout 120000. Result: pass, 4 files and 43 tests passed. Command: node
.agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: ap doctor. Result:
pass, doctor OK with unrelated historical DONE-task warnings 202605221745-8BHZSX and
202606011809-VCQPP7. Command: git diff --check HEAD~1..HEAD. Result: pass. Live guard evidence: ap
commit without --allow-tasks auto-staged same-task README and blueprint artifacts from explicit
.agentplane/tasks/202606031634-40X015 allowlist before pre-commit signal-9 fallback; explicit
pre-commit hook then passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-03T16:43:46.319Z
- Branch: task/202606031634-40X015/fix-task-local-artifact-commit-eligibility-after
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/guard/impl/allow.test.ts          | 40 ++++++++++++++++++++++
 .../agentplane/src/commands/guard/impl/allow.ts    | 25 +++++++++++++-
 packages/agentplane/src/policy/evaluate.test.ts    | 32 +++++++++++++++++
 .../agentplane/src/policy/rules/protected-paths.ts | 36 ++++++++++++++++++-
 4 files changed, 131 insertions(+), 2 deletions(-)
```

</details>
