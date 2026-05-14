Task: `202605141348-YAM2DX`
Title: Clarify context wiki structure guidance
Canonical task record: `.agentplane/tasks/202605141348-YAM2DX/README.md`

## Summary

Clarify context wiki structure guidance

Update the generated context/wiki/AGENTS.md template so agents analyze the base project and choose an appropriate wiki structure instead of assuming one fixed hierarchy.

## Scope

- In scope: Update the generated context/wiki/AGENTS.md template so agents analyze the base project and choose an appropriate wiki structure instead of assuming one fixed hierarchy.
- Out of scope: unrelated refactors not required for "Clarify context wiki structure guidance".

## Verification

- State: ok
- Note:

```bash
bun test packages/agentplane/src/cli/run-cli.core.init.test.ts --timeout 120000; Result: pass; \
  Evidence: 27 tests passed, including context init bootstraps AgentPlane and verifies generated \
  context/wiki/AGENTS.md guidance. Scope: context init scaffold and regression coverage. Command: \
  node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: \
  policy routing. Command: ap doctor; Result: pass with unrelated warnings; Evidence: doctor (OK), \
  warnings only for pre-existing branch_pr reconciliation drift on older tasks. Scope: repository \
  runtime health.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T13:56:54.473Z
- Branch: task/202605141348-YAM2DX/wiki-structure-guidance
- Head: 45a8ac8bfe06

```text
 packages/agentplane/src/cli/run-cli.core.init.test.ts | 7 +++++++
 packages/agentplane/src/commands/context/init.ts      | 2 ++
 2 files changed, 9 insertions(+)
```

</details>
