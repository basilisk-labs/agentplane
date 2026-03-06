export const homepageContent = {
  hero: {
    kicker: "WF-01",
    chips: ["Policy-first execution", "Approval and planning gates", "Repository-local traces"],
    title: "Agents you can actually trust in a repository.",
    subtitle:
      "AgentPlane turns agent execution into an engineering process with policy gates, approvals, role boundaries, and auditable task artifacts.",
    notes: [
      "This is not a hosted agent platform. It is a repository-native workflow layer.",
      "The product promise is control, traceability, and legible execution under real git constraints.",
    ],
    actions: [
      { label: "Start with docs", to: "/docs/user/overview", variant: "primary" },
      { label: "Read the blog", to: "/blog", variant: "secondary" },
      { label: "Browse release notes", to: "/docs/releases", variant: "secondary" },
    ],
  },
  whyItExists: {
    label: "Why it exists",
    title: "The failure mode is implicit process, not only weak prompting.",
    items: [
      "Unpredictable file mutation is a systems problem before it is a prompt problem.",
      "Teams need bounded execution with visible approvals and verification, not only helpful output.",
      "AgentPlane makes agent behavior inspectable and reproducible inside the repository itself.",
    ],
  },
  operatingLoop: {
    label: "Harness engeneering",
    title: "Constrain, execute, observe, recover, integrate.",
    steps: [
      {
        name: "Constrain",
        text: "Policy, role boundaries, and approvals define the allowed path before mutation starts.",
      },
      {
        name: "Execute",
        text: "Agents operate inside an explicit repository workflow instead of improvising scope.",
      },
      {
        name: "Observe",
        text: "Task records, verification notes, and generated artifacts preserve operational state.",
      },
      {
        name: "Recover",
        text: "Checks, retries, and rollback discipline reduce silent drift when something fails.",
      },
      {
        name: "Integrate",
        text: "The final state is a traceable commit path rather than an opaque assistant session.",
      },
    ],
  },
  repositorySurface: {
    label: "Repository surface",
    title: "What the workflow adds to a real repository.",
    items: [
      { name: "AGENTS.md", text: "Policy gateway that tells agents what rules to load and when." },
      {
        name: ".agentplane/",
        text: "Local workflow workspace with tasks, plans, artifacts, and generated traces.",
      },
      {
        name: "start → verify → finish",
        text: "Guarded lifecycle instead of ad-hoc mutation and vague completion.",
      },
      {
        name: "Task records",
        text: "Per-task docs and verification evidence stay near the code they justify.",
      },
      {
        name: "Backend integration",
        text: "Optional sync paths exist without making the repo dependent on a hosted control plane.",
      },
    ],
  },
  workflowModes: {
    label: "Workflow modes",
    title: "Choose integration discipline, not feature gating.",
    items: [
      {
        name: "direct",
        text: "Single-checkout flow for short loops, local iteration, and faster policy-aware execution.",
      },
      {
        name: "branch_pr",
        text: "Structured worktree-based flow for multi-role integration and cleaner merge discipline.",
      },
    ],
  },
  docsRail: {
    label: "Docs rail",
    title: "Canonical entry points mapped to the documentation IA.",
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
        name: "Workflow Model",
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
        name: "Developer Track",
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
    title: "Blog explains significance; release notes keep the formal record.",
    items: [
      {
        name: "Blog",
        to: "/blog",
        text: "Editorial analysis, roadmap context, and release stories.",
      },
      {
        name: "Release notes",
        to: "/docs/releases",
        text: "Formal version-by-version record of shipped changes.",
      },
    ],
  },
  closing: {
    label: "Next step",
    title: "Start with the docs, then read the workflow model in full.",
    text: "The homepage should orient you quickly. The product contract lives in the docs, task lifecycle, and release record.",
    actions: [
      { label: "Open overview", to: "/docs/user/overview", variant: "primary" },
      { label: "Read workflow model", to: "/docs/user/workflow", variant: "secondary" },
    ],
  },
} as const;
