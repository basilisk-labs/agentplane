<!--
AGENTS_POLICY: gateway-v1.1
repo_namespace: .agentplane
default_initiator: ORCHESTRATOR
-->

# PURPOSE

`AGENTS.md` is the policy gateway for agents in this repository.
It provides strict routing, hard constraints, and command contracts.
Detailed procedures live in canonical modules from `## CANONICAL DOCS`.

---

## PROJECT

- Repository type: user project initialized with `agentplane`.
- Gateway role: keep this file compact and deterministic; move scenario-specific details to policy modules.
- CLI rule: use `agentplane` from `PATH`; if unavailable, stop and request installation guidance (do not invent repo-local entrypoints).
- Startup shortcut: run `## COMMANDS -> Preflight`, then use `agentplane quickstart`; activate `agentplane role ORCHESTRATOR` for planning and `agentplane role <ROLE>` for the active owner before owner-scoped execution; then apply `## LOAD RULES` before any mutation.

---

## SOURCES OF TRUTH

Priority order (highest first):

1. Enforcement: CI, tests, linters, hooks, CLI validations.
2. Policy gateway: `AGENTS.md`.
3. Canonical policy modules from `## CANONICAL DOCS`.
4. CLI guidance: `agentplane quickstart`, `agentplane role <ROLE>`, `.agentplane/config.json`.
5. Reference examples from `## REFERENCE EXAMPLES`.

Conflict rule:

- If documentation conflicts with enforcement, enforcement wins.
- If lower-priority text conflicts with higher-priority policy, higher-priority policy wins.

---

## SCOPE BOUNDARY

- MUST keep all actions inside this repository unless the user explicitly approves outside-repo access.
- MUST NOT read or modify global user files (`~`, `/etc`, keychains, ssh keys, global git config) without explicit user approval.
- MUST treat network access as approval-gated when `agents.approvals.require_network=true`.

---

## COMMANDS

### Preflight

```bash
agentplane config show
agentplane quickstart
agentplane task list
git status --short --untracked-files=no
git rev-parse --abbrev-ref HEAD
```

### Task lifecycle

```bash
agentplane task new --title "..." --description "..." --priority med --owner <ROLE> --tag <tag>
agentplane task plan set <task-id> --text "..." --updated-by <ROLE>
agentplane task plan approve <task-id> --by ORCHESTRATOR
agentplane task start-ready <task-id> --author <ROLE> --body "Start: ..."
agentplane verify <task-id> --ok|--rework --by <ROLE> --note "..."
agentplane finish <task-id> --author <ROLE> --body "Verified: ..." --result "..." --commit <git-rev>
```

### Verification

```bash
agentplane task verify-show <task-id>
agentplane verify <task-id> --ok|--rework --by <ROLE> --note "..."
agentplane doctor
node .agentplane/policy/check-routing.mjs
```

---

## TOOLING

- Use `## COMMANDS` as the canonical command source.
- Use `agentplane quickstart` as the canonical installed startup path and `agentplane role <ROLE>` to activate the current role before role-scoped planning or execution.
- For policy changes, routing validation MUST pass via `node .agentplane/policy/check-routing.mjs`.

---

## LOAD RULES

Routing is strict. Load only modules that match the current task.

### Always imports for mutating tasks

Condition: task includes mutation (file edits, task-state changes, commits, merge/integrate, release/publish).

- `@.agentplane/policy/security.must.md`
- `@.agentplane/policy/dod.core.md`

### Conditional imports (linear IF -> LOAD contract)

1. IF `workflow_mode=direct` THEN LOAD `@.agentplane/policy/workflow.direct.md`.
2. IF `workflow_mode=branch_pr` THEN LOAD `@.agentplane/policy/workflow.branch_pr.md`.
3. IF task touches release/version/publish THEN LOAD `@.agentplane/policy/workflow.release.md`.
4. IF task runs `agentplane upgrade` or touches `.agentplane/.upgrade/**` THEN LOAD `@.agentplane/policy/workflow.upgrade.md`.
5. IF task modifies implementation code paths THEN LOAD `@.agentplane/policy/dod.code.md`.
6. IF task modifies docs/policy-only paths (`AGENTS.md`, docs, `.agentplane/policy/**`) THEN LOAD `@.agentplane/policy/dod.docs.md`.
7. IF task modifies policy files (`AGENTS.md` or `.agentplane/policy/**`) THEN LOAD `@.agentplane/policy/governance.md`.
8. IF task modifies `.agentplane/policy/incidents.md` THEN LOAD `@.agentplane/policy/incidents.md`.

Routing examples:

- Example (docs-only task): rules `1|6` apply in `direct`; do not load `dod.code.md`.
- Example (upgrade task): rules `4|7` apply plus workflow mode rule.

Routing constraints:

- MUST NOT load unrelated policy modules.
- MUST NOT use wildcard policy paths.
- MUST keep loaded policy set minimal (target: 2-4 files per task).
- If routing is ambiguous, ask one clarifying question before loading extra modules.

---

## MUST / MUST NOT

- MUST start with ORCHESTRATOR preflight and plan summary.
- MUST NOT perform mutating actions before explicit user approval.
- MUST create/reuse executable task IDs for any repo-state mutation.
- MUST use `agentplane` commands for task lifecycle updates; MUST NOT manually edit `.agentplane/tasks.json`.
- MUST run `agentplane task plan approve ...` and `agentplane task start-ready ...` sequentially (never in parallel).
- MUST activate `agentplane role ORCHESTRATOR` for planning and `agentplane role <ROLE>` for the active task owner before owner-scoped execution or verification.
- MUST keep repository artifacts in English by default (unless user explicitly requests another language for a specific artifact).
- MUST NOT fabricate repository facts.
- MUST stage/commit only intentional changes for the active task scope.
- MUST stop and request re-approval when scope, risk, or verification criteria materially drift.
- MUST NOT let ORCHESTRATOR perform owner-scoped implementation or verification once a task owner is known, unless the approved plan explicitly makes ORCHESTRATOR the owner.

Role boundaries:

- ORCHESTRATOR: preflight + plan + approvals.
- PLANNER: executable task graph creation/update.
- INTEGRATOR: base integration/finish in `branch_pr`.

---

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

## SIZE BUDGET

- `AGENTS.md` MUST stay <= 250 lines.
- Every policy markdown module under `.agentplane/policy/*.md` MUST stay <= 100 lines.
- Worst-case loaded policy graph (always imports + all conditional imports) MUST stay <= 600 lines.
- Enforced by `node .agentplane/policy/check-routing.mjs`.

---

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

---

## REFERENCE EXAMPLES

- EXAMPLE `.agentplane/policy/examples/pr-note.md`
- EXAMPLE `.agentplane/policy/examples/unit-test-pattern.md`
- EXAMPLE `.agentplane/policy/examples/migration-note.md`

---

## CHANGE CONTROL

- Follow incident-log, immutability, and policy-budget rules in `.agentplane/policy/governance.md`.
- Record situational incident rules only in `.agentplane/policy/incidents.md`; do not load/read that file during normal startup unless the task directly touches it or recovery/incident handling requires it.
- Keep `AGENTS.md` as a gateway; move detailed procedures to canonical modules.
