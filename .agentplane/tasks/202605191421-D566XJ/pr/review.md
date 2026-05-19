# PR Review

Created: 2026-05-19T14:23:12.633Z

## Task

- Task: `202605191421-D566XJ`
- Title: Add deterministic evidence bundle commands
- Status: DOING
- Branch: `task/202605191421-D566XJ/evidence-bundle`
- Canonical task record: `.agentplane/tasks/202605191421-D566XJ/README.md`

## Verification

- State: ok
- Note: Implemented deterministic evidence bundle and verify commands with ACR trust pointer and docs. Checks passed: focused evidence/ACR tests, agentplane typecheck, lint:core, docs:cli:check, docs:ia:check, evidence bundle, evidence verify --strict.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T14:49:33.248Z
- Branch: task/202605191421-D566XJ/evidence-bundle
- Head: a89b99bfe360

```text
 .agentplane/tasks/202605191421-D566XJ/acr.json     | 402 +++++++++++++++
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .../202605191421-D566XJ/evidence/manifest.json     |  69 +++
 docs/reference/acr.mdx                             |   8 +
 docs/reference/evidence.mdx                        |  44 ++
 docs/user/cli-reference.generated.mdx              |  51 ++
 .../src/cli/run-cli/command-catalog/project.ts     |  11 +
 .../src/cli/run-cli/command-loaders/project.ts     |  11 +
 packages/agentplane/src/commands/acr/generate.ts   |  15 +-
 .../src/commands/evidence/evidence.command.test.ts | 111 ++++
 .../src/commands/evidence/evidence.command.ts      | 487 ++++++++++++++++++
 website/sidebars.ts                                |   2 +
 12 files changed, 1779 insertions(+), 4 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
