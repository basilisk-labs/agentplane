Task: `202605030854-FNBYFZ`
Title: Harden external distribution publishing

## Summary

Harden external distribution publishing

Make Homebrew/Scoop/setup-agentplane external distribution publication open PRs even when repository metadata updates are denied, and make publish reporting distinguish metadata permission failures from missing credentials.

## Scope

- In scope: Make Homebrew/Scoop/setup-agentplane external distribution publication open PRs even when repository metadata updates are denied, and make publish reporting distinguish metadata permission failures from missing credentials.
- Out of scope: unrelated refactors not required for "Harden external distribution publishing".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T09:39:44.620Z
- Branch: task/202605030854-FNBYFZ/external-distribution-publish
- Head: 00c3d81386a4

```text
 .agentplane/policy/incidents.md                    |   1 +
 .github/workflows/publish.yml                      |   5 +-
 packages/agentplane/assets/policy/incidents.md     |   1 +
 .../publish-external-distribution-script.test.ts   | 100 ++++++++++++++++++++-
 .../write-publish-result-manifest-script.test.ts   |  91 +++++++++++++++++++
 scripts/manifest.mjs                               |  73 ++++++++++++++-
 scripts/publish-external-distribution.mjs          |  84 +++++++++++++----
 7 files changed, 333 insertions(+), 22 deletions(-)
```

</details>
