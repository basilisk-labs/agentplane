Task: `202610102335-4WQ91M`
Title: Use the actual merged target for hosted task closure
Canonical task record: `.agentplane/tasks/202610102335-4WQ91M/README.md`

## Summary

Use the actual merged target for hosted task closure

Actual hosted run38086990752 for PR6120 merged into agentplane/J8P9K9-integration failed because the privileged workflow checked out main and could not find the task README. Prepare a generic minimal correction using authenticated actual merged PR base metadata, preserving pull_request_target trust, canonical Task Kernel ownership, existing closure idempotency and foreign repository/ref rejection. Never fabricate GitHub events or execute untrusted PR head content. Plan only initially; no workflow dispatch, consumer repair or publication.

## Scope

- In scope: Actual hosted run38086990752 for PR6120 merged into agentplane/J8P9K9-integration failed because the privileged workflow checked out main and could not find the task README. Prepare a generic minimal correction using authenticated actual merged PR base metadata, preserving pull_request_target trust, canonical Task Kernel ownership, existing closure idempotency and foreign repository/ref rejection. Never fabricate GitHub events or execute untrusted PR head content. Plan only initially; no workflow dispatch, consumer repair or publication.
- Out of scope: unrelated refactors not required for "Use the actual merged target for hosted task closure".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-11T00:14:44.042Z
- Branch: task/202610102335-4WQ91M/hosted-close-target
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/task-hosted-close.yml            |  35 ++++++-
 .../cli/prepare-hosted-task-closure-script.test.ts |  55 ++++++++++
 .../task/hosted-close-workflow-contract.test.ts    | 113 ++++++++++++++++++++-
 scripts/workflow/prepare-hosted-task-closure.mjs   |  19 +++-
 4 files changed, 217 insertions(+), 5 deletions(-)
```

</details>
