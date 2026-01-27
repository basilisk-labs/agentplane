# feature-spec-to-tasks

This recipe turns a top-level task into a detailed implementation roadmap and task draft.
It writes the roadmap to `docs/roadmaps` and stores run artifacts under `.agent-plane/.runs`.

## Outputs
- `docs/roadmaps/<roadmap_slug>.roadmap.md`
- `.agent-plane/.runs/<run_id>/artifacts/<roadmap_slug>.plan.json`
- `.agent-plane/.runs/<run_id>/artifacts/<roadmap_slug>.tasks.draft.md`
- (refactor-existing only) `.agent-plane/.runs/<run_id>/artifacts/<roadmap_slug>.migration.md`

## Runner (local)
```bash
export RECIPE_INPUTS_PATH=.agent-plane/.runs/<run-id>/inputs.json
export RECIPE_SCENARIO_ID=from-text
export RECIPE_RUN_ID=run-001
node .agent-plane/recipes/feature-spec-to-tasks/tools/run-feature.js
```

Notes:
- The runner is deterministic and does not call the network.
- It overwrites roadmap outputs for the same slug/run id.
