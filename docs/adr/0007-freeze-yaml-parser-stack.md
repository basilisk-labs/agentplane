# ADR 0007: Freeze YAML Parser Stack

## Status

Accepted

## Date

2026-04-20

## Context

Agentplane currently uses `yaml@^2.8.2` in `@agentplaneorg/core`. The visible runtime use is task
README frontmatter parsing in `packages/core/src/tasks/task-readme.ts`.

The refactor roadmap considered whether to switch YAML libraries while other schema and build
surfaces are moving.

## Decision

Keep `yaml` as the canonical YAML parser for the current refactor cycle.

Do not migrate to `js-yaml` or another parser unless a concrete parser defect, compatibility issue,
or measurable bundle/runtime improvement is demonstrated.

## Consequences

### Positive

1. Task README parsing remains stable while task artifacts and schema generation are being changed.
2. No dependency churn is introduced for a parser surface that is not currently a hotspot.
3. The existing package is typed and already scoped to `@agentplaneorg/core`.

### Negative

1. No bundle-size reduction is attempted in this task.
2. Parser behavior remains whatever `yaml` provides for edge-case frontmatter inputs.

## Revisit Criteria

Reconsider the parser only if one of these is true:

1. A production task README cannot be parsed correctly with `yaml`.
2. Bundle analysis shows a meaningful package-size reduction from switching parsers.
3. A security advisory affects the current parser and cannot be mitigated by upgrade.

## Follow-up

1. Keep parser changes separate from schema migrations.
2. If parser behavior changes later, add task README fixture tests before replacing the dependency.
