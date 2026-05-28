Task: `202605280427-XQJEPY`
Title: Migrate process runner to execa v9
Canonical task record: `.agentplane/tasks/202605280427-XQJEPY/README.md`

## Summary

Migrate process runner to execa v9

Upgrade @agentplaneorg/core process execution from execa v5 to v9, preserve runProcess/runProcessSync/startProcess/execFileAsync behavior, and audit other outdated package versions for follow-up decisions.

## Scope

- In scope: Upgrade @agentplaneorg/core process execution from execa v5 to v9, preserve runProcess/runProcessSync/startProcess/execFileAsync behavior, and audit other outdated package versions for follow-up decisions.
- Out of scope: unrelated refactors not required for "Migrate process runner to execa v9".

## Verification

- State: ok
- Note:

```text
Migrated @agentplaneorg/core process runner to execa v9.6.1 with compatibility normalization for
named API, killed flag, Buffer output, and Bun binary-output runtime behavior. Verification passed:
bun test packages/core/src/process/run-process.test.ts; bun run test:project -- core
packages/core/src/process/run-process.test.ts; bun run --filter=@agentplaneorg/core build; bun run
test:project -- core; bun run test:critical; bun run format:check; node
.agentplane/policy/check-routing.mjs; ap doctor; targeted eslint on changed process files; git diff
--check. npm outdated reports only patch-level @typescript-eslint/eslint-plugin,
@typescript-eslint/parser, and turbo follow-ups.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T04:28:48.102Z
- Branch: task/202605280427-XQJEPY/migrate-process-runner-to-execa-v9
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 bun.lock                                      |  82 +++++++++++++--
 packages/core/package.json                    |   2 +-
 packages/core/src/process/run-process.test.ts |  18 +++-
 packages/core/src/process/run-process.ts      | 140 ++++++++++++++++++--------
 4 files changed, 189 insertions(+), 53 deletions(-)
```

</details>
