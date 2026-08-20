<p align="center">
  <img src="docs/assets/readme-headers/agentplane.svg" alt="Agentplane latest release header" style="width:100%;max-width:100%;"/>
</p>

# AgentPlane

**The Git-native control plane for coding agents.**

Let agents write code. Keep authority and proof in Git.

AgentPlane keeps work that needs judgment with the coding agent and moves repeatable workflow
mechanics into a deterministic CLI. Agents interpret intent, design changes, write code, and resolve
ambiguity. AgentPlane bounds their authority, advances lifecycle state, routes Git and pull-request
work, observes checks, and records how work closes or recovers.

[![npm](https://img.shields.io/npm/v/agentplane.svg)](https://www.npmjs.com/package/agentplane)
[![Core CI](https://github.com/basilisk-labs/agentplane/actions/workflows/ci.yml/badge.svg)](https://github.com/basilisk-labs/agentplane/actions/workflows/ci.yml)
[![SLSA v1 provenance](https://img.shields.io/badge/SLSA-v1-success)](https://registry.npmjs.org/-/npm/v1/attestations/agentplane@latest)
[![Node.js 24+](https://img.shields.io/badge/Node.js-24%2B-3c873a.svg)](docs/user/prerequisites.mdx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## One job for each actor

| Actor              | Owns                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| **Human**          | Sets the outcome, approves material risk, and reviews the observed result.                       |
| **Coding agent**   | Understands the problem, plans, implements, tests, and makes semantic judgments.                 |
| **AgentPlane CLI** | Enforces policy and authority; owns task state, Git/PR routing, evidence, recovery, and closure. |

Anything repeatable enough to formalize belongs in the CLI. This keeps process choreography out of
the model's context and gives different agents the same repository contract.

- **More focused agents:** model context goes to the problem instead of reconstructing workflow
  state and remembering lifecycle commands.
- **Deterministic mechanics:** authority, transitions, routing, schemas, and stop conditions are
  resolved by code rather than model guesses.
- **Verifiable outcomes:** reviewers see supervisor-observed repository facts and check results,
  not only an agent's claim that the work succeeded.

AgentPlane does not make an LLM deterministic. It makes the control plane around the LLM
deterministic and inspectable.

## Quick start

Requirements: Node.js 24+, Git, and a local terminal.

```bash
npm install -g agentplane
mkdir my-agent-project
cd my-agent-project
agentplane init
agentplane quickstart
```

For an existing repository, run `agentplane init` from its root. Initialization creates a
repository policy gateway and a local workflow contract; it does not require an AgentPlane account.
The `ap` command is the short alias for agent-facing CLI calls.

## Run a first task

```bash
agentplane task create "Inspect Agentplane artifacts and summarize what was created"
agentplane task active
agentplane task advance <task-id> --agent-json
```

`task create` prints the task ID. `task advance` returns one bounded semantic episode for Codex,
Claude Code, Cursor, Aider, or another repository-capable agent. The packet contains the objective,
writable scope, relevant context, result schema, and the exact command for returning the result.

When the action is `agent_episode`, give it to the agent. The agent performs only that semantic
objective and returns the typed result. Run the exact next command emitted by AgentPlane after each
state change. AgentPlane performs the formal transitions and stops at approval, human, hosted,
recovery, or terminal boundaries.

After the initial plan exists and is approved, a configured managed runner can execute eligible
semantic episodes through the same control plane:

```bash
agentplane task run <task-id>
```

Read the [task lifecycle](docs/user/task-lifecycle.mdx) for the complete external-agent and managed-
runner contracts.

## How the control loop works

```text
human intent
    -> CLI issues a bounded semantic episode
        -> agent reasons, edits, tests, and returns a semantic result
            -> CLI observes facts, runs the formal route, and records evidence
                -> approval, recovery, or verified completion
```

The separation is enforced, not advisory:

- A semantic episode cannot perform or claim formal lifecycle transitions.
- Writable roots and allowed effects are carried in the WorkOrder for that episode.
- State fingerprints reject stale results instead of applying them to newer task state.
- Approval and external-effect boundaries return control to the human or configured operator.
- Verification evidence is derived from declared effects and supervisor-observed results.

The agent is responsible for meaning. The CLI is mechanically authoritative and semantically
blind: it can prove which files changed and which checks passed, but it does not decide whether the
implementation is a good solution to the user's problem.

## Workflow modes

| Mode        | What AgentPlane manages                                                                    | Use it for                                                 |
| ----------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `direct`    | A lighter local route with bounded writes, formal verification, and recorded closure.      | Reversible solo work and short feedback loops.             |
| `branch_pr` | A task worktree and branch, PR artifacts, hosted checks, integration handoff, and closure. | Team review, branch protection, and consequential changes. |

The agent declares scope, expected effects, uncertainty, and a preferred mode during planning.
AgentPlane combines that declaration with repository policy. It can strengthen the route when
observed work requires more isolation or evidence; it does not ask the agent to choreograph Git
branches, worktrees, publication, or integration manually.

## Inspectable repository state

AgentPlane keeps the operating record beside the code:

```text
AGENTS.md or CLAUDE.md                 repository policy gateway
.agentplane/WORKFLOW.md                workflow and configuration contract
.agentplane/tasks/<task-id>/README.md  intent, plan, verification, rollback, findings
.agentplane/tasks/<task-id>/acr.json   machine-readable Agent Change Record
.agentplane/tasks/<task-id>/pr/        branch_pr review artifacts when applicable
```

Git remains the durable review surface. An [Agent Change Record](docs/reference/acr.mdx) captures
task intent, execution state, changed files, verification evidence, and review status in a
machine-readable form. Optional [Local Context](docs/user/local-context.mdx) adds source-backed
repository knowledge without changing the task lifecycle.

## Trust boundary

AgentPlane distinguishes semantic reports from observable facts:

- Agents return plans, implementation summaries, findings, uncertainty, and semantic evaluations.
- The supervisor observes repository changes, Git state, executed checks, and available provider
  telemetry.
- Evidence records visible inputs, outputs, semantic results, and observable counters; it does not
  require or claim access to private chain-of-thought.
- Missing telemetry is recorded as partial or unavailable instead of being replaced with a zero or
  a guessed value.
- Humans retain decisions that change approved scope, accept material risk, or cross an external
  authority boundary.

## When AgentPlane is useful

- A coding-agent change must remain reviewable after the chat or IDE session disappears.
- Multiple coding agents need one task, policy, verification, and recovery contract.
- Maintainers need agent-generated pull requests to carry intent, scope, checks, and evidence.
- Platform or security teams need local, policy-aware, CI-gateable agent work.

AgentPlane is not a model provider, prompt playground, low-code chatbot builder, replacement for
Git or CI, or a black-box agent runtime. It controls the engineering workflow around coding agents;
it does not replace the agents that perform the work.

## Documentation

| Need                           | Read                                                                                                |
| ------------------------------ | --------------------------------------------------------------------------------------------------- |
| Install and configure          | [Setup](docs/user/setup.mdx)                                                                        |
| Connect a coding agent         | [Use with coding agents](docs/workflow-guides/index.mdx)                                            |
| Understand the control loop    | [Task lifecycle](docs/user/task-lifecycle.mdx)                                                      |
| Choose `direct` or `branch_pr` | [Workflow](docs/user/workflow.mdx)                                                                  |
| Look up commands and flags     | [CLI reference](docs/user/cli-reference.generated.mdx)                                              |
| Inspect the evidence format    | [Agent Change Records](docs/reference/acr.mdx)                                                      |
| Maintain repository knowledge  | [Local Context](docs/user/local-context.mdx)                                                        |
| Understand internals           | [Architecture](docs/developer/architecture.mdx) and [CLI contract](docs/developer/cli-contract.mdx) |

## Project status and support

AgentPlane is pre-1.0 and under active development. Pin the CLI version in automation and review
the [release notes](docs/releases/README.md) when upgrading.

Ask usage questions or report unexpected behavior in
[GitHub Discussions](https://github.com/basilisk-labs/agentplane/discussions). Report security
issues according to [SECURITY.md](SECURITY.md).

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) and the
[Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE)
