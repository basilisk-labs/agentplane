# Agentplane architecture roadmap — revision 2

Read `agentplane-0.7.9-0.7.14-roadmap-r2.md` for the complete replacement document. For one delegated work item, read `AGENT-START.md` and `tasks/<ID>.md`, then the relevant contract sections in `EXECUTION-CHARTER.md`; prerequisites refer to accepted existing Task/verification evidence, not another runtime database.

Reviewed main: `50b1810dda648be0c0762b47e885c6ad0b2d42af`; package `0.7.9-beta.1`. This bundle contains documents, not an implemented release. No Agentplane tests, paid provider campaigns, migrations or GitHub writes were executed to produce it.

| Release | Atomic tasks | Goal                                                                             |
| ------- | -----------: | -------------------------------------------------------------------------------- |
| 0.7.9   |           21 | Stabilize the existing product and make cost observable                          |
| 0.7.10  |           31 | Remove Blueprint, preserving current lifecycle obligations                       |
| 0.7.11  |           24 | Keep Task Kernel as the sole domain owner and remove superseded execution paths  |
| 0.7.12  |           12 | Avoid a separate PLANNER episode when an accepted contract is already sufficient |
| 0.7.13  |           18 | Formalize reusable recipes as Scenario V2 compiled to the Kernel-owned Plan      |
| 0.7.14  |           26 | Qualify optional JEV decision routing and narrow EVALUATOR omission              |

Total: **132** atomic task cards. All **37** original roadmap groups are mapped. A task is an independent change/acceptance unit, not a mandatory separate PR or paid model episode.

Files:

- `AGENT-START.md`: compact starting context for a delegated agent; do not reload the full catalogue per episode.
- `EXECUTION-CHARTER.md`: scope, target ownership, invariants, compatibility, agent protocol and measurement gates.
- `releases/`: the same cards split by release.
- `tasks/`: standalone work-item packets with source references.
- `tasks.json`: machine-readable planning catalogue; not a proposed product state store.
- `coverage-and-gap-audit.md` / `coverage-map.json`: old-to-new and gap mapping.
- `source-evidence.json`: exact source references and head lock.
- `experiment-requirements.json`: experiment definitions; not authority to spend.
- `dependency-graph.json` / `validation-report.json`: validated document graph.
- `validate_roadmap.py`: offline standard-library consistency checker.

Run document validation with `python3 validate_roadmap.py` from this directory. Product test commands in cards run only in an actual checkout with its pinned Node/Bun and dependencies. New test targets and the paired driver are explicitly proposed, not existing commands until their implementing task is complete.
