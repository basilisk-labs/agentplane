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

```text
Additional residue classification completed. Command: jq empty on recovered ACR/blueprint artifacts;
Result: pass. Command: ap acr validate for recovered ACR files; Result: pass. Command: bun run
format:changed after evidence commit; Result: pass. Canonical ACR/blueprint files were tracked
instead of ignored; transient handoff/local-backups are covered by runtime gitignore.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T10:57:34.801Z
- Branch: task/202605170905-RZ8M15/untracked-artifacts
- Head: 8d3207cdfe9f

```text
 .agentplane/tasks/202605141638-3VAJ2V/acr.json     | 231 +++++++++
 .agentplane/tasks/202605141638-DYD163/acr.json     | 216 +++++++++
 .agentplane/tasks/202605141638-HGNT7H/acr.json     | 231 +++++++++
 .../blueprint/resolved-snapshot.json               | 526 ++++++++++++++++++++
 .../blueprint/resolved-snapshot.json               | 526 ++++++++++++++++++++
 .../blueprint/resolved-snapshot.json               | 527 +++++++++++++++++++++
 .gitignore                                         |   2 +
 .../agentplane/src/cli/run-cli.core.init.test.ts   |   4 +
 .../src/runtime/shared/runtime-artifacts.ts        |   2 +
 9 files changed, 2265 insertions(+)
```

</details>
