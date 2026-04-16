## Summary

Audit and reclassify stale open workflow incidents

Review the incidents registry entries that still say state=open even though later work appears to have implemented the required behavior. Verify each open incident against current main, then reclassify stale entries to stabilized or externally mitigated and leave only genuinely unresolved incidents open.

## Scope

- In scope: Review the incidents registry entries that still say state=open even though later work appears to have implemented the required behavior. Verify each open incident against current main, then reclassify stale entries to stabilized or externally mitigated and leave only genuinely unresolved incidents open.
- Out of scope: unrelated refactors not required for "Audit and reclassify stale open workflow incidents".

## Verification

- State: ok
- Note: Verified: active registry reduced to genuinely open incidents only; archived stabilized and externally mitigated entries; node .agentplane/policy/check-routing.mjs; bun run format:check.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-16T13:22:08.593Z
- Branch: task/202604161300-QJGXXY/incident-reclassification
- Head: 6ec803bcfccd

```text
 .agentplane/policy/governance.md                |  6 ++++--
 .agentplane/policy/incidents.md                 | 21 +++----------------
 docs/developer/incident-archive.mdx             | 28 +++++++++++++++++++++++++
 docs/docs.json                                  |  1 +
 packages/agentplane/assets/policy/governance.md |  6 ++++--
 packages/agentplane/assets/policy/incidents.md  | 21 +++----------------
 6 files changed, 43 insertions(+), 40 deletions(-)
```

</details>
