---
title: AgentPlane Roadmap
description: Public product roadmap for AgentPlane CLI and the local-first agentic development workspace.
lastUpdated: 2026-05-11
---

# AgentPlane Roadmap

AgentPlane is evolving into a local-first, git-native operating layer for agentic software work. It is not meant to replace coding agents, IDEs, CI systems, or pull request review. Its role is to give agents and humans a shared execution environment: tasks, policies, context, provenance, evidence, and repeatable workflows that remain inspectable inside the repository.

This roadmap describes the product direction for AgentPlane CLI and the local AgentPlane workspace. It is a directional planning document, not a release commitment or implementation checklist. The sequence of epics reflects product dependencies: AgentPlane first establishes reviewable task flow, then adds reusable extensions, typed execution paths, durable local context, controlled autonomous execution, and finally evaluation loops.

## North Star

Every agent-driven change in a repository should be explainable, reproducible, and reviewable from Git.

A user should be able to understand what the agent was asked to do, which plan constrained the work, which route was selected, what context was available, which checks confirmed the result, and why the change is ready for review, blocked, or rejected.

## Product Principles

- **Git-native by default.** Workflow state, tasks, policies, context, and evidence should live in the repository whenever they are safe to commit.
- **Local-first core.** The main workflow should work locally without depending on an external platform.
- **Evidence over transcript trust.** Reviewers should inspect structured artifacts instead of relying on chat history.
- **Policy gates before mutations.** Agentic work should pass through explicit intent, plan approval, scope constraints, and expected checks.
- **Extensible, not template-bound.** Recipes, blueprints, and context profiles extend the core without reducing AgentPlane to a template catalog.
- **Human-readable and machine-precise.** Important artifacts should be understandable by humans and formal enough for automation.

## Roadmap Horizons

| Horizon   | Meaning                                                                             |
| --------- | ----------------------------------------------------------------------------------- |
| **Now**   | Foundational capabilities that define the local AgentPlane workflow.                |
| **Next**  | Capability layers that make work more reusable, typed, and context-aware.           |
| **Later** | Higher-autonomy and quality-feedback layers that depend on the earlier foundations. |

## Roadmap at a Glance

| Epic                  | Horizon | Theme       | User outcome                 |
| --------------------- | ------- | ----------- | ---------------------------- |
| **0.1 Workflow**      | Now     | Foundation  | baseline task lifecycle      |
| **0.2 Configuration** | Now     | Contracts   | consistent project setup     |
| **0.3 Tasks**         | Now     | Control     | git-native task governance   |
| **0.4 Recipes**       | Next    | Extension   | reusable workflow kits       |
| **0.5 Blueprints**    | Next    | Routing     | typed execution paths        |
| **0.6 Context**       | Next    | Memory      | local knowledge layer        |
| **0.7 Runner**        | Later   | Execution   | controlled autonomous runs   |
| **0.8 Evaluations**   | Later   | Improvement | evidence-based quality loops |

## Epics

### 0.1 **Foundation:** baseline task lifecycle.

This epic establishes the initial AgentPlane workflow: a local project structure, a task lifecycle, and the basic conventions for planning, approval, implementation, verification, and completion. The goal is to make agentic work explicit rather than implicit, so every meaningful change has a traceable path from intent to outcome.

By the end of this epic, users will be able to run AgentPlane as a lightweight local workflow layer around their existing development process. They will be able to create structured tasks, move them through a predictable lifecycle, and preserve the evidence needed to understand what happened and why.

### 0.2 **Contracts:** consistent project setup.

This epic formalizes the configuration model that allows AgentPlane projects to remain predictable across repositories, teams, and agent setups. It defines the core project contracts: how AgentPlane stores local state, how project rules are represented, and how the CLI interprets task, policy, and workflow configuration.

By the end of this epic, users will be able to initialize and maintain AgentPlane projects with consistent local configuration. Teams will have a clearer foundation for shared conventions, repeatable setup, and stable behavior across different environments.

