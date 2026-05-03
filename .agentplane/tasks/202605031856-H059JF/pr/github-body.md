Task: `202605031856-H059JF`
Title: ACR standard schema and digest alignment

## Summary

ACR standard schema and digest alignment

Align AgentPlane core ACR schema and digest implementation with the hardened ACR v0.1 standard: nullable draft digest, Git OID constraints, shared risk categories, strict repo paths, and RFC8785/JCS digest computation.

## Scope

- In scope: Align AgentPlane core ACR schema and digest implementation with the hardened ACR v0.1 standard: nullable draft digest, Git OID constraints, shared risk categories, strict repo paths, and RFC8785/JCS digest computation.
- Out of scope: unrelated refactors not required for "ACR standard schema and digest alignment".

## Verification

- State: ok
- Note: Verified schema/digest alignment: schemas synced and checked; core typecheck passed; focused core ACR schema tests passed; generated ACR local validation passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T19:22:25.016Z
- Branch: task/202605031856-H059JF/acr-validation-contract
- Head: 94916b1e8f41

```text
 .agentplane/tasks/202605031856-CKQ0TG/README.md    | 129 +++++++++++
 .agentplane/tasks/202605031856-V5KXGG/README.md    | 128 +++++++++++
 bun.lock                                           |   9 +-
 .../agent-change-record-implementation.mdx         |  43 ++--
 docs/user/agent-change-record.mdx                  |  21 +-
 docs/user/commands.mdx                             |   4 +-
 docs/user/configuration.mdx                        |   4 +-
 packages/agentplane/assets/policy/incidents.md     |   1 +
 .../src/commands/acr/acr.command.test.ts           | 178 +++++++++++++++
 .../agentplane/src/commands/acr/acr.command.ts     | 248 +++++++++++++++------
 packages/agentplane/src/commands/pr/check.ts       |  22 ++
 .../agentplane/src/commands/task/finish-execute.ts |  38 ++--
 packages/core/package.json                         |   1 +
 packages/core/schemas/acr-v0.1.schema.json         |  57 ++++-
 packages/core/src/index.ts                         |   3 +-
 packages/core/src/schemas/index.ts                 |   1 +
 packages/core/src/tasks/index.ts                   |   1 +
 .../core/src/tasks/task-artifact-schema.acr.ts     |  44 +++-
 .../core/src/tasks/task-artifact-schema.test.ts    | 241 +++++++++++---------
 packages/core/src/tasks/task-artifact-schema.ts    |   2 +-
 packages/spec/schemas/acr-v0.1.schema.json         |  57 ++++-
 21 files changed, 996 insertions(+), 236 deletions(-)
```

</details>
