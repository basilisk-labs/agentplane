## Summary

AP-15: Factor CI contract and release extras

Split package CI scripts into shared contract, test, and release-extra lanes to reduce ci/release duplication.

## Scope

- In scope: Split package CI scripts into shared contract, test, and release-extra lanes to reduce ci/release duplication.
- Out of scope: unrelated refactors not required for "AP-15: Factor CI contract and release extras".

## Verification

- State: ok
- Note: Verified CI script lane factoring and release contract guard.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T12:36:39.904Z
- Branch: task/202605010645-5H9FJ5/ci-contract-release-extras
- Head: 287430946007

```text
 package.json                                       |  7 +++-
 .../commands/release/release-ci-contract.test.ts   | 23 ++++++----
 scripts/README.md                                  | 49 ++++++++++++----------
 3 files changed, 46 insertions(+), 33 deletions(-)
```

</details>
