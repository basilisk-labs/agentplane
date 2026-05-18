Task: `202605170905-RZ8M15`
Title: Minimize branch_pr generated artifacts
Canonical task record: `.agentplane/tasks/202605170905-RZ8M15/README.md`

## Summary

Minimize branch_pr generated artifacts

Reduce non-canonical generated artifacts in branch_pr while preserving compact traceability via README, ACR, PR metadata, and reconstructable digests.

## Scope

- In scope: Reduce non-canonical generated artifacts in branch_pr while preserving compact traceability via README, ACR, PR metadata, and reconstructable digests.
- Out of scope: unrelated refactors not required for "Minimize branch_pr generated artifacts".

## Verification

- State: ok
- Note:

```bash
bun run test:project agentplane -- run-cli.core.init.test.ts; Result: pass; Evidence: 287 files \
  passed, 1646 tests passed, 2 skipped. Command: bun run typecheck; Result: pass. Command: bun run \
  format:changed; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. \
  Command: git check-ignore for handoff and local-backups paths; Result: pass. Command: git push \
  origin task/202605170905-RZ8M15/untracked-artifacts; Result: pass with pre-push fast CI.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T10:52:50.432Z
- Branch: task/202605170905-RZ8M15/untracked-artifacts
- Head: fa7f111121e7

```text
 .../blueprint/resolved-snapshot.json               | 527 +++++++++++++++++++++
 .gitignore                                         |   2 +
 .../agentplane/src/cli/run-cli.core.init.test.ts   |   4 +
 .../src/runtime/shared/runtime-artifacts.ts        |   2 +
 4 files changed, 535 insertions(+)
```

</details>
