## Summary

Wire recipes active commands into public CLI

Expose recipes active, enable, disable, and explain-active in the public command catalog, help surfaces, and run-cli coverage so the project-local overlay lifecycle is actually reachable.

## Scope

- In scope: Expose recipes active, enable, disable, and explain-active in the public command catalog, help surfaces, and run-cli coverage so the project-local overlay lifecycle is actually reachable.
- Out of scope: unrelated refactors not required for "Wire recipes active commands into public CLI".

## Verification

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --update --hookTimeout 60000 --testTimeout 60000 && bun run docs:cli:check
Result: pass
Evidence: 46 focused CLI tests passed; help snapshot and generated CLI reference now include recipes active/enable/disable/explain-active; docs freshness check passed.
Scope: public recipes CLI catalog, help/reference surfaces, and focused run-cli coverage for overlay lifecycle commands.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T12:02:13.166Z
- Branch: task/202604171154-BS5TMS/recipes-cli-surface
- Head: c0ff27a8c744

```text
 docs/user/cli-reference.generated.mdx              | 80 ++++++++++++++++++++++
 .../run-cli.core.help-snap.test.ts.snap            |  4 ++
 .../agentplane/src/cli/run-cli.recipes.test.ts     | 53 ++++++++++++++
 .../src/cli/run-cli/command-catalog/project.ts     | 18 +++++
 4 files changed, 155 insertions(+)
```

</details>
