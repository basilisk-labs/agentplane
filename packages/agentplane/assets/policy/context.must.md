<!-- ap:fragment id="policy.context.must.body.context.must" slot="body" mutability="replaceable" -->

# Context MUST Rules

Use this module when a task reads, writes, learns, curates, verifies, or relies on AgentPlane local context.

Local context means `context/wiki/**`, `context/facts/**`, `context/graph/**`, `context/capabilities/**`, `context/raw/**`, and `.agentplane/context/**`.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.context.must.hard_constraint.source.first" slot="hard_constraint" mutability="append_only" -->

## Source-first contract

- MUST search existing context before creating new wiki pages, facts, graph entities, capabilities, or aliases.
- MUST prefer updating an existing canonical page/entity over creating duplicates.
- MUST keep raw source material, synthesized wiki prose, structured facts/graph rows, and capability notes distinct.
- MUST mark facts, decisions, risks, workflows, and definitions with source refs or an explicit no-source reason.
- MUST preserve conflicts and open questions instead of flattening contradictory sources into one unsourced claim.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.context.must.commands.command.contract" slot="commands" mutability="replaceable" -->

## Command contract

```bash
ap context search "<query>"
ap context show <ref>
ap context learn changes
ap context learn files <path> [--run]
ap context wiki lint <path>
ap context wiki explain <path>
ap context wiki link <path>
ap context wiki index context/wiki
ap context check
ap context doctor
ap context verify-task <task-id>
```

- Use `search` for discovery and `show` for exact source readback.
- Use `learn` to create context assimilation tasks instead of ad hoc memory writes.
- Use wiki lint/explain/link/index when adding or changing wiki pages.
- Run `verify-task` before closing tasks that create or rely on context artifacts.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.context.must.hard_constraint.write.boundaries" slot="hard_constraint" mutability="append_only" -->

## Write boundaries

- MUST NOT manually edit `.agentplane/context/derived/**`; rebuild projections through context commands.
- MUST NOT write secrets or non-publishable source spans into public wiki pages, task summaries, ACRs, reports, or incident advice.
- MUST preserve the user-created hierarchy under `context/raw/**` when citing raw sources.
- MUST NOT create glossary-only truth; glossary entries are aliases/navigation over wiki pages and graph entities.
- SHOULD use proposal-before-promotion for harvested or inferred context when provenance, staleness, or conflicts are not clean.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.context.must.check.dod" slot="check" mutability="append_only" -->

## Context DoD

Context work is done only when:

1. Existing context was searched or a concrete skip reason was recorded.
2. New or changed factual claims have source refs or explicit no-source reasons.
3. Wiki links/indexes were refreshed when pages were added, moved, or materially renamed.
4. Derived projection checks were run or skipped with reason and risk.
5. `ap context verify-task <task-id>` passed for task-bound context work.
<!-- /ap:fragment -->
