## Summary

AP-07: Introduce unified test route registry

Make Vitest workspace, aggregate suites, local CI selector, and routing checks consume one route registry.

## Scope

- In scope: Make Vitest workspace, aggregate suites, local CI selector, and routing checks consume one route registry.
- Out of scope: unrelated refactors not required for "AP-07: Introduce unified test route registry".

## Verification

- State: ok
- Note: Verified: unified test route registry drives Vitest projects, aggregate suites, local CI selector, and routing checks with 331 tests / 10 primary routes.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T09:02:42.117Z
- Branch: task/202605010645-D8EM8Y/test-route-registry
- Head: 41008296649b

```text
 scripts/check-critical-test-route.mjs |  31 +-
 scripts/check-test-routing.mjs        |   6 +-
 scripts/check-vitest-projects.mjs     |  49 +---
 scripts/lib/local-ci-selection.mjs    | 171 +----------
 scripts/lib/test-inventory.mjs        | 165 +----------
 scripts/lib/test-route-registry.mjs   | 536 ++++++++++++++++++++++++++++++++++
 scripts/run-vitest-suite.mjs          | 183 +-----------
 vitest.workspace.ts                   |  57 +---
 8 files changed, 617 insertions(+), 581 deletions(-)
```

</details>
