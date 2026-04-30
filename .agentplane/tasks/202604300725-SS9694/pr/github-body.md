## Summary

Fix release formatting drift

Make format:check pass by applying the smallest Prettier-compatible formatting changes to release-blocking files, without changing prompt semantics or unrelated generated artifacts.

## Scope

- In scope: Make format:check pass by applying the smallest Prettier-compatible formatting changes to release-blocking files, without changing prompt semantics or unrelated generated artifacts.
- Out of scope: unrelated refactors not required for "Fix release formatting drift".

## Verification

- State: ok
- Note: Verification passed for formatting drift.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T07:43:30.050Z
- Branch: task/202604300725-SS9694/format-drift
- Head: 240adb569fd6

```text
 .agentplane/policy/dod.code.md                     |  3 ++
 .agentplane/policy/dod.core.md                     |  3 ++
 .agentplane/policy/dod.docs.md                     |  4 +++
 .agentplane/policy/examples/migration-note.md      |  1 +
 .agentplane/policy/examples/pr-note.md             |  5 +++
 .agentplane/policy/examples/unit-test-pattern.md   |  2 ++
 .agentplane/policy/governance.md                   |  6 ++++
 .agentplane/policy/incidents.md                    |  1 +
 .agentplane/policy/security.must.md                |  1 +
 .agentplane/policy/workflow.branch_pr.md           |  4 +++
 .agentplane/policy/workflow.direct.md              |  5 +++
 .agentplane/policy/workflow.md                     |  1 +
 .agentplane/policy/workflow.release.md             |  4 +++
 .agentplane/policy/workflow.upgrade.md             |  3 ++
 DESIGN.md                                          | 40 +++++++++++-----------
 packages/agentplane/assets/AGENTS.md               | 20 +++++++----
 packages/agentplane/assets/RUNNER.md               |  1 +
 packages/agentplane/assets/policy/dod.code.md      |  3 ++
 packages/agentplane/assets/policy/dod.core.md      |  3 ++
 packages/agentplane/assets/policy/dod.docs.md      |  4 +++
 .../assets/policy/examples/migration-note.md       |  1 +
 .../agentplane/assets/policy/examples/pr-note.md   |  5 +++
 .../assets/policy/examples/unit-test-pattern.md    |  2 ++
 packages/agentplane/assets/policy/governance.md    |  6 ++++
 packages/agentplane/assets/policy/incidents.md     |  1 +
 packages/agentplane/assets/policy/security.must.md |  1 +
 .../agentplane/assets/policy/workflow.branch_pr.md |  4 +++
 .../agentplane/assets/policy/workflow.direct.md    |  5 +++
 packages/agentplane/assets/policy/workflow.md      |  1 +
 .../agentplane/assets/policy/workflow.release.md   |  4 +++
 .../agentplane/assets/policy/workflow.upgrade.md   |  3 ++
 .../src/commands/doctor.command.runtime.test.ts    |  4 ++-
 .../agentplane/src/commands/doctor/prompt-graph.ts |  7 ++--
 .../src/runtime/prompt-fragments/markdown.test.ts  | 11 ++++--
 34 files changed, 134 insertions(+), 35 deletions(-)
```

</details>
