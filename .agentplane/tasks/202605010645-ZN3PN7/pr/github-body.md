## Summary

AP-16: Validate spec examples as mirrors

Validate packages/spec examples against generated schemas without making spec the source of truth.

## Scope

- In scope: Validate packages/spec examples against generated schemas without making spec the source of truth.
- Out of scope: unrelated refactors not required for "AP-16: Validate spec examples as mirrors".

## Verification

- State: ok
- Note: Verified spec examples against generated core schemas.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T12:52:20.745Z
- Branch: task/202605010645-ZN3PN7/spec-examples-validation
- Head: fbcd3c080103

```text
 package.json                    |   3 +-
 scripts/README.md               |   4 +-
 scripts/check-spec-examples.mjs | 204 ++++++++++++++++++++++++++++++++++++++++
 scripts/lib/check-registry.mjs  |   4 +
 4 files changed, 213 insertions(+), 2 deletions(-)
```

</details>
