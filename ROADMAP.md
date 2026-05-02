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

- Release hygiene: source archive policy, package tarball assertions, install smoke coverage, and
  sanitized build metadata.
- Documentation freshness: keep current user/developer docs aligned with generated CLI help and
  move historical migration notes out of the main install path.
- Init correctness: keep init plan/apply behavior transactional and ensure every materialized file
  intended for the first install commit is included.
- Future eval system: define repeatable evaluation suites and recursive prompt/recipe improvement
  loops before they become release gates.

## 0.1 Foundation and Baseline Workflow

- Establish the initial Agentplane CLI baseline and project structure.
- Define the first end-to-end task lifecycle for local execution.
- Introduce core task tracking, verification logging, and export conventions.

## 0.2 Architecture and Codebase Formalization

- Formalize architecture boundaries and core codebase contracts.
- Modularize subsystems to keep scaling simple and predictable.
- Formalize operational processes at the CLI level.

## 0.3 Git-native Task Control Plane

- Lock the repo-local control plane: policy gateway, `.agentplane/` layout, workflow modes, task
  README storage, task export snapshots, and deterministic finish/close behavior.
- Stabilize task lifecycle commands: create, plan, approve, start, verify, finish, close, hosted
  close, docs, findings, and backend projection.
- Keep package installation clean: published artifacts must contain the bundled runtime and declared
  public assets only, not source checkout or runner evidence.

## 0.4 Modular Prompt and Recipe Extension Model

- Compile prompt modules from framework, policy, agents, recipes, and project overrides.
- Support custom agents, tools/skills, and scenarios through versioned recipes.
- Add recipe discovery, installation, activation, validation, and prompt drift diagnostics.

## 0.5 Agentplane Runner

- Build Agentplane Runner for autonomous task execution.
- Enable coordinated swarm-style execution by custom agents.
- Provide orchestration primitives for reliable multi-agent runs.

## 0.6 Evaluation and Recursive Improvement

- Define eval targets for agents, recipes, core prompt modules, runner behavior, lifecycle flows,
  and prompt compiler regressions.
- Run scenario-based evaluations through the planner-runner-evaluator loop with reproducible
  inputs, structured evidence artifacts, deterministic gates, optional LLM quality scoring, and
  baseline-vs-candidate comparison reports.
- Support recursive improvement for prompts and recipes: evaluate the current behavior, test a
  candidate prompt/module/recipe change, and promote it only when quality improves without
  critical regressions.
- Keep benchmark mode separate from internal improvement evals: AgentPlane should be able to run
  external harness benchmarks and export/submit results without letting leaderboard metrics replace
  recipe or prompt quality gates.
