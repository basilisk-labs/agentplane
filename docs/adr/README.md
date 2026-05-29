<p align="center">
  <img src="../assets/readme-headers/adr.svg" alt="Agentplane ADR header" style="width:100%;max-width:100%;"/>
</p>

# Architecture Decision Records

This directory stores accepted architecture decisions that affect the Agentplane framework,
runtime contracts, release process, or dependency posture.

Use ADRs for decisions that would otherwise be rediscovered in code review:

1. A dependency is accepted, rejected, deferred, or constrained.
2. A runtime or CLI contract is intentionally kept custom.
3. A refactor changes module ownership or package boundaries.
4. A migration has a measurable rollback or compatibility cost.

Keep ADRs short. Prefer facts, decision, consequences, and follow-up over historical narrative.

## Index

| ADR                                                      | Status   | Decision                                                                                                   |
| -------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| [0001](./0001-zod-config-parity.md)                      | Accepted | Treat config validation as Zod-sourced and use parity audit as a regression guard.                         |
| [0002](./0002-adr-process.md)                            | Accepted | Use lightweight Markdown ADRs for cross-cutting refactor and dependency decisions.                         |
| [0003](./0003-refactor-sequencing.md)                    | Accepted | Sequence remaining refactor work by drift risk first, then hotspot and tooling leverage.                   |
| [0004](./0004-keep-custom-cli-stack.md)                  | Accepted | Keep the custom command catalog and parser instead of adopting Commander, Citty, or Oclif.                 |
| [0005](./0005-defer-biome-migration.md)                  | Accepted | Defer Biome migration until rule parity and formatting churn risks are resolved.                           |
| [0006](./0006-no-effect-fp-ts-migration.md)              | Accepted | Keep pragmatic TypeScript and avoid an Effect/fp-ts migration during this refactor cycle.                  |
| [0007](./0007-freeze-yaml-parser-stack.md)               | Accepted | Keep `yaml` as the canonical YAML parser during the current refactor cycle.                                |
| [0008](./0008-keep-yauzl-for-zip-validation.md)          | Accepted | Keep `yauzl` for ZIP validation because alternatives do not meet the measured size/risk bar.               |
| [0009](./0009-recipes-index-signing-algorithm-policy.md) | Accepted | Keep Ed25519 as the only implemented recipes index signing algorithm behind an explicit verifier registry. |
| [0010](./0010-core-root-export-compatibility.md)         | Accepted | Keep `@agentplaneorg/core` as a compatibility aggregate while internal runtime code uses subpath imports.  |
| [0011](./0011-v0.3-surface-freeze.md)                    | Accepted | Freeze the v0.3 CLI, task lifecycle, config schema, and package surface until v0.4 migration planning.     |
| [0012](./0012-v0.4-surface-transition.md)                | Accepted | Retire the root v0.3 freeze artifact from the v0.4 line while preserving it on the `0.3` branch.           |
| [0013](./0013-zod-contract-ssot.md)                      | Accepted | Use Zod in `packages/core/src/**` as the single source of truth for durable repository contracts.          |
