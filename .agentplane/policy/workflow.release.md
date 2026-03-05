# Workflow: release

Use this module when task touches release/version/publish flows.

## Required sequence

1. Confirm clean tracked tree.
2. Generate release plan.
3. Author release notes with complete human-readable coverage of planned changes.
4. Run release prepublish checks.
5. Apply release and push/tag only after gates pass.
6. Record release evidence (commands, outputs, resulting version/tag).

## Constraints

- Do not skip parity/version checks.
- Do not bypass required notes validation.
