Task: `202605031737-9A4FWX`
Title: Make DCO multi-author safe and optionalize tasks export snapshot

## Summary

Make DCO multi-author safe and optionalize tasks export snapshot

Split AgentPlane default sign-off identity from repo-wide manual DCO validation and make .agentplane/tasks.json an optional generated export snapshot rather than tracked required state.

## Scope

- In scope: Split AgentPlane default sign-off identity from repo-wide manual DCO validation and make .agentplane/tasks.json an optional generated export snapshot rather than tracked required state.
- Out of scope: unrelated refactors not required for "Make DCO multi-author safe and optionalize tasks export snapshot".

## Verification

- State: ok
- Note: Implemented multi-author DCO validation and optional tasks export snapshot handling. Verification: env/export unit tests passed (2 files, 9 tests); selected commit-msg DCO hook test passed; CLI help/docs/export tests passed (3 files, 17 tests); typecheck passed; docs:cli:check passed; format:check passed; policy routing passed; doctor ended OK after auto-bootstrap with one unrelated existing archive warning for 202605031624-H1PV7F.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T17:38:51.241Z
- Branch: task/202605031737-9A4FWX/dco-tasks-export-optional
- Head: 10f420eee89c

```text
No changes detected.
```

</details>
