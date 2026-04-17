## Summary

Expose CLI harness via @agentplane/testkit facade

Move the CLI test helper implementation out of the old src/cli path, expose @agentplane/testkit/cli as the canonical import surface, and keep legacy agentplane-only imports working through a compatibility shim.

## Scope

- In scope: Move the CLI test helper implementation out of the old src/cli path, expose @agentplane/testkit/cli as the canonical import surface, and keep legacy agentplane-only imports working through a compatibility shim.
- Out of scope: unrelated refactors not required for "Expose CLI harness via @agentplane/testkit facade".

## Verification

- State: ok
- Note: Verified: bun run test:testkit, bunx vitest run packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --hookTimeout 60000 --testTimeout 60000, and bun run typecheck all pass after moving the CLI test helper implementation into packages/agentplane/src/testing, exposing @agentplane/testkit/cli, and rewriting direct test imports to the new facade.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T20:16:04.925Z
- Branch: task/202604171510-8338XT/testkit-facade
- Head: 1c5641e35566

```text
 bun.lock                                           |   3 +
 packages/agentplane/package.json                   |   3 +
 .../agentplane/src/cli/run-cli.test-helpers.ts     | 909 +--------------------
 packages/agentplane/src/testing/cli-harness.ts     | 908 ++++++++++++++++++++
 packages/agentplane/src/testing/index.ts           |   1 +
 packages/testkit/package.json                      |   6 +-
 packages/testkit/src/cli.test.ts                   |  10 +
 packages/testkit/src/cli.ts                        |   1 +
 packages/testkit/tsconfig.json                     |   3 +-
 tsconfig.base.json                                 |   5 +-
 vitest.config.ts                                   |   5 +
 11 files changed, 943 insertions(+), 911 deletions(-)
```

</details>
