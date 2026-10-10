Task: `202610072147-X7DTBK`
Title: Align release qualification fixtures with reviewed CLI surface and local formatter
Canonical task record: `.agentplane/tasks/202610072147-X7DTBK/README.md`

## Summary

Align release qualification fixtures with reviewed CLI surface and local formatter

Repair two independently confirmed test-fixture failures exposed by the exact v0.7.13 candidate diagnostic. Critical baseline tests still assert old CLI counts 253/174/849 instead of reviewed PR6058 snapshot counts255/176/857, and omit the Recipes core dependency from the controlled version-mutation fixture and exact nine-field assertion. The next-development-version test creates a no-install isolated workspace without Prettier, then invokes real formatting. Update only these two test files. Provision repository-installed real Prettier in the temporary fixture using a portable local-link convention, with no network install. Preserve exact allowed-field equality, immutable historical baselines, all formatting/version/idempotence assertions, no-install semantics and production behavior. No source implementation, dependency lock, benchmark baseline, version, paid measurement, or M05 disposition edits. Existing user authorization covers necessary release defect repair, independent review, mandatory validation and main integration.

## Scope

- In scope: Repair two independently confirmed test-fixture failures exposed by the exact v0.7.13 candidate diagnostic. Critical baseline tests still assert old CLI counts 253/174/849 instead of reviewed PR6058 snapshot counts255/176/857, and omit the Recipes core dependency from the controlled version-mutation fixture and exact nine-field assertion. The next-development-version test creates a no-install isolated workspace without Prettier, then invokes real formatting. Update only these two test files. Provision repository-installed real Prettier in the temporary fixture using a portable local-link convention, with no network install. Preserve exact allowed-field equality, immutable historical baselines, all formatting/version/idempotence assertions, no-install semantics and production behavior. No source implementation, dependency lock, benchmark baseline, version, paid measurement, or M05 disposition edits. Existing user authorization covers necessary release defect repair, independent review, mandatory validation and main integration.
- Out of scope: unrelated refactors not required for "Align release qualification fixtures with reviewed CLI surface and local formatter".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-07T22:39:07.710Z
- Branch: task/202610072147-X7DTBK/align-release-qualification-fixtures-with-review
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.critical.agent-efficiency-baseline.test.ts | 103 +++++++++++++++++----
 .../open-next-development-version-script.test.ts   |   8 +-
 2 files changed, 90 insertions(+), 21 deletions(-)
```

</details>
