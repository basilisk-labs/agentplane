Task: `202609170039-R630`
Title: Fix v0.6.30 distribution recovery checkout
Canonical task record: `.agentplane/tasks/202609170039-R630/README.md`

## Summary

Fix v0.6.30 distribution recovery checkout

Make the maintenance distribution recovery workflow skip the unavailable marketing submodule so the exact-SHA v0.6.30 release can complete through its official recovery lane.

## Scope

- In scope: Make the maintenance distribution recovery workflow skip the unavailable marketing submodule so the exact-SHA v0.6.30 release can complete through its official recovery lane.
- Out of scope: unrelated refactors not required for "Fix v0.6.30 distribution recovery checkout".

## Verification

- State: ok
- Note:

```bash
bun run workflows:lint; Result: pass; Evidence: workflow and command guidance contract OK, workflow \
  lifecycle parity OK, critical Vitest route OK. Command: git diff --check; Result: pass. Hook \
  evidence: 16 test files and 146 tests passed. Scope: exact one-line checkout setting for \
  publish-distribution-module.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-16T21:41:04.298Z
- Branch: task/202609170039-R630/fix-v0-6-30-distribution-recovery-checkout
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/publish-distribution-module.yml | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

</details>
