# Policy Governance

## Incident source of truth

- `.agentplane/policy/incidents.md` is the active incident registry for unresolved incidents that still need operator attention or follow-up engineering work.
- `docs/developer/incident-archive.mdx` is the historical archive for stabilized or externally mitigated incidents that no longer belong in the active registry.
- Incident-derived and situational rules MUST be added to `incidents.md` first while the incident remains active; once it is no longer active, move the entry to the archive instead of keeping it in the active file.
- MUST NOT create additional incident policy files under `.agentplane/policy/`.
- New reusable operational incidents SHOULD be promoted from task `Findings` via `agentplane finish` or `agentplane incidents collect <task-id>`.
- Auto-promotion is reserved for resolved reusable findings marked `Fixability: external` or `Fixability: repo-fixable` (or the compatibility markers `IncidentExternal: true` / `IncidentInternal: true`); optional `IncidentScope`, `IncidentAdvice`, `IncidentRule`, `IncidentTags`, and `IncidentMatch` fields override the inferred registry entry when needed.
- Normal startup MUST NOT bulk-load `incidents.md`; targeted lookup for analogous work is allowed through `task start-ready` and `agentplane incidents advise`.
- Closed incidents MAY be removed from `.agentplane/policy/incidents.md`, but only after their final state and evidence have been preserved in `docs/developer/incident-archive.mdx`.

## Stabilization criteria

Use `stabilized` only when the same failure class recurs at least 2 times in 30 days.

First auto-promoted external incidents may stay `open`, but targeted advice lookup is still allowed to use them so analogous work can reuse the recovery guidance before the second recurrence.

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
