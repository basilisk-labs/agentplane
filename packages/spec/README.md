# @agentplane/spec (v1)

This package hosts **versioned specifications** (JSON Schemas + examples) for `agentplane`.

v1 focuses on stabilizing:
- `.agentplane/config.json`
- Task README frontmatter (YAML, represented here as a JSON object schema)
- `tasks.json` export snapshot (including checksum metadata)
- PR artifact metadata (`pr/meta.json`)

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
  examples/
    config.json
    task-readme-frontmatter.json
    tasks.json
    pr-meta.json
```

