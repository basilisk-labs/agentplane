Task: `202605091732-Y4XSCS`
Title: Refresh oversized test baseline
Canonical task record: `.agentplane/tasks/202605091732-Y4XSCS/README.md`

## Summary

Refresh oversized test baseline

Fix hotspots:check drift by reconciling the oversized test baseline with the current merged finish.validation.unit.test.ts size.

## Scope

- In scope: Fix hotspots:check drift by reconciling the oversized test baseline with the current merged finish.validation.unit.test.ts size.
- Out of scope: unrelated refactors not required for "Refresh oversized test baseline".

## Verification

- State: ok
- Note: Command: bun run hotspots:check; Result: pass; Evidence: Oversized test baseline OK (10 entries, 11536 total lines). Command: focused finish.validation vitest; Result: pass; Evidence: 22 tests passed. Command: bun run format:check and git diff --check; Result: pass.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T17:41:08.860Z
- Branch: task/202605091732-Y4XSCS/oversized-test-baseline
- Head: da87bd2f021a

```text
 .../blueprint/resolved-snapshot.json               | 496 +++++++++++++++++++++
 scripts/oversized-test-baseline.json               |   4 +-
 2 files changed, 498 insertions(+), 2 deletions(-)
```

</details>
