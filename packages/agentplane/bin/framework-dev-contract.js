export const FRAMEWORK_DEV_BOOTSTRAP_COMMAND = "bun run framework:dev:bootstrap";
export const FRAMEWORK_DEV_MANUAL_REPAIR_COMMANDS = [
  "bun install",
  "git submodule update --init --recursive agentplane-recipes",
  "bun run --filter=@agentplaneorg/core build",
  "bun run --filter=agentplane build",
  "bun run --filter=@agentplane/testkit build",
];
export const FRAMEWORK_DEV_REPO_LOCAL_VERIFY_COMMAND =
  "node packages/agentplane/bin/agentplane.js runtime explain";
export const FRAMEWORK_DEV_GLOBAL_VERIFY_COMMAND = "agentplane runtime explain";
export const FRAMEWORK_DEV_REINSTALL_SCRIPT = "scripts/reinstall-global-agentplane.sh";
export const FRAMEWORK_DEV_FORCE_GLOBAL_EXAMPLE =
  "AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane <command>";
