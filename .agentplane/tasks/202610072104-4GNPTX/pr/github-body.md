Task: `202610072104-4GNPTX`
Title: Align canonical CLI regression fixtures with current task contracts
Canonical task record: `.agentplane/tasks/202610072104-4GNPTX/README.md`

## Summary

Align canonical CLI regression fixtures with current task contracts

Repair stale CLI test fixtures exposed by v0.7.13 qualification. Candidate 7d0f69fd7a980eebed6a6c88accd94a622b9880e passed release:check and release CI chunks 1-50, then chunk51 failed two tests. The public completion runtime double lacks command and adapter.read required by the current native owner. The task-new fixture expects legacy routing reasons instead of persisted effect and reversibility reasons. Preserve all completion, committed README, clean Git, frozen route and isolation assertions. Use exact canonical reason assertions and validate their declaration inputs. Initial semantic repair is bounded to the two identified test files. The intake ceiling admits CLI test-fixture repair only; any additional observed fixture failures require a fresh bounded native Plan amendment and independent review. No production behavior changes, test skipping, baseline weakening, release version changes or paid measurements. Existing user authorization covers necessary release repairs, verification and main integration. Original candidate failure evidence remains at .git/agentplane/kernel/exchanges/202610070445-2MV36M/15d0b7ae94e8d1027115eae80b7a2e58455a0a3f15ecc261777d8575dab997bc/native-validation-b7be5bb97b573c1a3e9ab200538657887d48df2177fa157616a833a3f16c42ac.json.

## Scope

- In scope: Repair stale CLI test fixtures exposed by v0.7.13 qualification. Candidate 7d0f69fd7a980eebed6a6c88accd94a622b9880e passed release:check and release CI chunks 1-50, then chunk51 failed two tests. The public completion runtime double lacks command and adapter.read required by the current native owner. The task-new fixture expects legacy routing reasons instead of persisted effect and reversibility reasons. Preserve all completion, committed README, clean Git, frozen route and isolation assertions. Use exact canonical reason assertions and validate their declaration inputs. Initial semantic repair is bounded to the two identified test files. The intake ceiling admits CLI test-fixture repair only; any additional observed fixture failures require a fresh bounded native Plan amendment and independent review. No production behavior changes, test skipping, baseline weakening, release version changes or paid measurements. Existing user authorization covers necessary release repairs, verification and main integration. Original candidate failure evidence remains at .git/agentplane/kernel/exchanges/202610070445-2MV36M/15d0b7ae94e8d1027115eae80b7a2e58455a0a3f15ecc261777d8575dab997bc/native-validation-b7be5bb97b573c1a3e9ab200538657887d48df2177fa157616a833a3f16c42ac.json.
- Out of scope: unrelated refactors not required for "Align canonical CLI regression fixtures with current task contracts".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-07T21:29:53.371Z
- Branch: task/202610072104-4GNPTX/align-canonical-cli-regression-fixtures-with-cur
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...i.core.task-advance.worktree-resolution.test.ts | 78 ++++++++++++----------
 .../src/cli/run-cli.core.tasks.create.test.ts      | 11 ++-
 2 files changed, 54 insertions(+), 35 deletions(-)
```

</details>
