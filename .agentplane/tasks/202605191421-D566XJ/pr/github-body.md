Task: `202605191421-D566XJ`
Title: Add deterministic evidence bundle commands
Canonical task record: `.agentplane/tasks/202605191421-D566XJ/README.md`

## Summary

Add deterministic evidence bundle commands

Implement a deterministic evidence bundle and verification CLI surface, with ACR trust extension metadata for generated bundles. Scope excludes Sigstore signing, S3 Object Lock preservation, and capability proposal flows.

## Scope

- In scope: Implement a deterministic evidence bundle and verification CLI surface, with ACR trust extension metadata for generated bundles. Scope excludes Sigstore signing, S3 Object Lock preservation, and capability proposal flows.
- Out of scope: unrelated refactors not required for "Add deterministic evidence bundle commands".

## Verification

- State: ok
- Note:

```text
Addressed PR review threads: evidence bundle now respects configured workflow_dir and preserves
existing created_at to keep unchanged bundle reruns deterministic. Local checks passed: focused
evidence/ACR tests, agentplane typecheck, targeted eslint, format:check, framework:dev:bootstrap.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T15:45:54.714Z
- Branch: task/202605191421-D566XJ/evidence-bundle
- Head: 08db6b47a452

```text
 .agentplane/tasks/202605191421-D566XJ/acr.json     | 409 +++++++++++++++
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .../202605191421-D566XJ/evidence/manifest.json     |  69 +++
 docs/reference/acr.mdx                             |   8 +
 docs/reference/evidence.mdx                        |  44 ++
 docs/user/cli-reference.generated.mdx              |  51 ++
 .../src/cli/run-cli/command-catalog/project.ts     |  11 +
 .../src/cli/run-cli/command-loaders/project.ts     |  11 +
 packages/agentplane/src/commands/acr/generate.ts   |  15 +-
 .../src/commands/evidence/evidence.command.test.ts | 158 ++++++
 .../src/commands/evidence/evidence.command.ts      | 516 +++++++++++++++++++
 website/sidebars.ts                                |   2 +
 12 files changed, 1862 insertions(+), 4 deletions(-)
```

</details>
