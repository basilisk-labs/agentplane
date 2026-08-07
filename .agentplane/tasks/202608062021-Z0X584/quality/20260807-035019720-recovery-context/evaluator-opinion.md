# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- The advertised first managed workflow is not executable from a newly created task: `task run` stops with `semantic_input_required`, but the workflow and generated bootstrap guidance omit the required `task advance` PLANNER exchange.
- The bundled website corpus remains internally contradictory: it states that `task run` resolves the initial planning episode even though the corrected lifecycle documentation says it returns `semantic_input_required`.

## Evidence
- .agentplane/tasks/202608062021-Z0X584/quality/objects/sha256/35ecc4bdc613572c7c9b9adbd9a7336147859cdf73510fca38d0b1c372926333.patch

## Missing Tests
- Add an end-to-end documentation contract test that starts from `task new`, asserts `task run` returns `semantic_input_required`, and verifies that every advertised first workflow includes the required PLANNER `task advance` result exchange before managed execution.
- Add a generated-corpus freshness/parity check that compares lifecycle claims in `website/static/llms-full.txt` with canonical task-lifecycle documentation and rejects the stale claim that `task run` resolves initial planning.

## Hidden Assumptions
- A reader can infer how to resolve `semantic_input_required` from the phrase “resolve that boundary,” despite the section being presented as a copy-paste managed workflow.
- Passing `docs:onboarding:check` and `docs:cli:check` proves all generated public documentation is current, although the frozen diff contains contradictory lifecycle text.

## Residual Risks
- Rewrite the first managed/bootstrap workflow to expose the mandatory external PLANNER `task advance` exchange before `task run`, regenerate `website/static/llms-full.txt`, and add parity tests that fail on the stale planning claim.