### 0.3 **Control:** git-native task governance.

This epic turns tasks into the primary repo-local control plane for agentic work. Tasks become more than issue-like records: they carry plans, approvals, evidence, verification notes, exported snapshots, and lifecycle state. The emphasis is on git-native governance, where task history and implementation history can be inspected together.

By the end of this epic, users will be able to manage agentic work through structured local tasks that are auditable, reviewable, and compatible with normal repository workflows. They will be able to see what an agent intended to do, what it changed, what evidence it produced, and whether the work passed the required checks.

### 0.4 **Recipes:** reusable workflow kits.

This epic introduces recipes as reusable workflow extensions. A recipe packages domain-specific instructions, agents, skills, conventions, and setup patterns into a versioned unit that can be reused across projects. Recipes make AgentPlane extensible without turning every project into a hand-written prompt system.

By the end of this epic, users will be able to apply reusable workflow kits for common project types, domains, or team conventions. They will be able to extend AgentPlane with curated patterns while keeping those extensions visible, versioned, and compatible with local project rules.

### 0.5 **Blueprints:** typed execution paths.

This epic adds blueprints as the routing layer for agentic work. A blueprint describes the intended execution path for a task: what kind of work it is, what evidence is expected, what constraints apply, and how the agent should approach the task before modifying the repository. Blueprints make task execution less ad hoc and more legible.

By the end of this epic, users will be able to classify work into typed execution paths such as implementation, documentation, analysis, release, or synchronization flows. Agents will be able to explain why a task follows a specific path, and users will be able to review that path before meaningful repository changes happen.

### 0.6 **Context:** local knowledge layer.

This epic introduces the local context layer as a core part of AgentPlane rather than as a recipe or optional template. Context is treated as a foundational substrate for agentic workflows: project knowledge, research, facts, decisions, entities, capability cards, reports, and policies should live in a local-first structure that is readable by humans and usable by agents.

By the end of this epic, users will be able to maintain a git-native knowledge layer inside their project. Human-readable context will be versioned in the repository, while machine-derived indexes, embeddings, caches, and local databases remain reproducible implementation details. This gives agents durable memory without making the project dependent on opaque external state.

### 0.7 **Runner:** controlled autonomous runs.

This epic builds the AgentPlane Runner on top of tasks, policies, context, recipes, and blueprints. The runner is not a separate orchestration model; it is the execution layer that performs agentic work through already-resolved task routes, explicit stop rules, evidence requirements, and repository-local policy gates.

By the end of this epic, users will be able to run more autonomous workflows while preserving control over what the agent is allowed to do. The runner will coordinate execution, collect evidence, respect task boundaries, and stop when policy, uncertainty, or verification requirements demand human review.

### 0.8 **Evaluations:** evidence-based quality loops.

This epic introduces evaluations as the feedback layer for AgentPlane. Evaluations measure whether agents, recipes, prompts, blueprints, runner behavior, and lifecycle flows are improving or regressing. The goal is to make quality changes testable rather than subjective.

By the end of this epic, users will be able to compare baseline and candidate behavior using repeatable scenarios, structured evidence, and quality gates. Teams will be able to improve recipes, prompts, and execution policies through controlled evaluation loops instead of relying on anecdotal agent performance.

## Non-goals

AgentPlane is not a replacement for Git, CI, pull request review, or existing coding agents. It is not a hosted project-management system, a prompt-only framework, or an opaque autonomous runtime. AgentPlane’s product identity is the local-first evidence layer that makes agentic development auditable, reproducible, and governable from the repository.

## Maintenance Note

This roadmap should be reviewed as AgentPlane evolves. Items may be reordered, renamed, merged, or split when product learning shows a clearer path. The stable commitment is the direction: local-first agentic workflows with explicit tasks, durable context, policy gates, evidence, and reviewable execution.
