Task: `202609291255-PGF2EM`
Title: Recognize empty schema object staging directories during task scans
Canonical task record: `.agentplane/tasks/202609291255-PGF2EM/README.md`

## Summary

Recognize empty schema object staging directories during task scans

User-approved scanner repair. Native quality schema storage leaves an empty quality/objects/.staging directory next to sha256. Existing schema-only recognition rejects this legitimate shape and blocks canonical commit reconciliation. Recognize only an empty real staging directory, preserve all artifacts, and retain warnings for nonempty staging, symlinks, unknown siblings, damaged schemas and genuinely unreadable README. Add cold and warm projection regressions, run focused tests and typecheck, then resume issue 6020.

## Scope

- In scope: User-approved scanner repair. Native quality schema storage leaves an empty quality/objects/.staging directory next to sha256. Existing schema-only recognition rejects this legitimate shape and blocks canonical commit reconciliation. Recognize only an empty real staging directory, preserve all artifacts, and retain warnings for nonempty staging, symlinks, unknown siblings, damaged schemas and genuinely unreadable README. Add cold and warm projection regressions, run focused tests and typecheck, then resume issue 6020.
- Out of scope: unrelated refactors not required for "Recognize empty schema object staging directories during task scans".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-29T13:08:35.647Z
- Branch: task/202609291255-PGF2EM/recognize-empty-schema-object-staging-directorie
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../backends/task-backend.local-handoff.test.ts    | 51 +++++++++++++++++++++-
 .../backends/task-backend/local-backend-read.ts    | 12 ++++-
 2 files changed, 61 insertions(+), 2 deletions(-)
```

</details>
