Task: `202605201647-7QJP57`
Title: Prepare v0.7 runner handoff release lane
Canonical task record: `.agentplane/tasks/202605201647-7QJP57/README.md`

## Summary

Prepare v0.7 runner handoff release lane

Prepare the public AgentPlane side of the v0.7 runner handoff release lane. Scope: public runner handoff contract/RFC, typed fixtures, docs/tests, route mapping, worktree and approval boundaries, artifact/evidence expectations, trace/export/ACR visibility, and compatibility with the private cloud-sync P4.1 contract. Out of scope: mutating agentplane-cloud-sync, production hosted repository execution without accepted contract and kill switch, connector-specific CLI logic, and secret/provider/customer payload storage.

## Scope

- In scope: Prepare the public AgentPlane side of the v0.7 runner handoff release lane. Scope: public runner handoff contract/RFC, typed fixtures, docs/tests, route mapping, worktree and approval boundaries, artifact/evidence expectations, trace/export/ACR visibility, and compatibility with the private cloud-sync P4.1 contract. Out of scope: mutating agentplane-cloud-sync, production hosted repository execution without accepted contract and kill switch, connector-specific CLI logic, and secret/provider/customer payload storage.
- Out of scope: unrelated refactors not required for "Prepare v0.7 runner handoff release lane".

## Verification

- State: ok
- Note:

```text
EVALUATOR quality gate passed for review fix. Evidence: hardened repo_ref.ref rejects shell-like
refs, command substitution, and .lock path components; focused core schema tests, schemas:check,
knip:check, typecheck, format:check, and framework:dev:bootstrap passed. Hosted execution remains
unimplemented.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-21T11:04:44.868Z
- Branch: task/202605201647-7QJP57/v0-7-runner-handoff
- Head: 21afc3b0bfb1

```text
 .../blueprint/resolved-snapshot.json               | 470 +++++++++++++++++++++
 docs/developer/cloud-backend-integration-plan.mdx  |  21 +
 docs/reference/runner-handoff.mdx                  |  79 ++++
 packages/core/schemas/runner-handoff.schema.json   | 193 +++++++++
 packages/core/src/index.ts                         |  12 +
 packages/core/src/schemas/index.ts                 |  12 +
 .../tasks/task-artifact-schema.runner-handoff.ts   | 181 ++++++++
 .../core/src/tasks/task-artifact-schema.test.ts    | 239 ++++++++++-
 packages/core/src/tasks/task-artifact-schema.ts    |  39 ++
 packages/spec/examples/runner-handoff.json         |  46 ++
 packages/spec/schemas/runner-handoff.schema.json   | 193 +++++++++
 schemas/runner-handoff.schema.json                 | 193 +++++++++
 scripts/generate/sync-schemas.mjs                  |   7 +
 13 files changed, 1678 insertions(+), 7 deletions(-)
```

</details>
