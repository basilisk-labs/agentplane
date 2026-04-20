# ROADMAP

## 2026Q2 Refactor Status

The active refactor program is tracked through task IDs and ADRs rather than by duplicating the full
task board here. The current decision log starts at [docs/adr/README.md](docs/adr/README.md).

Completed groups:

- Schema drift control: config validation is Zod-sourced and guarded by the parity baseline in
  [ADR 0001](docs/adr/0001-zod-config-parity.md).
- Testkit consolidation: reusable CLI, task, recipe, runner, and Vitest helpers now live behind the
  canonical testkit surfaces.
- Hotspot decomposition: init, hosted merge sync, task finish, guard dispatch, Redmine backend,
  process supervision, release apply pipeline, runner adapters, backend dispatch, and scenario/backend
  command dispatch have been split or converted to registries.
- Shared infrastructure: Git helpers, logger, process runner, script runtime helpers, generated
  artifact checks, structured errors, trace events, and hotspot threshold guards are in place.
- ADR surface: dependency and framework decisions now use lightweight ADRs; see
  [ADR 0002](docs/adr/0002-adr-process.md) and [ADR 0003](docs/adr/0003-refactor-sequencing.md).

Open groups:

- Framework migration tasks: Vitest projects, dependency-cruiser, knip, tsup/subpath exports, clack
  prototype, and Zod validation error rendering.
- Documentation cleanup: condense long design/editorial docs and add concise README status badges.
- Performance and bundle checks: CLI cold-path baseline, core subpath exports, dead export cleanup,
  and yauzl alternative evaluation.
- CI guardrails and large tests: types-file guardrail, significant coverage extensions, critical
  Vitest route, and remaining mega-test splits.

## 0.1 Foundation and Baseline Workflow

- Establish the initial Agentplane CLI baseline and project structure.
- Define the first end-to-end task lifecycle for local execution.
- Introduce core task tracking, verification logging, and export conventions.

## 0.2 Architecture and Codebase Formalization

- Formalize architecture boundaries and core codebase contracts.
- Modularize subsystems to keep scaling simple and predictable.
- Formalize operational processes at the CLI level.

## 0.3 Prompt System Improvements

- Improve agent prompts for better determinism and execution quality.
- Formalize process contracts at the agent-prompt level.
- Deliver a dedicated Claude Code-compatible version.

## 0.4 Recipes and Plugin Extension Model

- Support custom agents, tools/SKILLS, and scenarios through recipes.
- Define recipe packaging, versioning, and compatibility rules.
- Add recipe discovery, installation, and validation flows in CLI.

## 0.5 Agentplane Runner

- Build Agentplane Runner for autonomous task execution.
- Enable coordinated swarm-style execution by custom agents.
- Provide orchestration primitives for reliable multi-agent runs.
