# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The change updates the generated CLI reference but does not update any onboarding document, despite onboarding documentation being an explicit acceptance requirement.

## Evidence
- .agentplane/tasks/202608061646-30TKV4/README.md
- .agentplane/tasks/202608061646-30TKV4/quality/objects/sha256/f03764541cec0c8b9bd0a51b34d58117711a052ef4284deec69d525a1b5ecf96.patch
- .agentplane/tasks/202608061646-30TKV4/verification/20260807005409275-8701b3f2f8e9fcc4.json

## Missing Tests
- Add an onboarding-content assertion that requires the user-first `task create` entrypoint and dry-run execution-preview workflow to appear in the intended onboarding document, rather than checking only existing onboarding consistency surfaces.
- Add intent-inference cases for negated and ambiguous keywords to document the conservative substring-matching behavior.

## Hidden Assumptions
- Passing `docs:onboarding:check` is treated as proof that onboarding documentation was updated, although the frozen diff contains no onboarding-document change.
- Ordered substring matching is assumed to classify natural-language intent safely even when keywords are negated or appear only as incidental context.

## Residual Risks
- Update the intended onboarding documentation with the new user-first task creation and execution-preview flow, add a content-level regression assertion, then rerun all seven declared verification steps at the new evaluated SHA.
