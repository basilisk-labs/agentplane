Task: `202605190828-VFEE9F`
Title: Fix postpublish audit live asset verification
Canonical task record: `.agentplane/tasks/202605190828-VFEE9F/README.md`

## Summary

Fix postpublish audit live asset verification

Make the postpublish audit verify live GitHub Release assets instead of relying only on embedded release-distribution manifest entries, so release-distribution.json is not reported missing after a successful publish.

## Scope

- In scope: Make the postpublish audit verify live GitHub Release assets instead of relying only on embedded release-distribution manifest entries, so release-distribution.json is not reported missing after a successful publish.
- Out of scope: unrelated refactors not required for "Fix postpublish audit live asset verification".

## Verification

- State: ok
- Note:

```text
Command: bunx vitest --config vitest.workspace.ts run --project agentplane
packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts
```
Result: pass
Evidence: 1 file passed, 5 tests passed, duration 1.47s.
Scope: focused postpublish audit regression tests.

Command: bunx prettier scripts/release/audit-platform-publication.mjs packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts --check
Result: pass
Evidence: All matched files use Prettier code style.
Scope: touched audit script and test.

Command: bunx eslint scripts/release/audit-platform-publication.mjs packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts
Result: pass
Evidence: no lint output, exit 0.
Scope: touched audit script and test.

Command: node scripts/release/audit-platform-publication.mjs --publish-result .agentplane/.release/vfee9f-audit/publish-result.json --json
Result: pass
Evidence: v0.6.3 publish-result returned ok=true with failures=[].
Scope: live GitHub Release asset lookup against the successful v0.6.3 publish-result.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T08:29:58.137Z
- Branch: task/202605190828-VFEE9F/postpublish-audit-live-assets
- Head: 2a1e5c630239

```text
No changes detected.
```

</details>
