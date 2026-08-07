# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- The external-agent packet removes the compatibility field `exchange.return_invocation` instead of preserving it alongside `result_path` and `resume_argv`.
- The frozen diff does not update runtime quickstart, role guidance, or mode notes, leaving the documented external protocol on the removed compatibility field.
- The doc_version 3 task document has no `Findings` section.

## Evidence
- .agentplane/tasks/202608062021-MCY8ZC/quality/objects/sha256/17dda360dee0a66312d85c8e80851a738217c2827955cec3eebc920c62d989bd.patch
- .agentplane/tasks/202608062021-MCY8ZC/README.md
- .agentplane/policy/dod.core.md

## Missing Tests
- Add a packet compatibility test asserting that `exchange.return_invocation` remains present while `exchange.result_path` and `exchange.resume_argv` are added.
- Add a documentation contract test asserting that runtime quickstart, role guidance, and workflow-mode notes reference `result_path` and `resume_argv` consistently with the emitted packet.
- Add a task-document contract check requiring the `Findings` section for doc_version 3 tasks.

## Hidden Assumptions
- Existing consumers can migrate atomically from `return_invocation` even though the approved contract explicitly requires compatibility preservation.
- Passing generated CLI-reference checks proves runtime quickstart and role/mode guidance are current, although those surfaces are absent from the frozen diff.
- Recorded verification success is sufficient despite the loaded DoD requiring a complete doc_version 3 task document.

## Residual Risks
- Restore `exchange.return_invocation` as a compatibility field, update every runtime guidance surface to the new exact-path and structured-argv protocol, add the missing compatibility/documentation tests, and complete the task README `Findings` section before rerunning the declared checks.
