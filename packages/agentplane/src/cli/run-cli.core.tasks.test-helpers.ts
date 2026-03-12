import { mkGitRepoRoot, writeDefaultConfig } from "./run-cli.test-helpers.js";

export async function writeAndConfigureRoot(): Promise<string> {
  const root = await mkGitRepoRoot();
  await writeDefaultConfig(root);
  return root;
}
