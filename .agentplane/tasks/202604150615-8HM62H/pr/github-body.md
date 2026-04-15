## Summary

Eliminate hosted-close zero-check auto-merge lag

Make hosted-close closure PRs merge immediately when GitHub already reports them mergeable, instead of relying only on delayed auto-merge behavior.

## Scope

- In scope: Make hosted-close closure PRs merge immediately when GitHub already reports them mergeable, instead of relying only on delayed auto-merge behavior.
- Out of scope: unrelated refactors not required for "Eliminate hosted-close zero-check auto-merge lag".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T06:22:24.200Z
- Branch: task/202604150615-8HM62H/hosted-close-direct-merge
- Head: de7287d248b7

```text
 .agentplane/tasks/202604150615-8HM62H/README.md    | 89 ++++++++++++++++++++++
 .github/workflows/task-hosted-close.yml            |  6 +-
 .../task/hosted-close-workflow-contract.test.ts    |  4 +
 3 files changed, 97 insertions(+), 2 deletions(-)
```

</details>
