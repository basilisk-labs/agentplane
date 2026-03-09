export const homepageContent = {
  seo: {
    title: "Git-native control plane for auditable agent work",
    description:
      "Put coding agents on a governed Git workflow with repo-local task state, approvals, verification, and deterministic closure.",
  },
  hero: {
    eyebrow: "Git-native control plane",
    chips: [
      "Local CLI",
      "Repo-native workflow",
      "Explicit approvals",
      "Verification record",
      "Direct + PR modes",
    ],
    title: "Put coding agents on a governed Git workflow.",
    subtitle:
      "AgentPlane is a local CLI workflow that adds task state, approvals, verification, and deterministic closure to agent work inside real Git repositories.",
    supportBullets: [
      "Runs inside the repository you already own instead of a hosted control surface.",
      "Turns vague agent sessions into visible workflow state, proof, and closure.",
    ],
    actions: [
      { label: "Open overview", to: "/docs/user/overview", variant: "primary" },
      { label: "Read workflow", to: "/docs/user/workflow", variant: "secondary" },
      { label: "Browse release notes", to: "/docs/releases", variant: "secondary" },
    ],
    terminalPanel: {
      title: "First controlled loop",
      lines: [
        "npm i -g agentplane",
        "agentplane init",
        "agentplane preflight",
        'agentplane task start-ready <task-id> --author CODER --body "Start: homepage rewrite"',
        "agentplane task verify-show <task-id>",
        'agentplane verify <task-id> --ok --by REVIEWER --note "Looks good"',
        'agentplane finish <task-id> --author CODER --body "Verified: checks passed" --result "Homepage shipped" --commit <git-rev>',
      ],
    },
    repositoryPanel: {
      title: "Repository surface",
      lines: ["AGENTS.md", ".agentplane/", ".agentplane/tasks/", ".agentplane/WORKFLOW.md"],
      text: "Visible files and workflow state replace hidden assistant context.",
    },
    trustPanel: {
      title: "Trust model",
      items: ["approval gates", "verify step", "deterministic finish", "recovery path"],
      text: "Git stays visible. AgentPlane governs the workflow around it.",
    },
  },
  problem: {
    label: "Problem framing",
    title: "Fast agents are easy. Governed agent work is the harder problem.",
    text: "The failure mode is not only weak prompting. It is hidden state, implicit approval, unclear verification, and messy closure inside a real repository workflow.",
    beforeTitle: "Without visible process",
    afterTitle: "With AgentPlane",
    before: [
      "Scope drifts from intent to mutation without a clean task boundary.",
      "Approvals live in chat context instead of a repository-visible workflow.",
      "Verification is implied instead of recorded.",
      "Completion is fuzzy, which makes review and recovery harder.",
    ],
    after: [
      "Task state becomes visible and bounded inside the repository.",
      "Start, verification, and finish are explicit lifecycle operations.",
      "Artifacts stay local to the repo through the task path.",
      "The final result is a traceable Git outcome instead of an opaque session ending.",
    ],
  },
  repositorySurface: {
    label: "Repository surface",
    title: "What appears in the repository after AgentPlane starts governing work.",
    intro: "The product is visible in files, commands, and state transitions. That is the point.",
    items: [
      {
        name: "Policy gateway",
        kicker: "AGENTS.md / CLAUDE.md",
        text: "A compact root file tells agents which rules, workflow, and safety boundaries to load.",
        artifact: ["Load policy", "Choose route", "Gate mutation"],
      },
      {
        name: "Repo-local workspace",
        kicker: ".agentplane/",
        text: "Config, policy files, workflow state, and recovery surfaces stay in a repo-local workspace.",
        artifact: ["config.json", "policy/", "agents/", "workflows/"],
      },
      {
        name: "Task records",
        kicker: ".agentplane/tasks/",
        text: "Per-task state, verify evidence, PR artifacts, and closure history stay near the code they justify.",
        artifact: ["README.md", "verification", "pr/", "comments"],
      },
      {
        name: "Workflow contract",
        kicker: ".agentplane/WORKFLOW.md",
        text: "The workflow model is explicit, reviewable, and regenerated when the framework updates.",
        artifact: ["direct", "branch_pr", "gates", "recovery"],
      },
      {
        name: "Lifecycle path",
        kicker: "start-ready → verify-show → verify → finish",
        text: "Work moves through visible transitions instead of ad-hoc mutation and vague completion.",
        artifact: ["start-ready", "verify-show", "verify", "finish"],
      },
    ],
  },
  workflowPath: {
    label: "Workflow path",
    title: "A normal direct loop from intent to verified change.",
    text: "The default story is the direct workflow: short local loops with explicit state and a deterministic finish path.",
    steps: [
      {
        name: "Preflight",
        text: "Read config, current task state, and repo status before mutation begins.",
        artifact: "agentplane preflight",
      },
      {
        name: "Plan",
        text: "Set the intended scope and make the approval path explicit before work starts.",
        artifact: "task new → plan set → plan approve",
      },
      {
        name: "Start",
        text: "Move the task into active work with a visible author, comment, and bounded scope.",
        artifact: "agentplane task start-ready",
      },
      {
        name: "Change",
        text: "Make repository changes inside the chosen workflow instead of improvising inside a session.",
        artifact: "repo mutation under task state",
      },
      {
        name: "Verify",
        text: "Record the verification outcome deliberately so review state is reusable and auditable.",
        artifact: "verify-show → verify",
      },
      {
        name: "Finish",
        text: "Close with a deterministic result path that leaves the repo in a more legible state.",
        artifact: "agentplane finish",
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
        text: "Single-checkout workflow for shorter policy-aware iteration and quick repository feedback.",
        bullets: [
          "Runs in one checkout",
          "Best for short local loops",
          "Finish creates the deterministic close commit by default",
        ],
      },
      {
        name: "branch_pr",
        badge: "Structured integration path",
        text: "Worktree and PR-oriented workflow for cleaner handoff, review, and multi-role integration.",
        bullets: [
          "One task per branch or worktree",
          "PR artifacts live under .agentplane/tasks/<task-id>/pr/",
          "Integrates through a stricter merge path",
        ],
      },
    ],
  },
  controlModel: {
    label: "Control model",
    title: "Trust comes from explicit mechanisms, not from bigger claims.",
    text: "AgentPlane makes state, approval, verification, and recovery visible instead of treating them as chat-side assumptions.",
    proofPoints: [
      "Explicit approvals can gate work before repository mutation begins.",
      "Verification is recorded instead of inferred from a final assistant message.",
      "State transitions remain visible and bounded through the task lifecycle.",
      "Recovery paths exist when workflow state drifts or artifacts go stale.",
      "Git remains visible; AgentPlane governs the workflow around it rather than replacing it.",
    ],
    tabs: [
      {
        id: "approvals",
        label: "Approvals",
        kicker: "Gate the start",
        title: "Put approval state in the workflow, not in invisible session memory.",
        text: "Plan approval, workflow mode, and bounded starts turn intention into a checkable control surface.",
        artifact: ["plan approve", "start-ready", "approval required", "scoped blast radius"],
      },
      {
        id: "verification",
        label: "Verification",
        kicker: "Record proof",
        title: "Make review and verification reusable.",
        text: "The workflow records verification state as an explicit artifact instead of leaving it implied in chat history.",
        artifact: ["verify-show", "verify --ok|--rework", "## Verification", "review note"],
      },
      {
        id: "recovery",
        label: "Recovery",
        kicker: "Repair drift",
        title: "When state drifts, the system should tell you how to recover.",
        text: "Doctor, export, upgrade, and workflow artifacts are designed to restore legible state without guesswork.",
        artifact: ["doctor", "task export", "upgrade", "WORKFLOW.md"],
      },
    ],
  },
  harness: {
    label: "Harness engineering",
    title: "Constrain. Execute. Observe. Recover. Integrate.",
    text: "Harness engineering is the internal doctrine beneath the product surface. It belongs below the fold because the product value should already be clear before the deeper model appears.",
    steps: ["Constrain", "Execute", "Observe", "Recover", "Integrate"],
  },
  docsRail: {
    label: "Docs rail",
    title: "Canonical routes into the product surface.",
    groups: [
      {
        name: "Getting Started",
        links: [
          { label: "Overview", to: "/docs/user/overview" },
          { label: "Prerequisites", to: "/docs/user/prerequisites" },
          { label: "Setup", to: "/docs/user/setup" },
        ],
      },
      {
        name: "Work on a Task",
        links: [
          { label: "Workflow", to: "/docs/user/workflow" },
          { label: "Task lifecycle", to: "/docs/user/task-lifecycle" },
          { label: "Branching & PR artifacts", to: "/docs/user/branching-and-pr-artifacts" },
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
        name: "Upgrade & Recover",
        links: [
          { label: "Setup", to: "/docs/user/setup" },
          { label: "Troubleshooting", to: "/docs/help/troubleshooting-by-symptom" },
          { label: "Legacy upgrade recovery", to: "/docs/help/legacy-upgrade-recovery" },
        ],
      },
      {
        name: "Developer Track",
        links: [
          { label: "Architecture", to: "/docs/developer/architecture" },
          { label: "CLI contract", to: "/docs/developer/cli-contract" },
          { label: "Release and publishing", to: "/docs/developer/release-and-publishing" },
        ],
      },
    ],
  },
  journal: {
    label: "Release and journal",
    title: "Follow shipped behavior and product thinking separately.",
    items: [
      {
        name: "Release notes",
        to: "/docs/releases",
        text: "Use the release notes as the formal source-of-truth record for what shipped.",
      },
      {
        name: "Blog / journal",
        to: "/blog",
        text: "Use the blog for release rationale, implementation notes, and product analysis.",
      },
    ],
  },
  closing: {
    label: "Next step",
    title: "Start with the overview, then follow the workflow model.",
    text: "The homepage should orient quickly. The product contract lives in the docs, workflow, command surface, and release history.",
    actions: [
      { label: "Open overview", to: "/docs/user/overview", variant: "primary" },
      { label: "Read workflow", to: "/docs/user/workflow", variant: "secondary" },
      { label: "See setup", to: "/docs/user/setup", variant: "secondary" },
    ],
  },
} as const;
