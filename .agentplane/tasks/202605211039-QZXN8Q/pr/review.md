# PR Review

Created: 2026-05-21T10:40:55.586Z

## Task

- Task: `202605211039-QZXN8Q`
- Title: Fix open context GitHub issues
- Status: DOING
- Branch: `task/202605211039-QZXN8Q/fix-open-context-issues`
- Canonical task record: `.agentplane/tasks/202605211039-QZXN8Q/README.md`

## Verification

- State: ok
- Note: Final branch head d3f360d8c passed pre-push fast CI: formatting, schema/template/policy/release checks, build, typecheck, bundle build, cold-start baseline, recipes/scripts freshness, onboarding scenario, hotspot baseline, vitest routing, targeted lint, and targeted context unit tests (57 tests passed).
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
