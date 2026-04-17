## Summary

Activate init-selected recipes

Make init activate recipes selected from the cache-backed picker so init produces active overlays instead of inert vendored packages.

## Scope

- In scope: Make init activate recipes selected from the cache-backed picker so init produces active overlays instead of inert vendored packages.
- Out of scope: unrelated refactors not required for "Activate init-selected recipes".

## Verification

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --update --hookTimeout 60000 --testTimeout 60000
Result: pass
Evidence: 3 test files, 83 tests passed; init-selected recipe now lands in registry as active=true and is visible through recipes active plus recipes explain-active.
Scope: init recipe selection flow, recipe add activation path, and focused CLI acceptance around active overlay state.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T12:08:17.142Z
- Branch: task/202604171154-4ASRJG/init-activate-recipes
- Head: f21546a30847

```text
 .agentplane/tasks/202604171154-BS5TMS/README.md    | 152 +++++++++++++++++++++
 .../tasks/202604171154-BS5TMS/pr/diffstat.txt      |   5 +
 .../tasks/202604171154-BS5TMS/pr/github-body.md    |  40 ++++++
 .../tasks/202604171154-BS5TMS/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604171154-BS5TMS/pr/meta.json |  14 ++
 .../tasks/202604171154-BS5TMS/pr/notes.jsonl       |   0
 .agentplane/tasks/202604171154-BS5TMS/pr/review.md |  64 +++++++++
 .../tasks/202604171154-BS5TMS/pr/verify.log        |   0
 docs/user/cli-reference.generated.mdx              |  80 +++++++++++
 .../run-cli.core.help-snap.test.ts.snap            |   4 +
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  21 ++-
 .../agentplane/src/cli/run-cli.recipes.test.ts     |  53 +++++++
 .../src/cli/run-cli/command-catalog/project.ts     |  18 +++
 .../src/cli/run-cli/commands/init/recipes.ts       |   1 +
 .../src/commands/recipes/impl/commands/add.ts      |   3 +-
 15 files changed, 454 insertions(+), 2 deletions(-)
```

</details>
