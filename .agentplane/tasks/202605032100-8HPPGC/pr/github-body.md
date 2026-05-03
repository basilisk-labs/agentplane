Task: `202605032100-8HPPGC`
Title: Finalize 0.4.3 release state

## Summary

Finalize 0.4.3 release state

Close merged ACR launch leaf tasks, align repository expected CLI version with 0.4.3, verify Bun binary/version surfaces, and prepare hosted publish.

## Scope

- In scope: Close merged ACR launch leaf tasks, align repository expected CLI version with 0.4.3, verify Bun binary/version surfaces, and prepare hosted publish.
- Out of scope: unrelated refactors not required for "Finalize 0.4.3 release state".

## Verification

- State: ok
- Note: Release finalization checks passed: doctor OK, routing OK, release parity OK, release:check OK, release:bun:check OK for five v0.4.3 assets, release:bun:smoke OK with compiled CLI version 0.4.3, release:demo:check OK, spec examples OK, docs CLI reference fresh, and npm README link grep confirmed ACR/docs surfaces.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T21:01:02.427Z
- Branch: task/202605032100-8HPPGC/finalize-043-release
- Head: 6e3966215e4b

```text
No changes detected.
```

</details>
