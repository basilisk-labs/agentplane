## Summary

Unify transient GitHub transport retry coverage across workflow helpers

INC-20260407-01 remains open: GitHub-dependent branch_pr helpers still need one explicit contract for classifying EOF/TLS/SSL transport failures as transient, retrying them with bounded backoff, and surfacing auth/usage failures immediately across PR creation, reconcile, and remote-check paths.

## Scope

- In scope: INC-20260407-01 remains open: GitHub-dependent branch_pr helpers still need one explicit contract for classifying EOF/TLS/SSL transport failures as transient, retrying them with bounded backoff, and surfacing auth/usage failures immediately across PR creation, reconcile, and remote-check paths.
- Out of scope: unrelated refactors not required for "Unify transient GitHub transport retry coverage across workflow helpers".

## Verification

- State: ok
- Note: Verified: wait-remote-pr-checks now uses the shared GitHub transport retry contract via scripts/lib/gh-transport.mjs, and wait-remote-pr-checks-script.test.ts passes with parity coverage for defaults and transient/permanent classification.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-16T13:50:06.929Z
- Branch: task/202604161300-HA439T/github-retry-contract
- Head: ba9d0386623b

```text
 .../src/cli/wait-remote-pr-checks-script.test.ts   | 36 ++++++++++
 scripts/lib/gh-transport.mjs                       | 72 ++++++++++++++++++++
 scripts/wait-remote-pr-checks.mjs                  | 79 +++++-----------------
 3 files changed, 125 insertions(+), 62 deletions(-)
```

</details>
