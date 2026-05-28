<!--
AGENTS_POLICY: gateway-v1.1
repo_namespace: .agentplane
default_initiator: ORCHESTRATOR
-->

<!-- ap:fragment id="gateway.agents.purpose.purpose" slot="purpose" mutability="replaceable" -->

# PURPOSE

`AGENTS.md` is the policy gateway for agents in this repository.
It provides strict routing, hard constraints, and command contracts.
Detailed procedures live in canonical modules from `## CANONICAL DOCS`.

<!-- /ap:fragment -->

<!-- ap:fragment id="gateway.agents.purpose.project" slot="purpose" mutability="replaceable" -->

## PROJECT

- Repository type: user project initialized with `agentplane`.
- CLI rule: prefer `ap` for compact agent-oriented commands; fall back to `agentplane`; if neither is available, stop and request installation guidance (do not invent repo-local entrypoints).
- Startup shortcut: run `## COMMANDS -> Preflight`, then use `ap quickstart`; activate `ap role ORCHESTRATOR` for planning and `ap role <ROLE>` for the active owner before owner-scoped execution; then apply `## LOAD RULES` before any mutation. The guarded route is determined by `workflow.mode` in `.agentplane/WORKFLOW.md`; use `ap task brief <task-id>` and the emitted next command before manually assembling route commands. In `branch_pr`, start from the emitted `work start` route command or `ap work start ... --worktree`; in `direct`, stay in the current checkout and use the task lifecycle route.

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.agents.source_of_truth.sources.of.truth" slot="source_of_truth" mutability="replaceable" -->

## SOURCES OF TRUTH

Priority order (highest first):

1. Enforcement: CI, tests, linters, hooks, CLI validations.
2. Policy gateway: `AGENTS.md`.
3. Canonical policy modules from `## CANONICAL DOCS`.
4. CLI guidance: `ap quickstart`, `ap role <ROLE>`, `.agentplane/WORKFLOW.md`.
5. Reference examples from `## REFERENCE EXAMPLES`.

Conflict rule:

- If documentation conflicts with enforcement, enforcement wins.
- If lower-priority text conflicts with higher-priority policy, higher-priority policy wins.

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.agents.hard_constraint.scope.boundary" slot="hard_constraint" mutability="append_only" -->

## SCOPE BOUNDARY

- MUST keep all actions inside this repository unless the user explicitly approves outside-repo access.
- MUST NOT read or modify global user files (`~`, `/etc`, keychains, ssh keys, global git config) without explicit user approval.
- MUST treat network access as approval-gated when `agents.approvals.require_network=true`.

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.agents.commands.commands" slot="commands" mutability="replaceable" -->

## COMMANDS

### Preflight

```bash
ap config show
ap quickstart
ap task list
ap task active
git status --short --untracked-files=no
git status --short
git rev-parse --abbrev-ref HEAD
```

### Task lifecycle

```bash
ap task new --title "..." --description "..." --priority med --owner <ROLE> --tag <tag>
ap task plan set <task-id> --text "..." --updated-by <ROLE>
ap task plan approve <task-id> --by ORCHESTRATOR
ap task start-ready <task-id> --author <ROLE> --body "Start: ..."
ap verify <task-id> --ok|--rework --by <ROLE> --note "..." [--observation "..." --impact "..." --resolution "..."] [--local-only]
ap finish <task-id> --author <ROLE> --body "Verified: ..." --result "..." --commit <git-rev>
```

### branch_pr lifecycle

```bash
ap work start <task-id> --agent <ROLE> --slug <slug> --worktree
ap task start-ready <task-id> --author <ROLE> --body "Start: ..."
git commit -m "Implement <task>"
ap task verify-show <task-id>
ap pr open <task-id> --branch task/<task-id>/<slug> --author <ROLE>
ap verify <task-id> --ok|--rework --by <ROLE> --note "..."
ap evaluator run <task-id> --verdict pass|rework|blocked|human_review --summary "..." --finding "..." --evidence <path-or-check>
ap integrate <task-id> --branch task/<task-id>/<slug> --run-verify
ap finish <task-id> --author INTEGRATOR --body "Verified: ..." --result "..." --commit <git-rev> --close-commit
```

