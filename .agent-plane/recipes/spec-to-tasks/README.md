# spec-to-tasks

This recipe turns a written specification into a task batch and a plan JSON.
It does not modify tasks directly; it emits a draft file for agentctl transfer.

## Outputs
- `.agent-plane/.runs/<run_id>/artifacts/<spec_slug>.plan.json`
- `.agent-plane/.runs/<run_id>/artifacts/<spec_slug>.tasks.draft.md`

## Runner
```bash
export RECIPE_INPUTS_PATH=.agent-plane/.runs/<run-id>/inputs.json
export RECIPE_SCENARIO_ID=from-spec
export RECIPE_RUN_ID=run-001
node .agent-plane/recipes/spec-to-tasks/tools/run-spec.js
```
