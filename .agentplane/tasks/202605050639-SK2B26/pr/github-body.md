Task: `202605050639-SK2B26`
Title: Separate task README canonical state from contextual prose
Canonical task record: `.agentplane/tasks/202605050639-SK2B26/README.md`

## Summary

Make task README sections the canonical doc store

Optimize task README storage by making frontmatter sections the single canonical task document store and treating the markdown body as a rendered compatibility projection. Keep a migration path for existing README files and preserve readable Git diffs.

## Scope

- In scope: Define a two-layer README contract for task artifacts: frontmatter/structured sections remain canonical for workflow gates, while Markdown body becomes a non-duplicating contextual layer for rationale, tradeoffs, references, examples, and migration notes.
- In scope: Define compatibility and drift behavior for existing README files that currently duplicate sections in both YAML and Markdown body.
- Out of scope: Bulk-rewriting the historical task archive unless a separate migration task explicitly approves it.
- Out of scope: Removing human-readable task context from GitHub entirely.

## Verification

- State: ok
- Note: Focused task README, task store, local backend, doc command, migrate-doc, mutation parity, ESLint, Prettier, and routing checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T07:33:38.385Z
- Branch: task/202605050639-SK2B26/readme-context-layer
- Head: acb31646cdc0

```text
No changes detected.
```

</details>
