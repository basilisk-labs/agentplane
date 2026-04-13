## Summary

Make Core CI task-artifact exclusions effective

Artifact-only hosted-close PR #278 still triggered Core CI test/test-windows even though .agentplane/tasks/** was excluded from .github/path-filters.yml. Root cause: dorny/paths-filter evaluates list entries with default some semantics, so the positive .agentplane/** rule still wins. Update CI/prepublish filter steps so exclusions are effective, add regression coverage, and verify on the next hosted closure tail.

## Scope

- In scope: Artifact-only hosted-close PR #278 still triggered Core CI test/test-windows even though .agentplane/tasks/** was excluded from .github/path-filters.yml. Root cause: dorny/paths-filter evaluates list entries with default some semantics, so the positive .agentplane/** rule still wins. Update CI/prepublish filter steps so exclusions are effective, add regression coverage, and verify on the next hosted closure tail.
- Out of scope: unrelated refactors not required for "Make Core CI task-artifact exclusions effective".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-13T14:41:11.081Z
- Branch: task/202604131433-5NX3AW/ci-filter-every
- Head: 6b8b256a4354

```text
 .agentplane/tasks/202604131433-5NX3AW/README.md    | 99 ++++++++++++++++++++++
 .github/workflows/ci.yml                           |  1 +
 .github/workflows/prepublish.yml                   |  1 +
 .../commands/release/ci-workflow-contract.test.ts  |  7 ++
 4 files changed, 108 insertions(+)
```

</details>
