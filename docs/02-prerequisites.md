# Prerequisites

## Required

- Git (any recent version).
- Node.js 20 LTS+ and bun (recommended).
- OpenAI Codex plugin in your IDE (Cursor, VS Code, JetBrains).

## Recommended

- A terminal with `zsh` or `bash`.
- Familiarity with git status, add, and commit.

## Environment Assumptions

- The repo is local and opened in your IDE.
- There are no remote runtimes; commands run on your machine.
- Edits outside the repo require explicit approval.

## Backend Dependencies

- Local backend: no extra requirements beyond the repo.
- Redmine backend: network access and a backend plugin config with API credentials.

## Notes

- v1 is offline-first by default; network is used only by explicit commands (see `docs/cli-contract.md`).

## Planned Expansions

- Add a short checklist for Redmine API access and required custom fields.
