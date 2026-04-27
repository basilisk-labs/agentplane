## Summary

Align docs with current branch_pr runtime

Audit public and repository documentation for intermediate or legacy workflow data, remove stale references, and align docs with the current code and branch_pr merge-preserving runtime.

## Scope

- In scope: Audit public and repository documentation for intermediate or legacy workflow data, remove stale references, and align docs with the current code and branch_pr merge-preserving runtime.
- Out of scope: unrelated refactors not required for "Align docs with current branch_pr runtime".

## Verification

- State: ok
- Note: Docs aligned with current branch_pr runtime; stale intermediate/legacy public docs removed; docs/site/cli/routing/doctor checks passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-27T14:51:49.419Z
- Branch: task/202604271440-DSX8D2/docs-current-runtime
- Head: d7d2c843a46d

```text
 docs/README.md                                     |   3 +-
 docs/developer/blog-post-draft-v0.2.25.mdx         |  18 -
 docs/developer/blog-redesign-plan.mdx              |  59 ---
 docs/developer/contributing.mdx                    |   1 -
 .../documentation-information-architecture.mdx     |  41 +-
 docs/developer/prompt-assembly-system.mdx          | 590 ---------------------
 docs/developer/recipes-how-it-works.mdx            |   3 -
 docs/developer/recipes-spec.mdx                    |   9 +-
 docs/developer/release-process-architecture.mdx    | 423 ---------------
 docs/docs.json                                     |  72 ---
 docs/help/legacy-upgrade-recovery.mdx              |   2 +-
 docs/help/troubleshooting-by-symptom.mdx           |   2 +-
 docs/index.mdx                                     |  24 +-
 docs/user/agents.mdx                               |   4 +-
 docs/user/breaking-changes.mdx                     |  79 +--
 docs/user/setup.mdx                                |  12 +-
 docs/user/task-lifecycle.mdx                       |   7 -
 docs/user/workflow-migration.mdx                   |  48 +-
 docs/user/workflow.mdx                             |   5 +-
 website/sidebars.ts                                |   3 -
 website/src/data/homepage-content.ts               |   2 +-
 21 files changed, 75 insertions(+), 1332 deletions(-)
```

</details>
