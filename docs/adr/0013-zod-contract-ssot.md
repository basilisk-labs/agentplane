---
title: "ADR 0013: Zod Contract SSOT"
description: "Architectural decision record for durable schema contracts after the config and task artifact migrations."
---

## Status

Accepted on 2026-04-18.

## Context

Agent Plane previously documented a core-first contract flow, but the implementation and docs still mixed two different strategies:

1. durable repository artifacts used generated JSON Schema mirrors;
2. runtime parsing and defaults were still described as AJV-first in the main strategy page;
3. some older docs implied `packages/spec` was the canonical schema authority.

That model is now stale.

The current codebase already moved the durable contract families to Zod-based sources in `packages/core/src/**`:

1. config contracts under `packages/core/src/config/**`;
2. task artifact contracts under `packages/core/src/tasks/**`.

Those Zod contracts now produce:

1. runtime parsing and defaults;
2. inferred TypeScript types;
3. generated schema mirrors under `packages/spec/schemas` and `packages/core/schemas`.

## Decision

Agent Plane now uses **Zod in `packages/core/src/**` as the single source of truth for durable repository contracts\*\*.

This decision applies to:

1. `.agentplane/WORKFLOW.md` front matter;
2. task README frontmatter;
3. `.agentplane/tasks.json`;
4. task PR metadata;
5. task handoff metadata.

Legacy `.agentplane/config.json` remains covered only as an import-fallback compatibility schema for
older workspaces, not as the current managed project source of truth.

Operationally, that means:

1. define durable contract shape and defaults in Zod;
2. derive runtime validation from that Zod contract;
3. derive TypeScript types from the same contract;
4. generate JSON Schema mirrors from the same contract;
5. keep `packages/spec` as a distribution mirror, not as a second authority.

## What this rejects

### Rejected: `packages/spec` as the canonical schema source

Rejected because it creates a second writable authority and reintroduces drift.

### Rejected: AJV-first durable contracts

Rejected because it splits one contract into too many parallel artifacts:

1. handwritten validators;
2. handwritten types or compatibility wrappers;
3. generated schema mirrors derived indirectly instead of directly.

AJV-first was acceptable as an intermediate state. It is no longer the chosen baseline.

### Rejected: schema mirrors for every JSON read

Rejected because many remaining parse sites are local implementation details, not durable public contracts.

## Boundary rule

Every new JSON boundary must choose one of two lanes.

### Lane 1. Durable contract

Use this lane when the artifact is:

1. stored durably in the repository or task workspace;
2. consumed by multiple subsystems or external tooling;
3. expected to keep a stable versioned shape.

Required approach:

1. define it in Zod under `packages/core/src/**`;
2. infer exported types from Zod;
3. generate synchronized JSON Schema mirrors;
4. cover parity with `bun run schemas:check`.

### Lane 2. Internal or transient JSON

Use this lane when the artifact is:

1. local to one subsystem;
2. derived from subprocess output, caches, or short-lived runtime files;
3. not intended as a published durable contract.

Required approach:

1. parse once at the boundary;
2. use a narrow decoder or guard;
3. avoid adding a schema mirror unless the artifact becomes durable later.

## Consequences

### Positive

1. one executable contract source per durable artifact;
2. one place to change defaults and validation rules;
3. less drift between runtime parsing, exported types, and schema mirrors;
4. clearer distinction between durable contracts and internal decoders.

### Negative

1. generated JSON Schema output may differ structurally from older AJV-era artifacts;
2. docs and tooling that assumed AJV-first internals need to be updated;
3. broad parse-site cleanup still remains as separate work and is not solved by this decision alone.

## Implementation notes

This ADR does not require Zod to replace every decoder in the repository.

It requires only that durable framework contracts use the same source of truth.

Everything else stays on the narrower rule:

1. durable contract: Zod + generated schema mirrors;
2. transient/internal JSON: local decoder only.

## Follow-up

Remaining follow-up after this ADR:

1. keep adjacent architecture/docs pages aligned with the Zod baseline;
2. continue removing stale references that still describe `packages/spec` or AJV as the primary schema authority;
3. review remaining `JSON.parse(...) as T` sites by boundary type instead of forcing a repo-wide schema migration.
