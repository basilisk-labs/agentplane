# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- The required broad agent-selected branch_pr E2E is absent. The scenario documented and verified as the broad branch_pr case declares preferred_mode as direct and only reaches branch_pr through deterministic override, so it does not prove that a compatible agent-selected branch_pr preference is respected end to end.
- The documented scenario measurements omit lifecycle-transition counts, and most routing scenarios collect lifecycle_transitions without asserting them. This leaves the required transition and ceremony comparison unproven for the five representative E2Es.

## Evidence
- .agentplane/tasks/202608112232-3NC7Y4/README.md
- .agentplane/tasks/202608112232-3NC7Y4/quality/objects/sha256/2256613fbfd6186cc65b095ffc3a94850e0db3c282c322041d42899e7a284cc0.patch
- .agentplane/tasks/202608112232-3NC7Y4/verification/20260812041025439-8bd2ab0ef09e0963.json

## Missing Tests
- Add a realistic CLI E2E whose semantic declaration explicitly uses preferred_mode: branch_pr for broad multi-component work, then assert that branch_pr is retained for agent_preference rather than selected only by an effect or repository override.
- Assert and report exact lifecycle-transition counts for each required representative scenario, including the localized direct, broad branch_pr, underestimated escalation, prohibited external/destructive, and misleading-language cases.

## Hidden Assumptions
- A deterministic direct-to-branch_pr override is assumed to be equivalent evidence for respecting an explicit agent-selected branch_pr preference.
- Collecting lifecycle event counts without asserting or reporting them is assumed to satisfy the transition-measurement requirement.
- The verification summary's claim of broad branch_pr E2E coverage is assumed accurate despite the scenario declaring preferred_mode: direct.

## Residual Risks
- Add the missing explicit branch_pr-preference E2E and make lifecycle-transition measurements asserted and visible for all required scenarios, then rerun the focused E2Es and relevant full CI.
