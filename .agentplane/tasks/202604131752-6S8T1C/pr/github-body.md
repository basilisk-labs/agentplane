## Summary

Delete hosted-close branch on auto-merge and tighten agent prompts

Make Task Hosted Close delete merged task-close branches automatically after follow-up closure PR auto-merge, then update agent prompt JSON profiles to encode the Karpathy-style constraints on assumptions, simplicity, surgical edits, and verification-first execution without weakening existing repository policy.

## Scope

- In scope: Make Task Hosted Close delete merged task-close branches automatically after follow-up closure PR auto-merge, then update agent prompt JSON profiles to encode the Karpathy-style constraints on assumptions, simplicity, surgical edits, and verification-first execution without weakening existing repository policy.
- Out of scope: unrelated refactors not required for "Delete hosted-close branch on auto-merge and tighten agent prompts".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-13T18:06:39.104Z
- Branch: task/202604131752-6S8T1C/hosted-close-delete-branch-karpathy
- Head: 539c77a96591

```text
 .agentplane/agents/CODER.json                      |  4 +
 .agentplane/agents/CREATOR.json                    |  1 +
 .agentplane/agents/DOCS.json                       |  3 +-
 .agentplane/agents/INTEGRATOR.json                 |  3 +-
 .agentplane/agents/ORCHESTRATOR.json               |  2 +
 .agentplane/agents/PLANNER.json                    |  4 +-
 .agentplane/agents/REVIEWER.json                   |  1 +
 .agentplane/agents/TESTER.json                     |  4 +-
 .agentplane/agents/UPDATER.json                    |  1 +
 .agentplane/agents/UPGRADER.json                   |  2 +-
 .agentplane/tasks/202604131752-6S8T1C/README.md    | 99 ++++++++++++++++++++++
 .github/workflows/task-hosted-close.yml            |  2 +-
 packages/agentplane/assets/agents/CODER.json       |  4 +
 packages/agentplane/assets/agents/CREATOR.json     |  1 +
 packages/agentplane/assets/agents/DOCS.json        |  3 +-
 packages/agentplane/assets/agents/INTEGRATOR.json  |  3 +-
 .../agentplane/assets/agents/ORCHESTRATOR.json     |  2 +
 packages/agentplane/assets/agents/PLANNER.json     |  4 +-
 packages/agentplane/assets/agents/REVIEWER.json    |  1 +
 packages/agentplane/assets/agents/TESTER.json      |  4 +-
 packages/agentplane/assets/agents/UPDATER.json     |  1 +
 packages/agentplane/assets/agents/UPGRADER.json    |  2 +-
 .../src/cli/wait-remote-pr-checks-script.test.ts   |  1 +
 .../task/hosted-close-workflow-contract.test.ts    |  2 +-
 24 files changed, 140 insertions(+), 14 deletions(-)
```

</details>
