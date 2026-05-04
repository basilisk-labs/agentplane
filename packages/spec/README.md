# @agentplane/spec (v1)

This package hosts **versioned specifications** (JSON Schemas + examples) for `agentplane`.

It is the repository contract for files AgentPlane writes into a project: configuration, task
README frontmatter, task exports, PR metadata, handoff metadata, and Agent Change Records (ACR).
If you are an end user, install the CLI instead:

```bash
npm install -g agentplane
```

v1 preserves current repository artifact schemas plus legacy import/export compatibility contracts:

- `.agentplane/WORKFLOW.md` front matter as the current project source of truth
- legacy `.agentplane/config.json` import fallback
- Task README frontmatter (YAML, represented here as a JSON object schema)
- `tasks.json` export snapshot (including checksum metadata)
- PR artifact metadata (`pr/meta.json`)
- Task handoff metadata (`handoff/latest.json`)

## Canonicalization notes (checksum-bearing files)

`tasks.json` is a checksum-bearing export. The checksum is computed over a canonical JSON serialization.

v1 canonicalization rules:

- UTF-8 encoding
- `\n` line endings
- Object keys are sorted recursively
- Arrays preserve insertion order (tasks are sorted by `id` when exporting)
- No trailing whitespace
- Serialized JSON is compact (no insignificant whitespace), except a trailing `\n` is allowed

## Layout

```
packages/spec/
  README.md
  schemas/
    config.schema.json
    task-readme-frontmatter.schema.json
    tasks-export.schema.json
    pr-meta.schema.json
    task-handoff.schema.json
    acr-v0.1.schema.json
  examples/
    config.json      legacy import compatibility example
    task-readme-frontmatter.json
    tasks.json
    pr-meta.json
    task-handoff.json
    acr.json
```

## Links

- ACR schema: https://agentplane.org/schemas/acr-v0.1.schema.json
- CLI package: https://www.npmjs.com/package/agentplane
- Repository: https://github.com/basilisk-labs/agentplane
