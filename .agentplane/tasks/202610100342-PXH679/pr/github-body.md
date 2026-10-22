Task: `202610100342-PXH679`
Title: Distinguish provider transport outages from authentication failures for issue 6088
Canonical task record: `.agentplane/tasks/202610100342-PXH679/README.md`

## Summary

Distinguish provider transport outages from authentication failures for issue 6088

Resolve GitHub issue 6088 before release 0.7.13. Classify missing credentials, rejected credentials, genuinely ambiguous valid sessions, unsupported or unknown provider, and TCP/DNS/TLS transport failure separately. Preserve recorded provider identity and fail closed when authentication or hosted state cannot be established. Retain sanitized causes and bounded retry guidance without exposing credentials or recommending token replacement for transport outages. Add focused regression tests covering transport failures, 401/403, two valid sessions, and recorded provider identity. No network operations or credential access are needed for mocked qualification. Preserve all mandatory validation and independent review. Limit implementation to provider identity/auth-status classification and its transport adapter/tests; do not modify task lifecycle, CI budgets, compatibility manifests, versions, or release publication.

## Scope

- In scope: Resolve GitHub issue 6088 before release 0.7.13. Classify missing credentials, rejected credentials, genuinely ambiguous valid sessions, unsupported or unknown provider, and TCP/DNS/TLS transport failure separately. Preserve recorded provider identity and fail closed when authentication or hosted state cannot be established. Retain sanitized causes and bounded retry guidance without exposing credentials or recommending token replacement for transport outages. Add focused regression tests covering transport failures, 401/403, two valid sessions, and recorded provider identity. No network operations or credential access are needed for mocked qualification. Preserve all mandatory validation and independent review. Limit implementation to provider identity/auth-status classification and its transport adapter/tests; do not modify task lifecycle, CI budgets, compatibility manifests, versions, or release publication.
- Out of scope: unrelated refactors not required for "Distinguish provider transport outages from authentication failures for issue 6088".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-10T04:21:05.883Z
- Branch: task/202610100342-PXH679/distinguish-provider-transport-outages-from-auth
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/pr/internal/git-host-identity.test.ts | 123 ++++++++++++++++++++-
 .../src/commands/pr/internal/git-host-identity.ts  | 116 ++++++++++++++-----
 2 files changed, 212 insertions(+), 27 deletions(-)
```

</details>
