# Node.js CLI parity matrix vs Python agentctl

Date: 2026-01-30

Status legend: FULL = implemented with matching intent, PARTIAL = implemented but behavior/flags differ, MISSING = no equivalent, NODE-ONLY = Node feature not in Python.

## agentctl top-level commands

| Python agentctl | Node.js CLI                                   | Status  | Notes                                                                                                        |
| --------------- | --------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| quickstart      | `agentplane quickstart`                       | FULL    | Node prints a built-in quickstart guide (no `agentctl.md` dependency).                                       |
| role            | `agentplane role <role>`                      | FULL    | Implemented via the built-in command guide (no `agentctl.md` dependency).                                    |
| agents          | `agentplane agents`                           | FULL    | Lists `.agent-plane/agents/*.json`.                                                                          |
| config          | `agentplane config show/set`                  | FULL    | Same intent; Node uses JSON config keys.                                                                     |
| ready           | `agentplane ready <task-id>`                  | FULL    | Matches readiness check.                                                                                     |
| verify          | `agentplane verify <task-id>`                 | FULL    | Supports `--skip-if-unchanged`, `--log`, `--cwd`.                                                            |
| upgrade         | `agentplane upgrade ...`                      | PARTIAL | Node supports `--tag`, `--source`, `--bundle`, `--checksum`, `--dry-run`; Python has a simpler upgrade flow. |
| work            | `agentplane work start ...`                   | FULL    | Branch/worktree scaffold.                                                                                    |
| cleanup         | `agentplane cleanup merged ...`               | FULL    | Removes merged task branches/worktrees.                                                                      |
| branch          | `agentplane branch create/status/remove`      | FULL    | Matches Python command set.                                                                                  |
| pr              | `agentplane pr open/update/check/note`        | FULL    | Matches PR artifact workflow.                                                                                |
| integrate       | `agentplane integrate ...`                    | FULL    | Merge strategies + verify support.                                                                           |
| hooks           | `agentplane hooks install/uninstall`          | PARTIAL | Python has internal `hooks run` (suppressed); Node doesn’t expose it.                                        |
| guard           | `agentplane guard clean/suggest-allow/commit` | FULL    | Feature parity plus additional flags (quiet/auto-allow).                                                     |
| commit          | `agentplane commit`                           | FULL    | Guarded commit wrapper.                                                                                      |
| start           | `agentplane start`                            | FULL    | Structured comment + optional commit-from-comment.                                                           |
| block           | `agentplane block`                            | FULL    | Structured comment + optional commit-from-comment.                                                           |
| task            | `agentplane task ...`                         | FULL    | Node exposes full task subcommand set.                                                                       |
| finish          | `agentplane finish`                           | FULL    | Status/commit metadata, commit-from-comment.                                                                 |
| sync            | `agentplane backend sync` + `agentplane sync` | FULL    | Node has backend sync + alias.                                                                               |

## agentctl task subcommands

| Python task subcommand | Node.js CLI                    | Status | Notes                                  |
| ---------------------- | ------------------------------ | ------ | -------------------------------------- |
| lint                   | `agentplane task lint`         | FULL   | Schema/dep/metadata checks.            |
| new                    | `agentplane task new`          | FULL   | Auto ID generation.                    |
| add                    | `agentplane task add`          | FULL   | Explicit ID add supported.             |
| update                 | `agentplane task update`       | FULL   | Partial update supported.              |
| scrub                  | `agentplane task scrub`        | FULL   | Find/replace with dry-run.             |
| list                   | `agentplane task list`         | FULL   | Listing supported.                     |
| next                   | `agentplane task next`         | FULL   | Ready-to-start listing supported.      |
| show                   | `agentplane task show`         | FULL   | Task lookup supported.                 |
| doc                    | `agentplane task doc show/set` | FULL   | Doc metadata read/write.               |
| search                 | `agentplane task search`       | FULL   | Text search supported.                 |
| scaffold               | `agentplane task scaffold`     | FULL   | README skeleton creation supported.    |
| export                 | `agentplane task export`       | FULL   | Export snapshot JSON supported.        |
| normalize              | `agentplane task normalize`    | FULL   | Normalize READMEs supported.           |
| migrate                | `agentplane task migrate`      | FULL   | Migrate snapshot to backend supported. |
| comment                | `agentplane task comment`      | FULL   | Comment append supported.              |
| set-status             | `agentplane task set-status`   | FULL   | Status change with readiness checks.   |

## Other framework scripts

| Python/script             | Node.js equivalent       | Status  | Notes                                                                                                                                                                                                |
| ------------------------- | ------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.agent-plane/recipes.py` | `agentplane recipes` CLI | PARTIAL | Node CLI supports centralized recipes (`recipes.json`, list/list --full/--tag, list-remote, install/remove, explain); bundle/compile remain Python-only but the registry file is updated on install. |
| `scripts/ci-scope.mjs`    | (none)                   | MISSING | CI scoping script is standalone (not intended for CLI parity).                                                                                                                                       |

## Node-only functionality (no Python agentctl analog)

- `agentplane init` (interactive project bootstrap)
- `agentplane mode get/set`
- `agentplane ide sync`
- `agentplane recipes list/list-remote/install/remove/info`
- `agentplane scenario list/info/run`
