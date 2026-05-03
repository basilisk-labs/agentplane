Task: `202605031535-633VCY`
Title: Document Agent Change Record standard

## Summary

Document Agent Change Record standard

Document Agent Change Record v0.1 in AgentPlane docs before implementation and repository publication.

## Scope

- In scope: Document Agent Change Record v0.1 in AgentPlane docs before implementation and repository publication.
- Out of scope: unrelated refactors not required for "Document Agent Change Record standard".

## Verification

- State: ok
- Note: Follow-up docs IA verification passed after adding ACR docs to docs/index.mdx: node scripts/check-docs-ia.mjs, Prettier check, and policy routing all pass.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T16:00:03.501Z
- Branch: task/202605031535-633VCY/acr-standard-docs
- Head: 9047a13ae48a

```text
 .../agent-change-record-implementation.mdx         | 239 ++++++++++++++++++++
 docs/developer/architecture.mdx                    |   4 +
 docs/index.mdx                                     |   6 +
 docs/user/agent-change-record.mdx                  | 249 +++++++++++++++++++++
 docs/user/commands.mdx                             |  16 ++
 docs/user/configuration.mdx                        |  23 ++
 docs/user/overview.mdx                             |   4 +
 docs/user/task-lifecycle.mdx                       |  11 +-
 website/sidebars.ts                                |   5 +
 9 files changed, 554 insertions(+), 3 deletions(-)
```

</details>
