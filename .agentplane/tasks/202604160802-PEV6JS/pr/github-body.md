## Summary

Isolate framework core runtime resolution inside framework checkouts

Ensure runtime source reporting and framework-mode package resolution prefer the framework checkout's packages/core instead of falling back to the shared repo root when running inside a framework checkout.

## Scope

- In scope: Ensure runtime source reporting and framework-mode package resolution prefer the framework checkout's packages/core instead of falling back to the shared repo root when running inside a framework checkout.
- Out of scope: unrelated refactors not required for "Isolate framework core runtime resolution inside framework checkouts".

## Verification

- State: ok
- Note: Verified framework runtime core isolation with focused checks: bun vitest run packages/agentplane/src/shared/runtime-source.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.test.ts -t runtime && bun run framework:dev:bootstrap && node packages/agentplane/bin/agentplane.js runtime explain && node packages/agentplane/bin/agentplane.js doctor
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-16T08:11:38.971Z
- Branch: task/202604160802-PEV6JS/isolate-framework-core-resolution
- Head: f87d2e703f91

```text
No changes detected.
```

</details>
