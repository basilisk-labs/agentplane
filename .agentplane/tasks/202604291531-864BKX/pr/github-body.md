## Summary

Add prompt graph diagnostics and drift checks

Expose prompt graph diagnostics and drift detection through doctor/explain-style surfaces so operators can see compiled modules, source provenance, repo overrides, recipe mutations, and stale generated prompt artifacts.

## Scope

- In scope: diagnostics for prompt graph composition, source provenance, active recipe mutations, and generated artifact drift.
- In scope: doctor/runtime explain surfaces that help agents decide whether init/upgrade/prompt artifacts need refresh.
- Out of scope: auto-fixing drift or publishing remote checks.

## Verification

- State: ok
- Note: Prompt graph diagnostics are exposed through runtime explain and doctor drift checks; declared verification passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T19:19:14.656Z
- Branch: task/202604291531-864BKX/prompt-graph-diagnostics
- Head: fd959dd75abd

```text
No changes detected.
```

</details>
