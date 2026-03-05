<!--
AGENTS_POLICY: gateway-v1.0
repo_namespace: .agentplane
default_initiator: ORCHESTRATOR
-->

# PURPOSE

`AGENTS.md` is the policy gateway for agents in this repository.
It is intentionally compact and only defines hard constraints, task-entry rules, and routing to canonical policy modules.
Detailed and situational procedures live in `.agentplane/policy/*.md`.

---

## SOURCES OF TRUTH

Priority order (highest first):

1. Enforcement: CI, tests, linters, hooks, CLI validations.
2. Policy gateway: `AGENTS.md`.
3. Canonical policy modules: `.agentplane/policy/*.md`.
4. CLI guidance: `agentplane quickstart`, `agentplane role <ROLE>`, `.agentplane/config.json`.
5. Examples: `.agentplane/policy/examples/*`.

Conflict rule:

- If a document conflicts with enforcement, enforcement wins.
- If lower-priority text conflicts with higher-priority policy, higher priority wins.

---

## SCOPE BOUNDARY

- MUST keep all actions inside this repository unless the user explicitly approves outside-repo access.
- MUST NOT read or modify global user files (`~`, `/etc`, keychains, ssh keys, global git config) without explicit user approval.
- MUST treat network access as approval-gated when `agents.approvals.require_network=true`.

---

## TOOLING

Required preflight (read-only, before planning/execution):

1. `agentplane config show`
2. `agentplane quickstart`
3. `agentplane task list`
4. `git status --short --untracked-files=no`
5. `git rev-parse --abbrev-ref HEAD`

Required policy verification command:

- `bun run policy:routing:check`

Recommended verification baselines:

- Code scope: `bun run typecheck && bun run lint:core && bun run test:fast`
- Docs/policy scope: `bun run policy:routing:check && bun run agents:check`

---

## LOAD RULES

Routing is strict. Load only files required by matching conditions.

- IF always -> LOAD `.agentplane/policy/security.must.md`
- IF always -> LOAD `.agentplane/policy/dod.core.md`
- IF `workflow_mode=direct` -> LOAD `.agentplane/policy/workflow.direct.md`
- IF `workflow_mode=branch_pr` -> LOAD `.agentplane/policy/workflow.branch_pr.md`
- IF task touches release/version/publish paths or `agentplane release ...` -> LOAD `.agentplane/policy/workflow.release.md`
- IF task modifies code paths (`packages/**`, `scripts/**`) -> LOAD `.agentplane/policy/dod.code.md`
- IF task modifies docs/policy-only paths (`docs/**`, `AGENTS.md`, `.agentplane/policy/**`) -> LOAD `.agentplane/policy/dod.docs.md`
- IF task modifies policy files (`AGENTS.md`, `.agentplane/policy/**`) -> LOAD `.agentplane/policy/governance.md`

Routing constraints:

- MUST NOT load unrelated policy files outside matched rules.
- MUST keep loaded-policy set minimal (target: 2-4 files per task).
- If routing is ambiguous, ask one clarifying question before loading extra modules.

---

## MUST / MUST NOT

- MUST start with ORCHESTRATOR preflight and plan summary.
- MUST NOT perform mutating actions before explicit user approval.
- MUST create/reuse executable task IDs for any repo-state mutation.
- MUST use `agentplane` commands for task lifecycle updates; MUST NOT manually edit `.agentplane/tasks.json`.
- MUST keep repository artifacts in English by default (unless user explicitly requests another language for a specific artifact).
- MUST NOT fabricate repository facts.
- MUST NOT expose raw chain-of-thought.
- MUST stage/commit only intentional changes for the active task scope.
- MUST stop and request re-approval when scope, risk, or verification criteria materially drift.

Role boundaries:

- ORCHESTRATOR: preflight + plan + approvals.
- PLANNER: executable task graph creation/update.
- INTEGRATOR: base integration/finish in `branch_pr` workflows.

---

## CORE DOD

A task is done only when all are true:

1. Approved scope is satisfied; no unresolved drift.
2. Required checks from loaded policy modules passed.
3. Security and approval gates were respected.
4. Traceability exists (task ID + updated task docs).
5. Verification evidence is recorded.
6. No unintended tracked changes remain.

Detailed DoD rules are in `.agentplane/policy/dod.*.md`.

---

## CANONICAL DOCS

- DOC `.agentplane/policy/workflow.md`
- DOC `.agentplane/policy/workflow.direct.md`
- DOC `.agentplane/policy/workflow.branch_pr.md`
- DOC `.agentplane/policy/workflow.release.md`
- DOC `.agentplane/policy/security.must.md`
- DOC `.agentplane/policy/dod.core.md`
- DOC `.agentplane/policy/dod.code.md`
- DOC `.agentplane/policy/dod.docs.md`
- DOC `.agentplane/policy/governance.md`

---

## REFERENCE EXAMPLES

- EXAMPLE `.agentplane/policy/examples/pr-note.md`
- EXAMPLE `.agentplane/policy/examples/unit-test-pattern.ts`
- EXAMPLE `.agentplane/policy/examples/migration-note.md`

---

## CHANGE CONTROL

- Follow stabilization and policy-budget rules in `.agentplane/policy/governance.md`.
- Keep `AGENTS.md` as a gateway; move detailed procedures to canonical modules.
