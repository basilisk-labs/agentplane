Task: `202607231327-W084MM`
Title: Reconcile semantic clone baseline drift
Canonical task record: `.agentplane/tasks/202607231327-W084MM/README.md`

## Summary

Reconcile semantic clone baseline drift

Remove the two deduplicable semantic clone regressions already present on main, preserve intentional public barrel parity, then refresh the reviewed jscpd baseline so clone:check is truthful before RF-04 integration.

## Scope

- Replace the duplicated v1/v2 optional workflow root definitions with one shared schema shape while preserving both contracts.
- Replace three duplicated GitHub API transport blocks with one private retrying JSON helper while preserving each callers validation and failure semantics.
- Do not change the mirrored public task export entrypoints or scripts/baselines/clone-baseline.json.
- Restore clone:check from 91 to the existing baseline ceiling of 88; keep RF-04 files and semantics untouched.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-23T13:29:09.130Z
- Branch: task/202607231327-W084MM/reconcile-semantic-clone-baseline-drift
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/internal/sync-github.test.ts   | 91 +++++++++++++++++++++-
 .../src/commands/pr/internal/sync-github.ts        | 50 ++++--------
 packages/core/src/config/workflow-contract.test.ts | 62 ++++++++++++++-
 packages/core/src/config/workflow-contract.ts      | 19 +----
 4 files changed, 170 insertions(+), 52 deletions(-)
```

</details>
