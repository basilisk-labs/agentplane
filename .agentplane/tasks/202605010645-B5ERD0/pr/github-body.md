## Summary

AP-09: Split guard implementation tests

Split guard commands.unit.test.ts by command family and promote mock context builders to testkit guard helpers.

## Scope

- In scope: Split guard commands.unit.test.ts by command family and promote mock context builders to testkit guard helpers.
- Out of scope: unrelated refactors not required for "AP-09: Split guard implementation tests".

## Verification

- State: ok
- Note: Verified: guard commands.unit.test.ts split into guard, commit close, and commit non-close suites; @agentplane/testkit/guard added for shared command context fixtures; guard project and oversized baseline pass.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T09:29:51.147Z
- Branch: task/202605010645-B5ERD0/guard-test-split
- Head: 400d8fee5bd6

```text
No changes detected.
```

</details>
