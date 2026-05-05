Task: `202605051359-R5XAZG`
Title: Require incident cleanup before release tasks

## Summary

Require incident cleanup before release tasks

Add a CI/release gate so every release is preceded by an incident review/fix task for .agentplane/policy/incidents.md and cleanup of that file before release tasks run.

## Scope

- In scope: Add a CI/release gate so every release is preceded by an incident review/fix task for .agentplane/policy/incidents.md and cleanup of that file before release tasks run.
- Out of scope: unrelated refactors not required for "Require incident cleanup before release tasks".

## Verification

- State: ok
- Note: Implemented release incident cleanup gate and verified focused release contracts, typecheck, policy routing, workflow command checks, agents check, diff whitespace, and repo-local doctor.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T14:06:27.859Z
- Branch: task/202605051359-R5XAZG/release-incident-gate
- Head: 71c6c169df80

```text
 .agentplane/policy/workflow.release.md             | 12 ++--
 .github/workflows/ci.yml                           |  2 +
 .github/workflows/prepublish.yml                   |  2 +
 .github/workflows/publish.yml                      |  2 +
 docs/developer/release-and-publishing.mdx          | 22 +++++--
 package.json                                       |  3 +-
 .../agentplane/assets/policy/workflow.release.md   | 12 ++--
 .../commands/release/ci-workflow-contract.test.ts  |  2 +
 .../src/commands/release/plan.command.ts           | 50 ++++++++++++++++
 .../agentplane/src/commands/release/plan.test.ts   | 34 ++++++++++-
 .../release/publish-workflow-contract.test.ts      |  2 +
 .../commands/release/release-ci-contract.test.ts   |  7 +++
 .../release/release-incidents-script.test.ts       | 67 ++++++++++++++++++++++
 scripts/check-release-incidents.mjs                | 50 ++++++++++++++++
 14 files changed, 250 insertions(+), 17 deletions(-)
```

</details>
