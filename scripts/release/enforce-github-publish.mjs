const inGitHubActions = process.env.GITHUB_ACTIONS === "true";

if (!inGitHubActions) {
  process.stderr.write(
    [
      "npm publish is disabled for local environments.",
      "Use the GitHub Actions workflow `Publish to npm` to publish with provenance.",
    ].join("\n") + "\n",
  );
  process.exitCode = 1;
}
