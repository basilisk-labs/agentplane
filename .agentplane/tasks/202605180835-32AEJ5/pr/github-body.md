Task: `202605180835-32AEJ5`
Title: Fix v0.6.2 ACR example version drift
Canonical task record: `.agentplane/tasks/202605180835-32AEJ5/README.md`

## Summary

Fix v0.6.2 ACR example version drift

Fix the release-blocking ACR example version drift so v0.6.2 publish validation can pass. Scope is limited to packages/spec/examples/acr.json producer/toolchain version alignment with package version 0.6.2.

## Scope

- In scope: Fix the release-blocking ACR example version drift so v0.6.2 publish validation can pass. Scope is limited to packages/spec/examples/acr.json producer/toolchain version alignment with package version 0.6.2.
- Out of scope: unrelated refactors not required for "Fix v0.6.2 ACR example version drift".

## Verification

- State: ok
- Note:

```text
Fixed ACR example version drift by aligning packages/spec/examples/acr.json producer and toolchain
versions to 0.6.2. Local checks passed: bun run release:acr-example:check and bun run release:check.
Hosted PR #3867 was green on head e3a3fcc1d before final metadata push.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T08:37:11.524Z
- Branch: task/202605180835-32AEJ5/fix-acr-example-v0-6-2
- Head: b6089d40a84c

```text
 packages/spec/examples/acr.json | 4 ++--
 1 file changed, 2 insertions(+), 2 deletions(-)
```

</details>
