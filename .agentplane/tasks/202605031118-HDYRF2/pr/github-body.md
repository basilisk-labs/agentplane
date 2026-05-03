Task: `202605031118-HDYRF2`
Title: Add Bun binary smoke coverage

## Summary

Add Bun binary smoke coverage

Add a binary-specific smoke script/test route that builds a Bun executable and verifies version, quickstart, init, and doctor without relying on Node/Bun being present at runtime.

## Scope

- In scope: Add a binary-specific smoke script/test route that builds a Bun executable and verifies version, quickstart, init, and doctor without relying on Node/Bun being present at runtime.
- Out of scope: unrelated refactors not required for "Add Bun binary smoke coverage".

## Verification

- State: ok
- Note: Focused verification passed: bun run build; node scripts/smoke-bun-compiled-cli.mjs --json compiled the CLI and checked --version, quickstart, and role CODER; bun test packages/agentplane/src/commands/release/bun-compiled-cli-smoke-script.test.ts passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T12:03:51.355Z
- Branch: task/202605031118-HDYRF2/bun-binary-smoke
- Head: a9fe0c7708de

```text
 package.json                                       |   3 +-
 .../release/bun-compiled-cli-smoke-script.test.ts  |  26 ++++
 scripts/README.md                                  |   1 +
 scripts/smoke-bun-compiled-cli.mjs                 | 132 +++++++++++++++++++++
 4 files changed, 161 insertions(+), 1 deletion(-)
```

</details>
