## Summary

AP-06: Add prompt selector and merge diagnostics

Warn on broad disable selectors and implicit duplicate pick-one selection so prompt graph data loss is visible.

## Scope

- In scope: Warn on broad disable selectors and implicit duplicate pick-one selection so prompt graph data loss is visible.
- Out of scope: unrelated refactors not required for "AP-06: Add prompt selector and merge diagnostics".

## Verification

- State: ok
- Note: Verified: prompt diagnostics warnings pass focused compiler tests, typecheck, full lint:core, formatting, diff check, and framework bootstrap.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T08:12:32.550Z
- Branch: task/202605010645-WG423K/prompt-diagnostics
- Head: f35ffff75bef

```text
 .../src/runtime/prompt-modules/compiler.merge.ts   | 55 ++++++++++++++--
 .../src/runtime/prompt-modules/compiler.test.ts    | 75 ++++++++++++++++++++++
 .../src/runtime/prompt-modules/compiler.ts         |  2 +
 .../src/runtime/prompt-modules/mutations-engine.ts |  8 +++
 4 files changed, 136 insertions(+), 4 deletions(-)
```

</details>
