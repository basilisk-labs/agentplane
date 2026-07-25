Task: `202607250037-96WEYY`
Title: Make RF-04 replay cleanup retry-safe on macOS
Canonical task record: `.agentplane/tasks/202607250037-96WEYY/README.md`

## Summary

Make RF-04 replay cleanup retry-safe on macOS

Prevent Finder-created .DS_Store files from turning successful RF-04 offline replay assertions into cleanup-only ENOTEMPTY failures. Keep the frozen 50-run/55-provider-episode evidence unchanged and add deterministic cleanup regression coverage.

## Scope

- In scope: Prevent Finder-created .DS_Store files from turning successful RF-04 offline replay assertions into cleanup-only ENOTEMPTY failures. Keep the frozen 50-run/55-provider-episode evidence unchanged and add deterministic cleanup regression coverage.
- Out of scope: unrelated refactors not required for "Make RF-04 replay cleanup retry-safe on macOS".

## Verification

- State: ok
- Note:

```text
Independent review PASS at e1ed542204ff. Focused RF-04 test passed three consecutive final runs
(10/10 each) with unchanged 50 runs, 70/70 outcomes, 27/27 provider token cells, 170/170 scalar
cells, and structural SHA 006ddc...9ee4; test:critical passed all 11 chunks; typecheck, scoped
ESLint, Prettier, routing, hotspots, task lint, and diff-check passed; no provider/model calls were
made.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T00:39:56.590Z
- Branch: task/202607250037-96WEYY/make-rf-04-replay-cleanup-retry-safe-on-macos
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...tical.agent-efficiency-replay-hardening.test.ts | 170 +++++++++++++++++++--
 1 file changed, 157 insertions(+), 13 deletions(-)
```

</details>
