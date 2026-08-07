<!-- ap:fragment id="policy.workflow.branch_pr.workflow.workflow.branch_pr" slot="workflow" mutability="replaceable" -->

# Workflow: branch_pr

Use this module when `workflow_mode=branch_pr`.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.workflow.branch_pr.workflow.required.sequence" slot="workflow" mutability="replaceable" -->

## Required sequence

1. Select ready work with `agentplane task active`.
2. Request one bounded action with `agentplane task advance <task-id> --agent-json`.
3. Let AgentPlane perform eligible deterministic branch, worktree, task-state, PR-artifact,
   verification-persistence, integration, hosted-close, and cleanup transitions.
4. If `action.kind=agent_episode`, perform only the supplied semantic objective in the authoritative
   task checkout and writable roots named by the packet.
5. Write the typed result to `exchange.result_path` and resume with the exact
   `exchange.resume_argv`; `exchange.return_invocation` is compatibility-only.
6. Repeat with a fresh packet until AgentPlane returns an approval, human, hosted/external, or
   terminal boundary.
7. For a configured managed runner, use `agentplane task run <task-id>` instead of the external
   exchange loop.

The caller does not create branch names, switch cwd, publish PRs, persist verification, integrate,
or clean worktrees during a normal semantic episode.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.workflow.branch_pr.commands.command.contract" slot="commands" mutability="replaceable" -->

## Command contract

```bash
agentplane task advance <task-id> --agent-json
agentplane task advance <task-id> --result <exact-result-path> --agent-json
agentplane task run <task-id>
```

Low-level branch and PR commands are operator/recovery interfaces. Use them only when AgentPlane
returns an explicit manual-compatibility route; never derive their arguments from prose.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.workflow.branch_pr.hard_constraint.constraints" slot="hard_constraint" mutability="append_only" -->

## Constraints

- MUST NOT perform mutating actions before explicit user approval.
- MUST stay inside the semantic objective, authoritative checkout, writable roots, network policy,
  and stop rules in the current packet.
- MUST NOT invoke work start, start-ready, PR lifecycle, verify, finish, integrate, cleanup, Git
  branch/worktree, commit, merge, rebase, or provider CLI commands during a normal semantic episode.
- MUST NOT edit AgentPlane-owned PR, quality, integration, hosted-close, or cleanup artifacts.
- MUST NOT treat agent-reported checks or provider state as persisted verification or merge truth.
- MUST return control at approval, human, hosted/external, or effect-in-doubt boundaries.
- MUST stop and request re-approval on material drift.
<!-- /ap:fragment -->
