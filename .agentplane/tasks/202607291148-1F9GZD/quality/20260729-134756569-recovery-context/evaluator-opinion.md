# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Dependency closure treats every direct dependency as a leaf and never traverses nested dependencies, so the packet can omit unfinished or unqualified terminal leaves behind an aggregate dependency.

## Evidence
- .agentplane/tasks/202607291148-1F9GZD/quality/20260729-134756569-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607291148-1F9GZD/README.md

## Missing Tests
- A nested dependency graph where the qualification task depends on an aggregate task whose terminal leaf lacks verification, evaluator pass, or hosted-close evidence; packet creation must fail or include and validate that terminal leaf.
- A nested dependency graph with complete terminal leaves; the packet must enumerate the deterministic transitive leaf set rather than only direct dependencies.

## Hidden Assumptions
- Every direct dependency of a milestone qualification task is necessarily a terminal dependency leaf.
- Qualification task graphs never contain aggregate or intermediate dependency tasks.

## Residual Risks
- Replace direct depends_on labeling with deterministic transitive dependency traversal, define cycle and missing-node handling, validate closure for terminal leaves, and add nested-graph positive and negative regressions before rerunning the focused evaluator suite and ci:contract.