### Verification

```bash
ap vshow <task-id>
ap verify <task-id> --ok|--rework --by <ROLE> --note "..." [--observation "..." --impact "..." --resolution "..."] [--local-only]
ap evaluator run <task-id> --verdict pass|rework|blocked|human_review --summary "..." --finding "..." --evidence <path-or-check> [--missing-test "..." --hidden-assumption "..." --residual-risk "..."]
ap incidents advise <task-id>
ap incidents collect <task-id> --check
ap doctor
node .agentplane/policy/check-routing.mjs
```

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.agents.body.tooling" slot="body" mutability="replaceable" -->

## TOOLING

- Use `## COMMANDS` as the canonical command source.
- Use `ap quickstart` as the compact installed startup path and `ap role <ROLE>` to activate the current role before role-scoped planning or execution.
- For policy changes, routing validation MUST pass via `node .agentplane/policy/check-routing.mjs`.

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.agents.body.shared.prompt.contract" slot="body" mutability="replaceable" -->

## SHARED PROMPT CONTRACT

- Outcome-first, concise, evidence-first: state goal, success criteria, constraints, stop rules, and output; use procedure only for command contracts, state machines, or irreversible gates; ask one narrow question only when missing information changes scope, task graph, security, or irreversible action.
- Retrieval/progress/cache: preamble before multi-step or tool-heavy work; use `ap task active` and `ap task brief <task-id>` before manually combining task docs, route status, Verify Steps, PR metadata, and policy notes; load only matched policy, task README, Verify Steps, and relevant files; use incidents only for analogous scope/tags; final output names actions, checks, blockers/drift, and next approval; keep stable gateway/policy/role before dynamic context and never cache mutable task state.

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.user.instructions" slot="body" mutability="append_only" -->

IF `.agentplane/user-instructions.md` exists THEN LOAD it as `gateway.user.instructions`.

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.agents.load_rules.load.rules" slot="load_rules" mutability="replaceable" -->

## LOAD RULES

Routing is strict. Load only modules that match the current task.

### Always imports for mutating tasks

Condition: task includes mutation (file edits, task-state changes, commits, merge/integrate, release/publish).

- `@.agentplane/policy/security.must.md`
- `@.agentplane/policy/dod.core.md`

### Conditional imports (linear IF -> LOAD contract)

1. IF `workflow.mode=direct` THEN LOAD `@.agentplane/policy/workflow.direct.md`.
2. IF `workflow.mode=branch_pr` THEN LOAD `@.agentplane/policy/workflow.branch_pr.md`.
3. IF task touches release/version/publish THEN LOAD `@.agentplane/policy/workflow.release.md`.
4. IF task runs CLI upgrade or touches `.agentplane/.upgrade/**` THEN LOAD `@.agentplane/policy/workflow.upgrade.md`.
5. IF task modifies implementation code paths THEN LOAD `@.agentplane/policy/dod.code.md`.
6. IF task modifies docs/policy-only paths (`AGENTS.md`, docs, `.agentplane/policy/**`) THEN LOAD `@.agentplane/policy/dod.docs.md`.
7. IF task modifies policy files (`AGENTS.md` or `.agentplane/policy/**`) THEN LOAD `@.agentplane/policy/governance.md`.
8. IF task modifies `.agentplane/policy/incidents.md` THEN LOAD `@.agentplane/policy/incidents.md`.

Routing constraints:

- MUST NOT load unrelated policy modules.
- MUST NOT use wildcard policy paths.
- MUST keep loaded policy set minimal (target: 2-4 files per task).
- If routing is ambiguous, ask one clarifying question before loading extra modules.

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.agents.hard_constraint.must.must.not" slot="hard_constraint" mutability="append_only" -->

## MUST / MUST NOT

