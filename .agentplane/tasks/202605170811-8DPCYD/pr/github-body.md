Task: `202605170811-8DPCYD`
Title: Fix CodeQL hosted close checkout alert
Canonical task record: `.agentplane/tasks/202605170811-8DPCYD/README.md`

## Summary

Fix CodeQL hosted close checkout alert

Harden GitHub Actions hosted-close checkout/fetch handling for CodeQL alert #1.

## Scope

- In scope: Harden GitHub Actions hosted-close checkout/fetch handling for CodeQL alert #1.
- Out of scope: unrelated refactors not required for "Fix CodeQL hosted close checkout alert".

## Verification

- State: ok
- Note:

```text
Local verification passed for hosted-close workflow remediation: removed the pull_request_target
PR-head fetch, updated the workflow contract test, ran targeted tests (93 pass), exact-file ESLint,
core and agentplane typecheck, workflow lint, and policy routing. GitHub Code scanning alert #1
remains open until this branch is published and CodeQL reruns.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T08:26:36.463Z
- Branch: task/202605170811-8DPCYD/codeql-security-fixes
- Head: 545e13ed1618

```text
No changes detected.
```

</details>
