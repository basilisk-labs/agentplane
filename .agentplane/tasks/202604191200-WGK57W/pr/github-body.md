## Summary

Record hosted publish evidence in release task closure

Extend hosted close handling for release-tagged tasks so DONE task artifacts record published package versions, release URL, and install-smoke evidence instead of only a generic merged-on-main note.

## Scope

- In scope: Extend hosted close handling for release-tagged tasks so DONE task artifacts record published package versions, release URL, and install-smoke evidence instead of only a generic merged-on-main note.
- Out of scope: unrelated refactors not required for "Record hosted publish evidence in release task closure".

## Verification

- State: ok
- Note: Added hosted release-evidence follow-up via publish workflow: successful publish-result now resolves the release task, writes canonical Verification evidence into the task README on a task-close branch, and opens/auto-merges a follow-up PR; validated by release-task-evidence script tests, publish workflow contract, eslint, prettier, and workflow lint.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-19T13:43:32.535Z
- Branch: task/202604191200-WGK57W/release-closure-evidence
- Head: 37d3f0d78bc4

```text
 .github/workflows/publish.yml                      | 150 ++++++++
 .../release/publish-workflow-contract.test.ts      |   9 +
 .../release/release-task-evidence-script.test.ts   | 293 +++++++++++++++
 scripts/release-task-evidence.mjs                  | 392 +++++++++++++++++++++
 4 files changed, 844 insertions(+)
```

</details>
