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
- Note: Docs verification: policy routing passed; doctor passed with one unrelated warning for task 202605031524-HNAHQK; Prettier check passed; ACR doc link smoke passed. docs:site:typecheck and docs:site:build were attempted but blocked by missing Docusaurus/React dependencies in this task worktree, not by ACR content.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T15:48:52.453Z
- Branch: task/202605031535-633VCY/acr-standard-docs
- Head: ade32a1c9750

```text
 .../agent-change-record-implementation.mdx         | 239 ++++++++++++++++++++
 docs/developer/architecture.mdx                    |   4 +
 docs/user/agent-change-record.mdx                  | 249 +++++++++++++++++++++
 docs/user/commands.mdx                             |  16 ++
 docs/user/configuration.mdx                        |  23 ++
 docs/user/overview.mdx                             |   4 +
 docs/user/task-lifecycle.mdx                       |  11 +-
 website/sidebars.ts                                |   5 +
 8 files changed, 548 insertions(+), 3 deletions(-)
```

</details>
