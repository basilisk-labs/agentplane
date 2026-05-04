export declare const AGENT_BOOTSTRAP_DOC_PATH = "docs/user/agent-bootstrap.generated.mdx";
export declare const BRANCH_PR_HOSTED_GATE_GUIDANCE = "confirm hosted required checks through the repository's configured CI/provider gate; optional framework-maintainer helper when present: `bun run workflow:wait-remote-checks`";
export declare const BOOTSTRAP_PREFLIGHT_COMMANDS: readonly [string, string, string, "git status --short --untracked-files=no", "git rev-parse --abbrev-ref HEAD"];
export declare const BOOTSTRAP_TASK_PREP_COMMANDS: string[];
export declare const BOOTSTRAP_DIRECT_HAPPY_PATH_COMMANDS: readonly [...string[], string, string, string, "agentplane finish <task-id> --author <ROLE> --body-file ./verified-note.txt --result-file ./result.txt --commit <git-rev>"];
export declare const BOOTSTRAP_VERIFICATION_COMMANDS: readonly [string, string, string, `${string} --check`, "agentplane doctor", "node .agentplane/policy/check-routing.mjs"];
export declare function renderBootstrapDoc(): string;
//# sourceMappingURL=bootstrap-guide.d.ts.map