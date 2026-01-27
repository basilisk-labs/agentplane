# Contributing to Agent Plane

Thank you for your interest in contributing to **Agent Plane**.
This document describes how we work on the project and how to propose changes.

---

## 0. TL;DR

- Small fixes (typos, docs, obvious bugs):
  → open a pull request from a feature branch, reference an issue if there is one.

- Any **global / architectural / behavioral change**:
  → **must start as an Issue**, be discussed and approved by maintainers,
  → only then implemented in a pull request.

## 0.1 Code of Conduct

All contributors are expected to follow `CODE_OF_CONDUCT.md`.

---

## 1. Governance

- The project is maintained by the **Agent Plane maintainers team**.
- Maintainers are responsible for:
  - reviewing and merging pull requests,
  - curating the roadmap and long-term architecture,
  - making final decisions in case of disagreement.

We aim for open discussion first, but maintainers have the final say to keep the
project coherent.

---

## 2. What counts as a “global change”

You **must open an Issue first** (design / proposal) for any change that:

- modifies the core agent orchestration or task model,
- changes public APIs, CLIs or configuration formats,
- impacts persistence (database schema, storage layout, on-disk formats),
- changes default behavior that existing users may rely on,
- introduces or replaces major dependencies or subsystems.

These Issues should:

1. Describe the problem and motivation.
2. Outline the proposed design (high-level, not full spec).
3. Discuss alternatives or trade-offs.
4. Include migration / backwards-compatibility notes if relevant.

Once maintainers agree on the direction, the Issue will be marked as **“approved for implementation”** and you (or someone else) can start a pull request.

---

## 3. Development workflow

1. **Fork the repository** (or create a feature branch if you have write access).
2. **Create a branch** from `main`:

```bash
git checkout -b feature/short-description
```

Implement your change, keeping commits logically separate and with clear
messages.

Run the tests / linters relevant for your change.
Check the project README for the current commands; if in doubt, at least run
whatever is available for local validation.

Update documentation if your change affects behavior, configuration or
public APIs.

Open a Pull Request:

- target branch: main,
- link the corresponding Issue (Closes #NNN),
- briefly describe what changed and why,
- mention any breaking changes or migration steps.

Address review comments from maintainers. When the PR is approved and CI is
green, a maintainer will merge it.

Direct commits to main are reserved for maintainers and automated tooling.

## 4. Coding style

Follow the existing style in the files you modify.

Prefer clear, explicit code over clever one-liners.

Keep functions and modules focused; avoid mixing unrelated changes in one PR.

Add or update tests alongside new behavior whenever possible.

If you are unsure about style or structure, ask in the Issue before investing a
lot of time.

## 5. Documentation contributions

Improving documentation is highly appreciated:

- Fixing typos or unclear wording.
- Adding examples or usage notes.
- Clarifying configuration and deployment instructions.

Documentation changes also go through pull requests and should keep the
structure and tone of existing docs.

## 6. License and copyright

By contributing to Agent Plane, you agree that:

- Your contributions are licensed under the same license as the project
  (currently MIT), and

- You have the right to provide the contribution under this license.

The project’s copyright notice must be preserved as described in LICENSE.
If you add files that originate from third-party sources, clearly mark their
license and provenance.

## 7. Project workflow notes (when applicable)

Some changes (especially documentation and workflow automation) are managed inside the repo via the framework itself:

- The task export is the canonical backlog for local tooling and must be updated only via `python .agent-plane/agentctl.py` (manual edits break the checksum).
- Per-task documentation artifacts live under `.agent-plane/tasks/`.
- When a contribution touches task tooling or task data, maintainers may ask you to:
  - run `python .agent-plane/agentctl.py task lint`
  - keep commits scoped and traceable (task IDs + short messages)
