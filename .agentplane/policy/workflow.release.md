# Workflow: release

Use this module when task touches release/version/publish flows.

## Required sequence

1. CHECKPOINT A: confirm clean tracked tree and approved scope.
2. CHECKPOINT B: generate release plan and freeze version/tag target.
3. Generate release notes with complete human-readable coverage of all task-level changes.
4. Run release prepublish checks.
5. CHECKPOINT C: apply release and push/tag only after all gates pass.
6. Record release evidence (commands, outputs, resulting version/tag).

## Command contract

```bash
git status --short --untracked-files=no
agentplane task plan set <task-id> --text "Release plan: version=<v>, tag=<t>, scope=<...>" --updated-by <ROLE>
agentplane task plan approve <task-id> --by ORCHESTRATOR
agentplane release plan --patch
agentplane release apply --push --yes
agentplane verify <task-id> --ok|--rework --by <ROLE> --note "Release checks: ..."
agentplane finish <task-id> --author <ROLE> --body "Verified: release" --result "Release <v> published" --commit <git-rev> --close-commit
```

## Constraints

- MUST NOT perform irreversible release actions before explicit approval.
- MUST NOT skip parity/version checks.
- MUST NOT bypass required notes validation.
- MUST stop and request re-approval if release scope/tag/version changes.
