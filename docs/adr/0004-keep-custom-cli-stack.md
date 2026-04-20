# ADR 0004: Keep Custom CLI Stack

## Status

Accepted

## Date

2026-04-20

## Context

Agentplane already has a command catalog, command specs, help rendering, lazy command loading, and
snapshot-tested CLI behavior. The framework migration roadmap considered replacing the custom
surface with a general CLI framework such as Commander, Citty, or Oclif.

## Decision

Keep the custom CLI stack.

Do not migrate the main CLI parser or command catalog to Commander, Citty, Oclif, or another
general CLI framework during the 0.3.x refactor.

The custom stack remains acceptable because:

1. Command specs are already the source for help text and docs generation.
2. CLI snapshots and exit-code contracts depend on stable rendering and error mapping.
3. Lazy command loading is already integrated with the command catalog.
4. The current dependency footprint is intentionally small.

## Consequences

### Positive

1. CLI behavior stays stable during the refactor.
2. Documentation generation remains tied to the same command specs used at runtime.
3. No runtime dependency is added for behavior the repository already owns.

### Negative

1. Agentplane keeps responsibility for parser edge cases and help rendering.
2. Contributors cannot rely on a familiar third-party CLI framework API.

## Follow-up

1. Continue reducing command-catalog boilerplate through internal helpers.
2. Revisit this decision only if the custom parser becomes a measurable source of defects or
   maintenance cost.
