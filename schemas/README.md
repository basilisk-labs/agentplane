<p align="center">
  <img src="../docs/assets/readme-headers/schemas.svg" alt="Agentplane schemas header" style="width:100%;max-width:100%;"/>
</p>

# JSON Schemas

This directory is the repository discovery catalog for public AgentPlane JSON Schemas.

Generated public schemas are rendered from Zod contracts in `packages/core/src/**` and synchronized by:

```bash
bun run schemas:sync
```

Generated repository-artifact schemas are mirrored into:

- `packages/spec/schemas/*.schema.json` for tooling and published distribution
- `packages/core/schemas/*.schema.json` for runtime-package consumers

Runner-facing public contracts can remain root-only when their runtime validator is exported from
`@agentplaneorg/core` and they are not repository artifact formats.

## Agent semantic result

`agent-semantic-result.schema.json` is the root-only public contract for semantic output written by
an agent. It intentionally excludes process status, exit codes, timing, metrics, observed checks,
artifacts, Git state, filesystem paths, and provenance. AgentPlane adds claim provenance and records
observed execution facts separately.

Generated examples:

- `examples/agent-semantic-result-v2.valid.json` is the canonical `completed` result.
- `examples/agent-semantic-result-v2.blocked.valid.json` is the canonical `blocked` result.
- `examples/agent-semantic-result-v2.needs-context.valid.json` is the canonical `needs_context`
  result.
- `examples/agent-semantic-result-v2.failed.valid.json` is the canonical `failed` result.
- All four v2 examples are rendered from one typed fixture builder, validated against the public
  schema, and rebound to the active `work_order_id` before they are shown in runner bootstrap.
- `examples/runner-result-manifest-v1.legacy.json` is an intentionally legacy v1 compatibility
  input. It is not valid against the v2 schema, and its observed-looking fields must remain
  untrusted agent claims during migration.
