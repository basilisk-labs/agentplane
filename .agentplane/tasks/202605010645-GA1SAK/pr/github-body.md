## Summary

AP-12: Split PR open flow tests

Split PR open flow tests by artifact, git, validation, and network gates using cli-core-pr-flow testkit helpers.

## Scope

- In scope: Split PR open flow tests by artifact, git, validation, and network gates using cli-core-pr-flow testkit helpers.
- Out of scope: unrelated refactors not required for "AP-12: Split PR open flow tests".

## Verification

- State: ok
- Note: Focused PR-open split verification passed: PR-flow suites, routing/inventory checks, oversized baseline, typecheck, lint, formatting, bootstrap, doctor, and policy routing were green.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T11:18:41.474Z
- Branch: task/202605010645-GA1SAK/pr-open-flow-test-split
- Head: bcbc33fefad1

```text
 .../agentplane/src/cli/local-ci-selection.test.ts  |  15 +-
 .../run-cli.core.pr-flow.pr-open.artifacts.test.ts | 213 ++++++++
 ...ts => run-cli.core.pr-flow.pr-open.git.test.ts} | 548 +--------------------
 .../run-cli.core.pr-flow.pr-open.network.test.ts   | 351 +++++++++++++
 ...run-cli.core.pr-flow.pr-open.validation.test.ts | 173 +++++++
 scripts/oversized-test-baseline.json               |   8 +-
 6 files changed, 752 insertions(+), 556 deletions(-)
```

</details>
