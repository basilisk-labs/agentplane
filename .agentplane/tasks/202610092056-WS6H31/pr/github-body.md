Task: `202610092056-WS6H31`
Title: Review and update compatibility candidate for CLI help changes in PR 6095
Canonical task record: `.agentplane/tasks/202610092056-WS6H31/README.md`

## Summary

Review and update compatibility candidate for CLI help changes in PR 6095

The PR 6095 verify-contract job fails at reviewed Recipe V2 section inventory drift because the CLI topology digest changed from 1b2e5a... to d14dab... after fixing issue 6076. Review the exact CLI topology delta, update only the approved compatibility candidate and guard as warranted, preserve rejected-recapture protections, and validate the GitHub contract check. This is a corrective follow-up to the existing PR, not a release or package version change.

## Scope

- In scope: The PR 6095 verify-contract job fails at reviewed Recipe V2 section inventory drift because the CLI topology digest changed from 1b2e5a... to d14dab... after fixing issue 6076. Review the exact CLI topology delta, update only the approved compatibility candidate and guard as warranted, preserve rejected-recapture protections, and validate the GitHub contract check. This is a corrective follow-up to the existing PR, not a release or package version change.
- Out of scope: unrelated refactors not required for "Review and update compatibility candidate for CLI help changes in PR 6095".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-09T21:18:33.454Z
- Branch: task/202610092056-WS6H31/review-and-update-compatibility-candidate-for-cl
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../baselines/v0.7-compatibility-candidate.json    | 55 +++++++++++--
 scripts/baselines/v0.7-pr6095-cli-review.json      | 91 ++++++++++++++++++++++
 .../check-compatibility-contract-baseline.mjs      | 41 +++++++++-
 3 files changed, 178 insertions(+), 9 deletions(-)
```

</details>
