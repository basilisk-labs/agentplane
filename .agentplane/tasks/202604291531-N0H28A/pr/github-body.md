## Summary

Apply recipe prompt mutations to compiled graph

Wire installed and active recipe prompt module mutations into the compiled prompt graph refresh path so recipe enable/disable/update can affect generated prompt surfaces transactionally.

## Scope

- In scope: apply active recipe prompt module mutations during project overlay/prompt graph refresh.
- In scope: transactional behavior for install/enable/disable/update and conflict/requirement failures.
- In scope: local artifact refresh only; no remote recipe index refresh unless separately approved.
- Out of scope: adding new recipe catalog content.

## Verification

- State: ok
- Note: Active recipe prompt modules and mutation sets now compile into generated prompt-graph.json during recipe refresh, with compile failures blocking transactional publication.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T19:03:49.698Z
- Branch: task/202604291531-N0H28A/recipe-mutation-graph
- Head: f5e5ffede655

```text
No changes detected.
```

</details>
