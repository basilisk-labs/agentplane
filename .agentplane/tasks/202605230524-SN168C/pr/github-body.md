Task: `202605230524-SN168C`
Title: Refresh CLI help snapshot for active work commands
Canonical task record: `.agentplane/tasks/202605230524-SN168C/README.md`

## Summary

Refresh CLI help snapshot for active work commands

Update stale CLI help snapshot coverage after active work and task brief commands changed the registered help output. This unblocks release prepublish heavy validation for v0.6.7.

## Scope

- In scope: Update stale CLI help snapshot coverage after active work and task brief commands changed the registered help output. This unblocks release prepublish heavy validation for v0.6.7.
- Out of scope: unrelated refactors not required for "Refresh CLI help snapshot for active work commands".

## Verification

- State: ok
- Note:

```text
Hosted PR #4075 checks passed: CodeQL, docs, PR verification, Release-ready manifest, test-windows,
verify-cli-critical, verify-contract, verify-coverage, verify-static, verify-unit, verify-workflow.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T05:25:16.141Z
- Branch: task/202605230524-SN168C/refresh-help-snapshot
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap       | 6 ++++--
 1 file changed, 4 insertions(+), 2 deletions(-)
```

</details>
