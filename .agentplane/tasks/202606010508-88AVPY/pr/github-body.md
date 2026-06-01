Task: `202606010508-88AVPY`
Title: Fix cloud backend failure exit semantics
Canonical task record: `.agentplane/tasks/202606010508-88AVPY/README.md`

## Summary

Fix cloud backend failure exit semantics

Fix GitHub issues #4343 and #4339. Ensure backend/cloud commands that surface E_BACKEND or E_NETWORK failures return nonzero exit codes and expose deterministic tests. No fallback or backwards-compatible aliases.

## Scope

- In scope: Fix GitHub issues #4343 and #4339. Ensure backend/cloud commands that surface E_BACKEND or E_NETWORK failures return nonzero exit codes and expose deterministic tests. No fallback or backwards-compatible aliases.
- Out of scope: unrelated refactors not required for "Fix cloud backend failure exit semantics".

## Verification

- State: ok
- Note:

```bash
bun x vitest run packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts. Result: pass, 19 \
  tests. Evidence: regression coverage now asserts cloud push HTTP 502 exits with E_BACKEND/6 and \
  cloud read autosync fetch failure exits with E_NETWORK/7, covering GitHub issues #4343 and #4339. \
  Command: bun run format:changed. Result: pass. Command: node .agentplane/policy/check-routing.mjs. \
  Result: pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-01T05:09:45.941Z
- Branch: task/202606010508-88AVPY/fix-cloud-backend-failure-exit-semantics
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.backend-sync.test.ts      | 102 +++++++++++++++++++++
 1 file changed, 102 insertions(+)
```

</details>
