# PR Review

Created: 2026-05-02T16:14:57.168Z
Branch: task/202605021412-Q2WGGA/standalone-artifact-generator

## Summary

Build bundled-runtime CLI artifact generator

Implement a deterministic script that assembles AgentPlane CLI archives with an embedded Node runtime, installed production dependencies, package assets, wrapper entrypoints, version metadata, and sha256 outputs.

## Scope

- In scope: Implement a deterministic script that assembles AgentPlane CLI archives with an embedded Node runtime, installed production dependencies, package assets, wrapper entrypoints, version metadata, and sha256 outputs.
- Out of scope: unrelated refactors not required for "Build bundled-runtime CLI artifact generator".

## Verification

### Plan

1. Run `node scripts/generate-standalone-cli-assets.mjs --check`. Expected: it builds all contract target archives in a temporary directory with synthetic embedded runtimes, validates archive layout, and exits successfully without network.
2. Run `bun test packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts`. Expected: focused tests confirm archive layout, metadata, checksums, wrapper entrypoints, and check-mode behavior.
3. Run `bun run docs:scripts:check`. Expected: package script documentation remains fresh after adding release scripts.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
5. Run `agentplane doctor`. Expected: repository health checks pass.
6. Review changed files and generated check output. Expected: implementation stays inside standalone generator, package scripts/docs, tests, and task artifacts.

### Current Status

- State: ok
- Note: Command: agentplane task verify-show 202605021412-Q2WGGA
Result: pass
Evidence: Verify Steps loaded before final verification.
Scope: task verification contract.

Command: node scripts/generate-standalone-cli-assets.mjs --check
Result: pass
Evidence: standalone CLI assets check for v0.4.1 (5 assets).
Scope: all contract targets with synthetic embedded runtime and offline layout validation.

Command: bun test packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts
Result: pass
Evidence: 3 pass, 0 fail, 16 expect() calls; POSIX, Windows, and all-target check-mode coverage.
Scope: archive layout, metadata, checksum manifest, wrappers, check-mode cleanup.

Command: bun run docs:scripts:check
Result: pass
Evidence: scripts/README.md is up to date.
Scope: package script documentation.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy routing after code/script changes.

Command: agentplane doctor
Result: pass
Evidence: doctor OK; errors=0 warnings=0.
Scope: repository health for task worktree.

Command: bunx eslint scripts/generate-standalone-cli-assets.mjs packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts
Result: pass
Evidence: no lint output after fixes.
Scope: focused lint for new script/test.

Command: bun run format:check
Result: pass
Evidence: All matched files use Prettier code style.
Scope: repository formatting.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-02T16:35:59.161Z
- Branch: task/202605021412-Q2WGGA/standalone-artifact-generator
- Head: fcc34f82b39f

```text
 package.json                                       |   2 +
 .../generate-standalone-cli-assets-script.test.ts  | 151 +++++++
 scripts/README.md                                  |   2 +
 scripts/generate-standalone-cli-assets.mjs         | 499 +++++++++++++++++++++
 4 files changed, 654 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
