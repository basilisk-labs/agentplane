## Summary

Fix exact-sha workflow-dispatch identity for release recovery

Workflow-dispatch Core CI currently checks out a historical SHA but still records GitHub run/head metadata and release-ready identity against the dispatch branch head, so release recovery for d95b2762... remains blocked. Align workflow, manifest, and resolver logic so exact-SHA recovery is real, then use it to publish v0.3.11.

## Scope

- In scope: Workflow-dispatch Core CI currently checks out a historical SHA but still records GitHub run/head metadata and release-ready identity against the dispatch branch head, so release recovery for d95b2762... remains blocked. Align workflow, manifest, and resolver logic so exact-SHA recovery is real, then use it to publish v0.3.11.
- Out of scope: unrelated refactors not required for "Fix exact-sha workflow-dispatch identity for release recovery".

## Verification

- State: ok
- Note: Command: bun vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. Result: pass. Evidence: 10 targeted tests passed, including workflow_dispatch recovery alias and explicit run-id mismatch coverage. Scope: Core CI exact-sha artifact identity and release-ready source resolution for historical recovery.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T07:17:49.256Z
- Branch: task/202604150716-0FJK7K/exact-sha-dispatch-identity
- Head: b12af6535591

```text
No changes detected.
```

</details>
