<!-- ap:fragment id="policy.workflow.direct.workflow.workflow.direct" slot="workflow" mutability="replaceable" -->

# Workflow: direct

Use this module when `workflow_mode=direct`.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.workflow.direct.workflow.required.sequence" slot="workflow" mutability="replaceable" -->

## Required sequence

1. Select ready work with `agentplane task active`.
2. Request one bounded action with `agentplane task advance <task-id> --agent-json`.
3. If `action.kind=agent_episode`, perform only the supplied semantic objective in the supplied
   checkout and authority boundary.
4. Write the typed result to `exchange.result_path` and resume with the exact
   `exchange.resume_argv`; `exchange.return_invocation` is compatibility-only.
5. Repeat with a fresh packet until AgentPlane returns an approval, human, external, or terminal
   boundary.
6. For a configured managed runner, use `agentplane task run <task-id>` instead of the external
   exchange loop.

AgentPlane owns plan persistence, start state, verification persistence, commits, and closure. The
semantic agent does not reconstruct or execute those transitions.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.workflow.direct.commands.command.contract" slot="commands" mutability="replaceable" -->

## Command contract

```bash
agentplane task advance <task-id> --agent-json
agentplane task advance <task-id> --result <exact-result-path> --agent-json
agentplane task run <task-id>
```

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.workflow.direct.workflow.error.recovery" slot="workflow" mutability="replaceable" -->

## ERROR RECOVERY

If any step fails:

1. Stop mutation immediately.
2. Return the observed failure through the semantic result schema without claiming a formal task
   transition.
3. Request a fresh packet.
4. Return control at approval, human, external, or effect-in-doubt boundaries.
5. Use low-level lifecycle or incident commands only when AgentPlane emits an explicit operator or
   recovery route.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.workflow.direct.hard_constraint.constraints" slot="hard_constraint" mutability="append_only" -->

## Constraints

- MUST NOT perform mutating actions before explicit user approval.
- MUST stay inside the semantic objective, writable roots, network policy, and stop rules in the
  current packet.
- MUST NOT invoke start-ready, verify, finish, Git commit, or task-state commands during a normal
  semantic episode.
- MUST NOT treat agent-reported checks as persisted verification or terminal evidence.
- MUST stop and request re-approval on material drift.
- Do not use worktrees in direct mode.
- Do not perform `branch_pr`-only operations.
<!-- /ap:fragment -->