- MUST start with ORCHESTRATOR preflight and plan summary.
- MUST NOT perform mutating actions before explicit user approval.
- MUST create/reuse executable task IDs for any repo-state mutation.
- MUST use `ap`/`agentplane` commands for task lifecycle updates; MUST NOT manually edit `.agentplane/tasks.json`.
- MUST run `ap task plan approve ...` and `ap task start-ready ...` sequentially (never in parallel).
- MUST activate `ap role ORCHESTRATOR` for planning and `ap role <ROLE>` for the active task owner before owner-scoped execution or verification.
- MUST keep repository artifacts in English by default (unless user explicitly requests another language for a specific artifact).
- MUST NOT fabricate repository facts.
- MUST stage/commit only intentional changes for the active task scope.
- MUST stop and request re-approval when scope, risk, or verification criteria materially drift.
- MUST NOT let ORCHESTRATOR perform owner-scoped implementation or verification once a task owner is known, unless the approved plan explicitly makes ORCHESTRATOR the owner.
- MUST treat user-authenticated GitHub actions as user-attributed publication and route post-merge fixes through a new task or explicit `post-merge-` branch or `followup` slug token.

Role boundaries: ORCHESTRATOR = preflight + plan + approvals; PLANNER = executable task graph creation/update; INTEGRATOR = base integration/finish in `branch_pr`.

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.agents.body.core.dod" slot="body" mutability="replaceable" -->

## CORE DOD

A task is done only when all are true:

1. Approved scope is satisfied; no unresolved drift.
2. Required checks from loaded policy modules passed.
3. Security and approval gates were respected.
4. Traceability exists (task ID + updated task docs).
5. Verification evidence is recorded.
6. No unintended tracked changes remain.

Detailed DoD rules are in `.agentplane/policy/dod.core.md`, `.agentplane/policy/dod.code.md`, and `.agentplane/policy/dod.docs.md`.

---

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.agents.hard_constraint.size.budget" slot="hard_constraint" mutability="append_only" -->

## SIZE BUDGET

- `AGENTS.md` MUST stay <= 250 lines.
- Every policy markdown module under `.agentplane/policy/*.md` MUST stay <= 100 lines.
- Worst-case loaded policy graph (always imports + all conditional imports) MUST stay <= 600 lines.
- Enforced by `node .agentplane/policy/check-routing.mjs`.

---

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.agents.body.canonical.docs" slot="body" mutability="replaceable" -->

## CANONICAL DOCS

- DOC `.agentplane/policy/workflow.md`
- DOC `.agentplane/policy/workflow.direct.md`
- DOC `.agentplane/policy/workflow.branch_pr.md`
- DOC `.agentplane/policy/workflow.release.md`
- DOC `.agentplane/policy/workflow.upgrade.md`
- DOC `.agentplane/policy/security.must.md`
- DOC `.agentplane/policy/dod.core.md`
- DOC `.agentplane/policy/dod.code.md`
- DOC `.agentplane/policy/dod.docs.md`
- DOC `.agentplane/policy/governance.md`
- DOC `.agentplane/policy/incidents.md`

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.agents.example.reference.examples" slot="example" mutability="replaceable" -->

## REFERENCE EXAMPLES

- EXAMPLE `.agentplane/policy/examples/pr-note.md`
- EXAMPLE `.agentplane/policy/examples/unit-test-pattern.md`
- EXAMPLE `.agentplane/policy/examples/migration-note.md`

---

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.agents.body.change.control" slot="body" mutability="replaceable" -->

## CHANGE CONTROL

- Follow incident-log, immutability, and policy-budget rules in `.agentplane/policy/governance.md`.
- Record situational incident rules only in `.agentplane/policy/incidents.md`; use targeted lookup/promotion (`task start-ready`, `incidents advise`, `incidents collect`, `finish`) instead of bulk-loading it during normal startup.
- Keep `AGENTS.md` as a gateway; move detailed procedures to canonical modules.
<!-- /ap:fragment -->
