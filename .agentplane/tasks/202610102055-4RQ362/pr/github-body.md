Task: `202610102055-4RQ362`
Title: Preserve published ancestry during PR artifact sync and update
Canonical task record: `.agentplane/tasks/202610102055-4RQ362/README.md`

## Summary

Preserve published ancestry during PR artifact sync and update

Repair generic PR artifact persistence observed during NYTBDA release publication. Automatic artifact sync and update must create ordinary commits and preserve already published ancestry without requiring network access or guessing unpublished state from task commit subjects. Preserve owned-path staging, unrelated staged-file refusal, task identity, DCO, existing bounded commit execution and final verification floors. Do not force-push, reset branches, rewrite completion history or alter native authority. Real Git regressions must model a published terminal task commit containing supervision/quality artifacts, hosted metadata refresh, exact owned artifact changes and fast-forward publication to a local bare remote. Cover update caller and reject unintended staged paths; no live provider writes. Scope only four declared files; no NYTBDA mutation or consumer-specific code.

## Scope

- In scope: Repair generic PR artifact persistence observed during NYTBDA release publication. Automatic artifact sync and update must create ordinary commits and preserve already published ancestry without requiring network access or guessing unpublished state from task commit subjects. Preserve owned-path staging, unrelated staged-file refusal, task identity, DCO, existing bounded commit execution and final verification floors. Do not force-push, reset branches, rewrite completion history or alter native authority. Real Git regressions must model a published terminal task commit containing supervision/quality artifacts, hosted metadata refresh, exact owned artifact changes and fast-forward publication to a local bare remote. Cover update caller and reject unintended staged paths; no live provider writes. Scope only four declared files; no NYTBDA mutation or consumer-specific code.
- Out of scope: unrelated refactors not required for "Preserve published ancestry during PR artifact sync and update".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-10T21:15:24.856Z
- Branch: task/202610102055-4RQ362/artifact-ancestry
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../pr/internal/auto-commit-ancestry.test.ts       | 148 +++++++++++++++++++++
 .../src/commands/pr/internal/auto-commit.test.ts   |  27 ++--
 .../src/commands/pr/internal/auto-commit.ts        | 112 ++--------------
 packages/agentplane/src/commands/pr/update.ts      |   2 +-
 4 files changed, 174 insertions(+), 115 deletions(-)
```

</details>
