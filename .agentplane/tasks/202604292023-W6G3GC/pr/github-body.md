## Summary

Migrate markdown prompt assets to named fragments

Add stable named fragment markers to AGENTS.md, RUNNER.md, and bundled policy markdown modules, preserving rendered prompt text while making each logical section addressable for replacement or disabling.

## Scope

- In scope: Add stable named fragment markers to AGENTS.md, RUNNER.md, and bundled policy markdown modules, preserving rendered prompt text while making each logical section addressable for replacement or disabling.
- Out of scope: unrelated refactors not required for "Migrate markdown prompt assets to named fragments".

## Verification

- State: ok
- Note: Verified markdown prompt fragments render without marker comments.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T21:13:10.886Z
- Branch: task/202604292023-W6G3GC/markdown-prompt-fragments
- Head: f96bdd28500e

```text
 packages/agentplane/assets/AGENTS.md               | 26 ++++++++
 packages/agentplane/assets/RUNNER.md               |  2 +
 packages/agentplane/assets/policy/dod.code.md      |  6 ++
 packages/agentplane/assets/policy/dod.core.md      |  6 ++
 packages/agentplane/assets/policy/dod.docs.md      |  8 +++
 .../assets/policy/examples/migration-note.md       |  2 +
 .../agentplane/assets/policy/examples/pr-note.md   |  8 +++
 .../assets/policy/examples/unit-test-pattern.md    |  2 +
 packages/agentplane/assets/policy/governance.md    | 12 ++++
 packages/agentplane/assets/policy/incidents.md     |  2 +
 packages/agentplane/assets/policy/security.must.md |  2 +
 .../agentplane/assets/policy/workflow.branch_pr.md |  8 +++
 .../agentplane/assets/policy/workflow.direct.md    | 10 +++
 packages/agentplane/assets/policy/workflow.md      |  2 +
 .../agentplane/assets/policy/workflow.release.md   |  8 +++
 .../agentplane/assets/policy/workflow.upgrade.md   |  6 ++
 .../agentplane/src/agents/agents-template.test.ts  | 72 ++++++++++++++++++++--
 packages/agentplane/src/agents/agents-template.ts  | 57 +++++++++++++++--
 .../src/runtime/prompt-fragments/markdown.test.ts  | 15 ++---
 .../src/runtime/prompt-fragments/markdown.ts       | 26 +++++++-
 .../src/runtime/prompt-modules/registry.test.ts    | 15 ++++-
 .../src/runtime/prompt-modules/registry.ts         | 10 ++-
 22 files changed, 277 insertions(+), 28 deletions(-)
```

</details>
