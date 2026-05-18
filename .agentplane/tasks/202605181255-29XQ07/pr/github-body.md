Task: `202605181255-29XQ07`
Title: Repair framework context health contract
Canonical task record: `.agentplane/tasks/202605181255-29XQ07/README.md`

## Summary

Repair framework context health contract

Fix the current framework checkout context health gap so declared context commands have a valid scaffold or deterministic repair behavior, and verify the local context health route.

## Scope

- In scope: Fix the current framework checkout context health gap so declared context commands have a valid scaffold or deterministic repair behavior, and verify the local context health route.
- Out of scope: unrelated refactors not required for "Repair framework context health contract".

## Verification

- State: ok
- Note:

```text
Verified: framework context health scaffold now exists and context commands pass; starter wiki
placeholder wording was removed from the template and generated page; command/policy/runtime checks
and Turbo workspace discovery pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T13:04:22.272Z
- Branch: task/202605181255-29XQ07/framework-context-health
- Head: f9e9bc1d3dba

```text
 .agentplane/context/agentplane.context.yaml        |  65 +++
 .../derived/capabilities/capabilities.jsonl        |   0
 .../derived/capabilities/capability_edges.jsonl    |   0
 .agentplane/context/derived/facts/facts.jsonl      |   0
 .agentplane/context/derived/graph/edges.jsonl      |   0
 .agentplane/context/derived/graph/entities.jsonl   |   0
 .../context/derived/graph/provenance_edges.jsonl   |   0
 .../derived/reports/assimilation-events.jsonl      |   0
 .agentplane/context/manifest.lock.json             |   6 +
 .agentplane/context/policies/capability.rules.md   |   5 +
 .agentplane/context/policies/context.rules.md      |   5 +
 .agentplane/context/policies/redaction.rules.yaml  |   3 +
 .agentplane/context/policies/sync.rules.yaml       |   2 +
 .agentplane/context/policies/wiki.rules.md         |   5 +
 .../blueprint/resolved-snapshot.json               | 527 +++++++++++++++++++++
 .gitignore                                         |   2 +
 context/README.md                                  |  17 +
 context/capabilities/README.md                     |   5 +
 context/capabilities/checklists/.gitkeep           |   0
 context/capabilities/playbooks/.gitkeep            |   0
 context/capabilities/prompts/.gitkeep              |   0
 context/capabilities/recipes/.gitkeep              |   0
 context/capabilities/rubrics/.gitkeep              |   0
 context/capabilities/snippets/.gitkeep             |   0
 context/capabilities/templates/.gitkeep            |   0
 context/capabilities/workflows/.gitkeep            |   0
 context/raw/.gitkeep                               |   0
 context/raw/research/.gitkeep                      |   0
 context/raw/specs/.gitkeep                         |   0
 context/wiki/AGENTS.md                             |  36 ++
 context/wiki/index.md                              |  27 ++
 .../agentplane/src/commands/context/init-wiki.ts   |   2 +-
 32 files changed, 706 insertions(+), 1 deletion(-)
```

</details>
