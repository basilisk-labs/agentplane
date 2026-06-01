---
tags:
  - agentplane/context
  - agentplane/release-docs-assimilation
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.release_docs.concepts"
  title: "Release and documentation concepts"
  modality: observation
  epistemic_status: sourced_claim
  visibility: project
  source_refs:
    - "docs/adr/0002-adr-process.md"
    - "docs/adr/0001-zod-config-parity.md"
    - "docs/adr/0001-zod-config-parity.md"
    - "docs/adr/0004-keep-custom-cli-stack.md"
    - "docs/adr/0002-adr-process.md"
    - "docs/adr/0008-keep-yauzl-for-zip-validation.md"
    - "docs/adr/0001-zod-config-parity.md"
    - "docs/adr/0001-zod-config-parity.md"
    - "docs/adr/0001-zod-config-parity.md"
    - "docs/adr/0002-adr-process.md"
    - "docs/adr/0001-zod-config-parity.md"
    - "docs/adr/0003-refactor-sequencing.md"
    - "docs/adr/0001-zod-config-parity.md"
    - "docs/adr/0002-adr-process.md"
    - "docs/adr/0009-recipes-index-signing-algorithm-policy.md"
    - "docs/adr/0001-zod-config-parity.md"
    - "docs/adr/0005-defer-biome-migration.md"
    - "docs/adr/0001-zod-config-parity.md"
    - "docs/adr/0010-core-root-export-compatibility.md"
    - "docs/adr/0001-zod-config-parity.md"
  claims: []
  graph_refs:
    entities:
      - "entity.concept.cli"
      - "entity.concept.agents"
      - "entity.concept.verification"
      - "entity.concept.workflow"
      - "entity.concept.website"
      - "entity.concept.release"
      - "entity.concept.github-pr"
      - "entity.concept.policy"
      - "entity.concept.context"
      - "entity.concept.documentation"
      - "entity.concept.quality"
      - "entity.concept.testing"
      - "entity.concept.schemas"
      - "entity.concept.commands-reference"
      - "entity.concept.recipes"
      - "entity.concept.migration"
      - "entity.concept.worktrees"
      - "entity.concept.configuration"
      - "entity.concept.acr"
      - "entity.concept.performance"
      - "entity.concept.task-runner"
      - "entity.concept.architecture"
      - "entity.concept.cloud-sync"
      - "entity.concept.hooks"
      - "entity.concept.task-backend"
      - "entity.concept.incidents"
      - "entity.concept.security"
      - "entity.concept.provider-integration"
      - "entity.concept.blueprints"
      - "entity.concept.local-context"
      - "entity.concept.hermes"
      - "entity.concept.dashboard"
    edges:
  conflicts: []
  updated_by: CURATOR
---

## Sources

1. [`docs/adr/0002-adr-process.md`](../../docs/adr/0002-adr-process.md)
2. [`docs/adr/0001-zod-config-parity.md`](../../docs/adr/0001-zod-config-parity.md)
3. [`docs/adr/0001-zod-config-parity.md`](../../docs/adr/0001-zod-config-parity.md)
4. [`docs/adr/0004-keep-custom-cli-stack.md`](../../docs/adr/0004-keep-custom-cli-stack.md)
5. [`docs/adr/0002-adr-process.md`](../../docs/adr/0002-adr-process.md)
6. [`docs/adr/0008-keep-yauzl-for-zip-validation.md`](../../docs/adr/0008-keep-yauzl-for-zip-validation.md)
7. [`docs/adr/0001-zod-config-parity.md`](../../docs/adr/0001-zod-config-parity.md)
8. [`docs/adr/0001-zod-config-parity.md`](../../docs/adr/0001-zod-config-parity.md)
9. [`docs/adr/0001-zod-config-parity.md`](../../docs/adr/0001-zod-config-parity.md)
10. [`docs/adr/0002-adr-process.md`](../../docs/adr/0002-adr-process.md)
11. [`docs/adr/0001-zod-config-parity.md`](../../docs/adr/0001-zod-config-parity.md)
12. [`docs/adr/0003-refactor-sequencing.md`](../../docs/adr/0003-refactor-sequencing.md)
13. [`docs/adr/0001-zod-config-parity.md`](../../docs/adr/0001-zod-config-parity.md)
14. [`docs/adr/0002-adr-process.md`](../../docs/adr/0002-adr-process.md)
15. [`docs/adr/0009-recipes-index-signing-algorithm-policy.md`](../../docs/adr/0009-recipes-index-signing-algorithm-policy.md)
16. [`docs/adr/0001-zod-config-parity.md`](../../docs/adr/0001-zod-config-parity.md)
17. [`docs/adr/0005-defer-biome-migration.md`](../../docs/adr/0005-defer-biome-migration.md)
18. [`docs/adr/0001-zod-config-parity.md`](../../docs/adr/0001-zod-config-parity.md)
19. [`docs/adr/0010-core-root-export-compatibility.md`](../../docs/adr/0010-core-root-export-compatibility.md)
20. [`docs/adr/0001-zod-config-parity.md`](../../docs/adr/0001-zod-config-parity.md)

# Release and documentation concepts

- [[cli concept]]: 197 source files.
- [[agents concept]]: 190 source files.
- [[verification concept]]: 183 source files.
- [[workflow concept]]: 166 source files.
- [[website concept]]: 157 source files.
- [[release concept]]: 157 source files.
- [[github-pr concept]]: 153 source files.
- [[policy concept]]: 143 source files.
- [[context concept]]: 141 source files.
- [[documentation concept]]: 136 source files.
- [[quality concept]]: 132 source files.
- [[testing concept]]: 131 source files.
- [[schemas concept]]: 127 source files.
- [[commands-reference concept]]: 122 source files.
- [[recipes concept]]: 104 source files.
- [[migration concept]]: 101 source files.
- [[worktrees concept]]: 100 source files.
- [[configuration concept]]: 88 source files.
- [[acr concept]]: 83 source files.
- [[performance concept]]: 80 source files.
- [[task-runner concept]]: 79 source files.
- [[architecture concept]]: 77 source files.
- [[cloud-sync concept]]: 68 source files.
- [[hooks concept]]: 56 source files.
- [[task-backend concept]]: 49 source files.
- [[incidents concept]]: 45 source files.
- [[security concept]]: 34 source files.
- [[provider-integration concept]]: 28 source files.
- [[blueprints concept]]: 22 source files.
- [[local-context concept]]: 21 source files.
- [[hermes concept]]: 7 source files.
- [[dashboard concept]]: 4 source files.
