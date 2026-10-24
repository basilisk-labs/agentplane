Task: `202610240900-3G83E0`
Title: Restore frozen replay anchor lock compatibility for Vitest 5.0.5 on release 0.7.13
Canonical task record: `.agentplane/tasks/202610240900-3G83E0/README.md`

## Summary

Restore frozen replay anchor lock compatibility for Vitest 5.0.5 on release 0.7.13

The current exact Vitest 5.0.5 bun.lock causes critical anchor lock tests to reject the otherwise approved release driver graph. Preserve the historical subject lock, pin the exact reviewed current Vitest package graph including additions and removals, reject any tampering or unrelated package changes, and verify focused critical tests plus native CI. Do not broaden an allowlist or change anchor identity.

## Scope

- In scope: The current exact Vitest 5.0.5 bun.lock causes critical anchor lock tests to reject the otherwise approved release driver graph. Preserve the historical subject lock, pin the exact reviewed current Vitest package graph including additions and removals, reject any tampering or unrelated package changes, and verify focused critical tests plus native CI. Do not broaden an allowlist or change anchor identity.
- Out of scope: unrelated refactors not required for "Restore frozen replay anchor lock compatibility for Vitest 5.0.5 on release 0.7.13".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-24T09:07:23.839Z
- Branch: task/202610240900-3G83E0/restore-frozen-replay-anchor-lock-compatibility
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...i.critical.agent-efficiency-anchor-lock.test.ts | 44 ++++++++++++++--------
 .../internal/agent-efficiency-anchor-runtime.mjs   | 12 ++++--
 2 files changed, 37 insertions(+), 19 deletions(-)
```

</details>
