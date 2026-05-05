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

- Blueprint layer: ship typed execution-route contracts before increasing runner autonomy, including
  built-in blueprints, validation, resolution, explanation, and task evidence expectations.
- Cloud backend contour: let projects choose a cloud backend during initialization or configuration
  so task state can synchronize with external platforms through a managed service.
- Release hygiene: source archive policy, package tarball assertions, install smoke coverage, and
  sanitized build metadata.
- Documentation freshness: keep current user/developer docs aligned with generated CLI help and
  move historical migration notes out of the main install path.
- Init correctness: keep init plan/apply behavior transactional and ensure every materialized file
  intended for the first install commit is included.
- Future runner and eval systems: keep autonomous execution and repeatable evaluation suites behind
  the blueprint and cloud backend foundations.

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

## 0.5 Blueprint Layer and Cloud Backend Contour

- Add the first shipped blueprint layer: typed route contracts, built-in blueprint definitions,
  validation, resolver output, and human-readable explanation for selected task routes.
- Make blueprint selection explicit in task evidence so agents can see why a task is using an
  analysis, docs, implementation, backend-sync, or release path before it mutates repository state.
- Allow projects to select a cloud backend during initialization or later configuration, with a
  neutral endpoint/token contract for synchronizing tasks with external platforms through a managed
  service.
- Keep external platform choices behind the cloud service boundary so AgentPlane can expose one
  stable backend surface while integrations such as GitHub Projects or Redmine evolve independently.

## 0.6 Agentplane Runner

- Build Agentplane Runner on top of resolved blueprints rather than as a separate orchestration
  model.
- Enable coordinated multi-agent execution through blueprint-aware task routes, evidence collection,
  and stop rules.
- Provide orchestration primitives for reliable autonomous runs without weakening repo-local policy
  gates.

## 0.7 Evaluation and Recursive Improvement

- Define eval targets for agents, recipes, core prompt modules, runner behavior, lifecycle flows,
  blueprint resolution, lifecycle flows, and prompt compiler regressions.
- Run scenario-based evaluations through the planner-runner-evaluator loop with reproducible
  inputs, structured evidence artifacts, deterministic gates, optional LLM quality scoring, and
  baseline-vs-candidate comparison reports.
- Support recursive improvement for prompts and recipes: evaluate the current behavior, test a
  candidate prompt/module/recipe change, and promote it only when quality improves without
  critical regressions.
- Keep benchmark mode separate from internal improvement evals: AgentPlane should be able to run
  external harness benchmarks and export/submit results without letting leaderboard metrics replace
  recipe or prompt quality gates.
