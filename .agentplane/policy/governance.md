# Policy Governance

## Incident source of truth

- `.agentplane/policy/incidents.md` is the single incident registry.
- Incident-derived and situational rules MUST be added only to `incidents.md`.
- MUST NOT create additional incident policy files under `.agentplane/policy/`.
- New reusable operational incidents SHOULD be promoted from task `Findings` via `agentplane finish` or `agentplane incidents collect <task-id>`.
- Auto-promotion is reserved for explicit `incident-candidate` blocks marked `IncidentExternal: true`; repository-fixable defects stay task-local unless curated manually.
- Normal startup MUST NOT bulk-load `incidents.md`; targeted lookup for analogous work is allowed through `task start-ready` and `agentplane incidents advise`.

## Stabilization criteria

Use `stabilized` only when one of these is true:

1. The same failure class recurs at least 2 times in 30 days.
2. A single Sev-1 / production-blocking failure has reproducible steps and evidence.

Promotion from `incidents.md` into canonical policy modules is allowed only when:

1. The incident is `stabilized`.
2. Enforcement is defined (`CI`, `test`, `lint`, or policy check script).
3. Policy gateway load rules are updated if routing behavior changes.

## Canonical module immutability

- Canonical modules are immutable by default during feature delivery tasks.
- Canonical modules MAY be changed only in a dedicated policy task with explicit user approval.
- Every canonical policy edit MUST include `node .agentplane/policy/check-routing.mjs` in verification evidence.

## Policy budget

- The policy gateway file (`AGENTS.md` or `CLAUDE.md`) MUST remain compact (target <= 250 lines).
- Detailed procedures MUST be placed in canonical modules listed in the gateway file.
- If a policy change needs >20 new lines in the gateway file, move detail to a module and keep only routing + hard gate in gateway.

## Rule quality

- MUST rules should be enforceable by tooling where possible.
- Non-enforceable guidance should be marked as SHOULD and kept out of hard-gate sections.
