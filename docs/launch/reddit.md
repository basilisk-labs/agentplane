# Reddit Launch Draft

## Suggested Subreddits

- r/programming
- r/selfhosted
- r/opensource
- r/devops
- r/LocalLLaMA, only if framed around agent workflow evidence rather than model claims

## Title Options

- Agentplane: Git-native evidence records for AI-agent changes
- I built a Git-visible evidence layer for Claude Code, Codex, Cursor, and Aider workflows
- Agent Change Records for coding agents: task, plan, verification, finish, in Git

## Post Body

Agentplane is Git-native infrastructure for traceable AI work.

It does not try to be another agent or IDE. It records the workflow around agent-written changes:

- the task the agent was asked to do
- the plan that was accepted
- the verification evidence
- the finish result
- an Agent Change Record (ACR) that CI and reviewers can inspect

The reason for building it is simple: a PR diff is not enough evidence for agentic work. A coding
agent can touch many files, and the useful review context often stays in chat history instead of the
repository.

The current release adds the public ACR surface:

```bash
agentplane acr generate <task-id> --work-commit HEAD --write
agentplane acr validate <task-id> --mode local
agentplane acr check <task-id> --mode ci
```

Short demo GIF:

https://raw.githubusercontent.com/basilisk-labs/agentplane/main/docs/assets/agentplane-demo.gif

Repo:

https://github.com/basilisk-labs/agentplane

Docs:

https://agentplane.org/docs/user/agent-change-record

I am looking for feedback from people who already review agent-written PRs: what evidence would make
you more comfortable merging those changes?

## Moderation Notes

- Avoid claims about replacing developers, editors, or coding agents.
- Lead with ACR evidence and reviewability.
- Do not mention Discord until the server and invite are live.
