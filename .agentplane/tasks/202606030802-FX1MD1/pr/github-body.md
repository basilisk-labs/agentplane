Task: `202606030802-FX1MD1`
Title: Document context mode diagrams
Canonical task record: `.agentplane/tasks/202606030802-FX1MD1/README.md`

## Summary

Document context mode diagrams

Add Mermaid diagrams to the context mode documentation so readers can visualize profile choice and ingestion flow.

## Scope

- In scope: Add Mermaid diagrams to the context mode documentation so readers can visualize profile choice and ingestion flow.
- Out of scope: unrelated refactors not required for "Document context mode diagrams".

## Verification

- State: ok
- Note:

```bash
node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: \
  docs/context/modes.mdx. Links: docs/context/modes.mdx. Command: ap doctor. Result: pass. Evidence: \
  doctor OK with two pre-existing DONE-task commit-hash warnings unrelated to this docs change. \
  Scope: workspace policy/runtime. Links: docs/context/modes.mdx. Command: node \
  website/scripts/check-site-content.mjs. Result: pass. Evidence: [site-content] ok. Scope: \
  docs/context/modes.mdx. Links: docs/context/modes.mdx. Skipped: full website build. Reason: \
  website worktree lacks installed Docusaurus/sharp dependencies; build:check stops at missing sharp \
  and direct docusaurus binary is unavailable. Risk: Mermaid rendering is covered by existing \
  Docusaurus Mermaid config and existing Mermaid docs examples, but full static build was not \
  completed locally. Approval: not skipped by approval; recorded as environment blocker.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-03T08:03:12.658Z
- Branch: task/202606030802-FX1MD1/document-context-mode-diagrams
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/context/modes.mdx | 37 +++++++++++++++++++++++++++++++++++++
 1 file changed, 37 insertions(+)
```

</details>
