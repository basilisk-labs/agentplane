Task: `202605141404-8FZMYJ`
Title: Fail closed on external release publication
Canonical task record: `.agentplane/tasks/202605141404-8FZMYJ/README.md`

## Summary

Fail closed on external release publication

External distribution PR handoff must not be treated as completed publication; release evidence must require merged/default-branch verified channels or mark the release incomplete.

## Scope

- In scope: External distribution PR handoff must not be treated as completed publication; release evidence must require merged/default-branch verified channels or mark the release incomplete.
- Out of scope: unrelated refactors not required for "Fail closed on external release publication".

## Verification

- State: ok
- Note:

```text
Focused release publication checks passed: publish-result now treats pr_opened as incomplete,
external publisher verifies merged default-branch state, setup-agentplane tag publication is
covered, workflow contract fails incomplete publish-result, routing check passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T14:24:30.441Z
- Branch: task/202605141404-8FZMYJ/external-release-publish-proof
- Head: 635a230e3ef1

```text
 .github/workflows/publish-distribution-module.yml  |  26 ++++
 .github/workflows/publish.yml                      |   6 +
 docs/developer/release-and-publishing.mdx          |  11 +-
 .../publish-external-distribution-script.test.ts   | 104 +++++++++++++-
 .../release/publish-workflow-contract.test.ts      |   4 +
 .../write-publish-result-manifest-script.test.ts   |  76 +++++++++-
 scripts/release/manifest.mjs                       |   5 +-
 scripts/release/publish-external-distribution.mjs  | 159 ++++++++++++++++++++-
 8 files changed, 377 insertions(+), 14 deletions(-)
```

</details>
