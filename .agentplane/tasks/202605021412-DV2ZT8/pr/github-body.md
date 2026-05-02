Task: `202605021412-DV2ZT8`
Title: Add standalone artifact smoke tests

## Summary

Add standalone artifact smoke tests

Add cross-platform smoke coverage for unpacked bundled-runtime artifacts: agentplane --version, quickstart, init in a temp git repo, doctor, and runtime path checks without relying on a PATH node binary.

## Scope

- In scope: Add cross-platform smoke coverage for unpacked bundled-runtime artifacts: agentplane --version, quickstart, init in a temp git repo, doctor, and runtime path checks without relying on a PATH node binary.
- Out of scope: unrelated refactors not required for "Add standalone artifact smoke tests".

## Verification

- State: ok
- Note: Passed: agentplane task verify-show 202605021412-DV2ZT8; bun test packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts; node scripts/smoke-standalone-cli-artifact.mjs --artifact <synthetic fixture> --expected-version 1.2.3 --allow-synthetic-runtime; bun run release:standalone:check; bunx eslint scripts/smoke-standalone-cli-artifact.mjs packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-02T17:08:39.733Z
- Branch: task/202605021412-DV2ZT8/standalone-artifact-smoke-tests
- Head: f5e2e39d8c60

```text
No changes detected.
```

</details>
