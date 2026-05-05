Task: `202605051957-5WRJZK`
Title: Bridge recipe hints into blueprint resolver

## Summary

Bridge recipe hints into blueprint resolver

Connect normalized recipe blueprint hints to the blueprint resolver and explain output, including accepted/rejected extension details and safety rejection tests.

## Scope

- In scope: Connect normalized recipe blueprint hints to the blueprint resolver and explain output, including accepted/rejected extension details and safety rejection tests.
- Out of scope: unrelated refactors not required for "Bridge recipe hints into blueprint resolver".

## Verification

- State: ok
- Note: Blueprint resolver bridge verified: recipe hints preserve provenance, evidence requirements bind to verify_record, preferred_blueprint is accepted only when compatible, and risk routes outrank recipe preference. Checks: bun test packages/agentplane/src/blueprints/resolve.test.ts packages/agentplane/src/blueprints/validate.test.ts packages/recipes/src/blueprint-extensions.test.ts; bun run typecheck; bun run lint:core; AGENTPLANE_FAST_CHANGED_FILES=... bun run ci:local:fast.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T20:45:57.184Z
- Branch: task/202605051957-5WRJZK/v05-rc1-blueprint-bridge
- Head: 7bbfbcd05e1d

```text
 .agentplane/policy/incidents.md                    |   1 +
 .agentplane/tasks/202605051958-M6BW7B/README.md    | 120 +++++++++++
 .agentplane/tasks/202605051958-R7ZV0H/README.md    | 119 +++++++++++
 .agentplane/tasks/202605051958-Y1FYT3/README.md    | 119 +++++++++++
 .agentplane/tasks/202605051959-VCZB8M/README.md    | 119 +++++++++++
 docs/developer/blueprints.mdx                      | 105 +++++++---
 docs/developer/recipes-spec.mdx                    |  50 ++++-
 docs/releases/v0.5.0-rc.1.md                       |  47 +++++
 docs/user/cli-reference.generated.mdx              | 121 ++++++++++-
 packages/agentplane/assets/policy/incidents.md     |   1 +
 packages/agentplane/src/blueprints/builtins.ts     |   5 +
 packages/agentplane/src/blueprints/index.ts        |   4 +
 packages/agentplane/src/blueprints/model.ts        |  18 +-
 packages/agentplane/src/blueprints/recipe-hints.ts |  26 +++
 packages/agentplane/src/blueprints/resolve.test.ts | 127 +++++++++++-
 packages/agentplane/src/blueprints/resolve.ts      | 154 ++++++++++++--
 .../src/cli/run-cli/command-catalog/project.ts     |  11 +
 .../src/cli/run-cli/command-loaders/project.ts     |  11 +
 .../agentplane/src/commands/acr/acr.command.ts     |  70 +++++++
 .../src/commands/blueprint/blueprint.command.ts    | 225 +++++++++++++++++++++
 .../src/commands/blueprint/task-input.ts           |  52 +++++
 .../src/commands/task/verify-show.command.ts       |  13 +-
 packages/recipes/src/blueprint-extensions.ts       |  11 +-
 23 files changed, 1474 insertions(+), 55 deletions(-)
```

</details>
