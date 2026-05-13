# Contributing to AgentPlane

This document describes how to propose and land changes in the repository.
The workflow in this project is task-driven and repo-native: use `agentplane`
from `PATH`, keep work traceable to a task ID, and treat the repository
workflow as the source of truth.

## 1. Start with the right path

Use the current repository workflow, not an ad hoc script or a hand-edited
task file.

Typical start sequence:

```bash
agentplane config show
agentplane quickstart
agentplane task list
agentplane role ORCHESTRATOR
```

If you are working inside this repository, activate the role that owns the
next step before owner-scoped execution:

```bash
agentplane role DOCS
agentplane role CODER
agentplane role REVIEWER
```

## 2. When to open an issue first

Open an issue before implementation for changes that are architectural,
behavioral, or broadly visible to users.

That includes changes that:

- alter task lifecycle behavior or workflow contracts;
- change the CLI surface, configuration format, or persistence layout;
- modify default behavior that existing users rely on;
- introduce major dependencies or subsystems.

Small fixes, typo corrections, and documentation adjustments can move
directly through the normal task flow when the scope is already clear.

## 3. Work in a task, not in isolation

For repository work, use the task lifecycle instead of editing first and
describing the change later.

```bash
agentplane task new --title "..." --description "..." --priority med --owner DOCS --tag docs
agentplane task plan set <task-id> --text "..." --updated-by ORCHESTRATOR
agentplane task plan approve <task-id> --by ORCHESTRATOR
agentplane task start-ready <task-id> --author DOCS --body "Start: ..."
agentplane task verify-show <task-id>
agentplane verify <task-id> --ok --by REVIEWER --note "Looks good"
agentplane finish <task-id> --author DOCS --body "Verified: ..." --result "One-line outcome" --commit <git-rev>
```

Notes:

- `agentplane task plan approve` is only needed when the current repository
  config requires it.
- `agentplane finish` records the verified closeout and, in `direct` mode,
  creates the deterministic close commit by default.
- Task README files under `.agentplane/tasks/<task-id>/README.md` are the
  canonical local task artifacts; the derived sqlite cache is rebuildable.

## 4. Keep docs and CLI references current

When a change affects user-facing behavior, update the matching docs in the
same task.

- Root policy and contributor guidance live in `AGENTS.md` and this file.
- Public docs live under `docs/`; the site shell lives under `website/`.
- Shared module ownership and dependency direction are documented in
  `docs/developer/module-topology.mdx`.
- Generated command references should be refreshed through the documented
  generation flow rather than edited manually.

If you touch docs/policy-only paths, run the lightweight policy checks before
closing the task:

```bash
node .agentplane/policy/check-routing.mjs
agentplane doctor
```

## 5. Development expectations

- Keep changes scoped to one task whenever possible.
- Use clear commit messages and keep unrelated edits out of the same task.
- Add or update tests when behavior changes.
- Follow the style already used in the files you modify.

For docs changes, keep the wording aligned with the shipped CLI and the
current repository workflow. For task tooling changes, prefer the `agentplane`
CLI from `PATH` over direct `node packages/...` entrypoints.

## 6. Documentation contributions

Documentation improvements are welcome when they reflect confirmed behavior.

- Fix unclear wording, stale commands, and incorrect paths.
- Update onboarding docs together when the workflow changes.
- Keep root docs, `docs/`, and generated surfaces consistent with one another.

## 7. License and provenance

By contributing to AgentPlane, you agree that your contributions are licensed
under the project license and that you have the right to contribute them.

If you add third-party material, preserve its license and provenance in the
affected files.
