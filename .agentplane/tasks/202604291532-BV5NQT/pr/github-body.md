## Summary

Document and harden modular prompt migration

Add migration documentation, fixtures, and regression coverage for modular prompt assembly across init, upgrade, runner prompts, policy modules, agent profiles, and recipe-owned mutations.

## Scope

- In scope: developer/operator documentation for modular prompt assembly, recipe mutation extension points, verification commands, and safe-change boundaries.
- In scope: fixtures/regression tests that lock the migration path and prevent silent drift back to ad hoc prompt assembly.
- In scope: docs changes are part of this `code` task because the acceptance boundary includes regression fixtures and checks.
- Out of scope: release publication and remote recipe catalog updates.

## Verification

- State: ok
- Note: Modular prompt migration docs and regression hardening are complete; declared verification passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T19:44:51.854Z
- Branch: task/202604291532-BV5NQT/modular-prompt-migration-docs
- Head: df7b4aff6ef7

```text
 docs/developer/modular-prompt-assembly.mdx         | 146 +++++++++++++++++++++
 docs/developer/recipes-how-it-works.mdx            |  20 ++-
 docs/developer/recipes-spec.mdx                    |  11 +-
 docs/developer/testing-and-quality.mdx             |  11 ++
 .../cli/run-cli/commands/init/steps/apply.test.ts  |   5 +
 .../src/commands/recipes.transaction.test.ts       |   4 +
 .../src/runner/context/base-prompts.test.ts        |  14 ++
 website/sidebars.ts                                |   1 +
 8 files changed, 209 insertions(+), 3 deletions(-)
```

</details>
