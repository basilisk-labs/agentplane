Task: `202610110405-9MNFYJ`
Title: Preserve merged-review assertions through a bounded testkit extraction
Canonical task record: `.agentplane/tasks/202610110405-9MNFYJ/README.md`

## Summary

Preserve merged-review assertions through a bounded testkit extraction

Replace erroneous never-begun intake 202610110402-SZQB2X, whose focused project name was misspelled; preserve that failure. Repair PR #6127 oversized-test failure by extracting its existing 33-line merged-base assertion block into the existing testkit with explicit inputs. Preserve all assertions, real native journey and cleanup. No production or baseline change. Eventual PR targets the parent 1WX task branch. No provider operations in semantic work.

## Scope

- In scope: Replace erroneous never-begun intake 202610110402-SZQB2X, whose focused project name was misspelled; preserve that failure. Repair PR #6127 oversized-test failure by extracting its existing 33-line merged-base assertion block into the existing testkit with explicit inputs. Preserve all assertions, real native journey and cleanup. No production or baseline change. Eventual PR targets the parent 1WX task branch. No provider operations in semantic work.
- Out of scope: unrelated refactors not required for "Preserve merged-review assertions through a bounded testkit extraction".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-11T11:59:28.856Z
- Branch: task/202610110405-9MNFYJ/testkit-extraction
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task/kernel-completed-external-rework.test.ts  | 38 ++++-------------
 .../kernel-completed-external-rework.testkit.ts    | 48 +++++++++++++++++++++-
 2 files changed, 54 insertions(+), 32 deletions(-)
```

</details>
