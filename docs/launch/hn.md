# Hacker News Launch Draft

## Title

Launch HN: AgentPlane - audit records for coding agents

## URL

https://github.com/basilisk-labs/agentplane

## Primary Comment

AgentPlane is an open-source audit layer for coding agents. It records the task, approved plan,
verification evidence, finish state, and an Agent Change Record (ACR) in the Git repository where
the change happens.

The problem we are trying to make concrete: a coding agent can edit dozens of files before a human
reviewer sees anything durable. Chat history is not a review artifact, and a diff alone does not
explain intent, approval, or verification.

The current release focuses on ACRs:

- `agentplane acr generate` writes a portable JSON record for a task.
- `agentplane acr validate` checks the record against the schema.
- `agentplane acr check` turns the record into a merge gate.

Short demo GIF: https://raw.githubusercontent.com/basilisk-labs/agentplane/main/docs/assets/agentplane-demo.gif

This is meant to wrap Claude Code, Codex, Cursor, Aider, and similar tools rather than replace
them. The output is reviewable in Git and parseable by CI.

Useful links:

- Repo: https://github.com/basilisk-labs/agentplane
- ACR docs: https://agentplane.org/docs/user/agent-change-record
- Schema: https://agentplane.org/schemas/acr-v0.1.schema.json

## Pre-Post Checks

- GitHub repo About metadata confirmed.
- GitHub social preview confirmed.
- Latest npm package version confirmed.
- README header and demo GIF render on GitHub.
- First comment links return 200.
