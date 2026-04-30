## Summary

Restore release-critical smoke suite

Investigate and fix the current release-critical CLI smoke and upgrade smoke failures so test:release:critical passes on the release candidate checkout. Scope includes only the failing smoke paths and minimal fixture/runtime changes required to make the release gate reliable.

## Scope

- In scope: Investigate and fix the current release-critical CLI smoke and upgrade smoke failures so test:release:critical passes on the release candidate checkout. Scope includes only the failing smoke paths and minimal fixture/runtime changes required to make the release gate reliable.
- Out of scope: unrelated refactors not required for "Restore release-critical smoke suite".

## Verification

- State: ok
- Note: Release-critical smoke suite is restored on current main; no code diff was required beyond prior fixes.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T08:02:17.598Z
- Branch: task/202604300725-T0M8X3/release-critical-smoke
- Head: 2000d29c87ee

```text
No changes detected.
```

</details>
