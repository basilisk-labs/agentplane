Task: `202605131725-VPZZ5B`
Title: Remove telemetry hosted runtime copy
Canonical task record: `.agentplane/tasks/202605131725-VPZZ5B/README.md`

## Summary

Remove telemetry hosted runtime copy

Remove public copy claims about no hosted runtime and no telemetry from README, package README, docs, and website content so messaging no longer depends on those trust slogans.

## Scope

- In scope: Remove public copy claims about no hosted runtime and no telemetry from README, package README, docs, and website content so messaging no longer depends on those trust slogans.
- Out of scope: unrelated refactors not required for "Remove telemetry hosted runtime copy".

## Verification

- State: ok
- Note: Removed public no hosted runtime/no telemetry/hosted dashboard copy from README, package README, docs, website content, static LLM text, and header SVG. Verified phrase search has no matches across README/package README/docs/website; format check, routing check, and doctor passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T17:36:48.918Z
- Branch: task/202605131725-VPZZ5B/remove-telemetry-runtime-copy
- Head: a688b395f315

```text
 README.md                                       |  5 ++---
 docs/assets/header.svg                          |  2 +-
 docs/compare.mdx                                |  2 +-
 docs/developer/workflow-harness-test-matrix.mdx |  2 +-
 docs/manifesto.mdx                              | 10 +++++-----
 docs/showcase.mdx                               |  2 +-
 docs/user/agent-change-record.mdx               |  3 +--
 docs/user/overview.mdx                          |  1 -
 docs/user/website-ia.mdx                        |  2 +-
 packages/agentplane/README.md                   |  5 ++---
 website/CONTENT.md                              |  2 +-
 website/src/data/homepage-content.ts            |  8 ++++----
 website/static/llms-full.txt                    |  2 +-
 13 files changed, 21 insertions(+), 25 deletions(-)
```

</details>
