Task: `202605030807-DBY2RS`
Title: Fix standalone release doctor smoke marker

## Summary

Fix standalone release doctor smoke marker

Update standalone release artifact smoke testing to accept the current doctor OK output and surface doctor output on failures so v0.4.2 publish can complete.

## Scope

- In scope: Update standalone release artifact smoke testing to accept the current doctor OK output and surface doctor output on failures so v0.4.2 publish can complete.
- Out of scope: unrelated refactors not required for "Fix standalone release doctor smoke marker".

## Verification

- State: ok
- Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts --pool=forks --maxWorkers 1 --testTimeout 120000 --hookTimeout 120000; Result: pass; Evidence: 1 file, 5 tests passed. Command: node scripts/check-release-parity.mjs && git diff --check; Result: pass; Evidence: release parity OK and no whitespace errors.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T08:09:13.813Z
- Branch: task/202605030807-DBY2RS/standalone-doctor-smoke
- Head: 4960313bb41b

```text
 scripts/smoke-standalone-cli-artifact.mjs | 8 +++++++-
 1 file changed, 7 insertions(+), 1 deletion(-)
```

</details>
