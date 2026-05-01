## Summary

AP-13 follow-up: Extract task query fixtures

Move repeated task run/query setup into @agentplane/testkit cli-core-tasks-query helpers after AP-13 split landed before the helper extraction.

## Scope

- In scope: Move repeated task run/query setup into @agentplane/testkit cli-core-tasks-query helpers after AP-13 split landed before the helper extraction.
- Out of scope: unrelated refactors not required for "AP-13 follow-up: Extract task query fixtures".

## Verification

- State: ok
- Note: Verified AP-13 follow-up task query fixture extraction: helper diff applied on fresh branch and all impacted checks passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T11:59:43.063Z
- Branch: task/202605011155-R70MAA/task-query-fixtures-follow-up
- Head: 071f4ad5d136

```text
 ...run-cli.core.tasks.query-run-inspection.test.ts | 112 ++---------
 .../run-cli.core.tasks.query-run-prepare.test.ts   | 221 ++++-----------------
 .../testkit/src/cli-core-tasks-query.fixtures.ts   |  71 ++++++-
 3 files changed, 127 insertions(+), 277 deletions(-)
```

</details>
