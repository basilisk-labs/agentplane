Task: `202605191825-3PV3QF`
Title: Split GitHub PR verification into routed parallel gates
Canonical task record: `.agentplane/tasks/202605191825-3PV3QF/README.md`

## Summary

Split GitHub PR verification into routed parallel gates

Make GitHub PR verification faster and clearer by reusing the local CI selector for a planning job, splitting Core CI into parallel verification jobs, adding a stable aggregate gate, and caching Bun artifacts on Windows.

## Scope

- In scope: Make GitHub PR verification faster and clearer by reusing the local CI selector for a planning job, splitting Core CI into parallel verification jobs, adding a stable aggregate gate, and caching Bun artifacts on Windows.
- Out of scope: unrelated refactors not required for "Split GitHub PR verification into routed parallel gates".

## Verification

- State: ok
- Note:

```text
Verified routed GitHub CI changes locally: workflows:command-check, policy routing, workflow bucket
route explanation, git diff --check, full ci:local:fast for .github/workflows/ci.yml, and
aggregate/release-ready workflow structure inspection all passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T18:26:31.579Z
- Branch: task/202605191825-3PV3QF/github-verification-gates
- Head: 41fbf7215229

```text
No changes detected.
```

</details>
