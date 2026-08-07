<!-- ap:fragment id="policy.workflow.release.workflow.workflow.release" slot="workflow" mutability="replaceable" -->

# Workflow: release

Use this module when task touches release/version/publish flows.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.workflow.release.workflow.required.sequence" slot="workflow" mutability="replaceable" -->

## Required sequence

1. Request the current bounded release action with `agentplane task advance <task-id> --agent-json`,
   or use `agentplane task run <task-id>` with a configured managed runner.
2. Perform only the supplied semantic release objective, such as release-note drafting, defect
   repair, or analysis of observed check output.
3. Return the typed result and request a fresh packet.
4. Return control at version/tag approval, publish authority, hosted checks, external provider, or
   terminal boundaries.

AgentPlane and the human operator own version freeze, release planning, prepublish gates,
publication, hosted verification, and final release evidence.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.workflow.release.commands.command.contract" slot="commands" mutability="replaceable" -->

## Command contract

```bash
agentplane task advance <task-id> --agent-json
agentplane task advance <task-id> --result <exact-result-path> --agent-json
agentplane task run <task-id>
```

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.workflow.release.hard_constraint.constraints" slot="hard_constraint" mutability="append_only" -->

## Constraints

- MUST NOT perform irreversible release actions before explicit approval.
- MUST NOT invoke release plan/apply/candidate, publish, Git tag, push, merge, verify, finish, or
  hosted-provider commands during a normal semantic episode.
- MUST NOT infer a version, tag, publish authority, or hosted success from prose or agent output.
- MUST return control when required evidence or authority is absent.
- MUST stop and request re-approval if release scope/tag/version changes.
<!-- /ap:fragment -->
