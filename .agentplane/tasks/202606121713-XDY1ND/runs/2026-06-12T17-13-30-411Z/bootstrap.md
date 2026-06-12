/goal Execute AgentPlane loop step tdd.fix/agent_patch for task 202606121713-XDY1ND

# agentplane runner bootstrap

This invocation is already inside an approved runner execution.
- Do not run repository startup commands such as `agentplane config show`, `agentplane quickstart`, `agentplane task list`, `git status`, or `git rev-parse` unless the bundle explicitly requires them as task work.
- Do not create, approve, start, verify, finish, block, or rerun tasks unless the bundle explicitly requires task metadata edits.
- Keep lifecycle authority with the parent AgentPlane workflow; do not open PRs, merge, release, push publication artifacts, or clean worktrees unless the bundle explicitly delegates that action.
- Do not recursively invoke runner entrypoints such as `agentplane task run` or `agentplane recipes scenario execute` from inside this run.
- Assume sibling runners may be executing concurrently. Keep writes inside the task scope, avoid broad refactors or shared policy edits, and report possible write conflicts in the result manifest instead of resolving them speculatively.
- Open bundle.json immediately, execute the requested work directly, and stop when the requested outcome is satisfied.

- target: loop step tdd.fix/agent_patch for task 202606121713-XDY1ND
- adapter: codex
- mode: execute
- run_id: 2026-06-12T17-13-30-411Z
- bundle_path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121713-XDY1ND/runs/2026-06-12T17-13-30-411Z/bundle.json
- result_path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121713-XDY1ND/runs/2026-06-12T17-13-30-411Z/result.json
- bootstrap_path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121713-XDY1ND/runs/2026-06-12T17-13-30-411Z/bootstrap.md
- checkout_role: current_checkout
- route_phase: loop_agent_step
- route_authoritative_checkout: current_checkout
- route_authoritative_checkout_path: /Users/densmirnov/Github/agentplane
- route_mutation_path_hint: /Users/densmirnov/Github/agentplane
- route_next_action: execute_loop_step
- route_next_command: none
- route_primary_blocker: none
- route_requires_approval: false
- gateway_mutation_policy: true
- effective_mutation_approval: false
- route_action_kind: loop_step
- route_safe_to_mutate: true
- route_recommended_role: CODER
- route_must_run_from: /Users/densmirnov/Github/agentplane
- route_exact_argv: none
- route_return_control_when: after writing the runner result manifest for this loop step
- route_stale_state_check: agentplane task next-action <task-id> --explain
- route_requires_provider_action: false
- route_human_provider_action: none
- route_evidence_missing: 
- route_verification_candidate: none
- runner_is_required: true
- runner_is_allowed_now: false
- local_work_allowed_if_runner_fails: false
- runner_failure_means: runner failure is run evidence; inspect artifacts before marking task verification

Use bundle.json as the complete runner input. Do not reconstruct prompts or route decisions from CLI argv.
Loop-step execution contract:
- loop_id: tdd.fix
- loop_version: 0.1.0
- step_id: agent_patch
- step_type: agent.run
- prompt_module: none
- Execute this loop step directly in route_must_run_from/current checkout.
- route_exact_argv is intentionally empty for loop_step targets; do not run branch_pr lifecycle commands such as `agentplane work start`, `agentplane pr open`, `agentplane integrate`, `agentplane finish`, or `agentplane cleanup`.
- Do not recompute `agentplane task next-action` before doing the loop-step work. Use the task context, loop step metadata, and step contract from bundle.json as the execution input.
- Keep writes inside the requested task/loop scope unless the task itself explicitly requires code changes. If the requested artifact cannot be produced, write a blocked result manifest with the reason and recommended parent action.
For file-edit tools that do not accept cwd/workdir, use absolute paths under route_mutation_path_hint when route_safe_to_mutate is true; otherwise stop before mutating files.
Return control after writing result_path; the parent loop decides follow-up steps.
Runner rail contract: only think about runner execution when runner_is_required or runner_is_allowed_now is true; otherwise treat runner failures from earlier attempts as diagnostic evidence, not as the current route.
When reading bundle.json directly, use camelCase JSON paths: route_decision.oracle.nextCommand, route_decision.oracle.authoritativeCheckout, route_decision.oracle.authoritativeCheckoutPath, route_decision.oracle.mutationPathHint, route_decision.oracle.blocker, and route_decision.oracle.phase.
Route must-not rules:
- do not run branch_pr lifecycle commands such as work start, pr open, integrate, finish, or cleanup
- do not recompute task next-action for loop-step execution unless reporting a blocked result
- do not invoke agentplane task run recursively
If the requested work cannot be completed without widening lifecycle authority or touching likely sibling-owned files, stop and write a blocked result manifest with the conflict, affected paths, and recommended parent action.

Evaluator skepticism contract:
- evaluator_skepticism_level: standard
- During evaluator or audit review, reconstruct the intended contract from the task, plan, Verify Steps, route decision, diff, and evidence; do not rely on the implementer's summary.
- Treat passing technical checks as evidence, not proof. Look for broken invariants, missing negative cases, stale route assumptions, and untested concurrency or lifecycle edges.
- If the run is evaluator-only, do not fix issues. Return findings, missing tests, hidden assumptions, residual risks, and a concrete rework packet for the parent runner.
- Standard review: focus on explicit scope, declared verification, and obvious missing evidence.

Blueprint stop rules:
- stop: Blueprint code.direct does not support workflow mode branch_pr. (workflow_mode_incompatible)

Execution playbook contract:
- blueprint_result: generic_runner_execution_result
- selected_playbook: none
- runtime: codex
- final verifier blocks success when required state is missing.
Required final state:
- policy_decision_recorded: Required execution blueprint state policy_decision_recorded must be observed before success.
Execute-mode runs must write a valid JSON result manifest to result_path before exiting.
If the manifest includes artifacts, every artifacts entry must be an object like {"path":"relative/or/absolute/path","label":"short-label"}; never use bare string artifact paths.
Minimal manifest example:
{"schema_version":1,"status":"success","summary":"Completed.","capabilities_used":["runner.exec"]}

Prepared invocation:

- argv: codex -a never exec --json --output-last-message /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121713-XDY1ND/runs/2026-06-12T17-13-30-411Z/codex-last-message.md -C /Users/densmirnov/Github/agentplane -s danger-full-access -
