Task: `202609111340-MGB383`
Title: Harden the post-release evidence close-tail under branch protection for GitHub issue #4848
Canonical task record: `.agentplane/tasks/202609111340-MGB383/README.md`

## Summary

Harden the post-release evidence close-tail under branch protection for GitHub issue #4848

GitHub issue #4848 is still relevant on current main. The release follow-up stages version surfaces but does not refresh or stage scripts/baselines/v0.7-compatibility-candidate.json, and verify-release-evidence-pr still publishes a synthetic PR verification check after workflow_dispatch instead of obtaining a native pull_request status accepted by branch protection. Make the generated next-development diff Prettier-clean, refresh and stage the compatibility candidate whenever the version surface advances, add a pre-push/pre-PR contract gate, and drive the close-tail through a native pull_request verification with regression coverage for action_required or empty native rollup. Do not weaken branch protection or use admin bypass. Issue: https://github.com/basilisk-labs/agentplane/issues/4848

## Scope

- In scope: GitHub issue #4848 is still relevant on current main. The release follow-up stages version surfaces but does not refresh or stage scripts/baselines/v0.7-compatibility-candidate.json, and verify-release-evidence-pr still publishes a synthetic PR verification check after workflow_dispatch instead of obtaining a native pull_request status accepted by branch protection. Make the generated next-development diff Prettier-clean, refresh and stage the compatibility candidate whenever the version surface advances, add a pre-push/pre-PR contract gate, and drive the close-tail through a native pull_request verification with regression coverage for action_required or empty native rollup. Do not weaken branch protection or use admin bypass. Issue: https://github.com/basilisk-labs/agentplane/issues/4848.
- Out of scope: unrelated refactors not required for "Harden the post-release evidence close-tail under branch protection for GitHub issue #4848".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-11T18:45:55.843Z
- Branch: task/202609111340-MGB383/harden-the-post-release-evidence-close-tail-unde
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/publish.yml                      |  15 ++-
 .../open-next-development-version-script.test.ts   |  22 +++-
 .../release/publish-workflow-contract.test.ts      |  17 +++-
 .../verify-release-evidence-pr-script.test.ts      |  68 +++++++------
 scripts/lib/next-development-version.mjs           |  31 +++++-
 scripts/workflow/verify-release-evidence-pr.mjs    | 111 +++++++++++----------
 6 files changed, 180 insertions(+), 84 deletions(-)
```

</details>
