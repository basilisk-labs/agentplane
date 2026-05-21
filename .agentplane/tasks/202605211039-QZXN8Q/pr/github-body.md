Task: `202605211039-QZXN8Q`
Title: Fix open context GitHub issues
Canonical task record: `.agentplane/tasks/202605211039-QZXN8Q/README.md`

## Summary

Fix open context GitHub issues

Batch-fix open GitHub context issues: Obsidian wiki contract, manifest source inventory, stale projections, and derived context consistency. Scope includes GitHub issues #3989, #3990, #3991, #3992, #3993, #3994, #3996, #3997, #3998. Investigate #3879 only for directly shared context runner recovery paths; otherwise leave it as separate follow-up.

## Scope

Included GitHub issues: #3989, #3990, #3991, #3992, #3993, #3994, #3996, #3997, #3998. Related investigation only: #3879. Allowed implementation surfaces: packages/agentplane context commands/runtime, focused context tests, generated CLI docs if command semantics change, and task/PR artifacts for this task.

## Verification

- State: ok
- Note:

```text
Final branch head d3f360d8c passed pre-push fast CI: formatting, schema/template/policy/release
checks, build, typecheck, bundle build, cold-start baseline, recipes/scripts freshness, onboarding
scenario, hotspot baseline, vitest routing, targeted lint, and targeted context unit tests (57 tests
passed).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-21T10:59:52.477Z
- Branch: task/202605211039-QZXN8Q/fix-open-context-issues
- Head: d3f360d8c834

```text
 .../blueprint/resolved-snapshot.json               | 570 +++++++++++++++++++++
 .../src/commands/context/issue-gates.unit.test.ts  | 263 ++++++++++
 .../src/commands/context/release-readiness.test.ts |  17 +-
 packages/agentplane/src/commands/context/search.ts |   3 +-
 .../commands/context/wiki.obsidian.unit.test.ts    |   2 +-
 packages/agentplane/src/commands/context/wiki.ts   |   8 +-
 packages/agentplane/src/context/context-utils.ts   |   2 +-
 packages/agentplane/src/context/doctor.ts          |  60 ++-
 packages/agentplane/src/context/ingest.ts          |  49 +-
 packages/agentplane/src/context/verify-task.ts     |  65 ++-
 10 files changed, 1014 insertions(+), 25 deletions(-)
```

</details>
