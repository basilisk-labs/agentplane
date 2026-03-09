export const homepageContent = {
  seo: {
    title: "Git-native control plane for auditable agent work",
    description:
      "Put coding agents on a governed Git workflow with repository-local state, explicit approvals, verification, and deterministic closure.",
  },
  hero: {
    eyebrow: "Git-native control plane",
    chips: ["Repo-native workflow", "Explicit approvals", "Verification + closure"],
    title: "Put coding agents on a governed Git workflow.",
    subtitle:
      "AgentPlane is a Git-native control plane for auditable agent work. It wraps agent execution in repository-local task state, approvals, verification, and deterministic closure.",
    supportingCopy: [
      "Use a local CLI workflow when speed matters but invisible agent state is no longer acceptable.",
      "The result is traceable work inside Git instead of another opaque assistant session.",
    ],
    actions: [
      { label: "Open overview", to: "/docs/user/overview", variant: "primary" },
      { label: "Read workflow", to: "/docs/user/workflow", variant: "secondary" },
      { label: "Browse release notes", to: "/docs/releases", variant: "secondary" },
    ],
    commandWindow: {
      title: "First controlled loop",
      lines: [
        "npm i -g agentplane",
        "agentplane init",
        'agentplane task new --title "Ship homepage" --description "Replace the placeholder site"',
        "agentplane task plan approve <task-id> --by ORCHESTRATOR",
        'agentplane task start-ready <task-id> --author CODER --body "Start: homepage rewrite"',
        'agentplane verify <task-id> --ok --by REVIEWER --note "Looks good"',
        'agentplane finish <task-id> --author CODER --body "Verified: checks passed" --result "Homepage shipped" --commit <git-rev>',
      ],
    },
    proofCards: [
      {
        label: "Local CLI",
        text: "Runs in the repository you already own. No hosted control tower required.",
      },
      {
        label: "Repo-local state",
        text: "Policies, tasks, and workflow traces live near the code they govern.",
      },
      {
        label: "Verify / finish",
        text: "Completion becomes a visible record, not a vague end to a chat session.",
      },
      {
        label: "Two workflow modes",
        text: "Start with direct. Move to branch_pr when integration discipline matters.",
      },
    ],
  },
  contrast: {
    label: "Why teams adopt it",
    title: "Fast agents are easy. Governed agent work is the harder problem.",
    text: "The failure mode is not only weak prompting. It is hidden state, implicit approval, and unclear closure inside a real repository workflow.",
    beforeTitle: "Without a control plane",
    afterTitle: "With AgentPlane",
    before: [
      "Session context lives inside a tool instead of inside the repository.",
      "Approval state and blast radius are inferred instead of stated.",
      "Tasks drift from intention to mutation without a clean proof path.",
      "Completion is fuzzy, which makes review and recovery harder.",
    ],
    after: [
      "Task state becomes repository-visible and workflow-bound.",
      "Approvals, verification, and finish semantics are explicit.",
      "Artifacts stay local to the repo through the task lifecycle.",
      "The final result is a traceable path through Git, not an opaque session ending.",
    ],
  },
  repositorySurface: {
    label: "Repository surface",
    title: "What AgentPlane adds to a real repository.",
    intro: "The product is visible in files, commands, and state transitions. That is the point.",
    tree: [
      ".",
      "├── AGENTS.md / CLAUDE.md",
      "└── .agentplane/",
      "    ├── config.json",
      "    ├── agents/",
      "    ├── policy/",
      "    ├── tasks/",
      "    └── WORKFLOW.md",
    ],
    items: [
      {
        name: "Policy gateway",
        path: "AGENTS.md / CLAUDE.md",
        text: "A compact root file tells agents which rules, workflow, and safety constraints to load.",
      },
      {
        name: "Local workspace",
        path: ".agentplane/",
        text: "Workflow state, policy files, task records, and generated traces stay in a repo-local workspace.",
      },
      {
        name: "Task lifecycle",
        path: "start -> verify -> finish",
        text: "Agent work follows explicit lifecycle operations instead of ad-hoc mutation and vague completion.",
      },
      {
        name: "Verification record",
        path: "## Verification",
        text: "Verification is recorded as part of task state rather than implied by a final assistant message.",
      },
      {
        name: "Backend paths",
        path: "local / remote sync",
        text: "Optional backend integration exists without making the repository depend on a hosted runtime.",
      },
    ],
  },
  controlModel: {
    label: "Control model",
    title: "Make state, proof, and closure explicit.",
    text: "AgentPlane does not try to look magical. It makes the engineering loop legible.",
    steps: [
      {
        name: "Constrain",
        text: "Load the policy gateway, repository rules, workflow mode, and approval boundaries before mutation starts.",
      },
      {
        name: "Start",
        text: "Move a task into active work using an explicit lifecycle command instead of implicit session drift.",
      },
      {
        name: "Execute",
        text: "Make repository changes inside the selected workflow mode with visible task ownership and scope.",
      },
      {
        name: "Verify",
        text: "Record verification outcome deliberately so review state is visible and reusable.",
      },
      {
        name: "Finish",
        text: "Close with a deterministic result path that leaves the repository in a more legible state.",
      },
    ],
  },
  workflowModes: {
    label: "Workflow modes",
    title: "Choose integration discipline, not feature gating.",
    items: [
      {
        name: "direct",
        badge: "Fast local loop",
        text: "Single-checkout workflow for shorter loops and quicker policy-aware iteration.",
        bullets: [
          "Good for solo or short-turn work",
          "Runs in one checkout",
          "Finish creates a deterministic close commit by default",
        ],
      },
      {
        name: "branch_pr",
        badge: "Structured team flow",
        text: "Worktree and PR-oriented workflow for cleaner integration and multi-role handoff.",
        bullets: [
          "One task per branch / worktree",
          "PR artifacts stay under .agentplane/tasks/<task-id>/pr/",
          "Integrate with a stricter merge path",
        ],
      },
    ],
  },
  docsRail: {
    label: "Docs rail",
    title: "Canonical entry points into the product surface.",
    groups: [
      {
        name: "Getting started",
        links: [
          { label: "Overview", to: "/docs/user/overview" },
          { label: "Prerequisites", to: "/docs/user/prerequisites" },
          { label: "Setup", to: "/docs/user/setup" },
        ],
      },
      {
        name: "Workflow model",
        links: [
          { label: "Workflow", to: "/docs/user/workflow" },
          { label: "Task lifecycle", to: "/docs/user/task-lifecycle" },
          { label: "Agents", to: "/docs/user/agents" },
        ],
      },
      {
        name: "Reference",
        links: [
          { label: "Commands", to: "/docs/user/commands" },
          { label: "Configuration", to: "/docs/user/configuration" },
          { label: "Generated reference", to: "/docs/reference/generated-reference" },
        ],
      },
      {
        name: "Developer track",
        links: [
          { label: "Architecture", to: "/docs/developer/architecture" },
          { label: "CLI contract", to: "/docs/developer/cli-contract" },
          { label: "Release and publishing", to: "/docs/developer/release-and-publishing" },
        ],
      },
      {
        name: "Support",
        links: [
          { label: "Troubleshooting", to: "/docs/help/troubleshooting-by-symptom" },
          { label: "Glossary", to: "/docs/help/glossary" },
        ],
      },
    ],
  },
  journal: {
    label: "Journal surface",
    title: "Follow product thinking and shipped changes separately.",
    items: [
      {
        name: "Blog",
        to: "/blog",
        text: "Use the blog for context, release rationale, and product analysis.",
      },
      {
        name: "Release notes",
        to: "/docs/releases",
        text: "Use release notes as the formal source-of-truth record for shipped versions.",
      },
    ],
  },
  closing: {
    label: "Next step",
    title: "Start in the docs. Then read the workflow model in full.",
    text: "The homepage should orient quickly. The product contract lives in the docs, lifecycle, command surface, and release record.",
    actions: [
      { label: "Open overview", to: "/docs/user/overview", variant: "primary" },
      { label: "Read workflow model", to: "/docs/user/workflow", variant: "secondary" },
      { label: "Open commands", to: "/docs/user/commands", variant: "secondary" },
    ],
  },
} as const;
