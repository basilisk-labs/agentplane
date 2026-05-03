# AgentPlane Editorial Guide

This file is the short messaging contract for AgentPlane public surfaces. Stable decisions and
refactor rationale live in [docs/adr/README.md](docs/adr/README.md).

## Canonical Message

Category line:

**AgentPlane is a Git-native control plane for auditable agent work.**

Plain-language line:

**Put coding agents on a governed Git workflow.**

Default explainer:

**AgentPlane adds task state, approvals, verification, and deterministic closure to agent work inside
real Git repositories.**

Every AgentPlane task can produce an Agent Change Record (ACR): a deterministic, machine-readable
summary of intent, plan, verification, and closure.

Use **AgentPlane** for the product and `agentplane` for CLI commands, package names, and paths.

## Audience Lanes

Individual engineers care about scoped work, clear verification, repo-visible state, and cleaner
closure.

Team leads care about consistent workflows, explicit approvals, predictable task execution, and
reviewable conventions.

Platform, security, and developer productivity teams care about audit trails, policy boundaries,
and compatibility with Git and CI.

## Tone

Write with precision, calm, and proof. Confidence should come from shipped behavior, commands,
artifacts, and explicit boundaries.

Avoid:

- hype,
- “AI magic” framing,
- futurist language,
- unsupported certainty,
- swagger,
- filler openings.

Do not position AgentPlane as a generic AI coding assistant, hosted autonomous coding platform,
company OS, prompt framework, or Git replacement.

## Messaging Order

Use this order across README, website, docs, demos, and release notes:

1. Job: what the product does.
2. Surface: where it operates.
3. Control boundary: what makes it governed.
4. Proof: command, artifact, file path, workflow line, or policy.
5. Next action: what the reader should do.

Do not lead with internal taxonomy, role theater, or architecture doctrine.

## Vocabulary

Prefer:

- repository,
- repo-native,
- task,
- verification,
- approval,
- closure,
- workflow,
- artifact,
- audit trail,
- governed,
- scoped,
- traceable.
- Agent Change Record (ACR): the named, machine-readable evidence projection of a task.
- `acr`: CLI namespace for generating, validating, checking, explaining, and printing ACRs.

Use carefully after context is established:

- harness engineering,
- workflow contract,
- projection,
- policy tree,
- deterministic recovery.

## Editorial QA

Before publishing, confirm:

- the first paragraph states operational value,
- headings are concrete,
- claims map to shipped behavior,
- limits and boundaries are explicit,
- links route to setup, workflow, docs, release notes, or command reference,
- naming is consistent: AgentPlane / `agentplane`.
