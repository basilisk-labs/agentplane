Task: `202605012054-HS993A`
Title: Fix publish evidence GH auth

## Summary

Fix publish evidence GH auth

Make post-publish release evidence PR recovery authenticate gh so successful releases do not end as failed after publication.

## Scope

- In scope: Make post-publish release evidence PR recovery authenticate gh so successful releases do not end as failed after publication.
- Out of scope: unrelated refactors not required for "Fix publish evidence GH auth".

## Verification

- State: ok
- Note: Passed publish workflow contract test, workflow command contract, lint, routing, diff check, and doctor.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T20:56:01.665Z
- Branch: task/202605012054-HS993A/publish-evidence-gh-token
- Head: d76b638117e0

```text
 .github/workflows/publish.yml                              |  5 +++++
 .../src/commands/release/publish-workflow-contract.test.ts | 14 ++++++++++++++
 2 files changed, 19 insertions(+)
```

</details>
