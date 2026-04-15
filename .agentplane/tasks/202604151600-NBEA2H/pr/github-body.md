## Summary

Introduce explicit branch_pr release candidate route

Add a first-class release candidate route for branch_pr mode so release preparation is modeled as a candidate PR flow instead of a deferred release-apply publish path.

## Scope

- In scope: Add a first-class release candidate route for branch_pr mode so release preparation is modeled as a candidate PR flow instead of a deferred release-apply publish path.
- Out of scope: unrelated refactors not required for "Introduce explicit branch_pr release candidate route".

## Verification

- State: ok
- Note: Release route refactor validated: explicit release candidate command added for branch_pr, release apply is now direct-route only, release/help/docs contracts passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T16:23:09.062Z
- Branch: task/202604151600-NBEA2H/branch-pr-release-candidate-route
- Head: 0524758d9023

```text
 .agentplane/tasks/202604151600-NBEA2H/README.md    | 124 ++++++++
 docs/developer/release-and-publishing.mdx          |  18 +-
 docs/user/cli-reference.generated.mdx              |  46 ++-
 .../run-cli.core.help-snap.test.ts.snap            |   3 +-
 .../src/cli/run-cli/command-catalog/core.ts        |  11 +-
 .../src/commands/release/apply.command.ts          | 333 +++++++++++++++++++--
 .../agentplane/src/commands/release/apply.test.ts  | 156 +++++++++-
 .../agentplane/src/commands/release/apply.types.ts |   3 +-
 8 files changed, 651 insertions(+), 43 deletions(-)
```

</details>
