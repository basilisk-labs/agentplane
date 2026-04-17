# PR Review

Created: 2026-04-17T12:36:39.967Z
Branch: task/202604171155-V21N6H/deprecate-scenario-surface

## Summary

Deprecate public recipes scenario surface

Remove scenario-centric commands and help from the public recipes product surface so recipes stop presenting a second parallel runtime model.

## Scope

- In scope: Remove scenario-centric commands and help from the public recipes product surface so recipes stop presenting a second parallel runtime model.
- Out of scope: unrelated refactors not required for "Deprecate public recipes scenario surface".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified removal of the public recipes scenario CLI surface.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T12:48:35.954Z
- Branch: task/202604171155-V21N6H/deprecate-scenario-surface
- Head: 8ad365f8e94f

```text
 .agentplane/agents/ORCHESTRATOR.json               |   2 +-
 docs/developer/framework-refactor-program.mdx      |   6 +-
 docs/developer/recipes-development.mdx             |  17 +-
 docs/developer/recipes-how-it-works.mdx            |  20 +-
 docs/developer/recipes-spec.mdx                    |   8 +-
 docs/recipes-inventory.json                        |   8 +-
 docs/user/cli-reference.generated.mdx              |  89 ---
 docs/user/commands.mdx                             |  15 +-
 docs/user/setup.mdx                                |   9 +-
 packages/agentplane/assets/RUNNER.md               |   2 +-
 .../agentplane/assets/agents/ORCHESTRATOR.json     |   2 +-
 .../run-cli.core.help-snap.test.ts.snap            |  21 -
 .../src/cli/run-cli.core.help-snap.test.ts         |  22 -
 .../agentplane/src/cli/run-cli.scenario.test.ts    | 699 +--------------------
 .../agentplane/src/cli/run-cli.test-helpers.ts     |   2 +-
 .../src/cli/run-cli/command-catalog/project.ts     |  26 -
 scripts/generate-recipes-inventory.mjs             |   8 +-
 17 files changed, 50 insertions(+), 906 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
