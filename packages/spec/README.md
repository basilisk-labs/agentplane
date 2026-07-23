<p align="center">
  <img src="https://raw.githubusercontent.com/basilisk-labs/agentplane/main/docs/assets/readme-headers/spec.svg" alt="Agentplane spec package header" style="width:100%;max-width:100%;"/>
</p>

# @agentplane/spec (v1)

This package hosts **versioned specifications** (JSON Schemas + examples) for `agentplane`.

It is the repository contract for files AgentPlane writes into a project: configuration, task
README frontmatter, task exports, PR metadata, handoff metadata, and Agent Change Records (ACR).
If you are an end user, install the CLI instead:

```bash
npm install -g agentplane
```

The package preserves current repository artifact schemas plus legacy import/export compatibility
contracts:

- `.agentplane/WORKFLOW.md` v1 and v2 front matter as the current project source of truth; both
  normalize to v2 meaning
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
    workflow.schema.json
    config.schema.json
    task-readme-frontmatter.schema.json
    tasks-export.schema.json
    pr-meta.schema.json
    task-handoff.schema.json
    task-observation.schema.json
    acr-v0.1.schema.json
  examples/
    workflow-v1.json
    workflow-v2.json
    config.json      legacy import compatibility example
    task-readme-frontmatter.json
    tasks.json
    pr-meta.json
    task-handoff.json
    acr.json
```

## Links

- ACR schema: https://agentplane.org/schemas/acr-v0.1.schema.json
- Task observation schema: https://agentplane.org/schemas/task-observation.schema.json
- CLI package: https://www.npmjs.com/package/agentplane
- Repository: https://github.com/basilisk-labs/agentplane
