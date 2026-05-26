Task: `202605260641-H5JAWT`
Title: Block unstaged generated task artifacts in pre-commit
Canonical task record: `.agentplane/tasks/202605260641-H5JAWT/README.md`

## Summary

Block unstaged generated task artifacts in pre-commit

Add a pre-commit guard that prevents commits when generated active task artifacts such as blueprint snapshots or evaluator quality reports remain untracked or unstaged.

## Scope

- In scope: Add a pre-commit guard that prevents commits when generated active task artifacts such as blueprint snapshots or evaluator quality reports remain untracked or unstaged.
- Out of scope: unrelated refactors not required for "Block unstaged generated task artifacts in pre-commit".

## Verification

- State: ok
- Note:

```bash
bun run test:precommit. Result: pass, 17 files and 145 tests passed. Scope: pre-commit hook/runtime \
  regression suite, including generated task artifact guard and commit wrapper allow-tasks behavior. \
  Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Scope: \
  AgentPlane routing policy.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-26T06:41:51.179Z
- Branch: task/202605260641-H5JAWT/generated-artifact-precommit
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.hooks.pre-commit.test.ts  | 78 +++++++++++++++++++
 .../src/commands/hooks/run.pre-commit.ts           | 90 +++++++++++++++++++++-
 2 files changed, 166 insertions(+), 2 deletions(-)
```

</details>
