# Semantic quality review: rework

Provenance: evaluator_supplied

P1: a real source-code repair was classified as analysis.light with mutation scope none, so the required code, security, and DoD gates were bypassed.

## Findings
- P1: PR #4619 changes packages/agentplane/src/context/knowledge-ref.ts, but the current resolved snapshot selects analysis.light, declares mutation none and touchedPaths [], and loads no policy modules. Retag the task as code and regenerate the snapshot before any verification or quality pass can be accepted.

## Evidence
- .agentplane/tasks/202607251433-75Q4J6/README.md
- .agentplane/tasks/202607251433-75Q4J6/blueprint/resolved-snapshot.json: resolverInput mutation=none, touchedPaths=[], selectedBlueprint=analysis.light, policyModules=[]
- packages/agentplane/src/context/knowledge-ref.ts: canonical guard import replaces local isRecord implementation
- GitHub PR #4619 at published head 1a41d3bd7d0f7c1bec4422d1ec88b90842bf5c11: source diff includes KnowledgeRef code change

## Missing Tests
- none recorded

## Hidden Assumptions
- The analysis-light snapshot was treated as a valid basis for code verification despite a changed implementation file.

## Residual Risks
- A pass based on the misclassified snapshot would certify code without its mandatory security, branch_pr, and code DoD contract.
