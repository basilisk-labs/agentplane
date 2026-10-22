Task: `202610221621-BJVFYG`
Title: Repair issue 6159 duplicate JSONL and safe reset from named main base
Canonical task record: `.agentplane/tasks/202610221621-BJVFYG/README.md`

## Summary

Repair issue 6159 duplicate JSONL and safe reset from named main base

Current main and origin/main both resolve to 7860c880. Guarantee unique deterministic per-file JSONL references and matching context show/knowledge selection, and retain prior readable SQLite projection when reset or full rebuild fails. Reproduce issue #6159. Supersedes blocked XZQJTT, EQT9ZD, and R5SD8X; retain their histories. R5SD8X was blocked because its base_ref was a literal SHA rather than the named main branch.

## Scope

- In scope: Current main and origin/main both resolve to 7860c880. Guarantee unique deterministic per-file JSONL references and matching context show/knowledge selection, and retain prior readable SQLite projection when reset or full rebuild fails. Reproduce issue #6159. Supersedes blocked XZQJTT, EQT9ZD, and R5SD8X; retain their histories. R5SD8X was blocked because its base_ref was a literal SHA rather than the named main branch.
- Out of scope: unrelated refactors not required for "Repair issue 6159 duplicate JSONL and safe reset from named main base".

## Verification

- State: ok
- Note: Canonical validation sha256:909f9a2ed7ec358a6ab72c5513603adb4ad09b4286a0c42092ab88777e18ac64
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-22T16:33:48.270Z
- Branch: task/202610221621-BJVFYG/repair-issue-6159-duplicate-jsonl-and-safe-reset
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../context/reindex.incremental.unit.test.ts       | 125 ++++++++++++++++++++-
 packages/agentplane/src/commands/context/show.ts   |   7 +-
 packages/agentplane/src/context/context-utils.ts   |  59 +++++++---
 packages/agentplane/src/context/knowledge-ref.ts   |  28 ++---
 .../src/context/reindex-projection.test.ts         |  20 ++++
 .../agentplane/src/context/reindex-projection.ts   |   5 +-
 packages/agentplane/src/context/reindex.ts         |  56 ++++++---
 7 files changed, 241 insertions(+), 59 deletions(-)
```

</details>
