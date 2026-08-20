Task: `202608202133-1C8P0N`
Title: Add AP-TE Lite to framework agent instructions
Canonical task record: `.agentplane/tasks/202608202133-1C8P0N/README.md`

## Summary

Add AP-TE Lite to framework agent instructions

Replacement for 202608202107-NZ3PDK. Add the approved AP-TE Lite v0 convention to the shared prompt contract, audit bundled role prompts, and refresh the canonical generated built-in asset table. No linter, schema change, controlled dictionary, or historical rewrite.

## Scope

- In scope: Replacement for 202608202107-NZ3PDK. Add the approved AP-TE Lite v0 convention to the shared prompt contract, audit bundled role prompts, and refresh the canonical generated built-in asset table. No linter, schema change, controlled dictionary, or historical rewrite.
- Out of scope: unrelated refactors not required for "Add AP-TE Lite to framework agent instructions".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-20T22:08:46.536Z
- Branch: task/202608202133-1C8P0N/add-ap-te-lite-to-framework-agent-instructions
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/assets/AGENTS.md               | 11 +++++++++++
 .../src/shared/builtin-assets.generated.ts         | 23 +++++++++++++---------
 2 files changed, 25 insertions(+), 9 deletions(-)
```

</details>
