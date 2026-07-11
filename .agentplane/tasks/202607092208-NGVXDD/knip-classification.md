# Knip finding classification

This task uses `scripts/baselines/knip-baseline.json` as the itemized source of truth. Every remaining entry is assigned to exactly one class by the ordered rules below.

1. **Public contract (312 findings).** Paths ending in `index.ts`, `contract.ts`, `contracts.ts`, `types.ts`, `model.ts`, or schema modules, plus entries under `packages/core`, `packages/recipes`, and `packages/testkit`. These exports and types are retained because they define package, protocol, schema, or test-support surfaces that may be consumed outside Knip's local import graph.
2. **Dynamic entry point (168 findings).** Remaining entries under AgentPlane `cli`, `commands`, `runtime`, and `workflow-*` paths. These are retained where registry dispatch, generated command wiring, subprocess execution, or framework loading prevents static reachability from proving removal safe.
3. **Accepted debt (74 findings).** Every remaining baseline entry not matched above. These findings remain explicitly visible in the blocking baseline and are deferred because this patch lacks sufficient evidence for semver-safe removal.

Removed in this task:

- the unreferenced critical CLI runner file;
- three unreachable internal helpers;
- sixteen unnecessary exports on file-local helpers.

Baseline movement: 574 to 554 findings; unused files 1 to 0; unused exports 204 to 185; unused types unchanged at 369. No Knip ignore or configuration rule was added or widened.
