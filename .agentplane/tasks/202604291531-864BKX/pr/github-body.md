## Summary

Add prompt graph diagnostics and drift checks

Expose prompt graph diagnostics and drift detection through doctor/explain-style surfaces so operators can see compiled modules, source provenance, repo overrides, recipe mutations, and stale generated prompt artifacts.

## Scope

- In scope: diagnostics for prompt graph composition, source provenance, active recipe mutations, and generated artifact drift.
- In scope: doctor/runtime explain surfaces that help agents decide whether init/upgrade/prompt artifacts need refresh.
- Out of scope: auto-fixing drift or publishing remote checks.

## Verification

- State: ok
- Note: Prompt graph diagnostics are exposed through runtime explain and doctor drift checks; declared verification passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T19:33:27.214Z
- Branch: task/202604291531-864BKX/prompt-graph-diagnostics
- Head: e030c46467a2

```text
 .../src/commands/doctor.command.runtime.test.ts    |  36 +++
 packages/agentplane/src/commands/doctor.run.ts     |   2 +
 .../agentplane/src/commands/doctor/prompt-graph.ts | 120 +++++++++
 .../src/commands/runtime.command.test.ts           |  93 +++++++
 .../agentplane/src/commands/runtime.command.ts     |  36 ++-
 .../commands/shared/prompt-graph-diagnostics.ts    | 292 +++++++++++++++++++++
 6 files changed, 571 insertions(+), 8 deletions(-)
```

</details>
