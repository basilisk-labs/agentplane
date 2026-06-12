/goal Execute AgentPlane task 202606121434-CRN467: Smoke execute loop agent step

# agentplane runner bootstrap

This invocation is already inside an approved runner execution.
- Do not run repository startup commands such as `agentplane config show`, `agentplane quickstart`, `agentplane task list`, `git status`, or `git rev-parse` unless the bundle explicitly requires them as task work.
- Do not create, approve, start, verify, finish, block, or rerun tasks unless the bundle explicitly requires task metadata edits.
- Keep lifecycle authority with the parent AgentPlane workflow; do not open PRs, merge, release, push publication artifacts, or clean worktrees unless the bundle explicitly delegates that action.
- Do not recursively invoke runner entrypoints such as `agentplane task run` or `agentplane recipes scenario execute` from inside this run.
- Assume sibling runners may be executing concurrently. Keep writes inside the task scope, avoid broad refactors or shared policy edits, and report possible write conflicts in the result manifest instead of resolving them speculatively.
- Open bundle.json immediately, execute the requested work directly, and stop when the requested outcome is satisfied.

- target: task 202606121434-CRN467
- adapter: codex
- mode: execute
- run_id: 2026-06-12T14-34-51-843Z
- bundle_path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121434-CRN467/runs/2026-06-12T14-34-51-843Z/bundle.json
- result_path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121434-CRN467/runs/2026-06-12T14-34-51-843Z/result.json
- bootstrap_path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121434-CRN467/runs/2026-06-12T14-34-51-843Z/bootstrap.md
- checkout_role: task_worktree
- route_phase: worktree_needed
- route_authoritative_checkout: base_checkout
- route_authoritative_checkout_path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV
- route_mutation_path_hint: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV
- route_next_action: start_or_recover_worktree
- route_next_command: agentplane work start 202606121434-CRN467 --agent CODER --slug smoke-execute-loop-agent-step --worktree
- route_primary_blocker: missing_pr_branch: branch_pr task has no recorded PR branch
- route_requires_approval: false
- gateway_mutation_policy: true
- effective_mutation_approval: false
- route_action_kind: local_command
- route_safe_to_mutate: true
- route_recommended_role: CODER
- route_must_run_from: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV
- route_exact_argv: agentplane work start 202606121434-CRN467 --agent CODER --slug smoke-execute-loop-agent-step --worktree
- route_return_control_when: after the exact command exits; recompute task next-action before any further step
- route_stale_state_check: agentplane task next-action 202606121434-CRN467 --explain
- route_requires_provider_action: false
- route_human_provider_action: none
- route_evidence_missing: remote_pr, task_branch
- route_verification_candidate: none
- runner_is_required: false
- runner_is_allowed_now: false
- local_work_allowed_if_runner_fails: true
- runner_failure_means: not a runner route; do not introduce task run unless bundle explicitly delegates it

Use bundle.json as the complete runner input. Do not reconstruct prompts or route decisions from CLI argv.
Follow route_decision in bundle.json unless local state has changed; if it may be stale, run `agentplane task next-action <task-id> --explain` before mutating.
Route oracle contract: follow route_exact_argv when present, run it from route_must_run_from, treat route_primary_blocker as the current stop reason, and use route_phase instead of manually reconstructing branch/worktree/PR state.
For file-edit tools that do not accept cwd/workdir, use absolute paths under route_mutation_path_hint when route_safe_to_mutate is true; otherwise stop before mutating files.
Return control according to route_return_control_when. Do not continue to a second route step until route_stale_state_check has been recomputed.
Runner rail contract: only think about runner execution when runner_is_required or runner_is_allowed_now is true; otherwise treat runner failures from earlier attempts as diagnostic evidence, not as the current route.
When reading bundle.json directly, use camelCase JSON paths: route_decision.oracle.nextCommand, route_decision.oracle.authoritativeCheckout, route_decision.oracle.authoritativeCheckoutPath, route_decision.oracle.mutationPathHint, route_decision.oracle.blocker, and route_decision.oracle.phase.
Route must-not rules:
- do not reconstruct branch/worktree/PR state from prose
- do not widen lifecycle authority beyond this packet
- do not mutate outside mutationPathHint
- do not execute raw shell when exactArgv is null
- do not continue after a non-zero command exit without recomputing the route
If the requested work cannot be completed without widening lifecycle authority or touching likely sibling-owned files, stop and write a blocked result manifest with the conflict, affected paths, and recommended parent action.

Evaluator skepticism contract:
- evaluator_skepticism_level: standard
- During evaluator or audit review, reconstruct the intended contract from the task, plan, Verify Steps, route decision, diff, and evidence; do not rely on the implementer's summary.
- Treat passing technical checks as evidence, not proof. Look for broken invariants, missing negative cases, stale route assumptions, and untested concurrency or lifecycle edges.
- If the run is evaluator-only, do not fix issues. Return findings, missing tests, hidden assumptions, residual risks, and a concrete rework packet for the parent runner.
- Standard review: focus on explicit scope, declared verification, and obvious missing evidence.

Execution playbook contract:
- blueprint_result: generic_runner_execution_result
- selected_playbook: none
- runtime: codex
- final verifier blocks success when required state is missing.
Required final state:
- policy_decision_recorded: Required execution blueprint state policy_decision_recorded must be observed before success.
Execute-mode runs must write a valid JSON result manifest to result_path before exiting.
Minimal manifest example:
{"schema_version":1,"status":"success","summary":"Completed.","capabilities_used":["runner.exec"]}

Prepared invocation:

- argv: codex -a never exec --json --output-last-message /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121434-CRN467/runs/2026-06-12T14-34-51-843Z/codex-last-message.md -C /Users/densmirnov/Github/agentplane -s danger-full-access -
