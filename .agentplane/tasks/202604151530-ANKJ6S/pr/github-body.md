## Summary

Let exact-sha publish recovery bypass bootstrap-doc stale-dist guard

Historical publish recovery should not fail release:prepublish on bootstrap-doc freshness checks that require current local dist manifests unavailable in exact historical checkout paths.

## Scope

- In scope: Historical publish recovery should not fail release:prepublish on bootstrap-doc freshness checks that require current local dist manifests unavailable in exact historical checkout paths.
- Out of scope: unrelated refactors not required for "Let exact-sha publish recovery bypass bootstrap-doc stale-dist guard".

## Verification

- State: ok
- Note: Verified: historical publish recovery now validates only the exact publish payload in publish.yml, keeps the release-ready artifact as the CI readiness source, and publish-workflow-contract.test.ts plus format:check pass locally.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T15:35:09.929Z
- Branch: task/202604151530-ANKJ6S/exact-sha-prepublish-gate
- Head: 80991fc42051

```text
 .agentplane/tasks/202604151530-ANKJ6S/README.md    | 121 +++++++++++++++++++++
 .github/workflows/publish.yml                      |  12 +-
 docs/developer/release-and-publishing.mdx          |   3 +-
 .../release/publish-workflow-contract.test.ts      |   8 +-
 4 files changed, 134 insertions(+), 10 deletions(-)
```

</details>
