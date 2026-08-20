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
- Normal agent route: select ready work with `ap task active`, then request one bounded action with `ap task advance <task-id> --agent-json`. Execute only an emitted semantic episode, stay inside its authority, write the typed result to `exchange.result_path`, and resume with the exact `exchange.resume_argv`. `exchange.return_invocation` is compatibility-only. A configured managed runner uses `ap task run <task-id>`. `task brief`, `task status --route`, and `task next-action --explain` are operator/recovery diagnostics, not the normal agent protocol.

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

### External agent protocol

```bash
ap task active
ap task advance <task-id> --agent-json
ap task advance <task-id> --result <exact-result-path> --agent-json
```

When `action.kind=agent_episode`, perform only the supplied semantic objective. Do not infer or run
formal lifecycle transitions. After writing the result to `exchange.result_path`, use the exact
`exchange.resume_argv` and request a fresh packet after every state change.

### Managed runner

```bash
ap task run <task-id>
```

### Operator and recovery diagnostics

```bash
ap task brief <task-id>
ap task status <task-id> --route
ap task next-action <task-id> --explain
ap doctor
```

Use diagnostics or low-level lifecycle commands only when the user is acting as operator, or when
AgentPlane returns an explicit recovery/manual-compatibility route. They MUST NOT be invoked during
a normal semantic episode.

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.agents.body.tooling" slot="body" mutability="replaceable" -->

## TOOLING

- Use `## COMMANDS` as the canonical agent protocol.
- Use `ap quickstart` for human/operator orientation. Normal semantic work starts from a fresh `task advance --agent-json` packet or a managed `task run`.
- For policy changes, routing validation MUST pass via `node .agentplane/policy/check-routing.mjs`.

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.agents.body.shared.prompt.contract" slot="body" mutability="replaceable" -->

## SHARED PROMPT CONTRACT

- Outcome contract: state the goal, success criteria, important constraints, required evidence, output, and stop rules; prescribe procedure only for command contracts, state machines, or irreversible gates.
- Autonomy rule: inspection and analysis stay read-only; after plan approval, complete safe in-scope local edits and validation without extra pauses; require re-approval for external writes, destructive actions, or material scope expansion.
- Ambiguity rule: ask one narrow question only when missing information changes scope, security, task graph, or an irreversible action; otherwise act under explicit assumptions.
- Tool rule: load only matched policy, task README, Verify Steps, and relevant files; parallelize independent reads, keep dependent actions sequential, and try a bounded fallback when required evidence is empty or suspiciously narrow.
- Route/persistence rule: for multi-step or tool-heavy work, request a fresh `ap task advance <task-id> --agent-json` packet, perform only the emitted semantic objective, return the typed result, and repeat until the CLI returns an approval, human, external, or terminal boundary.
- Response rule: lead with the outcome; preserve required facts, evidence, caveats, blockers, and next actions; remove repetition and optional background before removing decision-critical content.
- Keep role prompts limited to role-specific behavior; they MUST NOT repeat this shared contract or full gateway command procedures.

### Agent instruction language

Write framework-owned agent-to-agent instructions in simple technical English.

- Write one action, condition, or constraint in each sentence.
- Name the actor if the actor is not clear.
- Put a condition before the action that depends on it.
- Use one term for one concept.
- Do not use idioms, metaphors, or vague references.
- Preserve commands, paths, identifiers, enum values, quoted text, user input, logs, and source evidence exactly.

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

- MUST start normal task work from a fresh supervisor packet or managed `task run` invocation.
- MUST NOT perform mutating actions before explicit user approval.
- MUST create/reuse executable task IDs for any repo-state mutation.
- MUST use `ap`/`agentplane` commands for task lifecycle updates; MUST NOT manually edit `.agentplane/tasks.json`.
- MUST perform only the semantic objective and mutation authority supplied by the current packet.
- MUST return typed semantic output to the supplied result path and request a fresh packet after state changes.
- MUST NOT invoke work start, start-ready, verify, finish, integrate, cleanup, Git branch/worktree, commit, or PR lifecycle commands during a normal semantic episode.
- MUST NOT satisfy or simulate an approval boundary; return control to the human/operator.
- MUST keep repository artifacts in English by default (unless user explicitly requests another language for a specific artifact).
- MUST NOT fabricate repository facts.
- MUST stop and request re-approval when scope, risk, or verification criteria materially drift.
- MUST treat user-authenticated external actions as user-attributed and execute them only from an explicit operator action with matching authority.

Role boundaries: PLANNER, EXECUTOR, and EVALUATOR perform their bounded semantic episodes; AgentPlane owns formal transitions, repository routing, verification persistence, integration, and closure.

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.agents.body.core.dod" slot="body" mutability="replaceable" -->

## CORE DOD

A task is done only when approved scope, loaded DoD modules, security gates, task traceability, recorded verification, and clean final tracked state all pass. Detailed DoD rules live in `.agentplane/policy/dod.core.md`, `.agentplane/policy/dod.code.md`, and `.agentplane/policy/dod.docs.md`.

<!-- /ap:fragment -->
<!-- ap:fragment id="gateway.agents.hard_constraint.size.budget" slot="hard_constraint" mutability="append_only" -->

## SIZE BUDGET

- `AGENTS.md` MUST stay <= 250 lines.
- Every policy markdown module under `.agentplane/policy/*.md` MUST stay <= 100 lines.
- Worst-case loaded policy graph (always imports + all conditional imports) MUST stay <= 600 lines.
- Enforced by `node .agentplane/policy/check-routing.mjs`.

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
- Record situational incident rules only in `.agentplane/policy/incidents.md`; use CLI-owned targeted lookup/promotion instead of bulk-loading it during normal semantic episodes.
- Keep `AGENTS.md` as a gateway; move detailed procedures to canonical modules.
<!-- /ap:fragment -->
