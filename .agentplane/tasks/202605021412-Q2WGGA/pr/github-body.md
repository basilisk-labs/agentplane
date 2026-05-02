Task: `202605021412-Q2WGGA`
Title: Build bundled-runtime CLI artifact generator

## Summary

Build bundled-runtime CLI artifact generator

Implement a deterministic script that assembles AgentPlane CLI archives with an embedded Node runtime, installed production dependencies, package assets, wrapper entrypoints, version metadata, and sha256 outputs.

## Scope

- In scope: Implement a deterministic script that assembles AgentPlane CLI archives with an embedded Node runtime, installed production dependencies, package assets, wrapper entrypoints, version metadata, and sha256 outputs.
- Out of scope: unrelated refactors not required for "Build bundled-runtime CLI artifact generator".

## Verification

- State: ok
- Note: Review follow-up: addressed PR comments.

Command: node scripts/generate-standalone-cli-assets.mjs --check
Result: pass
Evidence: standalone CLI assets check for v0.4.1 (5 assets).
Scope: all standalone targets in offline check mode after review fixes.

Command: bun test packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts
Result: pass
Evidence: 3 pass, 0 fail, 18 expect() calls; added Windows quoted-wrapper assertions.
Scope: archive layout, wrapper quoting, metadata, checksum manifest, check-mode cleanup.

Command: bunx eslint scripts/generate-standalone-cli-assets.mjs packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts
Result: pass
Evidence: no lint output.
Scope: focused lint for generator and tests.

Command: bun run format:check
Result: pass
Evidence: All matched files use Prettier code style.
Scope: repository formatting.

Command: bun run docs:scripts:check
Result: pass
Evidence: scripts/README.md is up to date.
Scope: package script documentation.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy routing after review fixes.

Command: agentplane doctor
Result: pass
Evidence: doctor OK; errors=0 warnings=0.
Scope: repository health for task worktree.

Review resolutions:
- Replaced range-resolving npm install with bun.lock-backed `bun install --production --frozen-lockfile --ignore-scripts` for real dependency installation.
- Quoted Windows .cmd runtime and JS entrypoint paths.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

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
